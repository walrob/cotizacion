# API y App para Cotización

API en NodeJS y App en ReactNative para la Cotización de monedas, la cual realiza una consulta a la API de Cambio.Today para obtener las cotizaciones actuales.

# Aclaraciones

- Para el desarrollo de la API, simplemente realicé GET, ya que no se necesitaba el CRUD completo y no utilicé BD porque no se requería guardar datos u obtener un historial.
- Para el desarrollo de la App, al utilizar fetch() tenía como idea usar 'localhost', pero debí colocar la IP debido a un error que surgía. Por simplicidad realicé todo el desarrollo en App.js y no cree otros componentes (como se debería hacer correctamente). En cuanto al temporizador, cumple con su objetivo, pero también se podría haber aprovechado el ciclo de vida de los componentes que brinda React.

# Configuración y Lanzamiento

1 - Instalación

Debe tener instalado NodeJs y React Native. En la siguiente documentación podrá obtener más detalles.
  https://facebook.github.io/react-native/docs/getting-started
Me guié por la pestaña React Native CLI Quickstart.

2 - Ejecutar

 ```
 npm install
 ```

3 - Abrir el emulador de Android Studio y en dos terminales ingresar

```
cd api-cotizacion
npm run dev

cd appCotizacion
react-native run-android
```

4 - Verificar

Puede ingresar desde un navegador y observar la respuesta JSON:

  http://localhost:3000/cotizacion/dolar

  http://localhost:3000/cotizacion/euro

  http://localhost:3000/cotizacion/real