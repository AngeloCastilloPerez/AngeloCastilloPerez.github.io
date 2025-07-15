# 🎯 Guía de Iconos de Skills

## 📁 Ubicación de los Iconos

Coloca tus iconos en: `assets/img/skills/`

## 🔧 Qué Necesitas Hacer

### 1. Descargar los Iconos
Descarga los iconos oficiales de cada herramienta:

| Herramienta | Nombre del Archivo | Sitio Oficial |
|-------------|-------------------|---------------|
| Microsoft Excel | `excel.png` | https://www.microsoft.com/en-us/microsoft-365/excel |
| Power BI | `powerbi.png` | https://powerbi.microsoft.com/ |
| Tableau | `tableau.png` | https://www.tableau.com/ |
| Microsoft Azure | `azure.png` | https://azure.microsoft.com/ |
| SQL | `sql.png` | https://www.mysql.com/ o https://www.postgresql.org/ |
| Python | `python.png` | https://www.python.org/ |
| Visual Studio Code | `vscode.png` | https://code.visualstudio.com/ |
| n8n | `n8n.png` | https://n8n.io/ |
| Make | `make.png` | https://www.make.com/ |
| LLMs | `llms.png` | https://openai.com/ o https://huggingface.co/ (ChatGPT, Claude, Gemini, etc.) |

### 2. Especificaciones Técnicas
- **Formato**: PNG (preferible con fondo transparente)
- **Tamaño**: 64x64 píxeles (mínimo) o 128x128 píxeles (recomendado)
- **Calidad**: Alta resolución para pantallas Retina
- **Nombres**: Exactamente como se lista arriba (en minúsculas)

### 3. Fuentes Recomendadas
- **Iconos Oficiales**: Páginas oficiales de cada herramienta
- **Icons8**: https://icons8.com (gratis con atribución)
- **Flaticon**: https://www.flaticon.com (premium)
- **Iconfinder**: https://www.iconfinder.com

## 🎨 Cómo Funciona el Sistema

### Sistema de Fallback
```
1. Busca el archivo PNG en assets/img/skills/
2. Si no lo encuentra, muestra el SVG de fallback
3. Transición automática sin recargar la página
```

### Colores por Herramienta
Cada tarjeta tiene un gradiente único:
- **Excel**: Verde (#217346 → #34c759)
- **Power BI**: Amarillo (#F2C811 → #ffdd44)
- **Tableau**: Naranja (#E97627 → #ff9500)
- **Azure**: Azul (#0078D4 → #40a9ff)
- **SQL**: Azul-Verde (#336791 → #52c41a)
- **Python**: Azul-Amarillo (#3776AB → #ffdd44)
- **VS Code**: Azul (#007ACC → #1786e5)
- **n8n**: Rosa (#EA4B71 → #ff6b91)
- **Make**: Morado (#6C57F7 → #8b75ff)
- **OpenAI**: Verde-Azul (#00D4AA → #10ebc1)

## 🚀 Implementación Paso a Paso

### Paso 1: Crear la Estructura
```bash
mkdir "assets/img/skills"
```

### Paso 2: Agregar los Iconos
Coloca cada icono PNG con el nombre exacto en la carpeta `assets/img/skills/`

### Paso 3: Verificar
1. Recarga la página
2. Los iconos PNG deberían aparecer automáticamente
3. Si algún icono no se encuentra, se mostrará el SVG de fallback

## 📱 Responsive Design

El diseño es completamente responsive:
- **Desktop**: Grid de 5 columnas
- **Tablet**: Grid de 3-4 columnas
- **Mobile**: Grid de 2 columnas

## 🎯 Características del Diseño

### Efectos Visuales
- **Glassmorphism**: Fondo semi-transparente con blur
- **Gradientes**: Únicos para cada herramienta
- **Hover Effects**: Elevación y escalado suave
- **Animaciones**: Entrada escalonada al cargar

### Accesibilidad
- **Alt Text**: Cada imagen tiene texto alternativo
- **Tooltips**: Nombres de herramientas al hacer hover
- **Keyboard Navigation**: Funciona con teclado
- **High Contrast**: Buen contraste para legibilidad

## 🔄 Mantenimiento

### Cambiar un Icono
1. Reemplaza el archivo PNG en `assets/img/skills/`
2. Mantén el mismo nombre de archivo
3. Recarga la página

### Agregar Nueva Herramienta
1. Edita `index.html` para agregar el nuevo `skill-item`
2. Agrega el CSS del gradiente en `style.css`
3. Coloca el icono PNG en la carpeta

## 🎨 Personalización

### Cambiar Colores
Edita los gradientes en `assets/css/style.css`:
```css
.skill-item[data-icon="nombre"] {
  background: linear-gradient(135deg, rgba(R, G, B, 0.15) 0%, rgba(R, G, B, 0.15) 100%);
}
```

### Ajustar Tamaños
Modifica las dimensiones en CSS:
```css
.skill-item {
  height: 200px; /* Altura de las tarjetas */
}

.skill-icon {
  width: 64px;   /* Tamaño de los iconos */
  height: 64px;
}
```

## 🐛 Resolución de Problemas

### Los iconos no aparecen
1. Verifica que el nombre del archivo sea exacto
2. Asegúrate de que esté en la carpeta correcta
3. Revisa que el formato sea PNG

### Los iconos se ven borrosos
1. Usa iconos de mayor resolución (128x128 o más)
2. Verifica que sean PNG de alta calidad

### El grid no se ve bien
1. Limpia el cache del navegador
2. Verifica que no haya errores en la consola
3. Asegúrate de que CSS esté cargando correctamente

## 📞 Soporte

Si tienes problemas:
1. Verifica la consola del navegador (F12)
2. Revisa que todos los archivos estén en su lugar
3. Asegúrate de que el servidor local esté funcionando

¡Disfruta de tu nueva sección de skills con estilo glassmorphism! 🎉 