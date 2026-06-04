// ============================================================
// NUBA MANTENIMIENTO PREVENTIVO — Supabase Client
// ============================================================
// Crea un proyecto en https://supabase.com (gratis) y añade
// estas variables a tu .env.local (desarrollo) y en los
// "Environment Variables" de Vercel (producción):
//
//   VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
//
// ============================================================

import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️  Faltan las variables de entorno de Supabase. " +
    "Crea un archivo .env.local con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// ============================================================
// SQL para crear las tablas en Supabase (ejecutar una vez
// en el SQL Editor de tu proyecto Supabase):
// ============================================================
//
// -- Tabla principal de verificaciones
// CREATE TABLE IF NOT EXISTS verificaciones (
//   id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   apartamento        TEXT NOT NULL,
//   item_id            INTEGER NOT NULL,
//   frecuencia         TEXT DEFAULT 'Semanalmente',
//   estado             BOOLEAN DEFAULT FALSE,
//   fecha_verificacion DATE,
//   responsable        TEXT DEFAULT '',
//   notas              TEXT DEFAULT '',
//   patron_accion      TEXT DEFAULT '',
//   foto_url           TEXT,
//   updated_at         TIMESTAMPTZ DEFAULT now(),
//   UNIQUE (apartamento, item_id)
// );
//
// -- Habilitar RLS y política pública (ajustar según auth real)
// ALTER TABLE verificaciones ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Allow all" ON verificaciones FOR ALL USING (true);
//
// -- Bucket de Storage para fotos (crear desde UI o SQL):
// INSERT INTO storage.buckets (id, name, public)
// VALUES ('evidencias', 'evidencias', true);
// CREATE POLICY "Allow all storage" ON storage.objects
//   FOR ALL USING (bucket_id = 'evidencias');
//
// ============================================================
