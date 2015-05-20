/**
 * Created by jiawei on 5/11/15.
 */
//(function () {
//    var one = document.getElementsByClassName('one')[0];
//    document.addEventListener('click', function (e) {
//        one.style.left = e.pageX;
//        one.style.right = e.pageY;
//        add('div');
//    })
//
//    function add(type) {
//        var element = document.createElement(type);
//        //Assign different attributes to the element.
//
//        element.style.position = 'absolute';
//        element.style.left = Math.random() * 100 + 'px';
//        element.style.top = Math.random() * 100 + 'px';
//        console.log(element.style.left );
//        element.style.height = '100px';
//        element.style.width = '100px';
//        element.style.background = 'red';
//
//        var body = document.getElementsByTagName('body')[0];
//        //Append the element in page (in span).
//        body.appendChild(element);
//    }
//})();

(function () {
    var links = document.getElementsByTagName('a');
    var len = links.length;
    for (var i = 0; i < len; i++) {
        links[i].addEventListener('click', function (e) {
            console.log(this.style.display);
        });
    }

    var cssPrefix = 'webkit';
    //var cssPrefix = false;
    //switch(Browser.name) {
    //    case "safari":
    //        cssPrefix = "webkit";
    //        break;
    //    case "chrome":
    //        cssPrefix = "webkit";
    //        break;
    //    case "firefox":
    //        cssPrefix = "moz";
    //        break;
    //    case "opera":
    //        cssPrefix = "o";
    //        break;
    //    case "ie":
    //        cssPrefix = "ms";
    //        break;
    //}

    // Spin them rays!
    if(cssPrefix) { // Skip IE!
        var wrapper = document.getElementById("wrapper"), degrees = 0, speed = 0.05;
        setInterval(function() {
            degrees += speed; // degree adjustment each interval
            wrapper.setAttribute("style","-" + cssPrefix + "-transform:rotate(" + degrees + "deg)");
        },20);
    }

    //wrapper.addEvents({
    //    mouseenter: function() { // 5x! Warp speed!
    //        speed = 0.25;
    //    },
    //    mouseleave: function() { // Back to normal;
    //        speed = 0.05;
    //    }
    //});
})();