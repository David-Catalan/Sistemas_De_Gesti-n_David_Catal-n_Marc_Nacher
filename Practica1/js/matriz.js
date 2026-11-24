// Lógica de las matrices de decisión (una por empresa)
// Puntuación ponderada = (valoración × peso) / 3

const OPCIONES = [
  { v: 0, t: "0 - No cumple" },
  { v: 1, t: "1 - Parcial" },
  { v: 2, t: "2 - Cumple" },
  { v: 3, t: "3 - Muy bien" }
];

function ponderada(valoracion, peso) {
  return (valoracion * peso) / 3;
}

function euros(n) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formato(n) {
  return n.toFixed(2).replace(".", ",");
}

// Crea un elemento HTML. Usa textContent para no interpretar HTML del texto.
function el(tag, clase, texto) {
  const e = document.createElement(tag);
  if (clase) e.className = clase;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function construirEmpresa(clave) {
  const empresa = EMPRESAS[clave];
  if (!empresa.pesos) {
    empresa.pesos = {};
    CRITERIOS.forEach(function (c) { empresa.pesos[c.id] = c.peso; });
  }
  const seccion = el("section", "panel");
  seccion.id = clave;

  seccion.appendChild(el("h2", "", empresa.nombre));
  seccion.appendChild(el("p", "descripcion", empresa.descripcion));

  // ---------- Matriz ----------
  seccion.appendChild(el("h3", "", "Matriz de decisión"));
  const wrap = el("div", "tabla-wrap");
  const tabla = el("table");

  const thead = el("thead");
  const filaCab = el("tr");
  filaCab.appendChild(el("th", "", "Criterio"));
  filaCab.appendChild(el("th", "", "Peso (%)"));
  ERPS.forEach(function (erp) { filaCab.appendChild(el("th", "", erp)); });
  thead.appendChild(filaCab);
  tabla.appendChild(thead);

  const tbody = el("tbody");
  CRITERIOS.forEach(function (c) {
    const tr = el("tr");
    tr.appendChild(el("td", "criterio", c.nombre));
    const tdPeso = el("td", "peso");
    const inpPeso = el("input");
    inpPeso.type = "number";
    inpPeso.min = "0";
    inpPeso.max = "100";
    inpPeso.step = "1";
    inpPeso.value = empresa.pesos[c.id];
    inpPeso.title = "Peso del criterio (editable)";
    inpPeso.addEventListener("input", function () {
      const v = parseFloat(inpPeso.value);
      empresa.pesos[c.id] = isNaN(v) || v < 0 ? 0 : v;
      recalcular(clave);
    });
    tdPeso.appendChild(inpPeso);
    tr.appendChild(tdPeso);

    ERPS.forEach(function (erp, i) {
      const td = el("td");
      const sel = el("select");
      OPCIONES.forEach(function (o) {
        const opt = el("option", "", o.t);
        opt.value = o.v;
        if (empresa.valoraciones[c.id][i] === o.v) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener("change", function () {
        empresa.valoraciones[c.id][i] = parseInt(sel.value, 10);
        recalcular(clave);
      });
      const puntos = el("span", "puntos");
      puntos.dataset.criterio = c.id;
      puntos.dataset.erp = i;
      td.appendChild(sel);
      td.appendChild(puntos);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);

  const tfoot = el("tfoot");
  const filaTot = el("tr");
  filaTot.appendChild(el("td", "criterio", "PUNTUACIÓN TOTAL PONDERADA"));
  const tdSumaPesos = el("td", "suma-pesos", "100");
  filaTot.appendChild(tdSumaPesos);
  ERPS.forEach(function (erp, i) {
    const td = el("td", "total", "0");
    td.dataset.erp = i;
    filaTot.appendChild(td);
  });
  tfoot.appendChild(filaTot);
  tabla.appendChild(tfoot);

  wrap.appendChild(tabla);
  seccion.appendChild(wrap);

  // ---------- TCO a 5 años ----------
  seccion.appendChild(el("h3", "", "Cálculo del TCO a 5 años"));
  const tco = TCO[clave];
  seccion.appendChild(el("p", "nota", "Supuestos: " + tco.supuestos));
  const wrapT = el("div", "tabla-wrap");
  const tablaT = el("table");
  const filaT = el("tr");
  ["ERP", "Cuota mensual (€)", "Meses", "Implantación y formación (€)", "Extras (€)", "TCO 5 años (€)", "Detalle de la cuota"].forEach(function (t) {
    filaT.appendChild(el("th", "", t));
  });
  const theadT = el("thead");
  theadT.appendChild(filaT);
  tablaT.appendChild(theadT);
  const tbodyT = el("tbody");
  tco.filas.forEach(function (f) {
    const MESES = 60;
    const total = f.cuotaMes * MESES + f.implantacion + f.extras;
    const tr = el("tr");
    tr.appendChild(el("td", "texto", f.erp));
    tr.appendChild(el("td", "", euros(f.cuotaMes)));
    tr.appendChild(el("td", "", String(MESES)));
    tr.appendChild(el("td", "", euros(f.implantacion)));
    tr.appendChild(el("td", "", euros(f.extras)));
    tr.appendChild(el("td", "total", euros(total)));
    tr.appendChild(el("td", "texto", f.detalle));
    tbodyT.appendChild(tr);
  });
  tablaT.appendChild(tbodyT);
  wrapT.appendChild(tablaT);
  seccion.appendChild(wrapT);

  // ---------- Ranking ----------
  seccion.appendChild(el("h3", "", "Resultado"));
  const ranking = el("div", "ranking");
  seccion.appendChild(ranking);
  seccion.appendChild(el("p", "ganador"));

  // ---------- Justificación ----------
  seccion.appendChild(el("h3", "", "Justificación de las puntuaciones"));
  seccion.appendChild(el("p", "nota", "La valoración se toma de la matriz. Si cambias una nota, revisa que la explicación siga siendo coherente (js/datos.js)."));
  const wrapJ = el("div", "tabla-wrap");
  const tablaJ = el("table", "justificacion");
  const theadJ = el("thead");
  const filaJ = el("tr");
  ["Criterio", "Qué necesita la empresa", "ERP", "Valoración", "Información encontrada", "Fuente"].forEach(function (t) {
    filaJ.appendChild(el("th", "", t));
  });
  theadJ.appendChild(filaJ);
  tablaJ.appendChild(theadJ);
  tablaJ.appendChild(el("tbody"));
  wrapJ.appendChild(tablaJ);
  seccion.appendChild(wrapJ);

  // ---------- Decisión final ----------
  seccion.appendChild(el("h3", "", "Decisión final"));
  const decision = DECISION[clave];
  const cajaDec = el("div", "decision");
  const pElegido = el("p");
  pElegido.appendChild(el("strong", "", "ERP elegido: "));
  pElegido.appendChild(document.createTextNode(decision.erp));
  cajaDec.appendChild(pElegido);
  cajaDec.appendChild(el("p", "", decision.argumento));
  decision.preguntas.forEach(function (p) {
    cajaDec.appendChild(el("p", "pregunta", p.pregunta));
    cajaDec.appendChild(el("p", "", p.respuesta));
  });
  seccion.appendChild(cajaDec);

  return seccion;
}

function recalcular(clave) {
  const empresa = EMPRESAS[clave];
  const seccion = document.getElementById(clave);
  const totales = ERPS.map(function () { return 0; });

  let sumaPesos = 0;
  CRITERIOS.forEach(function (c) { sumaPesos += empresa.pesos[c.id]; });
  const celdaSuma = seccion.querySelector("td.suma-pesos");
  celdaSuma.textContent = String(sumaPesos);
  celdaSuma.title = sumaPesos === 100 ? "" : "Los pesos deberían sumar 100";
  celdaSuma.style.color = sumaPesos === 100 ? "" : "#b00020";

  CRITERIOS.forEach(function (c) {
    ERPS.forEach(function (erp, i) {
      const pts = ponderada(empresa.valoraciones[c.id][i], empresa.pesos[c.id]);
      totales[i] += pts;
      const span = seccion.querySelector('.puntos[data-criterio="' + c.id + '"][data-erp="' + i + '"]');
      span.textContent = formato(pts) + " pts";
    });
  });

  totales.forEach(function (t, i) {
    seccion.querySelector('td.total[data-erp="' + i + '"]').textContent = formato(t);
  });

  pintarRanking(seccion, totales);
  pintarJustificacion(clave, seccion);
}

function pintarRanking(seccion, totales) {
  const orden = ERPS.map(function (erp, i) { return { erp: erp, total: totales[i] }; })
    .sort(function (a, b) { return b.total - a.total; });

  const ranking = seccion.querySelector(".ranking");
  ranking.textContent = "";
  orden.forEach(function (item, pos) {
    const fila = el("div", "barra-fila");
    fila.appendChild(el("span", "barra-nombre", item.erp));
    const fondo = el("div", "barra-fondo");
    const barra = el("div", pos === 0 ? "barra mejor" : "barra");
    barra.style.width = item.total + "%";
    fondo.appendChild(barra);
    fila.appendChild(fondo);
    fila.appendChild(el("span", "barra-valor", formato(item.total)));
    ranking.appendChild(fila);
  });

  const ganador = seccion.querySelector(".ganador");
  if (orden[0].total === orden[1].total) {
    ganador.textContent = "Empate en cabeza entre " + orden[0].erp + " y " + orden[1].erp +
      " (" + formato(orden[0].total) + "). Hay que desempatar con la justificación cualitativa.";
  } else {
    ganador.textContent = "Mejor puntuación: " + orden[0].erp + " (" + formato(orden[0].total) +
      " / 100). La decisión final debe justificarse según las necesidades de la empresa.";
  }
}

function pintarJustificacion(clave, seccion) {
  const tbody = seccion.querySelector("table.justificacion tbody");
  tbody.textContent = "";
  CRITERIOS.forEach(function (c) {
    ERPS.forEach(function (erp, i) {
      const j = JUSTIFICACION[clave][c.id][i];
      const tr = el("tr");
      if (i === 0) {
        const tdC = el("td", "texto", c.nombre);
        tdC.rowSpan = ERPS.length;
        tr.appendChild(tdC);
        const tdN = el("td", "texto", NECESIDADES[clave][c.id]);
        tdN.rowSpan = ERPS.length;
        tr.appendChild(tdN);
      }
      tr.appendChild(el("td", "", erp));
      tr.appendChild(el("td", "", String(EMPRESAS[clave].valoraciones[c.id][i])));
      tr.appendChild(el("td", "texto" + (j.info.indexOf("PENDIENTE") === 0 ? " pendiente" : ""), j.info));
      tr.appendChild(el("td", "texto" + (j.fuente ? "" : " pendiente"), j.fuente || "PENDIENTE"));
      tbody.appendChild(tr);
    });
  });
}

// Aviso con lo que falta por rellenar
function contarPendientes() {
  let n = 0;
  Object.keys(EMPRESAS).forEach(function (clave) {
    CRITERIOS.forEach(function (c) {
      ERPS.forEach(function (erp, i) {
        const j = JUSTIFICACION[clave][c.id][i];
        if (j.info.indexOf("PENDIENTE") === 0 || !j.fuente) n++;
      });
    });
    const d = DECISION[clave];
    if (d.erp === "PENDIENTE") n++;
    if (d.argumento.indexOf("PENDIENTE") === 0) n++;
    d.preguntas.forEach(function (p) { if (p.respuesta === "PENDIENTE") n++; });
  });
  return n;
}

function iniciar() {
  const contenedor = document.getElementById("empresas");
  const indice = document.getElementById("indice");

  Object.keys(EMPRESAS).forEach(function (clave) {
    contenedor.appendChild(construirEmpresa(clave));
    const enlace = el("a", "", EMPRESAS[clave].nombre);
    enlace.href = "#" + clave;
    indice.appendChild(enlace);
    recalcular(clave);
  });

  const n = contarPendientes();
  const aviso = document.getElementById("aviso-pendientes");
  aviso.textContent = n > 0
    ? "Quedan " + n + " campos marcados como PENDIENTE (justificaciones, fuentes y decisión final) en js/datos.js."
    : "Todos los campos de justificación y decisión están rellenos.";
}

iniciar();
