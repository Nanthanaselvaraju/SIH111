(() => {
    const localKey = 'diarylens.farmRecords.v1';
    const localeByLanguage = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', mr: 'mr-IN' };
    const langByLanguage = { en: 'en', hi: 'hi', ta: 'ta', te: 'te', mr: 'mr' };
    const numericFields = new Set(['storage_days', 'ph', 'moisture_pct', 'temperature_c', 'litres', 'feed_cost', 'other_cost', 'milk_litres', 'milk_price']);
    let records = [];
    let visibleRecords = [];
    let editingMilkId = null;
    let recognition = null;
    let lastAnswer = '';
    let lastIntent = 'default';
    let lastQuestion = '';
    let savedPhotoUrl = '';

    const byId = (id) => document.getElementById(id);
    const translate = (key) => typeof window.t === 'function' ? window.t(key) : key;
    const language = () => Object.hasOwn(localeByLanguage, localStorage.getItem('selectedLanguage')) ? localStorage.getItem('selectedLanguage') : 'en';
    const localized = (key, values) => {
        const languageStrings = {
            local: { en: 'Saved on this device only.', hi: 'केवल इसी डिवाइस पर सहेजा गया।', ta: 'இந்தச் சாதனத்தில் மட்டும் சேமிக்கப்பட்டது.', te: 'ఈ పరికరంలో మాత్రమే సేవ్ చేయబడింది.', mr: 'फक्त या उपकरणावर जतन केले.' },
            account: { en: 'Saved to your local project account.', hi: 'आपके प्रोजेक्ट खाते में सहेजा गया।', ta: 'உங்கள் திட்டக் கணக்கில் சேமிக்கப்பட்டது.', te: 'మీ ప్రాజెక్ట్ ఖాతాలో సేవ్ చేయబడింది.', mr: 'तुमच्या प्रकल्प खात्यात जतन केले.' },
            localFailure: { en: 'Account save unavailable; kept on this device only.', hi: 'खाते में सहेजना उपलब्ध नहीं; केवल इस डिवाइस पर रखा गया।', ta: 'கணக்கில் சேமிக்க முடியவில்லை; இந்தச் சாதனத்தில் மட்டும் வைக்கப்பட்டது.', te: 'ఖాతాలో సేవ్ కాలేదు; ఈ పరికరంలో మాత్రమే ఉంచబడింది.', mr: 'खात्यात जतन झाले नाही; फक्त या उपकरणावर ठेवले.' },
            empty: { en: 'No saved farm records yet.', hi: 'अभी खेत की कोई सहेजी गई प्रविष्टि नहीं है।', ta: 'சேமித்த பண்ணைப் பதிவுகள் இன்னும் இல்லை.', te: 'ఇంకా సేవ్ చేసిన వ్యవసాయ రికార్డులు లేవు.', mr: 'अजून शेत नोंदी जतन केलेल्या नाहीत.' },
            needLogin: { en: 'Sign in to save to your account; otherwise this stays on this device.', hi: 'खाते में सहेजने के लिए साइन इन करें; अन्यथा यह इसी डिवाइस पर रहेगा।', ta: 'கணக்கில் சேமிக்க உள்நுழையவும்; இல்லையெனில் இந்தச் சாதனத்தில் மட்டும் இருக்கும்.', te: 'ఖాతాలో సేవ్ చేయడానికి సైన్ ఇన్ చేయండి; లేకపోతే ఈ పరికరంలోనే ఉంటుంది.', mr: 'खात्यात जतन करण्यासाठी साइन इन करा; अन्यथा हे याच उपकरणावर राहील.' }
        };
        return languageStrings[key]?.[language()] || languageStrings[key]?.en || '';
    };

    function readLocalRecords() {
        try {
            const parsed = JSON.parse(localStorage.getItem(localKey) || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    function writeLocalRecord(type, payload) {
        const localRecords = readLocalRecords();
        const record = {
            record_id: (window.crypto?.randomUUID && window.crypto.randomUUID()) || `local-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            record_type: type,
            payload,
            created_at: new Date().toISOString(),
            storage: 'device'
        };
        localRecords.unshift(record);
        localStorage.setItem(localKey, JSON.stringify(localRecords.slice(0, 250)));
        return record;
    }

    async function saveRecord(type, payload, statusElement) {
        const token = localStorage.getItem('authToken');
        if (token && typeof API_URL !== 'undefined') {
            try {
                const response = await fetch(`${API_URL}/farm-records`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ record_type: type, payload })
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Save failed');
                if (statusElement) statusElement.textContent = localized('account');
                await loadHistory();
                return data.record;
            } catch (error) {
                console.warn('Farm record account save failed:', error);
                writeLocalRecord(type, payload);
                if (statusElement) statusElement.textContent = localized('localFailure');
                await loadHistory(false);
                return null;
            }
        }
        writeLocalRecord(type, payload);
        if (statusElement) statusElement.textContent = localized('local');
        await loadHistory(false);
        return null;
    }

    function formValues(form) {
        const values = {};
        for (const [key, value] of new FormData(form).entries()) {
            const input = form.elements.namedItem(key);
            if (input instanceof HTMLInputElement && input.type === 'checkbox') {
                values[key] = input.checked;
            } else if (numericFields.has(key)) {
                values[key] = value === '' ? null : Number(value);
            } else {
                values[key] = String(value).trim();
            }
        }
        form.querySelectorAll('input[type="checkbox"]').forEach((input) => { values[input.name] = input.checked; });
        return values;
    }

    function appendMessage(kind, text) {
        const messages = byId('assistantMessages');
        if (!messages) return;
        const bubble = document.createElement('p');
        bubble.className = `assistant-message assistant-message-${kind}`;
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    function getIntent(text) {
        const value = String(text || '').toLowerCase();
        const words = {
            feed: ['feed', 'protein', 'fibre', 'fiber', 'மெதுவ', 'தீவன', 'చారా', 'మేత', 'चारा', 'चाऱ्य', 'प्रोटीन', 'प्रथिन'],
            silage: ['silage', 'spoil', 'mould', 'mold', 'சைலேஜ', 'பூஞ்சை', 'సైలేజ్', 'బూజు', 'साइलेज', 'फफूँद', 'सायलेज', 'बुरशी'],
            milk: ['yield', 'milk', 'trend', 'பால்', 'லிட்டர்', 'పాలు', 'లీటర్', 'दूध', 'लीटर', 'उत्पादन'],
            cost: ['cost', 'price', 'expense', 'profit', 'செலவு', 'விலை', 'ఖర్చు', 'ధర', 'खर्च', 'किंमत', 'नफा']
        };
        for (const [intent, keywords] of Object.entries(words)) {
            if (keywords.some((keyword) => value.includes(keyword))) return intent;
        }
        return 'default';
    }

    async function answerFor(intent) {
        const key = `assistant_answer_${intent}`;
        const answer = translate(key);
        const response = answer === key ? translate('assistant_answer_default') : answer;
        const token = localStorage.getItem('authToken');
        if (intent === 'feed' && token && typeof getTestsFromBackend === 'function') {
            try {
                const tests = await getTestsFromBackend();
                const latest = tests?.[0];
                if (latest) {
                    const qualityKey = `quality_${String(latest.quality_label || '').toLowerCase()}`;
                    const quality = translate(qualityKey) === qualityKey ? latest.quality_label : translate(qualityKey);
                    return `${response} ${translate('assistant_latest_feed')} ${latest.sample_id}: ${quality}, ${latest.quality_score}/100. This is a prototype model output, not a safety determination.`;
                }
            } catch (error) {
                console.warn('Assistant could not load saved feed results:', error);
            }
        }

        const recentTypes = {
            silage: ['silage_observation'],
            milk: ['milk_yield'],
            cost: ['cost_entry']
        }[intent] || [];
        const latest = records.find((record) => recentTypes.includes(record.record_type));
        if (!latest) return response;
        if (intent === 'silage') {
            const signs = ['mould', 'unusual_smell', 'colour_change', 'texture_change', 'air_exposure', 'water_entry'].filter((keyName) => latest.payload[keyName]);
            return `${response} ${translate('assistant_latest_silage')} ${latest.payload.sample_id || latest.payload.date || ''}; recorded warning observations: ${signs.length}. This does not confirm spoilage or toxins.`;
        }
        if (intent === 'milk') {
            return `${response} ${translate('assistant_latest_milk')} ${latest.payload.date || ''}, ${latest.payload.litres} L${latest.payload.animal_id ? ` (${latest.payload.animal_id})` : ''}.`;
        }
        const expenses = Number(latest.payload.feed_cost) + Number(latest.payload.other_cost);
        const revenue = Number(latest.payload.milk_litres) * Number(latest.payload.milk_price);
        return `${response} ${translate('assistant_latest_cost')} ${latest.payload.date || ''}; recorded expenses ₹${expenses.toFixed(2)}, revenue ₹${revenue.toFixed(2)}, estimated result ₹${(revenue - expenses).toFixed(2)}.`;
    }

    function supportedVoice() {
        if (!('speechSynthesis' in window)) return null;
        const code = language();
        const voices = window.speechSynthesis.getVoices();
        return voices.find((voice) => voice.lang.toLowerCase() === localeByLanguage[code].toLowerCase()) ||
            voices.find((voice) => voice.lang.toLowerCase().startsWith(`${langByLanguage[code]}-`)) || null;
    }

    function speakAnswer() {
        if (!lastAnswer) return;
        if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) {
            setVoiceStatus(translate('assistant_no_voice'));
            return;
        }
        const voice = supportedVoice();
        if (!voice) {
            setVoiceStatus(translate('assistant_no_voice'));
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(lastAnswer);
        utterance.lang = localeByLanguage[language()];
        utterance.voice = voice;
        utterance.onstart = () => {
            setVoiceStatus(translate('assistant_speaking'));
            byId('assistantStop').disabled = false;
        };
        utterance.onend = () => {
            byId('assistantStop').disabled = true;
            setVoiceStatus(translate('assistant_ready'));
        };
        utterance.onerror = () => {
            byId('assistantStop').disabled = true;
            setVoiceStatus(translate('assistant_no_voice'));
        };
        window.speechSynthesis.speak(utterance);
    }

    async function submitQuestion(text, speak = false) {
        const question = String(text || '').trim();
        if (!question) return;
        lastQuestion = question;
        lastIntent = getIntent(question);
        appendMessage('user', question);
        setVoiceStatus(translate('assistant_processing'));
        lastAnswer = await answerFor(lastIntent);
        appendMessage('assistant', lastAnswer);
        byId('assistantSpeakLast').disabled = false;
        setVoiceStatus(translate('assistant_ready'));
        if (speak) speakAnswer();
    }

    function setVoiceStatus(message) {
        const status = byId('assistantVoiceStatus');
        if (status) status.textContent = message;
    }

    function updateVoiceAvailability() {
        if (!byId('assistantListen')) return;
        const recognitionSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
        byId('assistantListen').disabled = !recognitionSupported;
        if (!recognitionSupported) {
            setVoiceStatus(translate('assistant_no_recognition'));
        } else if (!supportedVoice()) {
            setVoiceStatus(translate('assistant_no_voice'));
        } else {
            setVoiceStatus(translate('assistant_ready'));
        }
    }

    function startListening() {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) {
            setVoiceStatus(translate('assistant_no_recognition'));
            return;
        }
        if (recognition) recognition.abort();
        recognition = new Recognition();
        recognition.lang = localeByLanguage[language()] || localeByLanguage.en;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onstart = () => setVoiceStatus(translate('assistant_listening'));
        recognition.onresult = (event) => {
            const transcript = event.results?.[0]?.[0]?.transcript || '';
            if (byId('assistantInput')) byId('assistantInput').value = transcript;
            submitQuestion(transcript, true);
        };
        recognition.onerror = (event) => {
            setVoiceStatus(event.error === 'not-allowed' || event.error === 'service-not-allowed'
                ? translate('assistant_mic_denied')
                : translate('assistant_start_failed'));
        };
        recognition.onend = () => {
            if (byId('assistantVoiceStatus')?.textContent === translate('assistant_listening')) {
                setVoiceStatus(translate('assistant_ready'));
            }
        };
        try {
            recognition.start();
        } catch (error) {
            setVoiceStatus(translate('assistant_start_failed'));
        }
    }

    function summarizeSilage(payload) {
        const flags = ['mould', 'unusual_smell', 'colour_change', 'texture_change', 'air_exposure', 'water_entry'].filter((key) => payload[key]);
        const panel = byId('silageAssessment');
        panel.replaceChildren();
        const heading = document.createElement('strong');
        heading.textContent = flags.length ? 'Warning signs recorded. Isolate affected feed and arrange a closer review.' : 'No listed warning sign was recorded. This is not a safety result.';
        const detail = document.createElement('p');
        detail.textContent = flags.length
            ? `Recorded observations: ${flags.map((key) => key.replaceAll('_', ' ')).join(', ')}. These observations do not confirm toxins or prove spoilage.`
            : 'Continue routine storage checks. Appearance and smell alone cannot confirm feed safety.';
        panel.append(heading, detail);
        panel.hidden = false;
    }

    function summarizeContamination(payload) {
        const panel = byId('contaminationAssessment');
        panel.replaceChildren();
        const heading = document.createElement('strong');
        heading.textContent = 'Concern recorded; chemical contamination or adulteration is not confirmed.';
        const detail = document.createElement('p');
        detail.textContent = ['suspected_toxin', 'suspected_adulteration'].includes(payload.concern)
            ? 'Precaution: isolate this sample and do not feed it until an appropriate laboratory or expert review.'
            : 'Treat this as a screening observation. Use an appropriate confirmatory test when the concern affects feeding decisions.';
        panel.append(heading, detail);
        panel.hidden = false;
    }

    function showMilkTrend(current) {
        const group = String(current.payload.animal_id || '');
        const previous = records.find((record) => record.record_type === 'milk_yield' && String(record.payload.animal_id || '') === group && record.record_id !== current.record_id && record.payload.date < current.payload.date);
        const output = byId('milkTrend');
        if (!previous) {
            output.textContent = 'Baseline: no earlier saved entry for this animal/group. The next dated entry can be compared with this one.';
            return;
        }
        const change = Number(current.payload.litres) - Number(previous.payload.litres);
        const percent = Number(previous.payload.litres) > 0 ? ` (${(change / Number(previous.payload.litres) * 100).toFixed(1)}%)` : '';
        output.textContent = `Compared with previous saved entry (${previous.payload.date}, ${previous.payload.litres} L): ${change >= 0 ? '+' : ''}${change.toFixed(1)} L${percent}. This time trend does not establish cause.`;
    }

    async function updateMilkRecord(recordId, payload, statusElement) {
        const existing = records.find((record) => record.record_id === recordId);
        if (existing?.storage === 'device') {
            const localRecords = readLocalRecords().map((record) => record.record_id === recordId
                ? { ...record, payload, created_at: new Date().toISOString() }
                : record);
            localStorage.setItem(localKey, JSON.stringify(localRecords));
            if (statusElement) statusElement.textContent = localized('local');
            await loadHistory(false);
            return true;
        }
        const token = localStorage.getItem('authToken');
        if (!token || typeof API_URL === 'undefined') {
            if (statusElement) statusElement.textContent = localized('needLogin');
            return false;
        }
        try {
            const response = await fetch(`${API_URL}/farm-records/${encodeURIComponent(recordId)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ payload })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Update failed.');
            if (statusElement) statusElement.textContent = localized('account');
            await loadHistory();
            return true;
        } catch (error) {
            if (statusElement) statusElement.textContent = error.message || 'Could not update this record.';
            return false;
        }
    }

    function renderHistory() {
        const container = byId('farmHistoryList');
        if (!container) return;
        container.replaceChildren();
        const search = byId('historySearch')?.value.trim().toLowerCase() || '';
        const type = byId('historyType')?.value || '';
        const from = byId('historyFrom')?.value || '';
        const to = byId('historyTo')?.value || '';
        const storage = byId('historyStorage')?.value || '';
        visibleRecords = records.filter((record) => {
            const recordDate = String(record.payload.date || record.created_at || '').slice(0, 10);
            const searchText = `${record.payload.sample_id || ''} ${record.payload.animal_id || ''} ${record.record_id}`.toLowerCase();
            return (!search || searchText.includes(search)) && (!type || record.record_type === type) &&
                (!from || recordDate >= from) && (!to || recordDate <= to) && (!storage || record.storage === storage);
        });
        if (!visibleRecords.length) {
            container.textContent = localized('empty');
            return;
        }
        visibleRecords.forEach((record) => {
            const item = document.createElement('article');
            item.className = 'farm-history-item';
            const heading = document.createElement('h3');
            heading.textContent = `${record.record_type.replaceAll('_', ' ')} · ${record.payload.sample_id || record.payload.date || record.record_id.slice(0, 8)}`;
            const summary = document.createElement('p');
            const payload = record.payload;
            const parts = Object.entries(payload).filter(([, value]) => value !== '' && value !== null && typeof value !== 'object').slice(0, 6).map(([key, value]) => `${key.replaceAll('_', ' ')}: ${typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}`);
            summary.textContent = parts.join(' · ');
            const meta = document.createElement('small');
            meta.textContent = `${record.created_at ? new Date(record.created_at).toLocaleString(localeByLanguage[language()] || 'en-IN') : ''} · ${record.storage === 'device' ? 'This device only' : 'Project account'}`;
            item.append(heading, summary, meta);
            if (record.record_type === 'milk_yield') {
                const editButton = document.createElement('button');
                editButton.type = 'button';
                editButton.className = 'btn-secondary history-edit-button';
                editButton.textContent = 'Edit milk entry';
                editButton.addEventListener('click', () => {
                    editingMilkId = record.record_id;
                    const form = byId('milkForm');
                    ['date', 'animal_id', 'litres', 'event_note'].forEach((key) => {
                        const input = form.elements.namedItem(key);
                        if (input) input.value = record.payload[key] ?? '';
                    });
                    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    form.querySelector('[type="submit"]').innerHTML = '<i class="fas fa-floppy-disk"></i> Save edited entry';
                });
                item.appendChild(editButton);
            }
            if (record.storage === 'account') {
                const qrButton = document.createElement('button');
                qrButton.type = 'button';
                qrButton.className = 'btn-secondary history-qr-button';
                qrButton.textContent = 'Show private QR';
                qrButton.addEventListener('click', () => showRecordQr(record, item));
                item.appendChild(qrButton);
            }
            container.appendChild(item);
        });
    }

    async function showRecordQr(record, container) {
        if (container.querySelector('.record-qr-image')) return;
        const token = localStorage.getItem('authToken');
        if (!token) return;
        const button = container.querySelector('.history-qr-button');
        button.disabled = true;
        try {
            const response = await fetch(`${API_URL}/farm-records/${encodeURIComponent(record.record_id)}/qr`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Could not create a QR for this record.');
            const imageUrl = URL.createObjectURL(await response.blob());
            const image = document.createElement('img');
            image.className = 'record-qr-image';
            image.src = imageUrl;
            image.alt = `Private QR for ${record.payload.sample_id || record.record_id}`;
            image.width = 160;
            image.height = 160;
            const download = document.createElement('a');
            download.href = imageUrl;
            download.download = `diarylens-${record.record_id.slice(0, 8)}.png`;
            download.textContent = 'Download QR';
            container.append(image, download);
        } catch (error) {
            button.textContent = error.message;
        } finally {
            button.disabled = false;
        }
    }

    async function loadLinkedRecord() {
        const recordId = new URLSearchParams(window.location.search).get('record_id');
        const detail = byId('linkedRecordDetail');
        if (!recordId || !detail) return;
        const token = localStorage.getItem('authToken');
        detail.hidden = false;
        if (!token) {
            detail.textContent = 'This QR points to a private project record. Sign in on this browser to view it.';
            return;
        }
        try {
            const response = await fetch(`${API_URL}/farm-records/${encodeURIComponent(recordId)}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'This record is unavailable to the signed-in account.');
            detail.replaceChildren();
            const title = document.createElement('h3');
            title.textContent = `Linked record: ${data.record.payload.sample_id || data.record.record_type}`;
            const meta = document.createElement('p');
            meta.textContent = `${data.record.record_type.replaceAll('_', ' ')} · ${new Date(data.record.created_at).toLocaleString(localeByLanguage[language()] || 'en-IN')}`;
            const values = document.createElement('pre');
            values.textContent = JSON.stringify(data.record.payload, null, 2);
            const caution = document.createElement('p');
            caution.textContent = 'This private local-project record contains entered values and observations; it is not laboratory confirmation.';
            const print = document.createElement('button');
            print.type = 'button';
            print.className = 'btn-secondary';
            print.textContent = 'Print linked record';
            print.addEventListener('click', () => {
                document.body.classList.add('print-farm-record');
                window.print();
                window.addEventListener('afterprint', () => document.body.classList.remove('print-farm-record'), { once: true });
            });
            detail.append(title, meta, values, caution, print);
        } catch (error) {
            detail.textContent = error.message;
        }
    }

    async function loadHistory(showStatus = true) {
        const local = readLocalRecords();
        records = [...local];
        const token = localStorage.getItem('authToken');
        const status = byId('farmHistoryStatus');
        if (token && typeof API_URL !== 'undefined') {
            try {
                const response = await fetch(`${API_URL}/farm-records`, { headers: { Authorization: `Bearer ${token}` } });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Could not load account records.');
                records = [...(data.records || []).map((record) => ({ ...record, storage: 'account' })), ...local];
                if (showStatus && status) status.textContent = records.length ? 'Account and device records are shown.' : 'No records in this account yet.';
            } catch (error) {
                if (showStatus && status) status.textContent = `${error.message} ${localized('needLogin')}`;
            }
        } else if (showStatus && status) {
            status.textContent = localized('needLogin');
        }
        records.sort((left, right) => new Date(right.created_at) - new Date(left.created_at));
        renderHistory();
    }

    function exportHistory() {
        const rows = [['record_id', 'record_type', 'created_at', 'payload']];
        visibleRecords.forEach((record) => rows.push([record.record_id, record.record_type, record.created_at, JSON.stringify(record.payload)]));
        const csv = rows.map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        link.download = 'diarylens-farm-records.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function initialize() {
        if (!byId('silageForm')) return;

        const silageForm = byId('silageForm');
        silageForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const payload = formValues(silageForm);
            payload.measurement_source = 'farmer-entered; not independently verified';
            summarizeSilage(payload);
            await saveRecord('silage_observation', payload, byId('silageSaveState'));
        });

        byId('silagePhoto').addEventListener('change', (event) => {
            const file = event.target.files?.[0];
            const preview = byId('silagePhotoPreview');
            if (savedPhotoUrl) URL.revokeObjectURL(savedPhotoUrl);
            if (!file) {
                preview.hidden = true;
                preview.removeAttribute('src');
                return;
            }
            savedPhotoUrl = URL.createObjectURL(file);
            preview.src = savedPhotoUrl;
            preview.hidden = false;
        });

        byId('contaminationForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const payload = formValues(event.currentTarget);
            payload.recorded_as = 'farmer-reported concern; not a confirmed finding';
            summarizeContamination(payload);
            await saveRecord('contamination_review', payload, byId('contaminationSaveState'));
        });

        const today = new Date().toISOString().slice(0, 10);
        ['milkForm', 'costForm'].forEach((id) => { const date = document.querySelector(`#${id} [name="date"]`); if (date) date.value = today; });

        byId('milkForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const payload = formValues(event.currentTarget);
            if (editingMilkId) {
                const updated = await updateMilkRecord(editingMilkId, payload, byId('milkSaveState'));
                if (updated) {
                    editingMilkId = null;
                    event.currentTarget.reset();
                    event.currentTarget.elements.namedItem('date').value = new Date().toISOString().slice(0, 10);
                    event.currentTarget.querySelector('[type="submit"]').innerHTML = `<i class="fas fa-floppy-disk"></i> ${translate('tools_save_yield')}`;
                }
                return;
            }
            const localRecord = { record_id: `pending-${Date.now()}`, record_type: 'milk_yield', payload, created_at: new Date().toISOString() };
            await saveRecord('milk_yield', payload, byId('milkSaveState'));
            showMilkTrend(localRecord);
        });

        byId('costForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const payload = formValues(event.currentTarget);
            const expenses = payload.feed_cost + payload.other_cost;
            const revenue = payload.milk_litres * payload.milk_price;
            byId('costResult').textContent = `Recorded expenses ₹${expenses.toFixed(2)} (feed ₹${payload.feed_cost.toFixed(2)} + other ₹${payload.other_cost.toFixed(2)}); revenue ₹${revenue.toFixed(2)}; cost/litre ${payload.milk_litres > 0 ? `₹${(expenses / payload.milk_litres).toFixed(2)}` : 'not available (0 litres)'}; estimated profit/loss ₹${(revenue - expenses).toFixed(2)}.`;
            await saveRecord('cost_entry', payload, byId('costSaveState'));
        });

        byId('assistantForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const input = byId('assistantInput');
            submitQuestion(input.value);
            input.value = '';
        });
        document.querySelectorAll('[data-assistant-question]').forEach((button) => {
            button.addEventListener('click', () => submitQuestion(translate(`assistant_question_${button.dataset.assistantQuestion}`)));
        });
        byId('assistantListen').addEventListener('click', startListening);
        byId('assistantStop').addEventListener('click', () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            byId('assistantStop').disabled = true;
            setVoiceStatus(translate('assistant_stopped'));
        });
        byId('assistantSpeakLast')?.addEventListener('click', speakAnswer);
        byId('refreshFarmHistory').addEventListener('click', () => loadHistory());
        byId('applyHistoryFilters').addEventListener('click', renderHistory);
        byId('exportFarmHistory').addEventListener('click', exportHistory);
        byId('languageSelect')?.addEventListener('change', () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            if (recognition) recognition.abort();
            lastAnswer = '';
            byId('assistantSpeakLast').disabled = true;
            byId('assistantStop').disabled = true;
            updateVoiceAvailability();
        });
        if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = updateVoiceAvailability;
        updateVoiceAvailability();
        loadHistory();
        loadLinkedRecord();
    }

    document.addEventListener('DOMContentLoaded', initialize);
})();
