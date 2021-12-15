var gr = new GlideRecord('sc_request');
gr.addQuery('request_item', current.sys_id);
gr.query();

while(gr.next()) {
    var comments = current.comments.getJournalEntry(-1);
    var na = comments.split("\n\n");
    for (var i = 0; i < na.length; i++){
        gr.comments = na[i].toString();
        gr.update();
    }
}