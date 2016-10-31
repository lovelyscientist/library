'use strict';
function CreateEditView(action) {
	
	var $el = $('<div class="createEdit"></div>'),
		$buttonOK,
		$buttonCancel;

	var parser = {
		'reader-add' : templates.addReader,
		'book-remove' : templates.deleteBook,
		'book-genre': templates.chooseGenre,
		'book-sale': templates.bookSale,
		'book-report-author': templates.addReader,
		'book-report-genre': templates.addReader,
		'book-report-group-genre': templates.addReader,
		'reader-report-phone': templates.addReader,
		'order-report-current': templates.addReader
	};

	this.render = function () {
		var template = _.template(parser[action]);
		$el.append(template());
		$('#content').empty();
		$('#content').append($el);
		$buttonOK = $('#ok');
		$buttonCancel = $('#cancel');
		addListeners();
	}

	this.render();

	function addListeners() {
		$buttonOK.on('click', function () {
			var data = getDataFromInputs(); 
			mediator.publish('Inputs filled '+ action , data);
		});

		$buttonCancel.on('click',function () {
			$el.remove();
		});
	}

	function getDataFromInputs () {
		var result = {};
		var $inputs = $('input');
		_.each($inputs, function (input) {
			result[$(input).attr('id')] = $(input).val();
		});
		console.log($inputs);
		if ($inputs.length === 0) {
			result[$('select').attr('id')] = $('select').val();
		}
		return result;
	}
	

	return this;
}
