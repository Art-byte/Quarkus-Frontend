<div style="text-align: justify">

# App
Este proyecto forma parte del proyecto quarkus y es el desarrollo del front end el cual está generado con [Angular CLI](https://github.com/angular/angular-cli) versión 10.2.0.


## Clonar Proyecto
````
$ git clone http://10.119.209.94:3000/DESS/app
$ cd app
$ npm i
````

## Credenciales de acceso
username: admin
password: Admin123$


##  Dependencias Importantes
El proyecto ha sido desarrollado `Angular Material` y hace consumo de otras librerías para su funcionalidad.

Entre los módulos a destacar en este proyecto tenemos:
- ##### sweetalert2: Animaciones y mensajes del Sistema.
- ##### file-saver: Almacenamiento y descarga de archivos.
- ##### ngx-spinner: Animación de carga de elemento de forma dinamica y atractiva.
- ##### rxjs: Manejo de código asincrono y detección de cambios de estado.

<br>

## Servidor de Desarrollo
Para ejecutar el proyecto se debe ingresar el comando `ng serve` y nos dirigiremos a la ruta `http://localhost:4200/` en la cual se encontrará nuestro componente de acceso.
<br>

## Documentación del proyecto
Como parte de la documentación de este proyecto se ha agregado la utilidad de [Compodoc](https://compodoc.app/guides/getting-started.html) el cual es un modulo de node que nos permité construir la documentación de todo nuestro proyecto. Para poder visualizarlo basta con ejecutar el comando `node run compodoc` el cual empezará a leer todo nuestro proyecto y comenzará a crear su respectiva documentación trayendonos como resultado una carpeta de nombre `documentation`.

Tambien podemos ingresar por medio de la web a la documentación dirigiendonos a la ruta `http://localhost:4400`, y desde esta podemos navegar de forma más gráfica sobre la documentación de nuestro proyecto.

</div>