// =====================================================================
// DATOS DE LA ACTIVIDAD
// =====================================================================
// Investigación realizada en noviembre de 2026 (ver fuentes en cada fila).
// Limitaciones que conviene conocer antes del oral:
//  - odoo.com bloquea la lectura automática, así que los precios de Odoo salen
//    de oec.sh (agregador de terceros) y hay funciones de Odoo sin verificar
//    en su web oficial. Está indicado en cada fila afectada.
//  - Los costes de implantación y formación son SUPUESTOS propios (ver TCO).
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
      funcional: [3, 2, 1],
      tco:       [2, 3, 1],
      integr:    [3, 2, 2],
      uso:       [2, 3, 2],
      normativa: [2, 3, 1],
      partners:  [3, 2, 3]
    }
  },
  empresa2: {
    nombre: "Empresa 2 - Reformas Levante",
    descripcion: "45 empleados, 6 M€/año, 15-20 obras simultáneas, 120 proveedores, 25 subcontratas, 2 delegaciones (Valencia y Castellón).",
    valoraciones: {
      funcional: [3, 2, 2],
      tco:       [2, 3, 1],
      integr:    [3, 2, 3],
      uso:       [2, 2, 2],
      normativa: [3, 3, 2],
      partners:  [3, 1, 3]
    }
  }
};

// Qué necesita cada empresa en cada criterio (sale del enunciado).
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

// ---------------------------------------------------------------------
// FUENTES (URLs consultadas)
// ---------------------------------------------------------------------
const F = {
  holdedPrecios:  "https://www.holded.com/es/precios",
  holdedFunc:     "https://www.holded.com/es/funcionalidades",
  holdedTPV:      "https://www.holded.com/es/tpv-software",
  holdedAses:     "https://www.holded.com/es/directorio-asesorias/provincia-de-valencia",
  odooCaduc:      "https://www.odoo.com/documentation/master/applications/inventory_and_mrp/inventory/product_management/product_tracking/expiration_dates.html",
  odooForoVF:     "https://www.odoo.com/forum/help-1/verifactu-module-in-oca-for-spain-281166",
  odooPreciosES:  "https://oec.sh/odoo-pricing/spain",
  odooPreciosUS:  "https://oec.sh/odoo-pricing/enterprise",
  odooPartners:   "https://erpresearch.com/odoo-partners/spain",
  odooImpl:       "https://octurasolutions.com/resources/how-much-does-odoo-cost-per-month-2026",
  odooProyectos:  "https://handbook.coopdevs.org/Administracio/analysis-de-projectes-en-odoo",
  odooPOSApp:     "https://apps.apple.com/at/app/odoo-pos-app/id1489716145",
  odooPOSVF:      "https://apps.odoo.com/apps/modules/16.0/l10n_es_verifactu_POS",
  odooPOSCaduc:   "https://apps.odoo.com/apps/modules/19.0/pos_fefo_expiry",
  bcPrecios:      "https://www.microsoft.com/en-au/dynamics-365/products/business-central/pricing",
  bcPrecios2:     "https://gloriumtech.com/dynamics-365-business-central-pricing-guide/",
  bcVF:           "https://learn.microsoft.com/en-ie/dynamics365/business-central/localfunctionality/spain/verifactu-setup",
  bcVFEmbedded:   "https://learn.microsoft.com/en-us/dynamics365/release-plan/2026wave1/smb/dynamics365-business-central/enable-embedded-verifactu-mode-spain",
  bcProyectos:    "https://learn.microsoft.com/en-us/training/modules/intro-dynamics-365-business-central/8-administer-jobs",
  bcMovil:        "https://syvantis.com/blog/erp-on-the-go-the-dynamics-365-business-central-mobile-experience",
  lsCentral:      "https://help.lscentral.lsretail.com/Content/Localization/Spain.htm",
  bcPartner:      "https://erpresearch.com/dynamics-partners/laberit-sistemas-s-l",
  verifactuFechas:"https://www.legaltoday.com/actualidad-juridica/noticias-de-derecho/nueva-prorroga-verifactu-no-sera-obligatorio-hasta-2027-para-sociedades-y-otros-contribuyentes-2025-12-04/"
};

// ---------------------------------------------------------------------
// TCO A 5 AÑOS (60 meses). Precios de lista, sin IVA.
// total = cuota mensual x 60 + implantación/formación + extras
// Las columnas implantacion y extras son SUPUESTOS propios (ver "supuestos").
// ---------------------------------------------------------------------
const TCO = {
  empresa1: {
    supuestos: "5 usuarios. Odoo Standard; Holded Estándar + 1 usuario extra + Inventario + TPV; Business Central Essentials (≈80 USD/usuario/mes tomado como ≈80 €). Implantación y formación estimadas por mí: Odoo 4.000 €, Holded 500 €, Business Central 10.000 € + 3.000 € de TPV de terceros. No incluye hardware de caja (igual en las tres).",
    filas: [
      { erp: "Odoo Enterprise", cuotaMes: 124.5, implantacion: 4000,  extras: 0,    detalle: "5 × 24,90 € (Standard, lista anual)" },
      { erp: "Holded",          cuotaMes: 119,   implantacion: 500,   extras: 0,    detalle: "59 (Estándar, 4 usuarios) + 10 (1 usuario extra) + 25 (Inventario) + 25 (TPV)" },
      { erp: "MS Dynamics 365 Business Central", cuotaMes: 400, implantacion: 10000, extras: 3000, detalle: "5 × ≈80 € (Essentials); extras = TPV de terceros" }
    ]
  },
  empresa2: {
    supuestos: "20 usuarios con licencia completa (de 45 empleados; se supone que el resto solo registra horas). Odoo Custom; Holded Avanzado + 13 usuarios extra + Inventario; Business Central Essentials. Implantación y formación estimadas por mí: Odoo 28.000 €, Holded 3.000 €, Business Central 35.000 € + 3.000 € de formación.",
    filas: [
      { erp: "Odoo Enterprise", cuotaMes: 898,  implantacion: 28000, extras: 0,    detalle: "20 × 44,90 € (Custom, lista anual; incluye Studio)" },
      { erp: "Holded",          cuotaMes: 254,  implantacion: 3000,  extras: 0,    detalle: "99 (Avanzado, 7 usuarios) + 130 (13 extra × 10) + 25 (Inventario)" },
      { erp: "MS Dynamics 365 Business Central", cuotaMes: 1600, implantacion: 35000, extras: 3000, detalle: "20 × ≈80 € (Essentials); extras = formación" }
    ]
  }
};

// ---------------------------------------------------------------------
// JUSTIFICACIÓN: una entrada por ERP y criterio. Orden: [Odoo, Holded, BC]
// La valoración que se muestra sale automáticamente de la matriz.
// ---------------------------------------------------------------------
function e(info, fuente) { return { info: info, fuente: fuente }; }

const JUSTIFICACION = {
  empresa1: {
    funcional: [
      e("Inventario con lotes y fechas de caducidad (tiempo de caducidad, de retirada y de alerta) y estrategia FEFO para vender antes lo que caduca antes: cubre 'control de existencias y caducidades'. Compras, ventas y TPV son módulos nativos de Odoo; no pude leer odoo.com (bloquea la lectura automática), así que hay que verificar el TPV en su web oficial.", F.odooCaduc),
      e("Inventario en tiempo real con varios almacenes, productos con lote, alarmas de stock, pedidos de compra y TPV que descuenta stock en cada venta. Pero Inventario (25 €/mes) y TPV (desde 25 €/tienda) son complementos de pago, el TPV solo funciona en tablets y no se describe fecha de caducidad por lote.", F.holdedFunc + " ; " + F.holdedTPV + " ; " + F.holdedPrecios),
      e("Cubre inventario, compras, ventas y proyectos, pero la página oficial de precios de Essentials no lista TPV entre sus funciones; el TPV se resuelve con soluciones de terceros como LS Central (construida sobre Business Central). El requisito principal (TPV integrado con inventario) queda cubierto solo en parte.", F.bcPrecios + " ; " + F.lsCentral)
    ],
    tco: [
      e("Standard a 24,90 €/usuario/mes (lista, pago anual) × 5 = 124,50 €/mes = 7.470 € en 5 años, más 4.000 € de implantación y formación (supuesto) = ≈11.470 €. Precio tomado de oec.sh, un agregador externo, porque odoo.com no se puede leer: verificar.", F.odooPreciosES),
      e("Estándar 59 € (4 usuarios) + 1 usuario extra 10 € + Inventario 25 € + TPV 25 € = 119 €/mes = 7.140 € en 5 años, más 500 € de puesta en marcha (supuesto) = ≈7.640 €. Es la opción más barata. Precios sin IVA.", F.holdedPrecios),
      e("Essentials ≈80 USD/usuario/mes × 5 = 400 €/mes = 24.000 € en 5 años. La fuente indica que la implantación suele costar más que los primeros 18 meses de licencias (más de 7.200 €): se estiman 10.000 € más 3.000 € de TPV de terceros (supuestos) = ≈37.000 €. Microsoft AU publica 119,70 AUD, que confirma el orden de magnitud.", F.bcPrecios2 + " ; " + F.bcPrecios)
    ],
    integr: [
      e("Gran ecosistema de aplicaciones de terceros: aparecen módulos de caducidad para el TPV, TPV con Veri*Factu y apps móviles de TPV, lo que facilita conectar caja y facturación. Algunos son de pago y de terceros. Sin verificar en qué plan está la API externa.", F.odooPOSCaduc + " ; " + F.odooPOSVF),
      e("API REST, Zapier, conexión con más de 300 bancos y con Shopify, WooCommerce, PrestaShop, Amazon y Wix; el TPV ya viene integrado con el inventario, que resuelve el problema actual. Menos margen para integraciones a medida.", F.holdedFunc + " ; " + F.holdedTPV),
      e("Plataforma extensible, con extensiones de Microsoft (por ejemplo el conector B2Brouter para facturación electrónica) y Power BI para informes. Para el TPV hay que integrar una solución de terceros, lo que añade coste y complejidad.", F.bcVF + " ; " + F.bcMovil)
    ],
    uso: [
      e("Interfaz modular y completa; con tantas funciones exige más formación que una herramienta sencilla. La app móvil oficial no la pude verificar; sí existe una app de TPV de terceros (Odoo POS App de Mobikul) con modo sin conexión para iPad e iPhone.", F.odooPOSApp),
      e("Pensado para pymes y autónomos. App móvil en App Store y Google Play para facturar y gestionar cobros (los dueños podrían revisar ventas fuera de la tienda) y TPV con app nativa que funciona también sin conexión.", F.holdedFunc + " ; " + F.holdedTPV),
      e("Apps para teléfono y tablet (iOS, Android y Windows) con ventas, clientes y gráficos, pero no todas las funciones de la web están en la app. Curva de aprendizaje más alta y suele requerir un partner.", F.bcMovil)
    ],
    normativa: [
      e("Módulo Veri*Factu para Odoo 17 y 18 Enterprise; no está en la edición Community (respuesta oficial del foro). Para el TPV solo encontré un módulo de terceros (l10n_es_verifactu_POS), así que hay que confirmar si el TPV cumple Veri*Factu de forma nativa. Fechas: 1-1-2027 (sociedades) y 1-7-2027 (resto).", F.odooForoVF + " ; " + F.odooPOSVF + " ; " + F.verifactuFechas),
      e("Veri*Factu incluido en todos los planes según su web de precios; el TPV cumple Veri*Factu y AEAT. Además TicketBAI, SII, cuadro de cuentas personalizable y modelo 200.", F.holdedPrecios + " ; " + F.holdedTPV + " ; " + F.holdedFunc),
      e("Modo Veri*Factu integrado con disponibilidad general en septiembre de 2026 (envío a la AEAT, QR y firma con certificado), o mediante el conector B2Brouter, que puede tener costes. La página de LS Central (TPV) menciona SII pero no Veri*Factu.", F.bcVFEmbedded + " ; " + F.bcVF + " ; " + F.lsCentral)
    ],
    partners: [
      e("102 partners verificados en España; en el área de Valencia constan Dynapps (Gold, Valencia), Punt Sistemes (Gold, Paterna) y Nexta (Silver, Vila-real).", F.odooPartners),
      e("42 asesorías en la provincia de Valencia especializadas en Holded (contabilidad y transformación digital), útiles para soporte. Son asesorías más que implantadores de TPV e inventario.", F.holdedAses),
      e("Red de partners de Microsoft con presencia en Valencia: Laberit Sistemas tiene sede en Valencia y Business Central como especialidad. Microsoft indica que la compra y la consultoría se hacen a través de un partner.", F.bcPartner + " ; " + F.bcPrecios)
    ]
  },

  empresa2: {
    funcional: [
      e("Proyectos con cuentas analíticas, partes de horas, gastos y facturación para medir costes y rentabilidad por proyecto; CRM, compras e inventario son módulos nativos. Sin verificar en la web oficial la facturación por certificaciones (odoo.com bloquea la lectura automática).", F.odooProyectos),
      e("CRM con embudo, presupuestos, compras, inventario (complemento), proyectos con registro de horas y rentabilidad vinculando gastos y horas, y contabilidad. No se describe contabilidad analítica por obra, presupuesto frente a coste real ni certificaciones.", F.holdedFunc),
      e("Proyectos con tareas, líneas de planificación y presupuesto, recursos, partes de horas, facturación periódica y WIP por porcentaje de avance; también compras e inventario. El CRM es básico (la lista de Essentials incluye ventas y marketing). Las certificaciones requerirían configuración con un partner.", F.bcProyectos + " ; " + F.bcPrecios)
    ],
    tco: [
      e("Custom a 44,90 €/usuario/mes × 20 usuarios = 898 €/mes = 53.880 € en 5 años, más 28.000 € de implantación y formación (supuesto; la fuente cita 15.000-80.000 USD para pymes) = ≈81.880 €. Custom incluye Studio para personalizar. Precio de oec.sh: verificar en odoo.com.", F.odooPreciosES + " ; " + F.odooPreciosUS + " ; " + F.odooImpl),
      e("Avanzado 99 € (7 usuarios) + 13 usuarios extra × 10 € + Inventario 25 € = 254 €/mes = 15.240 € en 5 años, más 3.000 € de puesta en marcha (supuesto) = ≈18.240 €. Precios sin IVA; no incluye desarrollos a medida, que Holded no ofrece.", F.holdedPrecios),
      e("Essentials ≈80 USD × 20 = 1.600 €/mes = 96.000 € en 5 años, más 35.000 € de implantación (por encima de 18 meses de licencias, unos 28.800 €) y 3.000 € de formación (supuestos) = ≈134.000 €. Es la opción más cara.", F.bcPrecios2 + " ; " + F.bcPrecios)
    ],
    integr: [
      e("Arquitectura modular y ecosistema de apps de terceros: permite conectar CRM, compras, contabilidad y proyectos en un único sistema, sustituyendo Excel y correos. El plan Custom incluye Studio. Sin verificar en qué plan está la API externa.", F.odooPreciosUS),
      e("API REST, Zapier, más de 300 bancos y tiendas online. Todo en un único sistema, pero con poca capacidad de personalización: campos personalizados y roles solo llegan en el plan Avanzado.", F.holdedFunc + " ; " + F.holdedPrecios),
      e("Entorno extensible (extensiones, múltiples compañías y entornos), Power BI para informes de rentabilidad y conectores de Microsoft (por ejemplo B2Brouter para facturación electrónica).", F.bcPrecios + " ; " + F.bcMovil + " ; " + F.bcVF)
    ],
    uso: [
      e("Proyectos y partes de horas integrados en el mismo sistema. No pude verificar la app móvil oficial para jefes de obra; curva de aprendizaje media por la cantidad de módulos.", F.odooProyectos),
      e("App móvil con registro horario geolocalizado para empleados y escáner de gastos. No se describe una app para partes de obra ni para registrar materiales por proyecto.", F.holdedFunc),
      e("App para teléfono y tablet con funciones parciales respecto a la web; la fuente no confirma partes de horas ni uso sin conexión, algo importante en obra.", F.bcMovil)
    ],
    normativa: [
      e("Módulo oficial Veri*Factu para Odoo 17 y 18 Enterprise y localización española (PGC, IVA). Obligatorio desde el 1-1-2027 para sociedades, y la empresa factura a particulares y empresas.", F.odooForoVF + " ; " + F.verifactuFechas),
      e("Veri*Factu incluido en todos los planes; TicketBAI y SII; cuadro de cuentas personalizable, cuentas anuales y modelo 200.", F.holdedPrecios + " ; " + F.holdedFunc),
      e("Modo Veri*Factu integrado con disponibilidad general en septiembre de 2026 o conector B2Brouter; Veri*Factu y SII son excluyentes. Es muy reciente, por eso 2 y no 3.", F.bcVFEmbedded + " ; " + F.bcVF)
    ],
    partners: [
      e("102 partners verificados en España; en Valencia y alrededores constan Dynapps (Gold), Punt Sistemes (Gold) y Nexta (Silver): suficientes para implantar y adaptar a gestión de proyectos.", F.odooPartners),
      e("Las 42 asesorías de Valencia son de contabilidad y transformación digital; no encontré implantadores de Holded para gestión de obras ni personalización avanzada.", F.holdedAses),
      e("Red de partners de Microsoft con presencia en Valencia (Laberit Sistemas, con sede en Valencia y especialidad en Business Central), apropiada para una implantación de gestión de proyectos.", F.bcPartner)
    ]
  }
};

// Convierte el formato por criterio a lo que lee matriz.js: JUSTIFICACION[empresa][criterio][indiceERP] = {info, fuente}
// (ya está en ese formato)

// ---------------------------------------------------------------------
// DECISIÓN FINAL por empresa
// ---------------------------------------------------------------------
const DECISION = {
  empresa1: {
    erp: "Odoo Enterprise (plan Standard)",
    argumento: "Odoo obtiene la mayor puntuación (85,00 frente a 81,67 de Holded y 48,33 de Business Central). Es el único que documenta de forma nativa lo que más duele hoy al supermercado: lotes con fechas de caducidad, alertas y FEFO para reducir mermas de perecederos, junto con TPV, compras y facturación en un solo sistema. Su coste a 5 años (≈11.470 €, con una implantación supuesta de 4.000 €) es un 50 % mayor que Holded pero asumible para una facturación de 650.000 €. Hay que tener claro que la ventaja sobre Holded es pequeña: si los propietarios priorizan el coste mínimo y la sencillez por encima de las caducidades, Holded es una alternativa igual de razonable. Antes de decidir conviene pedir una demo de ambos y confirmar el TPV de Odoo con Veri*Factu.",
    preguntas: [
      { pregunta: "¿Tiene sentido implantar un ERP completo como SAP Business One o Microsoft Business Central en un negocio tan pequeño?",
        respuesta: "No. Business Central saca la peor puntuación (48,33): cuesta unos 37.000 € en 5 años frente a 7.640 € de Holded o 11.470 € de Odoo, la web oficial no incluye TPV entre sus funciones (se resuelve con soluciones de terceros) y hay que contratar a un partner para implantarlo. Para 5 usuarios y 650.000 € de facturación es desproporcionado. SAP Business One no se ha incluido en la matriz ni se han investigado sus precios; por posicionamiento, también está pensado para empresas mayores, pero esto es una suposición no verificada." },
      { pregunta: "¿Podría ser suficiente una solución más económica y sencilla como Holded?",
        respuesta: "Sí, para muchos casos. Holded es la más barata (≈7.640 € en 5 años) y la más fácil de usar, con TPV sincronizado con el stock, app móvil para que los dueños vean las ventas, y Veri*Factu incluido en todos los planes. Sus límites: Inventario y TPV son complementos de pago, el TPV solo va en tablets y su web no describe fecha de caducidad por lote, que es un requisito del supermercado." },
      { pregunta: "¿Odoo permitiría cubrir mejor las necesidades de inventario y TPV?",
        respuesta: "En inventario sí: la documentación oficial describe caducidad, alerta, retirada y FEFO. En TPV el módulo es nativo, pero no pude leer su web oficial y solo encontré un módulo de terceros para Veri*Factu en el TPV, así que esa parte hay que confirmarla. Además Veri*Factu solo está en Odoo Enterprise, no en Community." }
    ]
  },
  empresa2: {
    erp: "Odoo Enterprise (plan Custom)",
    argumento: "Odoo suma 88,33 puntos frente a 75,00 de Holded y 66,67 de Business Central. Cubre en un solo sistema CRM, compras, inventario y proyectos con cuentas analíticas, partes de horas y gastos, que es justo lo que hoy se hace con Excel y correos. El plan Custom incluye Studio y hay partners en Valencia para adaptarlo. Su TCO (≈81.880 €) es el segundo más bajo: Holded sale más barato (≈18.240 €) pero no ofrece la profundidad ni la personalización que necesita una empresa con 15-20 obras simultáneas, y Business Central es el más caro (≈134.000 €). Antes de cerrar la decisión hay que comprobar con el partner, en una demo, los presupuestos detallados y las certificaciones por obra, que no pude verificar en la web oficial de Odoo.",
    preguntas: [
      { pregunta: "¿Es suficiente un ERP generalista como Odoo o Business Central?",
        respuesta: "Sí, con matices. Ambos cubren proyectos, compras, horas y facturación. Business Central destaca en control financiero de proyectos (presupuesto, recursos y WIP por porcentaje de avance); Odoo, en cobertura integrada con CRM y menor coste. Ninguno trae las certificaciones y los presupuestos por capítulos listos para una empresa de reformas, así que hay que configurarlos con un partner. Holded se queda corto en contabilidad analítica por obra." },
      { pregunta: "¿Necesita la empresa un software especializado en gestión de obras?",
        respuesta: "No necesariamente, pero conviene comprobarlo. Si en la demo un ERP generalista no resuelve bien presupuestos por partidas, certificaciones y subcontratas, entonces habría que valorar un software especializado o una extensión de sector. No he investigado programas especializados de obra en esta actividad, así que esta es una recomendación de verificación y no una conclusión." },
      { pregunta: "¿Qué importancia tiene la posibilidad de personalizar el ERP para adaptarlo a la gestión de proyectos?",
        respuesta: "Alta. La empresa necesita adaptar presupuestos, certificaciones y costes por obra a su forma de trabajar. Odoo Custom incluye Studio y un ecosistema de apps; Business Central se personaliza con extensiones pero a mayor coste; Holded es la más limitada (campos y roles personalizados solo desde el plan Avanzado y sin desarrollos a medida). Por eso la integración y la personalización pesan en la elección frente a la opción más barata." }
    ]
  }
};
