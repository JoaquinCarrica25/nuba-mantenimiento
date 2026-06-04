// ============================================================
// NUBA MANTENIMIENTO — Vista de Historial
// ============================================================
import { useHistorial } from "../hooks/useHistorial";

export default function HistorialView({ apartamento }) {
  const { historial, loading, error } = useHistorial(apartamento);

  const formatFecha = (f) => {
    if (!f) return "—";
    const [y, m, d] = f.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg md:text-xl font-bold text-nuba-blue tracking-tight">
            {apartamento} — Historial
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Registro de todas las comprobaciones realizadas
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto">

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-nuba-cyan/20 border-t-nuba-cyan rounded-full animate-spin" />
              <p className="text-slate-400 text-sm">Cargando historial…</p>
            </div>
          ) : historial.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="font-medium text-slate-600">Sin registros aún</p>
              <p className="text-sm mt-1">Las comprobaciones guardadas aparecerán aquí.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historial.map((entry) => (
                <div key={entry.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center gap-3">

                  {/* Fecha */}
                  <div className="flex-shrink-0 text-center bg-nuba-cyan/10 rounded-xl px-3 py-2 min-w-[70px]">
                    <p className="text-nuba-cyan font-bold text-sm">{formatFecha(entry.fecha_verificacion)}</p>
                  </div>

                  {/* Info principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-800 text-sm">{entry.nombre}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                        ${entry.estado ? "bg-nuba-cyan/15 text-nuba-cyan" : "bg-red-50 text-red-400"}`}>
                        {entry.estado ? "✓ Comprobado" : "● Pendiente"}
                      </span>
                      {entry.funciona === true && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">✓ Funciona</span>
                      )}
                      {entry.funciona === false && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500">✗ No funciona</span>
                      )}
                    </div>
                    {entry.responsable && (
                      <p className="text-xs text-slate-500 mt-0.5">👤 {entry.responsable}</p>
                    )}
                    {entry.notas && (
                      <p className="text-xs text-slate-500 mt-0.5 italic">📝 {entry.notas}</p>
                    )}
                  </div>

                  {/* Foto miniatura */}
                  {entry.foto_url && (
                    <a href={entry.foto_url} target="_blank" rel="noopener noreferrer"
                      className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 border-nuba-cyan/30 hover:border-nuba-cyan transition">
                      <img src={entry.foto_url} alt="Evidencia" className="w-full h-full object-cover" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
