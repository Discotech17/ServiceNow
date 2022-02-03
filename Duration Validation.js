(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    getTimeDiff();

    function getTimeDiff() {
        var startDate = current.u_start_date.getGlideObject();
        var endDate = current.u_end_date.getGlideObject();

        var duration = gs.dateDiff(startDate.getDisplayValue(), endDate.getDisplayValue(), false);
		
		    var durCheck = parseInt(duration.toString());
		
		
        if (current.u_duration == durCheck) {
            current.short_description.setValue(current.contact_type);
            gs.addInfoMessage('Good Job');
        } else {
            current.short_description.setValue(current.caller_id);
            gs.addInfoMessage('You failed');
			      current.setAbortAction(true);
        }
    }


})(current, previous);

// before business rule
// will pull start and end date.  Find the difference parseInt the duration.  Then check it against a Integer field, if failed abort save/submit
