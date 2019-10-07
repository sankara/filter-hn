import Config from './utils/config';
import { hideUser, unHideUser } from './utils/user';

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
        if(!link.closest("tr.comtr"))
            return;
        link.closest("tr.comtr").classList[
            hiddenUsers.includes(link.textContent) ? 'add' : 'remove'
        ]('noshow');
    };
}

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

function handleStorageChanges(changes, area) {
    if(area === 'sync' && changes.hiddenUsers &&
       changes.hiddenUsers.newValue != changes.hiddenUsers.oldValue) {
        runOnHNLinks(
            hideUnsavoryCommenters(changes.hiddenUsers.newValue));
    }
}
console.log("Executing onLoad!");
Config.initSettings({"hiddenUsers": []});

Config.getConfig(undefined, (settings) => {
    runOnHNLinks(
        hideUnsavoryCommenters(settings.hiddenUsers),
        addHideLink());
});

browser.storage.onChanged.addListener(handleStorageChanges);
