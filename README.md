# 📌 Full-Stack-JWT-User-Manager

Este proyecto es una aplicación web fullstack que permite a los usuarios registrarse, iniciar sesión y ver su perfil con autenticación basada en tokens JWT.

## 🚀 Tecnologías Utilizadas

### 📌 Frontend

- **Lenguaje:** JavaScript (ReactJS + Tailwind CSS)
- **Framework:** React 19
- **Bibliotecas y herramientas:**
  - React Router DOM 7.3.0 (Manejo de rutas)
  - Axios 1.8.3 (Consumo de API REST)
  - JWT Decode 4.0.0 (Decodificación de tokens JWT)
  - Tailwind CSS 4.0.14 (Estilos y diseño)
  - React Testing Library (Pruebas)

### 📌 Backend

- **Lenguaje:** Java 17
- **Framework:** Spring Boot 3
- **Base de datos:** Sql Server
- **Autenticación:** Spring Security con JWT
- **Herramientas adicionales:**
  - Lombok (Reducción de código boilerplate)
  - JPA/Hibernate (Manejo de base de datos)
  - Spring Data (Consultas a BD)
  - CORS Configuration (Control de acceso a API)
  - Global Exception Handling (Manejo de errores centralizado)

## 🌟 Funcionalidades

### ✅ Autenticación y Autorización

- Registro de usuarios con validación
- Inicio de sesión con generación de token JWT
- Segunda autenticación con validación de token
- Cierre de sesión seguro

### ✅ Gestión de Usuarios

- Recuperación de datos del usuario autenticado
- Manejo de sesiones con expiración de token
- Encriptación de contraseñas

### ✅ Interfaz de Usuario

- Diseño con Tailwind CSS y enfoque en usabilidad
- Formulario de registro e inicio de sesión interactivos
- Tabla para visualizar datos del perfil del usuario

## 📂 Arquitectura
### Backend (com.DEMO.Backen_Modules)
```sh
   ├── src/main/java
│ ├── config/ 
│ │ ├── WebSecurityConfig
│ ├── security/ 
│ │ ├── JwtAuthorizationFilter
│ │ ├── JwtUtils
│ ├── controller/ 
│ │ ├── AuthenticationController
│ │ ├── UsuarioController
│ ├── model/ 
│ │ ├── dtc/
│ │ │ ├── LoginDTO
│ │ │ ├── RegistroDTO
│ │ ├── Usuario
│ ├── repository/ 
│ │ ├── UsuarioRepository
│ ├── service/ 
│ │ ├── impl/
│ │ │ ├── UsuarioServiceImpl
│ │ ├── UsuarioService
│ └── BackenModulesApplication.java 
   ```
### Frontend (React)
```sh
   ├── src/
│ ├── components/
│ │ ├── Auth/ 
│ │ │ ├── LoginForm.jsx
│ │ │ ├── RegisterForm.jsx
│ │ ├── Home/ 
│ │ │ ├── Home.jsx
│ │ ├── Layout/ 
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ ├── Profile/ 
│ │ │ ├── Profile.jsx
│ ├── context/
│ │ ├── AuthContext.js
│ ├── utils/
│ │ ├── ProtectedRoute.jsx
├── App.jsx 
├── index.js 
   ```

## 🔧 Configuración y Ejecución

### ⚠️ Advertencia Importante
**Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno necesarias**:
- **Backend**: 
  - Configura propiedades sensibles en `application.properties` (clave JWT, URL de BD, credenciales).
  - Ejemplo: `jwt.secret=tu_clave_secreta_aqui`.
  
**Si omites este paso**, la aplicación podría:
- Fallar en la autenticación JWT.
- No conectarse a la base de datos.
- Mostrar errores inesperados en producción.

### 📌 Backend (Spring Boot)

1. Clonar el repositorio
2. Configurar Sql Server y modificar `application.properties`
3. Ejecutar con:
   ```sh
   mvn spring-boot:run
   ```

### 📌 Frontend (React + Vite)

1. Clonar el repositorio
2. Instalar dependencias:
   ```sh
   yarn install
   ```
3. Ejecutar la aplicación:
   ```sh
   yarn start
   ```

## 📌 Mejoras Futuras

- Implementación de roles y permisos avanzados
- Soporte para autenticación con redes sociales
- Interfaz de usuario más personalizable con temas

---

