# Trackerstone

<a target="_blank" href="https://keiwen.github.io/Trackerstone/">Try it!</a> (Oh seems to have some issues with IE)

Current version is 0.4.0

> Experiments with VueJS framework

Simple Hearthstone tracker. Just track your win and loss. On app you'll find:
- your current rank and star
- how many win needed 'til next rank milestone
- global winrate
- winrate with each deck
- persist data in local browser storage
- stats against opponent's deck types
- charts on rank progress, deck winrates
- set notes on deck types
- arena page

Maybe one day this app will:
- Full design ;)
- MOAR CHARTS!!! CHARTS EVERYWHERE!!!
- get a lot of pink unicorned stuff

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

