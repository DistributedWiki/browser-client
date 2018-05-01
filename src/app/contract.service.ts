import { Injectable } from '@angular/core';
import {Article} from "./contracts/Article";
import {TopLevel} from './contracts/TopLevel';
import {Web3Service} from "./web3.service";
import BigNumber from "bignumber.js/bignumber";
import {TopLevelAddress} from "../../build/TopLevelAddress";

// This service encapsulates IPFS and smart contracts APIs and provides methods for
// adding, modifying, searching and retrieving articles
@Injectable()
export class ContractService {
  topLevel: TopLevel;
  gasPrice: string;
  account: string;

  constructor(private web3Service: Web3Service) {
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

  public createArticle(data: any, title: string){
    // TODO
  }

  public async modifyArticle(data: any, title: string){
    // TODO
  }

  // TODO - title instead of address?
  public getArticleInfo(title: string): any {
    // TODO
  }

  public getArticle(title: string): any {
    // TODO
  }

  // await this.article.updateTx(new BigNumber('0x1')).send({gas: 100000, gasPrice: gasPrice, from: account});
}
