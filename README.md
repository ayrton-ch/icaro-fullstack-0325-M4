# 🏋️ Personal Trainers Management System

Sistema de gestión de entrenadores personales desarrollado con Node.js, Express y Sequelize. Permite el registro, autenticación y administración de entrenadores personales con una API RESTful completa.

## 📋 Descripción

Este proyecto es un trabajo práctico del programa Icaro Fullstack (Módulo 4) que implementa un sistema backend para la gestión de entrenadores personales. Incluye autenticación con JWT, validación de datos, documentación con Swagger, y gestión de sesiones.

## 🚀 Características

- ✅ Sistema de autenticación con JWT
- ✅ CRUD completo de entrenadores personales
- ✅ Validación de datos con express-validator
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Gestión de sesiones con express-session
- ✅ Documentación de API con Swagger
- ✅ Sistema de logging con Winston
- ✅ Vistas renderizadas con EJS
- ✅ Migraciones de base de datos con Sequelize

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Sequelize** - ORM para base de datos
- **PostgreSQL/MySQL** - Base de datos
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Encriptación de contraseñas
- **Swagger** - Documentación de API
- **Winston** - Sistema de logging
- **EJS** - Motor de plantillas

## 📦 Instalación

### Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL o MySQL
- Git

### Pasos de Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/ayrton-ch/icaro-fullstack-0325-M4.git
cd icaro-fullstack-0325-M4
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trainers_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DIALECT=postgres

# Seguridad
JWT_SECRET=tu_clave_secreta_jwt
COOKIE_SECRET=tu_clave_secreta_cookie
SESSION_SECRET=tu_clave_secreta_session
```

4. Ejecutar migraciones:

```bash
npx sequelize-cli db:migrate
```

5. Iniciar el servidor:

```bash
node app.js
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Documentación de API

Una vez iniciado el servidor, la documentación interactiva de Swagger estará disponible en:

```
http://localhost:3000/api-docs
```

### Endpoints Principales

#### Autenticación

- `POST /auth/register` - Registrar nuevo entrenador
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión

#### Entrenadores (Requieren autenticación)

- `GET /trainers` - Obtener todos los entrenadores
- `GET /trainers/:id` - Obtener entrenador por ID
- `POST /trainers` - Crear nuevo entrenador
- `PUT /trainers/:id` - Actualizar entrenador
- `DELETE /trainers/:id` - Eliminar entrenador

### Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Para acceder a las rutas protegidas:

1. Obtener un token mediante `/auth/login`
2. Incluir el token en el header de las peticiones:

```
Authorization: Bearer <tu_token>
```

## 🗂️ Estructura del Proyecto

```
icaro-fullstack-0325-M4/
├── app.js                    # Archivo principal de la aplicación
├── package.json              # Dependencias y scripts
├── config/                   # Configuraciones
│   ├── config.js            # Configuración de base de datos
│   ├── logger.js            # Configuración de Winston
│   └── swagger.js           # Configuración de Swagger
├── controllers/             # Controladores
│   ├── AuthController.js    # Lógica de autenticación
│   └── TrainerController.js # Lógica de entrenadores
├── middlewares/             # Middlewares personalizados
│   ├── authMiddleware.js    # Validación de JWT
│   ├── userValidator.js     # Validaciones de usuario
│   └── validator.js         # Validaciones generales
├── migrations/              # Migraciones de base de datos
├── models/                  # Modelos de Sequelize
│   ├── index.js
│   └── PersonalTrainer.js   # Modelo de entrenador
├── routes/                  # Definición de rutas
│   ├── authRoutes.js
│   └── trainerRoutes.js
├── views/                   # Vistas EJS
│   ├── login.ejs
│   ├── profile.ejs
│   └── register.ejs
└── public/                  # Archivos estáticos
```

## 🔐 Modelo de Datos

### PersonalTrainer

| Campo          | Tipo          | Descripción                       |
| -------------- | ------------- | --------------------------------- |
| id             | INTEGER       | Identificador único (Primary Key) |
| name           | STRING(100)   | Nombre del entrenador             |
| email          | STRING(100)   | Email único del entrenador        |
| password       | STRING(255)   | Contraseña encriptada             |
| certifications | TEXT          | Certificaciones del entrenador    |
| specialization | STRING(100)   | Especialización                   |
| gym_name       | STRING(100)   | Nombre del gimnasio               |
| session_price  | DECIMAL(10,2) | Precio por sesión                 |
| phone_number   | STRING(20)    | Número de teléfono                |
| available      | BOOLEAN       | Disponibilidad                    |

## 📝 Logs

Los logs se generan automáticamente usando Winston y se almacenan en la consola y/o archivos según la configuración en `config/logger.js`.

## 👥 Autor

**ayrton-ch**

- GitHub: [@ayrton-ch](https://github.com/ayrton-ch)

## 🙏 Agradecimientos

- Programa Icaro Fullstack 0325
- Módulo 4 - Backend Development

---
