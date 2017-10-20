function BidList () {

    //bid creation from the bid list
    this.createBid = function (name, duration) {
        element(by.xpath("/html/body/main/bids/nav/div/a[1]/span")).click();
        element(by.id("bidName")).sendKeys(name);
        element(by.id("salesforceId")).sendKeys("123");
        element(by.id("startDate")).click();
        element(by.repeater("dt in row")).click();
        element(by.model("$ctrl.duration")).sendKeys(duration);
        element(by.buttonText("Save")).click();
        browser.sleep(1000);
    }
}

function Costing () {

    this.createHWC_CommodityInBid = function (name) {

        //add client country
        element(by.className("actions-btn")).click();
        element(by.buttonText("Add Client Country")).click();
        element(by.css("input[el-id='clientCountry']")).click();
        element(by.css("a[title='Afghanistan']")).click();
        element(by.buttonText("Save")).click();
        browser.sleep(5000);

        //add L3-L9
        element(by.xpath("/html/body/main/entity-management/section/costing/section/wbs/section/aside/wbs-tree/div/div[3]")).click();
        element(by.className("actions-btn")).click();
        element(by.buttonText("Add Business")).click();
        element(by.className("input-container")).click();
        element(by.css("a[title='New']")).click();

        element(by.buttonText("Add Family")).click();
        element(by.css("a[title='New Family 1']")).click();

        element(by.buttonText("Add Product")).click();
        element(by.css("a[title='New Product 1']")).click();

        element(by.buttonText("Add Service")).click();
        element(by.css("input[placeholder='Enter Service Name']")).sendKeys("Service1");
        element(by.buttonText("Add Activity")).click();
        element(by.css("input[placeholder='Enter Activity Name']")).sendKeys("Activity1");
        element(by.buttonText("Add Feature")).click();
        element(by.css("input[placeholder='Enter Feature Name']")).sendKeys("Feature1");
        element(by.buttonText("Add Commodity")).click();

        element(by.css("select[name='costClassField']")).$("[value='2']").click();
        element(by.css("select[name='groupTypeField']")).$('[label="Hardware Capital/Support"]').click();
        element(by.css("input[name='costGroupNameField']")).sendKeys(name);

        element(by.buttonText("Save")).click();

        browser.sleep(1000);
    }

}

function LoginPage () {
    this.login = function (name, password) {
        browser.ignoreSynchronization=true;
        browser.get("https://192.168.242.11");
        browser.sleep(1000);
        element(by.id("userNameInput")).sendKeys(name);
        element(by.id("passwordInput")).sendKeys(password);
        element(by.id("submitButton")).click();
        browser.sleep(1000);
        browser.ignoreSynchronization=false;
    }
}


describe("Creating bids with different Commodities...", function () {

    //Logining the app
    new LoginPage().login("mmam@csc-get.local", "Qwerty123");

//    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

    it("Create bid with Commodity HWCS...", function () {

        //generating random name to be checked & duration
        var randomName = "TestBid"+Math.round(Math.random()*100000);
        var bidDuration = 55;

        //creating bid
        new BidList().createBid(randomName, bidDuration);

        //creating structure with Commodity
        new Costing().createHWC_CommodityInBid(randomName);

        //assertion
        element(by.xpath("/html/body/main/entity-management/section/costing/section/wbs/section/aside/wbs-tree/div/div[10]")).getText().then(function (text) {
            console.log(text);
            expect(text).toMatch(randomName);

        });
    });
});
