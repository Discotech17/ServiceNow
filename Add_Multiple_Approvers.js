(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here		
    var assignedTo = new GlideRecord('sc_req_item');
    assignedTo.addQuery('request', current.request);
    assignedTo.orderByDesc('price');
    assignedTo.setLimit(1);
    assignedTo.getValue('assigned_to');
    assignedTo.query();

    if (assignedTo.next()) {
		var split = assignedTo.assigned_to;
		var mgr = split.split(',');		
        var managers = [];
		for (i = 0; i < mgr.length; i++) {
			managers.push(mgr[i]);
		}
		managers.join();
			
        for (i = 0; i < managers.length; i++) {
			var approval = new GlideRecord('sysapproval_approver');
            approval.initialize();
            approval.approver = managers[i];
            approval.sysapproval = current.request;
            approval.state = 'requested';
            approval.insert();
        }
    }
})(current, previous);

//Business Rule.  Multiple people in a list.  Assign them each an approval.
