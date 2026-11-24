# Justificación, decisión y comentarios - Actividad 1 (ERP)

**Nombre:** David Catalán y Marc Nacher
**Fecha:** 24/11/2026
**ERP comparados:** Odoo Enterprise, Holded, Microsoft Dynamics 365 Business Central
**Datos recogidos:** noviembre de 2026. Las URLs de cada dato están en `js/datos.js` y se muestran en `index.html`.

---

## 0. Pregunta inicial

**¿Es mejor para una pyme programar un ERP desde cero o usar y modificar uno genérico? ¿Y para una gran empresa?**

Para una **pyme**, casi siempre es mejor un ERP genérico adaptado. Programar uno desde cero exige un equipo de desarrollo, meses de trabajo y mantenimiento continuo (normativa fiscal incluida, como VeriFactu), costes que una pyme rara vez puede asumir. Un genérico ya trae contabilidad, inventario o facturación probados y se adapta con configuración o módulos. Los dos casos de la actividad lo muestran: el supermercado necesita sobre todo TPV, inventario y caducidades, algo que ya existe.

Para una **gran empresa**, la balanza se inclina más hacia un genérico muy personalizado o, en procesos muy especiales que dan ventaja competitiva, hacia desarrollo a medida sobre una base estándar. Tiene presupuesto para personalizar, y sus procesos propios pueden no estar en un producto estándar. Aun así, hacerlo todo desde cero sigue siendo raro por el coste y el riesgo.

El riesgo de personalizar un genérico es que las modificaciones complican las actualizaciones. Por eso conviene personalizar lo mínimo y usar los mecanismos oficiales de cada ERP.

---

## 1. Empresa 1: Supermercado La Plaza (5 usuarios)

### 1.1 Resultado de la matriz

| ERP | Puntuación (sobre 100) |
|---|---|
| Odoo Enterprise | 85,00 |
| Holded | 81,67 |
| MS Dynamics 365 Business Central | 48,33 |

### 1.2 Cálculo del TCO a 5 años

TCO = cuota mensual x 60 meses + implantación y formación + extras. Precios de lista sin IVA.

| ERP | Cuota mensual | x 60 meses | Implantación y formación (supuesto) | Extras | **TCO 5 años** |
|---|---|---|---|---|---|
| Odoo (Standard, 5 x 24,90 €) | 124,50 € | 7.470 € | 4.000 € | 0 € | **11.470 €** |
| Holded (Estándar + 1 usuario + Inventario + TPV) | 119 € | 7.140 € | 500 € | 0 € | **7.640 €** |
| Business Central (5 x ≈80 €) | 400 € | 24.000 € | 10.000 € | 3.000 € (TPV de terceros) | **37.000 €** |

Los precios de cuota vienen de las fuentes. **La implantación, la formación y los extras son estimaciones mías**, no cifras publicadas. Los precios de Odoo vienen de un agregador externo (oec.sh), porque odoo.com no se podía leer. El precio de Business Central está en dólares y lo he tomado como euros, una simplificación.

### 1.3 Justificación

La tabla completa, con 18 notas, la información encontrada y la fuente de cada una, está en `index.html` y en `js/datos.js`. Las notas más importantes:

- **Cobertura funcional (peso 30):** Odoo 3 porque su documentación oficial describe lotes con caducidad, alertas y FEFO, justo lo que necesita un supermercado. Holded 2: TPV sincronizado con el stock, pero Inventario y TPV son extras de pago y no se describe caducidad por lote. Business Central 1: no incluye TPV entre sus funciones de Essentials.
- **TCO (peso 25):** Holded 3 (≈7.640 €), Odoo 2 (≈11.470 €), Business Central 1 (≈37.000 €).
- **Normativa (peso 10):** Holded 3 porque incluye Veri*Factu en todos los planes. Odoo 2: el módulo Veri*Factu es de la edición Enterprise y el TPV con Veri*Factu solo lo encontré como módulo de terceros. Business Central 1: el modo integrado es muy reciente y su TPV (LS Central) no menciona Veri*Factu.

### 1.4 Decisión final

**ERP elegido: Odoo Enterprise (plan Standard).** Gana por poco (85,00 frente a 81,67 de Holded), sobre todo por documentar de forma nativa las caducidades, que es lo que más duele al supermercado. Holded es una alternativa igual de razonable si los dueños priorizan el coste mínimo y la sencillez. Conviene pedir una demo de ambos.

- **¿Tiene sentido SAP Business One o Business Central en un negocio tan pequeño?** No. Business Central saca la peor nota, cuesta unos 37.000 € en 5 años y necesita un partner. SAP Business One no está en la matriz ni he investigado sus precios; por posicionamiento está pensado para empresas mayores, pero es una suposición mía sin verificar.
- **¿Basta Holded?** En muchos casos sí: es la más barata y la más sencilla, con Veri*Factu incluido. Su límite es que no describe caducidad por lote.
- **¿Odoo cubre mejor inventario y TPV?** En inventario sí. En el TPV hay que confirmar el cumplimiento de Veri*Factu.

---

## 2. Empresa 2: Reformas Levante (45 empleados)

### 2.1 Resultado de la matriz

| ERP | Puntuación (sobre 100) |
|---|---|
| Odoo Enterprise | 88,33 |
| Holded | 75,00 |
| MS Dynamics 365 Business Central | 66,67 |

### 2.2 Cálculo del TCO a 5 años

Supuesto: 20 usuarios con licencia completa (de 45 empleados); el resto solo registra horas.

| ERP | Cuota mensual | x 60 meses | Implantación (supuesto) | Extras | **TCO 5 años** |
|---|---|---|---|---|---|
| Odoo (Custom, 20 x 44,90 €) | 898 € | 53.880 € | 28.000 € | 0 € | **81.880 €** |
| Holded (Avanzado + 13 usuarios + Inventario) | 254 € | 15.240 € | 3.000 € | 0 € | **18.240 €** |
| Business Central (20 x ≈80 €) | 1.600 € | 96.000 € | 35.000 € | 3.000 € (formación) | **134.000 €** |

La implantación y la formación son estimaciones mías. Odoo Custom incluye Studio para personalizar.

### 2.3 Decisión final

**ERP elegido: Odoo Enterprise (plan Custom).** Reúne CRM, compras, inventario y proyectos con cuentas analíticas, partes de horas y gastos en un solo sistema, que sustituye a Excel y correos. Hay partners en Valencia. No pude verificar en la web oficial de Odoo los presupuestos detallados ni las certificaciones por obra, así que habría que probarlos en una demo.

- **¿Basta un ERP generalista?** Sí, con matices. Business Central destaca en control financiero de proyectos (presupuesto, recursos y WIP); Odoo, en cobertura integrada y coste. Ninguno trae certificaciones listas, hay que configurarlas con un partner.
- **¿Necesita software especializado en obras?** No necesariamente. Si en la demo un ERP generalista no resuelve presupuestos por partidas, certificaciones y subcontratas, habría que valorarlo. No he investigado software de obra, así que es una recomendación de verificación.
- **¿Importancia de la personalización?** Alta. Odoo Custom incluye Studio y un ecosistema de apps; Business Central usa extensiones a mayor coste; Holded es la más limitada.

---

## 3. Herramientas utilizadas

Búsqueda web y lectura de páginas con un asistente de IA (Claude). Fuentes: webs oficiales de Holded, Microsoft y la documentación de Odoo, más agregadores y blogs de terceros para precios (oec.sh, gloriumtech.com, octurasolutions.com).

### Recomendaciones de la IA que se descartaron o se dudó que fueran correctas

1. **Añadir SAP Business One como cuarto ERP.** La IA lo sugirió al leer el enunciado, pero la rúbrica y la matriz del enunciado solo piden 3 ERP. Se descartó.
2. **Notas iniciales sin fuente.** La IA propuso al principio una primera tanda de puntuaciones sin haber consultado ningún dato. Se rehicieron con la información encontrada, porque la rúbrica penaliza las puntuaciones arbitrarias.
3. **Precio de Business Central.** Las fuentes dan 80 USD (gloriumtech.com) y 119,70 AUD (Microsoft Australia), no euros. Se tomó ≈80 € como aproximación, con la duda de que no coincida con la tarifa española; hay que contrastarlo con un partner.
4. **Precios de Odoo.** odoo.com bloquea la lectura automática, así que se usó un agregador externo. Se dudó de su exactitud y se indica en cada fila afectada.

---

## 4. Fuentes

Webs oficiales:

- Holded: precios, funcionalidades, TPV y directorio de asesorías (holded.com/es/...)
- Odoo: documentación de caducidades; foro oficial sobre Veri*Factu
- Microsoft: precios de Business Central, Veri*Factu, proyectos (Jobs) y novedades 2026 wave 1 (learn.microsoft.com)

Terceros:

- oec.sh (precios de Odoo), erpresearch.com (partners de Odoo y Dynamics), gloriumtech.com (precios de Business Central), octurasolutions.com (costes de implantación de Odoo), syvantis.com (app móvil de Business Central), handbook.coopdevs.org (proyectos en Odoo), legaltoday.com (fechas de Veri*Factu), help.lscentral.lsretail.com (TPV sobre Business Central), apple.com (Odoo POS App)

Las URLs exactas están en `js/datos.js`, objeto `F`.
