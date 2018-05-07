import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

declare var window: any;

@Injectable()
export class Web3Service {

  public web3: Web3;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source.'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.error(
        'No web3 detected.'
      );
    }
  }

}
