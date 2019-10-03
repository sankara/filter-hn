console.log("main.js");

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
},false;

function runOnHNLinks(...closures) {
    var matchedLinks = document.querySelectorAll(".hnuser");
    for(var i = 0; i < matchedLinks.length; i++) {
        for(var j = 0; j < closures.length; j++) {
            closures[j](matchedLinks[i]);
        }
    }
}


function hideUnsavoryCommenters(hiddenUsers) {
    return (link) => {
        console.log("Checking to hide comment: " + link);
        if(hiddenUsers.includes(link.textContent))
            link.closest("tr.comtr").className += "noshow coll";
    };
}

function hideUser(user) {
    updateSettings("hiddenUsers", (hiddenUsers) => {
        hiddenUsers.push(user);
        runOnHNLinks(hideUnsavoryCommenters(hiddenUsers));
        return hiddenUsers;
    });
}

function addHideLink() {
    return (link) => {
        if(link.nextSibling.className == "lnkHide")
            return;
        console.log("Adding hide link to: " + link);
        var hideLink = document.createElement("a");
        hideLink.innerHTML = " (hide) ";
        hideLink.style.cursor = "pointer";
        hideLink.style.padding = "0 1px";
        hideLink.className = "lnkHide";
        hideLink.onclick = (e) => {
            hideUser(link.textContent);
        };
        hideLink.appendAfter(link);
    };
}

function onLoad() {
    console.log("Executing onLoad");
    getConfig(undefined, (settings) => {
        runOnHNLinks(
            hideUnsavoryCommenters(settings.hiddenUsers),
            addHideLink());
    });
}

onLoad();
