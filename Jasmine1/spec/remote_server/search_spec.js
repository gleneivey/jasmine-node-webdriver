var webdriver = require('selenium-webdriver');

describe("www.google.com", function () {
  function waitForSelenium() {
    waitsFor(
        function() { return seleniumFinished; },
        "waiting for selenium-finished flag to turn true",
        10000
    );
  }

  it("should give results for a known search", function () {
    var seleniumFinished = false,
        expectedPageTitle = 'webdriver - Google Search',
        driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

    runs(function() {
      // here, use serialization mechanism built into WebDriver
      driver.get('http://www.google.com');
      driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
      driver.findElement(webdriver.By.name('btnG')).click();

      driver.
          wait(function() {
            return driver.getTitle().then(function(title) {
              pageTitle = title;
              if (title === expectedPageTitle) {
                return true;
              }
            });
          }, 1000).
          thenCatch(function() {
            //catch timeout of wait() so that we get a better assert failure message than "timeout"
          });

      // we can't do quit() in an afterEach() or it executes out of order and the browser never closes
      driver.quit().then(function() {
        seleniumFinished = true;
      });
    });

    waitForSelenium();

    runs(function() {
      expect(pageTitle).toEqual(expectedPageTitle);
    });
  });
});
