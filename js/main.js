/**
 * Created by jiawei on 5/11/15.
 */
//(function () {
//    var links = document.getElementsByTagName('a');
//    var len = links.length;
//    for (var i = 0; i < len; i++) {
//        links[i].addEventListener('click', function (e) {
//            console.log(this.style.display);
//        });
//    }
//
//    var cssPrefix = 'webkit';
//    //var cssPrefix = false;
//    //switch(Browser.name) {
//    //    case "safari":
//    //        cssPrefix = "webkit";
//    //        break;
//    //    case "chrome":
//    //        cssPrefix = "webkit";
//    //        break;
//    //    case "firefox":
//    //        cssPrefix = "moz";
//    //        break;
//    //    case "opera":
//    //        cssPrefix = "o";
//    //        break;
//    //    case "ie":
//    //        cssPrefix = "ms";
//    //        break;
//    //}
//
//    // Spin them rays!
//    if(cssPrefix) { // Skip IE!
//        var wrapper = document.getElementById("wrapper"), degrees = 0, speed = 0.05;
//        setInterval(function() {
//            degrees += speed; // degree adjustment each interval
//            wrapper.setAttribute("style","-" + cssPrefix + "-transform:rotate(" + degrees + "deg)");
//        },20);
//    }
//
//    //wrapper.addEvents({
//    //    mouseenter: function() { // 5x! Warp speed!
//    //        speed = 0.25;
//    //    },
//    //    mouseleave: function() { // Back to normal;
//    //        speed = 0.05;
//    //    }
//    //});
//})();