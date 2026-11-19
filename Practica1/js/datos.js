// =====================================================================
// DATOS DE LA ACTIVIDAD
// =====================================================================
// IMPORTANTE: las valoraciones de este fichero son una PROPUESTA INICIAL.
// La rúbrica penaliza las "puntuaciones arbitrarias": tienes que investigar,
// contrastar con fuentes oficiales, ajustar las notas con tu criterio y
// rellenar TODOS los campos que pongan "PENDIENTE".
// =====================================================================

// Los 3 ERP de la matriz del enunciado y de la rúbrica
const ERPS = ["Odoo Enterprise", "Holded", "MS Dynamics 365 Business Central"];

// Criterios y pesos (suman 100), tal y como indica el enunciado
const CRITERIOS = [
  { id: "funcional", nombre: "Cobertura funcional (almacén, compras, ventas, CRM y contabilidad)", peso: 30 },
  { id: "tco",       nombre: "Coste total de propiedad (TCO) a 5 años",                            peso: 25 },
  { id: "integr",    nombre: "Capacidad de integración con otros programas y sistemas",            peso: 15 },
  { id: "uso",       nombre: "Facilidad de uso, aprendizaje y aplicación móvil",                   peso: 10 },
  { id: "normativa", nombre: "Adaptación a la normativa española (PGC, IVA, VeriFactu, factura electrónica)", peso: 10 },
  { id: "partners",  nombre: "Disponibilidad de partners, implantadores y soporte en la zona",     peso: 10 }
];

// Una matriz independiente por empresa.
// Orden de las valoraciones = orden de ERPS: [Odoo, Holded, Business Central]
// Escala: 0 No cumple · 1 Parcial · 2 Cumple · 3 Cumple muy bien
const EMPRESAS = {
  empresa1: {
    nombre: "Empresa 1 - Supermercado La Plaza",
    descripcion: "5 empleados, 1 tienda de 250 m², 650.000 €/año, 2.500 referencias, 40 proveedores, presupuesto tecnológico muy limitado.",
    valoraciones: {
      funcional: [3, 2, 2],
      tco:       [2, 3, 1],
      integr:    [3, 2, 2],
      uso:       [2, 3, 2],
      normativa: [2, 3, 2],
      partners:  [2, 2, 3]
    }
  },
  empresa2: {
    nombre: "Empresa 2 - Reformas Levante",
    descripcion: "45 empleados, 6 M€/año, 15-20 obras simultáneas, 120 proveedores, 25 subcontratas, 2 delegaciones (Valencia y Castellón).",
    valoraciones: {
      funcional: [3, 1, 2],
      tco:       [2, 2, 2],
      integr:    [3, 1, 3],
      uso:       [2, 2, 2],
      normativa: [2, 3, 2],
      partners:  [2, 1, 3]
    }
  }
};

// Qué necesita cada empresa en cada criterio (sale del enunciado).
// Sirve para relacionar cada nota con las necesidades de la empresa.
const NECESIDADES = {
  empresa1: {
    funcional: "TPV integrado con inventario, compras y proveedores, control de existencias y caducidades, ventas y facturación, informes de ventas y márgenes.",
    tco:       "Presupuesto tecnológico muy limitado y solo 5 usuarios: el coste a 5 años pesa mucho.",
    integr:    "La caja registradora y el programa de facturación hoy no están integrados; los pedidos van por teléfono/WhatsApp.",
    uso:       "Equipo muy pequeño sin personal técnico; los dueños quieren consultar ventas y márgenes sin estar en la tienda.",
    normativa: "Cumplimiento de la normativa fiscal española (IVA, VeriFactu, factura electrónica).",
    partners:  "Pueblo de unos 4.000 habitantes: necesita soporte accesible y barato."
  },
  empresa2: {
    funcional: "CRM, presupuestos detallados, compras, inventario por obra, contabilidad analítica, horas de trabajadores y subcontratas, certificaciones y cobros por obra.",
    tco:       "45 empleados y 6 M€ de facturación: puede asumir una inversión media, pero con retorno claro (control de costes por obra).",
    integr:    "Hoy la información está dispersa entre Excel y correos; necesita conectar CRM, compras, contabilidad y proyectos.",
    uso:       "Jefes de obra que necesitan acceso móvil para registrar horas, materiales y avance.",
    normativa: "Facturación con certificaciones a clientes particulares y empresas, con IVA y VeriFactu.",
    partners:  "Opera en Valencia y Castellón: necesita partners que implanten y adapten el ERP a gestión de obras."
  }
};

// Justificación: UNA entrada por ERP y criterio (3 ERP x 6 criterios x 2 empresas).
// Rellena "info" con lo que has encontrado y "fuente" con la URL.
// La valoración que se muestra en la tabla sale automáticamente de la matriz.
function pendiente() {
  return { info: "PENDIENTE: investigar y explicar la nota.", fuente: "" };
}
function crearJustificacion() {
  const r = {};
  Object.keys(EMPRESAS).forEach(function (emp) {
    r[emp] = {};
    CRITERIOS.forEach(function (c) {
      r[emp][c.id] = ERPS.map(pendiente);
    });
  });
  return r;
}
const JUSTIFICACION = crearJustificacion();

// Ejemplo de cómo rellenar una entrada (bórralo o sustitúyelo por tu investigación):
// JUSTIFICACION.empresa1.funcional[0] = {
//   info: "Odoo dispone de módulos de TPV e inventario con lotes y caducidades ...",
//   fuente: "https://www.odoo.com/..."
// };

// Decisión final por empresa, con las preguntas del enunciado.
const DECISION = {
  empresa1: {
    erp: "PENDIENTE",
    argumento: "PENDIENTE: explica por qué es la mejor alternativa para el supermercado.",
    preguntas: [
      { pregunta: "¿Tiene sentido implantar un ERP completo como SAP Business One o Microsoft Business Central en un negocio tan pequeño?", respuesta: "PENDIENTE" },
      { pregunta: "¿Podría ser suficiente una solución más económica y sencilla como Holded?", respuesta: "PENDIENTE" },
      { pregunta: "¿Odoo permitiría cubrir mejor las necesidades de inventario y TPV?", respuesta: "PENDIENTE" }
    ]
  },
  empresa2: {
    erp: "PENDIENTE",
    argumento: "PENDIENTE: explica por qué es la mejor alternativa para la empresa de reformas.",
    preguntas: [
      { pregunta: "¿Es suficiente un ERP generalista como Odoo o Business Central?", respuesta: "PENDIENTE" },
      { pregunta: "¿Necesita la empresa un software especializado en gestión de obras?", respuesta: "PENDIENTE" },
      { pregunta: "¿Qué importancia tiene la posibilidad de personalizar el ERP para adaptarlo a la gestión de proyectos?", respuesta: "PENDIENTE" }
    ]
  }
};
