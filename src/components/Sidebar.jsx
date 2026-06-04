// ============================================================
// NUBA MANTENIMIENTO — Sidebar / Navegación
// ============================================================
import { useState } from "react";
import { APARTAMENTOS } from "../data/data";

export default function Sidebar({ activo, onSelect, progresoPorApto = {} }) {
  const [open, setOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const filtrados = APARTAMENTOS.filter((a) =>
    a.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSelect = (apto) => {
    onSelect(apto);
    setOpen(false);
  };

  return (
    <>
      {/* ── Mobile toggle ─────────────────────────────────── */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-nuba-blue rounded-xl flex items-center justify-center shadow-lg"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        <span className="text-white text-xl">{open ? "✕" : "☰"}</span>
      </button>

      {/* ── Overlay mobile ────────────────────────────────── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar panel ─────────────────────────────────── */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full z-40
          w-72 md:w-64 lg:w-72 flex-shrink-0
          bg-sidebar flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          shadow-2xl md:shadow-none
        `}
      >
        {/* Logo / Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-nuba-cyan flex items-center justify-center font-bold text-white text-sm shadow flex-shrink-0">
              NUBA
            </div>
            <div>
              <p className="text-white font-bold text-base tracking-wide leading-tight">
                NUBA
              </p>
              <p className="text-white/50 text-xs italic">
                Apartamentos
              </p>
            </div>
          </div>
        </div>

        {/* Buscador */}
        <div className="px-4 py-3">
          <input
            type="text"
            placeholder="Buscar apartamento…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/40 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-nuba-accent/60 transition"
          />
        </div>

        {/* Lista apartamentos */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5 scrollbar-thin">
          {filtrados.map((apto) => {
            const prog = progresoPorApto[apto] ?? null;
            const esActivo = activo === apto;
            return (
              <button
                key={apto}
                onClick={() => handleSelect(apto)}
                className={`
                  w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium
                  flex items-center justify-between gap-2 transition-all duration-150
                  ${esActivo
                    ? "bg-nuba-accent text-white shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <span className="truncate">{apto}</span>
                {prog !== null && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 font-semibold
                      ${prog === 100
                        ? "bg-green-500/30 text-green-300"
                        : prog > 0
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-white/10 text-white/40"
                      }
                    `}
                  >
                    {prog}%
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <p className="text-white/30 text-xs text-center">
            {APARTAMENTOS.length} apartamentos
          </p>
        </div>
      </aside>
    </>
  );
}
