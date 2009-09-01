function togglePlaylistView() {
    var name = "show-playlist";
    if (document.body.className.indexOf(name) == -1)
        document.body.className += " " + name;
    else
        document.body.className = document.body.className.replace(name, "");
    removeItems();
    addItems();
    setTimeout(windowController.windowResized(), 400);
}

function tableClicked(event) {
    var object = null;
    if (this.tagName == "TD")
        object = this.parent;
    else if (this.tagName == "TR")
        object = this;
    if (!object)
        return;
    object.className += " selected"
}

var emptyItem = {
index: 0,
title: "No title",
artist: "No artist"
};

function init() {
    var playlist = document.getElementById("playlist");
    var table = createTableWithDiv(playlist);
    playlist.table = table;
}

function newItem(index, title) {
    return { index: index, title: title, artist: "" }
}

function addItems() {
    var playlist = document.getElementById("playlist");
    for(i = 0; i < window.PlatformView.count(); i++)
        playlist.table.add(newItem(i, window.PlatformView.titleAtIndex_(i)));
}

function removeItems() {
    var playlist = document.getElementById("playlist");
    playlist.innerHTML = "";
}

var selectedElement = null;
function itemClicked(event) {
    if (selectedElement && selectedElement != this) {
        removeClassNameFromElement(selectedElement, "selected");
        selectedElement = null;
    }
    
    addClassNameToElement(this, "selected");
    selectedElement = this;
}

function itemDoubleClicked(event) {
    console.log("Double clicked " + this.media);
    window.PlatformView.playMediaAtIndex_(this.media.index);
}

function createTableWithDiv(div) {
    var table = new Object();
    table.div = div;
    
    table.add = function(item) {
        var frag = document.createElement("li");
        frag.id = "tableItem" + item.index;
        frag.media = item;
        frag.onclick = itemClicked;
        frag.ondblclick = itemDoubleClicked;
        frag.innerHTML = "<div>"+item.title+"</div>";
        table.div.appendChild(frag);
    }
    
    table.remove = function(item) {
        var playlist = document.getElementById("playlist");
        var playlistItem = document.getElementById("tableItem" + item.index);
        playlist.removeChild(playlistItem);
        
    }
    return table;
}
