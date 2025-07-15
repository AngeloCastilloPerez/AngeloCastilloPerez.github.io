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

  /**
   * Posts Carousel Functionality
   */
  function initializePostsCarousel() {
    const postsCarousel = select('.posts-carousel');
    const postItems = select('.post-item', true);
    const indicators = select('.indicator', true);
    
    if (!postsCarousel || !postItems || postItems.length === 0) {
      return; // Exit if posts section doesn't exist
    }

    let currentSlide = 0;
    let autoAdvanceInterval;
    
    // Configuración fija del carrusel
    const carouselConfig = {
      itemWidth: 350,  // Ancho fijo definido en CSS
      gap: 30,         // Gap fijo definido en CSS
      padding: 15,     // Padding horizontal del carrusel
      getItemsPerView() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
      }
    };
    
    function getTotalSlides() {
      return Math.ceil(postItems.length / carouselConfig.getItemsPerView());
    }

    // Function to update carousel position
    function updateCarousel() {
      const itemsPerView = carouselConfig.getItemsPerView();
      const moveDistance = (carouselConfig.itemWidth + carouselConfig.gap) * currentSlide;
      
      postsCarousel.style.transform = `translateX(-${moveDistance}px)`;
      
      // Update indicators
      if (indicators && indicators.length > 0) {
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentSlide);
        });
      }
    }

    // Function to go to next slide
    function nextPost() {
      const totalSlides = getTotalSlides();
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }

    // Function to go to previous slide
    function prevPost() {
      const totalSlides = getTotalSlides();
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    // Function to go to specific slide
    function currentPost(slideIndex) {
      currentSlide = slideIndex - 1;
      updateCarousel();
    }

    // Auto-advance carousel every 5 seconds
    function startAutoAdvance() {
      autoAdvanceInterval = setInterval(nextPost, 5000);
    }

    function stopAutoAdvance() {
      if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
      }
    }

    // Pause auto-advance on hover
    postsCarousel.addEventListener('mouseenter', stopAutoAdvance);
    postsCarousel.addEventListener('mouseleave', startAutoAdvance);

    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isSwipe = false;

    postsCarousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwipe = true;
    });

    postsCarousel.addEventListener('touchmove', (e) => {
      if (!isSwipe) return;
      currentX = e.touches[0].clientX;
    });

    postsCarousel.addEventListener('touchend', () => {
      if (!isSwipe) return;
      const diffX = startX - currentX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextPost();
        } else {
          prevPost();
        }
      }
      
      isSwipe = false;
    });

    // Make functions global for button onclick events
    window.nextPost = nextPost;
    window.prevPost = prevPost;
    window.currentPost = currentPost;

    // Initialize carousel
    updateCarousel();
    startAutoAdvance();
    adjustNavigationButtons();

    // Update carousel on resize
    window.addEventListener('resize', () => {
      updateCarousel();
      adjustNavigationButtons();
    });
  }

  // Initialize posts carousel when DOM is ready
  window.addEventListener('load', initializePostsCarousel);

  /**
   * Medium RSS Feed Integration
   */
  async function fetchMediumPosts() {
    try {
      // Verificar configuración
      if (!window.MEDIUM_CONFIG || window.MEDIUM_CONFIG.USERNAME === 'tu-username') {
        throw new Error('USERNAME no configurado');
      }
      
      // Configuración del usuario de Medium
      const MEDIUM_USERNAME = window.MEDIUM_CONFIG.USERNAME;
      
      // URL del RSS feed de Medium convertido a JSON
      const RSS_TO_JSON_API = `${window.MEDIUM_CONFIG.RSS_TO_JSON_API}?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;
      
      // Mostrar estado de carga
      const postsContainer = select('.posts-carousel');
      if (postsContainer) {
        postsContainer.innerHTML = `
          <div class="post-item loading-state">
            <div class="loading-content">
              <div class="loading-spinner"></div>
              <h3>${window.MEDIUM_CONFIG.TEXTS.LOADING}</h3>
              <p>${window.MEDIUM_CONFIG.TEXTS.LOADING_SUBTITLE}</p>
            </div>
          </div>
        `;
      }

      const response = await fetch(RSS_TO_JSON_API);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error('Error al obtener el RSS feed de Medium');
      }

      return data.items || [];
    } catch (error) {
      console.error('Error al obtener publicaciones de Medium:', error);
      return [];
    }
  }

  /**
   * Extraer imagen thumbnail de la descripción HTML
   */
  function extractThumbnailFromDescription(description) {
    try {
      const match = description.match(/<img[^>]+src="([^">]+)"/);
      return match ? match[1] : null;
    } catch (error) {
      console.error('Error al extraer thumbnail:', error);
      return null;
    }
  }

  /**
   * Limpiar el HTML del contenido del post
   */
  function cleanPostContent(content) {
    try {
      // Crear un elemento temporal para parsear el HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      // Extraer solo el texto, sin etiquetas HTML
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      // Limitar según configuración
      const maxLength = window.MEDIUM_CONFIG?.MAX_CONTENT_LENGTH || 150;
      if (textContent.length > maxLength) {
        return textContent.substring(0, maxLength) + '...';
      }
      
      return textContent;
    } catch (error) {
      console.error('Error al limpiar contenido:', error);
      return 'Error al procesar el contenido del post...';
    }
  }

  /**
   * Formatear fecha en español
   */
  function formatPostDate(dateString) {
    try {
      const date = new Date(dateString);
      const months = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ];
      
      return {
        day: date.getDate().toString().padStart(2, '0'),
        month: months[date.getMonth()],
        year: date.getFullYear().toString()
      };
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return {
        day: '01',
        month: 'Ene',
        year: '2024'
      };
    }
  }

  /**
   * Estimar tiempo de lectura
   */
  function estimateReadingTime(content) {
    try {
      const wordsPerMinute = window.MEDIUM_CONFIG?.WORDS_PER_MINUTE || 200;
      const textContent = content.replace(/<[^>]*>/g, ''); // Remover HTML
      const wordCount = textContent.trim().split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      
      return readingTime < 1 ? 1 : readingTime;
    } catch (error) {
      console.error('Error al estimar tiempo de lectura:', error);
      return 5; // Valor por defecto
    }
  }

  /**
   * Extraer categoría del post basado en las etiquetas
   */
  function extractCategory(categories) {
    try {
      if (!categories || categories.length === 0) {
        return window.MEDIUM_CONFIG?.DEFAULT_CATEGORY || 'Medium';
      }
      
      // Tomar la primera categoría y capitalizar
      const category = categories[0];
      return category.charAt(0).toUpperCase() + category.slice(1);
    } catch (error) {
      console.error('Error al extraer categoría:', error);
      return window.MEDIUM_CONFIG?.DEFAULT_CATEGORY || 'Medium';
    }
  }

  /**
   * Renderizar posts de todas las plataformas en el carrusel
   */
  function renderSocialMediaPosts(posts) {
    const postsContainer = select('.posts-carousel');
    if (!postsContainer) {
      console.error('❌ No se encontró el contenedor .posts-carousel');
      return;
    }

    console.log('📝 Renderizando', posts.length, 'publicaciones en total');
    console.log('📋 Publicaciones:', posts.map(p => `${p.title} (${p.category || 'Sin categoría'})`));

    if (posts.length === 0) {
      console.warn('⚠️ No hay publicaciones para mostrar');
      postsContainer.innerHTML = `
        <div class="post-item error-state">
          <div class="error-content">
            <h3>No hay publicaciones disponibles</h3>
            <p>No se pudieron cargar las publicaciones. Revisa la consola para más detalles.</p>
            <a href="${window.LINKEDIN_CONFIG?.PROFILE_URL || '#'}" target="_blank" class="post-btn">
              Ver perfil de LinkedIn
            </a>
          </div>
        </div>
      `;
      return;
    }

    let postsHTML = '';
    
    posts.forEach((post, index) => {
      // Detectar si es de Medium o LinkedIn
      const isLinkedIn = post.category === 'LinkedIn' || !post.description;
      
      let thumbnail, cleanContent, postDate, readingTime, category;
      
      if (isLinkedIn) {
        // Procesamiento para LinkedIn - usar siempre la imagen predefinida
        thumbnail = "assets/img/Linkedin.png";
        cleanContent = post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content;
        postDate = formatPostDate(post.date);
        readingTime = Math.ceil(post.content.split(' ').length / 200);
        category = post.category;
      } else {
        // Procesamiento para Medium
        thumbnail = extractThumbnailFromDescription(post.description);
        cleanContent = cleanPostContent(post.description);
        postDate = formatPostDate(post.pubDate);
        readingTime = estimateReadingTime(post.description);
        category = extractCategory(post.categories);
      }
      
      const gradientStyle = isLinkedIn ? 
        'background: linear-gradient(135deg, #0077b5 0%, #005885 100%);' :
        'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);';
      
      const icon = isLinkedIn ? '💼' : '📖';
      
      postsHTML += `
        <div class="post-item" data-platform="${isLinkedIn ? 'linkedin' : 'medium'}">
          <div class="post-img">
            ${thumbnail ? 
              `<img src="${thumbnail}" alt="${post.title}" 
                   onerror="this.style.cssText='${gradientStyle} color: white; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; height: 100%;'; this.innerHTML='${icon} ${category}';">` :
              `<div style="${gradientStyle} color: white; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; height: 100%;">${icon} ${category}</div>`
            }
            <div class="post-overlay">
              <div class="post-date">
                <span class="day">${postDate.day}</span>
                <span class="month">${postDate.month}</span>
                <span class="year">${postDate.year}</span>
              </div>
            </div>
          </div>
          <div class="post-content">
            <h3>${post.title}</h3>
            <p>${cleanContent}</p>
            <div class="post-meta">
              <span class="post-category">${category}</span>
              <span class="post-read-time">${readingTime} ${window.MEDIUM_CONFIG?.TEXTS.READING_TIME || 'min lectura'}</span>
            </div>
            <a href="${post.link}" target="_blank" class="post-btn">
              <span>${window.MEDIUM_CONFIG?.TEXTS.READ_MORE || 'Leer más'}</span>
            </a>
          </div>
        </div>
      `;
    });
    
    postsContainer.innerHTML = postsHTML;
    
    // Reinicializar el carrusel después de agregar el contenido
    initializePostsCarousel();
    
    // Ajustar botones de navegación basado en el contenido
    adjustNavigationButtons();
  }

  /**
   * Obtener publicaciones de LinkedIn (simuladas)
   */
  function fetchLinkedInPosts() {
    return new Promise((resolve) => {
      console.log('💼 Obteniendo publicaciones de LinkedIn...');
      
      // Simular delay de red
      setTimeout(() => {
        // Usar el manager de LinkedIn si está disponible, si no usar la configuración
        const linkedinPosts = window.LINKEDIN_POSTS_MANAGER ? 
          window.LINKEDIN_POSTS_MANAGER.getPosts() : 
          window.LINKEDIN_CONFIG?.SAMPLE_POSTS || [];
        
        console.log(`💼 LinkedIn posts encontrados: ${linkedinPosts.length}`);
        console.log('💼 Manager disponible:', !!window.LINKEDIN_POSTS_MANAGER);
        console.log('💼 Config disponible:', !!window.LINKEDIN_CONFIG);
        
        resolve(linkedinPosts);
      }, 500);
    });
  }

  /**
   * Combinar publicaciones de Medium y LinkedIn
   */
  async function fetchAllPosts() {
    console.log('📡 Obteniendo publicaciones de todas las plataformas...');
    
    try {
      console.log('📱 Haciendo llamadas paralelas a Medium y LinkedIn...');
      const [mediumPosts, linkedinPosts] = await Promise.all([
        fetchMediumPosts().catch(err => {
          console.warn('⚠️ Error al obtener posts de Medium:', err);
          return [];
        }),
        fetchLinkedInPosts().catch(err => {
          console.warn('⚠️ Error al obtener posts de LinkedIn:', err);
          return [];
        })
      ]);
      
      console.log(`📊 Medium: ${mediumPosts.length} posts, LinkedIn: ${linkedinPosts.length} posts`);
      
      // Combinar y ordenar por fecha (más recientes primero)
      const allPosts = [...mediumPosts, ...linkedinPosts].sort((a, b) => {
        const dateA = new Date(a.pubDate || a.date);
        const dateB = new Date(b.pubDate || b.date);
        return dateB - dateA;
      });
      
      console.log(`🎯 Total de publicaciones combinadas: ${allPosts.length}`);
      return allPosts;
      
    } catch (error) {
      console.error('❌ Error crítico al obtener publicaciones:', error);
      
      // Como fallback, intentar solo LinkedIn
      try {
        console.log('🔄 Intentando fallback solo con LinkedIn...');
        const linkedinPosts = await fetchLinkedInPosts();
        console.log(`📱 Fallback exitoso: ${linkedinPosts.length} posts de LinkedIn`);
        return linkedinPosts;
              } catch (linkedinError) {
          console.error('💥 Error completo - no se pudieron obtener publicaciones:', linkedinError);
          
          // Fallback final con posts hardcodeados para garantizar contenido
          console.log('🆘 Usando fallback con posts hardcodeados...');
          return [
            {
              title: "Especialista en Tecnología - Transformación Digital",
              content: "Compartiendo mi experiencia en análisis de datos y transformación digital en empresas.",
              link: "https://www.linkedin.com/in/castilloperz/",
              category: "LinkedIn",
              date: new Date().toISOString(),
              image: "assets/img/Linkedin.png"
            },
            {
              title: "Power BI y Business Intelligence",
              content: "Desarrollando dashboards interactivos para decisiones basadas en datos.",
              link: "https://www.linkedin.com/in/castilloperz/",
              category: "LinkedIn",
              date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              image: "assets/img/Linkedin.png"
            }
          ];
        }
    }
  }

  /**
   * Inicializar integración con todas las plataformas
   */
  async function initializeSocialMediaIntegration() {
    console.log('🚀 Iniciando integración de redes sociales...');
    try {
      const posts = await fetchAllPosts();
      console.log('✅ Posts obtenidos exitosamente:', posts.length);
      renderSocialMediaPosts(posts);
    } catch (error) {
      console.error('❌ Error en la integración de redes sociales:', error);
      
      // Mostrar mensaje de error
      const postsContainer = select('.posts-carousel');
      if (postsContainer) {
        postsContainer.innerHTML = `
          <div class="post-item error-state">
            <div class="error-content">
              <h3>${window.MEDIUM_CONFIG?.TEXTS.NETWORK_ERROR_TITLE || 'Error al cargar publicaciones'}</h3>
              <p>${window.MEDIUM_CONFIG?.TEXTS.NETWORK_ERROR_MESSAGE || 'Hubo un problema al conectar con las plataformas. Por favor, intenta recargar la página.'}</p>
              <button onclick="location.reload()" class="post-btn">
                ${window.MEDIUM_CONFIG?.TEXTS.NETWORK_ERROR_BUTTON || 'Recargar página'}
              </button>
            </div>
          </div>
        `;
      }
    }
  }

  /**
   * Auto-hide Sidebar Enhancement
   */
  function initializeAutoHideSidebar() {
    const header = select('#header');
    
    if (header && window.innerWidth >= 992) {
      let hoverTimeout;
      
      // Mejorar la experiencia de hover
      header.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        this.style.transform = 'translateX(0)';
      });
      
      header.addEventListener('mouseleave', function() {
        // Pequeño delay antes de ocultar para mejor UX
        hoverTimeout = setTimeout(() => {
          this.style.transform = 'translateX(-85px)';
        }, 500);
      });
      
      // Mantener visible si hay un elemento enfocado dentro
      header.addEventListener('focusin', function() {
        clearTimeout(hoverTimeout);
        this.style.transform = 'translateX(0)';
      });
      
      header.addEventListener('focusout', function(e) {
        // Solo ocultar si el foco sale completamente del header
        if (!header.contains(e.relatedTarget)) {
          hoverTimeout = setTimeout(() => {
            this.style.transform = 'translateX(-85px)';
          }, 300);
        }
      });
    }
  }

  // Inicializar Medium integration cuando se carga la página
  document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sidebar auto-hide
    initializeAutoHideSidebar();
    
    // Esperar según configuración para que se carguen otros elementos
    const delay = window.MEDIUM_CONFIG?.LOADING_DELAY || 1000;
    setTimeout(initializeSocialMediaIntegration, delay);
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

/**
 * Función para controlar la navegación del carrusel de posts
 */
function scrollPostsCarousel(direction) {
  const carousel = document.querySelector('.posts-carousel');
  if (!carousel) return;
  
  // Calcular el scroll amount basado en el ancho del contenedor
  const containerWidth = carousel.clientWidth;
  const scrollAmount = containerWidth * 0.8; // Scroll 80% del ancho visible
  const currentScroll = carousel.scrollLeft;
  
  if (direction === 'left') {
    carousel.scrollTo({
      left: Math.max(0, currentScroll - scrollAmount),
      behavior: 'smooth'
    });
  } else if (direction === 'right') {
    carousel.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }
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