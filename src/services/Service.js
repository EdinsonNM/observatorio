import Cache from './Cache';
//import Users from './UserService';
let database = firebase.database();
export default class Service {
	get database() {
		return database;
	}
	constructor(route) {
		this.route = route;

	}
	getUrl(...params) {
		let url = '/';
		for (let i = 0, length = params.length; i < length; i++) {
			url += params[i] + ((params[i] !== '' && i < length - 1) ? '/' : '');
		}
		console.log(url);
		return url;
	}
	//customRoute ="/mycustom/route"
	get(id, next, customRoute = '') {
		let url = this.getUrl(this.route, customRoute, id);
		database.ref(url).once('value').then((snapshot) => {
			let data = snapshot.val();
			data.id = id;
			return next(null, data);
		});
	}
	getAll(params, next, caching = false, customRoute = '') {
		let url = this.getUrl(this.route, customRoute);
		let query = database.ref(url);
		for (let key in params) {
			if (params[key] != null)
				query = query.orderByChild(key).equalTo(params[key])
		}
		query.once('value', (snapshot) => {
			let data = [];
			if (caching) {
				Cache.clear(this.route);
			}
			snapshot.forEach((childSnapshot) => {
				let item = childSnapshot.val();
				item.id = childSnapshot.key;
				data.push(item);
				if (caching) {
					Cache.addItem(this.route, item.id, item);
				}
			});
			return next(null, data);
		});
	}

	post(data, next, customRoute = '',useParamId=false) {
		data.createdAt = firebase.database.ServerValue.TIMESTAMP;
		let url = this.getUrl(this.route, customRoute);
		let newKey = (useParamId)?data.id:database.ref().child(url).push().key;
		data.id = newKey;
		database.ref(this.getUrl(this.route, customRoute, newKey)).set(data);
		next(null, data);
	}
	update(id, data, next, customRoute = '', updates = {}) {
		let url = this.getUrl(this.route, customRoute, id);
		data.updatedAt = firebase.database.ServerValue.TIMESTAMP;
		updates[url] = data;
		database.ref().update(updates);
		next(null, data);
	}
	delete(id, next, customRoute = '') {
		let url = this.getUrl(this.route, customRoute);
		database.ref(url).child(id).remove();
	}

	on(next, customRoute = '') {
		let url = this.getUrl(this.route, customRoute);
		database.ref(url).on('value', function (snapshot) {
			next(null, snapshot.val());
		});
	}
	off(next, customRoute = '') {
		let url = this.getUrl(this.route, customRoute);
		database.ref(url).off();
	}

	/*static getAll(route, next, caching = false) {
		database.ref(Users.origin() + '/' + route).once('value', (snapshot) => {
			let data = [];
			if (caching) {
				Cache.clear(route);
			}
			snapshot.forEach((childSnapshot) => {
				let item = childSnapshot.val();
				item.id = childSnapshot.key;
				data.push(item);
				if (caching) {
					Cache.addItem(route, item.id, item);
				}
			});
			return next(null, data);
		});
	}*/



}
