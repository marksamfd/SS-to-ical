// Import the Puppeteer library for web scraping.
const puppeteer = require('puppeteer');
// Import a function called createCalendar from scrap.js.
const { createCalendar } = require("./scrap");
// Import the readline module for user input
const readline = require('readline');

// Initialize variables to store the username and password.
let username = "";
let password = "";

// Create a readline interface for user input.
let rl = readline.createInterface(
    process.stdin, process.stdout);

// Ask the user to input their Self-service username.
rl.question("Enter your Self-service username: ", (user) => {
    username = user;
    // Ask the user to input their Self-service password.
    rl.question("Enter your Self-service password: ", async (pass) => {
        password = pass;
        console.log("Please wait ...");
        // Call the createScrapCal function after getting user input.
        await createScrapCal();
    });
});
// Function to perform web scraping and create a calendar.
const createScrapCal = async () => {
    // Launch a headless browser instance.
    const browser = await puppeteer.launch({ headless: "new" });
    // Create a new page in the browser.
    const page = await browser.newPage();
    const timeout = 60000; // Set a timeout for page actions.
    page.setDefaultTimeout(timeout);

    // Listen for responses from the page.
    page.on("response", (res) => {
        // Check if the URL matches the Schedule page.
        if (res.url() === `https://sisselfservice.zewailcity.edu.eg/PowerCampusSelfService/Schedule/Student`) {
            res.json().then((res) => {
                // Call the createCalendar function with the response data.
                createCalendar(JSON.parse(res));
                // Close the browser and provide a message when done.
                browser.close().then(() => {
                    console.log("File saved as calendar.ics");
                    rl.close();
                });
            });
        }
    });

    {
        const targetPage = page;
        const promises = [];

        // Define a function to start waiting for navigation events.
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }

        // Start waiting for events.
        startWaitingForEvents();

        // Navigate to the login page.
        await targetPage.goto('https://sisselfservice.zewailcity.edu.eg/PowerCampusSelfService/Home/LogIn?ReturnUrl=%2FPowerCampusSelfService%2FRegistration%2FSchedule');

        // Wait for all the promises to resolve.
        await Promise.all(promises);
    }

    {
        const targetPage = page;

        // Locate the username input field using different selectors.
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Username)'),
            targetPage.locator('#txtUserName'),
            targetPage.locator('::-p-xpath(//*[@id=\\"txtUserName\\"])'),
            targetPage.locator(':scope >>> #txtUserName')
        ])
            .setTimeout(timeout)
            .fill(username); // Fill the username field with the provided username.
    }

    {
        const targetPage = page;

        // Locate and click the "Next" button.
        await puppeteer.Locator.race([
            targetPage.locator('span > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"btnNext\\"]/span/span)'),
            targetPage.locator(':scope >>> span > span'),
            targetPage.locator('::-p-text(Next)')
        ])
            .setTimeout(timeout)
            .click(); // Click the "Next" button.
    }

    {
        const targetPage = page;

        // Locate the password input field using different selectors.
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Password)'),
            targetPage.locator('#txtPassword'),
            targetPage.locator('::-p-xpath(//*[@id=\\"txtPassword\\"])'),
            targetPage.locator(':scope >>> #txtPassword')
        ])
            .setTimeout(timeout)
            .fill(password); // Fill the password field with the provided password.
    }

    {
        const targetPage = page;
        const promises = [];

        // Define a function to start waiting for navigation events.
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }

        // Locate and click the "Sign in" button, while waiting for navigation.
        await puppeteer.Locator.race([
            targetPage.locator('div.jssEGb7Iu2BR_422 span > span'),
            targetPage.locator('::-p-xpath(//*[@id=\\"btnSignIn\\"]/span/span)'),
            targetPage.locator(':scope >>> div.jssEGb7Iu2BR_422 span > span'),
            targetPage.locator('::-p-text(Sign in)')
        ])
            .on('action', () => startWaitingForEvents())
            .click(); // Click the "Sign in" button.

        // Wait for all the promises to resolve.
        await Promise.all(promises);
    }

    {
        const targetPage = page;

        // Locate and click the "Period 2022/FALL" dropdown.
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Period 2022/FALL)'),
            targetPage.locator('#ddlPeriod_value'),
            targetPage.locator('::-p-xpath(//*[@id=\\"ddlPeriod_value\\"])'),
            targetPage.locator(':scope >>> #ddlPeriod_value')
        ])
            .setTimeout(timeout)
            .click(); // Click the dropdown to select the period.
    }
}

