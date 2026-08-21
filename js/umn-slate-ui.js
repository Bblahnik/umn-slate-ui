/*!
 * UMN Slate UI
 * JavaScript Enhancements
 *
 * Optional behavior layer for UMN Slate UI.
 *
 * Current features:
 * - Slate / Express Portal theme bridge
 * - Client-side pagination for custom/Liquid tables
 *
 * Design principles:
 * - Progressive enhancement: core content remains usable without JavaScript.
 * - CSS remains responsible for presentation.
 * - Slate-native behavior is preferred where Slate already provides it.
 * - JavaScript is opt-in except for the harmless theme bridge.
 */

(function () {
  "use strict";

  var UMNSlateUI = window.UMNSlateUI || {};

  /* ==========================================================================
     Theme Bridge
     ========================================================================== */

  /*
   * Express Portal views may render inside an iframe and therefore do not
   * automatically inherit Slate's parent-page theme.
   *
   * This bridge mirrors the tested Express Portal behavior:
   *
   * - Reads the parent document's data-theme value.
   * - Treats darkmode and all twilight variants as the dark family.
   * - Sets data-umn-theme="dark" or "light" on the iframe document.
   * - Removes Slate's own data-theme attribute from the iframe document so
   *   Slate's theme CSS is not activated inside the Express Portal.
   * - Neutralizes Slate's iframe filter used by Twilight.
   * - Watches the parent data-theme attribute for live theme changes.
   */

  UMNSlateUI.theme = (function () {
    var observer = null;

    function syncTheme() {
      try {
        if (window.parent === window) {
          return;
        }

        var parentRoot = window.parent.document.documentElement;
        var localRoot = document.documentElement;

        if (!parentRoot || !localRoot) {
          return;
        }

        var theme = parentRoot.getAttribute("data-theme") || "";

        var isDarkFamily =
          theme === "darkmode" ||
          theme.indexOf("twilight") === 0;

        /*
         * Give UMN Slate UI its own theme signal inside the iframe.
         */
        localRoot.setAttribute(
          "data-umn-theme",
          isDarkFamily ? "dark" : "light"
        );

        /*
         * Do not activate Slate's own theme CSS inside the iframe.
         */
        localRoot.removeAttribute("data-theme");

        /*
         * Slate applies filter: invert(1) to embedded iframes in Twilight.
         * Neutralize that only for this Express Portal iframe.
         */
        if (window.frameElement) {
          window.frameElement.style.filter = "none";
        }

      } catch (error) {
        /*
         * If the parent document is inaccessible, leave the local
         * document untouched and allow the rest of UMN Slate UI to run.
         */
      }
    }

    function observeParentTheme() {
      try {
        if (window.parent === window || !window.MutationObserver) {
          return;
        }

        var parentRoot = window.parent.document.documentElement;

        if (!parentRoot) {
          return;
        }

        if (observer) {
          observer.disconnect();
        }

        observer = new MutationObserver(syncTheme);

        observer.observe(parentRoot, {
          attributes: true,
          attributeFilter: ["data-theme"]
        });

      } catch (error) {
        /*
         * Parent document is not accessible; leave theme untouched.
         */
      }
    }

    function init() {
      syncTheme();
      observeParentTheme();
    }

    return {
      init: init,
      apply: syncTheme
    };
  })();


  /* ==========================================================================
     Table Pagination
     ========================================================================== */

  /*
   * Client-side pagination for custom/Liquid tables.
   *
   * Recommended markup:
   *
   * <div data-umn-pagination data-page-size="25">
   *   <table class="umn-table">
   *     ...
   *   </table>
   *
   *   <nav
   *     class="umn-pagination"
   *     aria-label="Table pagination"
   *   ></nav>
   * </div>
   *
   * Notes:
   * - All rows remain visible if JavaScript does not load.
   * - This paginator is intentionally independent of Slate's native
   *   searchable/sortable table behavior.
   * - Multiple independently paginated tables may appear on one page.
   */

  UMNSlateUI.pagination = (function () {
    function createElement(tagName, className, text) {
      var element = document.createElement(tagName);

      if (className) {
        element.className = className;
      }

      if (typeof text !== "undefined") {
        element.textContent = text;
      }

      return element;
    }

    function initComponent(component, index) {
      if (
        component.getAttribute("data-umn-pagination-initialized") === "true"
      ) {
        return;
      }

      var table = component.querySelector("table");
      var pagination = component.querySelector(".umn-pagination");

      if (!table || !pagination) {
        return;
      }

      var tbody = table.querySelector("tbody");

      if (!tbody) {
        return;
      }

      var rows = Array.prototype.slice
        .call(tbody.children)
        .filter(function (row) {
          return row.tagName === "TR";
        });

      if (!rows.length) {
        pagination.hidden = true;
        component.setAttribute(
          "data-umn-pagination-initialized",
          "true"
        );
        return;
      }

      var configuredPageSize = parseInt(
        component.getAttribute("data-page-size"),
        10
      );

      var pageSize =
        Number.isInteger(configuredPageSize) &&
        configuredPageSize > 0
          ? configuredPageSize
          : 25;

      var currentPage = 0;
      var pageCount = Math.ceil(rows.length / pageSize);

      /*
       * Give the table an ID so aria-controls can associate the pagination
       * controls with the table they affect.
       */
      if (!table.id) {
        table.id = "umn-paginated-table-" + (index + 1);
      }

      pagination.setAttribute("aria-controls", table.id);


      function createLink(label, page, options) {
        options = options || {};

        if (options.current) {
          var current = createElement(
            "span",
            "umn-pagination__current",
            label
          );

          current.setAttribute("aria-current", "page");

          return current;
        }

        if (options.disabled) {
          var disabled = createElement(
            "span",
            "umn-pagination__link",
            label
          );

          disabled.setAttribute("aria-disabled", "true");

          return disabled;
        }

        var link = createElement(
          "a",
          "umn-pagination__link",
          label
        );

        link.href = "//";
        link.setAttribute("data-page", String(page));

        if (options.ariaLabel) {
          link.setAttribute("aria-label", options.ariaLabel);
        }

        return link;
      }


      function renderPagination() {
        pagination.innerHTML = "";

        if (pageCount <= 1) {
          pagination.hidden = true;
          return;
        }

        pagination.hidden = false;

        var list = createElement(
          "ul",
          "umn-pagination__list"
        );


        /* Previous */

        var previousItem = createElement(
          "li",
          "umn-pagination__item"
        );

        previousItem.appendChild(
          createLink(
            "Prev",
            currentPage - 1,
            {
              disabled: currentPage === 0,
              ariaLabel: "Previous page"
            }
          )
        );

        list.appendChild(previousItem);


        /* Page numbers */

        for (var page = 0; page < pageCount; page += 1) {
          var pageItem = createElement(
            "li",
            "umn-pagination__item"
          );

          pageItem.appendChild(
            createLink(
              String(page + 1),
              page,
              {
                current: page === currentPage,
                ariaLabel:
                  page === currentPage
                    ? "Page " +
                      (page + 1) +
                      ", current page"
                    : "Go to page " +
                      (page + 1)
              }
            )
          );

          list.appendChild(pageItem);
        }


        /* Next */

        var nextItem = createElement(
          "li",
          "umn-pagination__item"
        );

        nextItem.appendChild(
          createLink(
            "Next",
            currentPage + 1,
            {
              disabled:
                currentPage === pageCount - 1,
              ariaLabel: "Next page"
            }
          )
        );

        list.appendChild(nextItem);

        pagination.appendChild(list);
      }


      function showPage(page) {
        if (page < 0 || page >= pageCount) {
          return;
        }

        currentPage = page;

        var start = currentPage * pageSize;
        var end = start + pageSize;

        rows.forEach(function (row, rowIndex) {
          row.hidden =
            rowIndex < start ||
            rowIndex >= end;
        });

        renderPagination();

        component.dispatchEvent(
          new CustomEvent(
            "umn:paginationchange",
            {
              bubbles: true,
              detail: {
                page: currentPage + 1,
                pageIndex: currentPage,
                pageSize: pageSize,
                pageCount: pageCount,
                totalRows: rows.length
              }
            }
          )
        );
      }


      pagination.addEventListener(
        "click",
        function (event) {
          var link = event.target.closest(
            "a[data-page]"
          );

          if (
            !link ||
            !pagination.contains(link)
          ) {
            return;
          }

          event.preventDefault();

          var page = parseInt(
            link.getAttribute("data-page"),
            10
          );

          if (Number.isInteger(page)) {
            showPage(page);
          }
        }
      );

      component.setAttribute(
        "data-umn-pagination-initialized",
        "true"
      );

      showPage(0);
    }


    function init() {
      var components =
        document.querySelectorAll(
          "[data-umn-pagination]"
        );

      Array.prototype.forEach.call(
        components,
        function (component, index) {
          initComponent(component, index);
        }
      );
    }

    return {
      init: init
    };
  })();


  /* ==========================================================================
     Initialization
     ========================================================================== */

  UMNSlateUI.init = function () {
    UMNSlateUI.theme.init();
    UMNSlateUI.pagination.init();
  };

  window.UMNSlateUI = UMNSlateUI;

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      UMNSlateUI.init
    );
  } else {
    UMNSlateUI.init();
  }

})();
