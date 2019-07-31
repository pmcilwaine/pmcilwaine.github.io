---
layout: post
title: Protractor, Saucelabs and File Upload
tags: [protractor, selenium, saucelab, testing]
comments: true
---

I’ve been doing quite a bit of work with Protractor recently using both Saucelabs and browserstack, up until now Ive never had a need to do file uploads. I have usually worked around any reason to upload files due to known issues people have had with uploading files. For my Uni project unfortunately I can no longer do workarounds and now need to resolve issues that have plagued others.

To get this to work I am making an assumption you have [Sauce Connect](https://docs.saucelabs.com/reference/sauce-connect/) installed somewhere and ready to run, and a Sauce labs account.

Below is a simple HTML file that is used for testing, in my case this is available on port 5000, with hostname localhost. You will need to update the package.json to match what it is for you locally.

`Submit`

The response page is a simple paragraph tag with the filename outputted e.g.

`File uploaded: test.jpg`

For testing this code I have protractor, chai, chai-as-promised, and mocha. Below is the package.json used.

```json
{
  "name": "file_upload_test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "protractor --baseUrl=http://localhost:5000 tests/config.js",
    "webdriver": "webdriver-manager update; webdriver-manager start"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chai": "^3.0.0",
    "chai-as-promised": "^5.1.0",
    "mocha": "^2.2.5",
    "mocha-jenkins-reporter": "^0.1.8",
    "protractor": "^2.1.0"
  }
}
```

We are nearly there, unfortunately adm-zip, a package in protractor is broken and we need to patch this so files larger than 80kb can work (it should be said not all files.

```
--- zipEntry.js	2015-06-06 13:15:52.000000000 +1000
+++ zipEntry-2.js	2015-06-06 13:14:00.000000000 +1000
@@ -173,7 +173,7 @@
             uncompressedData = Utils.toBuffer(value);
             if (!_isDirectory && uncompressedData.length) {
                 _entryHeader.size = uncompressedData.length;
-                _entryHeader.method = Utils.Constants.DEFLATED;
+                _entryHeader.method = Utils.Constants.STORED;
                 _entryHeader.crc = Utils.crc32(value);
             } else { // folders and blank files should be stored
                 _entryHeader.method = Utils.Constants.STORED;
```

This can be applied with this command.

```bash
#!/usr/bin/env bash
patch -p1 -N node_modules/protractor/node_modules/adm-zip/zipEntry.js
```

Now that we have that setup, lets do the configuration for protractor. The test/config.js:

```javascript
exports.config = {
    framework: 'mocha',
    mochaOpts: {
        reporter: 'spec',
        timeout: 600000,
        reporter: "mocha-jenkins-reporter",
        reporterOptions: {
            junit_report_name: "Integration Tests",
            junit_report_path: "report-integration.xml",
            junit_report_stack: 1
        }
    },
    specs: 'specs/*.js',
    getPageTimeout: 600000,
    allScriptsTimeout: 99999,
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    onPrepare: function () {
        global.isAngularSite = function (flag) {
            browser.ignoreSynchronization = !flag;
        }
    },
    sauceSeleniumAddress: 'localhost:4445/wd/hub',
    sauceUser: '[sauce username here]',
    sauceKey: '[sauce key here]',
    multiCapabilities: [{
        browserName: 'firefox',
        version: '37.0',
        platform: 'Windows 7',
        name: 'File Upload Testing',
        build: 'local testing',
        count: 1,
        idleTimeout: 1000,
        commandTimeout: 600
    }, {
        browserName: 'chrome',
        version: '39.0',
        platform: 'Windows 7',
        name: 'File Upload Testing',
        build: 'local testing',
        count: 1,
        idleTimeout: 1000,
        commandTimeout: 600
    }, {
        browserName: 'internet explorer',
        version: '11.0',
        platform: 'Windows 7',
        name: 'File Upload Testing',
        build: 'local testing',
        count: 1,
        idleTimeout: 1000,
        commandTimeout: 600
    }]
};
```

We now create a test spec file, in the tests/specs folder, here is upload.js

```javascript
var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
var expect = chai.expect;
var path = require('path');
var remote = require('protractor/node_modules/selenium-webdriver/remote');
describe('Upload File', function () {
before(function () {
        isAngularSite(false);
    });
beforeEach(function () {
       browser.get('/');
    });
it('Can upload file', function () {
        var absolutePath = path.resolve('tests/specs', 'large-file.jpg');
        browser.setFileDetector(new remote.FileDetector);
        element.all(by.css('input[type=file]')).get(0).sendKeys(absolutePath);
        element.all(by.css('button')).get(0).click();
        expect(element.all(by.css('p')).get(0).getText()).to.eventually.equal('File uploaded: large-file.jpg');
    });
});
```

Assuming everything is setup correctly this should work in all 3 browsers. The 2 main things here is to ensure we set the setFileDetector, and patch the adm-zip package. Once this is done file uploads should work. Please not there is a file upload limit where you can only have a command running for 5mins, if your internet is slow the filesize will need to be smaller to ensure more commands can get to SauceLabs before the command timeout otherwise the tests will abort on Saucelabs and potentially hang locally.
