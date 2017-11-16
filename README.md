# Trackerstone

<a target="_blank" href="https://keiwen.github.io/Trackerstone/">Try it on web browser</a> and get mobile app (see below)! (Oh, seems to have some issues with IE)

Current version is 0.7.4 as Progressive Web App !!

> Please note that this project is an experiment with VueJS framework and Progressive Web App, maintained on free-time without guarantee :)

Simple Hearthstone tracker. Just track your win and loss. On app you'll find:
- your current rank and star (standard/wild)
- how many win needed 'til next rank milestone
- global winrate, detail by hours of play
- winrate with each deck
- persist data in local browser storage
- stats against opponent's deck types
- charts on rank progress, deck winrates
- set notes on deck types
- arena tracker (and gold refund)

Maybe one day this app will:
- *known issue*: filter deck type by star is broken
- be mobile first designed
- have a full design ;)
- get MOAR CHARTS!!! CHARTS EVERYWHERE!!!
- get a lot of pink unicorned stuff

## Mobile app
Trackerstone is a Progressive Web Application, meaning that it's designed to work both on web browser and mobile app.

With your mobile device, go on <a target="_blank" href="https://keiwen.github.io/Trackerstone/">Trackerstone page</a>, then:

1) You have a smart browser, it will ask you by itself if you want to add Trackerstone.

2) Basic way: open the menu and select "add to home screen".

Now you can just click on the Trackerstone icon on your device to open a fullscreen application!

Mobile app orientation is landscape defined, as you should use Hearthstone game landscape as well.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
If issue with node-sass on npm-install
``` bash
rm -rf node_modules
rm package-lock.json
npm cache clean --force
npm install
```
