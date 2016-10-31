var Controller = (function () {
	function Controller () {
		var list = new Locations(), 
			view = new LocationsView(list),
			previousContextMenu;	
		
		list.initList(data);
		view.renderList();

		mediator.subscribe('CreateUpdateView: save changes on creating', onSaveCreating)
			.subscribe('CreateUpdateView: save changes on updating', onSaveUpdating)
			.subscribe('ContextMenu: open', onContextMenuOpen)
			.subscribe('LocationView: delete', onDeleteLocation)
			.subscribe('LocationView: edit', onEditLocation);

		function onSaveCreating (json) {
			list.add(json);
			view.renderList();
		}

		function onSaveUpdating (args) {
			var id = args.id,
				json = args.outputObj;

			list.setElById(id, json);
			view.renderList();
		}

		function onDeleteLocation(id) {
			list.removeById(id);
			view.renderList();
		}

		function onEditLocation (location) {
			var form = new CreateUpdateView(location);
		}

		function onContextMenuOpen (args) {
			var currentLocation = args.location,
				top = args.top,
				left = args.left,
				menu; 

			if (previousContextMenu) {
				previousContextMenu.destroy();
				previousContextMenu = null;
			}

			menu = new ContextMenu(currentLocation, top, left);
			previousContextMenu = menu;
		}
	}

	return Controller;
})();