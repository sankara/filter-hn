import Config from './utils/config';
import unHideUser from './filter.js';


function saveOptions(e) {
    Config.updateConfig(undefined, (settings) => {
        settings.hiddenUsers.push(document.querySelector("#txtUser").value);
        restoreOptions(settings);
    });
    e.preventDefault();
}

function restoreOptions(hiddenUsers) {
    let ctrUserList = document.querySelector(".ctrHiddenUsers");

    let userList = document.createElement("ul");
    userList.className = "ctrHiddenUsers";

    hiddenUsers.forEach((user) => {
        let li = document.createElement("li");
        li.textContent = user;

        let unHideLink = document.createElement("a");
        unHideLink.style.padding = "0 5px";
        unHideLink.style.cursor = "pointer";
        unHideLink.innerHTML = "(x)";
        unHideLink.onclick = (e) => {
            unHideUser(user, (hiddenUsers) => {
                restoreOptions(hiddenUsers);
            });
        };

        li.appendChild(unHideLink);

        userList.appendChild(li);
    });

    ctrUserList.parentNode.replaceChild(userList, ctrUserList);
}

document.addEventListener('DOMContentLoaded', () => {
    Config.getConfig("hiddenUsers", (hiddenUsers) => {
        restoreOptions(hiddenUsers);
    });
});
document.querySelector("form").addEventListener("submit", saveOptions);
