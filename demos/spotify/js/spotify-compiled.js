'use strict';

var DISC = document.getElementById('disc');
var PLAYING_CSS_CLASS = 'playing';

var results = document.getElementById('results');
var audioObject = undefined;
var i = undefined;

var displayAlbumCovers = function displayAlbumCovers(obj) {
    var div = undefined;
    var albumId = undefined;
    var image = undefined;
    var title = undefined;
    results.innerHTML = '';

    var albums = obj.albums.items;

    for (var _i = 0; _i < albums.length; _i++) {
        title = document.createElement('label');
        title.textContent = albums[_i].name;

        div = document.createElement('div');

        div.className = 'cover';

        albumId = document.createAttribute('data-album-id');
        albumId.value = albums[_i].id;

        div.setAttributeNode(albumId);

        image = albums[_i].images[0] === undefined ? '' : albums[_i].images[0].url;
        div.style.backgroundImage = 'url( ' + image + ' )';
        div.appendChild(title);
        results.appendChild(div);
    }
};

var searchAlbums = function searchAlbums(keyword, callback) {
    var response = undefined;
    var parsedResponse = undefined;
    var xhr = undefined;
    var queryUrl = undefined;

    if (!keyword.length) {
        alert('Please enter something in the search box');
        return;
    }

    queryUrl = 'https://api.spotify.com/v1/search?q= ' + keyword + ' &type=album';
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // good!
            if (xhr.status === 200) {
                response = xhr.responseText;
                parsedResponse = JSON.parse(response);
                callback(parsedResponse);
            } else {
                console.log('Not Ready Yet');
            }
        }
    };

    xhr.open('GET', queryUrl, true);
    xhr.send(null);
};

var fetchTracks = function fetchTracks(albumId, callback) {
    var queryUrl = 'https://api.spotify.com/v1/albums/ ' + albumId;
    var response = undefined;
    var xhr = undefined;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // good!
            if (xhr.status === 200) {
                response = xhr.responseText;
                callback(response);
            } else {
                console.log('Not Ready Yet');
            }
        }
    };

    xhr.open('GET', queryUrl, true);
    xhr.send(null);
};

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    searchAlbums(document.getElementById('query').value, displayAlbumCovers);
}, false);

results.addEventListener('click', function (e) {
    var target = e.target;

    if (target !== null && target.classList.contains('cover')) {
        if (target.classList.contains(PLAYING_CSS_CLASS)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracks(target.getAttribute('data-album-id'), function (data) {
                data = JSON.parse(data);
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                target.classList.add(PLAYING_CSS_CLASS);
                DISC.classList.add(PLAYING_CSS_CLASS);
                audioObject.addEventListener('ended', function () {
                    target.classList.remove(PLAYING_CSS_CLASS);
                    DISC.classList.remove(PLAYING_CSS_CLASS);
                });
                audioObject.addEventListener('pause', function () {
                    target.classList.remove(PLAYING_CSS_CLASS);
                    DISC.classList.remove(PLAYING_CSS_CLASS);
                });
            });
        }
    }
});

//# sourceMappingURL=spotify-compiled.js.map