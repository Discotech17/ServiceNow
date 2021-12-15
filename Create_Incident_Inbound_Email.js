(function runAction( /*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {

    // Implement email action here
    current.caller_id = gs.getUserID();
    current.comments = "received from: " + email.origemail + "\n\n" + email.body_text;
    current.short_description = email.subject;

    current.category = "inquiry";
    current.incident_state = IncidentState.NEW;
    current.notify = 2;
    current.contact_type = "email";

    if (email.body.assign != undefined)
        current.assigned_to = email.body.assign;

    if (email.importance != undefined) {
        if (email.importance.toLowerCase() == "high") {
            current.impact = 1;
            current.urgency = 1;
        }
    }

    current.insert();

})(current, event, email, logger, classifier);

// Incident Table
// Create an incident from an inbound email
