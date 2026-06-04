// ============================================================
// NUBA MANTENIMIENTO PREVENTIVO — App Root
// ============================================================
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ApartamentoView from "./components/ApartamentoView";
import { APARTAMENTOS } from "./data/data";

export default function App() {
  const [apartamentoActivo, setApartamentoActivo] = useState(APARTAMENTOS[0]);

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

        <ApartamentoView apartamento={apartamentoActivo} />
      </div>
    </div>
  );
}
