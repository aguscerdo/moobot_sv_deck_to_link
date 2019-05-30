var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function process_request(req) {
	var user = req.query.user;
	var code = req.query.code;

	return new Promise(resolve => {
		if (!code) {
			resolve("No deck code passed")
		}
		else {
			var xhr = new XMLHttpRequest();
			const link = "https://shadowverse-portal.com/api/v1/deck/import?format=json&deck_code=" + String(code) +"&lang=en";
			xhr.open('GET', link, true);

			xhr.onreadystatechange = function() {
				if  (xhr.readyState == 4) {
					if (xhr.status == 200) {
						var req = JSON.parse(xhr.responseText);
						console.log(req.data)
						var clan = req.data.clan;

						if (!clan || clan === null || clan == 'null') {
							resolve('Invalid deck code');
						} else {
							var hash = req.data.hash;
							resolve(String(user) + '\'s deck --> https://shadowverse-portal.com/deck/'+ hash +'?lang=en');
						}
					} else {
						resolve("An error ocurred... Try again");
					}
				}
			};
			xhr.send();
		}
	});
}

function deck_to_link(code, user) {
	if (! code) {
		return new Promise(function(resolve, reject) {
			resolve('No deck code');
		});
	} else {
		var xhr = new XMLHttpRequest();
		const link = "https://shadowverse-portal.com/api/v1/deck/import?format=json&deck_code=" + String(code) +"&lang=en";
		xhr.open('GET', link, false);

		return new Promise(function (resolve, reject) {


		});
	}
}

module.exports.deck_to_link = deck_to_link
module.exports.process_request = process_request