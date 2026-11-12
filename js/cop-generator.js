(function () {
  var root = document.getElementById("cop-housing");
  var list = document.getElementById("cop-housing-tabs");
  var panels = Array.from(root.querySelectorAll("[data-cop-panel]"));
  if (!panels[1]) return;
  list.setAttribute("role", "tablist");
  list.setAttribute("aria-label", "Housing options");
  var tabs = panels.map(function (panel, index) {
    var tab = document.createElement("button");
    var label = panel.querySelector("[data-cop-label]").textContent.trim();
    tab.type = "button";
    tab.id = "cop-housing-tab-" + index;
    tab.textContent = label || "Housing option " + (index + 1);
    panel.id = "cop-housing-panel-" + index;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    list.appendChild(tab);
    return tab;
  });
  function activate(index, focus) {
    tabs.forEach(function (tab, i) {
      var selected = i === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activate(index, false);
    });
    tab.addEventListener("keydown", function (event) {
      var next;
      switch (event.key) {
        case "ArrowRight":
          next = (index + 1) % tabs.length;
          break;
        case "ArrowLeft":
          next = (index + tabs.length - 1) % tabs.length;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = tabs.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      activate(next, true);
    });
  });
  activate(0, false);
})();

(function () {
  var panels = Array.from(
    document.querySelectorAll("#cop-housing [data-cop-panel]"),
  );
  if (!panels.length) return;

  var button = document.getElementById("cop-copy-html");
  var status = document.getElementById("cop-copy-status");
  var fallback = document.getElementById("cop-copy-fallback");
  var field = document.getElementById("cop-copy-source");
  document.getElementById("cop-html-export").hidden = false;

  function buildExport() {
    var trackKey = new URLSearchParams(window.location.search).get("track_key");
    trackKey = (trackKey || "").trim().toLowerCase();
    var money = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

    // Retain the legacy PHP markup and whitespace for the Drupal source editor.
    var panelTemplate = [
      '        <div class="tabs-panel@active@" id="@id@">',
      '            <table class="fees-table">',
      "                <thead>",
      "                    <tr>",
      '                        <th colspan="2"><h2>@track@</h2><h3>@housing@</h3><h3>@term@</h3></th>',
      "                    </tr>",
      "                </thead>",
      "                <tbody>",
      "                    <tr>",
      '                        <th colspan="2"><h2>Program Fee</h2>',
      "                            <ul>",
      "                                <li>UofM students pay program fee instead of on-campus tuition & fees while abroad</li>",
      "                                <li>Billed through UofM account</li>",
      "                            </ul>",
      "                        </th>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Non-refundable deposit</td>",
      "                        <td>@amount0@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Tuition and educational costs@desc1@</td>",
      "                        <td>@amount1@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>International health insurance@desc2@</td>",
      "                        <td>@amount2@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Housing and/or meals@desc3@</td>",
      "                        <td>@amount3@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Transportation (if required and included in program fee)@desc4@</td>",
      "                        <td>@amount4@</td>",
      "                    </tr>",
      '                    <tr class="total-row">',
      "                        <td>Total Program Fee</td>",
      "                        <td>@amount5@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Program discount for University of Minnesota and Big Ten students, if applicable</td>",
      "                        <td>@amount6@</td>",
      "                    </tr>",
      '                    <tr class="total-row">',
      "                        <td>Total Program Fee with discount, if applicable</td>",
      "                        <td>@amount7@</td>",
      "                    </tr>",
      "                    <tr>",
      '                        <th colspan="2"><h2>Estimated Additional Expenses</h2>',
      "                            <ul>",
      "                                <li>Financial aid-eligible but not included in program fee</li>",
      "                            </ul>",
      "                        </th>",
      "                    </tr>",
      '                    <tr class="title-row">',
      '                        <td colspan="2">',
      "                            <strong>Costs Typically Incurred Prior to Departure</strong>",
      "                            <small>These costs may need to be paid before your financial aid is disbursed for your term abroad.</small>",
      "                        </td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Transportation to and from program site@desc8@</td>",
      "                        <td>@amount8@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Passport/photos</td>",
      "                        <td>@amount9@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Visa/required documents@desc10@</td>",
      "                        <td>@amount10@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Travel clinic/immunizations<sup>*</sup>@desc11@</td>",
      "                        <td>@amount11@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Housing deposit</td>",
      "                        <td>@amount12@</td>",
      "                    </tr>",
      '                    <tr class="total-row">',
      "                        <td>Total Estimated Cost Incurred Prior to Departure</td>",
      "                        <td>@amount13@</td>",
      "                    </tr>",
      '                    <tr class="title-row">',
      '                        <td colspan="2"><strong>Costs Typically Incurred After Arrival in Host Country</strong></td>',
      "                    </tr>",
      "                    <tr>",
      "                        <td>Texts/materials@desc14@</td>",
      "                        <td>@amount14@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Housing and/or meals not included in program fee@desc15@</td>",
      "                        <td>@amount15@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Essential daily living expenses@desc16@</td>",
      "                        <td>@amount16@</td>",
      "                    </tr>",
      '                    <tr class="total-row">',
      "                        <td>Total Estimated Cost Incurred After Arrival in Host Country</td>",
      "                        <td>@amount17@</td>",
      "                    </tr>",
      "                    <tr>",
      '                        <th colspan="2"><h2>Total Estimated Cost of Participation</h2>',
      "                            <ul>",
      "                                <li>UofM students—compare this to your estimated on campus cost of attendance</li>",
      "                            </ul>",
      "                        </th>",
      "                    </tr>",
      '                    <tr class="total-row">',
      "                        <td>Total Estimated Cost of Participation</td>",
      "                        <td>@amount18@</td>",
      "                    </tr>",
      "                    <tr>",
      "                        <td>Spending money and personal travel <small>Not included in financial aid calculation</small></td>",
      "                        <td>@amount19@</td>",
      "                    </tr>",
      '                    <tr class="title-row">',
      '                        <td colspan="2"><strong>Additional Notes & Information</strong></td>',
      "                    </tr>",
      '                    <tr class="notes">',
      '                        <td colspan="2">* Immunizations Note: This estimate is based on approximate cost of travel-related vaccinations and medications required for entry or recommended by the Centers for Disease Control and Prevention. Your costs may be higher or lower depending on your travel clinic, the specific immunizations and medication prescribed, and your insurance coverage.</td>',
      "                    </tr>",
      "                </tbody>",
      "            </table>",
      "        </div>",
    ].join("\n");
    var tabs = [];
    var tables = panels.map(function (panel, index) {
      var active = index === 0;
      var id = trackKey + "-fees-panel-" + index;
      var label = panel.querySelector("[data-cop-label]").textContent.trim();
      var housingName = panel
        .querySelector("[data-cop-name]")
        .textContent.trim();
      tabs.push(
        '<li class="tabs-title' +
          (active ? " is-active" : "") +
          '"><a href="#' +
          escapeText(id).replace(/"/g, "&quot;") +
          '"' +
          (active ? ' aria-selected="true"' : "") +
          ">" +
          escapeText(label) +
          "</a></li>",
      );

      var values = {
        active: active ? " is-active" : "",
        id: escapeText(id).replace(/"/g, "&quot;"),
        track: escapeText(
          panel.querySelector("[data-cop-track]").textContent.trim(),
        ),
        term: escapeText(
          panel.querySelector("[data-cop-term]").textContent.trim(),
        ),
        housing: escapeText(housingName ? label + "—" + housingName : label),
      };

      Array.from(panel.querySelectorAll("tr"))
        .filter(function (row) {
          return row.cells[1] && row.cells[1].tagName === "TD";
        })
        .forEach(function (row, rowIndex) {
          var description = row.querySelector("small");
          var amount = row.cells[1].textContent.trim().replace(/[$,]/g, "");
          values["desc" + rowIndex] = description
            ? "<small>" +
              escapeText(description.textContent.trim()) +
              "</small>"
            : "";
          values["amount" + rowIndex] =
            "$" + (amount ? money.format(Number(amount)) : "0");
        });

      return panelTemplate.replace(/@(\w+)@/g, function (token, key) {
        return values[key];
      });
    });

    return (
      '        <ul class="tabs fees-tabs" data-active-collapse="true" data-tabs id="collapsing-tabs">' +
      tabs.join("") +
      '</ul>\n        <div class="tabs-content fees-tabs-content" data-tabs-content="collapsing-tabs">\n' +
      tables.join("\n") +
      "</div>"
    );
  }

  function escapeText(value) {
    return value.replace(/<|>/g, function (character) {
      return character === "<" ? "&lt;" : "&gt;";
    });
  }

  function manualCopy(html) {
    field.value = html;
    fallback.open = true;
    status.textContent = "Copy the selected HTML source.";
    field.focus();
    field.select();
  }

  function printHousingOption() {
    var panel = panels.find(function (option) {
      return !option.hidden;
    });
    if (!panel) return;

    var pageWidth = 8.5;
    var pageHeight = 11;
    var margin = 0.4;
    var contentWidth = pageWidth - 2 * margin;
    var frame = document.createElement("iframe");
    frame.title = "Cost of Participation print layout";
    frame.setAttribute("aria-hidden", "true");
    frame.tabIndex = -1;
    frame.style.cssText =
      "position:fixed;height:1px;left:-9999px;top:0;border:0";
    frame.style.width = contentWidth + "in";
    document.body.appendChild(frame);

    var printWindow = frame.contentWindow;
    var printDocument = frame.contentDocument;
    printDocument.open();
    printDocument.write(
      "<!doctype html><html><head></head><body></body></html>",
    );
    printDocument.close();
    printDocument.title = "Cost of Participation";
    printDocument.documentElement.lang = document.documentElement.lang || "en";
    var fontSource = panel.querySelector("td, th") || panel;
    printDocument.body.style.fontFamily =
      window.getComputedStyle(fontSource).fontFamily + ", Arial, sans-serif";

    var style = printDocument.createElement("style");
    style.textContent = [
      "@page { size: letter portrait; margin: " + margin + "in; }",
      "body { margin: 0; color: #000; font-size: 9pt; line-height: 1.15; }",
      ".cop-print-layout { display: flow-root; width: " +
        contentWidth +
        "in; overflow-wrap: anywhere; }",
      "h1, h2, h3, h4, p, ul, ol { margin: 0 0 2pt; }",
      "h1 { font-size: 13pt; }",
      "h2 { font-size: 11pt; }",
      "h3, h4 { font-size: 10pt; }",
      "ul, ol { padding-left: 15pt; }",
      "table { width: 100%; border-collapse: collapse; margin: 0 0 4pt; font: inherit; }",
      "caption { font-size: 10pt; font-weight: bold; padding: 2pt 0; }",
      "tr { break-inside: avoid; page-break-inside: avoid; }",
      "th, td { font: inherit; border: 0.5pt solid #aaa; padding: 1.5pt 4pt; text-align: left; vertical-align: top; }",
      "th, .total-row { font-weight: bold; }",
      "th:nth-child(2), td:nth-child(2) { text-align: right; white-space: nowrap; }",
      "small { font-size: 8pt; }",
      "th small, td small { display: block; font-weight: normal; }",
    ].join("\n");
    printDocument.head.appendChild(style);

    // Copy the live panel so the printout uses its displayed amounts and notes.
    var sheet = printDocument.createElement("div");
    var layout = printDocument.createElement("div");
    layout.className = "cop-print-layout";
    layout.appendChild(printDocument.importNode(panel, true));
    sheet.appendChild(layout);
    printDocument.body.appendChild(sheet);

    // Leave a little room for rounding and differences in print margins.
    var availableHeight = (pageHeight - 2 * margin - 0.15) * 96;
    var widthScale = layout.clientWidth / layout.scrollWidth;
    var scale = Math.min(1, availableHeight / layout.offsetHeight, widthScale);
    if (scale < 1) {
      // Match the space reserved for pagination to the scaled content.
      layout.style.width =
        (contentWidth * Math.min(1, widthScale)) / scale + "in";
      layout.style.transformOrigin = "top left";
      layout.style.transform = "scale(" + scale + ")";
      sheet.style.height =
        Math.ceil(layout.getBoundingClientRect().height) + "px";
      sheet.style.overflow = "hidden";
    }

    printWindow.addEventListener(
      "afterprint",
      function () {
        frame.remove();
      },
      { once: true },
    );
    printWindow.print();
  }

  document
    .getElementById("cop-print-pdf")
    .addEventListener("click", printHousingOption);
  field.value = buildExport();

  button.addEventListener("click", function () {
    var html = field.value;
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      manualCopy(html);
      return;
    }
    navigator.clipboard.writeText(html).then(
      function () {
        status.textContent =
          "HTML copied. Paste it into the Drupal source editor.";
      },
      function () {
        manualCopy(html);
      },
    );
  });
})();
