# Prompts para rediseñar las 5 vistas de Agrovet BI

Documento de trabajo. Cada prompt genera **una vista** como artifact HTML autocontenido,
para reemplazar las capturas de Power BI en `casos/agrovet-bi.html`.

**Marca de demostración:** `FARMAVET` (ficticia). Los datos son inventados pero coherentes
entre las cinco vistas: el P&L cuadra, el balance cuadra, los ratios se derivan del mismo
P&L y balance, y DuPont multiplica exacto. No hay nada del cliente real.

## Cómo usarlos

1. Pega el **Bloque A (sistema de diseño)** una sola vez al inicio de la conversación.
2. Después pega el prompt de la vista que quieras. Si trabajas las cinco en la misma
   conversación, el Bloque A no se repite; si abres una conversación por vista, pégalo
   de nuevo cada vez.
3. Cuando la vista esté lista: captura a 2x y guarda en
   `assets/img/casos/agrovet-bi/0N-<nombre>.png` reemplazando la actual.

---

## BLOQUE A — Sistema de diseño (pegar primero)

```
Vas a construir una serie de cinco vistas de un reporte financiero como artifacts HTML
autocontenidos. Todas comparten el mismo sistema de diseño. Guárdalo y aplícalo a cada
vista que te pida después.

CONTEXTO
Son las vistas de un reporte de BI real (arquitectura Medallion en Microsoft Fabric,
fuente SAP, modelo semántico en Power BI) que voy a mostrar en un caso de estudio de
portafolio. La empresa se llama FARMAVET y los datos son de demostración. El objetivo no
es imitar Power BI: es rediseñar esas vistas como las diseñaría alguien que sabe de
visualización de datos, manteniendo exactamente la misma información.

SUPERFICIE Y COLOR
- Superficie oscura: #0d0d16 sobre plano de página #080810. Diseña la versión oscura
  primero; incluye también modo claro (superficie #fcfcfb, plano #f9f9f7) con
  @media (prefers-color-scheme: dark) más overrides :root[data-theme="dark"] /
  :root[data-theme="light"], para que un toggle gane en ambos sentidos.
- Define todos los colores como CSS custom properties por rol al inicio del archivo
  (--surface, --text-primary, --text-secondary, --muted, --grid, --baseline, --series-N,
  --status-good, --status-critical). El cuerpo del documento se escribe contra roles,
  nunca contra hex crudo.
- Tinta: primaria #ffffff / secundaria #c3c2b7 / apagada #898781 en oscuro;
  #0b0b0b / #52514e / #898781 en claro.
- Rejilla hairline #2c2c2a (oscuro) / #e1e0d9 (claro). Línea base #383835 / #c3c2b7.
- Acento de marca (encabezados, énfasis, no series): degradado #FF3D5A → #FF8C42.
- Paleta categórica (usa los slots EN ORDEN, nunca los cicles):
  oscuro: 1 #3987e5 · 2 #d95926 · 3 #199e70 · 4 #c98500 · 5 #d55181
  claro:  1 #2a78d6 · 2 #eb6834 · 3 #1baf7a · 4 #eda100 · 5 #e87ba4
- Rampa secuencial (magnitud, un solo tono azul, claro→oscuro):
  #cde2fb #b7d3f6 #9ec5f4 #86b6ef #6da7ec #5598e7 #3987e5 #2a78d6 #256abf #1c5cab
- Estado (reservado, nunca como "serie N"): good #0ca30c · warning #fab219 ·
  serious #ec835a · critical #d03b3b. Un color de estado SIEMPRE va con icono + etiqueta,
  nunca solo color.
- Divergente cuando haga falta polaridad: azul ↔ rojo con punto medio gris
  (#383835 oscuro / #f0efec claro). Nunca arcoíris, nunca un tono en el punto medio.

TIPOGRAFÍA
- Sans del sistema para todo: system-ui, -apple-system, "Segoe UI", sans-serif.
  Ninguna fuente display ni serif, ninguna petición a fuentes externas.
- font-variant-numeric: tabular-nums SOLO en columnas que deben alinearse
  verticalmente (filas de tabla, ticks de eje). Los números grandes sueltos
  (hero, valor de tarjeta) van con figuras proporcionales.

MARCAS
- Marcas delgadas. Extremos de dato redondeados a 4px, anclados a la línea base.
- Líneas de 2px. Marcadores de 8px mínimo.
- 2px de superficie entre rellenos: entre segmentos apilados y entre barras adyacentes.
- Anillo de 2px del color de la superficie en marcas que se superponen.
- Etiquetas directas selectivas: nunca un número sobre cada punto.
- Ejes y rejilla recesivos, nunca compitiendo con el dato.

REGLAS QUE NO SE NEGOCIAN
- Un solo eje por gráfico. NUNCA doble eje Y. Dos medidas de escalas distintas =
  dos gráficos, small multiples, o indexadas a una base común.
- El color sigue a la entidad, nunca a su posición en el ranking. Si un filtro cambia
  el número de series, las que quedan no se repintan.
- Leyenda presente siempre que haya 2 o más series (una sola serie no necesita leyenda:
  el título la nombra). Con 4 o menos series, además etiquetado directo. La identidad
  nunca depende solo del color.
- Los valores y etiquetas usan tokens de texto, NUNCA el color de la serie. Una marca
  de color al lado carga la identidad.
- ERROR A EVITAR EXPLÍCITAMENTE: el reporte original pinta de rojo TODOS los costos
  (que son negativos por naturaleza). Cuando todo es rojo, el rojo no significa nada.
  Los importes van en tinta normal; el color de estado se reserva para la columna de
  variación, y solo cuando la variación es desfavorable respecto al objetivo o al año
  anterior, con flecha + etiqueta.

INTERACCIÓN
- Hover por defecto: tooltip por marca en barras/celdas/puntos, crosshair + tooltip en
  líneas y áreas. Área de activación mayor que la marca.
- Los filtros van en UNA fila arriba de los gráficos, no dispersos.
- Nunca uses alert(), confirm() ni prompt().

ENTREGA
- Un solo archivo HTML autocontenido: todo el CSS y JS inline, cero peticiones externas
  (sin CDN, sin fuentes remotas, sin imágenes remotas). Los SVG se escriben a mano.
- Lienzo pensado para 1600px de ancho, pero responsive: nada de scroll horizontal en el
  body; las tablas anchas hacen scroll dentro de su propio contenedor overflow-x:auto.
- Al final, revisa el render: colisiones de etiquetas, desbordes, geometría.
```

---

## PROMPT 1 — Estado de resultados comparativo

```
Construye la VISTA 01: estado de resultados comparativo de FARMAVET, YTD Abril 2026 vs
YTD Abril 2025, en soles (PEN).

ENCABEZADO
- Marca "FARMAVET" y título "Estado de resultados · YTD Abril 2026".
- Una fila de filtros arriba: Mes (Abr), Período (MTD / YTD, con YTD activo), Año (2026).
  Son controles reales pero pueden ser decorativos: no necesitan recalcular.
- Tres cifras hero antes de la tabla, cada una con su variación vs año anterior:
  Ventas Netas 2,546,000 (+13.15%) · Utilidad Bruta 303,300 (11.91% de ventas, +13.34%) ·
  Utilidad Operativa 112,300 (4.41% de ventas, +33.06%).
  Las tres variaciones son favorables: flecha ↑ + etiqueta + color good.

TABLA — jerarquía real (el original la tenía plana y desordenada; respétala)
Ventas Netas
  Ventas Maquila
  Ventas Análisis
Costo de Servicio
  Costo de Maquila
    Costo Variable
      Mano de obra directa
      Materiales e insumos directos
      Servicios
      Materiales indirectos
    Costo Fijo
      Deprec. de inm, maq. y equipo
      Gasto indirecto de fabricación
      Mano de obra indirecta
  Costo control de calidad
Utilidad Bruta        (subtotal)
Gastos de Administración
Utilidad Operativa    (subtotal)

Los totales y subtotales se distinguen por peso tipográfico y una regla hairline arriba,
no por relleno de fondo. Cada nivel de la jerarquía indenta; los nodos padre se pueden
colapsar (chevron) — implementa el colapso, es lo que hace la tabla legible.

COLUMNAS
P&L | Actual | % vs ventas | Anterior | % vs ventas PY | ΔVar Abs | Var%

DATOS (Actual = YTD Abr 2026, Anterior = YTD Abr 2025)
Fila                            | Actual     | %vs   | Anterior   | %vsPY | ΔVarAbs   | Var%
Ventas Netas                    |  2,546,000 | 100.00| 2,250,200  |100.00 | +295,800  | 13.15
Ventas Maquila                  |  2,184,600 |  85.81| 1,962,300  | 87.21 | +222,300  | 11.33
Ventas Análisis                 |    361,400 |  14.19|   287,900  | 12.79 |  +73,500  | 25.53
Costo de Servicio               | -2,242,700 | -88.09|-1,982,600  |-88.11 | -260,100  | 13.12
Costo de Maquila                | -1,948,000 | -76.51|-1,701,200  |-75.60 | -246,800  | 14.51
Costo Variable                  | -1,355,100 | -53.22|-1,118,500  |-49.71 | -236,600  | 21.15
Mano de obra directa            | -1,058,200 | -41.56|  -852,100  |-37.87 | -206,100  | 24.19
Materiales e insumos directos   |    -84,300 |  -3.31|   -61,700  | -2.74 |  -22,600  | 36.63
Servicios                       |   -206,500 |  -8.11|  -196,800  | -8.75 |   -9,700  |  4.93
Materiales indirectos           |     -6,100 |  -0.24|    -7,900  | -0.35 |   +1,800  |-22.78
Costo Fijo                      |   -592,900 | -23.29|  -582,700  |-25.89 |  -10,200  |  1.75
Deprec. de inm, maq. y equipo   |   -172,400 |  -6.77|  -164,900  | -7.33 |   -7,500  |  4.55
Gasto indirecto de fabricación  |   -191,600 |  -7.53|  -178,300  | -7.92 |  -13,300  |  7.46
Mano de obra indirecta          |   -228,900 |  -8.99|  -239,500  |-10.64 |  +10,600  | -4.43
Costo control de calidad        |   -294,700 | -11.58|  -281,400  |-12.51 |  -13,300  |  4.73
Utilidad Bruta                  |    303,300 |  11.91|   267,600  | 11.89 |  +35,700  | 13.34
Gastos de Administración        |   -191,000 |  -7.50|  -183,200  | -8.14 |   -7,800  |  4.26
Utilidad Operativa              |    112,300 |   4.41|    84,400  |  3.75 |  +27,900  | 33.06

CONVENCIONES DE CÁLCULO (respétalas, los números ya cuadran)
- % vs ventas = línea / Ventas Netas del mismo período.
- ΔVar Abs = Actual − Anterior, con signo.
- Var% = (|Actual| − |Anterior|) / |Anterior|: mide cuánto creció la magnitud de la línea.
  Por eso un costo que sube da Var% positivo y una eficiencia da Var% negativo.
- Verificaciones que deben seguir cumpliéndose si tocas algo:
  Ventas Netas = Maquila + Análisis
  Costo Variable = MOD + Materiales directos + Servicios + Materiales indirectos
  Costo Fijo = Depreciación + Gasto indirecto de fabricación + MO indirecta
  Costo de Maquila = Costo Variable + Costo Fijo
  Costo de Servicio = Costo de Maquila + Control de calidad
  Utilidad Bruta = Ventas Netas + Costo de Servicio
  Utilidad Operativa = Utilidad Bruta + Gastos de Administración

CODIFICACIÓN VISUAL
- Barra dentro de la celda "Actual", escala compartida por toda la tabla, con la línea
  cero visible: ingresos a la derecha, costos a la izquierda. Es magnitud, así que va con
  la rampa secuencial de un solo tono, no con la paleta categórica. Extremos redondeados
  4px anclados al cero.
- La columna "% vs ventas" es la que explica el negocio: dale un micro-riel horizontal
  además del número.
- Var% es la única columna con color de estado, y con la regla correcta:
  en líneas de ingreso y de utilidad, crecer es favorable (good);
  en líneas de costo, crecer es desfavorable (critical);
  siempre con flecha ↑/↓ y el signo visible, nunca color solo.
- El resto de importes en tinta normal. NO pintes de rojo todos los negativos.
- Los tres o cuatro desvíos más grandes llevan etiqueta directa; los demás no.

INSIGHT QUE LA VISTA DEBE DEJAR VER
Las ventas crecen 13.15% pero la mano de obra directa crece 24.19%: el margen se sostiene
por volumen, no por eficiencia. Que se lea sin buscarlo.

Al final, agrega un botón "Ver como tabla de datos" que muestre los mismos números en una
tabla HTML plana y accesible.
```

---

## PROMPT 2 — Rentabilidad de la línea de maquila

```
Construye la VISTA 02: rentabilidad de la línea de maquila de FARMAVET, YTD Abril 2026 vs
YTD Abril 2025, en soles (PEN).

QUÉ RESPONDE ESTA VISTA (y qué la diferencia de la vista 01)
Es la misma estructura de costos, pero medida contra las VENTAS DE MAQUILA en lugar de las
ventas totales. Aísla el margen del negocio de maquila y muestra qué componente se lo está
comiendo. La vista tiene que hacer obvio ese cambio de base: dilo en el subtítulo
("base: Ventas Maquila = 100%") y no repitas el layout de la vista 01 tal cual.

ENCABEZADO
- Marca FARMAVET, título "Rentabilidad de maquila · YTD Abril 2026",
  subtítulo "Cada costo medido sobre Ventas Maquila".
- Fila de filtros: Mes (Abr) · Período (YTD) · Año (2026).
- Cifra hero: Utilidad Bruta Maquila 236,600 = 10.83% de ventas maquila,
  contra 13.31% el año anterior. La variación es DESFAVORABLE: −248 puntos base,
  flecha ↓ + etiqueta + color critical. Es el titular de la vista.

DATOS
Línea                           | Actual     | %vsVM  | Anterior   | %vsVM PY | ΔVarAbs  | Var%
Ventas Maquila                  |  2,184,600 | 100.00 |  1,962,300 |  100.00  | +222,300 | 11.33
Costo de Maquila                | -1,948,000 | -89.17 | -1,701,200 |  -86.69  | -246,800 | 14.51
Costo Variable                  | -1,355,100 | -62.03 | -1,118,500 |  -57.00  | -236,600 | 21.15
Mano de obra directa            | -1,058,200 | -48.44 |   -852,100 |  -43.42  | -206,100 | 24.19
Servicios                       |   -206,500 |  -9.45 |   -196,800 |  -10.03  |   -9,700 |  4.93
Materiales e insumos directos   |    -84,300 |  -3.86 |    -61,700 |   -3.14  |  -22,600 | 36.63
Materiales indirectos           |     -6,100 |  -0.28 |     -7,900 |   -0.40  |   +1,800 |-22.78
Costo Fijo                      |   -592,900 | -27.14 |   -582,700 |  -29.69  |  -10,200 |  1.75
Mano de obra indirecta          |   -228,900 | -10.48 |   -239,500 |  -12.21  |  +10,600 | -4.43
Gasto indirecto de fabricación  |   -191,600 |  -8.77 |   -178,300 |   -9.09  |  -13,300 |  7.46
Deprec. de inm, maq. y equipo   |   -172,400 |  -7.89 |   -164,900 |   -8.40  |   -7,500 |  4.55
Utilidad Bruta Maquila          |    236,600 |  10.83 |    261,100 |   13.31  |  -24,500 | -9.38

Jerarquía: Costo de Maquila = Costo Variable + Costo Fijo; dentro de cada uno, sus
componentes ORDENADOS POR PESO descendente (así el problema aparece arriba y no hay que
buscarlo). Utilidad Bruta Maquila = Ventas Maquila + Costo de Maquila.

FORMA PRINCIPAL
La pregunta es "qué componente movió el margen", así que el protagonista NO es la tabla:
es un gráfico de variación en puntos porcentuales sobre ventas maquila, año contra año,
ordenado por impacto. Un componente que sube su peso sobre ventas destruye margen; uno que
baja lo aporta. Los valores:
  Mano de obra directa      +5.02 pp  (destruye)
  Materiales e insumos      +0.72 pp  (destruye)
  Materiales indirectos     -0.12 pp  (aporta)
  Servicios                 -0.58 pp  (aporta)
  Deprec. de inm, maq, eq.  -0.51 pp  (aporta)
  Gasto indirecto de fabr.  -0.32 pp  (aporta)
  Mano de obra indirecta    -1.73 pp  (aporta)
  ---------------------------------------------
  Efecto neto sobre margen  -2.48 pp
Es polaridad, así que usa el par divergente (azul ↔ rojo) con punto medio gris en el cero,
no la paleta categórica. Ordena por magnitud. Etiqueta directa en los tres mayores.
Debajo, la tabla completa de arriba como respaldo del gráfico.

CODIFICACIÓN
- Solo la columna de variación lleva color de estado, con icono y signo.
- Importes en tinta normal.
- La fila "Utilidad Bruta Maquila" se separa con regla hairline y peso tipográfico.

INSIGHT
El margen de maquila cayó 248 puntos base y la mano de obra directa explica 502 de ellos;
todo lo demás compensó parcialmente. Que se lea de una pasada.
```

---

## PROMPT 3 — Estado de situación con comparativo

```
Construye la VISTA 03: estado de situación financiera de FARMAVET, Abril 2026 contra
Abril 2025, en MILES de soles (PEN).

ENCABEZADO
- Marca FARMAVET, título "Estado de situación · Abril 2026", nota de unidad "miles de PEN".
- Fila de filtros: Mes (Abr) · Período (YTD) · Año (2026).
- Dos conmutadores, y que funcionen de verdad:
  · Resumen / Detalle
  · Activo / Pasivo / Patrimonio / Todo  (filtra los bloques visibles)

BLOQUE 1 — comparativo de agregados
Dos series: FECHA_ACTUAL (Abr 2026) y FECHA_ANTERIOR (Abr 2025). Son dos series, así que
leyenda obligatoria y además etiquetado directo. Barras agrupadas (no apiladas: son el
mismo concepto en dos momentos), 2px de superficie entre barras adyacentes, extremos 4px.
Ordena de mayor a menor por valor actual.

Concepto                     | Abr 2026 | Abr 2025
Total Activo                 |   11,625 |   11,615
Total Pasivo y Patrimonio    |   11,625 |   11,615
Total Activo No Corriente    |   10,340 |   10,495
Total Pasivo                 |    9,590 |    9,695
Total Pasivo No Corriente    |    6,180 |    6,455
Total Pasivo Corriente       |    3,410 |    3,240
Total Patrimonio Neto        |    2,035 |    1,920
Total Activo Corriente       |    1,285 |    1,120

Muestra el cuadre de forma explícita: Total Activo = Total Pasivo y Patrimonio (11,625 en
ambos). Un indicador de "cuadrado" con icono + etiqueta, no un color solo.

BLOQUE 2 — apertura del patrimonio neto Abr 2026
Es una descomposición que suma al total, así que va como waterfall, no como barras sueltas:
  Capital                 +10,850
  Resultados del Periodo     +112
  Resultados Acumulados   -8,927
  = Total Patrimonio Neto  2,035
Polaridad (aporta / resta) con el par divergente y punto medio gris en el cero. Conectores
hairline entre pasos. La barra final del total se distingue por peso, no por otro tono.

MODO DETALLE (el conmutador Resumen/Detalle)
En Detalle, cada agregado abre sus componentes:
  Activo Corriente 1,285      = Caja y equivalentes 285 · Cuentas por cobrar 612 ·
                                Inventarios 344 · Otros activos corrientes 44
  Activo No Corriente 10,340  = Inm., maq. y equipo neto 9,480 · Intangibles 415 ·
                                Activo por impuesto diferido 445
  Pasivo Corriente 3,410      = Deuda financiera corto plazo 1,120 ·
                                Cuentas por pagar comerciales 1,684 ·
                                Remuneraciones y tributos 421 · Otros pasivos 185
  Pasivo No Corriente 6,180   = Deuda financiera largo plazo 5,723 ·
                                Pasivo por impuesto diferido 457
Los componentes suman a su agregado; si cambias un número, recuadra el resto.

CODIFICACIÓN
- Series: slot 1 (#3987e5 oscuro / #2a78d6 claro) para Abr 2026 y slot 2
  (#d95926 / #eb6834) para Abr 2025. En orden, sin ciclar.
- Los valores en tinta normal, nunca del color de la serie.
- Tooltip por barra con concepto, ambos períodos, Δ absoluto y Δ%.
- Un solo eje. Nada de doble escala.
```

---

## PROMPT 4 — Ratios financieros con objetivo

```
Construye la VISTA 04: ratios financieros de FARMAVET a Abril 2026 (base YTD), con
objetivo, desvío y semáforo, más análisis DuPont.

ENCABEZADO
- Marca FARMAVET, título "Ratios financieros · Abril 2026".
- Fila de filtros: Mes (Abr) · Año (2026).
- Nota de método: "Ratios sobre resultado YTD; los objetivos vienen de tabla, no están
  fijos en el visual."

BLOQUE 1 — cuatro tarjetas de ratio
Cada tarjeta: nombre, definición en una línea, valor grande, objetivo, desvío absoluto y
porcentual, estado, y una sparkline de la evolución mensual 2026 con la línea de objetivo
como referencia hairline.

Ratio                          | Definición                    | Abr 2026 | Objetivo | Desvío | Desvío % | Regla          | Estado
Apalancamiento sobre Flujos    | Deuda financiera neta / EBITDA |     3.61 |     4.00 |  -0.39 |   -9.75% | menor es mejor | CUMPLE
ROA                            | Resultado YTD / Activo total   |    0.010 |    0.015 | -0.005 |  -33.33% | mayor es mejor | NO CUMPLE
Índice de Endeudamiento        | Pasivo total / Patrimonio       |     4.71 |     3.00 |  +1.71 |  +57.00% | menor es mejor | NO CUMPLE
ROE                            | Resultado YTD / Patrimonio      |    0.055 |    0.050 | +0.005 |  +10.00% | mayor es mejor | CUMPLE

ATENCIÓN — el reporte original tenía un bug aquí: marcaba el índice de endeudamiento en
verde estando 57% por encima de su objetivo, porque comparaba sin considerar que en ese
ratio menor es mejor. Implementa la regla por ratio (columna "Regla") y que el semáforo la
respete. Endeudamiento y apalancamiento: menor es mejor. ROA y ROE: mayor es mejor.

Sparklines (Ene→Abr 2026, ratios acumulados):
  Apalancamiento sobre Flujos: 3.95 · 3.82 · 3.70 · 3.61   (objetivo 4.00)
  ROA:                         0.002 · 0.005 · 0.008 · 0.010 (objetivo 0.015)
  Índice de Endeudamiento:     5.05 · 4.93 · 4.80 · 4.71   (objetivo 3.00)
  ROE:                         0.013 · 0.028 · 0.042 · 0.055 (objetivo 0.050)
Línea de 2px, marcador de 8px solo en el último punto, sin números sobre cada punto.

Semáforo: colores de estado (good #0ca30c / critical #d03b3b) SIEMPRE con icono y con la
palabra CUMPLE / NO CUMPLE. Nunca color solo.

BLOQUE 2 — análisis DuPont
Descompone el retorno sobre activos en margen por rotación, año contra año:
  ROA = ROS (margen de ventas) × Venta/Activo (rotación de activos)

Periodo        | ROS   | Venta/Activo | ROA calculado
YTD Abr 2026   | 0.044 |        0.219 |         0.010
YTD Abr 2025   | 0.038 |        0.194 |         0.007

La multiplicación cuadra: 0.044 × 0.219 = 0.0096 ≈ 0.010; 0.038 × 0.194 = 0.0074 ≈ 0.007.
Muéstralo como dos small multiples (uno por período) con las dos componentes lado a lado y
el ROA resultante como cifra, o como dos barras agrupadas por componente con leyenda. Lo
que NO puedes hacer es meter ROS y rotación en un doble eje: son escalas distintas.
Dos series → leyenda obligatoria y etiquetado directo.

Cierre de la vista, en una línea: el retorno mejora por rotación y por margen a la vez,
pero sigue por debajo del objetivo, y el apalancamiento es lo único que cumple con holgura.

CODIFICACIÓN
- Los valores de ratio y de objetivo en tinta normal; el estado es lo único con color de
  estado. Los colores de estado NO se reutilizan como serie en DuPont: ahí van los slots
  categóricos 1 y 2 en orden.
- Tooltip en cada punto de sparkline: mes, valor, objetivo, desvío.
```

---

## PROMPT 5 — Variación de deuda y líneas bancarias

```
Construye la VISTA 05: posición de deuda financiera de FARMAVET a 2026, en soles (PEN).

ENCABEZADO
- Marca FARMAVET, título "Variación de deuda · 2026".
- Fila de filtros arriba, en una sola línea: Estado (Todas) · Financiamiento (Todas) ·
  Tipo de financiamiento (Todas) · Año (2026).
- Cifra hero: Deuda financiera total 6,842,500. Debajo, en secundario:
  Caja 285,000 → Deuda financiera neta 6,557,500 · Deuda/EBITDA 3.8x.

BLOQUE 1 — composición
Dos cortes de la misma deuda. NO los pongas idénticos ni los mezcles en un gráfico:

Por instrumento:
  Back To Back             5,187,900   75.82%
  Préstamo estructurado    1,654,600   24.18%
  Total                    6,842,500  100.00%

Por plazo:
  Largo plazo              4,462,300   65.21%
  Mediano plazo            2,380,200   34.79%
  Total                    6,842,500  100.00%

Dos categorías por corte: barra apilada horizontal única (100%) por corte, con 2px de
superficie entre segmentos, etiqueta directa dentro del segmento cuando cabe y fuera
cuando no. Slots categóricos 1 y 2 en orden, con leyenda. Nada de dona ni de pastel: dos
categorías se leen mejor en una barra 100% y se comparan entre cortes al estar alineadas.

BLOQUE 2 — Deuda / EBITDA por año
Serie única, así que no lleva leyenda: el título la nombra.
  2023  4.2
  2024  4.6
  2025  3.9
  2026  3.8
Barras verticales o línea de 2px con marcadores de 8px; una referencia hairline en el
covenant 4.0x, etiquetada. 2024 queda por encima del covenant: márcalo con icono +
etiqueta, no solo con color.

BLOQUE 3 — horizonte de pago
Amortizaciones por año, serie única, suma igual al total de deuda:
  2026  1,120,400
  2027  1,860,300
  2028  1,540,900
  2029  1,205,600
  2030  1,115,300
  ----------------
  Total 6,842,500
Barras verticales, rampa secuencial de un solo tono (es magnitud, no identidad), extremos
4px, etiqueta directa en el año más pesado. Muestra el acumulado como línea de referencia
o como cifra al lado, no en un segundo eje.

BLOQUE 4 — disponibilidad de líneas bancarias
La pregunta es "con qué puedo financiar el próximo movimiento", así que lo importante es
lo DISPONIBLE, no lo usado. Barra apilada horizontal por banco (usado + disponible = línea
aprobada), ordenada por disponible descendente, con el % de utilización como etiqueta:

Banco          | Línea aprobada | Usado   | Disponible | Utilización
Banco Andino   |        150,000 |  40,000 |    110,000 |      26.67%
Banco Norte    |        250,000 | 165,000 |     85,000 |      66.00%
Banco Sur      |        150,000 |  92,000 |     58,000 |      61.33%
Total          |        550,000 | 297,000 |    253,000 |      54.00%

Usado y disponible son dos categorías del mismo total: slots 1 y 2 en orden, leyenda
presente, 2px de superficie entre segmentos. El % de utilización en tinta, no en color de
serie.

CODIFICACIÓN GENERAL
- Un solo eje por gráfico. Cuatro bloques, cuatro escalas propias, nunca superpuestas.
- Tooltip por marca en todos los bloques.
- Los importes con tabular-nums en las tablas; la cifra hero con figuras proporcionales.
- Cierre en una línea: la deuda baja y el ratio mejora, pero 2027 concentra el 27% de las
  amortizaciones y solo quedan 253,000 de líneas libres.
```

---

## Después de generar las cinco

- Verifica que ninguna vista use doble eje, que cada una tenga leyenda si hay 2+ series y
  que ningún color de estado se use como serie.
- Captura a 2x y reemplaza los PNG en `assets/img/casos/agrovet-bi/`.
- El texto de la nota al pie de la galería en `casos/agrovet-bi.html` (clave `shotNote`)
  hay que cambiarlo: ya no serán capturas del reporte productivo sino reconstrucciones con
  datos de demostración. Algo como: "Vistas reconstruidas con datos de demostración; la
  estructura, las medidas y la lógica son las del reporte entregado."
