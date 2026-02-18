# Tercera Práctica Integradora – Coderhouse

Proyecto desarrollado con Node.js, Express y MongoDB, correspondiente a la Tercera Práctica Integradora del curso Programación Backend de Coderhouse. El objetivo es implementar una arquitectura profesional con DAO, DTO y Factory, sumando un sistema de tickets y envío de mails.

## Tecnologías utilizadas
* Node.js
* Express
* MongoDB & Mongoose
* Nodemailer
* Passport
* dotenv

## Instalación
1. Clonar el repositorio o descargar el proyecto.
2. Posicionarse en la carpeta raíz del proyecto.
3. Ejecutar el siguiente comando para instalar las dependencias:
   npm install

## Ejecución del proyecto
Para iniciar el servidor ejecutar:
```bash
   npm run dev
```
El servidor se levanta en el puerto 8080.

## Proceso de Prueba de Compra
Para verificar el funcionamiento del sistema de tickets y mailing, se realizaron las siguientes pruebas en Thunder Client:

1. **Creación/Selección de Producto y Carrito**: Se vinculó un producto (Nike Air Jordan 1) al carrito generado.
2. **Endpoint de Compra**: Se ejecutó el POST a `/api/carts/:cid/purchase`.
3. **Resultado**: 
   - Generación del ticket con monto de 250.000.
   - Descuento de stock en la base de datos de 10 a 9    unidades.
   - Envío de correo electrónico automático.
   
### Evidencia de funcionamiento

#### 1. Terminal: Envío de correo y persistencia
![Terminal](Terminal-Mensaje%20Final.png)

*(En la terminal se observa el log del servidor confirmando que el proceso de compra disparó el servicio de mensajería)*

#### 2. Mail: Confirmación de compra (Ticket)
![Mail](Mail%20Recibido.png)
*(Captura del correo generado por Nodemailer con los datos del ticket de compra)*
## Archivos principales
* **src/dao/factoryDAO.js**: Selección dinámica de persistencia (Mongo).
* **src/services/carritoService.js**: Lógica para el proceso de compra y validación de stock.
* **src/models/ticket.js**: Modelo para la persistencia de tickets.
* **src/config/config.js**: Manejo de variables de entorno.

**AUTOR: IGNACIO ESPECHE**