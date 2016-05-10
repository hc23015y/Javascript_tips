/**
* Source from : http://www.oschina.net/question/54100_15938?fromerr=qzLMuqdp 
* Use : 
*     function comms(s) {
*        alert(s);
*     }
*     var somethingWrong = repeat(comms, 3, 2000);
*     somethingWrong("Can you hear me, major tom?");
*/

function repeat(fn, times, delay) {
    return function() {
        if (times-- > 0) {
            fn.apply(null, arguments);
            var args = Array.prototype.slice.call(arguments);
            var self = arguments.callee;
            setTimeout(function(){self.apply(null,args)}, delay);
        }
   };
}
