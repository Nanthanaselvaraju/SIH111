// ============================================
// SMARTFEED - COMPLETE MAIN JAVASCRIPT
// WITH MULTI-LANGUAGE SUPPORT
// SIH 2026 - Problem Statement SIH26111
// ============================================

// ============================================
// BACKEND API CONNECTION
// ============================================

const API_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('authToken') || null;

// Helper to safely get elements on multi-page layout
function getEl(id) { return document.getElementById(id); }

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
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.log('⚠️ Not logged in. Test saved locally only.');
            return null;
        }
        
        const response = await fetch(`${API_URL}/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(testData)
        });
        
        const data = await response.json();
        if (response.ok) {
            console.log('✅ Test saved to backend!', data);
            return data;
        } else {
            console.error('Error saving test:', data);
            if (data.error) alert('❌ ' + data.error);
            return null;
        }
    } catch (error) {
        console.error('Backend error:', error);
        return null;
    }
}

// Get Tests from Backend
async function getTestsFromBackend() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) return null;
        
        const response = await fetch(`${API_URL}/tests`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data.tests || [];
    } catch (error) {
        console.error('Error fetching tests:', error);
        return [];
    }
}

// Get Dashboard Stats
async function getDashboardStats() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) return null;
        
        const response = await fetch(`${API_URL}/dashboard/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        return null;
    }
}

// Load user tests from backend
async function loadUserTests() {
    const tests = await getTestsFromBackend();
    if (tests && tests.length > 0) {
        console.log(`📊 Loaded ${tests.length} tests from cloud`);
        const stats = await getDashboardStats();
        if (stats) {
            updateDashboardFromCloud(stats);
        }
    }
}

// Update dashboard from cloud data
function updateDashboardFromCloud(stats) {
    const totalTestsEl = getEl('totalTests');
    const avgProteinEl = getEl('avgProtein');
    const avgMoistureEl = getEl('avgMoisture');
    const qualityScoreEl = getEl('qualityScore');
    const goodCountEl = getEl('goodCount');
    const unsafeCountEl = getEl('unsafeCount');

    if (totalTestsEl) totalTestsEl.textContent = stats.total_tests || 0;
    if (avgProteinEl) avgProteinEl.textContent = (stats.averages?.protein || 0) + '%';
    if (avgMoistureEl) avgMoistureEl.textContent = (stats.averages?.moisture || 0) + '%';
    if (qualityScoreEl) qualityScoreEl.textContent = (stats.averages?.score || 0) + '%';

    const dist = stats.quality_distribution || {};
    if (goodCountEl) goodCountEl.textContent = dist.Good || 0;
    if (unsafeCountEl) unsafeCountEl.textContent = (dist.Poor || 0) + (dist.Unsafe || 0);

    if (stats.recent_tests && stats.recent_tests.length > 0) {
        const container = getEl('recentTests');
        if (container) {
            container.innerHTML = stats.recent_tests.map(test => `
                <div class="recent-test-item">
                    <span class="test-id">${test.sample_id}</span>
                    <span>💧 ${test.moisture}% | 🔬 ${test.protein}%</span>
                    <span class="test-quality status status-${test.quality_label.toLowerCase()}">
                        ${test.quality_label}
                    </span>
                    <span style="font-size:0.75rem;color:#888;">
                        ${new Date(test.timestamp).toLocaleTimeString()}
                    </span>
                    <span style="font-size:0.7rem;color:#4caf50;">☁️</span>
                </div>
            `).join('');
        }
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
        syncStatus.innerHTML = '☁️ Cloud Sync Active';
        syncStatus.style.color = '#4caf50';
    }
}

// Check if user is logged in on page load
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (token && user) {
        updateUIForLoggedInUser(user);
        console.log('✅ User already logged in:', user.username);
        loadUserTests();
    } else {
        const syncStatus = getEl('syncStatus');
        if (syncStatus) {
            syncStatus.innerHTML = '💻 Local Mode - Login to sync';
            syncStatus.style.color = '#ff9800';
        }
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
    
    await loginUser(username, password);
    closeLoginModal();
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
    
    await registerUser(username, email, password, fullName);
    closeRegisterModal();
}

// ============================================
// WEBSOCKET CONNECTION (REAL-TIME UPDATES)
// ============================================

let socket = null;
if (typeof io === 'function') {
    socket = io('http://localhost:5000');

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
            aflatoxin: 0,
            energy: 0,
            contamination: 'None',
            quality: 'Unknown'
        };
        this.testHistory = [];
        this.totalTests = 0;
        this.qualityStats = {
            Good: 0,
            Moderate: 0,
            Poor: 0,
            Unsafe: 0
        };
        this.chart = null;
    }

    generateSensorData() {
        const randomNormal = (mean, std) => {
            let u = 0, v = 0;
            while (u === 0) u = Math.random();
            while (v === 0) v = Math.random();
            return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        };

        const moisture = Math.max(0, Math.min(75, randomNormal(15, 10)));
        const protein = Math.max(0, Math.min(30, randomNormal(18, 6)));
        const fiber = Math.max(0, Math.min(30, randomNormal(15, 5)));
        const ph = Math.max(3.5, Math.min(8.0, randomNormal(6.0, 1.0)));
        const temperature = Math.max(20, Math.min(40, randomNormal(30, 5)));
        const aflatoxin = Math.max(0, Math.min(50, randomNormal(5, 10)));
        const energy = Math.max(8, Math.min(15, randomNormal(11.5, 1.5)));

        let contamination = 'None';
        if (aflatoxin > 20) contamination = 'Aflatoxin Detected';
        else if (moisture > 20 && ph < 4.5) contamination = 'Mold Risk';
        else if (ph < 3.8) contamination = 'Spoilage Detected';

        const qualityData = this.calculateQuality(
            moisture, protein, fiber, ph, aflatoxin, energy
        );

        return {
            moisture: Math.round(moisture * 10) / 10,
            protein: Math.round(protein * 10) / 10,
            fiber: Math.round(fiber * 10) / 10,
            ph: Math.round(ph * 10) / 10,
            temperature: Math.round(temperature * 10) / 10,
            aflatoxin: Math.round(aflatoxin * 10) / 10,
            energy: Math.round(energy * 100) / 100,
            contamination: contamination,
            quality: qualityData.quality,
            score: qualityData.score,
            details: qualityData.details,
            timestamp: new Date().toISOString()
        };
    }

    calculateQuality(moisture, protein, fiber, ph, aflatoxin, energy) {
        let score = 0;
        const details = {};

        if (moisture >= 10 && moisture <= 15) {
            score += 25;
            details.moisture = '✅ Optimal';
        } else if (moisture > 15 && moisture <= 20) {
            score += 15;
            details.moisture = '⚠️ High';
        } else if (moisture < 10) {
            score += 10;
            details.moisture = '⚠️ Low';
        } else {
            score += 5;
            details.moisture = '❌ Very High';
        }

        if (protein >= 18 && protein <= 22) {
            score += 25;
            details.protein = '✅ Optimal';
        } else if (protein >= 15 && protein < 18) {
            score += 15;
            details.protein = '⚠️ Below Optimal';
        } else if (protein > 22) {
            score += 15;
            details.protein = '⚠️ Above Optimal';
        } else {
            score += 5;
            details.protein = '❌ Deficient';
        }

        if (fiber >= 15 && fiber <= 18) {
            score += 15;
            details.fiber = '✅ Optimal';
        } else if (fiber >= 12 && fiber < 15) {
            score += 10;
            details.fiber = '⚠️ Low';
        } else if (fiber > 18 && fiber <= 22) {
            score += 10;
            details.fiber = '⚠️ High';
        } else {
            score += 5;
            details.fiber = '❌ Poor';
        }

        if (ph >= 5.5 && ph <= 7.5) {
            score += 20;
            details.ph = '✅ Optimal';
        } else if (ph >= 4.5 && ph < 5.5) {
            score += 12;
            details.ph = '⚠️ Slightly Acidic';
        } else if (ph >= 3.8 && ph < 4.5) {
            score += 12;
            details.ph = '⚠️ Acidic (Silage OK)';
        } else {
            score += 5;
            details.ph = '❌ Unsuitable';
        }

        if (aflatoxin < 10) {
            score += 15;
            details.aflatoxin = '✅ Safe';
        } else if (aflatoxin < 20) {
            score += 8;
            details.aflatoxin = '⚠️ Monitor';
        } else {
            score += 0;
            details.aflatoxin = '❌ Unsafe';
        }

        let quality;
        if (score >= 80) quality = 'Good';
        else if (score >= 60) quality = 'Moderate';
        else if (score >= 40) quality = 'Poor';
        else quality = 'Unsafe';

        return {
            quality: quality,
            score: Math.round(score),
            details: details
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
        
        console.log('📡 Virtual Sensor Simulation Started!');
        return this.simulationInterval;
    }

    stopSimulation() {
        this.isSimulating = false;
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
        console.log('📡 Virtual Sensor Simulation Stopped.');
    }

    getSingleReading() {
        return this.generateSensorData();
    }

    addTestToHistory(data) {
        this.totalTests++;
        this.qualityStats[data.quality] = (this.qualityStats[data.quality] || 0) + 1;
        this.testHistory.unshift({
            id: `TEST-${String(this.totalTests).padStart(4, '0')}`,
            ...data,
            index: this.totalTests
        });
        if (this.testHistory.length > 100) {
            this.testHistory.pop();
        }
        this.updateDashboard();
        this.updateChart();
        this.updateRecentTests();
    }

    updateDashboard() {
        const totalTests = document.getElementById('totalTests');
        const avgProtein = document.getElementById('avgProtein');
        const avgMoisture = document.getElementById('avgMoisture');
        const qualityScore = document.getElementById('qualityScore');
        const goodCount = document.getElementById('goodCount');
        const unsafeCount = document.getElementById('unsafeCount');

        if (totalTests) totalTests.textContent = this.totalTests;

        if (this.testHistory.length > 0) {
            const avgP = this.testHistory.reduce((sum, t) => sum + t.protein, 0) / this.testHistory.length;
            const avgM = this.testHistory.reduce((sum, t) => sum + t.moisture, 0) / this.testHistory.length;
            if (avgProtein) avgProtein.textContent = avgP.toFixed(1) + '%';
            if (avgMoisture) avgMoisture.textContent = avgM.toFixed(1) + '%';
        }

        if (qualityScore) {
            const latest = this.testHistory[0];
            if (latest) {
                qualityScore.textContent = latest.score + '%';
            }
        }

        if (goodCount) goodCount.textContent = this.qualityStats.Good || 0;
        if (unsafeCount) unsafeCount.textContent = this.qualityStats.Unsafe || 0;
    }

    updateChart() {
        if (!this.chart) return;
        const data = this.chart.data;
        data.datasets[0].data = [
            this.qualityStats.Good || 0,
            this.qualityStats.Moderate || 0,
            this.qualityStats.Poor || 0,
            this.qualityStats.Unsafe || 0
        ];
        this.chart.update();
    }

    updateRecentTests() {
        const container = document.getElementById('recentTests');
        if (!container) return;

        if (this.testHistory.length === 0) {
            container.innerHTML = '<p class="text-muted">No tests conducted yet. Start testing!</p>';
            return;
        }

        const latest = this.testHistory.slice(0, 10);
        container.innerHTML = latest.map(test => `
            <div class="recent-test-item">
                <span class="test-id">${test.id}</span>
                <span>💧 ${test.moisture}% | 🔬 ${test.protein}%</span>
                <span class="test-quality status status-${test.quality.toLowerCase()}">
                    ${test.quality}
                </span>
                <span style="font-size:0.75rem;color:#888;">
                    ${new Date(test.timestamp).toLocaleTimeString()}
                </span>
            </div>
        `).join('');
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
                    backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#9e9e9e'],
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
async function autoFillWithSensorData() {
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

    updateSensorStatus(data);
    
    const btn = document.querySelector('[onclick="autoFillWithSensorData()"]');
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
        const response = await fetch('http://localhost:5000/health');
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
    const safeRawValue = typeof rawValue === 'string' ? rawValue.trim() : '';
    let payload = {};
    let isJsonPayload = false;

    if (safeRawValue) {
        try {
            const parsed = JSON.parse(safeRawValue);
            if (parsed && typeof parsed === 'object') {
                payload = parsed;
                isJsonPayload = true;
            }
        } catch {
            payload = {};
        }
    }

    const reading = sensorSim.getSingleReading();
    const value = (keys, fallback) => {
        for (const key of keys) {
            const number = Number(payload[key]);
            if (Number.isFinite(number)) return number;
        }
        return fallback;
    };

    const measurementKeys = [
        'moisture', 'moisture_percent', 'protein', 'crude_protein', 'protein_percent',
        'fiber', 'fiber_percent', 'energy', 'energy_value', 'ph', 'pH'
    ];
    const hasMeasurements = measurementKeys.some(key => Object.prototype.hasOwnProperty.call(payload, key));

    return {
        rawValue: safeRawValue,
        isJsonPayload,
        hasMeasurements,
        isDemoData: !hasMeasurements,
        formData: {
            sampleId: payload.sampleId || payload.sample_id || 'QR-' + Date.now().toString().slice(-6),
            feedType: payload.feedType || payload.feed_type || 'cattle',
            moisture: value(['moisture', 'moisture_percent'], reading.moisture),
            protein: value(['protein', 'crude_protein', 'protein_percent'], reading.protein),
            fiber: value(['fiber', 'fiber_percent'], reading.fiber),
            energy: value(['energy', 'energy_value'], reading.energy),
            ph: value(['ph', 'pH'], reading.ph)
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

// Updated form submission with backend integration
const _testForm = getEl('testForm');
if (_testForm) {
    _testForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        sampleId: document.getElementById('sampleId').value || 'AUTO-' + Date.now().toString().slice(-6),
        feedType: document.getElementById('feedType').value || 'cattle',
        moisture: parseFloat(document.getElementById('moisture').value) || 0,
        protein: parseFloat(document.getElementById('protein').value) || 0,
        fiber: parseFloat(document.getElementById('fiber').value) || 0,
        energy: parseFloat(document.getElementById('energy').value) || 0,
        ph: parseFloat(document.getElementById('ph').value) || 7.0,
        fermentation: document.getElementById('fermentation').value || 'good'
    };
    
    if (!formData.moisture || !formData.protein) {
        alert('⚠️ Please fill in moisture and protein values. Click "Auto-Fill" for simulated data.');
        return;
    }
    
    const result = analyzeFeed(formData);
    displayResults(formData, result);
    
    // Send to backend if logged in
    const token = localStorage.getItem('authToken');
    let cloudSaved = false;
    let qrData = null;
    
    if (token) {
        const backendResult = await sendTestToBackend({
            moisture: formData.moisture,
            protein: formData.protein,
            fiber: formData.fiber,
            ph: formData.ph,
            energy: formData.energy,
            feed_type: formData.feedType,
            aflatoxin: result.aflatoxin || 0,
            contamination: result.contamination || 'None'
        });
        
        if (backendResult) {
            cloudSaved = true;
            qrData = backendResult.qr_code || null;
            console.log('✅ Test saved to cloud!');
            
            // Display QR code if available
            if (qrData) {
                displayQRCode(qrData);
            }
        }
    }
    
    // Add cloud badge if saved
    const advisoryBox = document.getElementById('advisoryBox');
    const existingBadge = advisoryBox.querySelector('.cloud-badge');
    if (existingBadge) existingBadge.remove();
    
    const badge = document.createElement('div');
    badge.className = 'cloud-badge';
    badge.style.cssText = `
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        margin-top: 10px;
        display: inline-block;
        ${cloudSaved ? 'background: #4caf50; color: white;' : 'background: #ff9800; color: white;'}
    `;
    badge.innerHTML = cloudSaved ? '☁️ Saved to Cloud' : '💻 Saved Locally - Login to sync';
    advisoryBox.appendChild(badge);
    
    sensorSim.addTestToHistory({
        moisture: formData.moisture,
        protein: formData.protein,
        fiber: formData.fiber,
        ph: formData.ph,
        energy: formData.energy,
        temperature: 30,
        aflatoxin: result.aflatoxin || 0,
        quality: result.quality,
        score: result.score,
        contamination: result.contamination || 'None'
    });
    
    const resultsEl = getEl('testResults');
    if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// ============================================
// FEED ANALYSIS ENGINE
// ============================================

function analyzeFeed(data) {
    const moisture = data.moisture;
    const protein = data.protein;
    const fiber = data.fiber;
    const ph = data.ph || 7.0;
    const energy = data.energy || 11.5;
    
    let score = 0;
    let issues = [];
    let recommendations = [];
    let contamination = 'None';
    let aflatoxin = Math.random() * 8;
    
    if (moisture >= 10 && moisture <= 15) {
        score += 25;
    } else if (moisture > 15 && moisture <= 20) {
        score += 15;
        issues.push('Moisture is high. Risk of mold growth.');
        recommendations.push('Dry feed to 10-15% moisture.');
    } else if (moisture < 10) {
        score += 10;
        issues.push('Feed is too dry. Reduced palatability.');
        recommendations.push('Add moisture gradually.');
    } else {
        score += 5;
        issues.push('Moisture dangerously high. Immediate action needed.');
        recommendations.push('Stop feeding. Dry immediately or discard.');
        contamination = 'Mold Risk';
    }
    
    if (protein >= 18 && protein <= 22) {
        score += 25;
    } else if (protein >= 15 && protein < 18) {
        score += 15;
        issues.push('Protein below optimal level.');
        recommendations.push('Supplement with protein-rich feed.');
    } else if (protein > 22) {
        score += 15;
        issues.push('Protein above optimal. Monitor animal health.');
        recommendations.push('Reduce protein supplementation.');
    } else {
        score += 5;
        issues.push('Protein deficient. Critical for milk production.');
        recommendations.push('Immediate protein supplementation needed.');
    }
    
    if (fiber >= 15 && fiber <= 18) {
        score += 15;
    } else if (fiber >= 12 && fiber < 15) {
        score += 10;
        issues.push('Fiber slightly low. May affect rumen health.');
        recommendations.push('Add roughage (hay, straw).');
    } else if (fiber > 18 && fiber <= 22) {
        score += 10;
        issues.push('Fiber high. May reduce digestibility.');
        recommendations.push('Balance with concentrate feed.');
    } else {
        score += 5;
        issues.push('Fiber imbalance. Rumen health at risk.');
        recommendations.push('Consult nutritionist for feed formulation.');
    }
    
    if (ph >= 5.5 && ph <= 7.5) {
        score += 20;
    } else if (ph >= 4.5 && ph < 5.5) {
        score += 12;
        issues.push('pH is slightly acidic.');
        recommendations.push('Monitor for spoilage. Use within 2-3 days.');
    } else if (ph >= 3.8 && ph < 4.5) {
        score += 12;
    } else {
        score += 5;
        issues.push('pH imbalance. Spoilage risk.');
        recommendations.push('Discard if spoilage signs present.');
        contamination = 'Spoilage Detected';
    }
    
    if (aflatoxin > 20) {
        contamination = 'Aflatoxin Detected';
        issues.push('Aflatoxin contamination detected!');
        recommendations.push('DO NOT feed to animals. Discard immediately.');
        score = Math.min(score, 20);
    }
    
    let quality;
    if (score >= 80) quality = 'Good';
    else if (score >= 60) quality = 'Moderate';
    else if (score >= 40) quality = 'Poor';
    else quality = 'Unsafe';
    
    let advisory = '';
    if (quality === 'Good') {
        advisory = '✅ Feed quality is excellent! Continue current feeding regimen. Maintain regular monitoring for consistent quality.';
    } else if (quality === 'Moderate') {
        advisory = '⚠️ Feed quality is moderate. ' + issues.slice(0, 2).join(' ') + ' ' + recommendations.slice(0, 2).join(' ');
    } else if (quality === 'Poor') {
        advisory = '❌ Feed quality is poor. ' + issues.slice(0, 3).join(' ') + ' ' + recommendations.slice(0, 3).join(' ');
    } else {
        advisory = '🚨 UNSAFE - DO NOT FEED TO ANIMALS! ' + issues.join(' ') + ' ' + recommendations.join(' ');
    }
    
    return {
        quality: quality,
        score: Math.round(score),
        issues: issues,
        recommendations: recommendations,
        advisory: advisory,
        contamination: contamination,
        aflatoxin: Math.round(aflatoxin * 10) / 10
    };
}

// ============================================
// DISPLAY RESULTS
// ============================================

function displayResults(formData, result) {
    const resultsDiv = document.getElementById('testResults');
    const contentDiv = document.getElementById('resultsContent');
    const advisoryP = document.getElementById('advisoryText');
    const timestampSpan = document.getElementById('resultTimestamp');
    
    resultsDiv.style.display = 'block';
    timestampSpan.textContent = new Date().toLocaleString();
    
    // Get quality label translation
    const qualityLabel = t('quality_' + result.quality.toLowerCase());
    
    contentDiv.innerHTML = `
        <div class="result-item">
            <strong><i class="fas fa-tag"></i> ${t('sample_id')}</strong>
            <span>${formData.sampleId}</span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-list"></i> ${t('feed_type')}</strong>
            <span>${t('feed_' + formData.feedType) || formData.feedType}</span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-water"></i> ${t('moisture')}</strong>
            <span>${formData.moisture}% <span class="status status-${formData.moisture >= 10 && formData.moisture <= 15 ? 'good' : formData.moisture > 20 ? 'danger' : 'warning'}">${formData.moisture >= 10 && formData.moisture <= 15 ? '✅ Optimal' : formData.moisture > 20 ? '⚠️ High' : '⚠️ Low'}</span></span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-egg"></i> ${t('protein')}</strong>
            <span>${formData.protein}% <span class="status status-${formData.protein >= 18 && formData.protein <= 22 ? 'good' : formData.protein < 15 ? 'danger' : 'warning'}">${formData.protein >= 18 && formData.protein <= 22 ? '✅ Optimal' : formData.protein < 15 ? '❌ Deficient' : '⚠️ Suboptimal'}</span></span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-seedling"></i> ${t('fiber')}</strong>
            <span>${formData.fiber}% <span class="status status-${formData.fiber >= 15 && formData.fiber <= 18 ? 'good' : formData.fiber < 12 || formData.fiber > 22 ? 'danger' : 'warning'}">${formData.fiber >= 15 && formData.fiber <= 18 ? '✅ Optimal' : formData.fiber < 12 ? '❌ Low' : formData.fiber > 22 ? '⚠️ High' : '⚠️ Suboptimal'}</span></span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-bolt"></i> ${t('energy')}</strong>
            <span>${formData.energy} MJ/kg</span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-vial"></i> ${t('ph')}</strong>
            <span>${formData.ph} <span class="status status-${formData.ph >= 5.5 && formData.ph <= 7.5 ? 'good' : formData.ph < 4.5 ? 'danger' : 'warning'}">${formData.ph >= 5.5 && formData.ph <= 7.5 ? '✅ Good' : formData.ph < 4.5 ? '⚠️ Acidic' : '⚠️ Slightly Off'}</span></span>
        </div>
        <div class="result-item">
            <strong><i class="fas fa-biohazard"></i> ${t('contamination')}</strong>
            <span class="status status-${result.contamination !== 'None' ? 'danger' : 'good'}">${result.contamination}</span>
        </div>
        <div class="result-item" style="border-top:2px solid #e8e8e8;margin-top:10px;padding-top:15px;">
            <strong><i class="fas fa-star"></i> ${t('quality_score')}</strong>
            <span style="font-size:1.2rem;font-weight:700;color:${result.score >= 80 ? '#4caf50' : result.score >= 60 ? '#ff9800' : '#f44336'}">${result.score}/100</span>
        </div>
        <div class="result-item" style="border-bottom:none;">
            <strong><i class="fas fa-check-circle"></i> ${t('overall_quality')}</strong>
            <span class="status status-${result.quality.toLowerCase()}" style="font-size:1rem;padding:5px 20px;">${qualityLabel}</span>
        </div>
    `;
    
    advisoryP.textContent = result.advisory;
    resultsDiv.style.animation = 'none';
    setTimeout(() => {
        resultsDiv.style.animation = 'fadeInUp 0.5s ease';
    }, 10);
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

document.getElementById('navToggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('open');
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
    console.log('🚀 SmartFeed AI System Initialized');
    console.log('📡 Virtual Sensor Simulator Active');
    console.log('🧠 AI Quality Prediction Engine Ready');
    console.log('🌐 Multi-Language Support Active');
    console.log('☁️ Cloud Sync: ' + (localStorage.getItem('authToken') ? 'Enabled' : 'Disabled'));
    
    sensorSim.initChart();
    
    sensorSim.startSimulation((data) => {
        updateSensorStatus(data);
        const connEl = getEl('connectionStatus');
        if (connEl) {
            connEl.textContent = '● Online';
            connEl.style.color = '#4caf50';
        }
    }, 3000);
    
    setTimeout(() => {
        const demoData = sensorSim.generateSensorData();
        sensorSim.addTestToHistory(demoData);
        sensorSim.updateDashboard();
        sensorSim.updateChart();
        sensorSim.updateRecentTests();
    }, 1000);
    
    const connElInit = getEl('connectionStatus');
    if (connElInit) {
        connElInit.textContent = '● Connecting...';
        connElInit.style.color = '#ff9800';
    }
    
    // Check backend
    setTimeout(async () => {
        try {
            const response = await fetch('http://localhost:5000/health');
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
    }

    const qrScanBtn = getEl('qrScanBtn');
    const qrUploadBtn = getEl('qrUploadBtn');
    const qrUpload = getEl('qrUpload');
    const imageTakePhotoBtn = getEl('imageTakePhotoBtn');
    const imageUploadBtn = getEl('imageUploadBtn');
    const imageUpload = getEl('imageUpload');
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

    const cardIds = ['inputCardImage','inputCardDetails','inputCardQR','inputCardHardware'];
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
                showToast('✅ Image selected: ' + file.name);
            }
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

            if (selected.includes('image')) {
                const imageFile = imageUpload && imageUpload.files ? imageUpload.files[0] : null;
                if (!imageFile) {
                    alert('Please choose a feed or silage image first.');
                    return;
                }

                const imageEstimate = sensorSim.getSingleReading();
                const formData = {
                    sampleId: 'IMAGE-' + Date.now().toString().slice(-6),
                    feedType: 'cattle',
                    moisture: imageEstimate.moisture,
                    protein: imageEstimate.protein,
                    fiber: imageEstimate.fiber,
                    energy: imageEstimate.energy,
                    ph: imageEstimate.ph,
                    source: 'Image upload (demo estimate)'
                };
                const result = analyzeFeed(formData);
                displayResults(formData, result);
                showToast('✅ Image analyzed. Demo estimates are shown in the results.');

                const resultsContent = getEl('resultsContent');
                if (resultsContent) {
                    resultsContent.insertAdjacentHTML('afterbegin', `
                        <div style="margin-bottom:12px; color:var(--text-muted);">
                            <strong>Source:</strong> ${imageFile.name}<br>
                            <small>These are simulated estimates for this demo. A calibrated camera/NIR model is required for measured protein and nutrient values.</small>
                        </div>
                    `);
                }
                const resultsEl = getEl('testResults');
                if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }

            if (selected.includes('qr')) {
                if (!scannedQRValue) {
                    alert('Please scan or upload a QR code first.');
                    return;
                }

                const qrAnalysis = createQRAnalysis(scannedQRValue);
                const detailsForm = {
                    sampleId: document.getElementById('sampleId')?.value || '',
                    feedType: document.getElementById('feedType')?.value || '',
                    moisture: parseFloat(document.getElementById('moisture')?.value || '0') || 0,
                    protein: parseFloat(document.getElementById('protein')?.value || '0') || 0,
                    fiber: parseFloat(document.getElementById('fiber')?.value || '0') || 0,
                    energy: parseFloat(document.getElementById('energy')?.value || '0') || 0,
                    ph: parseFloat(document.getElementById('ph')?.value || '0') || 0
                };

                const hasManualDetails = selected.includes('details') && (
                    detailsForm.sampleId || detailsForm.feedType || detailsForm.moisture || detailsForm.protein ||
                    detailsForm.fiber || detailsForm.energy || detailsForm.ph
                );

                const formData = hasManualDetails
                    ? {
                        ...qrAnalysis.formData,
                        ...Object.fromEntries(Object.entries(detailsForm).filter(([, value]) => value !== '' && value !== null && value !== undefined && !(typeof value === 'number' && Number.isNaN(value)))),
                    }
                    : qrAnalysis.formData;

                formData.sampleId = formData.sampleId || qrAnalysis.formData.sampleId;
                formData.feedType = formData.feedType || qrAnalysis.formData.feedType;

                const result = analyzeFeed(formData);
                displayResults(formData, result);
                showToast(qrAnalysis.hasMeasurements ? '✅ QR code analyzed.' : '⚠️ QR decoded, but it did not contain feed measurement data; demo estimates are shown.');

                const resultsContent = getEl('resultsContent');
                if (resultsContent) {
                    const sourceText = qrAnalysis.hasMeasurements
                        ? 'Measurements loaded from QR data.'
                        : 'QR code decoded successfully, but it did not contain feed measurement data. Simulated/demo values are shown for this project.';
                    resultsContent.insertAdjacentHTML('afterbegin', `<div style="margin-bottom:12px; color:var(--text-muted);"><strong>Source:</strong> QR Code<br><small>${sourceText}</small></div>`);
                }
                const resultsEl = getEl('testResults');
                if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                    <div style="margin-top:12px; color:var(--text-muted);">Note: Analysis will use only the selected inputs. Actual AI/QR/Hardware processing is not performed in this demo.</div>
                `;
            }
        });
    }
    
    setInterval(() => {
        const statTime = document.getElementById('statTime');
        if (statTime) {
            statTime.textContent = Math.floor(Math.random() * 3 + 3);
        }
    }, 30000);
});

console.log('✅ SmartFeed Loaded Successfully!');