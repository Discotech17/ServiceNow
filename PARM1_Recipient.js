var array1 = [];

var gr = new GlideRecord('incident');
gr.addEncodedQuery('active=true^sys_created_onRELATIVEGT@minute@ago@60^assigned_toISNOTEMPTY');
gr.query();

while(gr.next()) {
	array1.push(gr.assigned_to + '');
}

var arrayUtil = new ArrayUtil();
gs.eventQueue('timed.notification', gr.incident, arrayUtil.unique(array1), '');