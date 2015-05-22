/**
 * Created by jiawei on 5/11/15.
 */
(function () {
    var links = document.getElementsByTagName('a');
    var len = links.length;
    for (var i = 0; i < len; i++) {
        links[i].addEventListener('click', function (e) {
            console.log(this.style.display);
        });
    }
})();