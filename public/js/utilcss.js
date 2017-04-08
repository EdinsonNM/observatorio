var getVariable = function(styles, propertyName) {
	return String(styles.getPropertyValue(propertyName)).trim();
};

var setDocumentVariable = function(propertyName, value) {
	document.documentElement.style.setProperty(propertyName, value);
};

var animate = function(element,...params){
	for (let i = 0, length = params.length; i < length; i++) {
		element.classList.add(params[i]);
	}
	var endAnimation = function(){
	for (let i = 0, length = params.length; i < length; i++) {
			element.classList.remove(params[i]);
		}
	}
	element.addEventListener('webkitAnimationEnd',endAnimation);
	element.addEventListener('mozAnimationEnd',endAnimation);
	element.addEventListener('MSAnimationEnd',endAnimation);
	element.addEventListener('oanimationend',endAnimation);
	element.addEventListener('animationend',endAnimation);
	element.addEventListener('animationend',endAnimation);
}