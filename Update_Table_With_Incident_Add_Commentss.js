(function executeRule(current, previous /*null when async*/) {    
    
    var grOutage = new GlideRecord('cmdb_ci_outage');
    grOutage.addQuery('task_number', current.sys_id); //query the sys_id on the incident table's from the task_number field on the cmdb_ci_outage table
    grOutage.query();
    
    while (grOutage.next()) {
        grOutage.short_description = current.comments.getJournalEntry(1); //populate the cmdb_ci_outage table short_description field with the most recent additional comment
        grOutage.update();
    }
})(current, previous);

//business rule to update the short_description on outage form.
//after update business rule on the incident table.