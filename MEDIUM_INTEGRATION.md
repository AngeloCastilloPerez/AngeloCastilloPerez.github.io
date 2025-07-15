# Integración con Medium

## Descripción

Esta integración permite mostrar automáticamente tus publicaciones de Medium en la sección "Posts & Artículos" de tu sitio web. La integración utiliza el RSS feed de Medium para obtener tus últimas 10 publicaciones y las muestra en un carrusel interactivo.

## Configuración

### Paso 1: Obtener tu username de Medium

1. Ve a tu perfil de Medium
2. Copia tu username desde la URL de tu perfil:
   - Si tu URL es `https://medium.com/@angelocastillo`, tu username es `angelocastillo`
   - Si tu URL es `https://angelocastillo.medium.com`, tu username es `angelocastillo`

### Paso 2: Configurar la integración

1. Abre el archivo `assets/js/config.js`
2. Reemplaza `'tu-username'` con tu username real de Medium:

```javascript
// Antes
USERNAME: 'tu-username',

// Después (ejemplo)
USERNAME: 'angelocastillo',
```

3. Guarda el archivo
4. Recarga tu sitio web

## Características

### ✅ Funcionalidades incluidas:

- **Automático**: Obtiene automáticamente tus últimas 10 publicaciones de Medium
- **Responsive**: Se adapta a todos los tamaños de pantalla
- **Carrusel interactivo**: Navegación con botones y swipe en móviles
- **Imágenes thumbnail**: Extrae automáticamente las imágenes de tus posts
- **Metadatos**: Muestra fecha, categoría y tiempo de lectura estimado
- **Estados de carga**: Spinner de carga mientras obtiene los datos
- **Manejo de errores**: Mensajes informativos si algo sale mal
- **Enlaces externos**: Los posts se abren en Medium en una nueva pestaña

### 🎨 Personalización:

Puedes personalizar varios aspectos editando `assets/js/config.js`:

```javascript
// Configuración de comportamiento
LOADING_DELAY: 1000, // Tiempo de espera antes de cargar posts
WORDS_PER_MINUTE: 200, // Velocidad de lectura para calcular tiempo
MAX_CONTENT_LENGTH: 150, // Máximo caracteres para preview
DEFAULT_CATEGORY: 'Medium', // Categoría por defecto

// Textos personalizables
TEXTS: {
  LOADING: 'Cargando publicaciones de Medium...',
  LOADING_SUBTITLE: 'Obteniendo tus últimas publicaciones',
  ERROR_TITLE: 'No se pudieron cargar las publicaciones',
  // ... más textos
}
```

## Cómo funciona

1. **RSS Feed**: Medium proporciona un RSS feed público en `https://medium.com/feed/@username`
2. **Conversión a JSON**: Utilizamos el servicio `rss2json.com` para convertir el RSS a JSON
3. **Extracción de datos**: Parseamos el JSON para obtener título, contenido, fecha, categorías, etc.
4. **Procesamiento de imágenes**: Extraemos las imágenes thumbnail del HTML del post
5. **Renderizado**: Mostramos los posts en el carrusel existente

## Limitaciones

- **Máximo 10 posts**: El RSS feed de Medium solo devuelve las últimas 10 publicaciones
- **Dependencia externa**: Requiere conexión a internet y el servicio rss2json.com
- **Imágenes**: Las imágenes se cargan desde Medium, pueden tomar tiempo en cargar
- **Actualizaciones**: Los posts se actualizan cuando se recarga la página

## Troubleshooting

### Error: "No se pudieron cargar las publicaciones"

**Posibles causas:**
1. Username de Medium incorrecto
2. Perfil de Medium privado o no existe
3. Problema de conexión a internet
4. Servicio rss2json.com no disponible

**Soluciones:**
1. Verifica tu username en `assets/js/config.js`
2. Asegúrate de que tu perfil de Medium sea público
3. Verifica tu conexión a internet
4. Intenta recargar la página

### Error: "USERNAME no configurado"

**Causa:** No has configurado tu username de Medium

**Solución:** Edita `assets/js/config.js` y reemplaza `'tu-username'` con tu username real

### Las imágenes no se cargan

**Causa:** Las imágenes se cargan desde Medium y pueden tardar

**Solución:** Espera unos segundos o recarga la página. Si persiste, verifica tu conexión a internet

## Archivos involucrados

- `assets/js/config.js` - Configuración de la integración
- `assets/js/main.js` - Lógica principal de la integración
- `assets/css/style.css` - Estilos para states de carga y error
- `index.html` - Referencia al archivo de configuración

## Soporte

Si tienes problemas con la integración:

1. Verifica que tu username de Medium sea correcto
2. Asegúrate de que tu perfil sea público
3. Comprueba la consola del navegador para errores
4. Verifica que todos los archivos estén en su lugar

## Futuras mejoras

- Caché local para mejorar velocidad de carga
- Soporte para más de 10 publicaciones
- Integración con otras plataformas de blog
- Modo offline con contenido estático de respaldo 