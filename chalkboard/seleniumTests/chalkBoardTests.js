var webdriver = require('selenium-webdriver');

function login(){

    const driver = new webdriver.Builder().forBrowser('chrome').build();

    driver.navigate().to('http://localhost:3000/')
    .then(() => driver.findElement(webdriver.By.name('Username')).sendKeys('jdoe'))
    .then(() => driver.findElement(webdriver.By.name('Password')).sendKeys('123'))
    .then(() => driver.sleep(2000))
    .then(() => driver.findElement(webdriver.By.name('submitButton')).click())
    .then(() => { 
        setTimeout(2000);
    });
}

function failLogin(){
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    driver.navigate().to('http://localhost:3000/')
    .then(() => driver.findElement(webdriver.By.name('Username')).sendKeys('jdoe'))
    .then(() => driver.findElement(webdriver.By.name('Password')).sendKeys('12'))
    .then(() => driver.sleep(2000))
    .then(() => driver.findElement(webdriver.By.name('submitButton')).click())
    .then(() => { 
        setTimeout(2000);
    });
}

function addStudentToClass(){
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    driver.navigate().to('http://localhost:3000/')
    .then(() => driver.findElement(webdriver.By.name('Username')).sendKeys('jdoe'))
    .then(() => driver.findElement(webdriver.By.name('Password')).sendKeys('123'))
    .then(() => driver.sleep(2000))
    .then(() => driver.findElement(webdriver.By.name('submitButton')).click())
    .then(() => driver.wait(driver.findElement(webdriver.By.id('viewAllClasses')).click(),2000)
    .then(() => {
        driver.navigate().refresh();
        setTimeout(2000);
    })).catch((e) => {console.log("shii not found")});
}


// login();
// failLogin();
addStudentToClass();