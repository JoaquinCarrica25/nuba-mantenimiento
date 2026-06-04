// ============================================================
// NUBA MANTENIMIENTO — Hook de Historial
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useHistorial(apartamento) {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const cargarHistorial = useCallback(async () => {
    if (!apartamento) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: sbError } = await supabase
        .from("historial")
        .select("*")
        .eq("apartamento", apartamento)
        .order("fecha_verificacion", { ascending: false });

      if (sbError) throw sbError;
      setHistorial(data || []);
    } catch (err) {
      setError("Error al cargar el historial.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [apartamento]);

  useEffect(() => {
    cargarHistorial();
  }, [cargarHistorial]);

  // Guardar una nueva entrada en el historial
  const guardarEntrada = useCallback(async (item) => {
    try {
      const { error: sbError } = await supabase
        .from("historial")
        .insert({
          apartamento,
          item_id:            item.item_id,
          nombre:             item.nombre,
          estado:             item.estado,
          funciona:           item.funciona,
          responsable:        item.responsable,
          fecha_verificacion: item.fecha_verificacion || new Date().toISOString().split("T")[0],
          notas:              item.notas || "",
          foto_url:           item.foto_url || null,
        });
      if (sbError) throw sbError;
      await cargarHistorial();
    } catch (err) {
      console.error("Error al guardar historial:", err);
    }
  }, [apartamento, cargarHistorial]);

  return { historial, loading, error, guardarEntrada, recargar: cargarHistorial };
}
