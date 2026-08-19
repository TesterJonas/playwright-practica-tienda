{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # \uc0\u55357 \u57042  Playwright - Pruebas E2E Tienda Demo\
\
Proyecto de automatizaci\'f3n de pruebas End-to-End usando Playwright + TypeScript.\
\
### \'bfQu\'e9 hace este proyecto?\
Verifica que una tienda online real cargue correctamente sus productos en 3 navegadores diferentes (Chromium, Firefox y Webkit).\
\
### \uc0\u55357 \u56960  C\'f3mo correrlo\
\
1. Clonar el repo:\
```bash\
git clone https://github.com/TesterJonas/playwright-practica-tienda.git\
\
2. Instalar dependencias:\
\
npm install\
npx playwright install\
\
3. Correr los tests:\
\
# Todos los navegadores (headless)\
npx playwright test\
\
# Ver el navegador en acci\'f3n\
npx playwright test --headed\
\
# Ver el reporte\
npx playwright show-report\
\
\uc0\u55358 \u56810  Test actual\
- `tienda.spec.ts`: Valida que la tienda carga, el t\'edtulo es correcto y que hay productos visibles.\
\
\uc0\u55357 \u57056 \u65039  Stack\
- Playwright\
- TypeScript\
- Git / GitHub\
\
---\
Hecho con \uc0\u55357 \u56507  por [Jonathan Cortes]}