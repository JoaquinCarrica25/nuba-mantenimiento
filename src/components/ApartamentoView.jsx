// ============================================================
// NUBA MANTENIMIENTO — Vista de Apartamento
// ============================================================
import { useState } from "react";
import { useMantenimiento } from "../hooks/useMantenimiento";
import ItemCard from "./ItemCard";

export default function ApartamentoView({ apartamento }) {
  const { items, loading, error, saving, progreso, actualizarItem, subirFoto } =
    useMantenimiento(apartamento);

  const [filtro, setFiltro]       = useState("todo");    // "todo" | "pendientes"
  const [busqueda, setBusqueda]   = useState("");

  const itemsFiltrados = items.filter((it) => {
    const matchFiltro = filtro === "todo" || (filtro === "pendientes" && !it.estado);
    const matchBusqueda =
      busqueda === "" ||
      it.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      it.observacion.toLowerCase().includes(busqueda.toLowerCase());
    return matchFiltro && matchBusqueda;
  });

  const total     = items.length;
  const hechos    = items.filter((i) => i.estado).length;
  const pendientes = total - hechos;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto">
          {/* Título + indicador guardado */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-nuba-blue tracking-tight">
                {apartamento}
              </h1>
              <p className="text-slate-400 text-xs mt-0.5">
                Hoja de verificación · {total} ítems
              </p>
            </div>
            {saving && (
              <span className="text-xs text-nuba-accent font-medium animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-nuba-accent inline-block"></span>
                Guardando…
              </span>
            )}
          </div>

          {/* Barra de progreso */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-500">Progreso</span>
              <span className={`font-semibold ${progreso === 100 ? "text-green-600" : "text-nuba-blue"}`}>
                {hechos}/{total} — {progreso}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-nuba-blue to-nuba-accent rounded-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>

          {/* Stats chips */}
          <div className="flex gap-2 text-xs mb-3">
            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-semibold">
              ✓ {hechos} comprobados
            </span>
            <span className="bg-red-50 text-red-500 px-2.5 py-1 rounded-full font-semibold">
              ● {pendientes} pendientes
            </span>
          </div>

          {/* Filtros + buscador */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-1.5 bg-slate-100 rounded-xl p-1 flex-shrink-0">
              {[
                { key: "todo",       label: "Ver todo" },
                { key: "pendientes", label: "Pendientes" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFiltro(key)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                    ${filtro === key
                      ? "bg-white text-nuba-blue shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Buscar ítem u observación…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-nuba-blue/30 transition"
            />
          </div>
        </div>
      </header>

      {/* ── Contenido ── */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto">

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-nuba-blue/20 border-t-nuba-blue rounded-full animate-spin" />
              <p className="text-slate-400 text-sm">Cargando datos de {apartamento}…</p>
            </div>
          ) : (
            <>
              {itemsFiltrados.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <p className="text-4xl mb-3">🎉</p>
                  <p className="font-medium text-slate-600">¡Todo comprobado!</p>
                  <p className="text-sm mt-1">No hay ítems pendientes en este apartamento.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {itemsFiltrados.map((item) => (
                    <ItemCard
                      key={item.item_id}
                      item={item}
                      onUpdate={actualizarItem}
                      onFoto={subirFoto}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
