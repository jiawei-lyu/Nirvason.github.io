const DISC = document.getElementById('disc');
const PLAYING_CSS_CLASS = 'playing';

let results = document.getElementById('results');
let audioObject;
let i;

let displayAlbumCovers = (obj) => {
    let div;
    let albumId;
    let image;
    let title;
    results.innerHTML = '';

    let albums = obj.albums.items;

    for (let i = 0; i < albums.length; i++) {
        title = document.createElement('label');
        title.textContent = albums[i].name;

        div = document.createElement('div');

        div.className = 'cover';

        albumId = document.createAttribute('data-album-id');
        albumId.value = albums[i].id;

        div.setAttributeNode(albumId);

        image = albums[i].images[0] === undefined ? '' : albums[i].images[0].url;
        div.style.backgroundImage = `url( ${image} )`;
        div.appendChild(title);
        results.appendChild(div);
    }
};


let searchAlbums = (keyword, callback) => {
    let response;
    let parsedResponse;
    let xhr;
    let queryUrl;

    if (!keyword.length) {
        alert('Please enter something in the search box');
        return;
    }

    queryUrl = `https://api.spotify.com/v1/search?q= ${ keyword } &type=album`;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = () => {
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

let fetchTracks = (albumId, callback) => {
    let queryUrl = `https://api.spotify.com/v1/albums/ ${ albumId }`;
    let response;
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = () => {
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

document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    searchAlbums(document.getElementById('query').value, displayAlbumCovers);
}, false);

results.addEventListener('click', function(e) {
    let target = e.target;

    if (target !== null && target.classList.contains('cover')) {
        if (target.classList.contains(PLAYING_CSS_CLASS)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracks(target.getAttribute('data-album-id'), function(data) {
                data = JSON.parse(data);
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                target.classList.add(PLAYING_CSS_CLASS);
                DISC.classList.add(PLAYING_CSS_CLASS);
                audioObject.addEventListener('ended', function() {
                    target.classList.remove(PLAYING_CSS_CLASS);
                    DISC.classList.remove(PLAYING_CSS_CLASS);
                });
                audioObject.addEventListener('pause', function() {
                    target.classList.remove(PLAYING_CSS_CLASS);
                    DISC.classList.remove(PLAYING_CSS_CLASS);
                });
            });
        }
    }
});