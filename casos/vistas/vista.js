/* ============================================================
   PRIMITIVAS DE LAS VISTAS — FARMAVET
   Cada forma de grafico se construye aqui una sola vez y las cinco
   vistas la reusan. Sin dependencias externas.
   ============================================================ */
(function(g){
'use strict';

/* ---------- formato ---------- */
var MIN = '−';                                  /* menos tipografico */
function n0(v){ return (v<0?MIN:'') + Math.abs(v).toLocaleString('en-US'); }
function sg(v){ return (v>=0?'+':MIN) + Math.abs(v).toLocaleString('en-US'); }
function pc(v,d){ return v.toFixed(d===undefined?2:d) + ' %'; }
function spp(v,d){ return (v>=0?'+':MIN) + Math.abs(v).toFixed(d===undefined?2:d); }
function el(tag,cls,txt){
  var e=document.createElement(tag);
  if(cls) e.className=cls;
  if(txt!==undefined) e.textContent=txt;
  return e;
}

/* ---------- tooltip ----------
   Capa propia y no el title del navegador: el title tarda ~1s, no se
   puede estilar y no existe en touch. */
var tip;
function ensureTip(){
  if(tip) return tip;
  tip = document.getElementById('tip');
  if(!tip){
    tip = el('div'); tip.id='tip'; tip.setAttribute('role','tooltip');
    document.body.appendChild(tip);
  }
  return tip;
}
function bindTip(node, title, pairs){
  var t = ensureTip();
  node.addEventListener('pointerenter', function(){
    var h = '<b>'+title+'</b><dl>';
    var p = typeof pairs === 'function' ? pairs() : pairs;
    for(var i=0;i<p.length;i++) h += '<dt>'+p[i][0]+'</dt><dd>'+p[i][1]+'</dd>';
    t.innerHTML = h+'</dl>';
    t.classList.add('on');
  });
  node.addEventListener('pointermove', function(ev){
    var pad=14, w=t.offsetWidth, h=t.offsetHeight;
    var x=ev.clientX+pad, y=ev.clientY+pad;
    if(x+w > innerWidth-8)  x = ev.clientX-w-pad;
    if(y+h > innerHeight-8) y = ev.clientY-h-pad;
    t.style.left = Math.max(8,x)+'px';
    t.style.top  = Math.max(8,y)+'px';
  });
  node.addEventListener('pointerleave', function(){ t.classList.remove('on'); });
}

/* ---------- tira de KPIs ----------
   items: {k, v, u, m, chip:{t,c}, mark:'lead'|'leadg', tip:[titulo,pares]} */
function kpis(host, items){
  host.style.setProperty('--n', items.length);
  items.forEach(function(c){
    var d = el('div','kpi'+(c.mark?' '+c.mark:''));
    d.appendChild(el('div','kpi-k',c.k));
    var v = el('div','kpi-v');
    v.appendChild(el('span','num',c.v));
    if(c.u) v.appendChild(el('span','kpi-u',c.u));
    d.appendChild(v);
    var m = el('div','kpi-m');
    if(c.chip) m.appendChild(el('span','chip '+c.chip.c, c.chip.t));
    if(c.m) m.appendChild(el('span',null,c.m));
    d.appendChild(m);
    if(c.tip) bindTip(d, c.tip[0], c.tip[1]);
    host.appendChild(d);
  });
}

/* ---------- barras divergentes con eje (tornado) ----------
   cfg: {items:[{name,v,tip}], lo, hi, ticks, unit, posLabel, negLabel, dec} */
function tornado(host, cfg){
  var LO=cfg.lo, HI=cfg.hi, SPAN=HI-LO, dec = cfg.dec===undefined?2:cfg.dec;
  var x = function(v){ return (v-LO)/SPAN*100; };
  var zero = x(0);
  /* las tres mayores por magnitud llevan enfasis; el eje deja legible el resto */
  var mags = cfg.items.map(function(i){ return Math.abs(i.v); }).sort(function(a,b){ return b-a; });
  var cut = mags[Math.min(2, mags.length-1)];

  cfg.items.forEach(function(it){
    var pos = it.v > 0, w = Math.abs(it.v)/SPAN*100;
    var row = el('div','tor-row'+(Math.abs(it.v)>=cut?' hi':''));
    row.appendChild(el('div','tor-name',it.name));
    row.appendChild(el('div','tor-val',spp(it.v,dec)+(cfg.unit?' '+cfg.unit:'')));
    var plot = el('div','plot');
    cfg.ticks.forEach(function(t){
      var gl = el('div','gl'+(t===0?' zero':''));
      gl.style.left = x(t)+'%';
      plot.appendChild(gl);
    });
    var bar = el('div','bar '+(pos?'pos':'neg'));
    bar.style.left = (pos?zero:zero-w)+'%';
    bar.style.width = w+'%';
    plot.appendChild(bar);
    row.appendChild(plot);
    if(it.tip) bindTip(row, it.name, it.tip);
    host.appendChild(row);
  });

  var ax = el('div','tor-row');
  ax.appendChild(el('div',null,'')); ax.appendChild(el('div',null,''));
  var axis = el('div','axis');
  cfg.ticks.forEach(function(t){
    var s = el('span','num',(t>0?'+':t<0?MIN:'')+Math.abs(t));
    s.style.left = x(t)+'%';
    axis.appendChild(s);
  });
  ax.appendChild(axis);
  host.appendChild(ax);
  if(cfg.axisLabel){
    var at = el('div','tor-row');
    at.appendChild(el('div',null,'')); at.appendChild(el('div',null,''));
    at.appendChild(el('div','axis-t',cfg.axisLabel));
    host.appendChild(at);
  }
}

/* ---------- barras horizontales agrupadas ----------
   groups: [{k, chip:{t,c}, rows:[{k,v,color,label,tip}]}], max = dominio */
function grouped(host, groups, max){
  groups.forEach(function(g2){
    var box = el('div','grp');
    var head = el('div','grp-k');
    head.appendChild(el('span',null,g2.k));
    if(g2.chip) head.appendChild(el('span','chip '+g2.chip.c, g2.chip.t));
    box.appendChild(head);
    g2.rows.forEach(function(r){
      var row = el('div','grow');
      row.appendChild(el('div','grow-k',r.k));
      var p = el('div','grow-p');
      p.appendChild(el('div','track'));
      var f = el('div','fill');
      f.style.width = Math.max(0.6, Math.abs(r.v)/max*100)+'%';
      f.style.background = r.color;
      p.appendChild(f);
      row.appendChild(p);
      row.appendChild(el('div','grow-v',r.label));
      if(r.tip) bindTip(row, g2.k+' · '+r.k, r.tip);
      box.appendChild(row);
    });
    host.appendChild(box);
  });
}

/* ---------- cascada ----------
   steps: [{k, v, kind:'base'|'delta'|'total', label, tip}]
   El acumulado se calcula solo; los 'total' se dibujan desde cero. */
function waterfall(host, steps, opt){
  opt = opt || {};
  var run = 0, lo = 0, hi = 0, pts = [];
  steps.forEach(function(s){
    if(s.kind === 'delta'){ var a=run, b=run+s.v; run=b; pts.push([a,b]); }
    else { run = s.v; pts.push([0, s.v]); }
    lo = Math.min(lo, run); hi = Math.max(hi, run);
  });
  var pad = (hi-lo)*0.04 || 1;
  var LO = lo-pad, HI = hi+pad, SPAN = HI-LO;
  var x = function(v){ return (v-LO)/SPAN*100; };

  steps.forEach(function(s,i){
    var a = pts[i][0], b = pts[i][1];
    var row = el('div','wf-row'+(s.kind==='total'?' tot':''));
    row.appendChild(el('div','wf-k',s.k));
    var p = el('div','wf-p');
    var z = el('div','gl zero'); z.style.left = x(0)+'%'; p.appendChild(z);
    var bar = el('div','wf-b');
    bar.style.left = x(Math.min(a,b))+'%';
    bar.style.width = Math.max(0.5, Math.abs(x(b)-x(a)))+'%';
    /* aporta / resta con el par divergente; los totales en tono neutro fuerte */
    bar.style.background = s.kind==='delta'
      ? (s.v >= 0 ? 'var(--div-pos)' : 'var(--div-neg)')
      : 'var(--seq-2)';
    p.appendChild(bar);
    /* conector hasta el paso siguiente */
    if(i < steps.length-1){
      var c = el('div','wf-c');
      c.style.left = x(Math.min(b, Math.max(a,b)))+'%';
      c.style.width = '0';
      c.style.left = x(b)+'%';
      c.style.right = (100-x(b))+'%';
      p.appendChild(c);
    }
    row.appendChild(p);
    row.appendChild(el('div','wf-v',s.label));
    if(s.tip) bindTip(row, s.k, s.tip);
    host.appendChild(row);
  });
  if(opt.axisLabel){
    var at = el('div','wf-row');
    at.appendChild(el('div',null,''));
    at.appendChild(el('div','axis-t',opt.axisLabel));
    at.appendChild(el('div',null,''));
    host.appendChild(at);
  }
}

/* ---------- barra apilada 100 % ----------
   bars: [{k, segs:[{k,v,pct,color,tip}]}] */
function stack100(host, bars){
  bars.forEach(function(b){
    var box = el('div','st');
    box.appendChild(el('div','st-k',b.k));
    var bar = el('div','st-bar');
    b.segs.forEach(function(s){
      var seg = el('div','st-seg', s.pct >= 12 ? s.pct.toFixed(2)+' %' : '');
      seg.style.width = s.pct+'%';
      seg.style.background = s.color;
      if(s.tip) bindTip(seg, b.k+' · '+s.k, s.tip);
      bar.appendChild(seg);
    });
    box.appendChild(bar);
    var lg = el('div','st-legend');
    b.segs.forEach(function(s){
      var sp = el('span');
      var i = el('i','sw'); i.style.background = s.color;
      sp.appendChild(i);
      sp.appendChild(document.createTextNode(s.k+' · '+s.label));
      lg.appendChild(sp);
    });
    box.appendChild(lg);
    host.appendChild(box);
  });
}

/* ---------- columnas verticales ----------
   items: [{x, v, label, color, tip}]  opt: {max, ref:{v,label}} */
function vbars(host, items, opt){
  opt = opt || {};
  var top = opt.max || Math.max.apply(null, items.map(function(i){ return Math.abs(i.v); }));
  if(opt.ref) top = Math.max(top, Math.abs(opt.ref.v));
  /* 15 % de aire arriba para que la etiqueta del valor mas alto no se corte.
     Un solo dominio para barras, etiquetas y referencia. */
  var dom = top * 1.15;
  var pct = function(v){ return Math.abs(v)/dom*100; };

  /* con referencia, el plot reserva un canal a la derecha para su etiqueta */
  var plot = el('div','vb'+(opt.ref?' has-ref':''));
  if(opt.ref){
    var ref = el('div','vb-ref');
    ref.style.bottom = pct(opt.ref.v)+'%';
    ref.appendChild(el('b',null,opt.ref.label));
    plot.appendChild(ref);
  }
  items.forEach(function(it){
    var h = pct(it.v);
    var col = el('div','vb-col');
    var b = el('div','vb-b');
    b.style.height = Math.max(1.5, h)+'%';
    b.style.background = it.color || 'var(--seq-1)';
    col.appendChild(b);
    var lbl = el('div','vb-v',it.label);
    lbl.style.bottom = 'calc('+h+'% + 5px)';
    col.appendChild(lbl);
    if(it.tip) bindTip(col, it.x, it.tip);
    plot.appendChild(col);
  });
  host.appendChild(plot);
  /* el eje copia el canal para que cada etiqueta siga centrada en su columna */
  var ax = el('div','vb-x'+(opt.ref?' has-ref':''));
  items.forEach(function(it){ ax.appendChild(el('span',null,it.x)); });
  host.appendChild(ax);
}

/* ---------- sparkline con linea de objetivo ----------
   Devuelve el SVG como string. Marcador solo en el ultimo punto: un numero
   sobre cada punto seria ruido. */
function spark(vals, target, ok){
  var W=100, H=34, all = vals.concat([target]);
  var lo = Math.min.apply(null, all), hi = Math.max.apply(null, all);
  var span = (hi-lo) || 1;
  var pad = span*0.18;
  lo -= pad; hi += pad; span = hi-lo;
  var X = function(i){ return vals.length<2 ? 0 : i/(vals.length-1)*W; };
  var Y = function(v){ return H - (v-lo)/span*H; };
  var d = vals.map(function(v,i){ return (i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1); }).join(' ');
  var ty = Y(target).toFixed(1);
  var col = ok ? 'var(--good)' : 'var(--crit)';
  /* El SVG se estira al ancho de la tarjeta (preserveAspectRatio="none") para que
     la linea llene el espacio. Un <circle> dentro saldria eliptico, asi que el
     marcador del ultimo punto va como elemento HTML encima: nunca se deforma. */
  var topPct = (Y(vals[vals.length-1]) / H * 100).toFixed(2);
  return '<span style="position:relative;display:block">'
    + '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" aria-hidden="true">'
    +   '<line x1="0" y1="'+ty+'" x2="'+W+'" y2="'+ty+'" stroke="var(--baseline)" '
    +     'stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/>'
    +   '<path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="2" '
    +     'stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>'
    + '</svg>'
    + '<i style="position:absolute;right:0;top:'+topPct+'%;width:8px;height:8px;'
    +   'margin:-4px -1px 0 0;border-radius:50%;background:'+col+';'
    +   'box-shadow:0 0 0 2px var(--surface)"></i>'
    + '</span>';
}

/* ---------- barra dentro de la celda, anclada al cero ----------
   Ingresos a la derecha, costos a la izquierda. Magnitud: rampa de un tono. */
function cellBar(v, max, color){
  var span = max*2, zero = 50;
  var w = Math.min(50, Math.abs(v)/span*100);
  var wrap = el('span','cell');
  var z = el('span','z'); z.style.left = zero+'%'; wrap.appendChild(z);
  var b = el('span','cb');
  if(v >= 0){ b.style.left = zero+'%'; b.style.borderRadius='0 4px 4px 0'; }
  else      { b.style.left = (zero-w)+'%'; b.style.borderRadius='4px 0 0 4px'; }
  b.style.width = Math.max(v===0?0:0.4, w)+'%';
  b.style.background = color || 'var(--seq-1)';
  wrap.appendChild(b);
  var lbl = el('span','cv', n0(v));
  if(v >= 0) lbl.style.left = 'calc('+(zero+w)+'% + 7px)';
  else       lbl.style.right = 'calc('+(100-zero+w)+'% + 7px)';
  wrap.appendChild(lbl);
  return wrap;
}

/* ---------- riel de porcentaje ---------- */
function railPct(pv, color){
  var rail = el('div','rail');
  var t = el('span','rail-t');
  var f = el('span','rail-f');
  f.style.width = Math.min(100, Math.abs(pv))+'%';
  f.style.background = color || 'var(--seq-1)';
  t.appendChild(f);
  rail.appendChild(t);
  rail.appendChild(el('span','rail-v', pc(pv)));
  return rail;
}

/* ---------- chip de variacion ----------
   fav decide el color; siempre con flecha y signo, nunca color solo. */
function varChip(v, fav, unit){
  var c = el('span','chip '+(fav?'g':'b'));
  c.textContent = (v>0?'↑ +':'↓ '+MIN)+Math.abs(v).toFixed(2)+(unit||' %');
  return c;
}

/* ---------- jerarquia colapsable ---------- */
function makeToggle(tr, name, childLvl){
  var b = el('button','tog','▾');
  b.type='button';
  b.setAttribute('aria-expanded','true');
  b.setAttribute('aria-label','Colapsar '+name);
  b.onclick = function(){
    var open = b.getAttribute('aria-expanded')==='true';
    b.setAttribute('aria-expanded', open?'false':'true');
    b.setAttribute('aria-label',(open?'Expandir ':'Colapsar ')+name);
    b.textContent = open ? '▸' : '▾';
    var n = tr.nextElementSibling;
    while(n && +n.dataset.lvl >= childLvl){ n.style.display = open?'none':''; n = n.nextElementSibling; }
  };
  return b;
}

/* ---------- tema ---------- */
function themeBtn(id){
  var b = document.getElementById(id||'themeBtn');
  if(!b) return;
  b.onclick = function(){
    var r = document.documentElement;
    var cur = r.getAttribute('data-theme')
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    r.setAttribute('data-theme', cur==='dark' ? 'light' : 'dark');
  };
}

g.V = { MIN:MIN, n0:n0, sg:sg, pc:pc, spp:spp, el:el, bindTip:bindTip,
        kpis:kpis, tornado:tornado, grouped:grouped, waterfall:waterfall,
        stack100:stack100, vbars:vbars, spark:spark, cellBar:cellBar,
        railPct:railPct, varChip:varChip, makeToggle:makeToggle, themeBtn:themeBtn };
})(window);
