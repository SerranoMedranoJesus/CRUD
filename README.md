# CRUD

#### Datos generados con fake api. Por lo tanto debemos observar la consola para ver los códigos de las peticiones que sean correctos. Podemos observar una tabla con datos y páginación, en la tabla encontramos las opciones de borrar usuario, montado en un modal para su confirmación indicando el nombre del usuario. Para editar aprovecho el mismo componente que para crear. Si pulso editar enviar por parametros la id del usuario, podemos observarla en la barra de navegación, cuando entra a esta componente mira si viene esa id, siendo así solicitamos a la api los datos de ese usuario. Si pulsamos en nuevo nos envia al mismo formulario, pero esta vez sin datos, así podemos crear un usuario nuevo.

## A continuación dejo las instrucciones para clonar, instalar y arrancar proyecto.

### Clonar proyecto mediante consola
```
git clone https://github.com/JesusSerranoM/CRUD.git
```

### Instalación de dependencias
```
npm install
```

### Compilar y arrancar el proyecto
```
npm run serve
```
