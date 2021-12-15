//Return 'true' to run the job
var answer = false;

//Get the day of week. 1=Monday, 7=Sunday
var now = new GlideDateTime();

//Run only on weekdays
if(now.getDayOfWeek() < 6){
   answer = true;
}
answer;