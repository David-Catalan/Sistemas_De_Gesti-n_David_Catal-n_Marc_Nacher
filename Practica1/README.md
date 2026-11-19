# SGE UT1 - Actividad 1: Matriz de decisión para la selección de un ERP

Matrices de decisión programables (HTML + CSS + JavaScript) que comparan **Odoo Enterprise, Holded y Microsoft Dynamics 365 Business Central** para dos empresas, cada una con su propia matriz:

1. Supermercado La Plaza
2. Reformas Levante

## Cómo verla

Abre `index.html` en el navegador (doble clic). No necesita servidor ni instalación.

## Estructura

```
sge-ut1-actividad1-erp/
├── index.html              Página con las dos matrices
├── css/style.css           Estilos
├── js/datos.js             Criterios, pesos, valoraciones, justificación y decisión
├── js/matriz.js            Cálculo de la puntuación ponderada y pintado de la página
├── docs/justificacion.md   Informe: justificación, decisión final y comentarios (IA)
└── README.md
```

## Fórmula

`Puntuación ponderada = (Valoración × Peso) / 3`, con valoración de 0 a 3. La suma total es sobre 100.

## Autor

(tu nombre)
