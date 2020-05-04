#!/bin/bash

export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# start MongoDB
mongodb-linux-x86_64-3.2.22/bin/mongod &
sleep 10s

mongoimport -d paypal -c restaurants --type csv --file /restaurantsa9126b3.csv --headerline
sleep 5s

node /backend/server.js &
sleep 10s

cd /frontend
echo "Inside frontend"
npm start > /dev/null
