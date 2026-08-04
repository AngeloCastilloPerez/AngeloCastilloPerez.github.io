# Fotos del panel de experiencia

Cada etapa de la trayectoria puede mostrar una foto del trabajo en el encuadre
izquierdo de su panel de detalle.

## Cómo cargar una

Dejá el archivo en esta carpeta con el número de la etapa como nombre:

```
assets/v2/experiencia/01.jpg   Auxiliar de Procesos · Grupo Rocío
assets/v2/experiencia/02.jpg   Asistente de Producción · Grupo Rocío
assets/v2/experiencia/03.jpg   Analista de BI · Dígito
assets/v2/experiencia/04.jpg   Analista de Datos · Dígito
assets/v2/experiencia/05.jpg   Analista de Proyectos de TI · Dígito
assets/v2/experiencia/06.jpg   Líder de Proyectos · Dígito
assets/v2/experiencia/07.jpg   Consultor BI · Dígito
assets/v2/experiencia/08.jpg   Founder & CEO · HERO
```

No hay que tocar código: el panel busca ese archivo solo. Si no existe, muestra
el marco vacío con su leyenda, nunca una imagen rota.

El número sale del campo `n` de cada entrada de `STAGES`, en `index.html`. Si
alguna vez cambia el orden de la trayectoria, cambia el nombre del archivo.

## Formato

- **JPG**, que es lo que busca el código. Para usar PNG o cualquier otra ruta,
  hay que poner `photo:'...'` dentro del `detail` de esa etapa en `index.html`.
- **Proporción cuadrada o algo vertical (1:1 a 4:5).** El encuadre es más alto
  que ancho en escritorio, y la imagen entra con `object-fit:cover`, así que se
  recorta desde el centro: una foto apaisada 16:9 pierde los costados.
- **~1200 px de lado** alcanza y sobra. Es un panel, no una portada.
- Todo lo que se vea acá se sirve tal cual desde el repo, así que conviene
  comprimir antes de subir.
