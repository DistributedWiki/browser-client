# WikiClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Testing with smart contract on local rpc node (using ganache and metamask)

Run 'npm run deploy-and-run' - this will clone contract repo and deploy to a local rpc node (make sure ganache is running).
Next step is to open chrome with metamask extension and connect to custom RPC (http://localhost:7545). Then import one account
from ganache and you're ready to use the app. 

Top level smart contract address is stored in auto-generated TS classes in 'build' directory. This class is generated on deploy-and-run command.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
