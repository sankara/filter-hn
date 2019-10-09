# filter-hn

This is a very basic simple addon to block certain users from Hacker News. You'll
maintain your own list of users you don't want to engage with and their comments
are automatically hidden. The user list is synced across browser instances (but
not across browsers). There'd be no global list. This is a personal add-on I built
for my convenience. Built and tested for Fx. Verified to work on Chrome.


## Download

Use the packaged xpi
## Install

	$ npm

## Development

    npm run dev chrome
    npm run dev firefox
    npm run dev opera
    npm run dev edge

## Build

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge

## Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts.

## Docs

* [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)
