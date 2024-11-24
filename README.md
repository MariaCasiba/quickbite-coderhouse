# Quickbite - App de Comida Rápida

*Quickbite* es una aplicación de ecommerce para la compra de comida y bebida rápida, creada como trabajo final del curso de ___Desarrollo de Aplicaciones__ de __Coderhouse__ - año 2024.

*Alumna*: María Inés Casiba
*Profesor*: Pablo Marcia
*Tutor*: René Palenque
*Tutor Adjunto*: Leonardo Monzón

### Descripción

La app permite a los usuarios navegar y comprar productos de comida rápida a través de un ecommerce. Está diseñada para ser simple y rápida, con una experiencia de usuario optimizada en dispositivos móviles.

### Funcionalidades
* __Login:__ (LoginScreen):
Permite iniciar sesión, si el usuario ya tiene una cuenta.
Opción para mantener la sesión iniciada utilizando *SQLite*.
Enlace para registro de nuevos usuarios (registro en la RegisterScreen).
Opción para navegar como invitado (sin necesidad de login).
* __Categorías__ (CategoriesScreen):
Muestra una lista de categorías de productos.
Al seleccionar una categoría, se navega a la pantalla de productos correspondientes.
* __Productos__ (ProductsScreen):
Muestra los productos disponibles en la categoría seleccionada.
Permite agregar productos al carrito.
* __Producto__ (ProductScreen):
Muestra los detalles de un producto seleccionado.
Botón para agregar el producto al carrito.
* __Carrito__ (CartScreen):
Muestra los productos agregados.
Botón para confirmar la compra.
* __Perfil de Usuario:__ (ProfileScreen):
Muestra los datos del usuario, incluidos su nombre, correo y foto de perfil.
Permite a los usuarios agregar o cambiar su foto de perfil.
Esta pantalla no está accesible para usuarios invitados.
* __Recibos__ (ReceiptScreen):
Muestra los recibos generados por el usuario para las compras realizadas.
Firebase se utiliza para la base de datos en tiempo real, donde se almacenan los productos, categorías, promociones, recibos, datos de usuarios y fotos de perfil.

### Tecnologías Utilizadas

Este proyecto está construido utilizando React Native y varias dependencias de Expo para la creación de aplicaciones móviles:

__React Native__: Framework principal para el desarrollo móvil.
__Firebase__: Base de datos en tiempo real para el almacenamiento de datos.
__SQLite__: Para almacenamiento local en el dispositivo.
__Expo__: Plataforma para desarrollar y ejecutar aplicaciones móviles.
__React Navigation__: Para la navegación entre pantallas.
__Redux Toolkit__: Para la gestión del estado de la aplicación.

### Librerías y dependencias: 

  "@react-navigation/bottom-tabs": "^6.6.1",
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/native-stack": "^6.11.0",
  "@reduxjs/toolkit": "^2.3.0",
  "expo": "~51.0.28",
  "expo-font": "~12.0.10",
  "expo-splash-screen": "~0.27.6",
  "expo-status-bar": "~1.12.1",
  "react": "18.2.0",
  "react-native": "0.74.5",
  "react-native-safe-area-context": "4.10.5",
  "react-native-screens": "3.31.1",
  "react-native-toast-message": "^2.2.1",
  "react-native-vector-icons": "^10.2.0",
  "react-redux": "^9.1.2",
  "expo-image-picker": "~15.0.7",
  "expo-location": "~17.0.1",
  "expo-sqlite": "~14.0.6",
  
}

### Scripts
Iniciar la aplicación: expo start
Abrir en Android: expo start --android
Abrir en iOS: expo start --ios
Abrir en Web: expo start --web
Instalación

Para comenzar a usar la app, sigue los pasos a continuación:

Clona el repositorio: git clone https://github.com/tu-usuario/quickbite.git

Navega al directorio del proyecto: cd quickbite

Instala las dependencias: npm install

Inicia la aplicación con Expo: npx expo start
