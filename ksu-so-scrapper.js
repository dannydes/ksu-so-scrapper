var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs');

const domain = 'http://ksu.org.mt';

if (fs.existsSync('organisations.csv')) {
  fs.renameSync('organisations.csv', 'organisations.csv.bak');
  console.log('Backup file created!\n');
}

request({
	uri: domain + '/index.php/representation/student-organisations'
}, function(error, response, body) {
	var $g = cheerio.load(body),
		organisations = $g('td > a');

	organisations.each(function(index, org) {
		request({
			uri: domain + $g(this).attr('href')
		}, function processOrg(error, response, body) {
			if (error) {
				console.log('Problem fetching org!\n');
				request({
					'uri': domain + $g(org).attr('href')
				}, processOrg);
				return;
			}

			var organizationName = $g(org).text().trim();
			console.log(organizationName);
			var organisationFileString = organizationName;

			var contactPersonIndex = body.indexOf('President:');
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('Secretary General:') : contactPersonIndex);
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('Chairperson:') : contactPersonIndex);
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('PRO:') : contactPersonIndex);

			if (contactPersonIndex !== -1) {
				var contactPerson = body.substring(contactPersonIndex, body.indexOf('<br', contactPersonIndex));
				console.log(contactPerson);
				organisationFileString += ',' + contactPerson;
			}

			var $ = cheerio.load(body);

			//Print email
			var emailAppendingScript = $('div[itemprop=articleBody] script').html();
			if (emailAppendingScript) {
				emailAppendingScript = emailAppendingScript.replace(/document.getElementById/g, '$');
				emailAppendingScript = emailAppendingScript.replace(/\('cloak/g, '(\'#cloak');
				emailAppendingScript = emailAppendingScript.replace(/innerHTML = ''/, 'html(\'\')');
				emailAppendingScript = emailAppendingScript.replace(/innerHTML \+= /, 'html(');
				var indexOfLastQuote = emailAppendingScript.lastIndexOf('\'') + 1;
				emailAppendingScript = emailAppendingScript.substring(0, indexOfLastQuote) + ')' + emailAppendingScript.substring(indexOfLastQuote+1);

				eval(emailAppendingScript);
				var email = $('div[itemprop=articleBody] span > a').text();
				console.log(email);
				organisationFileString += ',' + email;
			}

			//Print website and social media links
			var websites = $('div[itemprop=articleBody] a');
			websites.each(function() {
				var site = $(this).attr('href');
				if (site.substring(0, 7) === 'mailto:') {
					return;
				}

				console.log(site);
				organisationFileString += ',' + site;
			});

			//Print mobile no (if specified)
			var mobileNoIndex = body.indexOf('Mobile:');
			if (mobileNoIndex !== -1) {
				var mobileNo = body.substring(mobileNoIndex, body.indexOf('<br', mobileNoIndex));
				console.log(mobileNo);
				organisationFileString += ',' + mobileNo;
			}

			organisationFileString += ';\n';

			console.log('\n');

			fs.appendFile('organisations.csv', organisationFileString, function(error) {
				if (error) {
					throw error;
				}
			});
		});
	});
	
	console.log('Waiting to start download...\n');
});
