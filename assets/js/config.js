/**
 * Configuración de Social Media Integration
 * 
 * Para usar esta integración:
 * 1. Configura tu username de Medium y LinkedIn
 * 2. Guarda este archivo y recarga tu sitio web
 */

// Configuración de Medium
window.MEDIUM_CONFIG = {
  // Username de Medium configurado para Angelo Castillo
  USERNAME: 'angelocastilloperz',
  
  // Configuración adicional (opcional)
  RSS_TO_JSON_API: 'https://api.rss2json.com/v1/api.json',
  
  // Configuración de comportamiento
  LOADING_DELAY: 1000, // Tiempo de espera antes de cargar posts (en milisegundos)
  WORDS_PER_MINUTE: 200, // Velocidad de lectura para calcular tiempo estimado
  
  // Configuración de contenido
  MAX_CONTENT_LENGTH: 150, // Máximo número de caracteres para el preview
  DEFAULT_CATEGORY: 'Medium', // Categoría por defecto si no hay tags
  
  // Textos personalizables
  TEXTS: {
    LOADING: 'Cargando publicaciones...',
    LOADING_SUBTITLE: 'Obteniendo tus últimas publicaciones de Medium y LinkedIn',
    ERROR_TITLE: 'No se pudieron cargar las publicaciones',
    ERROR_MESSAGE: 'Por favor, verifica la configuración o intenta más tarde.',
    ERROR_BUTTON: 'Ver perfil',
    NETWORK_ERROR_TITLE: 'Error al cargar publicaciones',
    NETWORK_ERROR_MESSAGE: 'Hubo un problema al conectar con las plataformas. Por favor, intenta recargar la página.',
    NETWORK_ERROR_BUTTON: 'Recargar página',
    READ_MORE: 'Leer más',
    READING_TIME: 'min lectura'
  }
};

// Configuración de LinkedIn
window.LINKEDIN_CONFIG = {
  // Perfil de LinkedIn configurado para Angelo Castillo
  PROFILE_URL: 'https://www.linkedin.com/in/castilloperz/',
  USERNAME: 'castilloperz',
  
  // Configuración de publicaciones simuladas (LinkedIn no tiene RSS público)
  SAMPLE_POSTS: [
    {
      title: "Especialista en Tecnología - Transformación Digital",
      content: "Compartiendo mi experiencia en análisis de datos y transformación digital en empresas. La implementación de soluciones basadas en IA está revolucionando cómo tomamos decisiones empresariales.",
      link: "https://www.linkedin.com/in/castilloperz/",
      category: "LinkedIn",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // hace 2 días
      image: "assets/img/Linkedin.png"
    },
    {
      title: "Power BI y Business Intelligence",
      content: "Desarrollando dashboards interactivos que permiten a los equipos tomar decisiones basadas en datos en tiempo real. La visualización efectiva es clave para el éxito empresarial.",
      link: "https://www.linkedin.com/in/castilloperz/",
      category: "LinkedIn",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // hace 5 días
      image: "assets/img/Linkedin.png"
    },
    {
      title: "Automatización de Procesos con Python",
      content: "Implementando soluciones de automatización que reducen el tiempo de procesamiento de datos hasta en un 80%. Python sigue siendo fundamental en mi toolkit diario.",
      link: "https://www.linkedin.com/in/castilloperz/",
      category: "LinkedIn", 
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // hace 1 semana
      image: "assets/img/Linkedin.png"
    }
  ],
  
  // Imagen por defecto para nuevas publicaciones de LinkedIn
  DEFAULT_IMAGE: "assets/img/Linkedin.png",
  
  // Configuración de contenido
  MAX_CONTENT_LENGTH: 150,
  DEFAULT_CATEGORY: 'LinkedIn'
};

// Validación de configuración
if (window.MEDIUM_CONFIG.USERNAME === 'tu-username') {
  console.warn('⚠️ MEDIUM INTEGRATION: Por favor, configura tu username de Medium en assets/js/config.js');
} else {
  console.log('✅ MEDIUM INTEGRATION: Configuración correcta para @' + window.MEDIUM_CONFIG.USERNAME);
}

if (window.LINKEDIN_CONFIG.USERNAME) {
  console.log('✅ LINKEDIN INTEGRATION: Configuración correcta para ' + window.LINKEDIN_CONFIG.PROFILE_URL);
} 