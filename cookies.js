var _ = require('lodash');

function Cookies()
{
	this.toJson = function(cookies)
	{
		if (Object.prototype.toString.call(cookies) !== '[object Array]')
		{
			cookies = cookies.split(";");
		}

		var result = {};

		cookies.forEach(
			function ( cookie ) {
				var parts = [cookie.substring(0,cookie.indexOf("=")),cookie.substring(cookie.indexOf("=") + 1)];
				result[parts[0]] = parts[1];
			}
		);

		return result;
	}

	this.toCookieString = function(cookies)
	{
		if (Object.prototype.toString.call(cookies) !== '[object Object]')
		{
			cookies = this.toJson(cookies)
		}

		var result = "";
		_.forEach(cookies, function(value, key) {
			if (result.length > 0) { result += ";"}
			result += key + "=" + value;
		});

		return result;
	}

	this.toCookieStringUrlEncoded = function(jsonObject)
	{
		var result = encodeURI(this.toCookieString(jsonObject));

		return result;
	}
}

module.exports =  new Cookies();
