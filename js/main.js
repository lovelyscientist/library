var mediator = new Mediator(),
	name = '',
	ajax = new XMLHttpRequest(),
	withoutData = false;

ajax.addEventListener('readystatechange', function () {
	if (ajax.readyState === 4 && ajax.status === 200) {
		console.log(ajax.responseText);
		var array = JSON.parse(ajax.responseText);
		
		if (array.length === 0 && !withoutData) name = name + ' not found!';

		withoutData = false;
		array.forEach(function (obj) {
			if (obj['begin_date']) {
				obj['begin_date'] = obj['begin_date'].substr(0,10);
				obj['end_date'] = obj['end_date'].substr(0,10);
				delete obj['phone'];
				delete obj['adress'];
				delete obj['id'];
				delete obj['reader_id'];
			}
		});
		
		var r = new RequestView(name, array);
	}
}, false);

$(function () {
	$('#book-all').on('click', function () {
		name = 'List of all books';
		ajax.open("GET", '/library/book-all', true);
		ajax.send();
	});
	$('#reader-all').on('click', function () {
		name = 'List of all readers';
		ajax.open("GET", '/library/reader-all', true);
		ajax.send();
	});
	$('#order-all').on('click', function () {
		name = 'List of all orders';
		ajax.open("GET", '/library/order-all', true);
		ajax.send();
	});
	$('#reader-add').on('click', function () {
		var view = new CreateEditView('reader-add');
		name = 'Читатель успешно добавлен!';
		withoutData = true;
		mediator.subscribe('Inputs filled reader-add', function (result) {
			ajax.open("POST", '/library/reader-add', true);
			ajax.send(JSON.stringify(result));
			view = null;
		});
	});

	$('#book-genre').on('click', function () {
		name = 'All books of specific genre';
		var view = new CreateEditView('book-genre');
		mediator.subscribe('Inputs filled book-genre', function (result) {
			ajax.open("POST", '/library/book-genre', true);
			ajax.send(JSON.stringify(result));
			view = null;
		});
	});

	$('#book-remove').on('click', function () {
		var view = new CreateEditView('book-remove');
		name = 'Книга успешно удалена!';
		withoutData = true;
		mediator.subscribe('Inputs filled book-remove', function (result) {
			ajax.open("DELETE", '/library/book-remove', true);
			ajax.send(JSON.stringify(result));
			view = null;
		});
	});

	$('#book-sale').on('click', function () {
		var view = new CreateEditView('book-sale');
		name = 'Цены успешно обновлены!';
		withoutData = true;
		mediator.subscribe('Inputs filled book-sale', function (result) {
			ajax.open("PUT", '/library/book-sale', true);
			ajax.send(JSON.stringify(result));
			view = null;
		});
	});

	$('#book-report-author').on('click', function () {
		name = 'Report of all books by authors';
		ajax.open("GET", '/library/book-report-author', true);
		ajax.send();
	});

	$('#book-report-alphabet').on('click', function () {
		name = 'Report of all books ordered by alphabet';
		ajax.open("GET", '/library/book-report-alphabet', true);
		ajax.send();
	});

	$('#book-report-genre').on('click', function () {
		name = 'Report of all books grouped by genre';
		ajax.open("GET", '/library/book-report-genre', true);
		ajax.send();
	});

	$('#reader-report-phone').on('click', function () {
		name = 'All phone numbers of readers';
		ajax.open("GET", '/library/reader-report-phone', true);
		ajax.send();
	});

	$('#order-report-current').on('click', function () {
		name = 'Current orders';
		ajax.open("GET", '/library/order-report-current', true);
		ajax.send();
	});
});

