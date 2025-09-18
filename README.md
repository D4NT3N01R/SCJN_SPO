# SCJN-SPO

La página en desarrollo del DCL, con el fin de facilitar la captura y consulta de datos de las publicaciones de los estados a los que le pertenece cada compilador. La aplicación tiene las bases de proponer componentes de datos interactivos y una estructura modular para la facilidad del mantenimiento y futuras expansiones.

---

## Arquitectura del proyecto y flujo de trabajo

La arquitectura de la aplicación está diseñada en base a la limpieza y separación de problemáticas que pueda haber entre componentes, esto, con la finalidad de que sea reusable y la lógica sea encapsulada. Desafortunadamente, por tareas externas a darle prioridad, el workflow solo está limitado a tener una sola autentificación y tener acceso a todo lo desarrollado.

La entrada principal será `src/main.jsx`, que renderiza el núcleo de la App, que mediante una activación de ruteo del lado del cliente mediante **BrowserRouter**. `App.jsx` es responsable de configurar el contexto global de toda la aplicación. Esto incluye al **QueryClientProvider** del TanStack Query, para manejar la obtención de datos, combinado con **AuthProvider** para soportar la autentificación del usuario a través de todos los componentes.

`src/routes.jsx` maneja centralmente las rutas. Este archivo define todas las direcciones que pueden ser navegadas, incluyendo la ruta pública de `/login` y varias rutas protegidas que constituyen las bases principales de la página. El flujo sería que los usuarios autentificados sean dirigidos a la **PaginaBase**, que es la que se encargaría de "envolver" el layout consistente que tiene la página, creando una experiencia de usuario uniforme.

---

## Componentes y Características Principales

### Autentificación y Seguridad
La autentificación es controlada mediante un contexto personalizado dado por `src/utils/auth.jsx`. Este hace que el estado de autentificación del usuario esté definido mediante la disponibilidad de la aplicación. Esto, junto al componente **Login** (`src/components/login/index.jsx`) y el componente **ProtectedRoute** (`src/components/protectedRoute/index.jsx`), envuelven las rutas principales y redireccionan a cualquier usuario que no esté autentificado para que regrese a la página de login.

### Visualización de la información e interacción
La intención con el componente **MexicoMap** (`src/components/map/MexicoMap.jsx`) es ofrecer una visualización geográfica de los datos, permitiendo a los usuarios interactuar con un mapa de México para ver información específica de cada estado. Para datos tabulares detallados, la aplicación aprovecha la potente biblioteca **AG Grid** a través de un componente **Table** personalizado (`src/components/table/index.jsx`), que está diseñado para manejar grandes conjuntos de datos con funcionalidades como ordenamiento, filtrado y paginación.

### Interfaz del Dashboard
El dashboard principal, renderizado a través de la página **Home** (`src/pages/Home/index.jsx`), es una colección de componentes especializados diseñados para dar una visión general de métricas y acciones clave. Esto incluye **StatsCards** para mostrar estadísticas importantes, una **RecentJobsList** para seguir la actividad reciente y **QuickActions** para un acceso fácil a tareas comunes.

### Layout y Navegación
Una experiencia de usuario consistente se mantiene gracias a un conjunto de componentes de layout. El **Header** (`src/components/Header/index.jsx`) está presente en cada página e incluye el título de la aplicación y un **ServerStatusIndicator**, que proporciona información en tiempo real sobre el estado del backend. La navegación se maneja con el **SideBar** (`src/components/SideBar/index.jsx`), que contiene enlaces a todas las secciones principales de la aplicación.

---

## Servicios y Hooks Personalizados

Para mantener los componentes de la interfaz limpios y centrados en la presentación, la lógica de conexión y la obtención de datos se abstraen en servicios y hooks personalizados.

El **healthService** (`src/services/healthService.jsx`) (Servicio Igualado al del HTR) encapsula la lógica para hacer llamadas a la API del backend y comprobar su estado. Este servicio es consumido por el hook personalizado **useServerStatus** (`src/hooks/useServerStatus.jsx`), que obtiene periódicamente el estado del servidor y proporciona una interfaz simple y reutilizable para cualquier componente que necesite conocer la salud del servidor.

---

## Cómo Empezar

Para ejecutar este proyecto localmente, primero clona el repositorio y navega al directorio del proyecto. Luego, instala las dependencias necesarias usando npm.

```bash
npm install
````
Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo de Vite.
````
npm run dev
````
Esto lanzará la aplicación en tu navegador por defecto, típicamente en http://localhost:5173. El servidor de desarrollo soporta Hot Module Replacement (HMR), por lo que cualquier cambio que hagas en el código fuente se reflejará en el navegador instantáneamente sin necesidad de recargar la página por completo.




