import { Component } from './component.js';
import { service } from '../service.js';

export class Chat extends Component {

	static #template = `
		<h1>Chat</h1>
		<input id="message" placeholder="Enter new message">
		<ul></ul>
		<span id="refresh" class="icon">&#x21ba;</span>
	`;

	constructor() {
		super('Chat', Chat.#template);
		this.#fetchMessages();
		this._select('input').onkeypress = event => {
			if (event.key === 'Enter') this.#postMessage();
		}
		this._select('#refresh').onclick = () => this.#fetchMessages();
	}

	#fetchMessages() {
		service.getMessages()
			.then(messages => this.#renderMessages(messages))
			.catch(() => footer.innerHTML = 'Unexpected error');
	}

	#renderMessages(messages) {
		let list = this._select('ul');
		list.innerHTML = '';
		for (let message of messages) {
			let item = document.createElement('li');
			item.innerHTML = message.text;
			list.append(item);
		}
	}

	#postMessage() {
		let input = this._select('#message');
		let message = {
			text: input.value
		};
		service.postMessage(message)
			.then(() => this.#fetchMessages())
			.catch(() => footer.innerHTML = 'Unexpected error');
		input.value = '';
	}
}
