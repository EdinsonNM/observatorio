
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
git clone https://github.com/EdinsonNM/observatorio-lambayeque.git
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


**CARACTERÍSTICAS DEL PORTAL**

* Portal principal con acceso a las noticias, temáticas y visor.
* Temáticas y estadísticas.
* Visor de mapas.
* Administrador para el visor de mapas.



#### TECNOLOGÍAS UTILIZADAS

* Javascrit
* React JS
* Firebase
* Babel
* Webpack
* Material UI






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
