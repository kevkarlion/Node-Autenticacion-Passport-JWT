//-- Clase 4

1-Configuramos un archivo donde indicamos que contenedores vamos a necesitar. 
Creamos el archivo docker-compose.yml


  Indicamos version

  Indicamos servicios (Es desde donde podemos conectarnos)


En image le indico la version del programa que quiero correr.
Creo las varables de entorno para obtener los datos que necesita el servicio.
Agrego el puerto.


 LUEGO DE ESTO, CORREMOS EN CONSOLA ======= >>>>>
            
            docker-compose up -d postgres



OTROS COMANDOS PARA TRABAJAR CON DOCKER POR CONSOLA =====>>>>>

            docker-compose ps 
      Este comando sirve para ver que servicios esta corriendo



        docker-compose down / down postgres
      Comando para dejar de correr servicios



DATO DE VITAL IMPORTANCIA!

Los contenedores en Docker generalmente se consideran "stateless" o sin estado, lo que significa que no almacenan ni mantienen datos persistentes dentro de sí mismos. Los contenedores están diseñados para ser efímeros y reemplazables. Cada vez que se inicia un contenedor, se crea a partir de una imagen y contiene una instantánea del sistema de archivos y configuración definida en esa imagen.
Es necesario crear un "volumen" en el contenedor para que cada vez que cargue, levante estos datos almacenados y poder trabajar con la db.


Tambien cargue al final un volumes para indicar donde voy a persistir los datos!!


FIN DE CLASE

//--









