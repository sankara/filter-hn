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

function restoreOptions(settings) {
    var users = settings.hiddenUsers;
    var ctrUserList = document.querySelector(".ctrHiddenUsers");

    var userList = document.createElement("ul");
    userList.className = "ctrHiddenUsers";
    for(var i = 0; i < users.length; i++) {
        var li = document.createElement("li");
        li.textContent = users[i];
        userList.appendChild(li);
    }
    ctrUserList.parentNode.replaceChild(userList, ctrUserList);
}

document.addEventListener('DOMContentLoaded', () => {
    browser.storage.sync.get().then(restoreOptions);
});
document.querySelector("form").addEventListener("submit", saveOptions);
