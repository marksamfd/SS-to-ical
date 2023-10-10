const { datetime, RRule, RRuleSet, rrulestr } = require('rrule')
const ics = require('ics')
const fs = require("fs")

function createCalendar(ssJson) {
    // 2 nested loops first loops on subject second loops in schedules where the actual logic lies\
    const YEARI = 2,
        MONTHI = 0,
        DAYI = 1
    let events = []
    for (let i = 0; i < ssJson.data["schedule"][0].sections[3].length; i++) {
        let subj = ssJson.data.schedule[0].sections[3][i]
        subj.startDate = subj.startDate.split("/").map(el => el * 1)
        subj.endDate = subj.endDate.split("/").map(el => el * 1)
        for (let lectIndex = 0; lectIndex < subj.schedules.length; lectIndex++) {
            let event = {}
            let day = new Date(parseInt(subj.startDate[2]), parseInt(subj.startDate[0]) - 1, parseInt(subj.startDate[1]))
            if (day.getDay() < subj.schedules[lectIndex]["scheduledDays"][0]) {
                subj.startDate[1] += subj.schedules[lectIndex]["scheduledDays"][0] - day.getDay()
                // console.log(day.getDay())
            }
            if (day.getDay() > subj.schedules[lectIndex]["scheduledDays"][0]) {
                subj.startDate[1] -= day.getDay() - subj.schedules[lectIndex]["scheduledDays"][0]
                // console.log(day.getDay(), "ff")
            }

            event.title = `${subj.eventId} - ${subj.eventName.replaceAll("\n", "")} (${subj.eventSubType})`
            event.start = [subj.startDate[YEARI],
            subj.startDate[MONTHI],
            subj.startDate[DAYI],
            subj.schedules[lectIndex].scheduledStartTime[0],
            subj.schedules[lectIndex].scheduledStartTime[1]]
            event.startOutputType = "local"
            event.end = [subj.startDate[YEARI],
            subj.startDate[MONTHI],
            subj.startDate[DAYI],
            subj.schedules[lectIndex].scheduledEndTime[0],
            subj.schedules[lectIndex].scheduledEndTime[1]]

            event.recurrenceRule = new RRule({
                freq: RRule.WEEKLY,
                until: new Date(
                    subj.endDate[YEARI],
                    subj.endDate[MONTHI] - 1,
                    subj.endDate[DAYI],
                    subj.schedules[lectIndex].scheduledEndTime[0],
                    subj.schedules[lectIndex].scheduledEndTime[1]
                )
            }).toString().replace("RRULE:", "")
            event.location = `${subj.schedules[lectIndex].orgName}, ${subj.schedules[lectIndex].bldgName},  ${subj.schedules[lectIndex].roomId}`
            events.push(event)
        }

    }

    ics.createEvents(events, (err, val) => {

        fs.writeFileSync("calendar.ics",val)
    })
    // return schedule.data.schedule[0].sections[3][0]
}

module.exports = {createCalendar}