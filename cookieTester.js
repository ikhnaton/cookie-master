var cookies = require('./cookies');
const Cookie = require('./cookie');
const _ = require('lodash');

var assert = require('assert');

describe('Cookies module', function() {

	describe('Test core cookie handler', cookieHandlerTest);

	function cookieHandlerTest() {
		it('Should parse and output cookie objects', objectTest);

		function objectTest()
		{
			let tester = [
				'JSESSIONID=0000MgZyuP8CQGMz6Jnc5xFpOu8:1a0dgl3k4; Path=/services/partners/epricer/v2/bpgui; HttpOnly',
				'epricer_contextid=MgZyuP8CQGMz6Jnc5xFpOu8; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_id=2700000261; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_email=rjalowiec@kc.rr.com; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_urlredirection=https://wwwbeta-2.toronto.ca.ibm.com/partnerworld/commerce/programs/servers/EpricerRedirectionServlet.wss?command=epricerRedirection; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api'
			];

			_(tester).forEach(item => {
				let tmp = new Cookie(item);
//				tmp.parseFromString(item);
//				console.log(tmp.toJSON());
//				console.log(tmp.toFullString());
			});
		}
	}

	describe('Test toJson method', function() {

		it('Should convert array of cookies to array of json objects', function() {
			var start = [
				"JazzFormAuth=Form; Path=/ccm; Secure",
				"WASPostParam=L2NjbS9zZWN1cmUvYXV0aGVudGljYXRlZC9pZGVudGl0eQ==.AAAAAAAAAAA=.AAAAIQ==.YXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVk; Path=/ccm/secure/authenticated/identity; Secure; HttpOnly",
				"WASReqURL=https://:9447/ccm/secure/authenticated/identity; Path=/; Secure; HttpOnly",
				"x-com-ibm-team-scenario=c84fedf4-30cf-4a7c-b0de-08ee86751c5d%3Bname%3DInitial+Page+Load%3Bextras%3D%2Fccm%2Fauth%2Fauthrequired%2C1491328953658; Path=/"
			];

			var result = cookies.toJson(start);
//			console.log(result);
			assert.ok(_.isArray(result), "not an array");
			_(result).forEach(obj => assert.ok(_.isObject(obj), "obj check failed"));
			assert.equal(_.find(result,{name: "JazzFormAuth"}).secure, true, "Failed Jazz");
			assert.equal(_.find(result,{name: "WASPostParam"}).value, "L2NjbS9zZWN1cmUvYXV0aGVudGljYXRlZC9pZGVudGl0eQ==.AAAAAAAAAAA=.AAAAIQ==.YXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVk");
		});
	});

	describe('Test toCookieString method', function() {

		it('Should convert a cookie string array object to a header cookie string', function() {
			var start = [
				'JSESSIONID=0000MgZyuP8CQGMz6Jnc5xFpOu8:1a0dgl3k4; Path=/services/partners/epricer/v2/bpgui; HttpOnly',
				'epricer_contextid=MgZyuP8CQGMz6Jnc5xFpOu8; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_id=2700000261; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_email=rjalowiec@kc.rr.com; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_urlredirection=https://wwwbeta-2.toronto.ca.ibm.com/partnerworld/commerce/programs/servers/EpricerRedirectionServlet.wss?command=epricerRedirection; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api'
			];

			var result = cookies.toCookieString(start);
			assert.equal(result, "JSESSIONID=0000MgZyuP8CQGMz6Jnc5xFpOu8:1a0dgl3k4; epricer_contextid=MgZyuP8CQGMz6Jnc5xFpOu8; epricer_id=2700000261; epricer_email=rjalowiec@kc.rr.com; epricer_urlredirection=https://wwwbeta-2.toronto.ca.ibm.com/partnerworld/commerce/programs/servers/EpricerRedirectionServlet.wss?command=epricerRedirection; ");
		});

		it('Should convert an array object of JSON cookies to a header cookie string', function() {
			var start = [
				'JSESSIONID=0000MgZyuP8CQGMz6Jnc5xFpOu8:1a0dgl3k4; Path=/services/partners/epricer/v2/bpgui; HttpOnly',
				'epricer_contextid=MgZyuP8CQGMz6Jnc5xFpOu8; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_id=2700000261; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_email=rjalowiec@kc.rr.com; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_urlredirection=https://wwwbeta-2.toronto.ca.ibm.com/partnerworld/commerce/programs/servers/EpricerRedirectionServlet.wss?command=epricerRedirection; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api'
			];

			var midpoint = cookies.toJson(start);
			var result = cookies.toCookieString(midpoint);
			assert.equal(result, "JSESSIONID=0000MgZyuP8CQGMz6Jnc5xFpOu8:1a0dgl3k4; epricer_contextid=MgZyuP8CQGMz6Jnc5xFpOu8; epricer_id=2700000261; epricer_email=rjalowiec@kc.rr.com; epricer_urlredirection=https://wwwbeta-2.toronto.ca.ibm.com/partnerworld/commerce/programs/servers/EpricerRedirectionServlet.wss?command=epricerRedirection; ");
		});
	});

	describe('Test toCookieStringUrlEncoded method', function() {

		it('Should convert a json object to a cookie string and encode it', function() {
			var start = [
				'JSESSIONID=0000MgZyuP8CQGMz6Jnc5xFpOu8:1a0dgl3k4; Path=/services/partners/epricer/v2/bpgui; HttpOnly',
				'epricer_contextid=MgZyuP8CQGMz6Jnc5xFpOu8; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_id=2700000261; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_email=rjalowiec@kc.rr.com; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api',
				'epricer_urlredirection=https://wwwbeta-2.toronto.ca.ibm.com/partnerworld/commerce/programs/servers/EpricerRedirectionServlet.wss?command=epricerRedirection; Expires=Sun, 24-Sep-17 20:50:30 GMT; Path=/services/partners/epricer/v2/api'
			];

			var midpoint = cookies.toJson(start);
			var result = cookies.toCookieStringUrlEncoded(midpoint);
			assert.equal(result, "JSESSIONID=0000MgZyuP8CQGMz6Jnc5xFpOu8:1a0dgl3k4;%20epricer_contextid=MgZyuP8CQGMz6Jnc5xFpOu8;%20epricer_id=2700000261;%20epricer_email=rjalowiec@kc.rr.com;%20epricer_urlredirection=https://wwwbeta-2.toronto.ca.ibm.com/partnerworld/commerce/programs/servers/EpricerRedirectionServlet.wss?command=epricerRedirection;%20");
		});

		it('Should convert an array object to a cookie string', function() {
			var start = [
				"item1=hello there",
				"item2=hello there dude",
				"item3=goodbye there",
				"item4=ouch that hurt",
				"item5=good night"
			];

			var result = cookies.toCookieStringUrlEncoded(start);
			assert.equal(result, "item1=hello%20there;%20item2=hello%20there%20dude;%20item3=goodbye%20there;%20item4=ouch%20that%20hurt;%20item5=good%20night;%20");
		});
	});

});
