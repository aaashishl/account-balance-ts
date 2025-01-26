#!/bin/bash

read -p "Enter account address:" address

balance=$(node -p "require('./dist/balance').getBalance('$address').then(balance => console.log(JSON.stringify(balance)))")

echo "Balance of $address is $balance"