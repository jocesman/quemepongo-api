# 👗 ¿Qué Me Pongo? – API Backend

Bienvenido al backend de **¿Qué Me Pongo?**, una API REST desarrollada con NestJS para gestionar prendas de vestir, generar recomendaciones de outfits y administrar usuarios autenticados por JWT.  
Incluye subida de imágenes con Cloudinary, filtros por clima, y un historial de outfits generados.

> 🔗 Repositorio de GitHub: [https://github.com/jocesman/que-me-pongo](https://github.com/jocesman/que-me-pongo)

---

## 🚀 Tecnologías usadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [Swagger](https://swagger.io/)
- [Cloudinary](https://cloudinary.com/)
- [JWT](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jocesman/que-me-pongo.git
   cd que-me-pongo/backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura tus variables de entorno:
   Crea un archivo `.env.development` con el siguiente contenido:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=admin
   DB_NAME=quemepongo

   JWT_SECRET=supersecret
   JWT_EXPIRES_IN=1d

   CLOUDINARY_CLOUD_NAME=tu_cloud
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret

   ALLOWED_ORIGINS=http://localhost:19006
   ```

4. Ejecuta la aplicación:
   ```bash
   npm run start:dev
   ```

---

## 🔐 Autenticación

La API usa **JWT**. Para acceder a los endpoints protegidos, primero registra o inicia sesión, y luego añade el token en el header:

```
Authorization: Bearer <token>
```

---

## 📖 Documentación Swagger

La documentación interactiva está disponible en:

```
http://localhost:3000/api
```

---

## 📁 Estructura de Carpetas

```
src/
│
├── modules/
│   ├── auth/               // Login, registro, JWT
│   ├── user/               // Gestión de usuarios
│   ├── prendas/            // Prendas y generación de outfits
│   ├── prendaImage/        // Subida de imágenes a Cloudinary
│   ├── outfit/             // Historial de outfits generados
│   └── cloudinary/         // Configuración de proveedor externo
│
├── entities/               // Entidades de TypeORM
├── guards/                 // Guardias de autenticación JWT
└── middleware/             // Logger global personalizado
```

---

## ✨ Funcionalidades principales

### 👤 Autenticación
- `POST /auth/register`: Registro de usuario
- `POST /auth/login`: Login con número telefónico

### 👗 Prendas
- `GET /prendas`: Listar prendas del usuario (con filtros)
- `POST /prendas`: Crear prenda
- `GET /prendas/outfit?clima=frio`: Generar outfit inteligente

### 🖼 Imágenes
- `POST /prendas/:id/images`: Subir imagen de una prenda

### 📅 Historial de Outfits
- `GET /outfit/historial`: Ver outfits generados previamente

---

## 🧠 Outfit Inteligente

Al generar un outfit, la API evalúa el clima indicado (`calor`, `templado`, `frio`, `lluvia`) y selecciona las prendas más adecuadas del closet del usuario.

Ejemplo de respuesta:
```json
{
  "superior": { "id": "...", "nombre": "Camisa", "tipo": "superior" },
  "inferior": { "id": "...", "nombre": "Jeans", "tipo": "inferior" },
  "accesorio": { "id": "...", "nombre": "Bufanda", "tipo": "accesorio" }
}
```

---

## 📌 Pruebas

```bash
npm run test
```

Incluye pruebas unitarias básicas en los controladores.

---

## ✍️ Autor

**José Céspedes** – [@jocesman](https://github.com/jocesman)  
Proyecto creado con fines académicos y de desarrollo personal.

---

## 📃 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.
