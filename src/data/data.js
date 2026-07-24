// ============================================================
// NUBA MANTENIMIENTO PREVENTIVO — Data Layer
// ============================================================

export const APARTAMENTOS = [
  "ALMADEN", "CARRETAS", "CAVA ALTA", "CONCEPCIÓN", "COSTANILLA",
  "FOMENTO", "IMPERIAL", "MAYOR", "MONTERA", "MORATIN", "MORERIA",
  "MORENO NIETO", "NAVAS", "SAN BARTOLOME", "SAN MIGUEL", "TETUAN",
  "TORRECILLA", "VIRGEN DE LA PALOMA", "VALENCIA", "OLIVAR", "INFANTE",
  "ZURBANO", "ROBLEDO", "MOSTENSES", "ANTONIO LOPES"
];

export const PERFILES = ["Vanessa", "Nanda", "Joaquin"];

export const RESPONSABLES = ["Joaquín", "Nanda", "Oscar", "Vanessa", "Piney"];

export const FRECUENCIAS = ["Semanalmente", "Quincenalmente", "Mensualmente"];

export const ITEMS_BASE = [
  { id: 1,  nombre: "Llaves",                observacion: "2 llaves + 2 tarjetas" },
  { id: 2,  nombre: "App Yacan Smart",        observacion: "Tiene suficiente batería" },
  { id: 3,  nombre: "WIFI / Router",          observacion: "Conectarse a la red y comprobar que funciona" },
  { id: 4,  nombre: "Mando Tele",             observacion: "Comprobar que enciende y funciona" },
  { id: 5,  nombre: "Mando AA",               observacion: "Comprobar que enciende y funciona" },
  { id: 6,  nombre: "Secador de pelo",        observacion: "Comprobar que enciende y funciona" },
  { id: 7,  nombre: "Aire Acondicionado",     observacion: "Comprobar que enfría/calienta según estación. Probarlo durante la limpieza y apagarlo al salir." },
  { id: 8,  nombre: "Plancha",                observacion: "Comprobar que se enciende y que no tiene manchas de quemaduras" },
  { id: 9,  nombre: "Placa Inducción",        observacion: "Comprobar que enciende y que no esté bloqueada" },
  { id: 10, nombre: "Hervidor",               observacion: "Comprobar que funcione y que quede vacío" },
  { id: 11, nombre: "Tostadora",              observacion: "Comprobar que no hay migas y que enciende sin hacer saltar fusibles" },
  { id: 12, nombre: "Aspiradora",             observacion: "Aspira correctamente" },
  { id: 13, nombre: "Horno",                  observacion: "Comprobar que enciende y que no tiene restos de comida" },
  { id: 14, nombre: "Microondas",             observacion: "Comprobar que funciona y no tiene restos de comida" },
  { id: 15, nombre: "Balcón",                 observacion: "Sin restos de cigarrillos" },
  { id: 16, nombre: "Terraza",                observacion: "Sin restos de cigarrillos" },
  { id: 17, nombre: "Iluminación",            observacion: "Comprobar que encienden todas las luces de TECHO y LÁMPARAS DE MESA" },
  { id: 18, nombre: "Cafetera Nespresso",     observacion: "Funcione y sin restos de cápsulas" },
  { id: 19, nombre: "Estores",                observacion: "Funcionan correctamente" },
  { id: 20, nombre: "Lavadora",               observacion: "Comprobar que el tirador de la puerta esté en buen estado, la puerta seca y goma seca y limpia" },
  { id: 21, nombre: "Lavavajillas",           observacion: "Vacío y abierto" },
  { id: 22, nombre: "Tazas",                  observacion: "Mínimo 6 comensales" },
  { id: 23, nombre: "Vasos",                  observacion: "Mínimo 6" },
  { id: 24, nombre: "Copas vino",             observacion: "Mínimo 6" },
  { id: 25, nombre: "Cubertería",             observacion: "Mínimo 6 comensales" },
  { id: 26, nombre: "Vajillas",               observacion: "Mínimo 6 comensales" },
  { id: 27, nombre: "Campana extractora",     observacion: "Comprobar que funciona" },
  { id: 28, nombre: "Ollas",                  observacion: "En buen estado" },
  { id: 29, nombre: "Sartenes",               observacion: "En buen estado" },
  { id: 30, nombre: "Dosificadores baño/ducha", observacion: "Rellenar por encima de la mitad" },
  { id: 31, nombre: "Desagües lavabo y ducha", observacion: "Hacer correr el agua" },
];

// Ítems exclusivos de ROBLEDO (se añaden a los base)
export const ITEMS_ROBLEDO = [
  { id: 32, nombre: "Barbacoa — restos de comida", observacion: "Comprobar que la barbacoa está sin restos de comida" },
  { id: 33, nombre: "Barbacoa — gas",              observacion: "Comprobar que la barbacoa tenga GAS" },
  { id: 34, nombre: "Sombrillas",                  observacion: "Comprobar que las sombrillas se abren" },
  { id: 35, nombre: "Hamacas",                     observacion: "Comprobar que las hamacas no están rotas o manchadas" },
];

/**
 * Devuelve los items base para un apartamento.
 * Si es ROBLEDO, añade los ítems exclusivos al final.
 */
export function getItemsIniciales(apartamento) {
  const base = apartamento === "ROBLEDO"
    ? [...ITEMS_BASE, ...ITEMS_ROBLEDO]
    : ITEMS_BASE;

  return base.map((item) => ({
    item_id:            item.id,
    nombre:             item.nombre,
    observacion:        item.observacion,
    frecuencia:         "Semanalmente",
    estado:             false,
    fecha_verificacion: null,
    responsable:        "",
    notas:              "",
    patron_accion:      "",
    foto_url:           null,
    funciona:           null,
  }));
}
