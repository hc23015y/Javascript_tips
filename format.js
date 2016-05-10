/**
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

/**
* Source from : http://www.oschina.net/question/54100_15938?fromerr=qzLMuqdp 
* Use : 
*     var majorTom = makeFunc(format, "This is Major Tom to ground control. I'm %1 %2.");
*     majorTom("coder","Fank Yang")    
*/
function makeFunc() {
    var args = Array.prototype.slice.call(arguments);
    var func = args.shift();
    return function() {
      return func.apply(null,   args.concat(Array.prototype.slice.call(arguments)));};
};
