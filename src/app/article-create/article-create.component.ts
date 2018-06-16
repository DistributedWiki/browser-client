import { Component, OnInit } from '@angular/core';
import {ContractService} from "../contract.service";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  articleTitle: string;
  data: string;

  constructor(private contractService: ContractService) { }

  ngOnInit() {
  }

  add() {
    this.contractService.createArticle(this.data, this.articleTitle);
  }


}
