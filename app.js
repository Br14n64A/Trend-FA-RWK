/**
 * PCBA Status Dashboard Logic - v3.0
 * Supports manual upload, robust filtering, and MODEL_SERIAL mapping.
 */

const MODEL_MAP = {
    "1A62RDC00-600-G": "Dove-A Riser",
    "1A729RM00-600-G": "UPDB S0 B6",
    "1A729RN00-600-G": "UPDB S1 B6",
    "1A729RR00-600-G": "UPDB S4 B6",
    "1A72ALM00-600-G": "MoBo S0 B3",
    "1A72ALN00-600-G": "MoBo S1 B3",
    "1A72BE200-600-G": "Makalu MB S0-PVT2",
    "1A72BE300-600-G": "Makalu MB S1-PVT2",
    "1A72BED00-600-G": "Makalu MB S2-PVT2",
    "1A727YE00-600-G": "Makalu MP S0-PVT",
    "1A727YF00-600-G": "Makalu MP S1-PVT",
    "1A727Y900-600-G": "Makalu MP S2-PVT",
    "1A727YA00-600-G": "Makalu Riser S0-PVT1",
    "1A727YB00-600-G": "Makalu Riser S1-PVT1",
    "1A727YD00-600-G": "uC_MODULE1 PVT-B1",
    "1A728GB00-600-G": "MAKALU49_56 MP",
    "FGDF127137-003": "K2V5-DVD Bridgeboard Interposer",
    "FGDF127776-003": "Front Panel Board",
    "FGDF130471-005": "JRD X03",
    "FGDF131076-005": "Mini HUM",
    "FGDF131132-001": "K2V5-JRD Riser X00 Respin",
    "FWB3566021005": "Backplane",
    "FWB3829002001": "Interposer",
    "FWB3829003004": "IO EXPANDER",
    "FWB3566024005": "SMC AST2600",
    "FWB3829004001": "SWB 3829",
    "1A52FEA00-600-G": "Oriole Interposer",
    "1A52BFP00-600-G": "Dove Riser",
    "1A52VEE00-600-G": "Indica Riser",
    "1A62RDB00-600-G": "Indica-A Riser",
    "1A626AY00-600-G": "Sparrow MB - TT",
    "1A6289D00-600-G": "Sparrow MB - MM",
    "1A624J500-600-G": "Swan TPM",
    "1A62VA800-600-G": "Swan TPM",
    "1A62JLT00-600-G": "Hooter PDB II",
    "1A62JLU00-600-G": "Hooter PDB ADI",
    "1A62LR500-600-G": "MoBo S1",
    "1A62LRA00-600-G": "MoBo S0",
    "1A62LR600-600-G": "MoBo S2",
    "1A62M0100-600-G": "Riser",
    "1A62L4T00-600-G": "Uc Module",
    "1A62L4U00-600-G": "Uc Module 3",
    "1A62P7T00-600-G": "MP-H B3 S0",
    "1A62P7R00-600-G": "MP-H B3 S1",
    "1A62P7S00-600-G": "MP-H B3 S2",
    "1A62M9P00-600-G": "MoBo + USK",
    "1A62SRG00-600-G": "SSD 4TB SKU70",
    "1A62SRH00-600-G": "SSD 4TB SKU71",
    "1A62SRW00-600-G": "SSD 4TB SKU73",
    "1A62SRK00-600-G": "SSD 4TB SKU74",
    "1A62RT00-600-G": "SSD 8TB SKU82",
    "1A62SS300-600-G": "SSD 4TB SKU89",
    "1A62SS500-600-G": "SSD 4TB SKU91",
    "1A62M4C00-600-G": "SSD 4TB SKU102",
    "1A62M4600-600-G": "SSD 4TB SKU105",
    "1A62VV300-600-G": "SSD 16TB SKU122",
    "1A62VUQ00-600-G": "SSD 16TB SKU132",
    "1A62VUJ00-600-G": "SSD 16TB SKU140",
    "1A72DYU00-600-G": "SSD MCV3 8TB",
    "1A72D6700-600-G": "SSD MCV3 16TB",
    "1A72DYT00-600-G": "SSD MCV3 16TB",
    "1A62VDD00-600-G": "JAMMA UC MODULE 1",
    "1A722A000-600-G": "NOGA MB",
    "1A721Y000-600-G": "JUPITER MB",
    "1A722ML00-600-G": "K2V5 NITRO RISER",
    "1A62H4R00-600-G": "Strike PDB",
    "1A626DF00-600-G": "MoBo B1 S0",
    "1A626DE00-600-G": "MP-H",
    "1A62FMM00-600-G": "UPDB S0",
    "1A62FMN00-600-G": "UPDB S1",
    "1A62P2G00-600-G": "UPDB S0 B5",
    "1A62P2H00-600-G": "UPDB S1 B5",
    "1A62P2E00-600-G": "UPDB S4 B5",
    "1A62P2900-600-G": "MP-H S0",
    "1A62P2500-600-G": "MP-H S1",
    "1A62DF900-600-G": "SSD 4TB SKU01",
    "1A62JDF00-600-G": "SSD 4TB SKU02",
    "1A62JDA00-600-G": "SSD 8TB SKU09",
    "1A62JDB00-600-G": "SSD 8TB SKU10",
    "1A62JD000-600-G": "SSD 4TB SKU18",
    "1A62JD400-600-G": "SSD 4TB SKU21",
    "1A62JD000-600-G": "SSD 4TB SKU22",
    "1A62JCD00-600-G": "SSD 8TB SKU25",
    "1A62JCA00-600-G": "SSD 8TB SKU29",
    "1A62JCB00-600-G": "SSD 8TB SKU30",
    "1A62JCC00-600-G": "SSD 8TB SKU31",
    "1A62KNK00-600-G": "SSD 4TB SKU36",
    "1A62KNM00-600-G": "SSD 4TB SKU37",
    "1A62KNF00-600-G": "SSD 4TB SKU39",
    "1A62KN200-600-G": "SSD 8TB SKU48",
    "1A62N3000-600-G": "SSD 4TB SKU61",
    "1A62N2W00-600-G": "SSD 4TB SKU64",
    "1A62N2J00-600-G": "SSD 8TB SKU66",
    "1A62N2K00-600-G": "SSD 8TB SKU67",
    "1A62VUE00-600-G": "SSD 16TB SKU 143",
    "1A72GV900-600-G": "UPDB",
    "1A72GVS00-600-G": "UPDB",
    "1A728J700-600-G": "CORDITE S1"
};

const MODEL_CODE_MAP = {
    "7021206": "NOGA",
    "7020906": "JUPITER",
    "7020907": "JUPITER",
    "7017786": "CORDITE",
    "7021697": "CORDITE",
    "7021651": "UPDB",
    "7017916": "MIDPLANE",
    "7021135": "LUNAR",
    "7020452": "MAKALU",
    "7020456": "NOGA",
    "7021698": "UC MODULE",
    "7021205": "NOGA"
};


const CATEGORIES = ["MB", "NOGA", "JUPITER", "CORDITE", "UPDB", "MIDPLANE", "UC Module", "RISER", "SSD"];

const AGING_CATEGORIES = [
    "MAYOR A 90", "80 A 89", "70 A 79", "60 A 69",
    "50 A 59", "30 A 49", "MENOR A 30", "LINEA"
];

const AGING_COLORS = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308",
    "#84cc16", "#22d3ee", "#38bdf8", "#818cf8",
    "#a78bfa", "#f472b6", "#34d399", "#fb923c"
];

const SERIAL_TO_CATEGORY = {
    // MB
    "1A626AY00-600-G": "MB",
    "1A6289D00-600-G": "MB",
    // NOGA
    "1A72BE200-600-G": "NOGA",
    "1A72BE300-600-G": "NOGA",
    "1A72BED00-600-G": "NOGA",
    "1A722A000-600-G": "NOGA",
    // MOBO -> MB
    "1A62LR500-600-G": "MB",
    "1A62LRA00-600-G": "MB",
    "1A62LR600-600-G": "MB",
    // JUPITER
    "1A727YE00-600-G": "JUPITER",
    "1A727YF00-600-G": "JUPITER",
    "1A727Y900-600-G": "JUPITER",
    // CORDITE
    "1A728GB00-600-G": "CORDITE",
    "1A728J700-600-G": "CORDITE",
    // MIDPLANE
    "1A62P7T00-600-G": "MIDPLANE",
    "1A62P7R00-600-G": "MIDPLANE",
    "1A62P7S00-600-G": "MIDPLANE",
    // UC Module
    "1A727YD00-600-G": "UC Module",
    "1A62L4T00-600-G": "UC Module",
    "1A62L4U00-600-G": "UC Module",
    "1A62VDD00-600-G": "UC Module",
    // HOTTER
    "1A62JLT00-600-G": "HOTTER",
    "1A62JLU00-600-G": "HOTTER",
    // DOVE
    "1A52BFP00-600-G": "DOVE",
    // RISER
    "1A727YA00-600-G": "RISER",
    "1A727YB00-600-G": "RISER",
    "1A62M0100-600-G": "RISER",
    "1A722ML00-600-G": "RISER",
    "1A72GVS00-600-G": "UPDB",
    // SSD
    "1A62RT00-600-G": "SSD",
    "1A62JDF00-600-G": "SSD",
    "1A62JDA00-600-G": "SSD",
    "1A62JDB00-600-G": "SSD",
    "1A62JD200-600-G": "SSD",
    "1A62JD400-600-G": "SSD",
    "1A62JD000-600-G": "SSD",
    "1A62JCD00-600-G": "SSD",
    "1A62JCA00-600-G": "SSD",
    "1A62JCB00-600-G": "SSD",
    "1A62JCC00-600-G": "SSD",
    "1A62KNK00-600-G": "SSD",
    "1A62KNM00-600-G": "SSD",
    "1A62KNF00-600-G": "SSD",
    "1A62KN200-600-G": "SSD",
    "1A62N3000-600-G": "SSD",
    "1A62N2W00-600-G": "SSD",
    "1A62N2J00-600-G": "SSD",
    "1A62N2K00-600-G": "SSD",
    "1A62VUE00-600-G": "SSD",
    "1A62VUJ00-600-G": "SSD",
    "1A62VV300-600-G": "SSD",
    "1A62VUQ00-600-G": "SSD",
    "1A62SRG00-600-G": "SSD",
    "1A62SRH00-600-G": "SSD",
    "1A62SRW00-600-G": "SSD",
    "1A62SRK00-600-G": "SSD",
    "1A62SRT00-600-G": "SSD",
    "1A62SS300-600-G": "SSD",
    "1A62SS500-600-G": "SSD",
    "1A62M4C00-600-G": "SSD",
    "1A62M4600-600-G": "SSD"
};

// Map the detailed names from MODEL_MAP (which is already in app.js) to categories
function getCategory(rawModel) {
    const trimmed = String(rawModel || '').trim();

    // Ignore noise and headers
    if (!trimmed || trimmed.toUpperCase().includes('ASSY PN') || trimmed.toUpperCase().startsWith('NC-')) {
        return "OTHER";
    }

    const upperTrimmed = trimmed.toUpperCase();
    if (SERIAL_TO_CATEGORY[upperTrimmed]) {
        return SERIAL_TO_CATEGORY[upperTrimmed];
    }

    if (MODEL_CODE_MAP[trimmed]) {
        return MODEL_CODE_MAP[trimmed];
    }

    // Fallback logic by name keyword matching
    const mappedName = getMappedName(rawModel).toUpperCase();
    
    if (mappedName.includes("NOGA") || mappedName.includes("MAKALU MB")) return "NOGA";
    if (mappedName.includes("JUPITER")) return "JUPITER";
    if (mappedName.includes("CORDITE")) return "CORDITE";
    if (mappedName.includes("MAKALU MP") || mappedName.includes("MIDPLANE")) return "MIDPLANE";
    if (mappedName.includes("UC MODULE") || mappedName.includes("UC_MODULE")) return "UC Module";
    if (mappedName.includes("RISER")) return "RISER";
    if (mappedName.includes("SSD")) return "SSD";
    if (mappedName.includes("MOBO")) return "MB";
    if (mappedName.includes("UPDB")) return "UPDB";
    if (mappedName.includes("SPARROW") || mappedName.includes("MB") || mappedName.includes("SWAN") || mappedName.includes("TPM")) return "MB";

    if (mappedName !== 'UNKNOWN' && mappedName !== trimmed.toUpperCase()) {
        console.warn(`[getCategory] Model not categorized: ${rawModel} (${mappedName})`);
    }
    
    // If it's a model number but not in our list, try to return its base name
    return "OTHER";
}

const WEEK_DAYS = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];

// DIAS FESTIVOS (MEXICO) - Se pueden agregar más fechas según sea necesario
const HOLIDAYS = [
    "2024-01-01", "2024-02-05", "2024-03-18", "2024-05-01", "2024-09-16", "2024-11-18", "2024-12-25",
    "2025-01-01", "2025-02-03", "2025-03-17", "2025-05-01", "2025-09-16", "2025-11-17", "2025-12-25",
    "2026-01-01", "2026-02-02", "2026-03-16", "2026-05-01", "2026-09-16", "2026-11-16", "2026-12-25"
];

function isHoliday(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return HOLIDAYS.includes(dateStr);
}


const CONFIG = {
    colModelIndex: 12,       // Column M (0-indexed) — ASSY PN / Número de parte
    colWorkOrderIndex: 3,    // Column D (0-indexed) — Work Order / Status (filtramos por "FAIL")
    colErrorCodeIndex: 12    // Column M (0-indexed)
};

let rawData = [];
let filteredData = [];
let headers = [];
let isEditMode = false;

let charts = {
    entradas: null,
    salidas: null,
    first: null,
    second: null,
    altoAging: null
};

// Storage Structure: 
// {
//   version: "4.2",
//   weekId: "2026-W09",
//   prevFridayData: { "NOGA": 197, ... },
//   stats: { total: 0, filtered: 0 },
//   headers: [],
//   detailRows: [],
//   data: {
//     "NOGA": { "LUNES": 10, ... },
//     ...
//   }
// }

document.addEventListener('DOMContentLoaded', async () => {
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) fileUpload.addEventListener('change', handleFileUpload);

    // Initial load from server
    await loadStateFromServer();

    // Track visit (anonymous)
    trackVisit();

    // Navigation Listeners
    const btnSummary = document.getElementById('btnSummary');
    const btnDashboard = document.getElementById('btnDashboard');
    const btnGoles = document.getElementById('btnGoles');
    const btnHistory = document.getElementById('btnHistory');

    if (btnSummary) btnSummary.addEventListener('click', () => switchView('summary'));
    if (btnDashboard) btnDashboard.addEventListener('click', () => switchView('dashboard'));
    if (btnGoles) btnGoles.addEventListener('click', () => switchView('goles'));
    if (btnHistory) btnHistory.addEventListener('click', () => switchView('history'));

    const btnExportPPT = document.getElementById('btnExportPPT');
    if (btnExportPPT) btnExportPPT.addEventListener('click', exportToPPT);

    const btnDownloadAltoAging = document.getElementById('btnDownloadAltoAging');
    if (btnDownloadAltoAging) btnDownloadAltoAging.addEventListener('click', exportAltoAgingToExcel);

    const btnDownloadEntradas = document.getElementById('btnDownloadEntradas');
    if (btnDownloadEntradas) btnDownloadEntradas.addEventListener('click', () => {
        if (window.dashboard_storage && window.dashboard_storage.entradasData) {
            exportGenericDataToExcel(window.dashboard_storage.entradasData, 'Entradas', 'Entradas_Source_Data');
        } else {
            updateStatus('No hay datos descargables para Entradas', 'error');
        }
    });

    const btnDownloadSalidas = document.getElementById('btnDownloadSalidas');
    if (btnDownloadSalidas) btnDownloadSalidas.addEventListener('click', () => {
        if (window.dashboard_storage && window.dashboard_storage.salidasData) {
            exportGenericDataToExcel(window.dashboard_storage.salidasData, 'Salidas', 'Salidas_Source_Data');
        } else {
            updateStatus('No hay datos descargables para Salidas', 'error');
        }
    });

    const btnDownloadFirst = document.getElementById('btnDownloadFirst');
    if (btnDownloadFirst) btnDownloadFirst.addEventListener('click', () => {
        if (window.dashboard_storage && window.dashboard_storage.firstData) {
            exportGenericDataToExcel(window.dashboard_storage.firstData, 'FIRST', 'FIRST_Source_Data');
        } else {
            updateStatus('No hay datos descargables para FIRST', 'error');
        }
    });

    const btnDownloadSecond = document.getElementById('btnDownloadSecond');
    if (btnDownloadSecond) btnDownloadSecond.addEventListener('click', () => {
        if (window.dashboard_storage && window.dashboard_storage.secondData && window.dashboard_storage.secondData.validRows) {
            exportGenericDataToExcel(window.dashboard_storage.secondData.validRows, 'SECOND', 'SECOND_Source_Data');
        } else {
            updateStatus('No hay datos descargables para SECOND (Cargue el archivo de nuevo)', 'error');
        }
    });

    const btnDownloadGoles = document.getElementById('btnDownloadGoles');
    if (btnDownloadGoles) btnDownloadGoles.addEventListener('click', () => {
        if (window.dashboard_storage && window.dashboard_storage.golesData && window.dashboard_storage.golesData.validRows) {
            exportGenericDataToExcel(window.dashboard_storage.golesData.validRows, 'GOLES', 'GOLES_Source_Data');
        } else {
            // Compatibilidad hacia atrás
            if (window.dashboard_storage && Array.isArray(window.dashboard_storage.golesData)) {
                exportGenericDataToExcel(window.dashboard_storage.golesData, 'GOLES', 'GOLES_Source_Data');
            } else {
                updateStatus('No hay datos descargables para GOLES', 'error');
            }
        }
    });

    // No export to excel button found in HTML, so we remove the listener to avoid errors

    const btnToggleEdit = document.getElementById('btnToggleEdit');
    if (btnToggleEdit) {
        btnToggleEdit.addEventListener('click', () => {
            if (!isEditMode) {
                // Solicitar clave para entrar a modo edición
                const pass = prompt('Ingrese clave de administrador para editar:');
                if (pass === 'admin123') { // Cambia esto por tu clave deseada
                    isEditMode = true;
                    btnToggleEdit.classList.add('active');
                    // Preserve btn-text and btn-icon spans for mobile compatibility
                    const btnTextSpan = btnToggleEdit.querySelector('.btn-text');
                    const btnIconSpan = btnToggleEdit.querySelector('.btn-icon');
                    if (btnTextSpan) btnTextSpan.textContent = '✅ Guardar Cambios';
                    if (btnIconSpan) btnIconSpan.textContent = '✅';
                    renderSummaryTable();
                    updateStatus('Modo Edición ACTIVADO', 'info');
                } else {
                    alert('Clave incorrecta. Solo administradores pueden editar.');
                }
            } else {
                isEditMode = false;
                btnToggleEdit.classList.remove('active');
                // Preserve btn-text and btn-icon spans for mobile compatibility
                const btnTextSpan = btnToggleEdit.querySelector('.btn-text');
                const btnIconSpan = btnToggleEdit.querySelector('.btn-icon');
                if (btnTextSpan) btnTextSpan.textContent = '✏️ Modo Edición';
                if (btnIconSpan) btnIconSpan.textContent = '✏️';
                renderSummaryTable();
                updateStatus('Cambios guardados', 'success');
            }
        });
    }
});

window.updateManualSummary = async (cat, day, value) => {
    const val = parseInt(value, 10) || 0;
    const stored = window.dashboard_storage;
    if (day === 'PREV') {
        if (!stored.prevFridayData[cat]) stored.prevFridayData[cat] = { count: 0, trend: 'trend-equal' };
        if (typeof stored.prevFridayData[cat] === 'object') {
            stored.prevFridayData[cat].count = val;
        } else {
            stored.prevFridayData[cat] = { count: val, trend: 'trend-equal' };
        }
    } else {
        if (!stored.data[cat]) stored.data[cat] = {};
        stored.data[cat][day] = val;
    }
    // Guardar cambios
    await saveStateToServer();
    console.log("Datos acumulados actualizados y guardados.");
    // No full re-render here to avoid losing focus if using individual inputs, 
    // but we need it to update totals. Maybe just re-render totals or use a timer.
    // For now, full re-render is okay as onchange usually happens on blur.
    renderSummaryTable();
};

async function loadStateFromServer() {
    const isHttp = window.location.protocol.startsWith('http');

    if (isHttp) {
        updateStatus('Sincronizando con servidor...', 'info');
        try {
            const response = await fetch('data_handler.php');
            const data = await response.json();

            if (data && !data.error) {
                window.dashboard_storage = data;
                localStorage.setItem('dashboard_storage', JSON.stringify(data)); // Keep local sync
                await checkWeeklyReset();
                restoreState();
                updateStatus('Sincronizado (Servidor)', 'success');
                return;
            }
        } catch (e) {
            console.warn("Server fetch failed, falling back to local storage:", e);
        }
    }

    // Fallback/Standard Local Storage
    updateStatus('Cargando memoria local...', 'info');
    try {
        const localData = localStorage.getItem('dashboard_storage');
        const data = localData ? JSON.parse(localData) : null;

        if (data && !data.error) {
            window.dashboard_storage = data;
            await checkWeeklyReset();
            restoreState();
            updateStatus('Memoria lista (Local)', 'success');
        } else {
            await checkWeeklyReset();
            updateStatus('Listo', 'success');
        }
    } catch (e) {
        console.error("Error loading local data:", e);
        await checkWeeklyReset();
        updateStatus('Error de memoria', 'error');
    }
}

async function saveStateToServer() {
    if (!window.dashboard_storage) return;

    const stored = window.dashboard_storage;

    // 1. Prepare Summary Data for shared viewing (lightweight)
    // Always refresh summaries if source data is present
    if (stored.entradasData) {
        stored.entradasSummary = summarizeCategoryCounts(stored.entradasData, 3);
    }
    if (stored.salidasData) {
        stored.salidasSummary = summarizeCategoryCounts(stored.salidasData, 2);
    }
    if (stored.firstData) {
        stored.firstSummary = summarizeFirstData(stored.firstData);
    }
    if (stored.golesData && stored.golesData.goals) {
        stored.golesSummary = stored.golesData.goals;
    }

    // 2. Persistent Local Storage for heavy data (not synced to server)
    try {
        const largeDataMap = {
            'dashboard_entradas_source': stored.entradasData,
            'dashboard_salidas_source': stored.salidasData,
            'dashboard_first_source': stored.firstData,
            'dashboard_alto_aging_source': stored.altoAgingSourceData,
            'dashboard_mrb_source': stored.mrbSourceData
        };

        for (const [key, val] of Object.entries(largeDataMap)) {
            if (val) localStorage.setItem(key, JSON.stringify(val));
        }

        // Handle objects with nested large arrays
        if (stored.secondData && stored.secondData.validRows) {
            localStorage.setItem('dashboard_second_source', JSON.stringify(stored.secondData.validRows));
        } else if (Array.isArray(stored.secondData)) {
            localStorage.setItem('dashboard_second_source', JSON.stringify(stored.secondData));
        }

        if (stored.golesData && stored.golesData.validRows) {
            localStorage.setItem('dashboard_goles_source', JSON.stringify(stored.golesData.validRows));
        }
    } catch(e) {
        console.warn('LocalStorage limit exceeded for source data:', e);
    }

    // 3. Create payload for server - EXCLUDE all heavy source arrays
    const dataToSave = { ...stored };
    
    const keysToRemove = [
        'altoAgingSourceData', 'mrbSourceData', 
        'entradasData', 'salidasData', 'firstData', 
        'rawData', 'filteredData' 
    ];
    
    keysToRemove.forEach(k => delete dataToSave[k]);

    // Prune secondData and golesData for server
    if (dataToSave.secondData && dataToSave.secondData.validRows) {
        dataToSave.secondData = { ...dataToSave.secondData };
        delete dataToSave.secondData.validRows;
    }
    if (dataToSave.golesData && dataToSave.golesData.validRows) {
        dataToSave.golesData = { ...dataToSave.golesData };
        delete dataToSave.golesData.validRows;
    }

    // 3.5 DEEP HISTORY PRUNING: Ensure old history entries don't contain raw data
    if (Array.isArray(dataToSave.history)) {
        dataToSave.history = dataToSave.history.map(snapshot => {
            const pruned = { ...snapshot };
            keysToRemove.forEach(k => delete pruned[k]);
            if (pruned.secondData) {
                pruned.secondData = { ...pruned.secondData };
                delete pruned.secondData.validRows;
            }
            if (pruned.golesData) {
                pruned.golesData = { ...pruned.golesData };
                delete pruned.golesData.validRows;
            }
            return pruned;
        });
    }

    // Always save locally (the pruned version)
    try {
        localStorage.setItem('dashboard_storage', JSON.stringify(dataToSave));
    } catch (e) {
        console.error("Error saving local data:", e);
    }

    // 4. Save to server if on HTTP
    if (window.location.protocol.startsWith('http')) {
        try {
            const response = await fetch('data_handler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave)
            });
            if (!response.ok) {
                // If still 413, we might need even more pruning
                throw new Error(`Error HTTP: ${response.status}`);
            }
            updateStatus('Sincronizado', 'success');
        } catch (e) {
            console.error("Error saving to server:", e);
            const msg = e.message.includes('413') ? 'Error: Datos de Excel muy pesados' : 'Error de sincronización';
            updateStatus(msg, 'error');
        }
    }
}

function summarizeCategoryCounts(data, colIndex) {
    const counts = {};
    data.forEach(row => {
        if (!Array.isArray(row)) return;
        const rawModel = String(row[colIndex] || 'Unknown').trim();
        if (!rawModel || rawModel.toUpperCase() === 'MODEL' || rawModel.toUpperCase() === 'N/A') return;
        const category = getCategory(rawModel);
        counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
}

function summarizeFirstData(data) {
    const componentModelCounts = {};
    const componentHDetails = {}; 
    const models = new Set();
    const components = new Set();

    data.forEach(row => {
        if (!Array.isArray(row)) return;
        const component = String(row[9] || 'Unknown').trim();
        const rawModel = String(row[2] || 'Unknown').trim();
        const model = getCategory(rawModel);
        const colH = String(row[7] || 'N/A').trim();

        if (model !== "OTHER") {
            components.add(component);
            models.add(model);
            if (!componentModelCounts[component]) componentModelCounts[component] = {};
            componentModelCounts[component][model] = (componentModelCounts[component][model] || 0) + 1;

            if (colH && colH.toUpperCase() !== 'N/A') {
                if (!componentHDetails[component]) componentHDetails[component] = {};
                if (!componentHDetails[component][model]) componentHDetails[component][model] = {};
                componentHDetails[component][model][colH] = (componentHDetails[component][model][colH] || 0) + 1;
            }
        }
    });

    return { componentModelCounts, componentHDetails, models: Array.from(models), components: Array.from(components) };
}

function switchView(viewId) {
    const summaryView = document.getElementById('summaryView');
    const chartsView = document.getElementById('chartsView');
    const btnSummary = document.getElementById('btnSummary');
    const btnDashboard = document.getElementById('btnDashboard');
    const btnGoles = document.getElementById('btnGoles');
    const golesView = document.getElementById('golesView');
    const historyView = document.getElementById('historyView');
    const btnHistory = document.getElementById('btnHistory');

    if (viewId === 'summary') {
        summaryView.classList.remove('hidden');
        chartsView.classList.add('hidden');
        golesView.classList.add('hidden');
        if (historyView) historyView.classList.add('hidden');
        btnSummary.classList.add('active');
        btnDashboard.classList.remove('active');
        btnGoles.classList.remove('active');
        if (btnHistory) btnHistory.classList.remove('active');
    } else if (viewId === 'dashboard') {
        summaryView.classList.add('hidden');
        chartsView.classList.remove('hidden');
        golesView.classList.add('hidden');
        if (historyView) historyView.classList.add('hidden');
        btnSummary.classList.remove('active');
        btnGoles.classList.remove('active');
        if (btnHistory) btnHistory.classList.remove('active');
        btnDashboard.classList.add('active');

        // Trigger chart resize when view becomes visible
        Object.values(charts).forEach(chart => {
            if (chart) chart.resize();
        });
    } else if (viewId === 'goles') {
        summaryView.classList.add('hidden');
        chartsView.classList.add('hidden');
        golesView.classList.remove('hidden');
        if (historyView) historyView.classList.add('hidden');
        btnSummary.classList.remove('active');
        btnDashboard.classList.remove('active');
        if (btnHistory) btnHistory.classList.remove('active');
        btnGoles.classList.add('active');
    } else if (viewId === 'history') {
        summaryView.classList.add('hidden');
        chartsView.classList.add('hidden');
        golesView.classList.add('hidden');
        if (historyView) historyView.classList.remove('hidden');
        btnSummary.classList.remove('active');
        btnDashboard.classList.remove('active');
        if (btnHistory) btnHistory.classList.add('active');
        btnGoles.classList.remove('active');
        renderHistory();
    }
}

function restoreState() {
    const stored = window.dashboard_storage;
    if (!stored || !stored.data) return;

    // Restore heavy source data from LocalStorage
    try {
        const localSourceMap = {
            'dashboard_entradas_source': 'entradasData',
            'dashboard_salidas_source': 'salidasData',
            'dashboard_first_source': 'firstData',
            'dashboard_alto_aging_source': 'altoAgingSourceData',
            'dashboard_mrb_source': 'mrbSourceData'
        };

        for (const [lsKey, objKey] of Object.entries(localSourceMap)) {
            const savedData = localStorage.getItem(lsKey);
            if (savedData && !stored[objKey]) {
                stored[objKey] = JSON.parse(savedData);
                console.log(`[restoreState] Restored ${objKey} from local storage.`);
            }
        }

        // Restore nested sources
        const savedSecond = localStorage.getItem('dashboard_second_source');
        if (savedSecond && stored.secondData) {
            if (Array.isArray(stored.secondData)) {
                 stored.secondData = JSON.parse(savedSecond);
            } else if (!stored.secondData.validRows) {
                 stored.secondData.validRows = JSON.parse(savedSecond);
            }
        }

        const savedGoles = localStorage.getItem('dashboard_goles_source');
        if (savedGoles && stored.golesData && !stored.golesData.validRows) {
            stored.golesData.validRows = JSON.parse(savedGoles);
        }
    } catch(e) {
        console.warn('Error restoring state from local storage:', e);
    }

    // Restore Summary Table
    renderSummaryTable();

    // Restore Charts and GOLES
    if (stored.entradasData || stored.salidasData || stored.firstData) {
        renderDashboard(stored.entradasData || [], stored.salidasData || [], stored.firstData || []);
    }

    // Restore Second Failures
    const secondData = stored.secondData || stored.seconsData;
    if (secondData) {
        // Detectar formato válido: { modelCounts, modelFailures }
        const isNewFormat = secondData && !Array.isArray(secondData) && secondData.modelCounts;
        // Detectar formato obsoleto: { counts, details } o Array crudo
        const isLegacyFormat = Array.isArray(secondData) || (secondData && secondData.counts);

        if (isNewFormat) {
            renderSecondChart('secondChart', secondData);
        } else if (isLegacyFormat) {
            // Limpiar la caché obsoleta — se actualizará cuando el usuario suba el Excel
            console.log('[restoreState] secondData en formato obsoleto, limpiando caché...');
            delete stored.secondData;
            delete stored.seconsData;
            // No renderizar — el gráfico quedará vacío hasta la próxima subida de archivo
        }
    }

    if (stored.altoAgingData && Object.keys(stored.altoAgingData).length > 0) {
        renderAltoAgingChart(stored.altoAgingData);
    }

    if (stored.golesData) {
        if (Array.isArray(stored.golesData) && stored.golesData.length > 0) {
            renderGolesTable(stored.golesData); // Legacy
        } else if (stored.golesData.goals && stored.golesData.goals.length > 0) {
            renderGolesTable(stored.golesData.goals); // New
        }
    }


}


function getWeekId(date = new Date()) {
    const d = new Date(date.getTime());
    d.setHours(0, 0, 0, 0);
    
    // Ajuste para que la semana comience el Lunes (estilo operativo)
    // Domingo (0) se trata como el final de la semana anterior
    const day = d.getDay();
    if (day === 0) {
        d.setDate(d.getDate() + 1); // Domingo se trata como el inicio de la nueva semana (Lunes)
    }
    
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const startDayOffset = (startOfYear.getDay() + 6) % 7; // Lunes = 0
    const days = Math.floor((d - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNo = Math.ceil((days + startDayOffset + 1) / 7);
    
    return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}


async function checkWeeklyReset() {
    const currentWeekId = getWeekId();
    const APP_VERSION = "5.0";

    if (!window.dashboard_storage) {
        window.dashboard_storage = { 
            version: APP_VERSION, 
            weekId: currentWeekId, 
            data: {}, 
            history: [],
            prevFridayData: {}
        };
    }

    let stored = window.dashboard_storage;

    // 1. LOGICA DE REINICIO SEMANAL
    // Si la semana guardada es diferente a la actual, se archiva y se limpia.
    if (stored.weekId && stored.weekId !== currentWeekId) {
        console.log(`Cambio de semana detectado: ${stored.weekId} -> ${currentWeekId}`);
        updateStatus(`Nueva semana: Archivando ${stored.weekId}...`, 'info');

        // Crear respaldo en historial (solo datos ligeros)
        const snapshot = JSON.parse(JSON.stringify(stored));
        const heavyKeys = [
            'history', 'entradasData', 'salidasData', 'firstData', 
            'altoAgingSourceData', 'mrbSourceData', 'rawData', 'filteredData'
        ];
        heavyKeys.forEach(k => delete snapshot[k]);
        if (snapshot.secondData) delete snapshot.secondData.validRows;
        if (snapshot.golesData) delete snapshot.golesData.validRows;
        stored.history = stored.history || [];
        stored.history.unshift(snapshot);
        if (stored.history.length > 20) stored.history.pop(); // Guardar hasta 20 semanas

        // ACCION: Mover datos del Viernes a VIE ANT (Previous Friday)
        stored.prevFridayData = stored.prevFridayData || {};
        CATEGORIES.forEach(cat => {
            const lastFridayCount = (stored.data[cat] && stored.data[cat]["VIERNES"]) || 0;
            const lastThursdayCount = (stored.data[cat] && stored.data[cat]["JUEVES"]) || 0;
            
            // Determinar tendencia del viernes antes de limpiar
            let trend = "trend-equal";
            if (lastFridayCount < lastThursdayCount) trend = "trend-down";
            else if (lastFridayCount > lastThursdayCount) trend = "trend-up";

            // Guardamos para la comparación de la nueva semana
            stored.prevFridayData[cat] = {
                count: lastFridayCount,
                trend: trend
            };

            // Reiniciar casillas para la nueva semana
            stored.data[cat] = {};
            WEEK_DAYS.forEach(day => stored.data[cat][day] = 0);
        });

        stored.weekId = currentWeekId;
        await saveStateToServer();
        console.log("Dashboard reiniciado para la nueva semana.");
    } else if (!stored.weekId) {
        stored.weekId = currentWeekId;
    }

    // 2. ASEGURAR INTEGRIDAD DE DATOS (Categorías faltantes)
    let added = false;
    stored.data = stored.data || {};
    stored.prevFridayData = stored.prevFridayData || {};

    CATEGORIES.forEach(cat => {
        if (!stored.data[cat]) {
            stored.data[cat] = {};
            WEEK_DAYS.forEach(day => stored.data[cat][day] = 0);
            added = true;
        }
        if (!stored.prevFridayData[cat]) {
            stored.prevFridayData[cat] = { count: 0, trend: "trend-equal" };
            added = true;
        }
    });

    if (added || stored.version !== APP_VERSION) {
        stored.version = APP_VERSION;
        await saveStateToServer();
    }
    
    // Check missing properties for processed files tracking
    if (!stored.processedFiles) {
        stored.processedFiles = [];
        await saveStateToServer();
    }

    const weekPill = document.getElementById('currentWeekPill');
    if (weekPill) weekPill.textContent = currentWeekId;
}


function handleFileUpload(e) {
    const file = e.target.files[0];
    
    // Clear the input so that selecting the same file again triggers the event
    if (e.target) {
        e.target.value = '';
    }

    if (!file) return;

    updateStatus(`Reading ${file.name}...`);

    const reader = new FileReader();
    reader.onload = async function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {
                type: 'array',
                cellNF: true,      // leer formatos de número
                cellDates: true,   // convertir fechas
                cellText: false,   // no usar texto formateado
                cellFormula: true  // leer fórmulas y sus valores cacheados
            });

            // ── DEBUG: Mostrar todas las hojas disponibles en el workbook ──
            console.log('[WORKBOOK] Hojas disponibles:', workbook.SheetNames);

            // Verificar si hay cambio de semana antes de procesar los nuevos datos
            await checkWeeklyReset();

            // 1. Sheet 1 / Hoja 1 (PCBA_Status_AWS_OPEN_N-SHIPPING)
            const h1Name = workbook.SheetNames.find(n => n.toUpperCase().includes("HOJA 1")) || 
                           workbook.SheetNames.find(n => n.toUpperCase().includes("STATUS")) || 
                           workbook.SheetNames[0];
            const statusSheet = workbook.Sheets[h1Name];
            const statusRows = XLSX.utils.sheet_to_json(statusSheet, { header: 1 });
            
            // Crearemos un identificador único rápido para el archivo para evitar doble conteo
            const fileIdentifier = `${file.name}_${file.size}_${file.lastModified}`;
            
            if (statusRows.length > 1) {
                headers = statusRows[0];
                rawData = statusRows.slice(1);
                processData();
                await updateAccumulatedData(fileIdentifier); // Made async and awaited
                // Mostrar mensaje informativo al usuario
                const failCount = filteredData.length;
                const now2 = new Date();
                const dayIdx = now2.getDay() === 0 ? 0 : (now2.getDay() === 6 ? 0 : now2.getDay() - 1);
                const dayName = WEEK_DAYS[Math.min(dayIdx, WEEK_DAYS.length - 1)];
                updateStatus(`✓ ${failCount} registros FAIL actualizados en ${dayName}`, failCount > 0 ? 'success' : 'info');
            }

            // 2. Entradas (Hoja 2)
            let entradasSheetName = workbook.SheetNames.find(n => n.trim().toUpperCase() === 'ENTRADA' || n.trim().toUpperCase() === 'ENTRADAS');
            if (!entradasSheetName && workbook.SheetNames.length > 1) {
                entradasSheetName = workbook.SheetNames[1]; // Toma la hoja 2 explícitamente
            }
            const entradasSheet = entradasSheetName ? workbook.Sheets[entradasSheetName] : null;
            let entradasData = [];
            if (entradasSheet) {
                const rows = XLSX.utils.sheet_to_json(entradasSheet, { header: 1 });
                entradasData = processEntradas(rows);
            }

            // 3. Salidas
            const salidasSheet = workbook.Sheets["Salidas"];
            let salidasData = [];
            if (salidasSheet) {
                const rows = XLSX.utils.sheet_to_json(salidasSheet, { header: 1 });
                salidasData = processSalidas(rows);
            }

            // 4. FIRST
            const firstSheet = workbook.Sheets["FIRST"];
            let firstData = [];
            if (firstSheet) {
                const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                firstData = processFirst(rows);
            }

            // 5. SECOND
            let secondSheetName = workbook.SheetNames.find(n => n.trim().toUpperCase() === 'SECOND');
            if (!secondSheetName) {
                secondSheetName = workbook.SheetNames.find(n => n.trim().toUpperCase().includes('SECOND')) || workbook.SheetNames[5];
            }
            console.log('[SECOND] Nombre de hoja detectado:', secondSheetName);

            const secondSheet = secondSheetName ? workbook.Sheets[secondSheetName] : null;
            let secondData = { modelCounts: {}, modelFailures: {} };

            if (secondSheet) {
                // Usar defval:'' para que filas con fórmulas vacías/no-evaluadas
                // no sean ignoradas; raw:true para obtener valores numéricos exactos.
                const rows = XLSX.utils.sheet_to_json(secondSheet, {
                    header: 1,
                    defval: '',
                    raw: true
                });

                // ── DEBUG: Mostrar las primeras 8 filas de la hoja SECOND ──
                console.log('[SECOND] Total filas leídas:', rows.length);
                console.log('[SECOND] Primeras 8 filas (raw):');
                rows.slice(0, 8).forEach((row, i) => {
                    console.log(`  Fila ${i}:`, JSON.stringify(row));
                });

                // Verificar si hay valores o si todo está vacío (fórmulas no evaluadas)
                const nonEmptyRows = rows.slice(1).filter(r =>
                    r && (String(r[1] || '').trim() !== '' || String(r[2] || '').trim() !== '')
                );
                console.log('[SECOND] Filas con datos en col B o C:', nonEmptyRows.length);

                if (nonEmptyRows.length === 0) {
                    console.warn('[SECOND] ⚠️ ADVERTENCIA: Las columnas B y C están vacías.');
                    console.warn('[SECOND] Posible causa: la hoja usa fórmulas cuyo valor NO fue cacheado al guardar el archivo.');
                    console.warn('[SECOND] Solución: En Excel, presiona Ctrl+Alt+F9 para recalcular y luego guarda.');
                    updateStatus('⚠️ SECOND: Datos vacíos. Ver consola para diagnóstico.', 'error');
                }

                secondData = processSecond(rows);
                renderSecondChart('secondChart', secondData);
            } else {
                console.warn('[SECOND] ⚠️ Hoja SECOND no encontrada. Hojas disponibles:', workbook.SheetNames);
                updateStatus('⚠️ SECOND: Hoja no encontrada en el archivo.', 'error');
            }

            // 6. GOLES (Search by name "GOLES" or index 4)
            let golesSheetName = workbook.SheetNames.find(n => n.trim().toUpperCase() === "GOLES");

            // If not found by name, try common variations or fallback to index 4
            if (!golesSheetName) {
                golesSheetName = workbook.SheetNames.find(n => n.trim().toUpperCase().includes("GOLE")) || workbook.SheetNames[4];
            }

            const golesSheet = workbook.Sheets[golesSheetName];

            let golesData = { goals: [], validRows: [] };
            if (golesSheet) {
                const rows = XLSX.utils.sheet_to_json(golesSheet, { header: 1, defval: "" });
                golesData = processGoles(rows);
            }

            // 6. MRB sheet (for XLOOKUP formula)
            const mrbSheet = workbook.Sheets["MRB"];
            let mrbRows = [];
            if (mrbSheet) {
                mrbRows = XLSX.utils.sheet_to_json(mrbSheet, { header: 1, defval: "" });
            }

            // 7. Alto-Aging (from Sheet 1, col M & U, with IFS on col H and XLOOKUP from MRB)
            const altoAgingData = processAltoAging(statusRows, mrbRows);
            renderAltoAgingChart(altoAgingData);

            renderDashboard(entradasData, salidasData, firstData);
            if (golesData.goals && golesData.goals.length > 0) {
                renderGolesTable(golesData.goals);
            } else if (Array.isArray(golesData) && golesData.length > 0) {
                renderGolesTable(golesData);
            }

            // Persist all data
            let stored = window.dashboard_storage;
            stored.entradasData = entradasData;
            stored.salidasData = salidasData;
            stored.firstData = firstData;
            stored.secondData = secondData;
            stored.golesData = golesData;
            stored.altoAgingData = altoAgingData;
            saveStateToServer();

            // Mostrar mensaje de éxito general después de un breve retraso
            // para no sobreescribir el mensaje de conteo de registros FAIL
            setTimeout(() => updateStatus('Archivo procesado correctamente', 'success'), 2000);
        } catch (error) {
            console.error('Error processing Excel:', error);
            updateStatus('Error processing file.', 'error');
        }
    };
    reader.onerror = () => updateStatus('Error reading file.', 'error');
    reader.readAsArrayBuffer(file);
}

function processEntradas(rows) {
    if (rows.length < 2) return [];
    const headers = rows[0] || [];
    const data = rows.slice(1);
    // Deduplicate by Column A (index 0)
    const unique = [];
    const seen = new Set();
    data.forEach(row => {
        const id = String(row[0] || '').trim();

        if (id && !seen.has(id)) {
            seen.add(id);
            unique.push(row);
        }
    });
    return [headers, ...unique];
}

function processSalidas(rows) {
    if (rows.length < 2) return [];
    const headers = rows[0] || [];
    const data = rows.slice(1);
    // Deduplicate by Column B (index 1)
    const unique = [];
    const seen = new Set();
    data.forEach(row => {
        const id = String(row[1] || '').trim();
        const statusVal = String(row[9] || '').toUpperCase(); // Assume Col J for Salidas status

        const isMisjudge = statusVal.includes("MISJUDGE") || statusVal.includes("N/A");

        if (id && !isMisjudge && !seen.has(id)) {
            seen.add(id);
            unique.push(row);
        }
    });
    return [headers, ...unique];
}

function processSecond(rows) {
    // Hoja SECOND: columna B (índice 1) = Modelo, columna C (índice 2) = Falla
    if (!rows || rows.length < 2) return { modelCounts: {}, modelFailures: {}, validRows: [] };

    const headers = rows[0] || [];
    const validRows = [headers];

    const modelCounts = {};   
    const modelFailures = {}; 

    // Map de traducción de códigos numéricos de la hoja SECOND a categorías del Dashboard
    // Moved to global MODEL_CODE_MAP at top

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row) continue;

        const rawValue = String(row[1] || '').trim(); // Columna B (índice 1)
        const falla    = String(row[2] || '').trim(); // Columna C (índice 2)

        // Ignorar encabezados o ruido
        if (!rawValue || rawValue.toUpperCase() === 'MODEL' || 
            rawValue.toUpperCase() === 'MODELO' || 
            rawValue.toUpperCase() === 'N/A') continue;

        // Intentar mapear a una categoría conocida:
        // 1. Usar el mapa específico de 7 dígitos de SECOND
        let category = MODEL_CODE_MAP[rawValue];
        
        // 2. Si no es un código de 7 dígitos, probar si es un serial largo en SERIAL_TO_CATEGORY
        if (!category) {
            category = SERIAL_TO_CATEGORY[rawValue.toUpperCase()];
        }

        // 3. Si sigue sin mapearse, usar la función getCategory general (que usa MODEL_MAP)
        if (!category || category === "OTHER") {
            const fallbackCat = getCategory(rawValue);
            if (fallbackCat !== "OTHER") category = fallbackCat;
        }

        // Determinar nombre final: Categoría mapeada > Nombre descriptivo > Valor original
        const finalName = (category && category !== "OTHER") ? category : (getMappedName(rawValue) || rawValue);

        // Contar modelos
        modelCounts[finalName] = (modelCounts[finalName] || 0) + 1;

        // Agrupar fallas por modelo
        if (falla && falla.toUpperCase() !== 'N/A') {
            if (!modelFailures[finalName]) modelFailures[finalName] = {};
            modelFailures[finalName][falla] = (modelFailures[finalName][falla] || 0) + 1;
        }
        
        validRows.push(row);
    }

    console.log('[processSecond] Modelos procesados:', JSON.stringify(modelCounts));
    return { modelCounts, modelFailures, validRows };
}

function processFirst(rows) {
    if (rows.length < 2) return [];
    const headers = rows[0] || [];
    const data = rows.slice(1);
    const unique = [];
    const seen = new Set();

    data.forEach(row => {
        const colD = String(row[3] || '').trim(); // Column D
        const valJ = String(row[9] || '').toUpperCase(); // Column J

        const passesJ = !valJ.includes("N/A") && !valJ.includes("MISJUDGE");
        const passesD = colD !== '' && colD.toUpperCase() !== 'N/A';

        if (passesJ && passesD && !seen.has(colD)) {
            seen.add(colD);
            unique.push(row);
        }
    });
    return [headers, ...unique];
}

function processGoles(rows) {
    if (rows.length < 2) return { goals: [], validRows: [] };
    const headers = rows[0] || [];
    const validRows = [headers];
    const data = rows.slice(1);
    const golesMap = {};

    data.forEach((row, index) => {
        if (!row || row.length < 2) return;

        // Based on image: B (index 1) is "Descri" (Agrupador), D (index 3) is "Resumen" (Status)
        const goalId = String(row[1] || '').trim();
        const category = String(row[3] || '').trim().toUpperCase();

        if (!goalId || goalId.toLowerCase() === 'descri') return;

        if (!golesMap[goalId]) {
            golesMap[goalId] = {
                id: goalId,
                description: goalId,
                date: 'N/A',
                rwk: 0,
                wip: 0,
                pass: 0
            };
        }

        // Take date from Column E (index 4) - Update if we find a valid date
        if (golesMap[goalId].date === 'N/A' && row[4]) {
            golesMap[goalId].date = formatDate(row[4]);
        }

        const catLower = category.toLowerCase();
        if (catLower.includes("rwk") || catLower.includes("fail") || catLower.includes("rework") || catLower.includes("rkw") || catLower.includes("fll")) {
            golesMap[goalId].rwk++;
        } else if (catLower.includes("wip") || catLower.includes("process") || catLower.includes("wait") || catLower.includes("test") || catLower.includes("open") || catLower.includes("prog")) {
            golesMap[goalId].wip++;
        } else if (catLower.includes("pass") || catLower.includes("ok") || catLower.includes("done") || catLower.includes("ship") || catLower.includes("complete")) {
            golesMap[goalId].pass++;
        } else {
            // Default to WIP if unknown but row exists
            golesMap[goalId].wip++;
        }
        
        validRows.push(row);
    });

    return { goals: Object.values(golesMap), validRows };
}

function formatDate(excelDate) {
    if (!excelDate) return 'N/A';
    if (typeof excelDate === 'number') {
        const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
        return date.toLocaleDateString();
    }
    return String(excelDate);
}

function renderGolesTable(golesData) {
    const body = document.getElementById('golesBody');
    const foot = document.getElementById('golesFoot');
    if (!body || !foot) return;

    let html = "";
    let totalRwk = 0, totalWip = 0, totalPass = 0;

    golesData.forEach(goal => {
        const subtotal = goal.rwk + goal.wip + goal.pass;
        if (subtotal === 0) return;

        const pctPassVal = (goal.pass / subtotal) * 100;

        // Filtrar para que solamente se vean en pantalla los goles con menos del 100% PASS
        if (pctPassVal >= 100) return;

        // Sumar a los totales solo los que se van a mostrar (menos del 100% PASS)
        totalRwk += goal.rwk;
        totalWip += goal.wip;
        totalPass += goal.pass;

        const pctRwk = ((goal.rwk / subtotal) * 100).toFixed(0);
        const pctWip = ((goal.wip / subtotal) * 100).toFixed(0);
        const pctPass = pctPassVal.toFixed(0);

        const colorRwk = `hsl(${Math.max(0, 140 - (parseFloat(pctRwk) * 1.4))}, 100%, 70%)`;
        const colorWip = `hsl(${Math.max(0, 140 - (parseFloat(pctWip) * 1.4))}, 100%, 70%)`;
        const colorPass = `hsl(${Math.min(140, parseFloat(pctPass) * 1.4)}, 100%, 70%)`;

        html += `<tr>
            <td data-label="DESCRIPCIÓN">${goal.description}</td>
            <td data-label="FECHA">${goal.date}</td>
            <td class="val-col" data-label="RWK">${goal.rwk}</td>
            <td class="pct-col" data-label="RWK %" style="background-color: ${colorRwk}; color: #1e293b; font-weight: 700;">${pctRwk}%</td>
            <td class="val-col" data-label="WIP">${goal.wip}</td>
            <td class="pct-col" data-label="WIP %" style="background-color: ${colorWip}; color: #1e293b; font-weight: 700;">${pctWip}%</td>
            <td class="val-col" data-label="PASS">${goal.pass}</td>
            <td class="pct-col" data-label="PASS %" style="background-color: ${colorPass}; color: #1e293b; font-weight: 700;">${pctPass}%</td>
        </tr>`;
    });

    body.innerHTML = html || '<tr><td colspan="8" style="text-align:center; padding: 2rem;">No hay goles con pendientes (todos están al 100% PASS).</td></tr>';

    const grandTotal = totalRwk + totalWip + totalPass;
    if (grandTotal > 0) {
        const gPctRwk = ((totalRwk / grandTotal) * 100).toFixed(0);
        const gPctWip = ((totalWip / grandTotal) * 100).toFixed(0);
        const gPctPass = ((totalPass / grandTotal) * 100).toFixed(0);

        const colorGRwk = `hsl(${Math.max(0, 140 - (parseFloat(gPctRwk) * 1.4))}, 100%, 70%)`;
        const colorGWip = `hsl(${Math.max(0, 140 - (parseFloat(gPctWip) * 1.4))}, 100%, 70%)`;
        const colorGPass = `hsl(${Math.min(140, parseFloat(gPctPass) * 1.4)}, 100%, 70%)`;

        foot.innerHTML = `<tr class="total-row">
            <td colspan="2" data-label="TOTAL GENERAL">Total General (Producción Total)</td>
            <td class="val-col" data-label="RWK">${totalRwk}</td>
            <td class="pct-col" data-label="RWK %" style="background-color: ${colorGRwk}; color: #1e293b; font-weight: 800;">${gPctRwk}%</td>
            <td class="val-col" data-label="WIP">${totalWip}</td>
            <td class="pct-col" data-label="WIP %" style="background-color: ${colorGWip}; color: #1e293b; font-weight: 800;">${gPctWip}%</td>
            <td class="val-col" data-label="PASS">${totalPass}</td>
            <td class="pct-col" data-label="PASS %" style="background-color: ${colorGPass}; color: #1e293b; font-weight: 800;">${gPctPass}%</td>
        </tr>`;
    } else {
        foot.innerHTML = "";
    }
}

function processData() {
    filteredData = rawData.filter(row => {
        const modelVal = String(row[CONFIG.colModelIndex] || '').trim();
        const woVal = String(row[CONFIG.colWorkOrderIndex] || '').trim();

        const passesModel = modelVal !== '' && modelVal.toUpperCase() !== 'N/A';
        const passesWO = woVal.toUpperCase().includes('FAIL');

        return passesModel && passesWO;
    });

    // Solo actualizar stats en memoria — NO guardar aquí para evitar race condition
    // con updateAccumulatedData que se llama justo después y necesita guardar primero.
    let stored = window.dashboard_storage;
    if (stored) {
        stored.stats = { total: rawData.length, filtered: filteredData.length };
    }
    console.log(`[processData] Total filas: ${rawData.length}, FAIL filtradas: ${filteredData.length}`);
}

async function updateAccumulatedData(fileIdentifier) {
    const stored = window.dashboard_storage;
    if (!stored) return;

    // NOTA: Ya no bloqueamos por fileIdentifier porque ahora REEMPLAZAMOS los datos del día
    // en lugar de sumarlos. Subir el archivo varias veces en el mismo día siempre dará el mismo resultado.
    console.log(`Procesando archivo: ${fileIdentifier}`);

    const now = new Date();
    let currentDayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let effectiveDate = new Date(now);

    // Determine the effective day for data accumulation (Monday-Friday)
    // If it's Saturday (6) or Sunday (0), data should be accumulated for the next Monday.
    // If it's a weekday, it's for that day.
    let targetDayIndex; // 0 for LUNES, 1 for MARTES, etc.

    if (currentDayOfWeek === 0) { // Sunday
        effectiveDate.setDate(effectiveDate.getDate() + 1); // Move to Monday
        targetDayIndex = 0; // LUNES
    } else if (currentDayOfWeek === 6) { // Saturday
        effectiveDate.setDate(effectiveDate.getDate() + 2); // Move to Monday
        targetDayIndex = 0; // LUNES
    } else { // Monday (1) to Friday (5)
        targetDayIndex = currentDayOfWeek - 1; // Map 1->0, 2->1, ..., 5->4
    }

    // Adjust for holidays: if the effectiveDate is a holiday, move to the next working day
    while (isHoliday(effectiveDate) || effectiveDate.getDay() === 0 || effectiveDate.getDay() === 6) {
        effectiveDate.setDate(effectiveDate.getDate() + 1);
        // Recalculate targetDayIndex based on the new effectiveDate's day of week
        const newDayOfWeek = effectiveDate.getDay();
        if (newDayOfWeek >= 1 && newDayOfWeek <= 5) { // If it's a weekday
            targetDayIndex = newDayOfWeek - 1;
        }
    }

    if (targetDayIndex < 0 || targetDayIndex >= WEEK_DAYS.length) {
        console.warn("Día fuera del rango de la tabla semanal (L-V) después de ajustes por fin de semana/festivos.");
        return; 
    }

    const todayName = WEEK_DAYS[targetDayIndex];

    const currentCounts = {};
    CATEGORIES.forEach(cat => currentCounts[cat] = 0);

    filteredData.forEach(row => {
        const modelRaw = String(row[CONFIG.colModelIndex] || '').trim();
        const cat = getCategory(modelRaw);
        if (CATEGORIES.includes(cat)) {
            currentCounts[cat]++;
        }
    });

    // Log para diagnóstico
    console.log(`[updateAccumulatedData] Día: ${todayName}, Conteos por categoría:`, JSON.stringify(currentCounts));

    CATEGORIES.forEach(cat => {
        // Asegurar que stored.data[cat] existe antes de escribir
        if (!stored.data[cat]) {
            stored.data[cat] = {};
            WEEK_DAYS.forEach(d => stored.data[cat][d] = 0);
        }
        // REEMPLAZAR el valor del día actual en lugar de sumar
        // Esto garantiza que cada subida del archivo del día refleja el estado actual
        stored.data[cat][todayName] = currentCounts[cat];
    });

    // Registrar archivo como procesado (solo para registro, ya no bloquea)
    if (!stored.processedFiles) stored.processedFiles = [];
    stored.processedFiles.push(fileIdentifier);
    if (stored.processedFiles.length > 50) stored.processedFiles.shift();

    // Guardar todo incluyendo stats (que se omitió en processData para evitar race condition)
    if (stored.stats === undefined) {
        stored.stats = { total: rawData.length, filtered: filteredData.length };
    }

    await saveStateToServer();

    // Re-renderizar la tabla inmediatamente después de guardar para reflejar los nuevos datos
    renderSummaryTable();
    console.log(`[updateAccumulatedData] Datos guardados y tabla actualizada para ${todayName}.`);
}


function renderDashboard(entradasData, salidasData, firstData) {
    renderSummaryTable();
    const stored = window.dashboard_storage || {};

    // 1. Entradas: Try raw data first, then fallback to precomputed summary
    if (entradasData && entradasData.length > 0) {
        renderBarChart("entradasChart", entradasData, 3, "Entradas", "#38bdf8", "entradas", "entradasTotal", false);
    } else if (stored.entradasSummary) {
        renderBarChart("entradasChart", stored.entradasSummary, null, "Entradas", "#38bdf8", "entradas", "entradasTotal", false);
    }

    // 2. Salidas: Try raw data first, then fallback to precomputed summary
    if (salidasData && salidasData.length > 0) {
        renderBarChart("salidasChart", salidasData, 2, "Salidas", "#818cf8", "salidas", "salidasTotal", false);
    } else if (stored.salidasSummary) {
        renderBarChart("salidasChart", stored.salidasSummary, null, "Salidas", "#818cf8", "salidas", "salidasTotal", false);
    }
    
    // 3. FIRST: Try raw data first, then fallback to precomputed summary
    if (firstData && firstData.length > 0) {
        renderFirstChart("firstChart", firstData);
    } else if (stored.firstSummary) {
        renderFirstChart("firstChart", stored.firstSummary);
    }

    // Restore secondData is handled in restoreState if needed
}

function renderBarChart(canvasId, data, modelColIndex, label, color, chartKey, totalElementId, useRawModel = false) {
    let counts = {};
    let grandTotal = 0;

    if (Array.isArray(data)) {
        // Handle raw array of rows
        data.forEach(row => {
            const rawModel = String(row[modelColIndex] || 'Unknown').trim();
            if (!rawModel || rawModel.toUpperCase() === 'MODEL' || rawModel.toUpperCase() === 'ASSY PN' || rawModel.toUpperCase() === 'N/A' || rawModel.toUpperCase() === 'UNKNOWN') return;

            const category = useRawModel ? rawModel : getCategory(rawModel);
            if (useRawModel || category !== "OTHER") {
                counts[category] = (counts[category] || 0) + 1;
                grandTotal++;
            }
        });
    } else if (typeof data === 'object' && data !== null) {
        // Handle precomputed summary object { category: count }
        counts = data;
        grandTotal = Object.values(counts).reduce((sum, val) => sum + val, 0);
    }

    // Update grand total in UI
    const totalEl = document.getElementById(totalElementId);
    if (totalEl) totalEl.textContent = `Total: ${grandTotal}`;

    const labels = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const values = labels.map(l => counts[l]);

    const ctx = document.getElementById(canvasId).getContext('2d');
    if (charts[chartKey]) charts[chartKey].destroy();

    charts[chartKey] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                backgroundColor: color,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: { top: 40 }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grace: '25%',
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { color: '#475569' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#475569' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.raw}`
                    }
                }
            },
        },
        plugins: [{
            id: 'topLabelsPlugin',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.font = 'bold 13px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#000000';

                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    meta.data.forEach((bar, index) => {
                        const data = dataset.data[index];
                        if (data > 0 && !meta.hidden) {
                            ctx.fillText(data, bar.x, bar.y - 10);
                        }
                    });
                });
            }
        }]
    });
}

function renderFirstChart(canvasId, data) {
    // Column J (index 9) is Component, Column C (index 2) is Model, Column H (index 7) is Details
    let componentModelCounts = {};
    let componentHDetails = {}; 
    let sortedModels = [];
    let sortedComponents = [];
    let grandTotal = 0;

    if (Array.isArray(data)) {
        const components = new Set();
        const models = new Set();
        data.forEach(row => {
            const component = String(row[9] || 'Unknown').trim();
            const rawModel = String(row[2] || 'Unknown').trim();
            const model = getCategory(rawModel);
            const colH = String(row[7] || 'N/A').trim();

            if (model !== "OTHER") {
                components.add(component);
                models.add(model);
                if (!componentModelCounts[component]) componentModelCounts[component] = {};
                componentModelCounts[component][model] = (componentModelCounts[component][model] || 0) + 1;

                if (colH && colH.toUpperCase() !== 'N/A') {
                    if (!componentHDetails[component]) componentHDetails[component] = {};
                    if (!componentHDetails[component][model]) componentHDetails[component][model] = {};
                    componentHDetails[component][model][colH] = (componentHDetails[component][model][colH] || 0) + 1;
                }
                grandTotal++;
            }
        });
        
        sortedComponents = Array.from(components).sort((a, b) => {
            const totalA = Object.values(componentModelCounts[a]).reduce((s, v) => s + v, 0);
            const totalB = Object.values(componentModelCounts[b]).reduce((s, v) => s + v, 0);
            return totalB - totalA;
        }).slice(0, 15);
        
        sortedModels = Array.from(models).sort();
    } else {
        // Use summary data directly
        componentModelCounts = data.componentModelCounts || {};
        componentHDetails = data.componentHDetails || {};
        sortedModels = data.models || [];
        sortedComponents = data.components || [];
        grandTotal = Object.values(componentModelCounts).reduce((acc, modelsObj) => 
            acc + Object.values(modelsObj).reduce((s, v) => s + v, 0), 0);
        
        // Final sort and slice just in case
        sortedComponents = sortedComponents.sort((a, b) => {
            const totalA = Object.values(componentModelCounts[a] || {}).reduce((s, v) => s + v, 0);
            const totalB = Object.values(componentModelCounts[b] || {}).reduce((s, v) => s + v, 0);
            return totalB - totalA;
        }).slice(0, 15);
    }

    // Update grand total in UI
    const totalEl = document.getElementById('firstTotal');
    if (totalEl) totalEl.textContent = `Total: ${grandTotal}`;

    const colors = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa'];

    const datasets = sortedModels.map((model, i) => ({
        label: model,
        data: sortedComponents.map(comp => componentModelCounts[comp][model] || 0),
        backgroundColor: colors[i % colors.length],
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7
    }));

    const ctx = document.getElementById(canvasId).getContext('2d');
    if (charts.first) charts.first.destroy();

    charts.first = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedComponents,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: { top: 40 }
            },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { color: '#475569' } },
                y: { stacked: true, beginAtZero: true, grace: '25%', grid: { color: 'rgba(0,0,0,0.1)' }, ticks: { color: '#475569', precision: 0 } }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#475569', font: { size: 10, family: 'Outfit' } }
                },
                tooltip: {
                    callbacks: {
                        afterBody: (context) => {
                            const component = context[0].label;
                            const model = context[0].dataset.label;
                            const hEntries = (componentHDetails[component] || {})[model] || {};
                            
                            const lines = [];
                            if (Object.keys(hEntries).length > 0) {
                                lines.push("Fallas:");
                                Object.entries(hEntries).forEach(([val, count]) => {
                                    lines.push(` • ${val}: ${count}`);
                                });
                            }
                            return lines;
                        }
                    }
                }
            },
        },
        plugins: [{
            id: 'stackedTopLabelsPlugin',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.font = 'bold 13px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#000000';

                sortedComponents.forEach((comp, index) => {
                    const total = Object.values(componentModelCounts[comp]).reduce((s, v) => s + v, 0);

                    // Find the highest visible bar in the stack to place the text
                    let highestY = chart.scales.y.bottom;
                    let posX = 0;
                    let found = false;

                    for (let i = chart.data.datasets.length - 1; i >= 0; i--) {
                        const m = chart.getDatasetMeta(i);
                        if (m.data[index] && !m.hidden && m.data[index].y) {
                            // For stacked charts, drawing points start from bottom, but Y coordinate goes top down (0 is top)
                            if (m.data[index].y < highestY) {
                                highestY = m.data[index].y;
                                posX = m.data[index].x;
                                found = true;
                            }
                        }
                    }

                    if (total > 0 && found) {
                        ctx.fillText(total, posX, highestY - 10);
                    }
                });
            }
        }]
    });

    // Render the compact table
    renderFirstTable(componentModelCounts, colors, sortedModels);
}

function renderFirstTable(counts, colors, sortedModels) {
    const tbody = document.getElementById('firstTableBody');
    if (!tbody) return;

    let html = '';

    // Sort components by total descending
    const sortedComps = Object.keys(counts).sort((a, b) => {
        const totalA = Object.values(counts[a]).reduce((sum, val) => sum + val, 0);
        const totalB = Object.values(counts[b]).reduce((sum, val) => sum + val, 0);
        return totalB - totalA;
    });

    sortedComps.forEach(comp => {
        const total = Object.values(counts[comp]).reduce((sum, val) => sum + val, 0);

        // Discard components with no failure (should not happen with filtered data)
        if (total < 1) return;

        let badgesHtml = '';
        sortedModels.forEach((model, i) => {
            const count = counts[comp][model] || 0;
            if (count > 0) {
                const color = colors[i % colors.length];
                badgesHtml += `<span style="background-color: ${color}; color: #1e293b; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; margin-right: 4px; display: inline-block; margin-bottom: 2px;">${model}: ${count}</span>`;
            }
        });

        html += `
            <tr>
                <td style="font-weight: 600;">${comp}</td>
                <td style="white-space: normal; line-height: 1.5;">${badgesHtml}</td>
                <td style="font-weight: bold; color: var(--accent-primary); text-align: center;">${total}</td>
            </tr>
        `;
    });

    if (!html) {
        html = '<tr><td colspan="3" style="text-align: center; color: #94a3b8;">No hay componentes con múltiples fallas.</td></tr>';
    }

    tbody.innerHTML = html;
}

function renderSecondChart(canvasId, data) {
    // Nueva lógica: data = { modelCounts: {modelo: count}, modelFailures: {modelo: {falla: count}} }
    // Compatibilidad hacia atrás: si data es Array (formato antiguo), ignorar y mostrar vacío
    let modelCounts = {};
    let modelFailures = {};

    if (data && !Array.isArray(data) && data.modelCounts) {
        modelCounts  = data.modelCounts  || {};
        modelFailures = data.modelFailures || {};
    } else if (Array.isArray(data)) {
        // Formato antiguo (array de filas): re-procesar con nueva lógica
        console.warn('[renderSecondChart] Datos en formato Array (antiguo). Re-procesando...');
        const reprocesado = processSecond(data);
        modelCounts   = reprocesado.modelCounts;
        modelFailures = reprocesado.modelFailures;
    }

    const grandTotal = Object.values(modelCounts).reduce((s, v) => s + v, 0);

    // Update grand total in UI
    const totalEl = document.getElementById('secondTotal');
    if (totalEl) totalEl.textContent = `Total: ${grandTotal}`;

    // Ordenar modelos por cantidad descendente; top 20 para legibilidad
    const sortedModels = Object.keys(modelCounts)
        .sort((a, b) => modelCounts[b] - modelCounts[a])
        .slice(0, 20);

    const values = sortedModels.map(m => modelCounts[m]);

    // Colores por barra (gradiente de tonos)
    const barColors = sortedModels.map((_, i) => {
        const hue = (200 + i * 25) % 360;
        return `hsl(${hue}, 80%, 60%)`;
    });

    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (charts.second) charts.second.destroy();

    charts.second = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: sortedModels,
            datasets: [{
                label: 'SECOND Failures',
                data: values,
                backgroundColor: barColors,
                borderRadius: 5,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 40 } },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#475569',
                        maxRotation: 35,
                        minRotation: 0,
                        font: { size: 10 }
                    }
                },
                y: {
                    beginAtZero: true,
                    grace: '20%',
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { color: '#475569', precision: 0 }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: (context) => `Modelo: ${context[0].label}`,
                        label: (context) => `Cantidad: ${context.raw}`,
                        afterLabel: (context) => {
                            const modelo = context.label;
                            const fallas = modelFailures[modelo] || {};
                            const lines = [];
                            if (Object.keys(fallas).length > 0) {
                                lines.push('Fallas:');
                                // Ordenar fallas por frecuencia
                                Object.entries(fallas)
                                    .sort((a, b) => b[1] - a[1])
                                    .forEach(([falla, cnt]) => {
                                        lines.push(` • ${falla}: ${cnt}`);
                                    });
                            }
                            return lines;
                        }
                    }
                }
            }
        },
        plugins: [{
            id: 'secondTopLabels',
            afterDraw: (chart) => {
                const c = chart.ctx;
                c.save();
                c.font = 'bold 12px Outfit';
                c.textAlign = 'center';
                c.textBaseline = 'bottom';
                c.fillStyle = '#1e293b';
                chart.data.datasets[0]?.data.forEach((val, index) => {
                    if (val > 0) {
                        const meta = chart.getDatasetMeta(0);
                        const bar = meta.data[index];
                        c.fillText(val, bar.x, bar.y - 4);
                    }
                });
                c.restore();
            }
        }]
    });

    renderSecondTable(sortedModels, modelCounts, modelFailures);
}

function renderSecondTable(sortedModels, modelCounts, modelFailures) {
    const tbody = document.getElementById('secondTableBody');
    if (!tbody) return;

    let html = '';

    sortedModels.forEach((modelo, i) => {
        const total = modelCounts[modelo] || 0;
        if (total < 1) return;

        const fallas = modelFailures[modelo] || {};
        const hue = (200 + i * 25) % 360;
        const color = `hsl(${hue}, 80%, 60%)`;

        // Construir badges de fallas con estilo unificado a FIRST
        let failBadges = '';
        const failureEntries = Object.entries(fallas).sort((a, b) => b[1] - a[1]);
        
        failureEntries.forEach(([falla, cnt], idx) => {
            // Colores tomados de una paleta suave variada como en FIRST
            const fHue = (190 + idx * 45) % 360;
            const fColor = `hsl(${fHue}, 70%, 85%)`; 
            
            failBadges += `<span style="background-color: ${fColor}; color: #1e293b; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; margin-right: 4px; display: inline-block; margin-bottom: 2px;">${falla}: ${cnt}</span>`;
        });
        if (!failBadges) failBadges = '<span style="color: #64748b; font-size: 0.75rem;">Sin falla registrada</span>';

        html += `
            <tr>
                <td style="font-weight: 600;">${modelo}</td>
                <td style="white-space: normal; line-height: 1.5;">${failBadges}</td>
                <td style="font-weight: bold; color: var(--accent-primary); text-align: center;">${total}</td>
            </tr>
        `;
    });

    if (!html) html = '<tr><td colspan="3" style="text-align: center; color: #94a3b8;">No hay datos en SECOND.</td></tr>';
    tbody.innerHTML = html;
}

// ─── Alto-Aging ────────────────────────────────────────────────────────────────

/**
 * Equivalent to Excel IFS formula on column H (index 7):
 * =IFS(H>90,"MAYOR A 90", H>80,"MAYOR A 80", H>70,"MAYOR A 70",
 *      H>60,"MAYOR A 60", H>50,"MAYOR A 50", H>30,"MAYOR A 30", TRUE,"LINEA")
 * @param {number|string} hValue - The value from column H
 * @returns {string} The aging bucket label
 */
function applyIfsFormula(hValue) {
    const h = parseFloat(hValue);
    if (isNaN(h)) return 'LINEA';
    if (h > 90) return 'MAYOR A 90';
    if (h > 80) return '80 A 89';
    if (h > 70) return '70 A 79';
    if (h > 60) return '60 A 69';
    if (h > 50) return '50 A 59';
    if (h > 30) return '30 A 49';
    return 'MENOR A 30';
}

/**
 * Equivalent to Excel XLOOKUP("*"&A2&"*", MRB!L:L, MRB!A:A, "", 2)
 * Searches for a partial match of colAValue inside MRB column L (index 11),
 * and returns the corresponding value from MRB column A (index 0).
 * @param {string} colAValue - The value from column A of Sheet1
 * @param {Array[]} mrbRows  - All rows from the MRB sheet
 * @returns {string} Matched value from MRB col A, or empty string if not found
 */
function applyXlookup(colAValue, mrbRows) {
    if (!colAValue || !mrbRows || mrbRows.length === 0) return '';
    const searchStr = String(colAValue).trim().toUpperCase();
    if (!searchStr) return '';

    for (let i = 0; i < mrbRows.length; i++) {
        const cellL = String(mrbRows[i][11] || '').trim().toUpperCase();
        if (cellL && cellL.includes(searchStr)) {
            return String(mrbRows[i][0] || '').trim();
        }
    }
    return '';
}

/**
 * Reads rows from Sheet1. Returns { agingCategory: { model: count } }.
 * Col M (index 12) = model serial, Col U (index 20) = aging bucket (may be empty).
 * Col H (index 7)  = age value → IFS formula applied if col U is empty.
 * Col A (index 0)  = serial for XLOOKUP against MRB sheet.
 * @param {Array[]} rows    - All rows from Sheet 1
 * @param {Array[]} mrbRows - All rows from MRB sheet (may be empty array)
 */
function processAltoAging(rows, mrbRows = []) {
    const result = {};
    if (!rows || rows.length < 2) return result;

    // Initialise all buckets so order is guaranteed
    AGING_CATEGORIES.forEach(cat => result[cat] = {});

    // Skip header row (index 0)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const colD = String(row[3] || '').toUpperCase();
        const colV = String(row[21] || '').trim();

        // Only count rows with "FAIL" in column D
        if (!colD.includes('FAIL')) continue;

        // Skip rows that have any value in column V (index 21)
        if (colV) continue;

        // ── Aging bucket resolution ──
        // Priority: col U (index 20) if it has a recognised value;
        // otherwise fall back to IFS formula on col H (index 7).
        let rawAging = String(row[20] || '').trim().toUpperCase();
        let bucket = AGING_CATEGORIES.find(cat => rawAging === cat || rawAging.startsWith(cat));

        if (!bucket) {
            // Apply IFS formula on col H (index 7)
            const colH = row[7];
            bucket = applyIfsFormula(colH);
            // Make sure the IFS result is a recognised category
            if (!AGING_CATEGORIES.includes(bucket)) continue;
        }

        // ── Model resolution ──
        // 1. Try XLOOKUP: search col A of this row in MRB col L → get MRB col A value
        const colA = String(row[0] || '').trim();
        let resolvedModel = '';

        if (mrbRows.length > 0 && colA) {
            resolvedModel = applyXlookup(colA, mrbRows);
        }

        // 2. If XLOOKUP didn't find a result, fall back to col M (index 12)
        const rawModel = resolvedModel || String(row[12] || '').trim();
        if (!rawModel) continue;

        // 3. Map the model to a category (MB, NOGA, MOBO, etc.)
        const modelName = getCategory(rawModel);
        if (modelName === 'OTHER') continue;

        result[bucket][modelName] = (result[bucket][modelName] || 0) + 1;
    }

    // Remove empty buckets
    AGING_CATEGORIES.forEach(cat => {
        if (Object.keys(result[cat]).length === 0) delete result[cat];
    });

    // Guardar los datos de origen para poder exportarlos después
    if (window.dashboard_storage) {
        window.dashboard_storage.altoAgingSourceData = rows;
        window.dashboard_storage.mrbSourceData = mrbRows;
    }

    return result;
}

/**
 * Downloads the source data lines related to Alto Aging as an Excel file.
 */
async function exportAltoAgingToExcel() {
    const stored = window.dashboard_storage;
    if (!stored || !stored.altoAgingSourceData || stored.altoAgingSourceData.length < 2) {
        updateStatus('No hay datos fuente de Alto Aging para exportar', 'error');
        return;
    }

    if (typeof ExcelJS === 'undefined') {
        updateStatus('Error: ExcelJS no está cargado', 'error');
        return;
    }

    updateStatus('Generando Excel de Alto Aging...', 'info');

    try {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'PCBA Dashboard';
        const sheet = workbook.addWorksheet('Alto Aging - Datos Originales');
        
        const sourceData = stored.altoAgingSourceData;
        const headers = sourceData[0];
        sheet.addRow(headers);
        
        // Estilar cabeceras
        const headerRow = sheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.eachCell(cell => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF475569' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        // Necesitamos MRB rows de nuevo si queremos ser exactos igual al chart.
        // Como no están de forma global fácil, hacemos match con el modelName puro si cae en categoría.
        // O mejor: guardamos el modelo resuelto durante el procesado y lo re-evaluamos o lo guardamos en el JSON original si queremos ser puristas.
        // Por simplicidad de lectura y evitar modificar el proceso de carga, volvemos a evaluar Categoría:
        const mrbRows = stored.mrbSourceData || [];

        // Filtrar y agregar solo filas que son FAIL y que caen en la lógica de Alto Aging y tienen Modelo Válido
        for (let i = 1; i < sourceData.length; i++) {
            const row = sourceData[i];
            const colD = String(row[3] || '').toUpperCase();
            const colV = String(row[21] || '').trim();

            if (!colD.includes('FAIL')) continue;
            if (colV) continue;

            const colA = String(row[0] || '').trim();
            let resolvedModel = '';

            if (mrbRows.length > 0 && colA) {
                resolvedModel = applyXlookup(colA, mrbRows);
            }

            const rawModel = resolvedModel || String(row[12] || '').trim();
            if (!rawModel) continue;

            const modelName = getCategory(rawModel);
            // Si el modelo categorizado es OTHER, significa que NO apareció en la gráfica
            if (modelName === 'OTHER') continue;

            // Optional: Podríamos verificar el aging bucket si queremos exluír los "MENOR A 30" u otros vacíos,
            // pero si la gráfica los muestra, también deben descargarse.

            const newRow = sheet.addRow(row);
            newRow.alignment = { vertical: 'middle' };
        }

        sheet.columns.forEach(column => {
            column.width = 15;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().split('T')[0];
        a.download = `Alto_Aging_Source_Data_${dateStr}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);

        updateStatus('Datos de Alto Aging descargados', 'success');
    } catch (err) {
        console.error('Alto Aging Export Error:', err);
        updateStatus('Error al generar Excel (Alto Aging)', 'error');
    }
}

async function exportGenericDataToExcel(dataArray, sheetName, filename) {
    if (!dataArray || dataArray.length < 2) {
        updateStatus(`No hay datos fuente de ${sheetName} para exportar`, 'error');
        return;
    }

    if (typeof ExcelJS === 'undefined') {
        updateStatus('Error: ExcelJS no está cargado', 'error');
        return;
    }

    updateStatus(`Generando Excel de ${sheetName}...`, 'info');

    try {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'PCBA Dashboard';
        const sheet = workbook.addWorksheet(sheetName);
        
        dataArray.forEach(row => {
            const newRow = sheet.addRow(row);
            newRow.alignment = { vertical: 'middle' };
        });

        const headerRow = sheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        headerRow.eachCell(cell => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF475569' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        sheet.columns.forEach(column => {
            column.width = 15;
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().split('T')[0];
        a.download = `${filename}_${dateStr}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);

        updateStatus(`Datos de ${sheetName} descargados`, 'success');
    } catch (err) {
        console.error(`${sheetName} Export Error:`, err);
        updateStatus(`Error al generar Excel (${sheetName})`, 'error');
    }
}

/**
 * Renders a stacked bar chart: X = aging category, stacks = models.
 * @param {Object} data  Output of processAltoAging
 */
function renderAltoAgingChart(data) {
    const canvas = document.getElementById('altoAgingChart');
    if (!canvas) return;

    const activeBuckets = AGING_CATEGORIES.filter(cat => data[cat]);

    // Collect all models across all buckets
    const modelSet = new Set();
    activeBuckets.forEach(cat => Object.keys(data[cat]).forEach(m => modelSet.add(m)));
    const sortedModels = Array.from(modelSet).sort();

    let grandTotal = 0;
    const bucketTotals = {};
    activeBuckets.forEach(cat => {
        bucketTotals[cat] = Object.values(data[cat]).reduce((s, v) => s + v, 0);
        grandTotal += bucketTotals[cat];
    });

    const totalEl = document.getElementById('altoAgingTotal');
    if (totalEl) totalEl.textContent = `Total: ${grandTotal}`;

    const datasets = sortedModels.map((model, i) => ({
        label: model,
        data: activeBuckets.map(cat => data[cat][model] || 0),
        backgroundColor: AGING_COLORS[i % AGING_COLORS.length],
        borderRadius: 4,
        barPercentage: 0.65,
        categoryPercentage: 0.75
    }));

    const ctx = canvas.getContext('2d');
    if (charts.altoAging) charts.altoAging.destroy();

    charts.altoAging = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: activeBuckets,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 40 } },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: true,
                        color: 'rgba(148,163,184,0.25)',
                        lineWidth: 1,
                        drawTicks: false,
                        offset: true
                    },
                    ticks: { color: '#94a3b8', font: { family: 'Outfit' } }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grace: '25%',
                    grid: { color: 'rgba(255,255,255,0.08)' },
                    ticks: { color: '#94a3b8', precision: 0, font: { family: 'Outfit' } }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#94a3b8', font: { size: 11, family: 'Outfit' } }
                },
                tooltip: {
                    callbacks: {
                        footer: (items) => {
                            const cat = activeBuckets[items[0].dataIndex];
                            return `Total ${cat}: ${bucketTotals[cat]}`;
                        }
                    }
                }
            }
        },
        plugins: [{
            id: 'altoAgingTopLabels',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.save();
                ctx.font = 'bold 13px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                activeBuckets.forEach((cat, index) => {
                    const total = bucketTotals[cat];
                    if (total <= 0) return;

                    // Find the topmost (lowest Y value) bar in this column
                    let topY = chart.scales.y.bottom;
                    let posX = 0;

                    for (let d = chart.data.datasets.length - 1; d >= 0; d--) {
                        const meta = chart.getDatasetMeta(d);
                        if (meta.hidden) continue;
                        const bar = meta.data[index];
                        if (bar && bar.y < topY) {
                            topY = bar.y;
                            posX = bar.x;
                        }
                    }

                    // Draw labels in solid black
                    const label = String(total);
                    ctx.fillStyle = '#000000';
                    ctx.fillText(label, posX, topY - 10);
                });
                ctx.restore();
            }
        }]
    });

    // Populate the side table
    renderAltoAgingTable(data, activeBuckets, sortedModels);
}

function renderAltoAgingTable(data, activeBuckets, sortedModels) {
    const headerRow = document.getElementById('altoAgingTableHeader');
    const tableBody = document.getElementById('altoAgingTableBody');
    const tableFoot = document.getElementById('altoAgingTableFoot');

    if (!headerRow || !tableBody || !tableFoot) return;

    // Build Header
    let theadHtml = `<th>AGING BUCKET</th>`;
    sortedModels.forEach(model => {
        theadHtml += `<th>${model}</th>`;
    });
    headerRow.innerHTML = theadHtml;

    // Build Body
    let tbodyHtml = '';
    const columnTotals = {};
    sortedModels.forEach(m => columnTotals[m] = 0);
    let grandTotal = 0;

    // Ensure we iterate in the exact order of AGING_CATEGORIES to match the chart logic
    AGING_CATEGORIES.forEach(bucket => {
        if (!activeBuckets.includes(bucket)) return;

        tbodyHtml += `<tr><td style="font-weight: 600;">${bucket}</td>`;
        
        sortedModels.forEach(model => {
            const count = data[bucket][model] || 0;
            tbodyHtml += `<td style="text-align: center;">${count}</td>`;
            columnTotals[model] += count;
            grandTotal += count;
        });

        tbodyHtml += `</tr>`;
    });

    tableBody.innerHTML = tbodyHtml;

    // Build Footer (Totals)
    let tfootHtml = `<tr><td style="font-weight: 800; border-top: 2px solid #94a3b8; background: #e2e8f0;">TOTAL</td>`;
    sortedModels.forEach(model => {
        tfootHtml += `<td style="text-align: center; font-weight: 800; border-top: 2px solid #94a3b8; background: #e2e8f0;">${columnTotals[model]}</td>`;
    });
    tfootHtml += `</tr>`;
    
    tableFoot.innerHTML = tfootHtml;
}




function renderSummaryTable() {
    const stored = window.dashboard_storage;
    if (!stored) return;

    const header = document.getElementById('summaryHeader');
    const body = document.getElementById('summaryBody');

    const weekLabel = stored.weekId.split('-')[1] || stored.weekId;
    header.innerHTML = `
        <th>Modelo</th>
        <th>${weekLabel} (Vie Ant)</th>
        ${WEEK_DAYS.map(d => `<th class="day-header">${d}</th>`).join('')}
    `;

    // Calculate Totals First
    const totalsByDay = {};
    WEEK_DAYS.forEach(d => totalsByDay[d] = 0);
    let grandPrevTotal = 0;

    let rowData = CATEGORIES.map(cat => {
        const prevFridayRaw = (stored.prevFridayData && stored.prevFridayData[cat]) || 0;
        let prevVal = (typeof prevFridayRaw === 'object') ? (prevFridayRaw.count || 0) : prevFridayRaw;

        grandPrevTotal += prevVal;
        WEEK_DAYS.forEach(d => totalsByDay[d] += (stored.data[cat][d] || 0));

        return { cat, prevRaw: prevFridayRaw, prevVal };
    });

    // Filtro: Si no estamos en modo edición, esconder filas que están totalmente en 0
    if (!isEditMode) {
        rowData = rowData.filter(item => {
            const hasPrev = item.prevVal > 0;
            const hasCurrentWeek = WEEK_DAYS.some(d => (stored.data[item.cat] && stored.data[item.cat][d]) > 0);
            return hasPrev || hasCurrentWeek;
        });
    }

    let html = "";

    // 1. Individual Category Rows
    rowData.forEach(item => {
        const { cat, prevRaw, prevVal } = item;
        let prevClass = (typeof prevRaw === 'object') ? (prevRaw.trend || "") : "";
        let lastVal = prevVal;

        let rowHtml = `<tr><td class="model-col" data-label="MODELO">${cat}</td>`;

        if (isEditMode) {
            rowHtml += `<td data-label="VIE ANT"><input type="number" class="edit-input" value="${prevVal}" onchange="updateManualSummary('${cat}', 'PREV', this.value)"></td>`;
        } else {
            rowHtml += `<td class="${prevClass}" data-label="VIE ANT">${prevVal}</td>`;
        }

        WEEK_DAYS.forEach(d => {
            const count = (stored.data[cat] && stored.data[cat][d] !== undefined) ? stored.data[cat][d] : 0;
            if (isEditMode) {
                rowHtml += `<td data-label="${d}"><input type="number" class="edit-input" value="${count}" onchange="updateManualSummary('${cat}', '${d}', this.value)"></td>`;
            } else {
                let trendClass = getTrendClass(count, lastVal);
                
                // Holiday Logic: If current day is 0 (festivo), 
                // the NEXT day will compare against VIE ANT (prevVal) instead of 0.
                if (count === 0) {
                    lastVal = prevVal; 
                } else {
                    lastVal = count;
                }
                
                rowHtml += `<td class="${trendClass}" data-label="${d}">${count}</td>`;
            }
        });

        rowHtml += `</tr>`;
        html += rowHtml;
    });

    // 2. Total Row (AT BOTTOM)
    html += `<tr class="total-row">
        <td class="model-col" data-label="TOTAL">TOTAL</td>
        <td data-label="VIE ANT">${grandPrevTotal}</td>
        ${WEEK_DAYS.map(d => `<td data-label="${d}">${totalsByDay[d]}</td>`).join('')}
    </tr>`;

    body.innerHTML = html;
}

function getTrendClass(current, previous) {
    if (current < previous) return "trend-down"; // Green
    if (current > previous) return "trend-up";   // Red
    return "trend-equal";                        // Yellow
}



function renderHistory() {
    const stored = window.dashboard_storage;
    const container = document.getElementById('historyContainer');
    if (!container || !stored) return;

    if (!stored.history || stored.history.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 3rem; color: #94a3b8;">No hay historial acumulado todavía. El historial se genera automáticamente al cambiar de semana.</div>';
        return;
    }

    let html = "";
    stored.history.forEach((week, index) => {
        const weekLabel = week.weekId.split('-')[1] || week.weekId;

        html += `
        <div class="history-card glass-panel" style="margin-bottom: 2rem; padding: 1.5rem;">
            <h3 style="margin-bottom: 1rem; color: #38bdf8;">Resumen Semanal: ${week.weekId}</h3>
            <div class="table-container">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>(Vie Ant)</th>
                            ${WEEK_DAYS.map(d => `<th>${d}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${CATEGORIES.map(cat => {
            const prevVal = (week.prevFridayData && week.prevFridayData[cat]) || 0;
            // Check if row has data
            let hasRowData = prevVal > 0;
            WEEK_DAYS.forEach(d => { if ((week.data[cat][d] || 0) > 0) hasRowData = true; });
            if (!hasRowData) return '';

            let lastVal = prevVal;
            return `<tr>
                                <td class="model-col">${cat}</td>
                                <td>${prevVal}</td>
                                ${WEEK_DAYS.map(d => {
                const val = week.data[cat][d] || 0;
                const tr = getTrendClass(val, lastVal);
                lastVal = val;
                return `<td class="${tr}">${val}</td>`;
            }).join('')}
                            </tr>`;
        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    });

    container.innerHTML = html;
    
    // Also render visitor log
    renderVisitorLog();
}

function getMappedName(rawVal) {
    const trimmed = String(rawVal || '').trim();
    return MODEL_MAP[trimmed] || trimmed || 'UNKNOWN';
}

function updateStatus(text, type = '') {
    const statusText = document.getElementById('statusText');
    const pulse = document.querySelector('.pulse');
    if (!statusText || !pulse) return;
    statusText.textContent = text;
    pulse.style.background = type === 'error' ? '#ef4444' : (type === 'success' ? '#22c55e' : (type === 'info' ? '#38bdf8' : '#38bdf8'));
    pulse.style.boxShadow = `0 0 10px ${pulse.style.background}`;
}

async function exportToPPT() {
    const stored = window.dashboard_storage;
    if (!stored) {
        updateStatus('No hay datos para exportar', 'error');
        return;
    }

    if (typeof PptxGenJS === 'undefined') {
        updateStatus('Error: PptxGenJS no está cargado. Asegúrese de que pptxgen.bundle.js está en la carpeta del proyecto.', 'error');
        alert('Error: La librería PptxGenJS no está disponible. Asegúrese de que el archivo pptxgen.bundle.js esté en la carpeta del proyecto.');
        return;
    }

    updateStatus('Generando PowerPoint...', 'info');

    try {
        let pres = new PptxGenJS();
        pres.layout = 'LAYOUT_16x9';

        // Ensure charts are visible so they can be captured with dimensions
        const chartsView = document.getElementById('chartsView');
        const wasHidden = chartsView && chartsView.classList.contains('hidden');
        if (wasHidden) {
            chartsView.classList.remove('hidden');
            // Force chart resize
            Object.values(charts).forEach(c => { if (c) c.resize(); });
            // Wait for browser to actually render the charts before capturing
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Custom Colors
        const brandColor = 'e11d48'; // accent-primary
        const darkText = '0f172a';
        const lightBg = 'f8fafc';

        // --- SLIDE 1: TITLE ---
        let slide1 = pres.addSlide();
        slide1.background = { color: 'ffffff' };

        slide1.addText('Dashboard PCBA', {
            x: 1, y: 2.5, w: '80%', h: 1,
            fontSize: 44, bold: true, color: brandColor,
            align: 'center'
        });
        slide1.addText(`Resumen Semanal: ${stored.weekId}`, {
            x: 1, y: 3.5, w: '80%', h: 1,
            fontSize: 24, color: darkText,
            align: 'center'
        });
        const dateNow = new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        slide1.addText(`Generado: ${dateNow}`, {
            x: 1, y: 4.5, w: '80%', h: 0.5,
            fontSize: 14, color: '475569',
            align: 'center'
        });

        // --- SLIDE 2: RESUMEN SEMANAL ---
        let slide2 = pres.addSlide();
        slide2.addText('Resumen Semanal de Modelos', {
            x: 0.5, y: 0.5, w: '90%', h: 0.5,
            fontSize: 24, bold: true, color: brandColor
        });

        const weekLabel = stored.weekId.split('-')[1] || stored.weekId;
        const tableData = [];

        // Headers
        tableData.push([
            { text: 'Modelo', options: { fill: 'cbd5e1', bold: true } },
            { text: `${weekLabel} (Vie Ant)`, options: { fill: 'cbd5e1', bold: true } },
            ...WEEK_DAYS.map(d => ({ text: d, options: { fill: 'fef08a', bold: true } }))
        ]);

        const totalsByDay = {};
        WEEK_DAYS.forEach(d => totalsByDay[d] = 0);
        let grandPrevTotal = 0;

        CATEGORIES.forEach(cat => {
            const prevFridayRaw = (stored.prevFridayData && stored.prevFridayData[cat]) || 0;
            const prevVal = (typeof prevFridayRaw === 'object') ? (prevFridayRaw.count || 0) : prevFridayRaw;

            let hasData = prevVal > 0;
            WEEK_DAYS.forEach(d => { if ((stored.data[cat] && stored.data[cat][d] || 0) > 0) hasData = true; });
            if (!hasData) return;

            grandPrevTotal += prevVal;
            const prevTrend = (typeof prevFridayRaw === 'object') ? prevFridayRaw.trend : "";

            const rowData = [
                { text: cat, options: { fill: 'e2e8f0', color: '1e293b' } },
                { text: String(prevVal), options: { fill: getPptTrendColor(prevTrend), color: getPptTrendFontColor(prevTrend), bold: true } }
            ];

            let currentLastVal = prevVal;

            WEEK_DAYS.forEach(d => {
                const val = (stored.data[cat] && stored.data[cat][d]) || 0;
                const trend = getTrendClass(val, currentLastVal);
                rowData.push({ text: String(val), options: { fill: getPptTrendColor(trend), color: getPptTrendFontColor(trend), bold: true } });
                totalsByDay[d] += val;
                if (val > 0) currentLastVal = val;
            });

            tableData.push(rowData);
        });

        // Total Row
        tableData.push([
            { text: 'TOTAL', options: { bold: true, fill: 'cbd5e1' } },
            { text: String(grandPrevTotal), options: { bold: true, fill: 'cbd5e1' } },
            ...WEEK_DAYS.map(d => ({ text: String(totalsByDay[d]), options: { bold: true, fill: 'cbd5e1' } }))
        ]);

        if (tableData.length > 1) {
            slide2.addTable(tableData, {
                x: 0.5, y: 1.2, w: 9,
                border: { type: 'solid', color: 'cbd5e1', pt: 1 },
                align: 'center', valign: 'middle', fontSize: 12
            });
        } else {
            slide2.addText('No hay datos de resumen semanal', { x: 0.5, y: 2, w: '90%', fontSize: 16, color: '94a3b8' });
        }

        // --- SLIDE 3: CHARTS (Entradas y Salidas) ---
        let slide3 = pres.addSlide();
        slide3.addText('Entradas y Salidas', {
            x: 0.5, y: 0.5, w: '90%', h: 0.5,
            fontSize: 24, bold: true, color: brandColor
        });

        const entradasCanvas = document.getElementById('entradasChart');
        if (entradasCanvas && entradasCanvas.width > 0) {
            slide3.addText('Entradas', { x: 0.5, y: 1.2, w: 4, h: 0.3, bold: true, fontSize: 14 });
            slide3.addImage({ data: entradasCanvas.toDataURL('image/png'), x: 0.5, y: 1.5, w: 4.2, h: 3.5 });
        } else {
            slide3.addText('No hay datos de Entradas', { x: 0.5, y: 2, w: 4, fontSize: 14, color: '94a3b8' });
        }

        const salidasCanvas = document.getElementById('salidasChart');
        if (salidasCanvas && salidasCanvas.width > 0) {
            slide3.addText('Salidas', { x: 5, y: 1.2, w: 4, h: 0.3, bold: true, fontSize: 14 });
            slide3.addImage({ data: salidasCanvas.toDataURL('image/png'), x: 5, y: 1.5, w: 4.2, h: 3.5 });
        } else {
            slide3.addText('No hay datos de Salidas', { x: 5, y: 2, w: 4, fontSize: 14, color: '94a3b8' });
        }

        // --- SLIDE 4: CHART (FIRST) ---
        let slide4 = pres.addSlide();
        slide4.addText('FIRST (Fallas por Componente)', {
            x: 0.5, y: 0.5, w: '90%', h: 0.5,
            fontSize: 24, bold: true, color: brandColor
        });

        const firstCanvas = document.getElementById('firstChart');
        if (firstCanvas && firstCanvas.width > 0) {
            slide4.addImage({ data: firstCanvas.toDataURL('image/png'), x: 0.5, y: 1.2, w: 9, h: 4 });
        } else {
            slide4.addText('No hay datos de FIRST', { x: 0.5, y: 2, w: '90%', fontSize: 16, color: '94a3b8' });
        }

        // --- SLIDE 5: CHART (SECOND) ---
        let slide5s = pres.addSlide();
        slide5s.addText('SECOND Failure (Fallas por Componente)', {
            x: 0.5, y: 0.5, w: '90%', h: 0.5,
            fontSize: 24, bold: true, color: brandColor
        });

        const secondCanvas = document.getElementById('secondChart');
        if (secondCanvas && secondCanvas.width > 0) {
            slide5s.addImage({ data: secondCanvas.toDataURL('image/png'), x: 0.5, y: 1.2, w: 9, h: 4 });
        } else {
            slide5s.addText('No hay datos de SECOND', { x: 0.5, y: 2, w: '90%', fontSize: 16, color: '94a3b8' });
        }

        // --- SLIDE 6: CHART (Alto Aging) ---
        let slide6aa = pres.addSlide();
        slide6aa.addText('Alto Aging por Modelo', {
            x: 0.5, y: 0.5, w: '90%', h: 0.5,
            fontSize: 24, bold: true, color: brandColor
        });

        const altoAgingCanvas = document.getElementById('altoAgingChart');
        if (altoAgingCanvas && altoAgingCanvas.width > 0) {
            slide6aa.addImage({ data: altoAgingCanvas.toDataURL('image/png'), x: 0.5, y: 1.2, w: 9, h: 4.5 });
        } else {
            slide6aa.addText('No hay datos de Alto Aging', { x: 0.5, y: 2, w: '90%', fontSize: 16, color: '94a3b8' });
        }

        // --- SLIDE 7: GOLES ---
        if (stored.golesData && stored.golesData.length > 0) {
            const golesHeaders = [
                { text: 'Descripción', options: { fill: '94a3b8', bold: true, color: 'ffffff' } },
                { text: 'Fecha', options: { fill: '94a3b8', bold: true, color: 'ffffff' } },
                { text: 'RWK Cant', options: { fill: 'b91c1c', bold: true, color: 'ffffff' } },
                { text: 'RWK %', options: { fill: 'b91c1c', bold: true, color: 'ffffff' } },
                { text: 'WIP Cant', options: { fill: 'eab308', bold: true, color: 'ffffff' } },
                { text: 'WIP %', options: { fill: 'eab308', bold: true, color: 'ffffff' } },
                { text: 'PASS Cant', options: { fill: '15803d', bold: true, color: 'ffffff' } },
                { text: 'PASS %', options: { fill: '15803d', bold: true, color: 'ffffff' } }
            ];

            const filteredGoles = stored.golesData.filter(g => {
                const total = g.rwk + g.wip + g.pass;
                return total > 0 && ((g.pass / total) * 100) < 100;
            });

            if (filteredGoles.length > 0) {
                const ROWS_PER_SLIDE = 12;
                for (let i = 0; i < filteredGoles.length; i += ROWS_PER_SLIDE) {
                    let slideG = pres.addSlide();
                    slideG.addText(i === 0 ? 'Seguimiento de Goles' : 'Seguimiento de Goles (Cont.)', {
                        x: 0.5, y: 0.5, w: '90%', h: 0.5,
                        fontSize: 24, bold: true, color: brandColor
                    });

                    const slideTable = [golesHeaders];
                    const chunk = filteredGoles.slice(i, i + ROWS_PER_SLIDE);
                    
                    chunk.forEach(g => {
                        const total = g.rwk + g.wip + g.pass;
                        slideTable.push([
                            { text: String(g.description) }, 
                            { text: String(g.date) },
                            { text: String(g.rwk) }, 
                            { text: `${((g.rwk / total) * 100).toFixed(0)}%`, options: { fill: hslToHex(Math.max(0, 140 - ((g.rwk / total) * 100 * 1.4)), 100, 70), color: '1e293b', bold: true } },
                            { text: String(g.wip) }, 
                            { text: `${((g.wip / total) * 100).toFixed(0)}%`, options: { fill: hslToHex(Math.max(0, 140 - ((g.wip / total) * 100 * 1.4)), 100, 70), color: '1e293b', bold: true } },
                            { text: String(g.pass) }, 
                            { text: `${((g.pass / total) * 100).toFixed(0)}%`, options: { fill: hslToHex(Math.min(140, ((g.pass / total) * 100 * 1.4)), 100, 70), color: '1e293b', bold: true } }
                        ]);
                    });

                    slideG.addTable(slideTable, {
                        x: 0.5, y: 1.2, w: 9,
                        border: { type: 'solid', color: 'cbd5e1', pt: 1 },
                        align: 'center', valign: 'middle', fontSize: 10
                    });
                }
            } else {
                let slideEmpty = pres.addSlide();
                slideEmpty.addText('Seguimiento de Goles', { x: 0.5, y: 0.5, w: '90%', h: 0.5, fontSize: 24, bold: true, color: brandColor });
                slideEmpty.addText('Todos los goles están al 100% PASS', { x: 0.5, y: 2, w: '90%', fontSize: 16 });
            }
        } else {
            let slideNoData = pres.addSlide();
            slideNoData.addText('Seguimiento de Goles', { x: 0.5, y: 0.5, w: '90%', h: 0.5, fontSize: 24, bold: true, color: brandColor });
            slideNoData.addText('No hay datos de goles', { x: 0.5, y: 2, w: '90%', fontSize: 16 });
        }

        // Restore view visibility
        if (wasHidden) {
            chartsView.classList.add('hidden');
        }

        // Save presentation
        await pres.writeFile({ fileName: `PCBA_Dashboard_Report_${stored.weekId}.pptx` });
        updateStatus('PowerPoint generado con éxito', 'success');

    } catch (error) {
        console.error('PPT Export Error:', error);
        updateStatus('Error al generar PowerPoint: ' + error.message, 'error');
    }
}

async function exportToExcel() {

    const stored = window.dashboard_storage;
    if (!stored) {
        updateStatus('No hay datos para exportar', 'error');
        return;
    }

    updateStatus('Generando Excel...', 'info');

    try {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'PCBA Dashboard';
        workbook.lastModifiedBy = 'PCBA Dashboard';
        workbook.created = new Date();
        workbook.modified = new Date();

        // --- SHEET 1: RESUMEN SEMANAL ---
        const sheet1 = workbook.addWorksheet('Resumen Semanal');
        const weekLabel = stored.weekId.split('-')[1] || stored.weekId;
        const s1Headers = ['Modelo', `${weekLabel} (Vie Ant)`, ...WEEK_DAYS];
        sheet1.addRow(s1Headers);

        // Header Styling
        const headerRow = sheet1.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FF1E293B' } };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

        // Colors for headers
        headerRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCBD5E1' } };
        headerRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCBD5E1' } };
        for (let i = 3; i <= s1Headers.length; i++) {
            headerRow.getCell(i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF08A' } };
        }

        CATEGORIES.forEach(cat => {
            const prevFridayRaw = (stored.prevFridayData && stored.prevFridayData[cat]) || 0;
            const prevVal = (typeof prevFridayRaw === 'object') ? (prevFridayRaw.count || 0) : prevFridayRaw;

            let hasData = prevVal > 0;
            WEEK_DAYS.forEach(d => { if ((stored.data[cat][d] || 0) > 0) hasData = true; });
            if (!hasData) return;

            const rowData = [cat, prevVal];
            let lastVal = prevVal;

            WEEK_DAYS.forEach(d => {
                const val = stored.data[cat][d] || 0;
                rowData.push(val);
            });

            const row = sheet1.addRow(rowData);
            row.alignment = { vertical: 'middle', horizontal: 'center' };
            row.getCell(1).alignment = { vertical: 'middle', horizontal: 'left' };
            row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };

            // Trend Coloring
            let currentLastVal = prevVal;
            // Prev Friday cell
            const prevTrend = (typeof prevFridayRaw === 'object') ? prevFridayRaw.trend : "";
            applyTrendStyle(row.getCell(2), prevTrend);

            WEEK_DAYS.forEach((d, idx) => {
                const val = stored.data[cat][d] || 0;
                const trend = getTrendClass(val, currentLastVal);
                applyTrendStyle(row.getCell(idx + 3), trend);
                currentLastVal = val;
            });
        });

        // Add TOTAL row
        const totalsByDay = {};
        WEEK_DAYS.forEach(d => totalsByDay[d] = 0);
        let grandPrevTotal = 0;

        CATEGORIES.forEach(cat => {
            const prevFridayRaw = (stored.prevFridayData && stored.prevFridayData[cat]) || 0;
            const prevVal = (typeof prevFridayRaw === 'object') ? (prevFridayRaw.count || 0) : prevFridayRaw;
            grandPrevTotal += prevVal;
            WEEK_DAYS.forEach(d => totalsByDay[d] += (stored.data[cat][d] || 0));
        });

        const totalRowData = ['TOTAL', grandPrevTotal, ...WEEK_DAYS.map(d => totalsByDay[d])];
        const totalRow = sheet1.addRow(totalRowData);
        totalRow.eachCell(cell => {
            cell.font = { bold: true };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCBD5E1' } };
            cell.border = { top: { style: 'thin' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });
        totalRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'left' };

        sheet1.getColumn(1).width = 25;
        sheet1.getColumn(2).width = 15;
        for (let i = 3; i <= s1Headers.length; i++) sheet1.getColumn(i).width = 12;

        // --- SHEET 2: DASHBOARD (GRÁFICOS) ---
        const sheet2 = workbook.addWorksheet('Dashboard');

        // Entradas
        sheet2.addRow(['ENTRADAS POR MODELO']).font = { bold: true, size: 14 };
        sheet2.addRow(['Modelo (Categoría)', 'Cantidad']).font = { bold: true };
        const entradasCounts = getCountsForExport(stored.entradasData, 3);
        Object.keys(entradasCounts).forEach(k => sheet2.addRow([k, entradasCounts[k]]));
        sheet2.addRow([]);

        // Salidas
        sheet2.addRow(['SALIDAS POR MODELO']).font = { bold: true, size: 14 };
        sheet2.addRow(['Modelo (Categoría)', 'Cantidad']).font = { bold: true };
        const salidasCounts = getCountsForExport(stored.salidasData, 2);
        Object.keys(salidasCounts).forEach(k => sheet2.addRow([k, salidasCounts[k]]));
        sheet2.addRow([]);

        // FIRST (Components)
        sheet2.addRow(['FIRST - FALLAS POR COMPONENTE']).font = { bold: true, size: 14 };
        sheet2.addRow(['Componente', 'Cantidad']).font = { bold: true };
        const firstCompCounts = {};
        if (stored.firstData) {
            stored.firstData.forEach(r => {
                const comp = String(r[9] || 'Unknown').trim();
                firstCompCounts[comp] = (firstCompCounts[comp] || 0) + 1;
            });
        }
        Object.keys(firstCompCounts).sort((a, b) => firstCompCounts[b] - firstCompCounts[a]).forEach(k => {
            sheet2.addRow([k, firstCompCounts[k]]);
        });

        sheet2.getColumn(1).width = 40;
        sheet2.getColumn(2).width = 15;

        // --- SHEET 3: GOLES ---
        const sheet3 = workbook.addWorksheet('GOLES');
        sheet3.addRow(['Descripción', 'Fecha', 'RWK Cant', 'RWK %', 'WIP Cant', 'WIP %', 'PASS Cant', 'PASS %']);
        const gHeader = sheet3.getRow(1);
        gHeader.font = { bold: true, color: { argb: 'FF1E293B' } };
        gHeader.alignment = { vertical: 'middle', horizontal: 'center' };
        gHeader.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF94A3B8' } };
        gHeader.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF94A3B8' } };
        gHeader.getCell(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB91C1C' }, color: { argb: 'FFFFFFFF' } };
        gHeader.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB91C1C' }, color: { argb: 'FFFFFFFF' } };
        gHeader.getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEAB308' } };
        gHeader.getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEAB308' } };
        gHeader.getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF15803D' }, color: { argb: 'FFFFFFFF' } };
        gHeader.getCell(8).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF15803D' }, color: { argb: 'FFFFFFFF' } };

        if (stored.golesData) {
            let tRwk = 0, tWip = 0, tPass = 0;
            stored.golesData.forEach(g => {
                const total = g.rwk + g.wip + g.pass;
                if (total === 0) return;

                const pRwk = (g.rwk / total) * 100;
                const pWip = (g.wip / total) * 100;
                const pPass = (g.pass / total) * 100;

                const row = sheet3.addRow([
                    g.description, g.date,
                    g.rwk, `${pRwk.toFixed(0)}%`,
                    g.wip, `${pWip.toFixed(0)}%`,
                    g.pass, `${pPass.toFixed(0)}%`
                ]);
                row.alignment = { vertical: 'middle', horizontal: 'center' };
                row.getCell(1).alignment = { vertical: 'middle', horizontal: 'left' };

                // HSL to HEX for percentages
                applyHslStyle(row.getCell(4), Math.max(0, 140 - (pRwk * 1.4)));
                applyHslStyle(row.getCell(6), Math.max(0, 140 - (pWip * 1.4)));
                applyHslStyle(row.getCell(8), Math.min(140, pPass * 1.4));

                tRwk += g.rwk; tWip += g.wip; tPass += g.pass;
            });

            const gTotal = tRwk + tWip + tPass;
            if (gTotal > 0) {
                const gpRwk = (tRwk / gTotal) * 100;
                const gpWip = (tWip / gTotal) * 100;
                const gpPass = (tPass / gTotal) * 100;
                const fRow = sheet3.addRow(['TOTAL', '', tRwk, `${gpRwk.toFixed(0)}%`, tWip, `${gpWip.toFixed(0)}%`, tPass, `${gpPass.toFixed(0)}%`]);
                fRow.font = { bold: true };
                fRow.eachCell(c => c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF94A3B8' } });
                applyHslStyle(fRow.getCell(4), Math.max(0, 140 - (gpRwk * 1.4)));
                applyHslStyle(fRow.getCell(6), Math.max(0, 140 - (gpWip * 1.4)));
                applyHslStyle(fRow.getCell(8), Math.min(140, gpPass * 1.4));
            }
        }

        sheet3.getColumn(1).width = 40;
        sheet3.getColumn(2).width = 15;

        // Download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Reporte_Dashboard_PCBA_${stored.weekId}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);

        updateStatus('Excel generado con éxito', 'success');
    } catch (err) {
        console.error('Excel Export Error:', err);
        updateStatus('Error al generar Excel', 'error');
    }
}

function getPptTrendColor(trend) {
    if (trend === 'trend-down') return '55a64d';
    if (trend === 'trend-up') return 'f7a379';
    if (trend === 'trend-equal') return 'fef08a';
    return 'ffffff';
}

function getPptTrendFontColor(trend) {
    if (trend === 'trend-down' || trend === 'trend-up') return 'ffffff';
    return '1e293b';
}

function applyTrendStyle(cell, trend) {
    if (trend === 'trend-down') {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF55A64D' } };
        cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
    } else if (trend === 'trend-up') {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7A379' } };
        cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
    } else if (trend === 'trend-equal') {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF08A' } };
        cell.font = { color: { argb: 'FF1E293B' }, bold: true };
    }
}

function applyHslStyle(cell, hue) {
    // Basic HSL to RGB approximation for Excel (70% lightness, 100% saturation)
    const rgb = hslToHex(hue, 100, 70);
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + rgb.replace('#', '') } };
    cell.font = { color: { argb: 'FF1E293B' }, bold: true };
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getCountsForExport(data, colIndex) {
    const counts = {};
    if (!data) return counts;
    data.forEach(row => {
        const rawModel = String(row[colIndex] || 'Unknown').trim();
        const category = getCategory(rawModel);
        if (category !== "OTHER") {
            counts[category] = (counts[category] || 0) + 1;
        }
    });

    return counts;
}
/**
 * Records an anonymous visit to the server
 */
async function trackVisit() {
    // Only track if running over HTTP
    if (!window.location.protocol.startsWith('http')) return;

    // Check if we already tracked this session to avoid flooding
    const SESSION_KEY = 'visit_tracked_' + new Date().toISOString().split('T')[0]; // One track per day
    if (localStorage.getItem(SESSION_KEY)) return;

    // Get or create a unique visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
        visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem('visitor_id', visitorId);
    }

    try {
        const response = await fetch('track_visit.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visitor_id: visitorId })
        });
        
        if (response.ok) {
            localStorage.setItem(SESSION_KEY, 'true');
            console.log("Visit tracked successfully.");
        }
    } catch (e) {
        console.warn("Failed to track visit:", e);
    }
}
/**
 * Fetches and renders the visitor logs
 */
async function renderVisitorLog() {
    const tableBody = document.getElementById('visitorLogBody');
    const totalEl = document.getElementById('vTotalVisits');
    const uniqueEl = document.getElementById('vUniqueVisitors');
    
    if (!tableBody) return;

    try {
        const response = await fetch('track_visit.php');
        const logs = await response.json();

        if (!logs || logs.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem; color: #94a3b8;">No hay registros de visitas todavía.</td></tr>';
            if (totalEl) totalEl.textContent = '0';
            if (uniqueEl) uniqueEl.textContent = '0';
            return;
        }

        // Summary Stats
        const totalVisits = logs.length;
        const uniqueVisitors = new Set(logs.map(l => l.visitor_id)).size;

        if (totalEl) totalEl.textContent = totalVisits;
        if (uniqueEl) uniqueEl.textContent = uniqueVisitors;

        // Render Table (last 50 visits)
        let html = "";
        logs.reverse().slice(0, 50).forEach(entry => {
            html += `
                <tr>
                    <td>${entry.timestamp || 'N/A'}</td>
                    <td style="font-family: monospace;">${entry.ip || 'N/A'}</td>
                    <td>${entry.hostname || 'N/A'}</td>
                    <td title="${entry.visitor_id}" style="font-size: 0.7rem; color: #94a3b8;">${entry.visitor_id ? entry.visitor_id.substring(0, 12) + '...' : 'N/A'}</td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;

    } catch (e) {
        console.error("Error loading visitor logs:", e);
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem; color: #ef4444;">Error al cargar registros.</td></tr>';
    }
}
