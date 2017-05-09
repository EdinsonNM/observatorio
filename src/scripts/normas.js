//aqui la lógica para el archivo index.html
import NormaService from '../services/NormaService';
import tpl from '../tpl/partials/normas.njk';

let service = new NormaService();
let normas=[];
let page = 0;
let length = 10;

service.getAll({
	draw:1,
	start:0,
	length:10
}, (error, data)=>{
  normas = data;
  createPagination();
	getDataByPage(page);
});

let getDataByPage = function(nroPage){
  if(document.querySelector(`#page-${page}`).classList.contains("active")){
    document.querySelector(`#page-${page}`).classList.remove("active");
  }
  page = nroPage;
  let data=[];
  let start= (page)*length;
  let end = start + length;
  data = normas.slice(start,end);
 	let html = tpl.render({ items:data });
  document.querySelector('#normas-container').innerHTML = html;
  document.querySelector(`#page-${page}`).classList.add("active");
};

let createPagination = function(){
  let totalPages = Math.ceil(normas.length/length);
  let paginationContainer = document.querySelector('#pagination');

  let firstPage = createPage("«",0,false);
  paginationContainer.appendChild(firstPage);
  for(let i=0;i<totalPages;i++){
    let li = createPage(i+1,i,true)
    paginationContainer.appendChild(li);
  }
  let lastPage = createPage("»",totalPages-1,false);
  paginationContainer.appendChild(lastPage);
};

let createPage = function(title,page,includeId){
    let li = document.createElement("li");
    let a = document.createElement("a");
    if(includeId)
      li.setAttribute("id",`page-${page}`);
    a.setAttribute("href","#");
    a.setAttribute("data-page",page);
    a.innerHTML = title.toString();
    a.addEventListener('click',()=>{
      getDataByPage(page);
    });
    li.appendChild(a);
    return li;
}
