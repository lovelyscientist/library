var templates = {
	addReader: '\
		<h3>Добавление нового читателя</h3>\
		<form class="form-horizontal">\
			 <div class="form-group">\
				  <label for="mail" class="col-sm-2 control-label">ID</label>\
				  <div class="col-sm-10">\
				   		<input type="email" class="form-control" id="id" placeholder="ID читателя">\
				  </div>\
			 </div>\
			 <div class="form-group">\
				  <label for="mail" class="col-sm-2 control-label">Имя</label>\
				  <div class="col-sm-10">\
				   		<input type="email" class="form-control" id="name" placeholder="Имя читателя">\
				  </div>\
			 </div>\
			 <div class="form-group">\
				  <label for="mail" class="col-sm-2 control-label">Фамилия</label>\
				  <div class="col-sm-10">\
				   		<input type="email" class="form-control" id="surname" placeholder="Фамилия читателя">\
				  </div>\
			 </div>\
			 <div class="form-group">\
				  <label for="mail" class="col-sm-2 control-label">Телефон</label>\
				  <div class="col-sm-10">\
				   		<input type="email" class="form-control" id="phone" placeholder="Телефонный номер">\
				  </div>\
			 </div>\
			 <div class="form-group">\
				  <label for="mail" class="col-sm-2 control-label">Адрес</label>\
				  <div class="col-sm-10">\
				   		<input type="email" class="form-control" id="adress" placeholder="Адрес читателя">\
				  </div>\
			 </div>\
			 <div class="form-group">\
			  <div class="col-sm-10">\
			   <button type="button" id="ok" class="btn btn-success">Добавить</button>\
			   <button type="button" id="cancel"class="btn btn-warning">Отменить</button>\
			  </div>\
			 </div>\
		</form>\
	',
	chooseGenre: '\
		<form>\
			  <div class="form-group">\
			    <label for="exampleInputEmail1">Пожалуйста, введите жанр книг:  </label>\
			    <input type="email" class="form-control" id="genre" placeholder="Ваш жанр">\
			  </div>\
			  <button type="button" id="ok" class="btn btn-default">Найти</button>\
			</form>\
	',
	deleteBook:  '\
		<form>\
			  <div class="form-group">\
			    <label for="exampleInputEmail1">Пожалуйста, введите навание книги:  </label>\
			    <input type="email" class="form-control" id="title" placeholder="Название книги">\
			  </div>\
			  <button type="button" id="ok" class="btn btn-default">Удалить</button>\
			</form>\
	',
	bookSale:  '\
		<form>\
			  <div class="form-group">\
			    <label for="exampleInputEmail1">Пожалуйста, введите процент изменения цены:  </label>\
			   <select class="form-control" id="percent">\
			   		<option>-10</option>\
			   		<option>-5</option>\
			   		<option>-2</option>\
				    <option>1</option>\
				    <option>2</option>\
				    <option>3</option>\
				    <option>4</option>\
				    <option>5</option>\
				    <option>6</option>\
				    <option>7</option>\
				    <option>8</option>\
				    <option>9</option>\
				    <option>10</option>\
			  </select>\
			  </div>\
			  <button type="button" id="ok" class="btn btn-default">Обновить цены</button>\
			</form>\
	',
	request: '\
		<table class="table table-hover">\
		    <thead class="header">\
		    </thead>\
		    <tbody class="body">\
		    </tbody>\
	  </table>',
	locationView : '\
		<span> <strong> <u> <%=city%> </u> </strong> </span>\
		<br>\
		<span>Groups: <%=groupsCount%> </span>\
		<br>\
		<span>Teachers: <%=teachersCount%> </span>\
	'
};



