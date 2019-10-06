//This is so primitive. Need a high level library that can replace, append, remove
//properties
function saveOptions(e) {
    browser.storage.sync.get().then((settings) => {
        settings.hiddenUsers.push(document.querySelector("#txtUser").value);
        browser.storage.sync.set(settings);
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
            console.log(user);
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
    getConfig("hiddenUsers", (hiddenUsers) => {
        restoreOptions(hiddenUsers);
    });
});
document.querySelector("form").addEventListener("submit", saveOptions);
