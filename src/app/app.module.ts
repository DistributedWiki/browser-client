import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {Web3Service} from './web3.service';
import {FormsModule} from '@angular/forms';
import {ContractService} from "./contract.service";
import { ArticleViewComponent } from './article-view/article-view.component';
import {StorageService} from './storage.service';


@NgModule({
  declarations: [
    AppComponent,
    ArticleViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    Web3Service,
    ContractService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
