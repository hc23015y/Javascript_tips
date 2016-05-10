/** Use
* Source from : http://www.oschina.net/question/54100_15938?fromerr=qzLMuqdp 
* Use : 
*     format("%1 %2 %3.","Fank Yang","is","coder");
*/
function format(string) {
    var args = arguments;
    var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
    return String(string).replace(pattern, function(match, index) {
       return args[index];
    });
};
