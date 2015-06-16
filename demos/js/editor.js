/**
 * Created by Jiawei.Lv on 6/15/2015.
 */
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

function RGB2Color(r, g, b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}
function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}
//function RGB2Color(r, g, b) {
//    return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
//}
function makeColorGradient(frequency1, frequency2, frequency3,
                           phase1, phase2, phase3,
                           center, width, len) {
    if (center == undefined) center = 128;
    if (width == undefined) width = 127;
    if (len == undefined) len = 50;

    for (var i = 0; i < len; ++i) {
        var red = Math.sin(frequency1 * i + phase1) * width + center;
        var grn = Math.sin(frequency2 * i + phase2) * width + center;
        var blu = Math.sin(frequency3 * i + phase3) * width + center;
        document.write('<font color="' + RGB2Color(red, grn, blu) + '">&#9608;</font>');
    }
}

makeColorGradient(.3,.3,.3,0,2,4,128,127);