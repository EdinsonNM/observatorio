
<div align="center">
  <h1>OBSERVATORIO PORTAL WEB DE LAS CUENCA CHANCAY LAMBAYEQUE, CHIRA-PIURA y QUILCA-CHILI</h1>
  <p>
    Esta aplicación ha sido desarrollada por Edinson Nuñez More y Luis Pintado Huaman
    <small><strong>version 0.1</strong></small>
  <p>
</div>

<h2 align="center">Introduction</h2>



El observatorio es un portal web cuya finalidad es poner a disposición de los usuarios, la información existente sobre la cuenca en distintos campos de conocimiento (ambiental, hidrológico, socio-económico y gestión de riesgos).

> Esta documentación se centra en el visor de la cuenca Chancay-Lambayeque aunque la mayoria de caracteristicas y personalizaciones responden a esta documentación en el caso de implementación en otras cuencas.


## Requerimientos

Para poder iniciar el proyecto es necesario se instalen las siguientes herramientas:
* Instalar la ultima version de Node JS desde [https://nodejs.org/](https://nodejs.org/)
* Instalar Git desde [https://git-scm.com/](https://git-scm.com/)

Una vez instaladas deberá clonar este repositorio escribiendo el siguiente comando en su terminal CMD en windows o BASH en ubuntu
```
git clone https://github.com/EdinsonNM/observatorio.git
```

<h2>Instalar Dependencias</h2>
Antes de inicializar el proyecto es encesario instalar todas las dependencias del mismo, por lo cual sera necesario ejecutar los siguientes comandos:

```bash
cd observatorio
npm install
```

<h2>Iniciar Proyecto en modo desarrollo</h2>
Para iniciar el proyecto a modo desarrollo debera ejecutar el siguiente comando:

```bash
npm start
```
Una vez ejecutado el comando , se podra acceder al portal web a traves de la siguiente dirección [http://localhost:8000](http://localhost:8000)

<h2>Producción</h2>
Para generar los archivos necesarios para el ambiente a producción se deberá ejecutar el siguiente comando:

```bash
npm run build
```
Este comando creara una carpeta llamada "build" la cual contendra los archivos que deberan ser colocados en el servidor producción.


<h2>Cambiar de un portal a otro</h2>

Cabe mencionar que la rama "master" de este repositorio hace referencia al proyecto Chancay-Lambayeque , la rama "master-quilca" hace referencia a la cuenca Quilca-Chili y la rama "master-chira" hace referencia al portal de Chira-Piura. Por lo cual si se desea realizar alguna modificación en alguno de estos portales se deberá saltar de una rama a otra siguiendo los siguientes comandos
<h3>Cambiando a Chancay-Lambayeque</h3>

```bash
git checkout master
```
<h3>Cambiando a Quilca-Chili</h3>

```bash
git checkout master-quilca
```
<h3>Cambiando a Chira-Piura</h3>

```bash
git checkout master-chira
```
**CARACTERÍSTICAS DEL PORTAL**

* Portal principal con acceso a las noticias, temáticas y visor.
* Temáticas y estadísticas.
* Visor de mapas.
* Administrador para el visor de mapas.



#### TECNOLOGÍAS UTILIZADAS

|Name|Description|
|:--:|:----------|
|<a href="https://github.com/webpack/json5-loader"><img width="48" height="48" src="https://cdn.rawgit.com/json5/json5-logo/master/json5-logo.svg"></a>|JSON
|<a href="https://github.com/webpack/script-loader">`<script>`</a>|Executes a JavaScript file once in global context (like in script tag), requires are not parsed|
|<a href="https://github.com/babel/babel-loader"><img width="48" height="48" title="babel-loader" src="https://worldvectorlogo.com/logos/babel-10.svg"></a>|Loads ES2015+ code and transpiles to ES5 using <a href="https://github.com/babel/babel">Babel</a>|
|<a href="https://github.com/webpack/html-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/html5.svg"></a>|Exports HTML as string, require references to static resources|
|<a href="https://github.com/webpack/style-loader">`<style>`|Add exports of a module as style to DOM|
|<a href="https://github.com/webpack/css-loader"><img width="48" height="48" src="https://worldvectorlogo.com/logos/css-3.svg"></a>|Loads CSS file with resolved imports and returns CSS code|
|<a href="https://github.com/webpack/jslint-loader"><img width="48" height="48" src="http://jshint.com/res/jshint-dark.png"></a>|PreLoader for linting code using JSHint|





<h2>Desarrolladores</h2>

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAhnAAAAJDE4YTZjOWM0LWRkNTItNDk0OC04MzM3LWZlOTNhZjFhNjI1YQ.jpg">
        <br>
        <a href="https://www.linkedin.com/in/edinsonnm/">Edinson Nuñez</a>
        <p>Web Senior developer</p>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAeMAAAAJGQyMzg0M2U3LTE5Y2YtNDIzNy05NTAzLTAzMDY4OTQzOGI0Nw.jpg">
        <br>
        <a href="https://www.linkedin.com/in/luchopintado/">Luis Pintado</a>
        <p>Front-End Developer</p>
      </td>
     </tr>
  </tbody>
</table>
