# Fotos del panel de experiencia

Cada etapa de la trayectoria puede mostrar una o varias fotos del trabajo en el
encuadre izquierdo de su panel de detalle.

## Una sola foto

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

No hay que tocar código. Si el archivo no existe, el panel muestra el marco
vacío con su leyenda, nunca una imagen rota.

## Varias fotos en una misma etapa

Agregá las siguientes con sufijo, empezando en `-2`:

```
03.jpg      ← la primera, la que se ve al abrir
03-2.jpg
03-3.jpg
```

Con dos o más aparece una tira de miniaturas debajo del encuadre. Se cambia con
click o con las flechas ← →. Con una sola, la tira no aparece.

**La numeración tiene que ser corrida.** El sitio es estático y no puede listar
la carpeta, así que las descubre pidiéndolas en orden y **se detiene en la
primera que falta**: si dejás `03.jpg` y `03-3.jpg` sin poner `03-2.jpg`, la
tercera no se ve. El tope son 6 por etapa.

## Formato

- **JPG**, que es lo que busca el código. Para usar PNG o cualquier otra ruta,
  hay que poner `photo:'...'` dentro del `detail` de esa etapa en `index.html`
  — pero eso fija **una sola** foto y desactiva la galería.
- **Proporción cuadrada o algo vertical (1:1 a 4:5).** El encuadre es más alto
  que ancho en escritorio, y la imagen entra con `object-fit:cover`, así que se
  recorta desde el centro: una foto apaisada 16:9 pierde los costados.
- **~1200 px de lado** alcanza y sobra. Es un panel, no una portada.
- Todo lo que se vea acá se sirve tal cual desde el repo, así que conviene
  comprimir antes de subir.

El número de cada etapa sale del campo `n` de `STAGES`, en `index.html`. Si
alguna vez cambia el orden de la trayectoria, cambian los nombres de archivo.
