'use strict';
var T = (function () {
	function templateBuilder (container, _template, el){
		var emptyMode,
			template = _template,
			node = createEl('div');
			
		el === undefined ? emptyMode = true : emptyMode = false;
		if (!emptyMode) {
			var l = el.toJSON();
			for (var prop in l) {
				template = template.replace('<%='+prop+'%>', l[prop]); 
			} 
		}
		node.innerHTML += template;
		append(container, node);
	}

	function extend (Child, Parent) {
		var F = function () { };
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.superclass = Parent.prototype;
	}

	function getElById (id){
		return document.getElementById(id);
	}

	function getElByClass (parent, classN) {
		return parent.getElementsByClassName(classN)[0];
	}

	function getElsByTag (parent, tag) {
		return parent.getElementsByTagName(tag);
	}

	function createEl (tag) {
		return document.createElement(tag);
	}

	function  append(parent,el) {
		return parent.appendChild(el);
	}
	function  setClass(el, className) {
		return el.setAttribute('class', className);
	}
	function  removeClass(el, className) {
		return el.className.remove(className);
	}

	function remove(parent,el) {
		return parent.removeChild(el);
	}

	function addClickListener(el, func) {
		return el.addEventListener('click', func, false);
	}

	function addContextListener(el, func) {
		return el.addEventListener('contextmenu', func, false);
	}
	function removeContextListener(el, func) {
		return el.removeEventListener('contextmenu', func, false);
	}

	function removeClickListener(el, func) {
		return el.removeEventListener('click', func, false);
	}

	function removeTemplate(container, node) {
		return container.removeChild(node.parentNode);
	}

	function clearNode (node) {
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
	return {
		templateBuilder: templateBuilder,
		getElById: getElById,
		getElByClass: getElByClass,
		getElsByTag: getElsByTag,
		createEl: createEl,
		append: append,
		setClass: setClass,
		remove: remove,
		addClickListener: addClickListener,
		removeClickListener: removeClickListener,
		clearNode: clearNode,
		removeTemplate: removeTemplate,
		addContextListener: addContextListener,
		removeContextListener: removeContextListener,
		removeClass: removeClass,
		extend: extend
	}
})();






