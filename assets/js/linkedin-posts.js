/**
 * LinkedIn Posts Manager
 * 
 * Este archivo maneja las publicaciones simuladas de LinkedIn.
 * Puedes actualizar fácilmente las publicaciones editando el array POSTS.
 */

window.LINKEDIN_POSTS_MANAGER = {
  // Publicaciones destacadas de LinkedIn - Actualiza aquí tus posts reales
  POSTS: [
          {
        title: "Especialista en Tecnología - Transformación Digital",
        content: "Compartiendo mi experiencia en análisis de datos y transformación digital en empresas. La implementación de soluciones basadas en IA está revolucionando cómo tomamos decisiones empresariales. Cada proyecto me confirma que el futuro del trabajo está en la convergencia entre datos, inteligencia artificial y experiencia humana.",
        link: "https://www.linkedin.com/in/castilloperz/",
        category: "LinkedIn",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // hace 1 día
        image: "assets/img/Linkedin.png",
        tags: ["Tecnología", "IA", "Transformación Digital"]
      },
      {
        title: "Power BI y Business Intelligence en Acción",
        content: "Desarrollando dashboards interactivos que permiten a los equipos tomar decisiones basadas en datos en tiempo real. La visualización efectiva es clave para el éxito empresarial. Cuando los datos se presentan de manera clara y actionable, las organizaciones pueden responder rápidamente a las tendencias del mercado.",
        link: "https://www.linkedin.com/in/castilloperz/",
        category: "LinkedIn",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // hace 3 días
        image: "assets/img/Linkedin.png",
        tags: ["Power BI", "Business Intelligence", "Dashboards"]
      },
      {
        title: "Automatización de Procesos con Python",
        content: "Implementando soluciones de automatización que reducen el tiempo de procesamiento de datos hasta en un 80%. Python sigue siendo fundamental en mi toolkit diario. La capacidad de crear scripts que manejen tareas repetitivas libera tiempo valioso para el análisis estratégico y la toma de decisiones.",
        link: "https://www.linkedin.com/in/castilloperz/",
        category: "LinkedIn", 
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // hace 6 días
        image: "assets/img/Linkedin.png",
        tags: ["Python", "Automatización", "Eficiencia"]
      },
      {
        title: "SAP Business Warehouse y Conectividad",
        content: "Trabajando en la integración entre Power BI y SAP BW para crear un ecosistema de datos unificado. La conectividad entre sistemas legacy y herramientas modernas de visualización abre nuevas posibilidades para el análisis empresarial. Cada conexión exitosa representa un paso hacia la democratización de los datos.",
        link: "https://www.linkedin.com/in/castilloperz/",
        category: "LinkedIn",
        date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // hace 9 días
        image: "assets/img/Linkedin.png",
        tags: ["SAP", "Conectividad", "Integración"]
      }
  ],

  /**
   * Obtener publicaciones de LinkedIn ordenadas por fecha (más recientes primero)
   */
  getPosts: function() {
    return this.POSTS
      .map(post => ({
        ...post,
        image: post.image || "assets/img/Linkedin.png" // Asegurar imagen por defecto
      }))
      .sort((a, b) => {
        // Ordenar por fecha descendente (más recientes primero)
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  },

  /**
   * Agregar nueva publicación
   */
  addPost: function(post) {
    post.category = "LinkedIn";
    post.date = post.date || new Date().toISOString();
    post.image = post.image || "assets/img/Linkedin.png"; // Usar imagen por defecto
    this.POSTS.unshift(post);
    
    // Reordenar por fecha después de agregar
    this.POSTS.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    
    console.log('✅ Nueva publicación de LinkedIn agregada:', post.title);
  },

  /**
   * Actualizar configuración de LinkedIn
   */
  updateConfig: function() {
    if (window.LINKEDIN_CONFIG) {
      window.LINKEDIN_CONFIG.SAMPLE_POSTS = this.getPosts();
    }
  }
};

// Función para verificar que la imagen de LinkedIn existe
function verifyLinkedInImage() {
  const img = new Image();
  img.onload = function() {
    console.log('✅ LINKEDIN IMAGE: Imagen Linkedin.png cargada correctamente');
  };
  img.onerror = function() {
    console.warn('⚠️ LINKEDIN IMAGE: No se pudo cargar assets/img/Linkedin.png');
  };
  img.src = 'assets/img/Linkedin.png';
}

// Actualizar configuración al cargar
window.LINKEDIN_POSTS_MANAGER.updateConfig();

console.log('✅ LINKEDIN POSTS: Manager cargado con', window.LINKEDIN_POSTS_MANAGER.POSTS.length, 'publicaciones');
verifyLinkedInImage(); 