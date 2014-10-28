
var webdriver = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
driver = 'is a global';

describe("access to remote servers", function () {
  beforeAll(function () {
    driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
  });

  afterAll(function (done) {
    driver.
        quit().
        then(function () { done(); });
  });

  it("can search from Wikipedia's home page", function (done) {
    driver.get('http://en.wikipedia.org');
    driver.findElement(webdriver.By.name('search')).sendKeys('webdriver');
    driver.findElement(webdriver.By.name('go')).click();

    driver.
        wait(function () {
          return driver.getTitle().then(function (title) {
            return title === 'Selenium (software) - Wikipedia, the free encyclopedia';
          });
        }, 5000).
        then(function () { done(); });
  });

  //prove we can do two navigations/tests using the same driver/browser
  it("can see the example repo on GitHub", function (done) {
    driver.get('http://github.com/gleneivey/mocha-node-webdriver.git');
    driver.
        wait(function () {
          return driver.
              findElement(webdriver.By.css('a span.octicon.octicon-git-pull-request'))
              .getOuterHtml().
              then(function (content) {
                return !!content;
              });
        }, 5000).
        then(function () { done(); });
  });
});
