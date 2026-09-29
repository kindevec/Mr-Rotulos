# Mister Rótulos - Landing Page PRO (Quito, Ecuador)

Landing Page de alta conversión (High-Ticket / Conversion Rate Optimization) desarrollada en **React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons**.

---

## 🚀 Despliegue Rápido en GitHub

### 1. Inicializar repositorio y subir a GitHub

Abre tu terminal en la carpeta raíz del proyecto y ejecuta:

```bash
# 1. Inicializar git si aún no está inicializado
git init

# 2. Agregar todos los archivos
git add .

# 3. Crear el primer commit
git commit -m "feat: landing page mister rótulos lista para producción"

# 4. Vincular con tu repositorio en GitHub (reemplaza TU_USUARIO y TU_REPOSITORIO)
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 5. Subir a GitHub
git push -u origin main
```

---

## 🌐 Opciones de Hosting Gratuito y Rápido

### Opción A: GitHub Pages (Automatizado con GitHub Actions)
Este proyecto ya incluye el workflow en `.github/workflows/deploy.yml`.
1. Ve a tu repositorio en GitHub.
2. Entra en **Settings** > **Pages**.
3. En **Build and deployment** > **Source**, selecciona **GitHub Actions**.
4. ¡Listo! Cada vez que hagas `git push origin main`, se compilará y desplegará automáticamente.

> **Nota para subdirectorios en GitHub Pages**: Si tu sitio se publica bajo una subruta (ejemplo: `https://tu-usuario.github.io/mister-rotulos/`), añade `base: './'` en `vite.config.ts`.

### Opción B: Vercel (Recomendado - 1 clic)
1. Conecta tu cuenta de GitHub en [vercel.com](https://vercel.com).
2. Haz clic en **"Add New Project"** e importa este repositorio.
3. Vercel detectará automáticamente **Vite**.
4. Haz clic en **Deploy**.

### Opción C: Netlify (1 clic)
1. Ingresa a [netlify.com](https://netlify.com) y conecta tu repositorio.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Haz clic en **Deploy Site**.

---

## 🛠️ Comandos de Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# Validar TypeScript
npm run lint

# Generar compilación optimizada para producción (carpeta dist/)
npm run build

# Previsualizar el build de producción
npm run preview
```

---

## 📐 Estructura de Secciones

1. **Inicio (`#inicio`)**: Hero con geolocalización en Quito, badges de confianza, simulador diurno/nocturno de iluminación LED y botones de acción rápida.
2. **Servicios (`#servicios`)**: Grid interactivo con Rótulos Luminosos, Cajas de Luz LED, Letras 3D Corpóreas y Gigantografías.
3. **Catálogo (`#catalogo`)**: Catálogo con filtros y modal con vista ampliada y ficha técnica.
4. **Sobre Nosotros (`#nosotros`)**: Taller de corte CNC y doblado láser, historia, Misión, Visión, métricas de trayectoria y testimonios.
5. **Contactos (`#contactos`)**: Formulario con código Ecuador `+593`, opciones de visita técnica, teléfonos directos, horario, dirección y Google Maps embebido.
