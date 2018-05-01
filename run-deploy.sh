#!/usr/bin/env bash
# this file deploys smart contract and saves its addresses to file 'addresses.out'
# Additionally it creates TS classes (wrappers) of name Contract_nameAddress which contain one static variable 'address'
# which cane be used inside TS code to obtain smart contract address

# exit on error
set -e

rm -rf build
mkdir build
cd build

git clone https://github.com/chorig9/blockchain contract-repo

cd contract-repo
git checkout chorig9/ch32/write-article-smart-contract-prototype # TODO - remove - use master (or paremetrized)
npm run build | grep ": 0x" > ../addresses.out # save addresses of deployed contracts to a file
                                               # pattern is: Contract: 0x...
cd ..

cat addresses.out | while read line
do
   name=$(echo $line | cut -d : -f 1 | sed 's/ //g')
   address=$(echo $line | cut -d : -f 2 | sed 's/ //g')
   addressClass="
        export class "$name"Address {
              static address: string = '"$address"';
         }"

   echo $addressClass > $name"Address.ts"
done

../node_modules/.bin/typechain --force --outDir ../src/app/contracts './contract-repo/build/contracts/*.json'

