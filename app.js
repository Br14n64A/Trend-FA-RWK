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
    "1A72BED00-600-G": "NOGA",
    "1A722A000-600-G": "NOGA",
    // MOBO
    "1A62LR500-600-G": "MOBO",
    "1A62LRA00-600-G": "MOBO",
    "1A62LR600-600-G": "MOBO",
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

    if (SERIAL_TO_CATEGORY[trimmed]) {
        return SERIAL_TO_CATEGORY[trimmed];
    }

    // Fallback logic by name keyword matching
    const descriptiveName = getMappedName(rawModel).toUpperCase();
    if (descriptiveName.includes("NOGA") || descriptiveName.includes("MAKALU MB")) return "NOGA";
    if (descriptiveName.includes("JUPITER")) return "JUPITER";
    if (descriptiveName.includes("CORDITE")) return "CORDITE";
    if (descriptiveName.includes("MAKALU MP") || descriptiveName.includes("MIDPLANE")) return "MIDPLANE";
    if (descriptiveName.includes("UC MODULE") || descriptiveName.includes("UC_MODULE")) return "UC Module";
    if (descriptiveName.includes("RISER")) return "RISER";
    if (descriptiveName.includes("SSD")) return "SSD";
    if (descriptiveName.includes("MOBO")) return "MOBO";
    if (descriptiveName.includes("UPDB")) return "UPDB";
    if (descriptiveName.includes("SPARROW") || descriptiveName.includes("MB") || descriptiveName.includes("SWAN") || descriptiveName.includes("TPM")) return "MB";

    if (descriptiveName !== 'UNKNOWN') {
        console.warn(`[getCategory] Model not categorized: ${rawModel} (${descriptiveName})`);
    }
    return "OTHER";
}

const WEEK_DAYS = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];

const CONFIG = {
    colModelIndex: 2, // Column C (0-indexed)
    colWorkOrderIndex: 3, // Column D (0-indexed)
    colErrorCodeIndex: 12 // Column M (0-indexed)
};

let rawData = [];
let filteredData = [];
let headers = [];
let isEditMode = false;

let charts = {
    entradas: null,
    salidas: null,
    first: null,
    altoAging: null,
    secons: null
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
                    btnToggleEdit.innerHTML = '✅ Guardar Cambios';
                    renderSummaryTable();
                    updateStatus('Modo Edición ACTIVADO', 'info');
                } else {
                    alert('Clave incorrecta. Solo administradores pueden editar.');
                }
            } else {
                isEditMode = false;
                btnToggleEdit.classList.remove('active');
                btnToggleEdit.innerHTML = '✏️ Modo Edición';
                renderSummaryTable();
                updateStatus('Cambios guardados', 'success');
            }
        });
    }
});

window.updateManualSummary = (cat, day, value) => {
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
    saveStateToServer();
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
        await resolveLostData();
        updateStatus('Error de memoria', 'error');
    }
}

async function saveStateToServer() {
    if (!window.dashboard_storage) return;

    // Always save locally
    try {
        localStorage.setItem('dashboard_storage', JSON.stringify(window.dashboard_storage));
    } catch (e) {
        console.error("Error saving local data:", e);
    }

    // Save to server if on HTTP
    if (window.location.protocol.startsWith('http')) {
        try {
            await fetch('data_handler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(window.dashboard_storage)
            });
            updateStatus('Sincronizado', 'success');
        } catch (e) {
            console.error("Error saving to server:", e);
            updateStatus('Error de sincronización', 'error');
        }
    }
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

    // Restore Summary Table
    renderSummaryTable();

    // Restore Charts and GOLES
    if (stored.entradasData || stored.salidasData || stored.firstData) {
        renderDashboard(stored.entradasData || [], stored.salidasData || [], stored.firstData || []);
    }

    if (stored.altoAgingData && Object.keys(stored.altoAgingData).length > 0) {
        renderAltoAgingChart(stored.altoAgingData);
    }

    if (stored.golesData && stored.golesData.length > 0) {
        renderGolesTable(stored.golesData);
    }

    if (stored.seconsData && Object.keys(stored.seconsData).length > 0) {
        renderSecondsChart(stored.seconsData);
    }
}

function getWeekId(date = new Date()) {
    const d = new Date(date.getTime());
    // Adjust to end of day if it's borderline
    d.setHours(0, 0, 0, 0);
    // Sunday is 0 in JS. We want Sunday to be the start of the week.
    // Standard US week calculation:
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor((d - startOfYear) / (24 * 60 * 60 * 1000));
    // Week number = ceil((days + startDayOffset) / 7)
    // Offset accounts for the day of the week Jan 1st was.
    const weekNo = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

async function checkWeeklyReset() {
    const currentWeekId = getWeekId();
    const APP_VERSION = "5.0";

    if (!window.dashboard_storage) {
        window.dashboard_storage = { version: APP_VERSION, data: {}, history: [] };
    }

    let stored = window.dashboard_storage;

    // ENSURE ALL CATEGORIES EXIST
    let added = false;
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
        console.log("Dashboard categories/version updated.");
    }

    const weekPill = document.getElementById('currentWeekPill');
    if (weekPill) weekPill.textContent = currentWeekId;
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    updateStatus(`Reading ${file.name}...`);

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // 1. PCBA_Status_AWS_OPEN_N-SHIPPING
            const statusSheet = workbook.Sheets["PCBA_Status_AWS_OPEN_N-SHIPPING"] || workbook.Sheets[workbook.SheetNames[0]];
            const statusRows = XLSX.utils.sheet_to_json(statusSheet, { header: 1 });
            if (statusRows.length > 1) {
                headers = statusRows[0];
                rawData = statusRows.slice(1);
                processData();
                updateAccumulatedData();
            }

            // 2. Entradas
            const entradasSheet = workbook.Sheets["Entradas"];
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

            const sheet2 = workbook.Sheets[workbook.SheetNames[1]];
            let seconsData = {};
            if (sheet2 && statusRows.length > 1) {
                const sheet2Rows = XLSX.utils.sheet_to_json(sheet2, { header: 1 });
                seconsData = processSeconds(statusRows, sheet2Rows);
            }

            // 6. GOLES (Search by name "GOLES" or index 4)
            let golesSheetName = workbook.SheetNames.find(n => n.trim().toUpperCase() === "GOLES");

            // If not found by name, try common variations or fallback to index 4
            if (!golesSheetName) {
                golesSheetName = workbook.SheetNames.find(n => n.trim().toUpperCase().includes("GOLE")) || workbook.SheetNames[4];
            }

            const golesSheet = workbook.Sheets[golesSheetName];

            let golesData = [];
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

            renderDashboard(entradasData, salidasData, firstData, seconsData);
            if (golesData.length > 0) {
                renderGolesTable(golesData);
            }

            // Persist all data
            let stored = window.dashboard_storage;
            stored.entradasData = entradasData;
            stored.salidasData = salidasData;
            stored.firstData = firstData;
            stored.golesData = golesData;
            stored.altoAgingData = altoAgingData;
            stored.seconsData = seconsData;
            saveStateToServer();

            updateStatus('File processed successfully', 'success');
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
    const data = rows.slice(1);
    // Deduplicate by Column A (index 0)
    const unique = [];
    const seen = new Set();
    data.forEach(row => {
        const id = String(row[0] || '').trim();
        const statusVal = String(row[8] || '').toUpperCase(); // Col I often has MISJUDGE
        const isMisjudge = statusVal.includes("MISJUDGE") || statusVal.includes("N/A");

        if (id && !isMisjudge && !seen.has(id)) {
            seen.add(id);
            unique.push(row);
        }
    });
    return unique;
}

function processSalidas(rows) {
    if (rows.length < 2) return [];
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
    return unique;
}

function processFirst(rows) {
    if (rows.length < 2) return [];
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
    return unique;
}

function processGoles(rows) {
    if (rows.length < 2) return [];
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
    });

    return Object.values(golesMap);
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

    // Persist Stats
    let stored = window.dashboard_storage;
    if (stored) {
        stored.stats = { total: rawData.length, filtered: filteredData.length };
        saveStateToServer();
    }
}

function updateAccumulatedData() {
    const stored = window.dashboard_storage;
    if (!stored) return;

    // Get current day: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let dayNum = new Date().getDay();

    // If it's Sunday, treat it as Monday (1)
    if (dayNum === 0) dayNum = 1;

    const todayIndex = (dayNum + 6) % 7; // Monday = 0, Tuesday = 1, ...
    if (todayIndex > 4) return; // Skip Saturday (which would be index 5)

    const todayName = WEEK_DAYS[todayIndex];

    const currentCounts = {};
    CATEGORIES.forEach(cat => currentCounts[cat] = 0);

    filteredData.forEach(row => {
        const rawCode = String(row[CONFIG.colErrorCodeIndex] || '').trim();
        const cat = getCategory(rawCode);
        if (CATEGORIES.includes(cat)) {
            currentCounts[cat]++;
        }
    });

    CATEGORIES.forEach(cat => {
        stored.data[cat][todayName] = currentCounts[cat];
    });

    saveStateToServer();
}

function renderDashboard(entradasData, salidasData, firstData, seconsData) {
    renderSummaryTable();
    // Entradas: Model Serial is Column D (index 3)
    if (entradasData) renderBarChart("entradasChart", entradasData, 3, "Entradas", "#38bdf8", "entradas", "entradasTotal");
    // Salidas: Model Serial is Column C (index 2)
    if (salidasData) renderBarChart("salidasChart", salidasData, 2, "Salidas", "#818cf8", "salidas", "salidasTotal");
    if (firstData) renderFirstChart("firstChart", firstData);
    if (seconsData) renderSecondsChart(seconsData);
}

function renderBarChart(canvasId, data, modelColIndex, label, color, chartKey, totalElementId) {
    const counts = {};
    let grandTotal = 0;

    data.forEach(row => {
        const rawModel = String(row[modelColIndex] || 'Unknown').trim();
        const category = getCategory(rawModel);
        if (category !== "OTHER") {
            counts[category] = (counts[category] || 0) + 1;
            grandTotal++;
        }
    });


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
                padding: { top: 20 }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
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
                ctx.font = 'bold 12px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#f8fafc';

                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    meta.data.forEach((bar, index) => {
                        const data = dataset.data[index];
                        if (data > 0 && !meta.hidden) {
                            ctx.fillText(data, bar.x, bar.y - 5);
                        }
                    });
                });
            }
        }]
    });
}

function renderFirstChart(canvasId, data) {
    // Column J (index 9) is Component, Column C (index 2) is Model
    const componentModelCounts = {};
    const components = new Set();
    const models = new Set();
    let grandTotal = 0;

    data.forEach(row => {
        const component = String(row[9] || 'Unknown').trim();
        const rawModel = String(row[2] || 'Unknown').trim();
        const model = getCategory(rawModel); // Use category instead of raw model

        if (model !== "OTHER") {
            components.add(component);
            models.add(model);

            if (!componentModelCounts[component]) componentModelCounts[component] = {};
            componentModelCounts[component][model] = (componentModelCounts[component][model] || 0) + 1;
            grandTotal++;
        }
    });


    // Update grand total in UI
    const totalEl = document.getElementById('firstTotal');
    if (totalEl) totalEl.textContent = `Total: ${grandTotal}`;

    const sortedComponents = Array.from(components).sort((a, b) => {
        const totalA = Object.values(componentModelCounts[a]).reduce((s, v) => s + v, 0);
        const totalB = Object.values(componentModelCounts[b]).reduce((s, v) => s + v, 0);
        return totalB - totalA;
    }).slice(0, 15); // Top 15 components for readability

    const sortedModels = Array.from(models).sort();
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
                padding: { top: 20 }
            },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { color: '#94a3b8' } },
                y: { stacked: true, beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8', precision: 0 } }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#94a3b8', font: { size: 10, family: 'Outfit' } }
                }
            },
        },
        plugins: [{
            id: 'stackedTopLabelsPlugin',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.font = 'bold 11px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#f8fafc';

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
                        ctx.fillText(total, posX, highestY - 5);
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

        // Discard components with only 1 failure
        if (total <= 1) return;

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
                <td>${badgesHtml}</td>
                <td style="font-weight: bold; color: var(--accent-primary); text-align: center;">${total}</td>
            </tr>
        `;
    });

    if (!html) {
        html = '<tr><td colspan="3" style="text-align: center; color: #94a3b8;">No hay componentes con múltiples fallas.</td></tr>';
    }

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

    return result;
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
            layout: { padding: { top: 28 } },
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

                    // Draw a subtle pill background behind the number
                    const label = String(total);
                    const textW = ctx.measureText(label).width;
                    const padX = 6, padY = 4;
                    const rx = posX - textW / 2 - padX;
                    const ry = topY - 22;
                    const rw = textW + padX * 2;
                    const rh = 18;

                    ctx.fillStyle = 'rgba(15,23,42,0.75)';
                    ctx.beginPath();
                    ctx.roundRect(rx, ry, rw, rh, 4);
                    ctx.fill();

                    ctx.fillStyle = '#f8fafc';
                    ctx.fillText(label, posX, topY - padY);
                });
                ctx.restore();
            }
        }]
    });
}

function processSeconds(sheet1Rows, sheet2Rows) {
    if (!sheet1Rows || sheet1Rows.length < 2 || !sheet2Rows || sheet2Rows.length < 2) return {};

    const sheet1Data = sheet1Rows.slice(1);
    const sheet2Data = sheet2Rows.slice(1);

    // 1. Filter Sheet 1: Col F (index 5) == 0 AND Col H (index 7) > 1
    const filteredSheet1Serials = new Set();
    sheet1Data.forEach(row => {
        const colF = parseFloat(row[5]);
        const colH = parseFloat(row[7]);
        if (colF === 0 && colH > 1) {
            const serial = String(row[0] || '').trim();
            if (serial) filteredSheet1Serials.add(serial);
        }
    });

    // 2. Match with Sheet 2 and extract Col D (index 3) and Col I (index 8)
    const modelData = {};
    sheet2Data.forEach(row => {
        const serial = String(row[0] || '').trim();
        if (filteredSheet1Serials.has(serial)) {
            const model = String(row[3] || 'Unknown').trim();
            // Try to use Col I as a value, if not possible fallback to 1 (counting)
            let valI = parseFloat(row[8]);
            if (isNaN(valI)) valI = 1;
            
            modelData[model] = (modelData[model] || 0) + valI;
        }
    });

    return modelData;
}

function renderSecondsChart(data) {
    const canvas = document.getElementById('seconsChart');
    if (!canvas) return;

    const labels = Object.keys(data).sort((a, b) => data[b] - data[a]);
    const values = labels.map(l => data[l]);
    const grandTotal = values.reduce((s, v) => s + v, 0);

    const totalEl = document.getElementById('seconsTotal');
    if (totalEl) totalEl.textContent = `Total: ${grandTotal.toFixed(0)}`;

    const ctx = canvas.getContext('2d');
    if (charts.secons) charts.secons.destroy();

    charts.secons = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'SECONDS Value',
                data: values,
                backgroundColor: '#f472b6',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        },
        plugins: [{
            id: 'seconsLabelsPlugin',
            afterDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.font = 'bold 12px Outfit';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = '#f8fafc';

                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    meta.data.forEach((bar, index) => {
                        const dataVal = dataset.data[index];
                        if (dataVal > 0 && !meta.hidden) {
                            ctx.fillText(dataVal.toFixed(0), bar.x, bar.y - 5);
                        }
                    });
                });
            }
        }]
    });
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

    const rowData = CATEGORIES.map(cat => {
        const prevFridayRaw = (stored.prevFridayData && stored.prevFridayData[cat]) || 0;
        let prevVal = (typeof prevFridayRaw === 'object') ? (prevFridayRaw.count || 0) : prevFridayRaw;

        let hasData = prevVal > 0;
        WEEK_DAYS.forEach(d => { if ((stored.data[cat][d] || 0) > 0) hasData = true; });
        if (!hasData) return null;

        grandPrevTotal += prevVal;
        WEEK_DAYS.forEach(d => totalsByDay[d] += (stored.data[cat][d] || 0));

        return { cat, prevRaw: prevFridayRaw, prevVal };
    }).filter(r => r !== null);

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
                lastVal = count;
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
        updateStatus('Error: PptxGenJS no está cargado', 'error');
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
            // Force a small delay or sync resize if needed
            Object.values(charts).forEach(c => { if (c) c.resize(); });
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
            WEEK_DAYS.forEach(d => { if ((stored.data[cat][d] || 0) > 0) hasData = true; });
            if (!hasData) return;

            grandPrevTotal += prevVal;
            const prevTrend = (typeof prevFridayRaw === 'object') ? prevFridayRaw.trend : "";

            const rowData = [
                { text: cat, options: { fill: 'e2e8f0', color: '1e293b' } },
                { text: prevVal, options: { fill: getPptTrendColor(prevTrend), color: getPptTrendFontColor(prevTrend), bold: true } }
            ];

            let currentLastVal = prevVal;

            WEEK_DAYS.forEach(d => {
                const val = stored.data[cat][d] || 0;
                const trend = getTrendClass(val, currentLastVal);
                rowData.push({ text: val, options: { fill: getPptTrendColor(trend), color: getPptTrendFontColor(trend), bold: true } });
                totalsByDay[d] += val;
                currentLastVal = val;
            });

            tableData.push(rowData);
        });

        // Total Row
        tableData.push([
            { text: 'TOTAL', options: { bold: true, fill: 'cbd5e1' } },
            { text: grandPrevTotal, options: { bold: true, fill: 'cbd5e1' } },
            ...WEEK_DAYS.map(d => ({ text: totalsByDay[d], options: { bold: true, fill: 'cbd5e1' } }))
        ]);

        slide2.addTable(tableData, {
            x: 0.5, y: 1.2, w: 9,
            border: { type: 'solid', color: 'cbd5e1', pt: 1 },
            align: 'center', valign: 'middle', fontSize: 12
        });

        // --- SLIDE 3: CHARTS (Entradas y Salidas) ---
        let slide3 = pres.addSlide();
        slide3.addText('Entradas y Salidas', {
            x: 0.5, y: 0.5, w: '90%', h: 0.5,
            fontSize: 24, bold: true, color: brandColor
        });

        const entradasCanvas = document.getElementById('entradasChart');
        if (entradasCanvas) {
            slide3.addText('Entradas', { x: 0.5, y: 1.2, w: 4, h: 0.3, bold: true, fontSize: 14 });
            slide3.addImage({ data: entradasCanvas.toDataURL('image/png'), x: 0.5, y: 1.5, w: 4.2, h: 3.5 });
        }

        const salidasCanvas = document.getElementById('salidasChart');
        if (salidasCanvas) {
            slide3.addText('Salidas', { x: 5, y: 1.2, w: 4, h: 0.3, bold: true, fontSize: 14 });
            slide3.addImage({ data: salidasCanvas.toDataURL('image/png'), x: 5, y: 1.5, w: 4.2, h: 3.5 });
        }

        // --- SLIDE 4: CHART (FIRST) ---
        let slide4 = pres.addSlide();
        slide4.addText('FIRST (Fallas por Componente)', {
            x: 0.5, y: 0.5, w: '90%', h: 0.5,
            fontSize: 24, bold: true, color: brandColor
        });

        const firstCanvas = document.getElementById('firstChart');
        if (firstCanvas) {
            slide4.addImage({ data: firstCanvas.toDataURL('image/png'), x: 0.5, y: 1.2, w: 9, h: 4 });
        }

        // --- SLIDE 5: CHART (Alto Aging) ---
        let slide5aa = pres.addSlide();
        slide5aa.addText('Alto Aging por Modelo', {
            x: 0.5, y: 0.5, w: '90%', h: 0.5,
            fontSize: 24, bold: true, color: brandColor
        });

        const altoAgingCanvas = document.getElementById('altoAgingChart');
        if (altoAgingCanvas) {
            slide5aa.addImage({ data: altoAgingCanvas.toDataURL('image/png'), x: 0.5, y: 1.2, w: 9, h: 4.5 });
        } else {
            slide5aa.addText('No hay datos de Alto Aging', { x: 0.5, y: 2, w: '90%', fontSize: 16 });
        }

        // --- SLIDE 6: GOLES ---
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
                            g.description, g.date,
                            g.rwk, { text: `${((g.rwk / total) * 100).toFixed(0)}%`, options: { fill: hslToHex(Math.max(0, 140 - ((g.rwk / total) * 100 * 1.4)), 100, 70), color: '1e293b', bold: true } },
                            g.wip, { text: `${((g.wip / total) * 100).toFixed(0)}%`, options: { fill: hslToHex(Math.max(0, 140 - ((g.wip / total) * 100 * 1.4)), 100, 70), color: '1e293b', bold: true } },
                            g.pass, { text: `${((g.pass / total) * 100).toFixed(0)}%`, options: { fill: hslToHex(Math.min(140, ((g.pass / total) * 100 * 1.4)), 100, 70), color: '1e293b', bold: true } }
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
        updateStatus('Error al generar PowerPoint', 'error');
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



