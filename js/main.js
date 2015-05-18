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
})();