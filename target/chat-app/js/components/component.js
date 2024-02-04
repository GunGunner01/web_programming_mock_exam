export class Component {

	#title;
	#view;

	constructor(title, template) {
		this.#title = title;
		this.#view = document.createElement('div');
		this.#view.innerHTML = template;
	}

	getTitle() {
		return this.#title;
	}

	getView() {
		return this.#view;
	}

	_select(selector) {
		return this.#view.querySelector(selector);
	}
}
