var webdriver = require('selenium-webdriver');

describe("www.google.com", function () {
  it("should give results for a known search", function (done) {

    var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();

    driver.get('http://www.google.com');
    driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
    driver.findElement(webdriver.By.name('btnG')).click();
    driver.wait(function() {
console.log("webdriver wait callback");
      return driver.getTitle().then(function(title) {
console.log("  getTitle promise resolved:  " + title);
        return title === 'webdriver - Google Search';
      });
    }, 1000).then(function() {
      console.log("wait finished.  we got:");
      console.log(arguments);
      done();
    });

    driver.quit();
  });
});
