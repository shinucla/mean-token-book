# mean-node-login-template
mean = mysql express angular node

node.js setup:
  [ubuntu]
  sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
  sudo apt-get install -y nodejs

  [mac]
  install brew: https://brew.sh/
  brew install node@10

ng setup:
  1) installs
     npm install -g @angular/cli

     npm install --save @ng-bootstrap/ng-bootstrap
     ng add @ng-bootstrap/ng-bootstrap
     ng add @ng-bootstrap/schematics
     copy and paste the css stylesheet<link> to ng src/index.html (https://getbootstrap.com/)

     npm install --save lodash
     npm install --save-dev @types/lodash
     import * as _ from 'lodash';
 
  2) setup new project:
     ng new token-book --style=scss

  3) proxy.conf.json
     ng serve --proxy-config proxy.conf.json

  4) create makefile for easy access of
     - running serve with proxy
       ng serve --proxy-config proxy.conf.json
       
     - deploy with static output folder
       ng build --prod --output-path ../../backend_nodejs/dist