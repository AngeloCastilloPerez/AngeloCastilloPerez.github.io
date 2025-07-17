/**
* Template Name: MyResume
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation (Legacy - mantenido para compatibilidad)
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Skills Grid Animation
   */
  window.addEventListener('load', () => {
    const skillItems = select('.skill-item', true);
    if (skillItems && skillItems.length > 0) {
      // Agregar animación de entrada escalonada
      skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });

  /**
   * Animated Background Particles for Skills Section
   */
  function createFloatingParticles() {
    const skillsSection = select('#skills');
    if (!skillsSection) return;

    // Create container for dynamic particles
    const particleContainer = document.createElement('div');
    particleContainer.className = 'dynamic-particles';
    particleContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    
    skillsSection.appendChild(particleContainer);

    // Create multiple particles (fewer on mobile)
    const particleCount = window.innerWidth <= 768 ? 6 : 12;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Random properties
      const size = Math.random() * 6 + 3;
      const left = Math.random() * 100;
      const baseDuration = window.innerWidth <= 768 ? 30 : 20;
      const animationDuration = Math.random() * 15 + baseDuration;
      const delay = Math.random() * 10;
      const opacity = Math.random() * 0.4 + 0.1;
      
      // Random futuristic colors
      const colors = [
        'rgba(0, 255, 255, 0.4)',
        'rgba(138, 43, 226, 0.4)',
        'rgba(0, 255, 127, 0.4)',
        'rgba(255, 20, 147, 0.4)',
        'rgba(255, 215, 0, 0.4)',
        'rgba(0, 191, 255, 0.4)'
      ];
      
      const glowColors = [
        'rgba(0, 255, 255, 0.6)',
        'rgba(138, 43, 226, 0.6)',
        'rgba(0, 255, 127, 0.6)',
        'rgba(255, 20, 147, 0.6)',
        'rgba(255, 215, 0, 0.6)',
        'rgba(0, 191, 255, 0.6)'
      ];
      
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[colorIndex]};
        border-radius: 50%;
        left: ${left}%;
        top: 100%;
        animation: floatUp ${animationDuration}s linear infinite;
        animation-delay: ${delay}s;
        opacity: ${opacity};
        box-shadow: 0 0 ${size * 2}px ${glowColors[colorIndex]};
      `;
      
      particleContainer.appendChild(particle);
    }
  }

  // Add CSS for floating particles animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0px) translateX(0px);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize particles when DOM is loaded
  window.addEventListener('load', createFloatingParticles);

  // Global variables para el sistema de posts
  let allPosts = [];
  let currentFilter = 'all';

  // Función para renderizar el feed de posts desde Medium
  async function loadMediumPosts() {
    console.log('📝 Iniciando carga de posts de Medium...');
    const mediumFeed = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@angelocastilloperz';
    
    try {
      console.log('🌐 Consultando Medium API...');
      const response = await fetch(mediumFeed);
      const data = await response.json();
      
      console.log('📊 Respuesta de Medium:', {
        status: data.status,
        itemsCount: data.items?.length || 0
      });
      
      if (data.status === 'ok' && data.items) {
        const mediumPosts = data.items.slice(0, 10).map(post => ({
          title: post.title,
          description: post.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
          link: post.link,
          pubDate: new Date(post.pubDate),
          image: extractImageFromContent(post.content) || 'assets/img/portfolio/portfolio-1.gif',
          platform: 'medium',
          readTime: calculateReadTime(post.content)
        }));
        
        allPosts = [...allPosts, ...mediumPosts];
        console.log('✅ Medium posts cargados:', mediumPosts.length);
      } else {
        console.warn('⚠️ No se pudieron cargar posts de Medium:', data.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('❌ Error loading Medium posts:', error);
    }
  }

  // Función para cargar posts de LinkedIn
  function loadLinkedInPosts() {
    console.log('📱 Iniciando carga de posts de LinkedIn...');
    
    try {
      console.log('🔍 Verificando LINKEDIN_POSTS_MANAGER:', {
        exists: !!window.LINKEDIN_POSTS_MANAGER,
        hasPosts: !!(window.LINKEDIN_POSTS_MANAGER && window.LINKEDIN_POSTS_MANAGER.getPosts)
      });
      if (window.LINKEDIN_POSTS_MANAGER && window.LINKEDIN_POSTS_MANAGER.getPosts) {
        const rawLinkedInPosts = window.LINKEDIN_POSTS_MANAGER.getPosts();
        console.log('📊 Posts raw de LinkedIn:', rawLinkedInPosts.length);
        
        // Convertir formato de LinkedIn al formato estándar
        const linkedInPosts = rawLinkedInPosts.map(post => {
          // Calcular tiempo de lectura directamente aquí
          const text = post.content.replace(/<[^>]*>/g, '');
          const wordsPerMinute = 200;
          const words = text.split(/\s+/).length;
          const readTimeMinutes = Math.ceil(words / wordsPerMinute);
          
          return {
            title: post.title,
            description: post.content.substring(0, 120) + '...',
            link: post.link,
            pubDate: new Date(post.date),
            image: post.image || 'assets/img/Linkedin.png',
            platform: 'linkedin',
            readTime: `${readTimeMinutes} min lectura`
          };
        });
        
        allPosts = [...allPosts, ...linkedInPosts];
        console.log('✅ LinkedIn posts cargados:', linkedInPosts.length);
      } else {
        console.warn('⚠️ LINKEDIN_POSTS_MANAGER no está disponible, usando fallback');
        // Fallback con posts hardcodeados
        const fallbackPosts = [
          {
            title: "Especialista en Tecnología - Transformación Digital",
            description: "Compartiendo mi experiencia en análisis de datos y transformación digital en empresas...",
            link: "https://www.linkedin.com/in/castilloperz/",
            pubDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
            image: "assets/img/Linkedin.png",
            platform: "linkedin",
            readTime: "3 min lectura"
          },
          {
            title: "Power BI y Business Intelligence en Acción",
            description: "Desarrollando dashboards interactivos que permiten tomar decisiones basadas en datos...",
            link: "https://www.linkedin.com/in/castilloperz/",
            pubDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            image: "assets/img/Linkedin.png",
            platform: "linkedin",
            readTime: "4 min lectura"
          }
        ];
        allPosts = [...allPosts, ...fallbackPosts];
        console.log('✅ LinkedIn fallback posts cargados:', fallbackPosts.length);
      }
    } catch (error) {
      console.error('❌ Error loading LinkedIn posts:', error);
    }
  }

  // Función para extraer imagen del contenido
  function extractImageFromContent(content) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  }

  // Función para calcular tiempo de lectura
  function calculateReadTime(content) {
    const text = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min lectura`;
  }

  // Función para formatear fecha
  function formatDate(date) {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  // Variables del carrusel
  let currentSlide = 0;
  let cardsPerSlide = 3; // Número de cards visibles por slide
  
  // Función para renderizar posts en el carrusel
  function renderPosts(posts = null) {
    const postsToRender = posts || getFilteredPosts();
    const carousel = document.getElementById('postsCarousel');
    
    console.log('🎨 Renderizando posts:', {
      postsToRender: postsToRender.length,
      carouselExists: !!carousel,
      allPostsCount: allPosts.length
    });
    
    if (!carousel) {
      console.error('❌ No se encontró el carrusel para renderizar');
      return;
    }
    
    carousel.innerHTML = '';
    
    if (postsToRender.length === 0) {
      carousel.innerHTML = '<div style="color: #fff; text-align: center; padding: 40px;">No hay publicaciones disponibles</div>';
      return;
    }
    
    // Renderizar todas las cards
    postsToRender.forEach((post, index) => {
      console.log(`🃏 Creando card ${index + 1}:`, post.title);
      const postCard = createPostCard(post, index);
      carousel.appendChild(postCard);
    });
    
    console.log(`✅ ${postsToRender.length} cards renderizadas`);
    
    // Actualizar carrusel
    updateCarousel();
    updateIndicators(postsToRender.length);
    updateViewMoreButtons();
    
    // Aplicar animaciones
    setTimeout(() => {
      const cards = carousel.querySelectorAll('.post-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('show');
        }, index * 100);
      });
    }, 100);
  }

  // Función para crear una card de post
  function createPostCard(post, index) {
    const card = document.createElement('div');
    card.className = `post-card filtering`;
    card.setAttribute('data-platform', post.platform);
    
    const platformIcon = post.platform === 'linkedin' ? '💼' : '📖';
    const platformColor = post.platform === 'linkedin' ? 'linkedin' : 'medium';
    
    card.innerHTML = `
      <div class="post-image">
        <img src="${post.image}" alt="${post.title}" loading="lazy">
        <div class="platform-badge ${platformColor}">
          ${platformIcon} ${post.platform.toUpperCase()}
        </div>
      </div>
      <div class="post-content">
        <div class="post-meta">
          <span class="post-date">${formatDate(post.pubDate)}</span>
          <span class="read-time">${post.readTime}</span>
        </div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-description">${post.description}</p>
        <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="read-more">
          Leer más <i class="bx bx-right-arrow-alt"></i>
        </a>
      </div>
    `;
    
    return card;
  }

  // Función para obtener posts filtrados
  function getFilteredPosts() {
    console.log('🔍 Filtrando posts:', { 
      currentFilter, 
      totalPosts: allPosts.length,
      platforms: [...new Set(allPosts.map(p => p.platform))]
    });
    
    if (currentFilter === 'all') {
      return allPosts.sort((a, b) => b.pubDate - a.pubDate);
    }
    
    const filtered = allPosts
      .filter(post => post.platform === currentFilter)
      .sort((a, b) => b.pubDate - a.pubDate);
      
    console.log(`📊 Posts filtrados para ${currentFilter}:`, filtered.length);
    return filtered;
  }

  // Función para manejar filtros
  function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Actualizar estado activo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
                 // Aplicar filtro
         currentFilter = button.getAttribute('data-filter');
         currentSlide = 0; // Reset carrusel al filtrar
         
         // Animar cards saliendo
         const cards = document.querySelectorAll('.post-card');
         cards.forEach((card, index) => {
           setTimeout(() => {
             card.classList.add('filtering');
           }, index * 50);
         });
         
         // Renderizar nuevos posts después de la animación
         setTimeout(() => {
           renderPosts();
         }, cards.length * 50 + 300);
      });
    });
  }

  // Función para calcular cards por slide según el ancho de pantalla
  function calculateCardsPerSlide() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 1.5;
    if (width <= 1200) return 2;
    return 3;
  }
  
  // Función para actualizar el carrusel
  function updateCarousel() {
    const carousel = document.getElementById('postsCarousel');
    if (!carousel) return;
    
    cardsPerSlide = calculateCardsPerSlide();
    const cardWidth = 350 + 25; // width + gap
    const offset = currentSlide * cardWidth * cardsPerSlide;
    
    carousel.style.transform = `translateX(-${offset}px)`;
    
    // Actualizar estado de botones
    updateNavigationButtons();
  }
  
  // Función para actualizar botones de navegación
  function updateNavigationButtons() {
    const carousel = document.getElementById('postsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    const totalCards = carousel.children.length;
    const maxSlide = Math.max(0, Math.ceil(totalCards / cardsPerSlide) - 1);
    
    prevBtn.disabled = currentSlide <= 0;
    nextBtn.disabled = currentSlide >= maxSlide;
  }
  
  // Función para actualizar indicadores
  function updateIndicators(totalCards) {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (!indicatorsContainer) return;
    
    const totalSlides = Math.ceil(totalCards / cardsPerSlide);
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.className = `carousel-indicator ${i === currentSlide ? 'active' : ''}`;
      indicator.addEventListener('click', () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }
  
  // Función para ir a un slide específico
  function goToSlide(slideIndex) {
    const carousel = document.getElementById('postsCarousel');
    if (!carousel) return;
    
    const totalCards = carousel.children.length;
    const maxSlide = Math.max(0, Math.ceil(totalCards / cardsPerSlide) - 1);
    
    currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
    updateCarousel();
    updateIndicatorsState();
  }
  
  // Función para actualizar solo el estado de los indicadores
  function updateIndicatorsState() {
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }
  
  // Función para mostrar/ocultar botones "Ver más"
  function updateViewMoreButtons() {
    const mediumBtn = document.getElementById('mediumBtn');
    const linkedinBtn = document.getElementById('linkedinBtn');
    
    if (mediumBtn) {
      mediumBtn.style.display = currentFilter === 'all' || currentFilter === 'medium' ? 'inline-flex' : 'none';
    }
    
    if (linkedinBtn) {
      linkedinBtn.style.display = currentFilter === 'all' || currentFilter === 'linkedin' ? 'inline-flex' : 'none';
    }
  }
  
  // Funciones de navegación del carrusel
  function nextSlide() {
    const carousel = document.getElementById('postsCarousel');
    if (!carousel) return;
    
    const totalCards = carousel.children.length;
    const maxSlide = Math.max(0, Math.ceil(totalCards / cardsPerSlide) - 1);
    
    if (currentSlide < maxSlide) {
      currentSlide++;
      updateCarousel();
      updateIndicatorsState();
    }
  }
  
  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
      updateIndicatorsState();
    }
  }
  
  // Configurar navegación del carrusel
  function setupCarouselNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
    
    // Actualizar en resize
    window.addEventListener('resize', () => {
      setTimeout(() => {
        currentSlide = 0; // Reset a slide 0 en resize
        updateCarousel();
        updateIndicators(document.getElementById('postsCarousel')?.children.length || 0);
      }, 100);
    });
  }

  // Función principal para inicializar el sistema de posts
  async function initializePosts() {
    const postsContainer = document.querySelector('#postsCarousel');
    if (!postsContainer) {
      console.error('❌ No se encontró el contenedor de posts (#postsCarousel)');
      return;
    }
    
    // Mostrar estado de carga
    postsContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
      // Resetear array de posts
      allPosts = [];
      
      // Cargar posts de LinkedIn primero (síncrono)
      console.log('📱 Cargando posts de LinkedIn...');
      loadLinkedInPosts();
      
      // Cargar posts de Medium (asíncrono)
      console.log('📝 Cargando posts de Medium...');
      await loadMediumPosts();
      
      // Configurar funcionalidades
      setupFilters();
      setupCarouselNavigation();
      
      // Renderizar posts iniciales
      renderPosts();
      
      console.log('✅ Sistema de posts inicializado. Total:', allPosts.length);
      
    } catch (error) {
      console.error('❌ Error initializing posts:', error);
      postsContainer.innerHTML = `
        <div class="error-message" style="color: #fff; text-align: center; padding: 40px;">
          <p>Error al cargar las publicaciones. Por favor, intenta de nuevo más tarde.</p>
        </div>
      `;
    }
  }

  // Función para scroll del carrusel (mantener compatibilidad, pero no se usa)
  function scrollPostsCarousel(direction) {
    // Esta función se mantiene para compatibilidad pero ya no se usa
    console.log('scrollPostsCarousel is deprecated - using grid system now');
  }

  /**
   * Ajustar visibilidad de botones de navegación
   */
  function adjustNavigationButtons() {
    const carousel = document.querySelector('.posts-carousel');
    const prevBtn = document.querySelector('.posts-nav-btn.prev');
    const nextBtn = document.querySelector('.posts-nav-btn.next');
    
    if (!carousel || !prevBtn || !nextBtn) {
      console.log('🚫 No se encontraron elementos de navegación');
      return;
    }
    
    const posts = carousel.querySelectorAll('.post-item');
    const containerWidth = carousel.clientWidth;
    
    console.log(`🔧 Ajustando navegación: ${posts.length} posts, contenedor: ${containerWidth}px`);
    
    // En pantallas grandes (>1200px), si tenemos 4 o menos posts, no necesitamos navegación
    // En pantallas medianas (768-1200px), si tenemos 2 o menos posts, no necesitamos navegación
    // En pantallas pequeñas (<768px), siempre mostrar navegación si hay más de 1 post
    
    const screenWidth = window.innerWidth;
    let needsNavigation = false;
    
    if (screenWidth >= 1200) {
      needsNavigation = posts.length > 3;
    } else if (screenWidth >= 768) {
      needsNavigation = posts.length > 2;
    } else {
      needsNavigation = posts.length > 1;
    }
    
    if (needsNavigation) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
      console.log('✅ Botones de navegación mostrados');
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      console.log('🔒 Botones de navegación ocultos - las cards ocupan todo el espacio');
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM cargado, iniciando sistemas...');
    
    // Verificar si existe la sección de posts
    const postsSection = document.querySelector('#posts');
    const postsCarousel = document.querySelector('#postsCarousel');
    
    console.log('📊 Elementos encontrados:', {
      postsSection: !!postsSection,
      postsCarousel: !!postsCarousel
    });
    
    // Esperar un poco para que se carguen todos los scripts
    setTimeout(() => {
      // Inicializar sistema de posts
      console.log('🚀 Iniciando sistema de posts...');
      initializePosts();
    }, 500);
    
    // Inicializar sidebar auto-hide
    initializeAutoHideSidebar();
  });
  
  // Re-inicializar en resize para manejar cambios de pantalla
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
      initializeAutoHideSidebar();
    } else {
      // Resetear en móvil
      const header = select('#header');
      if (header) {
        header.style.transform = '';
      }
    }
  });

})();