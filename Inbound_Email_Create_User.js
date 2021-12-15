(function runAction( /*GlideRecord*/ current, /*GlideRecord*/ event, /*EmailWrapper*/ email, /*ScopedEmailLogger*/ logger, /*EmailClassifier*/ classifier) {

    var splitEmail = email.origemail;
    var justName = splitEmail.substring(0, splitEmail.lastIndexOf('@'));
    var firstName = justName.substring(0, justName.lastIndexOf('.'));
    var lastName = justName.substring(justName.lastIndexOf('.') + 1);

    var aspenUser = new GlideRecord('sys_user');
    aspenUser.initialize();
    aspenUser.user_name = email.origemail;
    aspenUser.first_name = firstName.charAt(0).toUpperCase() + firstName.substr(1).toLowerCase();
    aspenUser.last_name = lastName.charAt(0).toUpperCase() + lastName.substr(1).toLowerCase();
    aspenUser.email = email.origemail;
    aspenUser.company = '86c1f3193790200044e0bfc8bcbe5d95'; //Acme Africa
    if (aspenUser.email) {
        user.addQuery('email', current.email.toString());
        user.addActiveQuery();
        user.query();
        if (user.next() && user.sys_id != current.sys_id) {
            current.setAbortAction(true);
        } else {
            aspenUser.insert();
        }
    }
	

    current.comments = "received from: " + email.origemail + "\n\n" + email.body_text;
    current.short_description = email.subject;
    current.description = email.body_text;

    current.state = 1;
    current.notify = 2;
    current.contact_type = "email";
    current.impact = 3;
    current.urgency = 2;
    current.caller_id = aspenUser.getDisplayValue();
    current.company = aspenUser.company; //Acme Africa

    current.insert();
})(current, event, email, logger, classifier);

// This doesn't work properly due to automatic creation by the system.  Would have to find the user and update their company based off the inbound email action.
//Business Rule is easier