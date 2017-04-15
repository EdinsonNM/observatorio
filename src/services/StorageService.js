let storage = firebase.storage().ref();
export default class StorageService{
	constructor(route){
		this.route = route;
	}
	upload(name, file){
		var fileRef = storage.child(`${this.route}/${name}`);
		var uploadTask = fileRef.put(file);
	}
}
