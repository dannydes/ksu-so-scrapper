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

## Open spreadsheet
If you followed all instructions here, you should find the details in `` organisations.csv ``,
under `` webroot ``. Feel free to open the file using your favorite spreadsheet application. :)

**N.B.:** In the rare case, you get all details for an organisation in one cell or some other odd placement of 
information, please make sure the following delimiters are set:
* **,**: used in between organisation details
* **;**: used in between organisations

## Restore spreadsheet backup
In case, you mistakenly overwrite `` organisations.csv ``, open `` webroot ``, find `` organisations.csv.bak `` 
and rename it to `` organisations.csv ``. Ta da!!
