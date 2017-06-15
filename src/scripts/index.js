//aqui la lógica para el archivo index.html
import NovedadService from '../services/NovedadService';
let service = new NovedadService();
import tpl from '../tpl/partials/last_news.njk';
let $email = document.querySelector("#email")
$email.innerHTML = process.env.EMAIL;
$email.href = process.env.EMAIL;
service.getAll({
	draw:1,
	start:0,
	length:10
}, (error, data)=>{

	var html = tpl.render({ items:  data });
	document.querySelector('#noticias-container').innerHTML = html;
	$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
		var $this = $(this),
			opts;

		var pluginOptions = $this.data('plugin-options');
		if (pluginOptions) {
			opts = pluginOptions;
		}
		$this.themePluginCarousel(opts);
	});
});

