const _ = require('lodash');
const Cookie = require('./cookie');

function Cookies()
{
	this.toJson = function(cookies)
	{
		if (_.isString(cookies)) return (new Cookie(cookies)).toJSON();

		return cookies.map(cookieStr => {
			return (new Cookie(cookieStr)).toJSON();
		});
	}

	this.toSimpleJSON = function(cookies)
	{
		let myCookies = null;
		if (!_.isArray(cookies))
		{
			let newCookies = [];
			_.forEach(cookies, (value, key) => {
				newCookies.push(new Cookie(`${key}=${value}`));
			});
			myCookies = newCookies.splice();
		}
		else
		{
			myCookies = this.toCookies(cookies);
		}

		return myCookies.reduce((ary, item) => {
			ary[item.name] = item.value;
			return ary;
		}, {});
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
			if ((cookies.name != null) && (cookies.value != null))
			{
				return (new Cookie(cookies)).toString();
			}
			else
			{
				let newCookies = [];
				_.forEach(cookies, (value, key) => {
					newCookies.push(new Cookie(`${key}=${value}`));
				});
				return this.toCookieString(newCookies);
			}
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

exports = module.exports =  new Cookies();
exports.Cookie = require('./cookie');
