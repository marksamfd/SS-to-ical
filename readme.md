# PowerCampus Self Service Schedule to ICS File

This repository contains a script that allows you to export your PowerCampus Self Service schedule to an ICS (iCalendar) file. The script uses Puppeteer for web scraping and generates the ICS file with the help of the `ics` library.

## Prerequisites
- Node.js installed on your machine
- Access to PowerCampus Self Service: **Turn on the VPN before using the Code**

## Installation
1. Clone this repository to your local machine.
2. Navigate to the repository's directory.
3. Install the dependencies by running the following command:
   ```
   $ npm install
   ```

## Usage
1. Open a terminal and navigate to the repository's directory.
2. Run the following command to start the script:
   ```
   $ npm start
   ```
3. Follow the prompts to enter your PowerCampus Self Service username and password.
4. Wait for the script to scrape your schedule and generate the ICS file.
5. Once the process is complete, you will find the generated `calendar.ics` file in the repository's directory.

## How to import
To import the generated ICS file into Google Calendar, you can follow these steps:

1. Open [Google Calendar](https://calendar.google.com/) in your web browser and sign in to your Google account.

2. In the left-hand sidebar, click on the "+" button next to "Other calendars" to expand the menu.

3. Select "Import" from the expanded menu. 

4. Click on the "Select file from your computer" button and choose the `calendar.ics` file that was generated by the script.

5. After selecting the file, click the "Import" button.

6. Google Calendar will process the ICS file and import the events into your calendar. A confirmation message will appear once the import is complete.

7. You can now view your PowerCampus Self Service schedule alongside your other Google Calendar events.

## Notes
- The script uses Puppeteer to automate the web scraping process. It launches a headless browser instance and navigates to the PowerCampus Self Service website.
- It will prompt you to enter your username and password to log in to your Self Service account.
- The script will scrape your schedule page and generate an ICS file containing your calendar events.
- The events will include the course ID, course name, event subtype, start time, end time, location, and recurrence rule.
- The imported events may take some time to appear in your calendar
- Any changes or updates to your PowerCampus schedule will not be automatically reflected in the imported events. To keep your Google Calendar up to date, you may need to re-import the updated ICS file periodically.

## Disclaimer
This script is provided as-is and for educational purposes only. Use it responsibly and in accordance with the terms and conditions of PowerCampus Self Service. The developers of this script are not responsible for any misuse or unauthorized access to personal information.

## Contributors 
- @Youssef-Helal-Sharkawy-Kalds thanks alot for testing the code and finding errors
- @budi641 Thanks alot for testing and commenting the code
