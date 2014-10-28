jasmine-node-webdriver
======================

An example of configuring jaasmine-node to drive in-browser tests via webdriver.


**Or not**.  Started work in parallel on this example and one using mocha instead
of jasmine at the same time.  I finished the mocha-based one much more
quickly, have a look at it:  https://github.com/gleneivey/mocha-node-webdriver

If you do want to use jasmine (a lovely framework) from within node to
drive a browser, I recommend:

* sticking with the `selenium-webdriver` NPM
* using v2.0.4+ of Jasmine, which comes with beforeAll and afterAll
functions out of the box
    * as I write this, Jasmine 2.0.4 is still in development, so to get
    those functions, you have to clone the repository and `grunt
    buildStandaloneDist` yourself to build the `jasmine.js` you'll
    want to use.
* base your environment's start-up code on `spec/node_suite.js` in
the Jasmine repo.  It's kinda like the Jasmine's sample `boot.js` for
the browser, and kinda like the modified `boot.js` in the `jasmine-node`
NPM, but actually kept in sync with the rest of Jasmine.

I don't actually blame the difference in effort on jasmine itself, so much as
my early decision to use the `jasmine-node` NPM.  Which would probably have
been fine if I weren't trying to use (something like) beforeAll/afterAll hooks
to launch and quit WebDriver and the browser.  The release version of
`jasmine-node` incorporates a version of Jasmine 1.  Once upon a time,
I had a setup using node and Selenium RC and Jasmine 1, but that was back
in the dawn of time, before the widespread use of promises or the
`selenium-webdriver` NPM.  Back when `runs()` and `waitsFor()` looked like
good ideas.

Anyway, this repo contains working examples of Jasmine/node/WebDriver tests
using `jasmine-node` in the "Jasmine1" directory, but the browser
startup/shutdown is handled in the
individual tests.  My original plan was to alter `boot.js` to handle the
browser's lifecycle, but that file's embedded in `jasmine-node` and
forking that to get the system working seemed like going to far to get
(just) Jasmine 1.  So.

The "Jasmine2" directory also contains examples that are most of the way
there.  But.  It turns out that beforeAll/afterAll don't exist in
Jasmine before 2.0.4, and the latest commits in `jasmine-node`'s
`Jasmine2.0` branch incorporate only Jasmine 2.0.0.  I tried forking
`jasmine-node` and upgrading the included Jasmine.  But `jasmine-node`'s
custom `boot.js` was not immediately compatible.

