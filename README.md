# Documentación del Proyecto React - Farmacia App

Este documento describe la estructura inicial del proyecto **Farmacia App**, una aplicación React diseñada para consumir la API de una farmacia (`https://api-farmacia-production.up.railway.app/api`). La aplicación está dividida en dos interfaces principales: una para **administradores** (con acceso completo a la gestión de usuarios, productos, ventas, etc.) y otra para **clientes** (enfocada en la compra de productos, visualización de recetas y gestión de ventas). Esta documentación está dirigida al equipo de desarrollo para que comprendan la organización del proyecto y cómo empezar a trabajar en él.

## Propósito del Proyecto
La **Farmacia App** permite:
- **Administradores**: Gestionar usuarios, productos, proveedores, compras, ventas, recetas, alertas y clientes a través de una interfaz completa.
- **Clientes**: Explorar productos, realizar compras, ver historial de ventas y gestionar recetas médicas desde una interfaz amigable.

La API proporciona endpoints para todas estas funcionalidades, y el proyecto utiliza **Axios** para realizar solicitudes HTTP, **React Router** para la navegación, y **Tailwind CSS** para los estilos.

## Estructura del Proyecto
La estructura del proyecto está diseñada para ser modular, escalable y fácil de mantener. A continuación, se detalla la organización de las carpetas y archivos clave:

```
farmacia-app/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── admin/                          # Interfaz para administradores
│   │   ├── components/                 # Componentes reutilizables (Alertas, Clientes, etc.)
│   │   ├── pages/                     # Páginas principales (Dashboard, Usuarios, etc.)
│   │   ├── services/                  # Servicios Axios para la API
│   │   ├── styles/                    # Estilos específicos (CSS/Tailwind)
│   │   ├── routes/                    # Rutas de la interfaz admin
│   │   │   └── AdminRoutes.jsx
│   │   └── App.jsx
│   ├── client/                        # Interfaz para clientes
│   │   ├── components/                # Componentes (Productos, Carrito, etc.)
│   │   ├── pages/                    # Páginas (Home, Productos, etc.)
│   │   ├── services/                 # Servicios Axios para la API
│   │   ├── styles/                   # Estilos específicos (CSS/Tailwind)
│   │   ├── routes/                   # Rutas de la interfaz cliente
│   │   │   └── ClientRoutes.jsx
│   │   └── App.jsx
│   ├── shared/                       # Recursos compartidos
│   │   ├── api/                     # Configuración de Axios
│   │   ├── components/              # Componentes comunes (Loading, Button, etc.)
│   │   ├── hooks/                   # Custom hooks
│   │   ├── utils/                   # Utilidades (formatDate, validators, etc.)
│   │   └── context/                 # Contextos (Auth, Cart, etc.)
│   ├── assets/                      # Imágenes, íconos, etc.
│   ├── main.jsx                     # Punto de entrada de React
│   └── App.jsx                      # Componente raíz para enrutamiento
├── .env                             # Variables de entorno
├── .gitignore
├── package.json
├── vite.config.js                   # Configuración de Vite
├── tailwind.config.js               # Configuración de Tailwind CSS
└── README.md
```

### Descripción de Carpetas
- **public/**: Contiene archivos estáticos como `index.html`, que sirve como base para la aplicación.
- **src/admin/**: Incluye todo lo necesario para la interfaz de administrador:
  - `components/`: Componentes reutilizables organizados por entidad (por ejemplo, `Usuarios/UsuarioList.jsx` para mostrar una lista de usuarios).
  - `pages/`: Páginas que combinan componentes (por ejemplo, `UsuariosPage.jsx` para la gestión de usuarios).
  - `services/`: Funciones Axios para consumir la API (por ejemplo, `usuarioService.js` para endpoints de `/api/Usuarios`).
  - `styles/`: Estilos específicos para admin, usando Tailwind CSS.
  - `routes/AdminRoutes.jsx`: Define las rutas internas (por ejemplo, `/admin/usuarios`, `/admin/productos`).
  - `App.jsx`: Punto de entrada para la interfaz de admin.
- **src/client/**: Similar a `admin/`, pero para la interfaz de cliente, con componentes y páginas enfocados en productos, ventas y recetas.
- **src/shared/**: Recursos compartidos entre ambas interfaces:
  - `api/axiosInstance.js`: Configuración de Axios con la URL base de la API.
  - `components/`: Componentes genéricos (como un spinner de carga o botones).
  - `hooks/`: Custom hooks para lógica reutilizable.
  - `utils/`: Funciones de utilidad (formateo de fechas, validaciones, etc.).
  - `context/`: Contextos para estado global (por ejemplo, autenticación o carrito).
- **src/assets/**: Imágenes, íconos y otros recursos estáticos.
- **src/main.jsx**: Monta la aplicación React en el DOM.
- **src/App.jsx**: Componente raíz que maneja el enrutamiento entre admin y cliente.
- **.env**: Define variables de entorno, como `VITE_API_URL=https://api-farmacia-production.up.railway.app/api`.

## Archivos Principales Limpios
Los archivos `App.jsx` y `main.jsx` han sido limpiados para eliminar el código por defecto de Vite y configurados para soportar el enrutamiento entre las interfaces de administrador y cliente.

### src/App.jsx
Este archivo actúa como el componente raíz de la aplicación y define las rutas principales:
- **Propósito**: Enruta las solicitudes a las interfaces de administrador (`/admin`) o cliente (`/client`), o muestra una página de error 404 para rutas no válidas.
- **Contenido**:
  ```jsx
  import { Routes, Route } from 'react-router-dom';
  import AdminRoutes from './admin/routes/AdminRoutes';
  import ClientRoutes from './client/routes/ClientRoutes';
  import NotFoundPage from './admin/pages/NotFoundPage';

  function App() {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/client/*" element={<ClientRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  export default App;
  ```
- **Explicación**:
  - Usa `react-router-dom` para manejar la navegación.
  - `/admin/*` delega a `AdminRoutes.jsx`, que contiene las rutas específicas para administradores.
  - `/client/*` delega a `ClientRoutes.jsx`, que maneja las rutas para clientes.
  - `/*` captura rutas no definidas y renderiza una página de "No encontrado".

### src/main.jsx
Este archivo es el punto de entrada de la aplicación React:
- **Propósito**: Monta la aplicación en el DOM y configura el enrutamiento global.
- **Contenido**:
  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter } from 'react-router-dom';
  import App from './App.jsx';
  import './index.css';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  ```
- **Explicación**:
  - Inicializa React y monta el componente `App` en el elemento con `id="root"`.
  - Usa `BrowserRouter` para habilitar la navegación con `react-router-dom`.
  - Incluye `index.css` para estilos globales (configurado con Tailwind CSS).
  - `React.StrictMode` ayuda a detectar problemas durante el desarrollo.

## Cómo Usar la Estructura
1. **Instalación**:
   - Asegúrate de tener Node.js instalado.
   - Clona el repositorio y ejecuta `npm install` para instalar dependencias (`react`, `react-router-dom`, `axios`, `tailwindcss`, etc.).
   - Configura el archivo `.env` con la URL de la API:
     ```
     VITE_API_URL=https://api-farmacia-production.up.railway.app/api
     ```

2. **Ejecutar el proyecto**:
   - Usa `npm run dev` para iniciar el servidor de desarrollo (normalmente en `http://localhost:5173`).
   - Navega a `/admin` para la interfaz de administrador o `/client` para la interfaz de cliente.

3. **Desarrollo de componentes**:
   - **Admin**: Implementa los componentes en `src/admin/components/` (por ejemplo, `Usuarios/UsuarioList.jsx`) y las páginas en `src/admin/pages/`. Usa los servicios en `src/admin/services/` para consumir la API con Axios.
   - **Cliente**: Implementa los componentes en `src/client/components/` (por ejemplo, `Productos/ProductoList.jsx`) y las páginas en `src/client/pages/`. Usa los servicios en `src/client/services/`.
   - Reutiliza recursos compartidos desde `src/shared/` (como `axiosInstance.js` o `Loading.jsx`).

4. **Rutas**:
   - Configura las rutas específicas en `src/admin/routes/AdminRoutes.jsx` y `src/client/routes/ClientRoutes.jsx`. Por ejemplo:
     - Admin: `/admin/usuarios`, `/admin/productos`.
     - Cliente: `/client/productos`, `/client/carrito`.
   - Asegúrate de que cada ruta renderice la página correspondiente.

5. **Estilos**:
   - Usa **Tailwind CSS** para estilizar los componentes. Los estilos globales están en `src/index.css`.
   - Agrega estilos específicos en `src/admin/styles/` o `src/client/styles/` si es necesario.

6. **Consumo de la API**:
   - Los servicios en `src/admin/services/` y `src/client/services/` usan Axios para interactuar con la API. Por ejemplo, `usuarioService.js` podría tener:
     ```javascript
     import api from '../../shared/api/axiosInstance';

     export const getUsuarios = async () => {
       const response = await api.get('/Usuarios');
       return response.data;
     };
     ```
   - Revisa la documentación de la API para los endpoints disponibles y sus parámetros.

## Próximos Pasos para el Equipo
1. **División de tareas**:
   - Asigna desarrolladores para la interfaz de **admin** y otros para la de **cliente**.
   - Por ejemplo:
     - Equipo Admin: Implementar `UsuariosPage.jsx`, `ProductosPage.jsx`, etc.
     - Equipo Cliente: Implementar `ProductosPage.jsx`, `CartPage.jsx`, etc.

2. **Implementar servicios**:
   - Completa los archivos en `services/` con las funciones para consumir todos los endpoints de la API (GET, POST, PUT, DELETE).
   - Usa la configuración de Axios en `shared/api/axiosInstance.js` para mantener la URL base y headers consistentes.

3. **Diseñar la UI**:
   - Crea componentes reutilizables (listas, formularios, ítems) para cada entidad.
   - Usa Tailwind CSS para un diseño responsivo y consistente.

4. **Autenticación (opcional)**:
   - Si se requiere restringir el acceso a `/admin`, implementa un sistema de autenticación usando `shared/context/AuthContext.js` y protege las rutas en `AdminRoutes.jsx`.

5. **Pruebas**:
   - Prueba las rutas navegando a `/admin` y `/client`.
   - Verifica las solicitudes a la API usando las herramientas de desarrollo del navegador.

## Notas Adicionales
- **Escalabilidad**: La estructura permite agregar nuevas entidades o páginas sin modificar los archivos raíz.
- **Colaboración**: Usa un sistema de control de versiones (como Git) para coordinar los cambios. El `.gitignore` incluye `node_modules/` y `.env` para evitar subir datos sensibles.
- **Documentación de la API**: Consulta la documentación previa de la API para detalles sobre los endpoints, parámetros y ejemplos de solicitudes con Axios.
- **Soporte**: Si encuentras problemas o necesitas orientación para implementar un componente o servicio, consulta con el líder del proyecto o revisa la documentación de la API.

Esta estructura y los archivos limpios proporcionan una base sólida para desarrollar la **Farmacia App**. ¡Manos a la obra, equipo!