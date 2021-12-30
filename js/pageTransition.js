var transition = true;
var currentPage;

var click = new Audio('assets/sound/click.mp3');

async function nextPage(newIndex) {
    if (transition) {
        navigation.children[currentIndex - 1].classList.remove("selected");
        currentPage.classList.add("next");
        transition = false;

        if (isNaN(newIndex))
            if (currentIndex < nproject)
                currentIndex++;
            else
                currentIndex = 1;
        else
            currentIndex = newIndex

        load(currentIndex, "newNext");
        setTimeout(removeContent, 1000);
    }

    navigation.children[currentIndex - 1].classList.add("selected");
}

async function previousPage(newIndex) {
    if (transition) {
        navigation.children[currentIndex - 1].classList.remove("selected");
        currentPage.classList.add("previous");
        transition = false;

        if (isNaN(newIndex))
            if (currentIndex > 1)
                currentIndex--;
            else
                currentIndex = nproject;
        else
            currentIndex = newIndex

        load(currentIndex, "newPrevious");
        setTimeout(removeContent, 1000);
    }

    navigation.children[currentIndex - 1].classList.add("selected");
}

async function bottomPage(newIndex) {
    if (transition) {
        currentPage.classList.add("bottom");
        var newPosition = Math.max(currentPage.offsetHeight + window.innerHeight * 0.15, window.innerHeight);
        currentPage.style.top = -newPosition + "px";
        transition = false;

        if (isNaN(newIndex))
            if (currentIndex < nproject)
                currentIndex++;
            else
                currentIndex = 1;
        else
            currentIndex = newIndex

        load(currentIndex, "newBottom", newPosition);
        setTimeout(removeContent, 1000);
        setTimeout(clearClass, 1000);
    }

    navigation.children[currentIndex - 1].classList.add("selected");
}

async function topPage(newIndex) {
    if (transition) {
        navigation.children[currentIndex - 1].classList.remove("selected");
        var newPosition = Math.max(currentPage.offsetHeight + window.innerHeight * 0.3, window.innerHeight);
        currentPage.style.top = newPosition + "px";
        currentPage.classList.add("top");
        transition = false;

        if (isNaN(newIndex))
            if (currentIndex < nproject)
                currentIndex++;
            else
                currentIndex = 1;
        else
            currentIndex = newIndex

        load(currentIndex, "newTop", newPosition);
        setTimeout(removeContent, 1000);
        setTimeout(clearClass, 1000);
    }
}

function removeContent() {
    currentPage.remove();
    loadJS();
    transition = true;
}

function clickSound() {
    click.play();
}

function indexTransition(newIndex, menu) {
    if(!menu) menuOpen();
    window.scrollTo(0, 0);
    if (newIndex != currentIndex) {
        if (currentIndex == 0) {
            bottomPage(newIndex);
            if(navigation.classList.contains("home")){
                navigation.classList.remove("home");
            }
        } else {
            topPage(0);
            if(!navigation.classList.contains("home")){
                navigation.classList.add("home");
            }
        }
        blockBody();
        setTimeout(blockBody, 1000);
    }
}

function blockBody() {
    if (document.body.classList.contains("blocked")) {
        document.body.classList.remove("blocked");
    } else {
        document.body.classList.add("blocked");
    }
}

function clearClass() {
    currentPage.style.top = 0 + "px";
    if (currentPage.classList.contains("newTop")) {
        currentPage.classList.remove("newTop");
    } else if (currentPage.classList.contains("newBottom")) {
        currentPage.classList.remove("newBottom");
    }
}