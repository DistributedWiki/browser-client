#!/usr/bin/env bash
# this file deploys smart contracts and saves top level smart contract address to address.out
# Additionally it creates TopLevelAddress.ts file in build directory -- sets 'address' variable to a valid address

# exit on error
set -e

rm -rf build
mkdir build
cd build

git clone https://github.com/chorig9/blockchain contract-repo

cd contract-repo
git checkout chorig9/ch32/write-article-smart-contract-prototype # TODO - remove - use master (or paremetrized)
npm run build | grep "TopLevel: 0x" | cut -d : -f 2 | sed 's/ //g' > ../address.out
cd ..

address=$(cat address.out)
addressClass="
        export class TopLevelAddress {
              static address: string = '"$address"';
         }"

echo $addressClass > "TopLevelAddress.ts"

../node_modules/.bin/typechain --force --outDir ../src/app/contracts './contract-repo/build/contracts/*.json'

