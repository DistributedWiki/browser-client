import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {Web3Service} from './web3.service';
import {FormsModule} from '@angular/forms';
import {ContractService} from "./contract.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    Web3Service,
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
