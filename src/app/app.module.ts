import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {Web3Service} from './web3.service';
import {FormsModule} from '@angular/forms';
import {ContractService} from "./contract.service";
import { ArticleViewComponent } from './article-view/article-view.component';
import {StorageService} from './storage.service';
import { ArticleCreateComponent } from './article-create/article-create.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleViewComponent,
    ArticleCreateComponent
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
