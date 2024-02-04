const BASE_URL = '/api';
const MEDIA_TYPE = 'application/json';

export const service = {
	// ---------------------------- task 4 ------------------------------------
	getMessages: function(topic) { // Modified to accept a topic parameter
		let url = '/messages';
		if (topic) {
			url += `?topic=${encodeURIComponent(topic)}`; // Append the topic query parameter if provided
		}
		return ajax(url, 'GET')
			.then(response => response.ok ? response.json() : Promise.reject(response));
	},
	// ------------------------ end task 4 ------------------------------------
	postMessage: function(message) {
		return ajax('/messages', 'POST', message)
			.then(response => response.ok ? response.json() : Promise.reject(response));
	},
	// ---------------------------- task 4 ------------------------------------
	getTopics: function() {
		return ajax('/topics', 'GET')
			.then(response => response.ok ? response.json() : Promise.reject(response));
	}
	// ------------------------ end task 4 ------------------------------------
};

function ajax(path, method, data, user) {
	let url = BASE_URL + path;
	let headers = getHeaders(method, user);
	let options = { method, headers };
	if (data) options.body = JSON.stringify(data);
	console.log(`Send ${method} request to ${url}`);
	return fetch(url, options);
}

function getHeaders(method, user) {
	let headers = {};
	if (method === 'GET') headers['Accept'] = MEDIA_TYPE;
	if (method === 'POST' || method === 'PUT') headers['Content-Type'] = MEDIA_TYPE;
	if (user) headers['Authorization'] = 'Basic ' + btoa(user.name + ':' + user.password);
	return headers;
}
