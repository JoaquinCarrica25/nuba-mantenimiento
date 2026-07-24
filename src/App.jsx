// ============================================================
// NUBA MANTENIMIENTO PREVENTIVO — App Root
// ============================================================
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ApartamentoView from "./components/ApartamentoView";
import { APARTAMENTOS, PERFILES } from "./data/data";

const PERFIL_COLORES = {
  "Vanessa": { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300", emoji: "👩‍💻" },
  "Nanda":   { bg: "bg-amber-100",  text: "text-amber-700",  border: "border-amber-300",  emoji: "👩‍💼" },
  "Joaquin": { bg: "bg-cyan-100",   text: "text-cyan-700",   border: "border-cyan-300",   emoji: "👨‍💼" },
};

function ProfileSelector({ onSelect }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-nuba-cyan rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-nuba-cyan/30">
            <span className="text-4xl">🏠</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">NUBA</h1>
          <p className="text-nuba-cyan text-sm font-medium mt-1">Mantenimiento Preventivo</p>
        </div>

        <p className="text-slate-400 text-center text-sm mb-6 font-medium">¿Quién eres hoy?</p>

        <div className="flex flex-col gap-4">
          {PERFILES.map((perfil) => {
            const c = PERFIL_COLORES[perfil] || { bg:"bg-slate-100", text:"text-slate-700", border:"border-slate-300", emoji:"👤" };
            return (
              <button
                key={perfil}
                onClick={() => onSelect(perfil)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 ${c.border} ${c.bg} ${c.text} font-bold text-lg transition-all hover:scale-105 hover:shadow-lg`}
              >
                <span className="text-3xl">{c.emoji}</span>
                {perfil}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [perfil, setPerfil] = useState(null);
  const [apartamentoActivo, setApartamentoActivo] = useState(APARTAMENTOS[0]);

  // Pantalla de selección de perfil
  if (!perfil) {
    return <ProfileSelector onSelect={setPerfil} />;
  }

  const c = PERFIL_COLORES[perfil] || { bg:"bg-slate-100", text:"text-slate-700", emoji:"👤" };

  return (
    <div className="h-screen flex overflow-hidden bg-page font-sans">
      {/* ── Sidebar ── */}
      <Sidebar
        activo={apartamentoActivo}
        onSelect={setApartamentoActivo}
      />

      {/* ── Contenido principal ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Spacer para el botón hamburger en móvil */}
        <div className="md:hidden h-16 flex-shrink-0" />

        {/* Barra de perfil activo */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-2 flex items-center justify-between">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${c.bg} ${c.text} text-sm font-semibold`}>
            <span>{c.emoji}</span>
            <span>{perfil}</span>
          </div>
          <button
            onClick={() => setPerfil(null)}
            className="text-xs text-slate-400 hover:text-slate-600 font-medium transition flex items-center gap-1"
          >
            <span>⇄</span> Cambiar perfil
          </button>
        </div>

        <ApartamentoView apartamento={apartamentoActivo} perfilActivo={perfil} />
      </div>
    </div>
  );
}
