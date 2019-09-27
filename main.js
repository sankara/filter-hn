console.log("main.js");

var closuresToRun = [];

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
},false;

function runOnHNLinks() {
    var matchedLinks = document.querySelectorAll(".hnuser");
    for(var i = 0; i < matchedLinks.length; i++) {
        console.log("Running closures on: " + matchedLinks[i]);
        for(var j = 0; j < closuresToRun.length; j++) {
            closuresToRun[j](matchedLinks[i]);
        }
    }
}

function registerToRunOnHNLinks(closure) {
    closuresToRun.push(closure);
}

function hideUnsavoryCommenters(hiddenUsers) {
    registerToRunOnHNLinks((link) => {
        console.log("Checking to hide comment: " + link);
        if(hiddenUsers.includes(link.textContent))
            link.closest("tr.comtr").className += "noshow coll";
    });
    //recoll();
}

function hideUser(user) {
    browser.storage.sync.get().then((settings) => {
        settings.hiddenUsers.push(user);
        browser.storage.sync.set(settings);
        hideUnsavoryCommenters(settings.hiddenUsers);
        runOnHNLinks();
    });
}

function addHideLink() {
    registerToRunOnHNLinks((link) => {
        console.log("Adding hide link to: " + link);
        var hideLink = document.createElement("a");
        hideLink.innerHTML = " (hide) ";
        hideLink.style.cursor = "pointer";
        hideLink.onclick = (e) => {
            hideUser(link.textContent);
        };
        hideLink.appendAfter(link);
    });
}

function onLoad() {
    console.log("Executing onLoad");
    browser.storage.sync.get().then((settings) => {
        hideUnsavoryCommenters(settings.hiddenUsers);
        addHideLink();
        runOnHNLinks();
    });
}

onLoad();
