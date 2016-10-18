Amadeus-FrontEnd
============
### Info

Amadeus-FrontEnd repository, this project uses:

- [Ionic](http://ionicframework.com/)
- [Angular](https://angularjs.org/)
- [Cordova](https://cordova.apache.org/)
- [ngCordova Plugins](http://ngcordova.com/docs/plugins/)
- [Cordova Plugins](http://cordova.apache.org/plugins/)

### Quick Start

#### Before you start, tools you will need

* install npm
* bower and gulp (run the following commands):

```shell
npm install -g bower
npm install -g gulp
npm install -g ionic
npm install -g cordova
```

* configure npm registry for own Cordova plugins/packages: 

```shell
npm config set @appverse:registry http://nexus3.172.22.220.35.xip.io/repository/npm-private/
```

#### For avoiding errors on Bower dependencies due firewall restrictions, you might need to add this:

```shell
git config --global url."https://".insteadOf git://
```

## Running

* configure project:

```shell
npm install
bower install
ionic state restore
gulp sass
```


* Add Platform

```shell
ionic platform add [ browser | android ]
```

* Emulate Browser or Android Emulator

```shell
ionic emulate [ browser | android ]
```

* Emulate on Physical Device

```shell
ionic run android
```

## Build

To build the app .apk

```shell
ionic build android
```
