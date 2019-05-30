function deck_to_link() {
	const code = "ab23";
	const user = "aguscerdo";

	if (! code) {
		return 'No deck code';
	} else {
		const http = new XMLHttpRequest();
		const link = "https://shadowverse-portal.com/api/v1/deck/import?format=json&deck_code=" + str(code) +"&lang=en";
		http.open('GET', link, false);
		http.send();

		http.onreadystatechange = function(e) {
			if  (http.readyState == 4) {
				if (http.status == 200) {
					var req = JSON.parse(http.responseText);

					var clan = req.data.clan;

					if (!clan || clan === null || clan == 'null') {	
						return 'Invalid deck code';
					} else {	
						var hash = req.data.hash;	
						return str(user) + '\'s deck --> https://shadowverse-portal.com/deck/'+ hash +'?lang=en';
					}
				} else {
					return "An error ocurred... Try again"
				}
			}
		}
	}
}