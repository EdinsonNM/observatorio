$(function(){
	let href = window.location.href;
	let page = 'index.html'

	if (href) {
	 	page = href.split('/').pop() || 'index.html';
	}

	window.page = page;

	let $a = $("#mainNav").find("[href='"+ page +"']");


	if ($a) {
		if ($a.closest('li.dropdown').size()) {
			$a.closest('li.dropdown').addClass('active');
		} else {
			$a.parent().addClass('active');
		}
	}

});
