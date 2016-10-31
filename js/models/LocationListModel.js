var Locations = (function () {
	function Locations () {

		var list = {};
			
		this.getList = function () {
			var value = _(list).clone();
			return value;
		};

		this.initList = function (data) { 
			data.forEach(function (el){
				var location = new Location(el.city, el.groupsCount, el.teachersCount);
				list[location.get('id')] = location;
			});
		};

		this.add = function (json) {
			var location = new Location(json.city, json.groupsCount, json.teachersCount);
			list[location.get('id')] = location;
		};

		this.setElById = function (id, json) {
			var location = list[id];
			location.set('city', json.city);
			location.set('groupsCount', json.groupsCount);
			location.set('teachersCount', json.teachersCount);
		};
		
		this.removeById = function (id) {
			delete list[id];
		};
	}

	Locations.prototype.forEach = function (hash, callback) {
		for (var key in hash) {
			callback(hash[key]);
		}
	}
	return Locations;
})();