import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {Web3Service} from './web3.service';
import {FormsModule} from '@angular/forms';
import {ContractService} from "./contract.service";
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleViewComponent } from './article-view/article-view.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticleViewComponent
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
