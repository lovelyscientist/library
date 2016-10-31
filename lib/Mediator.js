'use strict';
var Mediator = function () {
	var events = [];
	
	this.subscribe = function (event, callback) {
		if (!events[event]){
			events[event] = [];
		}
		events[event].push(callback);
		return this;
	}

	this.publish = function (event, info) {
		if (events[event]){
			events[event].forEach(function(callback){
				callback(info);
			});
		}
		return this;
	}
}
