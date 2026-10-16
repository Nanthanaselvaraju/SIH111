// ============================================
// SMARTFEED - COMPLETE MAIN JAVASCRIPT
// WITH MULTI-LANGUAGE SUPPORT
// SIH 2026 - Problem Statement SIH26111
// ============================================

// ============================================
// BACKEND API CONNECTION
// ============================================

const BACKEND_BASE_URL = window.location.port && window.location.port !== '5000'
    ? `${window.location.protocol}//${window.location.hostname || '127.0.0.1'}:5000`
    : '';
const API_URL = BACKEND_BASE_URL ? `${BACKEND_BASE_URL}/api` : '/api';
const HEALTH_URL = BACKEND_BASE_URL ? `${BACKEND_BASE_URL}/health` : '/health';
let authToken = localStorage.getItem('authToken') || null;
let milkYieldChart = null;

// Helper to safely get elements on multi-page layout
function getEl(id) { return document.getElementById(id); }

async function loadMatlabSimulation() {
    const message = getEl('matlabSimulationMessage');
    const values = getEl('matlabSimulationValues');
    if (!message || !values) return;
    try {
        const response = await fetch(`${API_URL}/silage/simulated-reading`);
        const data = await response.json();
        if (!response.ok || !data.available) {
            message.textContent = data.message || 'Simulated MATLAB reading is unavailable.';
            return;
        }
        getEl('matlabTemperature').textContent = `${Number(data.temperature_c).toFixed(1)} °C`;
        getEl('matlabMoisture').textContent = `${Number(data.moisture_pct).toFixed(1)} %`;
        getEl('matlabPh').textContent = Number(data.ph).toFixed(2);
        getEl('matlabTemperatureStatus').textContent = data.status.temperature;
        getEl('matlabMoistureStatus').textContent = data.status.moisture;
        getEl('matlabPhStatus').textContent = data.status.ph;
        getEl('matlabOverallStatus').textContent = data.status.overall;
        getEl('matlabReadingTime').textContent = `Reading ${data.reading_number} · ${new Date(data.timestamp).toLocaleString()}`;
        values.hidden = false;
        message.hidden = true;
    } catch (error) {
        values.hidden = true;
        message.hidden = false;
        message.textContent = `Cannot reach the Flask API at ${API_URL}/silage/simulated-reading. Start the Python backend in a separate terminal, then refresh this page.`;
        console.error('MATLAB simulated reading error:', error);
    }
}

// Register User
async function registerUser(username, email, password, fullName) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, full_name: fullName })
        });
        const data = await response.json();
        if (response.ok) {
            alert('✅ Registration successful! Please login.');
            return data;
        } else {
            alert('❌ ' + data.error);
            return null;
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('❌ Could not connect to server. Make sure backend is running!');
        return null;
    }
}

// Login User
async function loginUser(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            authToken = data.access_token;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('✅ Login successful!');
            updateUIForLoggedInUser(data.user);
            await loadUserTests();
            await loadSavedReports();
            await loadFarmDashboardSummary();
            return data;
        } else {
            alert('❌ ' + data.error);
            return null;
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('❌ Could not connect to server. Make sure backend is running!');
        return null;
    }
}

// Logout User
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    authToken = null;
    alert('✅ Logged out successfully!');
    location.reload();
}

// Send Test to Backend
async function sendTestToBackend(testData) {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    const response = await fetch(`${API_URL}/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(testData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The test could not be saved.');
    return data;
}

async function getTestsFromBackend(query = '') {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    const response = await fetch(`${API_URL}/tests${query ? `?${query}` : ''}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not load saved tests.');
    return data.tests || [];
}

async function getDashboardStats(query = '') {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    const response = await fetch(`${API_URL}/dashboard/stats${query ? `?${query}` : ''}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not load dashboard statistics.');
    return data;
}

async function loadFarmDashboardSummary() {
    const silageMessage = getEl('dashboardSilageMessage');
    const chart = getEl('milkYieldChart');
    const empty = getEl('milkYieldEmpty');
    if (!silageMessage && !chart) return;
    const token = localStorage.getItem('authToken');
    if (!token) {
        if (silageMessage) silageMessage.textContent = window.t ? window.t('dashboard_silage_signin') : 'Sign in to view saved silage observations.';
        if (chart) chart.hidden = true;
        if (empty) { empty.hidden = false; empty.textContent = window.t ? window.t('dashboard_yield_empty') : 'Sign in and save at least two dated milk entries to see a trend.'; }
        return;
    }
    try {
        const response = await fetch(`${API_URL}/farm-records`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load farm records.');
        const records = data.records || [];
        const latestSilage = records.find((record) => record.record_type === 'silage_observation');
        if (silageMessage) {
            if (!latestSilage) {
                silageMessage.textContent = window.t ? window.t('dashboard_silage_none') : 'No saved silage observation yet.';
            } else {
                const warningKeys = ['mould', 'unusual_smell', 'colour_change', 'texture_change', 'air_exposure', 'water_entry'];
                const warningCount = warningKeys.filter((key) => latestSilage.payload[key]).length;
                silageMessage.textContent = window.t
                    ? window.t('dashboard_silage_status').replace('{sample}', latestSilage.payload.sample_id || 'Silage sample').replace('{date}', latestSilage.payload.date || 'Date not entered').replace('{count}', warningCount)
                    : `${latestSilage.payload.sample_id || 'Silage sample'} · ${latestSilage.payload.date || 'Date not entered'} · ${warningCount} warning sign(s) recorded. This is an observation, not a safety result.`;
            }
        }
        const latestMilk = records.find((record) => record.record_type === 'milk_yield');
        const groupId = latestMilk?.payload?.animal_id || '';
        const milkEntries = records.filter((record) => record.record_type === 'milk_yield' &&
            String(record.payload.animal_id || '') === String(groupId) && record.payload.date && Number.isFinite(Number(record.payload.litres)))
            .sort((left, right) => left.payload.date.localeCompare(right.payload.date) || left.created_at.localeCompare(right.created_at));
        const entriesByDate = new Map();
        milkEntries.forEach((record) => entriesByDate.set(record.payload.date, record));
        const plotted = [...entriesByDate.values()].slice(-14);
        if (!chart || !empty || plotted.length < 2 || typeof window.Chart !== 'function') {
            if (chart) chart.hidden = true;
            if (empty) {
                empty.hidden = false;
                const messageKey = plotted.length < 2 ? 'dashboard_yield_need_two' : 'dashboard_chart_unavailable';
                empty.textContent = window.t ? window.t(messageKey) : 'Save at least two dated entries for this animal/group to see a trend.';
            }
            return;
        }
        chart.hidden = false;
        empty.hidden = true;
        if (milkYieldChart) milkYieldChart.destroy();
        milkYieldChart = new window.Chart(chart, {
            type: 'line',
            data: {
                labels: plotted.map((record) => new Date(`${record.payload.date}T00:00:00`).toLocaleDateString()),
                datasets: [{ label: window.t ? window.t('dashboard_yield_series') : 'Recorded milk (L)', data: plotted.map((record) => Number(record.payload.litres)), borderColor: '#286044', backgroundColor: 'rgba(40, 96, 68, .10)', tension: 0.2, fill: true }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: window.t ? window.t('dashboard_yield_unit') : 'Litres' } } }, plugins: { tooltip: { callbacks: { afterBody: () => window.t ? window.t('dashboard_yield_caution') : 'Timeline only; this does not establish cause.' } } } }
        });
    } catch (error) {
        if (silageMessage) silageMessage.textContent = error.message || 'Could not load saved silage observations.';
        if (chart) chart.hidden = true;
        if (empty) { empty.hidden = false; empty.textContent = window.t ? window.t('dashboard_yield_error') : 'Could not load saved milk-yield entries.'; }
    }
}

async function loadUserTests(query = '') {
    const message = getEl('dashboardDataMessage');
    if (!localStorage.getItem('authToken')) {
        if (message) message.textContent = 'Sign in with Login above to see your saved feed checks and farm records.';
        renderRecentTestsFromBackend([]);
        setTextIfPresent('recentReportsCount', '—');
        if (getEl('qualityChart')) getEl('qualityChart').hidden = true;
        if (getEl('qualityChartEmpty')) getEl('qualityChartEmpty').hidden = false;
        return;
    }
    if (message) message.textContent = 'Loading your saved feed checks…';
    try {
        const [stats, tests] = await Promise.all([getDashboardStats(query), getTestsFromBackend(query)]);
        if (stats) {
            updateDashboardFromCloud(stats);
            if (message) message.textContent = stats.total_tests
                ? `You have ${stats.total_tests} saved feed check${Number(stats.total_tests) === 1 ? '' : 's'}.`
                : 'No saved feed checks yet. Start a check to see your results here.';
        }
        renderRecentTestsFromBackend(tests || []);
    } catch (error) {
        if (message) message.textContent = 'We could not load your saved feed checks. Please try again later.';
        console.error('Could not load dashboard records:', error);
    }
}

function renderRecentTestsFromBackend(tests) {
    const container = getEl('recentTests');
    if (!container) return;
    tests = Array.isArray(tests) ? tests : [];
    setTextIfPresent('recentReportsCount', Math.min(tests.length, 10));
    if (tests.length === 0) {
        container.innerHTML = '<div class="dashboard-empty"><p>No saved tests found yet.</p><a class="btn-secondary" href="./test.html">Start your first feed test</a></div>';
        return;
    }
    const rows = tests.slice(0, 10).map(test => {
        const category = String(test.quality_label || 'Unknown');
        const statusClass = category === 'Good' ? 'status-good' : category === 'Moderate' ? 'status-warning' : ['Poor', 'Unsafe'].includes(category) ? 'status-danger' : '';
        const date = test.timestamp ? new Date(test.timestamp).toLocaleDateString() : '—';
        return `<tr>
            <td data-label="Sample ID">${escapeHTML(test.sample_id || `#${test.id}`)}</td>
            <td data-label="Date">${escapeHTML(date)}</td>
            <td data-label="Feed type">${escapeHTML(test.feed_type || '—')}</td>
            <td data-label="Score">${test.quality_score == null ? '—' : `${escapeHTML(test.quality_score)} / 100`}</td>
            <td data-label="Result"><span class="status ${statusClass}">${escapeHTML(category)}</span></td>
            <td data-label="Details"><a class="table-link" href="reports.html?test_id=${encodeURIComponent(test.id)}">View details</a></td>
        </tr>`;
    }).join('');
    container.innerHTML = `<table class="history-table"><thead><tr><th>Sample ID</th><th>Date</th><th>Feed type</th><th>Score</th><th>Result</th><th>Details</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function setTextIfPresent(id, value) {
    const element = getEl(id);
    if (element) element.textContent = value;
}

function updateDashboardFromCloud(stats) {
    const setText = (id, value) => { const element = getEl(id); if (element) element.textContent = value; };
    setText('totalTests', stats.total_tests ?? 0);
    setText('qualityScore', stats.averages?.score == null ? '—' : `${stats.averages.score}%`);
    const distribution = stats.quality_distribution || {};
    const good = Number(distribution.Good || 0);
    const moderate = Number(distribution.Moderate || 0);
    const poor = Number(distribution.Poor || 0);
    const unsafe = Number(distribution.Unsafe || 0);
    setText('unsafeCount', stats.attention_count ?? poor + unsafe);
    const chartEmpty = getEl('qualityChartEmpty');
    if (chartEmpty) chartEmpty.hidden = Number(stats.total_tests || 0) > 0;
    const chartCanvas = getEl('qualityChart');
    if (chartCanvas) chartCanvas.hidden = Number(stats.total_tests || 0) === 0;
    if (sensorSim.chart) {
        sensorSim.chart.data.datasets[0].data = [good, moderate, poor, unsafe];
        sensorSim.chart.update();
    }
}

async function loadSavedReports() {
    const records = getEl('reportRecords');
    const message = getEl('reportHistoryMessage');
    if (!records || !message) return;
    const token = localStorage.getItem('authToken');
    if (!token) {
        message.textContent = 'Sign in to view reports saved to your account.';
        records.replaceChildren();
        return;
    }
    const params = new URLSearchParams();
    const search = getEl('reportSearch')?.value.trim();
    const feedType = getEl('reportTypeFilter')?.value;
    if (search) params.set('q', search);
    if (feedType) params.set('feed_type', feedType);
    message.textContent = 'Loading saved reports…';
    try {
        const query = params.toString();
        const response = await fetch(`${API_URL}/tests${query ? `?${query}` : ''}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load reports.');
        const tests = data.tests || [];
        message.textContent = tests.length ? `${tests.length} saved report(s).` : 'No saved reports match your search.';
        records.innerHTML = tests.map(test => `
            <div class="recent-test-item">
                <span class="test-id">${escapeHTML(test.sample_id)}</span>
                <span>${escapeHTML(test.feed_type)} · ${escapeHTML(test.quality_label)} · ${escapeHTML(test.quality_score)}/100</span>
                <span>${escapeHTML(test.timestamp ? new Date(test.timestamp).toLocaleString() : '')}</span>
                <button class="btn-secondary" type="button" data-report-id="${Number(test.id)}">Open report</button>
            </div>
        `).join('');
        records.querySelectorAll('[data-report-id]').forEach(button => {
            button.addEventListener('click', () => loadSavedReport(button.dataset.reportId));
        });
        const reportId = new URLSearchParams(window.location.search).get('test_id');
        if (reportId && /^\d+$/.test(reportId)) await loadSavedReport(reportId);
    } catch (error) {
        message.textContent = error.message || 'Could not load reports. Confirm the Flask backend is running.';
        console.error('Saved report loading failed:', error);
    }
}

async function loadSavedReport(reportId) {
    const detail = getEl('reportDetail');
    const token = localStorage.getItem('authToken');
    if (!detail || !token) return;
    detail.hidden = false;
    detail.textContent = 'Loading report…';
    try {
        const response = await fetch(`${API_URL}/tests/${encodeURIComponent(reportId)}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not open report.');
        const test = data.test;
        detail.innerHTML = `
            <h3>Saved report: ${escapeHTML(test.sample_id)}</h3>
            <p><strong>Date:</strong> ${escapeHTML(test.timestamp ? new Date(test.timestamp).toLocaleString() : '')}</p>
            <p><strong>Type:</strong> ${escapeHTML(test.feed_type)}</p>
            <p><strong>Inputs:</strong> Moisture ${escapeHTML(test.moisture)}%, protein ${escapeHTML(test.protein)}%, fiber ${escapeHTML(test.fiber)}%, energy ${escapeHTML(test.energy)} MJ/kg, pH ${escapeHTML(test.ph)}</p>
            <p><strong>Model result:</strong> ${escapeHTML(test.quality_label)} · ${escapeHTML(test.quality_score)}/100</p>
            <p><strong>Contamination:</strong> ${escapeHTML(test.contamination || 'Not assessed')}</p>
            <p><strong>Advisory:</strong> ${escapeHTML(test.advisory || 'No advisory saved.')}</p>
            <p><strong>Recommendations:</strong> ${test.recommendations?.length ? test.recommendations.map(escapeHTML).join('<br>') : 'None saved.'}</p>
            <button class="btn-secondary" type="button" id="printSavedReport">Print report</button>
            <button class="btn-secondary" type="button" id="savedReportQr">Create private QR</button>
            <div id="savedReportQrView" class="saved-report-qr" hidden></div>
        `;
        getEl('printSavedReport')?.addEventListener('click', () => {
            document.body.classList.add('print-saved-report');
            window.print();
        });
        const qrButton = getEl('savedReportQr');
        qrButton?.addEventListener('click', async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch(`${API_URL}/tests/${encodeURIComponent(test.id)}/qr`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Could not create a private QR for this report.');
                const imageUrl = URL.createObjectURL(await response.blob());
                const view = getEl('savedReportQrView');
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = `Private QR for sample ${test.sample_id}`;
                image.width = 160;
                image.height = 160;
                const link = document.createElement('a');
                link.href = imageUrl;
                link.download = `${test.sample_id}-qr.png`;
                link.textContent = 'Download private QR';
                view.replaceChildren(image, link);
                view.hidden = false;
            } catch (error) {
                qrButton.textContent = error.message;
            }
        });
        window.addEventListener('afterprint', () => document.body.classList.remove('print-saved-report'), { once: true });
    } catch (error) {
        detail.textContent = error.message || 'Could not open this report.';
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    const authButtons = getEl('authButtons');
    const authUserInfo = getEl('authUserInfo');
    const userNameText = getEl('userNameText');
    const syncStatus = getEl('syncStatus');

    if (authButtons) authButtons.style.display = 'none';
    if (authUserInfo) authUserInfo.style.display = 'flex';
    if (userNameText) userNameText.textContent = user.full_name || user.username;
    if (syncStatus) {
        syncStatus.innerHTML = '☁️ Signed in · saved in the project database';
        syncStatus.style.color = '#4caf50';
    }
}

// Check if user is logged in on page load
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    let user = null;
    try { user = JSON.parse(localStorage.getItem('user') || 'null'); } catch { localStorage.removeItem('user'); }
    if (token && user) {
        updateUIForLoggedInUser(user);
        console.log('✅ User already logged in:', user.username);
        loadUserTests();
    } else {
        const syncStatus = getEl('syncStatus');
        if (syncStatus) {
            syncStatus.innerHTML = '💻 Local database · sign in to save reports';
            syncStatus.style.color = '#ff9800';
        }
        loadUserTests('');
    }
}

// ============================================
// LOGIN/REGISTER UI FUNCTIONS
// ============================================

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'flex';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}

async function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        alert('Please enter username and password');
        return;
    }
    
    const result = await loginUser(username, password);
    if (result) closeLoginModal();
}

async function handleRegister() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const fullName = document.getElementById('regFullName').value;
    const password = document.getElementById('regPassword').value;
    
    if (!username || !email || !password) {
        alert('Please fill all required fields');
        return;
    }
    
    const result = await registerUser(username, email, password, fullName);
    if (result) closeRegisterModal();
}

// ============================================
// WEBSOCKET CONNECTION (REAL-TIME UPDATES)
// ============================================

let socket = null;
if (typeof io === 'function') {
    socket = io();

    socket.on('connect', function() {
        console.log('✅ WebSocket Connected!');
        const connEl = getEl('connectionStatus');
        if (connEl) {
            connEl.textContent = '● Online';
            connEl.style.color = '#4caf50';
        }
    });

    socket.on('disconnect', function() {
        console.log('❌ WebSocket Disconnected');
        const connEl = getEl('connectionStatus');
        if (connEl) {
            connEl.textContent = '● Offline';
            connEl.style.color = '#f44336';
        }
    });

    socket.on('new_test', function(data) {
        console.log('📊 New test received:', data);
        showToast('🔄 New test result available!');
        if (data.test) loadUserTests();
    });
} else {
    console.log('ℹ️ Socket.IO client not loaded; using local sensor mode.');
}

// ============================================
// SENSOR SIMULATOR CLASS
// ============================================

class SensorSimulator {
    constructor() {
        this.isSimulating = false;
        this.simulationInterval = null;
        this.sensorData = {
            moisture: 0,
            protein: 0,
            fiber: 0,
            ph: 0,
            temperature: 0,
            energy: 0
        };
        this.chart = null;
    }

    generateSensorData() {
        const randomNormal = (mean, standardDeviation) => {
            let u = 0, v = 0;
            while (u === 0) u = Math.random();
            while (v === 0) v = Math.random();
            return mean + standardDeviation * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        };
        // These values are for the software demo only, not from physical sensors.
        const moisture = Math.max(0, Math.min(75, randomNormal(15, 10)));
        const protein = Math.max(0, Math.min(30, randomNormal(18, 6)));
        const fiber = Math.max(0, Math.min(30, randomNormal(15, 5)));
        const ph = Math.max(3.5, Math.min(8, randomNormal(6, 1)));
        const temperature = Math.max(20, Math.min(40, randomNormal(30, 5)));
        const energy = Math.max(8, Math.min(15, randomNormal(11.5, 1.5)));
        return {
            moisture: Math.round(moisture * 10) / 10,
            protein: Math.round(protein * 10) / 10,
            fiber: Math.round(fiber * 10) / 10,
            ph: Math.round(ph * 10) / 10,
            temperature: Math.round(temperature * 10) / 10,
            energy: Math.round(energy * 100) / 100,
            timestamp: new Date().toISOString()
        };
    }

    startSimulation(callback, interval = 3000) {
        this.isSimulating = true;
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
        }
        
        this.simulationInterval = setInterval(() => {
            if (this.isSimulating) {
                const data = this.generateSensorData();
                this.sensorData = data;
                if (callback) callback(data);
            }
        }, interval);
        
        console.log('📡 Simulated demo readings started (no physical sensors)');
        return this.simulationInterval;
    }

    stopSimulation() {
        this.isSimulating = false;
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
        console.log('📡 Simulated demo readings stopped');
    }

    getSingleReading() {
        return this.generateSensorData();
    }

    initChart() {
        const ctx = document.getElementById('qualityChart');
        if (!ctx) return;

        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Good Quality', 'Moderate', 'Poor', 'Unsafe'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: ['#56866a', '#d1a64f', '#b76a45', '#a94b45'],
                    borderWidth: 3,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
}

// ============================================
// UI FUNCTIONS
// ============================================

const sensorSim = new SensorSimulator();

// Updated autoFillWithSensorData with backend check
async function fillWithSimulatedValues() {
    const data = sensorSim.getSingleReading();
    const moistureEl = getEl('moisture');
    const proteinEl = getEl('protein');
    const fiberEl = getEl('fiber');
    const phEl = getEl('ph');
    const energyEl = getEl('energy');

    if (moistureEl) moistureEl.value = data.moisture;
    if (proteinEl) proteinEl.value = data.protein;
    if (fiberEl) fiberEl.value = data.fiber;
    if (phEl) phEl.value = data.ph;
    if (energyEl) energyEl.value = data.energy;
    if (getEl('measurementSource')) getEl('measurementSource').value = 'simulated_demo';

    updateSensorStatus(data);
    
    const btn = document.querySelector('[onclick="fillWithSimulatedValues()"]');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Data Loaded!';
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    }
    
    // Check backend connection
    try {
        const response = await fetch(HEALTH_URL);
        if (response.ok) {
            console.log('✅ Backend is connected!');
            const connEl = getEl('connectionStatus');
            if (connEl) {
                connEl.textContent = '● Online';
                connEl.style.color = '#4caf50';
            }
        }
    } catch (error) {
        console.log('⚠️ Backend not running. Using local mode.');
        const connEl = getEl('connectionStatus');
        if (connEl) {
            connEl.textContent = '● Offline';
            connEl.style.color = '#f44336';
        }
        const syncStatus = getEl('syncStatus');
        if (syncStatus) {
            syncStatus.innerHTML = '💻 Offline Mode';
            syncStatus.style.color = '#f44336';
        }
    }
}

function updateSensorStatus(data) {
    const tempEl = document.getElementById('miniTemp');
    const moistureEl = document.getElementById('miniMoisture');
    const phEl = document.getElementById('miniPH');
    const proteinEl = document.getElementById('miniProtein');

    if (tempEl) tempEl.textContent = `🌡️ ${data.temperature}°C`;
    if (moistureEl) moistureEl.textContent = `💧 ${data.moisture}%`;
    if (phEl) phEl.textContent = `🧪 pH ${data.ph}`;
    if (proteinEl) proteinEl.textContent = `🔬 ${data.protein}%`;
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function printResults() {
    window.print();
}

function saveResult() {
    const resultsDiv = document.getElementById('resultsContent');
    if (!resultsDiv) return;
    
    const data = {
        timestamp: new Date().toISOString(),
        results: resultsDiv.textContent,
        advisory: document.getElementById('advisoryText').textContent
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feed-test-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function shareResult() {
    const text = document.getElementById('advisoryText').textContent;
    if (navigator.share) {
        navigator.share({
            title: 'Feed Quality Test Result',
            text: `Feed Quality Advisory: ${text}`,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(`Feed Quality Test Result:\n${text}`).then(() => {
            alert('✅ Result copied to clipboard!');
        });
    }
}

// ============================================
// QR CODE DISPLAY
// ============================================

function displayQRCode(qrData) {
    const resultsDiv = document.getElementById('resultsContent');
    if (!resultsDiv) return;
    
    const qrHtml = `
        <div class="qr-section" style="text-align:center; margin: 15px 0; padding: 15px; background: #f5f5f5; border-radius: 10px; border: 2px dashed #2e7d32;">
            <h4 style="color: #2e7d32;"><i class="fas fa-qrcode"></i> Test QR Code</h4>
            <img src="data:image/png;base64,${qrData.base64}" 
                 alt="QR Code" 
                 style="max-width: 150px; margin: 10px auto; display: block; border: 3px solid #2e7d32; border-radius: 8px;">
            <p style="font-size: 0.85rem; color: #666;">
                <i class="fas fa-info-circle"></i> Scan to view test results
            </p>
            <button onclick="downloadQR()" class="btn-secondary" style="padding: 5px 15px; font-size: 0.85rem;">
                <i class="fas fa-download"></i> Download QR Code
            </button>
        </div>
    `;
    
    resultsDiv.innerHTML += qrHtml;
}

function downloadQR() {
    const qrImg = document.querySelector('.qr-section img');
    if (qrImg) {
        const link = document.createElement('a');
        link.download = 'test-qr-code.png';
        link.href = qrImg.src;
        link.click();
    }
}

function createQRAnalysis(rawValue) {
    let payload;
    const qrText = String(rawValue || '').trim();
    try {
        payload = JSON.parse(qrText);
    } catch {
        try {
            const url = new URL(qrText, window.location.href);
            const reportId = url.searchParams.get('test_id');
            const farmRecordId = url.searchParams.get('record_id');
            if (url.origin === window.location.origin && /\/reports(?:\.html)?$/.test(url.pathname) && /^\d+$/.test(reportId || '')) {
                return { hasMeasurements: false, savedReportId: reportId, error: '' };
            }
            if (url.origin === window.location.origin && /\/farm-tools(?:\.html)?$/.test(url.pathname) && /^[0-9a-f-]{36}$/i.test(farmRecordId || '')) {
                return { hasMeasurements: false, savedFarmRecordId: farmRecordId, error: '' };
            }
        } catch {
            return { hasMeasurements: false, error: 'QR content is not a supported report link or JSON measurement record.' };
        }
        return { hasMeasurements: false, error: 'QR content is not a supported report link or JSON measurement record.' };
    }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        return { hasMeasurements: false, error: 'QR content must be a JSON measurement record.' };
    }
    const readNumber = (...keys) => {
        for (const key of keys) {
            if (!Object.prototype.hasOwnProperty.call(payload, key)) continue;
            const rawValue = payload[key];
            if ((typeof rawValue !== 'number' && typeof rawValue !== 'string') || String(rawValue).trim() === '') return NaN;
            return Number(rawValue);
        }
        return NaN;
    };
    const measurements = {
        moisture: readNumber('moisture', 'moisture_percent'),
        protein: readNumber('protein', 'crude_protein', 'protein_percent'),
        fiber: readNumber('fiber', 'fiber_percent'),
        energy: readNumber('energy', 'energy_value'),
        ph: readNumber('ph', 'pH')
    };
    const hasMeasurements = Object.values(measurements).every(Number.isFinite);
    return {
        hasMeasurements,
        error: hasMeasurements ? '' : 'QR record is missing one or more required measurements.',
        formData: {
            ...measurements,
            sampleId: payload.sample_id || payload.sampleId || 'QR-' + Date.now().toString().slice(-6),
            sampleName: String(payload.sample_name || payload.sampleName || ''),
            sampleDate: String(payload.sample_date || payload.sampleDate || ''),
            measurementSource: ['laboratory_report', 'manufacturer_label', 'farmer_measured', 'reference_value', 'simulated_demo', 'not_specified'].includes(payload.measurement_source)
                ? payload.measurement_source
                : 'not_specified',
            feedType: String(payload.feed_type || payload.feedType || 'cattle').toLowerCase()
        }
    };
}

// ============================================
// FORM HANDLING
// ============================================

document.querySelectorAll('.test-type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.test-type-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const testType = this.dataset.test;
        const silageFields = document.getElementById('silageFields');
        if (testType === 'silage') {
            silageFields.style.display = 'block';
        } else {
            silageFields.style.display = 'none';
        }
    });
});

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
}

function displayResults(formData, prediction, metadata = {}) {
    const resultsDiv = getEl('testResults');
    const contentDiv = getEl('resultsContent');
    const advisoryP = getEl('advisoryText');
    const timestampSpan = getEl('resultTimestamp');
    if (!resultsDiv || !contentDiv || !advisoryP) return;

    const analysis = prediction.analysis || {};
    const values = [
        ['Sample ID', metadata.test?.sample_id || (formData.sampleId === 'AUTO' ? 'Not saved' : formData.sampleId)],
        ['Sample name', formData.sampleName || 'Not provided'],
        ['Collection date', formData.sampleDate || 'Not provided'],
        ['Value source', window.t ? window.t(({ laboratory_report: 'source_lab', manufacturer_label: 'source_manufacturer', farmer_measured: 'source_measured', reference_value: 'source_reference', simulated_demo: 'source_simulated' })[formData.measurementSource] || 'source_not_specified') : formData.measurementSource],
        ['Date', metadata.test?.timestamp ? new Date(metadata.test.timestamp).toLocaleString() : new Date().toLocaleString()],
        ['Type', formData.feedType],
        ['Moisture', `${formData.moisture}%`],
        ['Protein', `${formData.protein}%`],
        ['Fiber', `${formData.fiber}%`],
        ['Energy', `${formData.energy} MJ/kg`],
        ['pH', formData.ph]
    ];
    const issues = Array.isArray(analysis.issues) ? analysis.issues : [];
    const recommendations = Array.isArray(analysis.recommendations) ? analysis.recommendations : [];
    const limitation = metadata.limitations || 'This demonstration model was trained using generated data and has not been evaluated using labelled field data.';
    const source = metadata.source || prediction.model_source || 'Existing Python analysis';

    contentDiv.innerHTML = `
        <div class="result-meta">${values.map(([label, value]) => `<div class="result-item"><strong>${escapeHTML(label)}</strong><span>${escapeHTML(value)}</span></div>`).join('')}</div>
        <div class="result-item"><strong>Quality score</strong><span>${escapeHTML(prediction.score)} / 100</span></div>
        <div class="result-item"><strong>Category</strong><span class="status status-${escapeHTML(String(prediction.quality || '').toLowerCase())}">${escapeHTML(prediction.quality)}</span></div>
        <div class="result-item"><strong>Contamination assessment</strong><span>Not assessed by this model</span></div>
        <div class="result-item"><strong>Parameters to review</strong><span>${issues.length ? issues.map(escapeHTML).join('<br>') : 'No parameter-specific flags were returned by the current model.'}</span></div>
        <div class="result-item"><strong>Recommendations</strong><span>${recommendations.length ? recommendations.map(escapeHTML).join('<br>') : 'No specific recommendations were returned.'}</span></div>
        <p class="model-limitations"><strong>Analysis source:</strong> ${escapeHTML(source)}<br>${escapeHTML(limitation)}</p>
        ${metadata.test ? '' : '<p class="model-limitations">Not saved to test history. Sign in before analysis to save this result to your account.</p>'}
    `;
    const qrButton = getEl('createTestQr');
    const qrView = getEl('testQrView');
    if (qrButton && qrView) {
        qrButton.hidden = false;
        qrView.hidden = true;
        qrView.replaceChildren();
        qrButton.onclick = async () => {
            const token = localStorage.getItem('authToken');
            qrButton.disabled = true;
            try {
                const isSaved = !!(token && metadata.test?.id);
                const response = isSaved
                    ? await fetch(`${API_URL}/tests/${encodeURIComponent(metadata.test.id)}/qr`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    : await fetch(`${API_URL}/qr/measurements`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sample_id: formData.sampleId,
                            sample_name: formData.sampleName,
                            sample_date: formData.sampleDate,
                            measurement_source: formData.measurementSource,
                            feed_type: formData.feedType,
                            moisture: formData.moisture,
                            protein: formData.protein,
                            fiber: formData.fiber,
                            energy: formData.energy,
                            ph: formData.ph
                        })
                    });
                if (!response.ok) {
                    const data = await response.json().catch(() => ({}));
                    throw new Error(data.error || 'Could not create the QR code.');
                }
                const imageUrl = URL.createObjectURL(await response.blob());
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = `QR code for sample ${metadata.test?.sample_id || formData.sampleId}`;
                image.width = 180;
                image.height = 180;
                const download = document.createElement('a');
                download.href = imageUrl;
                download.download = `${metadata.test?.sample_id || formData.sampleId || 'feed-measurements'}-qr.png`;
                download.textContent = window.t ? window.t('qr_download') : 'Download private QR';
                const note = document.createElement('p');
                const noteKey = isSaved ? 'qr_private_note' : 'qr_measurement_note';
                note.textContent = window.t ? window.t(noteKey) : isSaved
                    ? 'This QR opens the saved report and requires the same account to sign in.'
                    : 'This QR contains the values you entered; scanning it can prefill the analysis form. It is not a certified result.';
                qrView.replaceChildren(image, download, note);
                qrView.hidden = false;
            } catch (error) {
                qrView.textContent = error.message || 'Could not create the QR code.';
                qrView.hidden = false;
            } finally {
                qrButton.disabled = false;
            }
        };
    }
    advisoryP.textContent = analysis.advisory || 'The model did not return an advisory for this result.';
    if (timestampSpan) timestampSpan.textContent = metadata.test?.timestamp ? new Date(metadata.test.timestamp).toLocaleString() : new Date().toLocaleString();
    resultsDiv.style.display = 'block';
}

function displayImageObservationResults(fileName, observations) {
    const resultsDiv = getEl('testResults');
    const content = getEl('resultsContent');
    const advisory = getEl('advisoryText');
    if (!resultsDiv || !content || !advisory) return;

    const title = document.createElement('h4');
    title.textContent = window.t ? window.t('image_result_title') : 'Photo observation screen (not AI)';
    const file = document.createElement('p');
    file.textContent = `${window.t ? window.t('image_result_photo') : 'Photo'}: ${fileName}`;
    const findings = document.createElement('p');
    findings.textContent = observations.length
        ? `${window.t ? window.t('image_result_findings') : 'Signs you selected'}: ${observations.map((key) => window.t ? window.t(key) : key).join(', ')}`
        : (window.t ? window.t('image_result_none') : 'No warning signs selected. This does not establish safety.');
    const limit = document.createElement('p');
    limit.className = 'model-limitations';
    limit.textContent = window.t ? window.t('image_result_caution') : 'The image was not automatically analyzed. These are farmer-selected observations, not a diagnosis or toxin test.';
    const link = document.createElement('a');
    link.className = 'text-link';
    link.href = './farm-tools.html#sampleScreening';
    link.textContent = window.t ? window.t('image_silage_link') : 'Record silage observations';
    content.replaceChildren(title, file, findings, limit, link);
    advisory.textContent = observations.length
        ? (window.t ? window.t('image_result_warning') : 'Warning signs were selected. Keep seriously affected feed separate and seek expert or laboratory review.')
        : (window.t ? window.t('image_result_no_warning') : 'No listed warning sign was selected. Appearance alone cannot confirm feed safety.');
    const qrButton = getEl('createTestQr');
    const qrView = getEl('testQrView');
    if (qrButton) qrButton.hidden = true;
    if (qrView) { qrView.hidden = true; qrView.replaceChildren(); }
    if (getEl('resultTimestamp')) getEl('resultTimestamp').textContent = new Date().toLocaleString();
    resultsDiv.style.display = 'block';
}

function offlineRulePrediction(values) {
    let score = 0;
    score += values.moisture >= 10 && values.moisture <= 15 ? 25 : values.moisture > 15 && values.moisture <= 20 ? 15 : 5;
    score += values.protein >= 18 && values.protein <= 22 ? 25 : values.protein >= 15 && values.protein < 18 ? 15 : 5;
    score += values.fiber >= 15 && values.fiber <= 18 ? 15 : (values.fiber >= 12 && values.fiber < 15) || (values.fiber > 18 && values.fiber <= 22) ? 10 : 5;
    score += values.ph >= 5.5 && values.ph <= 7.5 ? 20 : values.ph >= 4.5 && values.ph < 5.5 ? 12 : 5;
    score += values.energy >= 11 && values.energy <= 13 ? 15 : values.energy >= 10 && values.energy < 11 ? 10 : 5;
    const quality = score >= 80 ? 'Good' : score >= 60 ? 'Moderate' : score >= 40 ? 'Poor' : 'Unsafe';
    const issues = ['moisture', 'protein', 'fiber', 'ph', 'energy'].map(field =>
        `${field}=${values[field]} (local rule-based demo input; not a safety determination)`
    );
    return {
        quality,
        score,
        model_source: 'Local rule-based fallback; the trained Random Forest model was not reached',
        analysis: {
            issues,
            recommendations: ['Confirm measurements using suitable methods and review feed decisions with a qualified animal nutrition professional.'],
            advisory: `Offline demonstration rules assigned category ${quality} with score ${score}/100. This is not a validated feed-quality or safety determination.`
        }
    };
}

const _testForm = getEl('testForm');
if (_testForm) {
    _testForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const message = getEl('analysisMessage');
        const loading = getEl('analysisLoading');
        const submitButton = _testForm.querySelector('button[type="submit"]');
        if (message) { message.hidden = true; message.textContent = ''; }
        if (!_testForm.reportValidity()) return;

        const formData = {
            sampleId: getEl('sampleId').value.trim() || 'AUTO',
            sampleName: getEl('sampleName')?.value.trim() || '',
            sampleDate: getEl('sampleDate')?.value || '',
            measurementSource: getEl('measurementSource')?.value || 'not_specified',
            feedType: getEl('feedType').value,
            moisture: Number(getEl('moisture').value),
            protein: Number(getEl('protein').value),
            fiber: Number(getEl('fiber').value),
            energy: Number(getEl('energy').value),
            ph: Number(getEl('ph').value)
        };
        if (!['moisture', 'protein', 'fiber', 'energy', 'ph'].every((field) => Number.isFinite(formData[field]))) {
            if (message) { message.textContent = 'Enter a valid number for each required measurement.'; message.hidden = false; }
            return;
        }

        const token = localStorage.getItem('authToken');
        if (loading) loading.hidden = false;
        if (submitButton) submitButton.disabled = true;
        try {
            let responseData;
            if (token) {
                responseData = await sendTestToBackend({
                    sample_id: formData.sampleId,
                    sample_name: formData.sampleName,
                    sample_date: formData.sampleDate,
                    measurement_source: formData.measurementSource,
                    feed_type: formData.feedType,
                    moisture: formData.moisture,
                    protein: formData.protein,
                    fiber: formData.fiber,
                    energy: formData.energy,
                    ph: formData.ph
                });
            } else {
                const response = await fetch(`${API_URL}/analyze`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        feed_type: formData.feedType, moisture: formData.moisture,
                        protein: formData.protein, fiber: formData.fiber,
                        energy: formData.energy, ph: formData.ph
                    })
                });
                responseData = await response.json();
                if (!response.ok) throw new Error(responseData.error || 'Analysis failed.');
            }
            displayResults(formData, responseData.prediction, {
                test: responseData.test,
                sampleMetadata: responseData.sample_metadata,
                source: responseData.model_source || responseData.prediction?.model_source,
                limitations: responseData.limitations
            });
            if (token) await loadUserTests();
            getEl('testResults')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            if (error instanceof TypeError) {
                const prediction = offlineRulePrediction(formData);
                displayResults(formData, prediction, {
                    limitations: 'Flask was unreachable. A local rule-based fallback was used; the saved Random Forest model was not run, and this result was not saved.'
                });
                if (message) {
                    message.textContent = 'Flask is unavailable. Showing a clearly labelled local rule-based fallback; no database record was created.';
                    message.hidden = false;
                }
                return;
            }
            if (message) {
                message.textContent = error.message || 'Analysis failed. Confirm the Flask backend is running and retry.';
                message.hidden = false;
            }
            console.error('Feed quality analysis failed:', error);
        } finally {
            if (loading) loading.hidden = true;
            if (submitButton) submitButton.disabled = false;
        }
    });
}

// ============================================
// NAVIGATION & UI
// ============================================

document.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const navToggle = getEl('navToggle');
if (navToggle) navToggle.addEventListener('click', function() {
    const menu = document.querySelector('.nav-menu');
    if (!menu) return;
    const isOpen = menu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color:#4caf50;"></i><span>${message}</span>`;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        font-weight: 500;
        animation: fadeInUp 0.3s ease;
        border-left: 4px solid #4caf50;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    loadMatlabSimulation();
    console.log('🚀 DiaryLens software demo initialized');
    console.log('📡 Simulated demo value generator active (no sensors connected)');
    console.log('🧠 AI Quality Prediction Engine Ready');
    console.log('🌐 Multi-Language Support Active');
    console.log('☁️ Saved reports: ' + (localStorage.getItem('authToken') ? 'enabled' : 'sign-in required'));
    
    sensorSim.initChart();
    
    sensorSim.startSimulation((data) => {
        updateSensorStatus(data);
        const connEl = getEl('connectionStatus');
        if (connEl) {
            connEl.textContent = '● Online';
            connEl.style.color = '#4caf50';
        }
    }, 3000);
    
    // Do not auto-generate demo tests; use the backend data when the user is logged in.
    
    const connElInit = getEl('connectionStatus');
    if (connElInit) {
        connElInit.textContent = '● Connecting...';
        connElInit.style.color = '#ff9800';
    }
    
    // Check backend
    setTimeout(async () => {
        try {
            const response = await fetch(HEALTH_URL);
            if (response.ok) {
                const connEl2 = getEl('connectionStatus');
                if (connEl2) {
                    connEl2.textContent = '● Online';
                    connEl2.style.color = '#4caf50';
                }
            }
        } catch {
            const connEl3 = getEl('connectionStatus');
            if (connEl3) {
                connEl3.textContent = '● Offline';
                connEl3.style.color = '#f44336';
            }
        }
    }, 2000);
    
    checkAuthStatus();
    loadFarmDashboardSummary();

    const applyReportFilters = getEl('applyReportFilters');
    if (applyReportFilters) applyReportFilters.addEventListener('click', loadSavedReports);
    if (getEl('reportRecords')) loadSavedReports();
    
    // Close modals on outside click
    const loginModalEl = getEl('loginModal');
    if (loginModalEl) {
        loginModalEl.addEventListener('click', function(e) {
            if (e.target === this) closeLoginModal();
        });
    }
    const registerModalEl = getEl('registerModal');
    if (registerModalEl) {
        registerModalEl.addEventListener('click', function(e) {
            if (e.target === this) closeRegisterModal();
        });
    }

    // ----- Input Selection UI (optional inputs) -----
    const selectedInputs = new Set();

    function updateAvailableInputsDisplay() {
        const listEl = getEl('availableInputsList');
        if (!listEl) return;
        if (selectedInputs.size === 0) {
            listEl.textContent = 'None';
        } else {
            listEl.textContent = Array.from(selectedInputs).map(s => s.toUpperCase()).join(', ');
        }
    }

    function toggleInputCard(el, inputType) {
        if (!el) return;
        const wrapper = getEl('detailsFormWrapper');
        const qrActionButtons = getEl('qrActionButtons');
        const imageActionButtons = getEl('imageActionButtons');

        if (el.classList.contains('selected')) {
            el.classList.remove('selected');
            selectedInputs.delete(inputType);
            if (inputType === 'details' && wrapper) wrapper.style.display = 'none';
            if (inputType === 'qr' && qrActionButtons) qrActionButtons.style.display = 'none';
            if (inputType === 'image' && imageActionButtons) imageActionButtons.style.display = 'none';
        } else {
            el.classList.add('selected');
            selectedInputs.add(inputType);
            if (inputType === 'details' && wrapper) wrapper.style.display = 'block';
            if (inputType === 'qr' && qrActionButtons) qrActionButtons.style.display = 'flex';
            if (inputType === 'image' && imageActionButtons) imageActionButtons.style.display = 'flex';
        }
        updateAvailableInputsDisplay();

        // Results belong to the previous input selection; clear them when selection changes.
        const results = getEl('testResults');
        const resultsContent = getEl('resultsContent');
        const advisory = getEl('advisoryText');
        if (results) results.style.display = 'none';
        if (resultsContent) resultsContent.textContent = '';
        if (advisory) advisory.textContent = 'Select an input and run an analysis to see guidance.';
        ['analysisMessage', 'inputAnalysisMessage'].forEach(id => {
            const error = getEl(id);
            if (error) { error.textContent = ''; error.hidden = true; }
        });
    }

    const qrScanBtn = getEl('qrScanBtn');
    const qrUploadBtn = getEl('qrUploadBtn');
    const qrUpload = getEl('qrUpload');
    const imageTakePhotoBtn = getEl('imageTakePhotoBtn');
    const imageUploadBtn = getEl('imageUploadBtn');
    const imageUpload = getEl('imageUpload');
    const removeImageBtn = getEl('removeImageBtn');
    let scannedQRValue = '';

    function showQRResult(rawValue) {
        const decodedValue = typeof rawValue === 'string' ? rawValue.trim() : '';
        scannedQRValue = decodedValue;
        const qrValueEl = getEl('qrValue');
        if (qrValueEl) {
            qrValueEl.textContent = decodedValue ? 'QR data received' : 'QR data was decoded but empty';
            qrValueEl.style.display = 'block';
        }
        const qrCard = getEl('inputCardQR');
        if (qrCard && !qrCard.classList.contains('selected')) toggleInputCard(qrCard, 'qr');
        showToast('✅ QR code received. Click Analyze for results.');
    }

    async function scanQRWithCamera() {
        const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        const isSecureContext = window.isSecureContext || ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);

        if (!hasMediaDevices || !isSecureContext) {
            const message = !hasMediaDevices
                ? 'Camera access is unavailable in this browser. Please upload a QR image instead.'
                : 'Camera access requires a secure context. Please upload a QR image instead.';
            showToast(message);
            if (qrUpload) qrUpload.click();
            return;
        }

        const video = document.createElement('video');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('autoplay', 'true');
        video.muted = true;
        video.style.cssText = 'width:100%; max-width:420px; border-radius:10px; background:#111;';

        const dialog = document.createElement('div');
        dialog.style.cssText = 'position:fixed; inset:0; z-index:10000; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:14px; padding:20px; background:rgba(0,0,0,.82);';
        const close = document.createElement('button');
        close.className = 'btn-secondary';
        close.textContent = 'Close scanner';
        dialog.append(video, close);
        document.body.appendChild(dialog);

        let stream = null;
        let stopped = false;
        const stop = () => {
            stopped = true;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
            if (dialog.parentNode) dialog.remove();
        };
        close.addEventListener('click', () => {
            stop();
            showToast('QR scanner closed. Please upload a QR image if needed.');
        });

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: 'environment' } },
                audio: false
            });

            video.srcObject = stream;
            await video.play();

            const detector = ('BarcodeDetector' in window) ? new BarcodeDetector({ formats: ['qr_code'] }) : null;

            const fallbackToUpload = (message) => {
                stop();
                showToast(message);
                if (qrUpload) qrUpload.click();
            };

            if (detector) {
                const detect = async () => {
                    if (stopped) return;
                    try {
                        const codes = await detector.detect(video);
                        if (codes.length > 0 && codes[0].rawValue) {
                            showQRResult(codes[0].rawValue);
                            stop();
                            return;
                        }
                    } catch (error) {
                        console.warn('BarcodeDetector QR detection warning:', error);
                    }
                    requestAnimationFrame(detect);
                };
                detect();
                return;
            }

            if (typeof window.jsQR !== 'function') {
                fallbackToUpload('The QR decoder is unavailable. Please upload a QR image instead.');
                return;
            }

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d', { willReadFrequently: true });

            const scanWithJsQR = () => {
                if (stopped) return;
                if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = window.jsQR(imageData.data, canvas.width, canvas.height, {
                        inversionAttempts: 'attemptBoth'
                    });
                    if (code && code.data) {
                        showQRResult(code.data);
                        stop();
                        return;
                    }
                }
                requestAnimationFrame(scanWithJsQR);
            };
            scanWithJsQR();
        } catch (error) {
            const name = error && error.name ? error.name : 'UnknownError';
            const msg = name === 'NotAllowedError'
                ? 'Camera permission was denied. Please allow camera access or upload a QR image.'
                : name === 'NotFoundError'
                    ? 'No camera was found. Please upload a QR image.'
                    : name === 'NotReadableError'
                        ? 'Camera is currently unavailable. Please close other apps using the camera.'
                        : 'Camera could not be opened. Please upload a QR image instead.';
            console.warn('QR camera access error:', error);
            stop();
            showToast(msg);
            if (qrUpload) qrUpload.click();
        }
    }

    if (qrScanBtn) qrScanBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        scanQRWithCamera();
    });

    if (qrUploadBtn) qrUploadBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (qrUpload) qrUpload.click();
    });

    async function decodeQRImage(file) {
        if (typeof window.jsQR !== 'function') {
            throw new Error('jsQR is unavailable');
        }

        let image;
        try {
            image = await createImageBitmap(file);
        } catch (error) {
            image = new Image();
            image.src = URL.createObjectURL(file);
            await new Promise((resolve, reject) => {
                image.onload = resolve;
                image.onerror = reject;
            });
        }

        const maxDimension = 1800;
        const scale = Math.min(2, maxDimension / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        if (image.close) image.close();
        if (image.src && image.src.startsWith('blob:')) URL.revokeObjectURL(image.src);

        const source = context.getImageData(0, 0, width, height);
        const variants = [source];
        const grayscale = new ImageData(new Uint8ClampedArray(source.data), width, height);
        const threshold128 = new ImageData(new Uint8ClampedArray(source.data), width, height);
        const threshold180 = new ImageData(new Uint8ClampedArray(source.data), width, height);

        for (let index = 0; index < source.data.length; index += 4) {
            const gray = Math.round(
                source.data[index] * 0.299 +
                source.data[index + 1] * 0.587 +
                source.data[index + 2] * 0.114
            );
            grayscale.data[index] = gray;
            grayscale.data[index + 1] = gray;
            grayscale.data[index + 2] = gray;
            threshold128.data[index] = threshold128.data[index + 1] = threshold128.data[index + 2] = gray < 128 ? 0 : 255;
            threshold180.data[index] = threshold180.data[index + 1] = threshold180.data[index + 2] = gray < 180 ? 0 : 255;
        }
        variants.push(grayscale, threshold128, threshold180);

        for (const variant of variants) {
            const code = window.jsQR(variant.data, variant.width, variant.height, {
                inversionAttempts: 'attemptBoth'
            });
            if (code?.data) return code.data;
        }
        return '';
    }

    if (qrUpload) qrUpload.addEventListener('change', async function() {
        const file = this.files && this.files[0];
        if (!file) return;

        try {
            let rawValue = '';
            if ('BarcodeDetector' in window) {
                try {
                    const detector = new BarcodeDetector({ formats: ['qr_code'] });
                    const bitmap = await createImageBitmap(file);
                    const codes = await detector.detect(bitmap);
                    rawValue = codes[0]?.rawValue || '';
                    if (bitmap.close) bitmap.close();
                } catch (error) {
                    console.warn('BarcodeDetector fallback issue:', error);
                }
            }

            if (!rawValue) {
                if (typeof window.jsQR !== 'function') {
                    throw new Error('jsQR library is not loaded');
                }
                rawValue = await decodeQRImage(file);
            }

            if (!rawValue) {
                throw new Error('No QR code found');
            }

            showQRResult(rawValue);
            this.value = '';
        } catch (error) {
            console.warn('QR image decode error:', error);
            const message = error && error.message && error.message.includes('library')
                ? 'The QR image decoder is unavailable. Please use a browser with jsQR support or scan with the camera.'
                : 'No readable QR code was found in that image. Please try another file.';
            showToast(message);
            this.value = '';
        }
    });

    const cardIds = ['inputCardImage','inputCardDetails','inputCardQR'];
    cardIds.forEach(id => {
        const el = getEl(id);
        if (el) {
            el.addEventListener('click', function(e) {
                if (e.target.closest('button') || e.target.closest('input')) return;
                toggleInputCard(el, el.dataset.input);
            });
        }
    });

    if (imageTakePhotoBtn) {
        imageTakePhotoBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const imgCard = getEl('inputCardImage');
            if (imgCard && !imgCard.classList.contains('selected')) toggleInputCard(imgCard, 'image');

            const isSecureContext = window.isSecureContext || ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !isSecureContext) {
                showToast('Camera access is unavailable here. Please upload an image instead.');
                if (imageUpload) imageUpload.click();
                return;
            }

            const video = document.createElement('video');
            video.setAttribute('playsinline', 'true');
            video.setAttribute('autoplay', 'true');
            video.muted = true;
            video.style.cssText = 'width:100%; max-width:420px; border-radius:10px; background:#111;';

            const dialog = document.createElement('div');
            dialog.style.cssText = 'position:fixed; inset:0; z-index:10000; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:14px; padding:20px; background:rgba(0,0,0,.82);';
            const capture = document.createElement('button');
            capture.className = 'btn-primary';
            capture.textContent = 'Capture photo';
            const close = document.createElement('button');
            close.className = 'btn-secondary';
            close.textContent = 'Close';
            dialog.append(video, capture, close);
            document.body.appendChild(dialog);

            let stream = null;
            const stop = () => {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    stream = null;
                }
                if (dialog.parentNode) dialog.remove();
            };
            close.addEventListener('click', stop);

            navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: 'environment' } },
                audio: false
            }).then((mediaStream) => {
                stream = mediaStream;
                video.srcObject = stream;
                return video.play();
            }).then(() => {
                capture.addEventListener('click', async function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth || 1280;
                    canvas.height = video.videoHeight || 720;
                    const context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                    const file = new File([blob], 'camera-capture.png', { type: 'image/png' });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    if (imageUpload) {
                        imageUpload.files = dataTransfer.files;
                        imageUpload.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    stop();
                }, { once: true });
            }).catch((error) => {
                console.warn('Image camera error:', error);
                stop();
                showToast('Camera access was denied. Please upload an image instead.');
                if (imageUpload) imageUpload.click();
            });
        });
    }

    if (imageUploadBtn) {
        imageUploadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (imageUpload) imageUpload.click();
        });
    }

    if (imageUpload) {
        imageUpload.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const file = this.files[0];
                const imgCard = getEl('inputCardImage');
                if (imgCard && !imgCard.classList.contains('selected')) toggleInputCard(imgCard, 'image');
                const preview = getEl('imagePreview');
                const previewImage = getEl('imagePreviewImage');
                const fileName = getEl('imageFileName');
                if (preview && previewImage && fileName) {
                    previewImage.src = URL.createObjectURL(file);
                    fileName.textContent = file.name;
                    preview.style.display = 'block';
                }
                const observationFields = getEl('imageObservationFields');
                if (observationFields) observationFields.hidden = false;
                showToast('✅ Image selected: ' + file.name);
            }
        });
    }

    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (imageUpload) imageUpload.value = '';
            const preview = getEl('imagePreview');
            const previewImage = getEl('imagePreviewImage');
            const fileName = getEl('imageFileName');
            if (preview) preview.style.display = 'none';
            if (previewImage) previewImage.removeAttribute('src');
            if (fileName) fileName.textContent = '';
            const observationFields = getEl('imageObservationFields');
            if (observationFields) {
                observationFields.hidden = true;
                observationFields.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => { checkbox.checked = false; });
            }
            showToast('Image removed.');
        });
    }

    const analyzeBtn = getEl('analyzeSelectedBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const selected = Array.from(selectedInputs);
            if (selected.length === 0) {
                alert('Please select at least one input type to analyze.');
                return;
            }

            const analysisMessage = getEl('inputAnalysisMessage');
            const showInputMessage = (text) => {
                if (analysisMessage) {
                    analysisMessage.textContent = text;
                    analysisMessage.hidden = false;
                }
            };

            if (selected.includes('image') && !selected.includes('details') && !selected.includes('qr')) {
                const imageFile = imageUpload?.files?.[0];
                if (!imageFile) {
                    showInputMessage(window.t ? window.t('image_no_file') : 'Choose a photo to preview. Photos are not analyzed here; enter report values under Details or record silage observations in Farm Tools.');
                    return;
                }
                const observations = [
                    ['imageMould', 'image_observe_mould'], ['imageColour', 'image_observe_colour'],
                    ['imageForeign', 'image_observe_foreign'], ['imageWetHeat', 'image_observe_wet_heat']
                ].filter(([id]) => getEl(id)?.checked).map(([, key]) => key);
                if (!observations.length) {
                    showInputMessage(window.t ? window.t('image_observation_prompt') : 'Photo preview is ready. Select any visible warning signs you observe, then Analyze. The photo is not automatically classified.');
                    getEl('imageObservationFields')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }
                displayImageObservationResults(imageFile.name, observations);
                getEl('testResults')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }

            if (selected.includes('qr')) {
                if (!scannedQRValue) {
                    showInputMessage('Scan or upload a QR record first.');
                    return;
                }
                const qrAnalysis = createQRAnalysis(scannedQRValue);
                if (qrAnalysis.savedReportId) {
                    const reportUrl = new URL('./reports.html', window.location.href);
                    reportUrl.searchParams.set('test_id', qrAnalysis.savedReportId);
                    window.location.assign(reportUrl.href);
                    return;
                }
                if (qrAnalysis.savedFarmRecordId) {
                    const recordUrl = new URL('./farm-tools.html', window.location.href);
                    recordUrl.searchParams.set('record_id', qrAnalysis.savedFarmRecordId);
                    window.location.assign(recordUrl.href);
                    return;
                }
                if (!qrAnalysis.hasMeasurements) {
                    showInputMessage(`${qrAnalysis.error} Expected moisture, protein, fiber, energy, and pH fields. No values were inferred.`);
                    return;
                }
                const formData = qrAnalysis.formData;
                const feedType = getEl('feedType');
                if (![...feedType.options].some(option => option.value === formData.feedType)) {
                    showInputMessage('The QR record has an unsupported feed type.');
                    return;
                }
                getEl('sampleId').value = formData.sampleId;
                if (getEl('sampleName')) getEl('sampleName').value = formData.sampleName;
                if (getEl('sampleDate')) getEl('sampleDate').value = /^\d{4}-\d{2}-\d{2}$/.test(formData.sampleDate) ? formData.sampleDate : '';
                if (getEl('measurementSource')) getEl('measurementSource').value = formData.measurementSource;
                feedType.value = formData.feedType;
                for (const field of ['moisture', 'protein', 'fiber', 'energy', 'ph']) {
                    getEl(field).value = formData[field];
                }
                const wrapper = getEl('detailsFormWrapper');
                if (wrapper) wrapper.style.display = 'block';
                getEl('testForm')?.requestSubmit();
                return;
            }

            if (selected.includes('details')) {
                const detailsForm = getEl('testForm');
                if (detailsForm) detailsForm.requestSubmit();
                return;
            }

            // Show temporary message with selected inputs
            const message = 'Selected inputs: ' + selected.map(s => s.toUpperCase()).join(', ');
            showToast(message);

            // Also display in results area for user visibility (no fake analysis)
            const resultsDiv = getEl('testResults');
            const contentDiv = getEl('resultsContent');
            if (resultsDiv && contentDiv) {
                resultsDiv.style.display = 'block';
                contentDiv.innerHTML = `
                    <div class="result-item" style="border-bottom:none;">
                        <strong>Selected Inputs</strong>
                        <div style="margin-top:8px; font-weight:700; color:var(--primary-dark);">${selected.map(s => s.toUpperCase()).join(', ')}</div>
                    </div>
                    <div style="margin-top:12px; color:var(--text-muted);">These inputs do not provide measurements by themselves. Select Details and enter values to run the feed quality analysis.</div>
                `;
                const advisory = getEl('advisoryText');
                if (advisory) {
                    advisory.textContent = 'Input selection recorded. Select Details and enter measurements to run the feed quality analysis.';
                }
            }
        });
    }
});

console.log('✅ DiaryLens loaded successfully');
