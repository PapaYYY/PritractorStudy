// conf.js
exports.config = {

    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'jasmine2',
//  seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['BidWithHWCommodityCreation.js']

    /* // Options to be passed to Jasmine.
     jasmineNodeOpts: {
       defaultTimeoutInterval: 1000
     }
       */
}