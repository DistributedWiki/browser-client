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
  showArticle: boolean = false;

  constructor(private contractService: ContractService) { }

  async createArticle() {
    await this.contractService.createArticle("", this.articleTitle);
  }

}
