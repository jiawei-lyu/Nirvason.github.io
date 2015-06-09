///**
// * Created by Jiawei.Lv on 6/8/2015.
// */
var colorGrid = angular.module('colorGrid', []);

colorGrid.controller('colorGridController', function ($scope) {
    var rowIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    rowIds = rowIds.map(function (id) {
       return 'row-' + id;
    });

    $scope.rowIds = rowIds;
    $scope.color = {
        hue: 100,
        opac: 1
    };

    $scope.backgroundColorStrings = buildGrid($scope.color.hue, $scope.color.opac);

    $scope.calcStyle = function (hue, opac) {
        $scope.backgroundColorStrings = buildGrid(hue, opac);
    };
});

function hueToRgb(m1, m2, h) {
    if(h < 0) {
        h = h + 1;
    }
    else if (h > 1) {
        h = h - 1;
    }

    if (h * 6 < 1) {
        return m1 + (m2 - m1) * h * 6;
    }
    else if (h * 2 < 1) {
        return m2;
    }
    else if(h * 3 < 2) {
        return m1 + (m2 - m1) * (2/3 - h) * 6;
    }
    else {
        return m1;
    }
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    var m2 = (l <= 0.5) ? l * (s + 1) : l + s - (l * s),
        m1 = l * 2 - m2,
        r = parseInt(hueToRgb(m1, m2, h + 1/3) * 255),
        g = parseInt(hueToRgb(m1, m2, h) * 255),
        b = parseInt(hueToRgb(m1, m2, h - 1/3) * 255);
    return [r, g, b];
}

function decimalToHex(decimal) {
    var hex = decimal.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
    return '#' + decimalToHex(r) + decimalToHex(r) + decimalToHex(r);
}

function rgbToHex2(r,g,b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString().slice(1);
}

// RGBa to HEX: color = color * alpha + bg * (1 - alpha);

function buildGrid(hue, opac) {
    var backgroundColorStrings = [];
    for (var i = 0; i < 10; i++) {
        var tempRow = [];
        for (var j = 0; j < 10; j++) {
            var hslaString = "hsla(" + hue + ", " + ((i * 10) + 5) + "%, " + ((j * 10) + 5) + "%, " + opac + ")";
            var rgb = hslToRgb(hue, (i * 10) + 5, (j * 10) + 5);
            var rgbaString = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opac + ")";
            var hexString = rgbToHex(rgb[0], rgb[1], rgb[2]);
            tempRow.push([hslaString, rgb, rgbaString, hexString]);
        };
        backgroundColorStrings.push(tempRow);
    };
    return backgroundColorStrings;
}