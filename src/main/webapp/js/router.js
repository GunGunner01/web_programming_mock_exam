const routes = {};

export const router = {
	register: function(path, component) {
		console.log(`Register component with path ${path}`);
		routes[path] = component;
	},
	navigate: function(path) {
		if (location.hash === '#' + path)
			navigate(path);
		else location.hash = path;
	}
};

window.onhashchange = () => navigate(location.hash.replace('#', ''));

function navigate(path) {
	console.log(`Navigate to path ${path}`);
	let [name, parameter] = path.split('/').splice(1);
	let Component = routes['/' + name];
	if (Component)
		show(Component, decodeURI(parameter));
	else console.log(`Path ${path} not found`);
}

function show(Component, param) {
	console.log(`Show component ${Component.name}`);
	footer.innerHTML = '';
	let component = new Component(param);
	document.title = component.getTitle();
	main.replaceChildren(component.getView());
}
