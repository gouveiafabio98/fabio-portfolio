var nproject;
var currentIndex = parseInt(new URLSearchParams(window.location.search).get('project'));
var navigation = document.getElementById("navigation");
nprojects();

async function nprojects() {
    await fetch('pages/projects/files.txt')
        .then(function(response) {
            return response.text();
        })
        .then(function(body) {
            nproject = body;
        });

    if (isNaN(currentIndex) || currentIndex > nproject || currentIndex < 0)
        currentIndex = 0
    navigationLoad();
    await load(currentIndex, null);
};

async function load(index, type, newPosition) {
    await fetch('pages/projects/' + index + '.html')
        .then(function(response) {
            return response.text();
        })
        .then(function(body) {
            var newContent = document.createElement("div");
            newContent.classList.add("content");

            if (type != null)
                newContent.classList.add(type);

            newContent.style.top = newPosition + "px";

            newContent.innerHTML = body;
            document.body.append(newContent);
            if (type == "newTop") {
                newContent.style.top = -(newContent.offsetHeight + window.innerHeight * 1.3) + "px";
            }
        });

    //history.pushState("", "", "?project=" + currentIndex);
    history.pushState("", "", "");
    await loadJS();
}

window.onpopstate = function(event) {
    if (currentIndex > 1)
        previousPage();
    else
        topPage(0);
}

function navigationLoad() {
    navigation.innerHTML = "";
    for (var i = 0; i < nproject; i++) {
        navigation.appendChild(document.createElement("div"));
    }
    if (currentIndex > 0)
        navigation.children[currentIndex - 1].classList.add("selected");
}

var loading = document.getElementById("loading").children[1];
var currentLoad = 0,
    loadBlock = true;

setTimeout(loadScreen, 50);

window.onload = function() {
    setTimeout(function() {
        loadBlock = false;
    }, 500);
};

function loadScreen() {
    if (!loadBlock) {
        loading.innerHTML = "100/100";
        document.getElementById("loading").classList.add("done");
    } else if (currentLoad < 99) {
        currentLoad++;
        loading.innerHTML = currentLoad + "/100";
        setTimeout(loadScreen, 50);
    }
}