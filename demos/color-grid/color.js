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

function huetorgb(m1, m2, h) {
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

function hsltorgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    var m2 = (l <= 0.5) ? l * (s + 1) : l + s - (l * s),
        m1 = l * 2 - m2,
        r = parseInt(huetorgb(m1, m2, h + 1/3) * 255),
        g = parseInt(huetorgb(m1, m2, h) * 255),
        b = parseInt(huetorgb(m1, m2, h - 1/3) * 255);
    return [r, g, b];
}

function buildGrid(hue, opac) {
    var backgroundColorStrings = [];
    for (var i = 0; i < 10; i++) {
        var tempRow = [];
        for (var j = 0; j < 10; j++) {
            var hslaString = "hsla(" + hue + ", " + ((i * 10) + 5) + "%, " + ((j * 10) + 5) + "%, " + opac + ")";
            var rgb = hsltorgb(hue, (i * 10) + 5, (j * 10) + 5);
            var rgbaString = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opac + ")";
            tempRow.push([hslaString, rgb, rgbaString]);
        };
        backgroundColorStrings.push(tempRow);
    };
    return backgroundColorStrings;
}