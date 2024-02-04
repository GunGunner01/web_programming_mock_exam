import { Component } from './component.js';
import { service } from '../service.js';
import { router } from '../router.js'; // Import router to navigate back to home // task 5

export class Chat extends Component {
	static #template = `
        <h1>Chat - <span id="topicTitle"></span></h1>
        <input id="message" placeholder="Enter new message">
        <ul></ul>
        <a href="#/" id="homeLink">Back to home</a> // task 6
    `;

	#refreshIntervalId = null; // Store the interval ID for clearing later
	#topic = null; // Store the current topic // task 5

	constructor(topic) { //task 6
		super('Chat', Chat.#template);
		this.#topic = topic; // Set the current topic from the constructor parameter // task 6
		this._select('#topicTitle').textContent = this.#topic; // Set the topic title // task 6
		this.#fetchMessages();
		this._select('input').onkeypress = event => {
			if (event.key === 'Enter') this.#postMessage();
		}
		this.#setupAutomaticRefresh();
		this._select('#homeLink').onclick = () => this.#stopAutomaticRefresh(); // Stop refresh when going back home
	}

	#fetchMessages() {
		service.getMessages(this.#topic) // Fetch messages for the current topic // task 6
			.then(messages => this.#renderMessages(messages))
			.catch(() => footer.innerHTML = 'Unexpected error');
	}

	#renderMessages(messages) {
		let list = this._select('ul');
		list.innerHTML = '';
		for (let message of messages) {
			if (message.topic === this.#topic) { // Check if the message belongs to the current topic // task 6
				let item = document.createElement('li');
				item.innerHTML = message.text;
				list.append(item);
			}
		}
	}

	#postMessage() {
		let input = this._select('#message');
		let message = {
			text: input.value,
			topic: this.#topic // Assign the topic to the message before sending //task 6
		};
		service.postMessage(message)
			.then(() => this.#fetchMessages())
			.catch(() => footer.innerHTML = 'Unexpected error');
		input.value = '';
	}

	#setupAutomaticRefresh() {
		this.#refreshIntervalId = setInterval(() => this.#fetchMessages(), 10000); // Set up the timer to refresh every 10 seconds
	}

	#stopAutomaticRefresh() {
		if (this.#refreshIntervalId) {
			clearInterval(this.#refreshIntervalId); // Clear the interval
			this.#refreshIntervalId = null;
		}
	}

	// Call this method when the component is destroyed or hidden
	onDestroy() {
		this.#stopAutomaticRefresh(); // Ensure the timer is cleared when the component is no longer active
	}
}
