function RequestView(name, data){
	console.log('*');
	$('#content').empty();
    var attributes = [],
    	$tr = $('<tr></tr>'),
    	$el = $('<div class="source"></div>'),
		headers = {
			'id': 'Number',
			'title': 'Title',
			'author': 'Author',
			'garantee_price': 'Garantee price',
			'rent_price': 'Rent price',
			'genre': 'Genre',
			'name': 'Name',
			'surname': 'Surname',
			'phone': 'Phone',
			'adress': 'Adress',
			'reader_id': 'Number',
			'begin_date': 'Start',
			'end_date': 'End',
			'book_id': 'Book ID',
		};

	this.render = function () {
		renderTemplate();
		createHeaders();
		addRows();
	}

	this.render();

	function renderTemplate () {
		$('#content').append($el);
		var template = _.template(templates.request);
		$el.append('<h3>'+name+'</h3>');
		$el.append(template());
		$('.header').append($tr);
	}
	

	function createHeaders () {
		for (var key in data[0]) {
			attributes.push(headers[key.toLowerCase()]);
		}
		attributes.forEach(function (property) {
			var $th = $('<th></th>');
			$th.text(property);
			$tr.append($th);
		});
	}
	
	function addRows () {
		data.forEach(function (row) {
			var $tr1 = $('<tr></tr>');
			for (var key in row) {
				var $th1 = $('<th></th>');
				$th1.text(row[key]);
				$tr1.append($th1);
			}
			$('.body').append($tr1);
		});
	}	
	
	return this;
}