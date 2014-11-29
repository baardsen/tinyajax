/* global define */

define('tinyajax', function() {
	'use strict';
	function ajax(method, url, body){
		var req = new XMLHttpRequest();
		req.open(method, url);
		req.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
		req.send(body);
		
		return new Promise(function(resolve, reject){
			req.onreadystatechange = function () {
				if (this.readyState === 4) {
					if(this.status === 200)
						resolve(JSON.parse(this.responseText));
					else
						reject(this.status);
				}
			};
		});
	}
	function paramify(obj) {
		return obj ? '?' + Object.keys(obj)
			.map(function(key){
				var val = obj[key];
				if(Array.isArray(val)) 
					val = val.join();
				return key + '=' + encodeURIComponent(val);
			}).join('&') : '';
	}
	return {
		get : function(url, params) {
			return ajax('GET', url + paramify(params));
		},
		post : function(url, params) {
			return ajax('POST', url, JSON.stringify(params));
		}
	};
});