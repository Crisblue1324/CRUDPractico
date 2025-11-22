# 📌 Proyecto CRUD con React + Vite + Autenticación JWT + OAuth Google

Este proyecto es un **CRUD (Crear, Leer, Actualizar, Eliminar)** de usuarios desarrollado con **React** y **Vite**, con
sistema de autenticación completo usando **JWT** y **Google OAuth**.

---

## 🚀 Tecnologías Utilizadas

### Frontend

- React 18
- Vite
- Axios

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- GraphQL

### Autenticación

- JSON Web Tokens (JWT)
- bcryptjs (encriptación de contraseñas)
- Passport.js
- passport-google-oauth20

---

## ⚡ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Crisblue1324/COMPONENTEPR-CTICO.git
cd nombre-del-proyecto
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

#### Dependencias del Backend:

```bash
npm install express mongoose cors dotenv
npm install graphql express-graphql
npm install jsonwebtoken bcryptjs
npm install passport passport-google-oauth20 express-session
```

#### Crear archivo `.env` en la carpeta backend:

```env
PORT=5000
MONGO_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/tu_base_de_datos
JWT_SECRET=tu_clave_secreta_aqui
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
FRONTEND_URL=http://localhost:5173
```

#### Iniciar Backend:

```bash
node index.js
```

### 3. Configurar Frontend

```bash
cd frontend
npm install
```

#### Dependencias del Frontend:

```bash
npm install axios
```

#### Iniciar Frontend:

```bash
npm run dev
```

---

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/
│   ├── config/
│   │   └── passport.js          # Configuración Google OAuth
│   ├── graphql/
│   │   └── schema.js            # Esquema GraphQL
│   ├── middleware/
│   │   └── auth.js              # Middleware verificación JWT
│   ├── models/
│   │   ├── user.js              # Modelo Usuario (CRUD)
│   │   └── auth.js              # Modelo Auth (Login/Register)
│   ├── routes/
│   │   ├── userRoutes.js        # Rutas CRUD protegidas
│   │   └── authRoutes.js        # Rutas autenticación
│   ├── .env                     # Variables de entorno
│   ├── index.js                 # Servidor principal
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── authService.js   # Servicios de autenticación
│   │   │   └── userService.js   # Servicios CRUD
│   │   ├── components/
│   │   │   ├── AuthPage.jsx     # Página Login/Register
│   │   │   ├── UserForm.jsx     # Formulario usuarios
│   │   │   └── UserList.jsx     # Lista de usuarios
│   │   ├── pages/
│   │   │   └── Home.jsx         # Página principal CRUD
│   │   ├── styles/
│   │   │   ├── Auth.css         # Estilos autenticación
│   │   │   └── Home.css         # Estilos página principal
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
```

---

## 🔐 Sistema de Autenticación

### JWT (JSON Web Tokens)

#### Instalación:

```bash
npm install jsonwebtoken bcryptjs
```

#### Funcionalidades:

- **Registro de usuarios** con encriptación de contraseña usando bcryptjs
- **Login** que genera un token JWT válido por 24 horas
- **Middleware de protección** que verifica el token en cada petición
- **Rutas protegidas** que requieren autenticación
---

### Google OAuth 2.0

#### Instalación:

```bash
npm install passport passport-google-oauth20 express-session
```

#### Configuración en Google Cloud Console:

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear nuevo proyecto
3. Ir a **APIs & Services → Credentials**
4. Crear **OAuth Client ID** (Web Application)
5. Configurar:
    - **Authorized JavaScript origins:** `http://localhost:5173`
    - **Authorized redirect URIs:** `http://localhost:5000/api/auth/google/callback`
6. Copiar **Client ID** y **Client Secret** al archivo `.env`

#### Endpoints:

| Método | Ruta                        | Descripción              |
|--------|-----------------------------|--------------------------|
| GET    | `/api/auth/google`          | Iniciar login con Google |
| GET    | `/api/auth/google/callback` | Callback de Google       |

#### Flujo de autenticación:

1. Usuario hace clic en "Continuar con Google"
2. Se redirige a Google para autenticación
3. Google redirige al callback con los datos del usuario
4. Se genera token JWT y redirige al frontend

---

## 🛡️ Middleware de Autenticación

El middleware `verifyToken` protege las rutas del CRUD:

```javascript
// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Token no proporcionado"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: "Token inválido o expirado"});
    }
};

module.exports = {verifyToken};
```

---

## 🔑 Generar JWT_SECRET

Puedes generar una clave secreta ejecutando en la terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🌐 Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
# Servidor
PORT=5000

# Base de datos
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=tu_clave_secreta_generada

# Google OAuth
GOOGLE_CLIENT_ID=tu_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-tu_client_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```