#!/usr/bin/env bash

#Install git
sudo apt install git

#Install node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

#Install mplayer - to enable sound effects
sudo apt install -y mplayer

# Finally install the program
git clone git@github.com:theapache64/get_isp.git
cd get_isp/
npm install
