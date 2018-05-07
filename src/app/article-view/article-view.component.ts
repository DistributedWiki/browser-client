import {Component, Input, OnInit} from '@angular/core';
import {ContractService} from "../contract.service";

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
  @Input() articleTitle: string;
  articleData: string = 'loading';

  constructor(private contractService: ContractService) { }

  ngOnInit() {
    let parent = this;

    this.contractService.getArticle(this.articleTitle).then(function(data: string){
      parent.articleData = data;
    })
  }

}
