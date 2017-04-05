var cookies = require('./cookies');
var assert = require('assert');

describe('Cookies module', function() {

	describe('Test toJson method', function() {

		it('Should convert array of cookies to json object', function() {
			var start = [
				"JazzFormAuth=Form; Path=/ccm; Secure",
				"WASPostParam=L2NjbS9zZWN1cmUvYXV0aGVudGljYXRlZC9pZGVudGl0eQ==.AAAAAAAAAAA=.AAAAIQ==.YXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVk; Path=/ccm/secure/authenticated/identity; Secure; HttpOnly",
				"WASReqURL=https://:9447/ccm/secure/authenticated/identity; Path=/; Secure; HttpOnly",
				"x-com-ibm-team-scenario=c84fedf4-30cf-4a7c-b0de-08ee86751c5d%3Bname%3DInitial+Page+Load%3Bextras%3D%2Fccm%2Fauth%2Fauthrequired%2C1491328953658; Path=/"
			];

			var result = cookies.toJson(start);
			assert.equal(result.JazzFormAuth, "Form; Path=/ccm; Secure");
			assert.equal(result.WASPostParam, "L2NjbS9zZWN1cmUvYXV0aGVudGljYXRlZC9pZGVudGl0eQ==.AAAAAAAAAAA=.AAAAIQ==.YXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVk; Path=/ccm/secure/authenticated/identity; Secure; HttpOnly");
		});

		it('Should convert string of cookies to json object', function() {
			var start = "cookie1=someValue;cookie2=some other value;cookie3=another value";

			var result = cookies.toJson(start);
			assert.equal(result.cookie3, "another value");
		});
	});

	describe('Test toCookieString method', function() {

		it('Should convert a json object to a cookie string', function() {
			var start = {
				item1: "hello there",
				item2: "hello there dude",
				item3: "goodbye there",
				item4: "ouch that hurt",
				item5: "good night"
			};

			var result = cookies.toCookieString(start);
			assert.equal(result, "item1=hello there;item2=hello there dude;item3=goodbye there;item4=ouch that hurt;item5=good night");
		});

		it('Should convert an array object to a cookie string', function() {
			var start = [
				"item1=hello there",
				"item2=hello there dude",
				"item3=goodbye there",
				"item4=ouch that hurt",
				"item5=good night"
			];

			var result = cookies.toCookieString(start);
			assert.equal(result, "item1=hello there;item2=hello there dude;item3=goodbye there;item4=ouch that hurt;item5=good night");
		});
	});

	describe('Test toCookieStringUrlEncoded method', function() {

		it('Should convert a json object to a cookie string and encode it', function() {
			var start = {
				item1: "hello there",
				item2: "hello there dude",
				item3: "goodbye there",
				item4: "ouch that hurt",
				item5: "good night"
			};

			var result = cookies.toCookieStringUrlEncoded(start);
			assert.equal(result, "item1=hello%20there;item2=hello%20there%20dude;item3=goodbye%20there;item4=ouch%20that%20hurt;item5=good%20night");
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
			assert.equal(result, "item1=hello%20there;item2=hello%20there%20dude;item3=goodbye%20there;item4=ouch%20that%20hurt;item5=good%20night");
		});
	});
});
