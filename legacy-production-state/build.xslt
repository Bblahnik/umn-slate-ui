<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:fw="http://technolutions.com/framework" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="xhtml">
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <template path="/shared/base.xslt" xmlns="http://technolutions.com/framework" />
      <head>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&amp;l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&amp;gtm_auth=WzxzakprC5LWhLLNkB7HYA&amp;gtm_preview=env-5&amp;gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5GH89JC');</script>
        <!-- End Google Tag Manager -->
        <link href="/shared/build-fonts.css?v=20210603120758" rel="stylesheet" />
        <link href="/shared/build-mobile-global.css" rel="stylesheet" />
        <script src="/shared/build-mobile-global.js" />
        <link href="/shared/build.css?v=20210603120760" rel="stylesheet" />
        <style>html &gt; body { line-height: normal; } ul.cr, li.cr { margin: 0; padding: 0; } #content { clear: both; padding: 15px; } #global { float: right; } #global ul, #global li { list-style: none; margin: 0; padding: 0; }</style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" class="cr" />
        <xsl:apply-templates select="xhtml:html/xhtml:head/node()" />
      </head>
      <body>
        <xsl:copy-of select="xhtml:html/xhtml:body/@*" />
        <div id="page">
          <div class="c_path-node c_page-node-type-page cr">
            <div class="c_page-wrapper c_off-canvas-wrapper c_mm-page c_mm-slideout cr" id="c_mm-0">
              <div class="c_grid-x c_system-region cr">
                <div class="cr">
                  <div data-drupal-messages-fallback="" class="c_hidden cr" />
                </div>
              </div>
              <div id="c_skip" class="cr">
                <a class="c_visually-hidden c_focusable c_skip-link cr" href="#content">Skip to main content</a>
              </div>
              <header role="banner" class="cr">
                <div class="c_top-nav cr">
                  <div class="c_grid-container cr">
                    <div class="c_grid-x cr">
                      <div class="c_small-12 c_top-nav-left c_medium-6 cr">
                        <a href="https://twin-cities.umn.edu/" class="cr">
                          <img src="/images/uofm-logo.svg" alt="University of Minnesota homepage" class="cr" />
                        </a>
                      </div>
                      <div class="c_top-nav-right c_small-12 c_medium-6 c_global-search cr">
                        <div class="c_umn-links c_hide-for-small-only cr">
                          <ul class="cr" role="presentation">
                            <li class="cr">
                              <a href="https://onestop.umn.edu/" class="cr">One Stop</a>
                            </li>
                            <li class="cr">
                              <a href="https://www.myu.umn.edu/" class="cr">MyU <svg class="c_svg-inline--fa c_fa-lock c_fa-w-14 cr" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img" viewbox="0 0 448 512" data-fa-i2svg="" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" class="cr" /></svg>: For Students, Faculty, and Staff</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              <div class="c_dialog-off-canvas-main-canvas cr" data-off-canvas-main-canvas="">
                <div class="c_layout-container cr">
                  <main role="main" class="c_off-canvas-content cr" data-off-canvas-content="">
                    <a id="c_main-content" tabindex="-1" class="cr" />
                    <div class="c_grid-container c_side-nav-container cr">
                      <div id="global" />
                      <div id="content">
                        <xsl:apply-templates select="xhtml:html/xhtml:body/node()" />
                      </div>
                    </div>
                    <div class="c_js-off-canvas-overlay c_is-overlay-absolute cr" />
                  </main>
                </div>
              </div>
              <div class="c_off-canvas-wrapper cr" />
              <footer class="c_footer-bottom cr" role="contentinfo">
                <div class="c_grid-container cr">
                  <div class="c_grid-x c_footer-text cr">
                    <!--<div class="c_cell c_medium-4 cr">
                      <a href="https://twin-cities.umn.edu/" target="_blank" class="cr">
                        <img src="/images/footer_logo.png" class="c_gps-logo cr" />
                      </a>
                    </div>-->
                    <div class="c_cell cr">&#xA9; <xsl:value-of select="fw:year()" /> Regents of the University of Minnesota. All rights reserved. The University of Minnesota is an equal opportunity educator and employer.<br class="cr" /><a class="c_privacy-link cr" href="https://privacy.umn.edu/" target="_blank">Privacy Statement</a> | <a href="https://oit-drupal-prd-web.oit.umn.edu/indexAccess.php?ref_url=https://umabroad.umn.edu/students/advising" class="c_accessibility-link cr" target="_blank">Report Web Disability-Related Issue</a></div>
                  </div>
                </div>
              </footer>
            </div>
            <div id="c_mm-blocker" class="c_mm-slideout cr" />
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()" />
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
