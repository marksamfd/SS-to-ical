// Import necessary libraries and modules.
const { datetime, RRule, RRuleSet, rrulestr } = require('rrule');
const ics = require('ics');
const fs = require("fs");

// Define a function to create a calendar from the provided JSON data.
function createCalendar(ssJson) {
    // Constants for date indices.
    const YEARI = 2;
    const MONTHI = 0;
    const DAYI = 1;

    // Initialize an empty array to store calendar events.
    let events = [];

    // Loop through subjects in the JSON data.
    for (let i = 0; i < ssJson.data["schedule"][0].sections[3].length; i++) {
        let subj = ssJson.data.schedule[0].sections[3][i];

        // Convert date strings to arrays.
        subj.startDate = subj.startDate.split("/").map(el => el * 1);
        subj.endDate = subj.endDate.split("/").map(el => el * 1);

        // Loop through lecture schedules within the subject.
        for (let lectIndex = 0; lectIndex < subj.schedules.length; lectIndex++) {
            let event = {};
            let day = new Date(
                parseInt(subj.startDate[2]),
                parseInt(subj.startDate[0]) - 1,
                parseInt(subj.startDate[1])
            );

            // Adjust the start date based on scheduled days.
            if (day.getDay() < subj.schedules[lectIndex]["scheduledDays"][0]) {
                subj.startDate[1] += subj.schedules[lectIndex]["scheduledDays"][0] - day.getDay();
            }
            if (day.getDay() > subj.schedules[lectIndex]["scheduledDays"][0]) {
                subj.startDate[1] -= day.getDay() - subj.schedules[lectIndex]["scheduledDays"][0];
            }

            // Configure event properties.
            event.title = `${subj.eventId} - ${subj.eventName.replaceAll("\n", "")} (${subj.eventSubType})`;
            event.start = [
                subj.startDate[YEARI],
                subj.startDate[MONTHI],
                subj.startDate[DAYI],
                subj.schedules[lectIndex].scheduledStartTime[0],
                subj.schedules[lectIndex].scheduledStartTime[1]
            ];
            event.startOutputType = "local";
            event.end = [
                subj.startDate[YEARI],
                subj.startDate[MONTHI],
                subj.startDate[DAYI],
                subj.schedules[lectIndex].scheduledEndTime[0],
                subj.schedules[lectIndex].scheduledEndTime[1]
            ];

            // Define a recurrence rule for weekly events.
            event.recurrenceRule = new RRule({
                freq: RRule.WEEKLY,
                until: new Date(
                    subj.endDate[YEARI],
                    subj.endDate[MONTHI] - 1,
                    subj.endDate[DAYI],
                    subj.schedules[lectIndex].scheduledEndTime[0],
                    subj.schedules[lectIndex].scheduledEndTime[1]
                )
            }).toString().replace("RRULE:", "");

            event.location = `${subj.schedules[lectIndex].orgName}, ${subj.schedules[lectIndex].bldgName},  ${subj.schedules[lectIndex].roomId}`;

            // Add the event to the array.
            events.push(event);
        }
    }

    // Create an iCalendar (ICS) file from the events and save it.
    ics.createEvents(events, (err, val) => {
        fs.writeFileSync("calendar.ics", val);
    });

    // Export the function to make it available for use in other modules.
}

// Export the function as a module.
module.exports = { createCalendar };
