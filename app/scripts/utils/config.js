export default class Config {
    static initSettings(settings) {
        browser.storage.sync.get().then((s) => {
            browser.storage.sync.set(Object.assign(settings, s));
        });
    }

    //Keeping this parameter order even though key
    static getConfig(key, closure) {
        browser.storage.sync.get().then((settings) => {
            if(key)
                closure(settings[key]);
            else
                closure(settings);
        });
    }

    static updateSettings(key, closure) {
        browser.storage.sync.get().then((settings) => {
            if(key)
                settings[key] = closure(settings[key]);
            else
                settings = closure(settings);
            browser.storage.sync.set(settings);
        });
    }
}
