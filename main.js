
_local = false;
_localCookie = "";


function init() {
    showTot = document.getElementById("showTot");
    showToday = document.getElementById("showToday");

    today = getToday();
    tot = getCookie(today);
    list = getCookie(today + "_list");
    list = list.split("#");
    console.log(list);
    for (i = 0; i < list.length; i++) {
        elem = list[i];
        div = document.getElementById("list");
        if (elem !== "") {
            button = document.createElement("button");
            button.id = "button_" + i;
            button.setAttribute("onclick", "remove(" + i + ")");
            button.innerText = elem;
            button.style = "width:100%;height:30pt;font-size:20pt";
            div.appendChild(button);
        }
    }
    if (tot === "") {
        tot = 0;
        setCookie(today, 0, 10);
    }
    showTot.innerText = tot;
    showToday.innerText = today;
}

function add() {
    kalories = parseInt(document.getElementById("kalories").value);
    if (isNaN(kalories)) kalories = 0;
    today = getToday();
    tot = parseInt(getCookie(today));
    if (tot === "") tot = kalories;
    else tot = tot + kalories;
    setCookie(today, tot, 10);
    newTot = getCookie(today);

    if (kalories !== 0) {
        listString = getCookie(today + "_list");
        if(listString == "")
            list = new Array();
        else
            list = listString.split("#");
        list.push(kalories);
        listString = list.join("#");
        console.log(list);
        setCookie(today + "_list", listString, 10);
        div = document.getElementById("list");
        buttons = document.getElementsByTagName("button")
        i = buttons.length;
        button = document.createElement("button");
        button.id = "button_" + i;
        button.setAttribute("onclick", "remove(" + i + ")");
        button.innerText = kalories;
        button.style = "width:100%;height:30pt;font-size:20pt";
        div.appendChild(button);
    }
    showTot.innerText = newTot;

    showToday.innerText = today;

    document.getElementById("kalories").value = "";
    document.getElementById("kalories").focus();
}

function remove(pos) {
    today = getToday();
    listString = getCookie(today + "_list");
    list = listString.split("#");
    i = 0;
    list = list.filter(l => {
      if (i++ != pos) return l;
    });
    tot = list.reduce((acc, value) => accumulator + parseInt(value), 0);
    listString = list.join("#");
    setCookie(today + "_list", listString, 10);
    setCookie(today, tot, 10);

    div = document.getElementById("list");

    while (div.childNodes.length > 0) {
        div.removeChild(div.childNodes[0]);
    }
alert();
    for (i = 0; i < list.length; i++) {
        elem = list[i];
        if (elem !== "") {
            button = document.createElement("button");
            button.id = "button_" + i;
            button.setAttribute("onclick", "remove(" + i + ")");
            button.innerText = elem;
            button.style = "width:100%;height:30pt;font-size:20pt";
            div.appendChild(button);
        }
    }

    newTot = getCookie(today);
    showTot.innerText = newTot;

}

function addDynamic(text, val) {
    max = 0;
    interval = window.setInterval(function () {

        current = parseInt(text);
        current++;
        text = current;
        max++
        if (max == val) window.clearInterval(interval);
    }, 100);
}

function getCookie(cname) {
    name = cname + "=";
    decodedCookie = decodeURIComponent(getCookieWrapper());
    ca = decodedCookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    setCookieWrapper(cname + "=" + cvalue + ";" + expires + ";path=/");
}

function getToday() {
    today = new Date();
    date = today.getDate() + '-' + padZerosLeft((today.getMonth() + 1), 2) + '-' + today.getFullYear();
    return date;
}

function padZerosLeft(num, length) {
    return String("00000" + num).slice(-length);
}


function getCookieWrapper() {
    if (_local === true) return _localCookie;
    else return document.cookie;
}

function setCookieWrapper(newCookie) {
    if (_local === true) {
        toAdd = newCookie.split(";")[0];
        newCookieName = toAdd.split("=")[0];

        console.log("name: " + newCookieName);

        ca = _localCookie.split(';');
        console.log(ca);
        result = "";
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(newCookieName) == 0) {
                console.log("removing existing cookie");
            }
            else {
                if (c !== "") result = result + c + "; ";
                console.log(result);
            }
        }
        result = result + toAdd + "; ";
        console.log("adding cookie");
        _localCookie = result;
        console.log("new cookie set: " + _localCookie);
    }
    else document.cookie = newCookie
}
