function initSettings(settings) {
    browser.storage.sync.get().then((s) => {
        browser.storage.sync.set(Object.assign(settings, s));
    });
}

//Keeping this parameter order even though key
function getConfig(key, closure) {
    browser.storage.sync.get().then((settings) => {
        if(key)
            closure(settings[key]);
        else
            closure(settings);
    });
}

function updateSettings(key, closure) {
    browser.storage.sync.get().then((settings) => {
        if(key)
            settings[key] = closure(settings[key]);
        else
            settings = closure(settings);
    });
}
