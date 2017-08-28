const _ = require('lodash');
const Cookie = require('./cookie')

function Cookies()
{
	this.toJson = function(cookies)
	{
		if (_.isString(cookies)) return (new Cookie(cookies)).toJSON();

		return cookies.map(cookieStr => {
			return (new Cookie(cookieStr)).toJSON();
		});
	}

	this.toCookies = function(cookies)
	{
		if (_.isString(cookies)) return new Cookie(cookies);

		return cookies.map(cookieStr => {
			return new Cookie(cookieStr);
		});
	}

	this.toCookieString = function(cookies)
	{

		if (_.isArray(cookies))
		{
			return cookies.reduce((str, cookie) => {
				str += (new Cookie(cookie)).toString() + ' ';
				return str;
			}, "");
		}
		else if (_.isObject(cookies))
		{
			return (new Cookie(cookies)).toString();
		}
	}

	this.toSetCookieArray = function(cookies)
	{
		if (_.isArray(cookies))
		{
			return cookies.map(cookie => (new Cookie(cookie)).toFullString() );
		}
		else if (_.isObject(cookies))
		{
			return (new Cookie(cookies)).toFullString();
		}
	}

	this.toCookieStringUrlEncoded = function(cookies)
	{
		var result = encodeURI(this.toCookieString(cookies));

		return result;
	}
}

module.exports =  new Cookies();
