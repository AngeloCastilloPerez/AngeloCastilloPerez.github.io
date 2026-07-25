# AngeloCastilloPerez.github.io

## 🚀 Portafolio Personal — Angelo Castillo · Fundador & CEO de HERO

Sitio de una sola página con hero en video, catálogo de proyectos en formato vinilo y
línea de tiempo profesional con morfismo humano → máquina. Bilingüe ES/EN.

## ✨ Características

- 🎬 **Hero en video** ligado al scroll, con 12 tarjetas flotantes en 3 capas de parallax
- 💿 **Catálogo de proyectos** en estantería 3D estilo vinilo, con filtros por categoría
- 🪟 **Ficha de proyecto** en modal: tracklist, liner notes, stack, resultado y enlace al repo
- 🧬 **Sección Experiencia** con figura que muta de orgánica a robótica según el scroll
- 🏢 **Franja de clientes** con marquee infinito
- 🌐 **Bilingüe ES/EN** con conmutador instantáneo
- ⚡ **Sin build ni dependencias** — HTML, CSS y JavaScript vanilla en un solo archivo

## 📂 Estructura del Proyecto

```
AngeloCastilloPerez.github.io/
├── index.html               # El sitio completo (markup + estilos + lógica)
├── index-legacy.html        # Versión anterior (Bootstrap, Medium, testimonios)
├── assets/
│   ├── v2/                  # Assets del diseño actual
│   │   ├── hero-bg.mp4      # Video del hero (faststart)
│   │   ├── hero-bg.jpg      # Póster del video
│   │   ├── cards/           # Portadas grandes (modal y estantería)
│   │   └── hero/            # Portadas pequeñas (tarjetas flotantes)
│   └── img/clients/         # Logos de clientes
├── portfolio-data/data.json # Datos de origen del portafolio
└── portfolio-details.html
```

Los datos de proyectos, experiencia, clientes y traducciones viven en los arrays
`PROJECTS`, `STAGES`, `CLIENTS` y `T` dentro de `index.html`.

## 🛠️ Tecnologías

- HTML5, CSS3 (grid, sticky, `mask-image`), JavaScript ES6+
- Fuentes: Inter + JetBrains Mono
- Sin frameworks, sin bundler, sin dependencias en tiempo de ejecución

## 🚀 Despliegue

Sitio estático: sirve la raíz del repo tal cual.

1. Push a `main`
2. Activar GitHub Pages en la configuración del repositorio
3. Disponible en `https://tu-username.github.io`

> El hero requiere que el servidor soporte peticiones `Range` para el video.
> GitHub Pages, Vercel y Netlify lo hacen; no todos los servidores locales sí.

## 📞 Contacto

- **Email**: [acastillo@hero.com.pe](mailto:acastillo@hero.com.pe)
- **Web**: [hero.com.pe](https://www.hero.com.pe)
- **LinkedIn**: [linkedin.com/in/castilloperz](https://linkedin.com/in/castilloperz)
- **GitHub**: [github.com/AngeloCastilloPerez](https://github.com/AngeloCastilloPerez)

## 📄 Licencia

MIT.

---

⭐ **¡Dale una estrella al repo si te resultó útil!**
