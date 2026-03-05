# Proyecto Final – Backend Ecommerce | Coderhouse

Proyecto final desarrollado para el curso **Programación Backend** de Coderhouse.  
Se trata de un **backend completo para un ecommerce**, construido con **Node.js, Express y MongoDB**, siguiendo una **arquitectura profesional por capas** e incorporando funcionalidades avanzadas como autenticación, sistema de tickets, envío de correos, pagos con Stripe y webhooks.

El objetivo del proyecto es simular el funcionamiento real de una plataforma de comercio electrónico, permitiendo gestionar usuarios, productos, carritos de compra y procesar pagos reales.

---

# Arquitectura del Proyecto

El proyecto está estructurado siguiendo una **arquitectura escalable basada en capas**, lo cual permite separar responsabilidades y facilitar el mantenimiento del código.

Se implementan los siguientes patrones:

- **DAO (Data Access Object)** → Manejo de acceso a datos
- **DTO (Data Transfer Object)** → Transferencia segura de información
- **Factory Pattern** → Selección dinámica de persistencia
- **Service Layer** → Lógica de negocio desacoplada
- **Controllers / Routers** → Manejo de endpoints de la API
- **Models** → Definición de esquemas de MongoDB
- **Utils** → Servicios auxiliares (mail, sms, etc.)

---

# Tecnologías utilizadas

El proyecto utiliza tecnologías modernas del ecosistema **Node.js**.

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose

### Autenticación
- Passport
- JWT

### Pagos
- Stripe API
- Stripe Webhooks

### Mensajería
- Nodemailer (emails automáticos)
- Servicio SMS (simulado)

### Configuración
- dotenv

### Herramientas de desarrollo
- Nodemon
- Thunder Client / Postman para testing de endpoints

---

# Funcionalidades principales

## Gestión de usuarios

El sistema permite administrar usuarios dentro de la plataforma.

Endpoints principales:

### Obtener usuarios
GET /api/users

Devuelve únicamente **datos personales del usuario**, excluyendo información sensible como la contraseña.

Campos devueltos:

- Nombre
- Email
- Rol
- Última conexión

---

### Eliminación automática de usuarios inactivos
DELETE /api/users

Elimina usuarios que **no hayan tenido conexión durante los últimos 2 días**, utilizando el campo:

last_connection

---

### Panel administrativo

Se incluye una **vista para administradores** que permite:

- Visualizar usuarios
- Modificar el rol de un usuario
- Eliminar usuarios

Esta funcionalidad solo es accesible para usuarios con rol **admin**.

---

# Gestión de productos

El sistema permite:

- Crear productos
- Listar productos
- Actualizar productos
- Eliminar productos

### Productos Premium

Cuando se elimina un **producto premium**, el sistema envía automáticamente un **correo electrónico al dueño del producto**, notificando la eliminación.

---

# Sistema de Carritos

El proyecto implementa un sistema completo de carritos.

Funcionalidades:

- Crear carrito
- Agregar productos al carrito
- Eliminar productos
- Vaciar carrito
- Procesar compra

---

# Flujo de compra

El flujo de compra simula el comportamiento de un ecommerce real.

Endpoint principal:

POST /api/carts/:cid/purchase

Proceso ejecutado:

1. Validación de stock de productos
2. Cálculo del monto total
3. Descuento de stock en base de datos
4. Generación de ticket de compra
5. Confirmación de pago mediante Stripe
6. Envío de notificaciones

---

# Sistema de Tickets

Cada compra genera un **ticket único** que queda persistido en la base de datos.

Modelo del ticket:

- Código único
- Fecha de compra
- Monto total
- Comprador

Archivo:
src/models/ticket.js

---

# Integración con Stripe

El sistema integra **Stripe** para simular un flujo de pago real.

Proceso:
Usuario inicia compra
Backend crea PaymentIntent
Stripe procesa el pago
Stripe envía evento al webhook
Backend confirma pago
Se genera ticket

Eventos procesados:

- `payment_intent.succeeded`
- `charge.succeeded`

Solo cuando el pago es **confirmado por Stripe** se genera el ticket de compra.

---

# Sistema de Notificaciones

El sistema incluye servicios de notificación automáticos.

### Email

Utilizando **Nodemailer**, el sistema envía correos en los siguientes casos:

- Confirmación de compra
- Eliminación de producto premium

---

### SMS

El sistema incluye un módulo de envío de SMS (simulado).

Archivo:
src/utils/sms.js

Este servicio envía un mensaje confirmando la compra realizada.

---
El repositorio incluye todo el código necesario para su ejecución.

---

# Autor

**Ignacio Espeche**

Proyecto desarrollado como **entrega final del curso Programación Backend – Coderhouse**.