var Location = (function () {
	var count = 1;
	
	function Location (_city,_groupsCount,_teachersCount) {
		var attrubutes = {
			id: count,
			city: _city,
			groupsCount: _groupsCount,
			teachersCount: _teachersCount
		};

		count++;

		this.get = function (key) {
			return attrubutes[key];
		};

		this.set = function (key, value) {
			attrubutes[key] = value;
		};
	}

	Location.prototype.toJSON = function () {
		return {
			city: this.get('city'),
			groupsCount: this.get('groupsCount'),
			teachersCount: this.get('teachersCount')
		}
	}

	return Location;
})();



