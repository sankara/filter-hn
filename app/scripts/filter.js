import Config from './utils/config';

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;


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
        link.closest("tr.comtr").classList[
            hiddenUsers.includes(link.textContent) ? 'add' : 'remove'
        ]("noshow");
    };
}

function hideUser(user, callback=()=>{}) {
    Config.updateSettings("hiddenUsers", (hiddenUsers) => {
        hiddenUsers.push(user);
        callback(hiddenUsers);
        return hiddenUsers;
    });
}

function unHideUser(user, callback) {
    Config.updateSettings("hiddenUsers", (hiddenUsers) => {
        hiddenUsers.splice(hiddenUsers.indexOf(user), 1);
        callback(hiddenUsers);
        return hiddenUsers;
    });
}

export {hideUser, unHideUser};

function addHideLink() {
    return (link) => {
        if(link.nextSibling.className == "lnkHide")
            return;
        var hideLink = document.createElement("a");
        hideLink.innerHTML = "(hide)";
        hideLink.style.cursor = "pointer";
        hideLink.style.padding = "0 3px";
        hideLink.className = "lnkHide";
        hideLink.onclick = (e) => {
            hideUser(link.textContent);
        };
        hideLink.appendAfter(link);
    };
}

function onLoad() {
    console.log("Executing onLoad!");
    Config.initSettings({"hiddenUsers": []});
    Config.getConfig(undefined, (settings) => {
        runOnHNLinks(
            hideUnsavoryCommenters(settings.hiddenUsers),
            addHideLink());
    });
    //TODO: Subscribe to browser.storage.onChanged(changes, area) and trigger things accordingly
}

onLoad();
