// Function to map schedule name (MTWThFSaSu) to selected fields properly
// ScheduleName will be (MTWThFSaSu) format
function dayMapping(scheduleName) {
    var schedules = {
        "M": "1",
        "MTWThF": "12345",
        "MTWThFSa": "123456",
        "MTWThFSu": "123457",
        "MTWThFSaSu": "1234567",
        "MTWTh": "1234",
        "Sa": "6",
        "Su": "7",
        "SaSu": "67",
        "TWTh": "234",
        "TWThF": "2345"
    }
    
    return schedules[scheduleName];
}

// Time mapping to make sure start time and days are properly set
function timeMapping(scheduleName, scheduleStartDay, scheduleEndDay) {
    scheduleName = scheduleName.replaceAll(":", "");

    var allDay = false;

    var scheduleStartTime = scheduleName.split("-")[0] + "00";
    var scheduleEndTime = scheduleName.split("-")[1] + "00";

    if (scheduleStartTime == "0000" && scheduleEndTime == "2359") {
        allDay = true;
    } else {
        if (scheduleEndTime < "2359") {
            scheduleEndDay = scheduleStartDay;
        }
    
        if (scheduleStartTime > scheduleEndTime) {
            scheduleEndDay = parseInt(scheduleEndDay) + 1;
        }
    }

    return {
        "allDay": allDay,
        "startTime": scheduleStartTime,
        "endTime": scheduleEndTime,
        "startDay": scheduleStartDay,
        "endDay": scheduleEndDay,
    }
}

// Variables needed to update schedule definition
var daysOfWeek = "";
var time = {};

// Get schedules for customer communication rules
var schedules = new GlideRecord("cmn_schedule");
schedules.addEncodedQuery("u_customer_communication_schedule=true");
schedules.query();
while (schedules.next()) {
    // Get Schedule Definition
    var schedDefinition = new GlideRecord("cmn_schedule_span");
    if (schedDefinition.get("schedule", schedules.getValue("sys_id"))) {
        // If 24x7 name set values
        if (schedules.getValue("name") == "24x7" || schedules.getValue("name") == " 24x7") {
            // Set days to everyday
            // Set object values
            daysOfWeek = "1234567";
            time.allDay = true;
            time.startTime = "000000";
            time.endTime = "230000";
            time.startDay = schedDefinition.getValue("start_date_time").split("T")[0];
            time.endDay = schedDefinition.getValue("start_date_time").split("T")[0];
        } else {
            // Else send values to mappings
            daysOfWeek = dayMapping(schedules.getValue("name").split(" ")[0]);
            time = timeMapping(schedules.getValue("name").split(" ")[1], schedDefinition.getValue("start_date_time").split("T")[0], schedDefinition.getValue("end_date_time").split("T")[0]);
        }

        // Set schedule definition values and update
        schedDefinition.setValue("days_of_week", daysOfWeek);
        schedDefinition.setValue("all_day", time.allDay);
        schedDefinition.setValue("start_date_time", time.startDay + "T" + time.startTime);
        schedDefinition.setValue("end_date_time", time.endDay + "T" + time.endTime);
        schedDefinition.update();
    }
};