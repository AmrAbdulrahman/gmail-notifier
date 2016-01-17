# gmail-notifier
> Cross platform desktop notifier for Gmail.

## Stack
- Electron
- Angular

## Install
- clone git@github.com:AmrAbdulrahman/gmail-notifier.git
- cd gmail-notifier/
- npm install
- bower install
- cd app/
- npm install # install node_modules of the app itself

## Run
- cd gmail-notifier/
- npm start # launches the calculator

## Develope/Debug
- Test as app, with DeveloperTools opened.
  - vim index.js
  - set DevelopmentMode = true
  - npm start

## Package
- npm run package # see full script inside ./package.json -> scripts section
- this should generate packages for Linux/OSX/Darwin on the root of the repo
- you should be able to run the app from binaries as following
  - ./GNotifyMe-linux-x64/GNotifyMe
  
## Give feedback
- I'm still learning and reading up on Electron. so, feel free to open issues on the repo and give feedback and suggestions.
