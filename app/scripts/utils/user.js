import Config from './config';

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
