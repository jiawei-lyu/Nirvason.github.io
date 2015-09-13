var playingCssClass = 'playing',
    audioObject = null,
    results = document.getElementById("results"),
    disc = document.getElementById("chick-disc");

var displayAlbumCovers = function (obj) {
    //{{#each albums.items}}
    //<div style="background-image:url({{images.0.url}})" data-album-id="{{id}}" class="cover"></div>
    //{{/each}}
    results.innerHTML = "";
    var div, albumId, image, title;

    var albums = obj.albums.items;

    for (var i = 0; i < albums.length; i++) {

        title = document.createElement("label");
        title.textContent = albums[i].name;

        div = document.createElement("div");

        div.className = "cover";

        albumId = document.createAttribute("data-album-id");
        albumId.value = albums[i].id;

        div.setAttributeNode(albumId);

        image = albums[i].images[0] === undefined ? "" : albums[i].images[0].url;
        div.style.backgroundImage = "url(" +image + ")";
        div.appendChild(title);
        results.appendChild(div);
    }
};


var searchAlbums = function (keyword, callback) {
    if (keyword.length === 0) {
        alert("Please enter something in the search box");
        return;
    }
    var xhr;
    var queryUrl = "https://api.spotify.com/v1/search?q=" + keyword + "&type=album";
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // good!
            if (xhr.status === 200) {
                var response = xhr.responseText;
                var jsonObject = JSON.parse(response);
                //JSON.parse(response, function (k, v) {
                //    results.innerHTML = response;
                //});
                callback(jsonObject);
            } else {

            }
        } else {
            // not yet
        }
    };

    xhr.open("GET", queryUrl, true);
    xhr.send(null);
};

var fetchTracks = function (albumId, callback) {
    var xhr;
    var queryUrl = "https://api.spotify.com/v1/albums/" + albumId;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // good!
            if (xhr.status === 200) {
                var response = xhr.responseText;
                callback(response);
            } else {

            }
        } else {
            // not yet
        }
    };

    xhr.open("GET", queryUrl, true);
    xhr.send(null);
};

document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    searchAlbums(document.getElementById("query").value, displayAlbumCovers);
}, false);

results.addEventListener('click', function(e) {
    var target = e.target;
    if (target !== null && target.classList.contains('cover')) {
        if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracks(target.getAttribute('data-album-id'), function(data) {
                data = JSON.parse(data);
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                target.classList.add(playingCssClass);
                disc.classList.add(playingCssClass);
                audioObject.addEventListener('ended', function() {
                    target.classList.remove(playingCssClass);
                    disc.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function() {
                    target.classList.remove(playingCssClass);
                    disc.classList.remove(playingCssClass);
                });
            });
        }
    }
});