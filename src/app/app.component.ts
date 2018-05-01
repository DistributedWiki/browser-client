import { Component } from '@angular/core';
import {ContractService} from "./contract.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Distributed wikipedia';
  articleTitle: string;
  articleData: string = 'empty'; // TODO article should be some class
  articleInputData: string;

  constructor(private contractService: ContractService) { }

  async displayArticle() {
    this.articleData = await this.contractService.getArticle(this.articleTitle);
  }

  async modifyArticle() {
    await this.contractService.modifyArticle(this.articleInputData, this.articleTitle);
  }

}
