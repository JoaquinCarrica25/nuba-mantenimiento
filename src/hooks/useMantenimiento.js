// ============================================================
// NUBA MANTENIMIENTO PREVENTIVO — Hook de datos
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { getItemsIniciales } from "../data/data";

export function useMantenimiento(apartamento) {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [saving, setSaving]     = useState(false);

  // ── Cargar datos de Supabase ──────────────────────────────
  const cargarItems = useCallback(async () => {
    if (!apartamento) return;
    setLoading(true);
    setError(null);

    try {
      const { data, error: sbError } = await supabase
        .from("verificaciones")
        .select("*")
        .eq("apartamento", apartamento);

      if (sbError) throw sbError;

      const base = getItemsIniciales();

      if (!data || data.length === 0) {
        // Primera vez: usar estado inicial (no guardado aún)
        setItems(base);
      } else {
        // Mezclar datos guardados con lista base (por si se añaden ítems nuevos)
        const merged = base.map((b) => {
          const guardado = data.find((d) => d.item_id === b.item_id);
          return guardado ? { ...b, ...guardado } : b;
        });
        setItems(merged);
      }
    } catch (err) {
      setError("Error al cargar datos. Comprueba la conexión.");
      console.error(err);
      setItems(getItemsIniciales());
    } finally {
      setLoading(false);
    }
  }, [apartamento]);

  useEffect(() => {
    cargarItems();
  }, [cargarItems]);

  // ── Actualizar un campo de un ítem ────────────────────────
  const actualizarItem = useCallback(async (itemId, campo, valor) => {
    // Actualizar UI inmediatamente (optimistic update)
    setItems((prev) =>
      prev.map((it) =>
        it.item_id === itemId ? { ...it, [campo]: valor } : it
      )
    );

    // Si marcamos estado como true, auto-rellenar fecha
    let extraUpdate = {};
    if (campo === "estado" && valor === true) {
      const hoy = new Date().toISOString().split("T")[0];
      extraUpdate = { fecha_verificacion: hoy };
      setItems((prev) =>
        prev.map((it) =>
          it.item_id === itemId ? { ...it, fecha_verificacion: hoy } : it
        )
      );
    }

    setSaving(true);
    try {
      const { error: sbError } = await supabase
        .from("verificaciones")
        .upsert(
          {
            apartamento,
            item_id: itemId,
            [campo]: valor,
            ...extraUpdate,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "apartamento,item_id" }
        );
      if (sbError) throw sbError;
    } catch (err) {
      console.error("Error al guardar:", err);
      setError("Error al guardar. Reintentando...");
    } finally {
      setSaving(false);
    }
  }, [apartamento]);

  // ── Subir foto a Supabase Storage ────────────────────────
  const subirFoto = useCallback(async (itemId, file) => {
    const ext      = file.name.split(".").pop();
    const path     = `${apartamento}/${itemId}_${Date.now()}.${ext}`;
    setSaving(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from("evidencias")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("evidencias")
        .getPublicUrl(path);

      const fotoUrl = urlData.publicUrl;
      await actualizarItem(itemId, "foto_url", fotoUrl);
      return fotoUrl;
    } catch (err) {
      console.error("Error al subir foto:", err);
      setError("Error al subir la foto.");
      return null;
    } finally {
      setSaving(false);
    }
  }, [apartamento, actualizarItem]);

  // ── Progreso global del apartamento ──────────────────────
  const progreso = items.length
    ? Math.round((items.filter((i) => i.estado).length / items.length) * 100)
    : 0;

  return { items, loading, error, saving, progreso, actualizarItem, subirFoto, recargar: cargarItems };
}
