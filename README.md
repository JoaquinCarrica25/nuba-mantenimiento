# Nuba Mantenimiento Preventivo

Aplicación web para la gestión de instalaciones y control de calidad de los apartamentos Nuba. Desarrollada en React + Tailwind CSS, con backend en Supabase y despliegue en Vercel.

---

## Stack Tecnológico

| Capa         | Tecnología             |
|--------------|------------------------|
| Frontend     | React 18 + Vite        |
| Estilos      | Tailwind CSS 3         |
| Base de datos| Supabase (PostgreSQL)  |
| Almacenamiento fotos | Supabase Storage |
| Despliegue   | Vercel (gratuito)      |

---

## Estructura del Proyecto

```
nuba-mantenimiento/
├── src/
│   ├── data/
│   │   └── data.js            # Apartamentos, ítems, responsables
│   ├── lib/
│   │   └── supabase.js        # Cliente Supabase + SQL de creación de tablas
│   ├── hooks/
│   │   └── useMantenimiento.js # Lógica de datos (CRUD + Storage)
│   ├── components/
│   │   ├── Sidebar.jsx         # Navegación lateral
│   │   ├── ApartamentoView.jsx # Vista principal de cada apartamento
│   │   └── ItemCard.jsx        # Tarjeta de cada ítem de verificación
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── .env.example
```

---

## Setup Local (Paso a Paso)

### 1. Clonar e instalar

```bash
git clone https://github.com/tu-usuario/nuba-mantenimiento.git
cd nuba-mantenimiento
npm install
```

### 2. Crear el proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) → **New Project**
2. Elige nombre, región (eu-west) y contraseña
3. En **SQL Editor**, ejecuta este script (también lo encontrarás comentado en `src/lib/supabase.js`):

```sql
-- Tabla de verificaciones
CREATE TABLE IF NOT EXISTS verificaciones (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  apartamento        TEXT NOT NULL,
  item_id            INTEGER NOT NULL,
  frecuencia         TEXT DEFAULT 'Semanalmente',
  estado             BOOLEAN DEFAULT FALSE,
  fecha_verificacion DATE,
  responsable        TEXT DEFAULT '',
  notas              TEXT DEFAULT '',
  patron_accion      TEXT DEFAULT '',
  foto_url           TEXT,
  updated_at         TIMESTAMPTZ DEFAULT now(),
  UNIQUE (apartamento, item_id)
);

-- Seguridad (política pública para el equipo)
ALTER TABLE verificaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON verificaciones FOR ALL USING (true);

-- Bucket de fotos
INSERT INTO storage.buckets (id, name, public)
VALUES ('evidencias', 'evidencias', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Allow all storage" ON storage.objects
  FOR ALL USING (bucket_id = 'evidencias');
```

### 3. Variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con los valores de tu proyecto Supabase:
- **Settings → API → Project URL** → `VITE_SUPABASE_URL`
- **Settings → API → anon public** → `VITE_SUPABASE_ANON_KEY`

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 4. Arrancar en local

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

---

## Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) → **New Project** → importa el repo
3. En **Environment Variables** añade:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **Deploy** → ¡listo!

---

## Funcionalidades

- ✅ 25 apartamentos con navegación lateral (buscable)
- ✅ 31 ítems de verificación por apartamento
- ✅ Switch comprobado/pendiente con auto-fecha
- ✅ Selector de frecuencia, responsable, fecha manual
- ✅ Campo de notas e incidencias
- ✅ Patrón de acción
- ✅ Subida de fotos (cámara nativa en móvil)
- ✅ Miniatura + lightbox de evidencias
- ✅ Barra de progreso por apartamento
- ✅ Filtro pendientes / todo + buscador
- ✅ Sync en tiempo real vía Supabase
- ✅ 100% Mobile-First (tarjetas verticales)
- ✅ Guardado automático con upsert

---

## Responsables configurados

Joaquín · Nanda · Oscar · Vanessa · Piney

Para añadir más, edita el array `RESPONSABLES` en `src/data/data.js`.
