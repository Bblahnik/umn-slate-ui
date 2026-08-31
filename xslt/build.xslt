<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:fw="http://technolutions.com/framework" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="xhtml">
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <template path="/shared/base.xslt" xmlns="http://technolutions.com/framework" />
      <head>
        <!-- Google Tag Manager -->
        <script>
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({
              'gtm.start': new Date().getTime(),
              event:'gtm.js'
            });

            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&amp;l='+l:'';

            j.async=true;
            j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl+
              '&amp;gtm_auth=WzxzakprC5LWhLLNkB7HYA'+
              '&amp;gtm_preview=env-5'+
              '&amp;gtm_cookies_win=x';

            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5GH89JC');
        </script>
        <!-- End Google Tag Manager -->
        <!-- Slate branding stylesheet -->
        <link href="/shared/build.css?v=1.0.0" rel="stylesheet" />
        <!-- Normalize Slate-generated account navigation -->
        <style>
  #global ul,
  #global li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <xsl:apply-templates select="xhtml:html/xhtml:head/node()" />
      </head>
      <body>
        <xsl:copy-of select="xhtml:html/xhtml:body/@*" />
        <div id="page">
          <!-- ==============================================================
               Skip Navigation
               ============================================================== -->
          <div id="c_skip">
            <a class="umn-skip-link" href="#content">Skip to main content</a>
          </div>
          <!-- ==============================================================
               UMN Site Header
               ============================================================== -->
          <header class="umn-site-header" role="banner">
            <div class="umn-container">
              <div class="umn-site-header__inner">
                <!-- Brand -->
                <a class="umn-site-header__brand" href="https://www.umn.edu/">
                  <img src="/header/umnlocations.svg" alt="University of Minnesota" />
                </a>
                <!-- University Utility Links and Search -->
                <div class="umn-site-header__utility">
                  <ul class="umn-site-header__links" aria-label="University links">
                    <li>
                      <a href="https://onestop.umn.edu/">
                        One Stop
                      </a>
                    </li>
                    <li>
                      <a href="https://www.myu.umn.edu/">
                        MyU
                      </a>
                    </li>
                  </ul>
                  <div class="umn-site-header__search" role="search" aria-label="Search the University of Minnesota">
                    <script>
                      (function() {

                        var cx =
                          '002834015805923805805:c-0k--9bdkk';

                        var gcse =
                          document.createElement('script');

                        gcse.type = 'text/javascript';
                        gcse.async = true;

                        gcse.src =
                          'https://cse.google.com/cse.js?cx=' + cx;

                        var s =
                          document.getElementsByTagName('script')[0];

                        s.parentNode.insertBefore(gcse, s);

                      })();
                    </script>
                    <div class="gcse-searchbox-only">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <!-- ==============================================================
               Main Content
               ============================================================== -->
          <main role="main">
            <a id="c_main-content" tabindex="-1" />
            <div class="umn-container umn-site-main">
              <!-- Slate account-level navigation -->
              <div id="global" />
              <!-- Slate-generated page content -->
              <div id="content">
                <xsl:apply-templates select="xhtml:html/xhtml:body/node()" />
              </div>
            </div>
          </main>
          <!-- ==============================================================
               UMN Site Footer
               ============================================================== -->
          <footer class="umn-site-footer" role="contentinfo">
            <div class="umn-container">
              <div class="umn-site-footer__inner">
                <!--
                  UMN requirements move One Stop and MyU to the footer
                  on small screens. CSS hides this list otherwise.
                -->
                <ul class="umn-site-footer__utility" aria-label="University links">
                  <li>
                    <a href="https://onestop.umn.edu/">
                      One Stop
                    </a>
                  </li>
                  <li>
                    <a href="https://www.myu.umn.edu/">
                      MyU
                    </a>
                  </li>
                </ul>
                <p class="umn-site-footer__legal">

                  &#xA9;
                  <xsl:value-of select="fw:year()" />

                  Regents of the University of Minnesota.
                  All rights reserved.

                  The University of Minnesota is an equal opportunity
                  educator and employer.

                </p>
                <div class="umn-site-footer__links">
                  <a href="https://privacy.umn.edu/">
                    Privacy Statement
                  </a>
                  <span aria-hidden="true">|</span>
                  <a href="https://z.umn.edu/report-accessibility-issue">
                    Report Web Accessibility Issues
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
  <!-- Preserve Slate-generated markup -->
  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
