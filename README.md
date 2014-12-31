ksu-so-scrapper
===============
Student organisation contact details in one place! :)

## Prerequisites
* NodeJS
* NPM
* Cheerio

## Setup
First download and install NodeJS and NPM for your OS through http://nodejs.org/download/. Then install Cheerio 
using `` npm install cheerio ``.

You also need to clone this repo, using `` git clone https://github.com/dannydes/ksu-so-scrapper `` or download 
and extract from [here](https://github.com/ictsamalta/ksu-so-scrapper/archive/master.zip).

Windows users with no clue of what NPM is, may get away with double clicking `` appsetup.bat `` in the root folder.

## Run
Open your CLI, navigate to the repo's directory and enter `` node ksu-so-scrapper ``.

Windows users can simply run `` appstart.bat `` in the repo's root directory.

## Enjoy
If you get a positive notification like this after running:
`` Successfully downloaded to organisations.csv! ``
and you have followed all instructions here, you should find the details in `` organisations.csv ``,
under the root folder. Feel free to open the file using your favorite spreadsheet application. :)

**N.B.:** In the rare case, you get all details for an organisation in one cell or some other odd placement of 
information, please make sure the following delimiters are set:
* **,**: used in between organisation details
* **;**: used in between organisations
