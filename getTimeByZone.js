/**
* Source from : http://stackoverflow.com/questions/10087819/convert-date-to-another-timezone-in-javascript 
* Use : 
*     calcTime("US East",-4);
*/

/** 
 * function to calculate local time
 * in a different city
 * given the city's UTC offset
 */
function calcTime(city, offset) {

    // create Date object for current location
    var d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return "The local time in " + city + " is " + nd.toLocaleString();
}
