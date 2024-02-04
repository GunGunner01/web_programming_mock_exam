// --------------------------- task 5 ------------------------------------

import { service } from '../service.js';
import { router } from '../router.js';

export class Home {
    constructor() {
        this.view = document.createElement('div');
        this.view.innerHTML = `
            <h1>Chat</h1>
            <select id="topicSelect">
                <option value="">Select topic</option>
            </select>
            <input id="newTopic" placeholder="Enter new topic" /> // task 7
        `;

        this.topicSelect = this.view.querySelector('#topicSelect');
        this.newTopicInput = this.view.querySelector('#newTopic');

        this.topicSelect.onchange = () => {
            const topic = this.topicSelect.value;
            if (topic) {
                router.navigate(`/chat/${topic}`);
            }
        };

        // --------------------------- task 7 ------------------------------------
        this.newTopicInput.onkeypress = event => {
            if (event.key === 'Enter') {
                const newTopic = this.newTopicInput.value.trim();
                if (newTopic) {
                    router.navigate(`/chat/${newTopic}`);
                    this.newTopicInput.value = ''; // Clear the input field
                }
            }
        };
        // ------------------------ end task 7 ------------------------------------

        this.populateTopics();
    }

    populateTopics() {
        service.getTopics()
            .then(topics => {
                topics.forEach(topic => {
                    const option = document.createElement('option');
                    option.value = topic;
                    option.textContent = topic;
                    this.topicSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching topics:', error));
    }

    getTitle() {
        return 'Select a topic';
    }

    getView() {
        return this.view;
    }
}
// ------------------------ end task 5 ------------------------------------
