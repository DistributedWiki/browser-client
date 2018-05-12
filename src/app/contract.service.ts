import { Injectable } from '@angular/core';
import {Article} from "./contracts/Article";
import {TopLevel} from './contracts/TopLevel';
import {Web3Service} from "./web3.service";
import BigNumber from "bignumber.js/bignumber";
import {TopLevelAddress} from "../../build/TopLevelAddress";
import {StorageService} from './storage.service';

// This service encapsulates IPFS and smart contracts APIs and provides methods for
// adding, modifying, searching and retrieving articles
@Injectable()
export class ContractService {
  topLevel: TopLevel;
  gasPrice: string;
  account: string;

  constructor(private web3Service: Web3Service, private storageService: StorageService) {
    this.topLevel = new TopLevel(this.web3Service.web3, TopLevelAddress.address);
  }

  private async getGasPrice(): Promise<string> {
    this.gasPrice = await new Promise((resolve, reject) => {
      this.web3Service.web3.eth.getGasPrice((err, gasPrice) => {
        if (err != null) {
          resolve(this.gasPrice); //use old gas Price
        } else {
          resolve(gasPrice.toString());
        }
      })
    }) as string;

    return Promise.resolve(this.gasPrice);
  }

  private async getAccount(): Promise<string> {
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        this.web3Service.web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }

          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          resolve(accs[0]);
        })
      }) as string;

      this.web3Service.web3.eth.defaultAccount = this.account;
    }
    return Promise.resolve(this.account);
  }

  private titleHash(title: string): BigNumber {
    return new BigNumber(this.web3Service.web3.sha3(title));
  }

  private async articleByTitle(title: string): Promise<Article> {
    let articleAddress = await this.topLevel.getArticle(this.titleHash(title));
    return new Article(this.web3Service.web3, articleAddress);
  }

  private async getTxParams(): Promise<object> {
    let gasPrice = await this.getGasPrice();
    let account = await this.getAccount();

    return {gas: 1000000, gasPrice: gasPrice, from: account}; //  TODO - gas amount
  }

  public async createArticle(data: string, title: string){
    let IpfsID = await this.storageService.addFile(data);
    let txParams = await this.getTxParams();

    // TODO error handling when there is already article with same title (hash)
    // probably can use return value from createArticleTX to figure that out
    this.topLevel.createArticleTx(this.titleHash(title), IpfsID).send(txParams).catch(function (reason) {
      alert(reason);
    });
  }

  public async modifyArticle(data: any, title: string){
    // TODO - update IPFS data
    let article = await this.articleByTitle(title);
    let txParams = await this.getTxParams();

    article.updateTx(new BigNumber('0x1')).send(txParams); // TODO - ID from IPFS
  }

  public async getArticleInfo(title: string): Promise<string> {
    let article = await this.articleByTitle(title);

    return "TODO";
  }

  public async getArticle(title: string): Promise<string> {
    let article = await this.articleByTitle(title);
    let IpfsID = await article.getArticleID;

    return await this.storageService.getFile(IpfsID);
  }
}
