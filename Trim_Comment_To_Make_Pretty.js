var sap = inc.sap_response.getJournalEntry(1);

var firstCode = sap.indexOf('[code]');
var lastCode = sap.indexOf('[/code]');
var codeBlock = '[code]';
var sum = firstCode + codeBlock.length;
gs.info(sap.substring(sum, lastCode));
