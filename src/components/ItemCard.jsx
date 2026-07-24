// ============================================================
// NUBA MANTENIMIENTO — ItemCard
// ============================================================
import { useRef, useState, useEffect } from "react";
import { FRECUENCIAS } from "../data/data";

export default function ItemCard({ item, perfilActivo, onUpdate, onFoto, onGuardarHistorial }) {
  const fileRef   = useRef(null);
  const [lightbox, setLightbox]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado]   = useState(false);

  // Cuando se selecciona un perfil, se asigna automáticamente como responsable
  useEffect(() => {
    if (perfilActivo && !item.responsable) {
      onUpdate(item.item_id, "responsable", perfilActivo);
    }
  }, [perfilActivo]);

  const handleFoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    await onFoto(item.item_id, file);
    setUploading(false);
  };

  const handleGuardar = async () => {
    // Asegurarse de que el responsable es el perfil activo antes de guardar
    const itemConPerfil = { ...item, responsable: perfilActivo || item.responsable };
    setGuardando(true);
    await onGuardarHistorial(itemConPerfil);
    setGuardando(false);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  };

  return (
    <>
      <div className={`card-item bg-white rounded-2xl border transition-all duration-200 overflow-hidden
        ${item.estado ? "border-nuba-cyan/40 shadow-sm" : "border-slate-200 hover:border-nuba-cyan/40 hover:shadow-md"}`}>

        {/* ── Header ── */}
        <div className={`px-4 pt-4 pb-3 flex items-start gap-3 ${item.estado ? "bg-cyan-50/50" : "bg-white"}`}>
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-nuba-cyan/15 text-nuba-cyan text-xs font-bold flex items-center justify-center mt-0.5">
            {item.item_id}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-800 text-sm leading-tight">{item.nombre}</p>
            <p className="text-slate-500 text-xs mt-0.5 leading-snug">{item.observacion}</p>
          </div>
          <button
            onClick={() => onUpdate(item.item_id, "estado", !item.estado)}
            className={`flex-shrink-0 w-12 h-6 rounded-full relative transition-colors duration-200
              ${item.estado ? "bg-nuba-cyan" : "bg-slate-300"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200
              ${item.estado ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* ── Badges + Sí/No ── */}
        <div className="px-4 pb-3 flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
            ${item.estado ? "bg-nuba-cyan/15 text-nuba-cyan" : "bg-red-50 text-red-400"}`}>
            {item.estado ? "✓ Comprobado" : "● Pendiente"}
          </span>
          {/* Responsable automático visible */}
          {(perfilActivo || item.responsable) && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              👤 {perfilActivo || item.responsable}
            </span>
          )}
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-xs text-slate-400 font-medium mr-1">¿Funciona?</span>
            <button onClick={() => onUpdate(item.item_id, "funciona", true)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all
                ${item.funciona === true ? "bg-nuba-cyan text-white border-nuba-cyan" : "bg-white text-slate-500 border-slate-200 hover:border-nuba-cyan hover:text-nuba-cyan"}`}>
              ✓ Sí
            </button>
            <button onClick={() => onUpdate(item.item_id, "funciona", false)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all
                ${item.funciona === false ? "bg-red-500 text-white border-red-500" : "bg-white text-slate-500 border-slate-200 hover:border-red-400 hover:text-red-400"}`}>
              ✗ No
            </button>
          </div>
        </div>

        {/* ── Campos ── */}
        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="field-label">Frecuencia</label>
            <select value={item.frecuencia} onChange={(e) => onUpdate(item.item_id, "frecuencia", e.target.value)} className="field-input">
              {FRECUENCIAS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Fecha verificación</label>
            <input type="date" value={item.fecha_verificacion || ""} onChange={(e) => onUpdate(item.item_id, "fecha_verificacion", e.target.value)} className="field-input" />
          </div>
          <div>
            <label className="field-label">Patrón de acción</label>
            <input type="text" value={item.patron_accion || ""} onChange={(e) => onUpdate(item.item_id, "patron_accion", e.target.value)} placeholder="Acción en caso de anomalía…" className="field-input" />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label">Notas / Incidencias</label>
            <textarea rows={2} value={item.notas || ""} onChange={(e) => onUpdate(item.item_id, "notas", e.target.value)} placeholder="Ej: Se cambió bombilla, falta una taza…" className="field-input resize-none" />
          </div>

          {/* Foto + Guardar historial */}
          <div className="sm:col-span-2 flex items-center gap-3 flex-wrap">
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFoto} />
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition
                ${uploading ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-nuba-cyan/10 text-nuba-cyan hover:bg-nuba-cyan/20"}`}>
              <span>{uploading ? "⏳" : "📷"}</span>
              <span>{uploading ? "Subiendo…" : "Añadir foto"}</span>
            </button>

            {item.foto_url && (
              <button onClick={() => setLightbox(true)} className="w-14 h-14 rounded-xl overflow-hidden border-2 border-nuba-cyan/30 hover:border-nuba-cyan transition flex-shrink-0">
                <img src={item.foto_url} alt="Evidencia" className="w-full h-full object-cover" />
              </button>
            )}

            <button onClick={handleGuardar} disabled={guardando || guardado}
              className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition
                ${guardado ? "bg-green-500 text-white" : guardando ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-nuba-blue text-white hover:bg-nuba-blue/80"}`}>
              <span>{guardado ? "✓ Guardado" : guardando ? "Guardando…" : "💾 Guardar en historial"}</span>
            </button>
          </div>
        </div>
      </div>

      {lightbox && item.foto_url && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setLightbox(false)}>
          <img src={item.foto_url} alt="Evidencia ampliada" className="max-w-full max-h-full rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full text-white text-xl flex items-center justify-center hover:bg-white/30 transition">✕</button>
        </div>
      )}
    </>
  );
}
