var vh = window.innerHeight * 0.01;
var vw = window.innerHeight * 0.01;
var cursor, cursorActive, menu;

function loadJS() {
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.onresize = function () {
        vh = window.innerHeight * 0.01;
        vw = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        getDevice();
    };

    cursor = document.getElementById("cursor");

    document.body.addEventListener("mousemove", cursorMove);

    document.body.addEventListener("touchstart", cursorMoveMobile);
    document.body.addEventListener("touchmove", cursorMoveMobile);

    cursorActive = document.getElementsByClassName("active");

    for (var i = 0; i < cursorActive.length; i++) {
        cursorObjectActive(cursorActive[i]);
    }

    menu = document.getElementById("menu");

    menu.addEventListener("click", menuOpen);

    currentPage = document.getElementsByClassName("content")[0];
}

/* ---------------- FUNCTIONS ---------------- */

function cursorMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (device == "desktop") {
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    }
}

function cursorMoveMobile(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function mobileMouse() {
    cursorPosition = cursor.getBoundingClientRect();
    cursor.style.left = lerp(cursorPosition.left, mouseX, 0.1) + "px";
    cursor.style.top = lerp(cursorPosition.top, mouseY, 0.1) + "px";
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

function cursorObjectActive(object) {
    object.addEventListener("click", clickSound);

    object.addEventListener("mouseenter", function () {
        if (device == "desktop") {
            cursor.classList.add("active");
            if (!!this.getAttribute("mouse_event"))
                cursor.classList.add(this.getAttribute("mouse_event"));
        }
    });

    object.addEventListener("mouseleave", function () {
        if (device == "desktop") {
            cursor.classList.remove("active");
            if (!!this.getAttribute("mouse_event"))
                cursor.classList.remove(this.getAttribute("mouse_event"));
        }
    });
}

/* ---------------- MENU ---------------- */

function menuOpen() {
    if (document.body.classList.contains("menu"))
        document.body.classList.remove("menu");
    else
        document.body.classList.add("menu");
}

/* ---------------- EASTER EGG ---------------- */
document.addEventListener('keydown', function () {
    if (event.keyCode == 123) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        return false;
    } else if (event.ctrlKey && event.keyCode == 85) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        return false;
    }
}, false);

/*if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function () {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        window.event.returnValue = false;
    });
}*/

var clickEaster = 0;
var clickEasterWait;

document.addEventListener("click", function () {
    clickEaster++;
    clearTimeout(clickEasterWait);
    clickEasterWait = setTimeout(resetClickEaster, 500);
    if (clickEaster >= 5) {
        cursor.classList.add("easter");
        setTimeout(function () {
            cursor.classList.remove("easter");
        }, 2000);
    }
});

function resetClickEaster() {
    clickEaster = 0;
}