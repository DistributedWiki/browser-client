import { Injectable } from '@angular/core';
import * as ipfsAPI from 'ipfs-api';
import BigNumber from "bignumber.js/bignumber";

declare var Multihashes: any;

@Injectable()
export class StorageService {
  ipfs: ipfsAPI;

  constructor() {
    this.ipfs =  ipfsAPI('https://ropsten.infura.io/OQe96S6X8l5PM7NexvCM');
  }

  private stringToBytes32(str: string): BigNumber {
     return new BigNumber(
       Multihashes.toHexString(
         Multihashes.fromB58String(str)).slice(4), // remove const prefix ("1220")
      16);
  }

  private bytes32ToString(bytes32: BigNumber): string {
    return Multihashes.toB58String(
      Multihashes.fromHexString(
        "1220" +  // const prefix (for now) - TODO change that
        bytes32.toString(16).slice(2))); // remove "0x" from beggining
  }

  // get file with specified hash
  public async getFile(hash: BigNumber): Promise<string>{ // TODO - return type
    let strHash = this.bytes32ToString(hash);
    console.log("getFile: ", strHash);

    return await new Promise((resolve, reject) => {
      this.ipfs.files.cat(strHash, function(err, file) {
        if (err != null) {
          alert(err); // TODO - better error handling (not alert)
          reject();
        }

        resolve(file.toString());
      });
    }) as string;
  }

  // adds file to IPFS and returns hash
  public async addFile(data: string): Promise<BigNumber> {
    const buffer = ipfsAPI().Buffer.from(data);

    let strHash = await new Promise((resolve, reject) => {
      this.ipfs.files.add(buffer, function (err, filesAdded) {
        if (err != null) {
          alert(err); // TODO - better error handling (not alert)
          reject();
        }

        if (filesAdded.length != 1) {
          alert("file not added to IPFS");
          reject();
        }

        resolve(filesAdded[0].hash);
      });
    }) as string;

    console.log("addFIle: ", strHash);
    return this.stringToBytes32(strHash);
  }
}
