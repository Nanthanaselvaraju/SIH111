// ============================================
// SMARTFEED - MULTI-LANGUAGE SUPPORT
// ============================================

const translations = {
    // ============ ENGLISH ============
    en: {
        // Navigation
        'nav_home': 'Home',
        'nav_test': 'Test',
        'nav_dashboard': 'Dashboard',
        'nav_advisory': 'Advisory',
        'nav_about': 'About',
        
        // Hero Section
        'app_title': 'Smart AI-Enabled Rapid Feed and Silage Quality Testing System for Dairy Farmers',
        'app_subtitle': 'Rapid on-field quality assessment for immediate feed-quality decisions.',
        'app_badge': 'AI-Powered • Smart India Hackathon 2026',
        'results_time': 'Results in under 5 minutes!',
        
        // Buttons
        'btn_start_test': 'Start Testing',
        'btn_dashboard': 'View Dashboard',
        'btn_simulate': 'Simulate Sensors',
        'btn_analyze': 'Analyze Sample',
        'btn_auto_fill': 'Fill with simulated demo values',
        'btn_print': 'Print Results',
        'btn_save': 'Save Result',
        'btn_share': 'Share',
        
        // Test Form
        'test_title': 'Feed Quality Testing',
        'sample_id': 'Sample ID',
        'sample_id_placeholder': 'Enter sample ID or leave auto',
        'feed_type': 'Feed Type',
        'moisture': 'Moisture (%)',
        'protein': 'Crude Protein (%)',
        'fiber': 'Fiber Content (%)',
        'energy': 'Energy Value (MJ/kg)',
        'ph': 'pH Level',
        'fermentation': 'Fermentation Quality',
        'select_feed': 'Select feed type',
        
        // Feed Types
        'feed_cattle': 'Cattle Feed Pellet',
        'feed_silage': 'Silage',
        'feed_fodder': 'Green Fodder',
        'feed_concentrate': 'Concentrate Mix',
        'feed_mineral': 'Mineral Mixture',
        
        // Fermentation
        'ferm_excellent': 'Excellent',
        'ferm_good': 'Good',
        'ferm_fair': 'Fair',
        'ferm_poor': 'Poor',
        
        // Results
        'results_title': 'Analysis Results',
        'quality_score': 'Quality Score',
        'overall_quality': 'Overall Quality',
        'contamination': 'Contamination',
        'advisory_title': 'Advisory',
        
        // Quality Labels
        'quality_good': 'Good',
        'quality_moderate': 'Moderate',
        'quality_poor': 'Poor',
        'quality_unsafe': 'Unsafe',
        
        // Dashboard
        'dashboard_title': 'Live Dashboard',
        'key_metrics': 'Key Metrics',
        'total_tests': 'Total Tests',
        'avg_protein': 'Avg Protein',
        'avg_moisture': 'Avg Moisture',
        'quality_score_label': 'Overall Quality',
        'good_quality': 'Good Quality',
        'unsafe_label': 'Unsafe',
        'recent_tests': 'Recent Tests',
        'quality_distribution': 'Quality Distribution',
        
        // Advisory Section
        'advisory_section': 'Feed Advisories',
        'advisory_moisture': 'Moisture Management',
        'advisory_moisture_desc': 'Optimal levels: 10-12% for feed, 40-60% for silage',
        'advisory_protein': 'Protein Requirements',
        'advisory_protein_desc': '18-22% crude protein recommended for lactating cattle',
        'advisory_fiber': 'Fiber Content',
        'advisory_fiber_desc': '15-18% fiber for optimal rumen function',
        'advisory_contamination': 'Contamination Alert',
        'advisory_contamination_desc': 'Regular monitoring for aflatoxins and mycotoxins',
        'advisory_storage': 'Storage Conditions',
        'advisory_storage_desc': 'Store in cool, dry place below 25°C',
        'advisory_feeding': 'Feeding Schedule',
        'advisory_feeding_desc': 'Fresh feed twice daily, check for spoilage',
        
        // Status
        'status_good': 'Good',
        'status_warning': 'Monitor',
        'status_alert': 'Alert',
        
        // Auth
        'login': 'Login',
        'register': 'Register',
        'logout': 'Logout',
        'welcome': 'Welcome',
        'username': 'Username',
        'email': 'Email',
        'password': 'Password',
        'full_name': 'Full Name',
        'cancel': 'Cancel',
        
        // Sensor Status
        'sensor_active': 'Simulated Readings Active',
        'cloud_sync': 'Cloud Sync Active',
        'local_mode': 'Local Mode - Login to sync',
        'online': 'Online',
        'offline': 'Offline',
        
        // About
        'about_title': 'About DiaryLens',
        'about_mission': 'Mission',
        'about_mission_text': 'To help dairy farmers understand feed quality with an AI-based software analysis and clearly labelled simulated demo readings.',
        'about_technology': 'Technology',
        'about_team': 'Team',
        'about_impact': 'Impact',
        
        // Footer
        'footer_tagline': 'AI-Powered Portable Cattle Feed & Silage Quality Intelligence',
        'footer_sih': 'Smart India Hackathon 2026 - SIH26111',
        'footer_quick_links': 'Quick Links',
        'footer_technologies': 'Technologies',
        'footer_contact': 'Contact',
        'footer_rights': 'All rights reserved.',
        'footer_made': 'Made with ❤️ for Indian Dairy Farmers'
    },
    
    // ============ HINDI ============
    hi: {
        'nav_home': 'होम',
        'nav_test': 'परीक्षण',
        'nav_dashboard': 'डैशबोर्ड',
        'nav_advisory': 'सलाह',
        'nav_about': 'हमारे बारे में',
        
        'app_title': 'डेयरी किसानों के लिए स्मार्ट एआई-सक्षम त्वरित चारा और साइलेज गुणवत्ता परीक्षण प्रणाली',
        'app_subtitle': 'तत्काल चारा-गुणवत्ता निर्णयों के लिए त्वरित ऑन-फील्ड गुणवत्ता आकलन।',
        'app_badge': 'एआई-संचालित • स्मार्ट इंडिया हैकाथॉन 2026',
        'results_time': '5 मिनट से भी कम में परिणाम!',
        
        'btn_start_test': 'परीक्षण शुरू करें',
        'btn_dashboard': 'डैशबोर्ड देखें',
        'btn_simulate': 'सेंसर सिम्युलेट करें',
        'btn_analyze': 'नमूना का विश्लेषण करें',
        'btn_auto_fill': 'डेमो मान भरें',
        'btn_print': 'परिणाम प्रिंट करें',
        'btn_save': 'परिणाम सहेजें',
        'btn_share': 'साझा करें',
        
        'test_title': 'चारा गुणवत्ता परीक्षण',
        'sample_id': 'नमूना आईडी',
        'sample_id_placeholder': 'नमूना आईडी दर्ज करें या ऑटो छोड़ें',
        'feed_type': 'चारा प्रकार',
        'moisture': 'नमी (%)',
        'protein': 'क्रूड प्रोटीन (%)',
        'fiber': 'फाइबर सामग्री (%)',
        'energy': 'ऊर्जा मूल्य (MJ/kg)',
        'ph': 'पीएच स्तर',
        'fermentation': 'किण्वन गुणवत्ता',
        'select_feed': 'चारा प्रकार चुनें',
        
        'feed_cattle': 'मवेशी चारा छर्रा',
        'feed_silage': 'साइलेज',
        'feed_fodder': 'हरा चारा',
        'feed_concentrate': 'सांद्र मिश्रण',
        'feed_mineral': 'खनिज मिश्रण',
        
        'ferm_excellent': 'उत्कृष्ट',
        'ferm_good': 'अच्छा',
        'ferm_fair': 'ठीक',
        'ferm_poor': 'खराब',
        
        'results_title': 'विश्लेषण परिणाम',
        'quality_score': 'गुणवत्ता स्कोर',
        'overall_quality': 'समग्र गुणवत्ता',
        'contamination': 'संदूषण',
        'advisory_title': 'सलाह',
        
        'quality_good': 'अच्छा',
        'quality_moderate': 'मध्यम',
        'quality_poor': 'खराब',
        'quality_unsafe': 'असुरक्षित',
        
        'dashboard_title': 'लाइव डैशबोर्ड',
        'key_metrics': 'मुख्य मेट्रिक्स',
        'total_tests': 'कुल परीक्षण',
        'avg_protein': 'औसत प्रोटीन',
        'avg_moisture': 'औसत नमी',
        'quality_score_label': 'समग्र गुणवत्ता',
        'good_quality': 'अच्छी गुणवत्ता',
        'unsafe_label': 'असुरक्षित',
        'recent_tests': 'हाल के परीक्षण',
        'quality_distribution': 'गुणवत्ता वितरण',
        
        'advisory_section': 'चारा सलाह',
        'advisory_moisture': 'नमी प्रबंधन',
        'advisory_moisture_desc': 'इष्टतम स्तर: चारे के लिए 10-12%, साइलेज के लिए 40-60%',
        'advisory_protein': 'प्रोटीन आवश्यकताएं',
        'advisory_protein_desc': 'दूध देने वाली गायों के लिए 18-22% क्रूड प्रोटीन अनुशंसित',
        'advisory_fiber': 'फाइबर सामग्री',
        'advisory_fiber_desc': 'इष्टतम रूमेन कार्य के लिए 15-18% फाइबर',
        'advisory_contamination': 'संदूषण अलर्ट',
        'advisory_contamination_desc': 'एफ्लाटॉक्सिन और मायकोटॉक्सिन की नियमित निगरानी',
        'advisory_storage': 'भंडारण की स्थिति',
        'advisory_storage_desc': '25°C से नीचे ठंडी, सूखी जगह पर स्टोर करें',
        'advisory_feeding': 'खिलाने का कार्यक्रम',
        'advisory_feeding_desc': 'दिन में दो बार ताजा चारा, खराब होने की जांच करें',
        
        'status_good': 'अच्छा',
        'status_warning': 'निगरानी करें',
        'status_alert': 'अलर्ट',
        
        'login': 'लॉगिन',
        'register': 'रजिस्टर',
        'logout': 'लॉगआउट',
        'welcome': 'स्वागत है',
        'username': 'उपयोगकर्ता नाम',
        'email': 'ईमेल',
        'password': 'पासवर्ड',
        'full_name': 'पूरा नाम',
        'cancel': 'रद्द करें',
        
        'sensor_active': 'सिम्युलेटेड डेमो रीडिंग सक्रिय',
        'cloud_sync': 'क्लाउड सिंक सक्रिय',
        'local_mode': 'स्थानीय मोड - सिंक के लिए लॉगिन करें',
        'online': 'ऑनलाइन',
        'offline': 'ऑफलाइन',
        
        'about_title': 'स्मार्टफीड के बारे में',
        'about_mission': 'मिशन',
        'about_mission_text': 'एआई-आधारित सॉफ़्टवेयर विश्लेषण और स्पष्ट रूप से चिह्नित सिम्युलेटेड डेमो रीडिंग से डेयरी किसानों को चारा गुणवत्ता समझने में मदद करना।',
        'about_technology': 'तकनीक',
        'about_team': 'टीम',
        'about_impact': 'प्रभाव',
        
        'footer_tagline': 'एआई-संचालित पोर्टेबल पशु चारा और साइलेज गुणवत्ता बुद्धिमत्ता',
        'footer_sih': 'स्मार्ट इंडिया हैकाथॉन 2026 - SIH26111',
        'footer_quick_links': 'त्वरित लिंक',
        'footer_technologies': 'तकनीकें',
        'footer_contact': 'संपर्क करें',
        'footer_rights': 'सभी अधिकार सुरक्षित।',
        'footer_made': 'भारतीय डेयरी किसानों के लिए ❤️ के साथ बनाया गया'
    },
    
    // ============ TAMIL ============
    ta: {
        'nav_home': 'முகப்பு',
        'nav_test': 'சோதனை',
        'nav_dashboard': 'டாஷ்போர்டு',
        'nav_advisory': 'அறிவுரை',
        'nav_about': 'எங்களை பற்றி',
        
        'app_title': 'பால் பண்ணை விவசாயிகளுக்கான ஸ்மார்ட் AI-இயக்கப்படும் விரைவான தீவனம் மற்றும் சைலேஜ் தரப் பரிசோதனை அமைப்பு',
        'app_subtitle': 'உடனடி தீவன-தர முடிவுகளுக்கான விரைவான களத்தில் தர மதிப்பீடு.',
        'app_badge': 'AI-இயக்கப்படும் • ஸ்மார்ட் இந்தியா ஹாக்காதோன் 2026',
        'results_time': '5 நிமிடங்களில் முடிவுகள்!',
        
        'btn_start_test': 'சோதனையை தொடங்கு',
        'btn_dashboard': 'டாஷ்போர்டை காண்க',
        'btn_simulate': 'உணரிகளை உருவகப்படுத்து',
        'btn_analyze': 'மாதிரியை பகுப்பாய்வு செய்',
        'btn_auto_fill': 'செயற்கை டெமோ மதிப்புகளை நிரப்பவும்',
        'btn_print': 'முடிவுகளை அச்சிடுக',
        'btn_save': 'முடிவுகளை சேமி',
        'btn_share': 'பகிர்',
        
        'test_title': 'தீவன தர சோதனை',
        'sample_id': 'மாதிரி ஐடி',
        'sample_id_placeholder': 'மாதிரி ஐடியை உள்ளிடவும் அல்லது தானாக விடவும்',
        'feed_type': 'தீவன வகை',
        'moisture': 'ஈரப்பதம் (%)',
        'protein': 'புரத உள்ளடக்கம் (%)',
        'fiber': 'நார்ச்சத்து உள்ளடக்கம் (%)',
        'energy': 'ஆற்றல் மதிப்பு (MJ/kg)',
        'ph': 'pH அளவு',
        'fermentation': 'நொதித்தல் தரம்',
        'select_feed': 'தீவன வகையை தேர்ந்தெடுக்கவும்',
        
        'feed_cattle': 'கால்நடை தீவனம்',
        'feed_silage': 'சைலேஜ்',
        'feed_fodder': 'பச்சை தீவனம்',
        'feed_concentrate': 'செறிவு கலவை',
        'feed_mineral': 'கனிம கலவை',
        
        'ferm_excellent': 'சிறந்தது',
        'ferm_good': 'நல்லது',
        'ferm_fair': 'நியாயமானது',
        'ferm_poor': 'மோசமானது',
        
        'results_title': 'பகுப்பாய்வு முடிவுகள்',
        'quality_score': 'தர மதிப்பெண்',
        'overall_quality': 'ஒட்டுமொத்த தரம்',
        'contamination': 'மாசுபாடு',
        'advisory_title': 'அறிவுரை',
        
        'quality_good': 'நல்லது',
        'quality_moderate': 'மிதமானது',
        'quality_poor': 'மோசமானது',
        'quality_unsafe': 'ஆபத்தானது',
        
        'dashboard_title': 'லைவ் டாஷ்போர்டு',
        'key_metrics': 'முக்கிய அளவீடுகள்',
        'total_tests': 'மொத்த சோதனைகள்',
        'avg_protein': 'சராசரி புரதம்',
        'avg_moisture': 'சராசரி ஈரப்பதம்',
        'quality_score_label': 'ஒட்டுமொத்த தரம்',
        'good_quality': 'நல்ல தரம்',
        'unsafe_label': 'ஆபத்தானது',
        'recent_tests': 'சமீபத்திய சோதனைகள்',
        'quality_distribution': 'தர விநியோகம்',

        'advisory_section': 'தீவன அறிவுரைகள்',
        'advisory_moisture': 'ஈரப்பத மேலாண்மை',
        'advisory_moisture_desc': 'உகந்த அளவு: தீவனத்திற்கு 10-12%, சைலேஜுக்கு 40-60%',
        'advisory_protein': 'புரத தேவைகள்',
        'advisory_protein_desc': 'பால் தரும் கால்நடைகளுக்கு 18-22% கச்சா புரதம் பரிந்துரைக்கப்படுகிறது',
        'advisory_fiber': 'நார்ச்சத்து',
        'advisory_fiber_desc': 'சிறந்த rumen செயல்பாட்டிற்கு 15-18% நார்ச்சத்து',
        'advisory_contamination': 'மாசுபாடு எச்சரிக்கை',
        'advisory_contamination_desc': 'அஃப்லாடாக்சின் மற்றும் மைக்கோடாக்சின்களை தொடர்ந்து கண்காணிக்கவும்',
        'advisory_storage': 'சேமிப்பு நிலைமைகள்',
        'advisory_storage_desc': '25°C-க்கு குறைவான குளிர்ந்த, உலர்ந்த இடத்தில் சேமிக்கவும்',
        'advisory_feeding': 'உணவளிக்கும் அட்டவணை',
        'advisory_feeding_desc': 'தினமும் இருமுறை புதிய தீவனம் அளித்து, கெட்டுப்போனதா என சரிபார்க்கவும்',
        'status_good': 'நல்லது',
        'status_warning': 'கண்காணிக்கவும்',
        'status_alert': 'எச்சரிக்கை',
        
        'login': 'உள்நுழைய',
        'register': 'பதிவு செய்ய',
        'logout': 'வெளியேறு',
        'welcome': 'வரவேற்கிறோம்',
        'username': 'பயனர்பெயர்',
        'email': 'மின்னஞ்சல்',
        'password': 'கடவுச்சொல்',
        'full_name': 'முழு பெயர்',
        'cancel': 'ரத்து செய்',
        
        'sensor_active': 'செயற்கை டெமோ அளவீடுகள் செயலில்',
        'cloud_sync': 'கிளவுட் ஒத்திசைவு செயலில்',
        'local_mode': 'உள்ளூர் முறை - ஒத்திசைக்க உள்நுழையவும்',
        'online': 'இணைப்பில்',
        'offline': 'இணைப்பில்லை',

        'about_title': 'DiaryLens பற்றி',
        'about_mission': 'நோக்கம்',
        'about_mission_text': 'AI அடிப்படையிலான மென்பொருள் பகுப்பாய்வு மற்றும் தெளிவாகக் குறிக்கப்பட்ட உருவகப்படுத்தப்பட்ட டெமோ அளவீடுகள் மூலம் தீவனத் தரத்தைப் புரிந்துகொள்ள பால் விவசாயிகளுக்கு உதவுதல்.',
        'about_technology': 'தொழில்நுட்பம்',
        'about_team': 'குழு',
        'about_impact': 'தாக்கம்',
        
        'footer_rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
        'footer_made': 'இந்திய பால் விவசாயிகளுக்காக ❤️ உடன் உருவாக்கப்பட்டது'
    },
    
    // ============ TELUGU ============
    te: {
        'nav_home': 'హోమ్',
        'nav_test': 'పరీక్ష',
        'nav_dashboard': 'డాష్బోర్డ్',
        'nav_advisory': 'సలహా',
        'nav_about': 'మా గురించి',
        
        'app_title': 'పాడి రైతుల కోసం స్మార్ట్ AI-ఆధారిత వేగవంతమైన మేత మరియు సైలేజ్ నాణ్యత పరీక్ష వ్యవస్థ',
        'app_subtitle': 'తక్షణ మేత-నాణ్యత నిర్ణయాల కోసం వేగవంతమైన క్షేత్ర స్థాయి నాణ్యత అంచనా.',
        'app_badge': 'AI-ఆధారిత • స్మార్ట్ ఇండియా హ్యాకథాన్ 2026',
        'results_time': '5 నిమిషాల్లో ఫలితాలు!',
        'sample_id': 'నమూనా ID',
        'sample_id_placeholder': 'నమూనా ID నమోదు చేయండి లేదా ఆటోగా వదిలేయండి',
        
        'btn_start_test': 'పరీక్ష ప్రారంభించండి',
        'btn_dashboard': 'డాష్బోర్డ్ చూడండి',
        'btn_simulate': 'సెన్సార్లను అనుకరించండి',
        'btn_analyze': 'నమూనాను విశ్లేషించండి',
        'btn_auto_fill': 'అనుకరణ డెమో విలువలను నింపండి',
        'btn_print': 'ఫలితాలను ప్రింట్ చేయండి',
        'btn_save': 'ఫలితాలను సేవ్ చేయండి',
        'btn_share': 'షేర్ చేయండి',
        'test_title': 'మేత నాణ్యత పరీక్ష',
        'feed_type': 'మేత రకం',
        'select_feed': 'మేత రకాన్ని ఎంచుకోండి',
        'feed_cattle': 'పశువుల మేత గుళికలు',
        'feed_silage': 'సైలేజ్',
        'feed_fodder': 'పచ్చి మేత',
        'feed_concentrate': 'సాంద్రీకృత మిశ్రమం',
        'feed_mineral': 'ఖనిజ మిశ్రమం',
        'moisture': 'తేమ (%)',
        'protein': 'ముడి ప్రోటీన్ (%)',
        'fiber': 'ఫైబర్ కంటెంట్ (%)',
        'energy': 'శక్తి విలువ (MJ/kg)',
        'ph': 'pH స్థాయి',
        'fermentation': 'కిణ్వన నాణ్యత',
        'results_title': 'విశ్లేషణ ఫలితాలు',
        'quality_score': 'నాణ్యత స్కోర్',
        'overall_quality': 'మొత్తం నాణ్యత',
        'advisory_title': 'సలహా',
        'dashboard_title': 'లైవ్ డాష్‌బోర్డ్',
        'key_metrics': 'ముఖ్య కొలతలు',
        'total_tests': 'మొత్తం పరీక్షలు',
        'avg_protein': 'సగటు ప్రోటీన్',
        'avg_moisture': 'సగటు తేమ',
        'quality_score_label': 'మొత్తం నాణ్యత',
        'good_quality': 'మంచి నాణ్యత',
        'unsafe_label': 'అసురక్షితం',
        'recent_tests': 'ఇటీవలి పరీక్షలు',
        'quality_distribution': 'నాణ్యత పంపిణీ',

        'advisory_section': 'మేత సలహాలు',
        'advisory_moisture': 'తేమ నిర్వహణ',
        'advisory_moisture_desc': 'సరైన స్థాయిలు: మేతకు 10-12%, సైలేజ్‌కు 40-60%',
        'advisory_protein': 'ప్రోటీన్ అవసరాలు',
        'advisory_protein_desc': 'పాలు ఇచ్చే పశువులకు 18-22% ముడి ప్రోటీన్ సిఫార్సు చేయబడింది',
        'advisory_fiber': 'ఫైబర్ కంటెంట్',
        'advisory_fiber_desc': 'సరైన రూమెన్ పనితీరు కోసం 15-18% ఫైబర్',
        'advisory_contamination': 'కాలుష్య హెచ్చరిక',
        'advisory_contamination_desc': 'అఫ్లాటాక్సిన్లు మరియు మైకోటాక్సిన్లను క్రమం తప్పకుండా పర్యవేక్షించండి',
        'advisory_storage': 'నిల్వ పరిస్థితులు',
        'advisory_storage_desc': '25°C కంటే తక్కువ చల్లని, పొడి ప్రదేశంలో నిల్వ చేయండి',
        'advisory_feeding': 'మేత షెడ్యూల్',
        'advisory_feeding_desc': 'రోజుకు రెండుసార్లు తాజా మేత ఇవ్వండి, చెడిపోయిందా చూడండి',
        'status_good': 'మంచిది',
        'status_warning': 'పర్యవేక్షించండి',
        'status_alert': 'హెచ్చరిక',
        
        'test_title': 'మేత నాణ్యత పరీక్ష',
        'sample_id': 'నమూనా ID',
        'feed_type': 'మేత రకం',
        'moisture': 'తేమ (%)',
        'protein': 'ప్రోటీన్ (%)',
        'fiber': 'ఫైబర్ (%)',
        'energy': 'శక్తి విలువ (MJ/kg)',
        'ph': 'pH స్థాయి',
        'fermentation': 'కిణ్వన నాణ్యత',
        
        'quality_good': 'మంచిది',
        'quality_moderate': 'మధ్యస్థం',
        'quality_poor': 'పేలవం',
        'quality_unsafe': 'అసురక్షితం',
        
        'login': 'లాగిన్',
        'register': 'నమోదు',
        'logout': 'లాగౌట్',
        'welcome': 'స్వాగతం',
        'username': 'వినియోగదారు పేరు',
        'email': 'ఇమెయిల్',
        'password': 'పాస్వర్డ్',
        'full_name': 'పూర్తి పేరు',
        'cancel': 'రద్దు చేయండి',
        
        'online': 'ఆన్‌లైన్',
        'offline': 'ఆఫ్‌లైన్'
        ,
        'about_title': 'DiaryLens గురించి',
        'about_mission': 'లక్ష్యం',
        'about_mission_text': 'AI ఆధారిత సాఫ్ట్‌వేర్ విశ్లేషణ మరియు స్పష్టంగా గుర్తించిన అనుకరణ డెమో రీడింగ్‌లతో పశుగ్రాస నాణ్యతను అర్థం చేసుకోవడంలో రైతులకు సహాయపడటం.',
        'about_technology': 'సాంకేతికత',
        'about_team': 'బృందం',
        'about_impact': 'ప్రభావం'
    },
    
    // ============ MARATHI ============
    mr: {
        'nav_home': 'होम',
        'nav_test': 'चाचणी',
        'nav_dashboard': 'डॅशबोर्ड',
        'nav_advisory': 'सल्ला',
        'nav_about': 'आमच्याबद्दल',
        
        'app_title': 'दुग्धशेतकऱ्यांसाठी स्मार्ट AI-सक्षम जलद चारा आणि सायलेज गुणवत्ता चाचणी प्रणाली',
        'app_subtitle': 'तात्काळ चारा-गुणवत्ता निर्णयांसाठी जलद ऑन-फील्ड गुणवत्ता मूल्यांकन.',
        'app_badge': 'AI-चालित • स्मार्ट इंडिया हैकाथॉन 2026',
        'results_time': '5 मिनिटांत निकाल!',
        'sample_id': 'नमुना ID',
        'sample_id_placeholder': 'नमुना ID लिहा किंवा ऑटो सोडा',
        
        'btn_start_test': 'चाचणी सुरू करा',
        'btn_dashboard': 'डॅशबोर्ड पहा',
        'btn_simulate': 'सेन्सर सिम्युलेट करा',
        'btn_analyze': 'नमुन्याचे विश्लेषण करा',
        'btn_auto_fill': 'सिम्युलेटेड डेमो मूल्ये भरा',
        'btn_print': 'निकाल प्रिंट करा',
        'btn_save': 'निकाल जतन करा',
        'btn_share': 'शेअर करा',
        'test_title': 'चारा गुणवत्ता चाचणी',
        'feed_type': 'चारा प्रकार',
        'select_feed': 'चारा प्रकार निवडा',
        'feed_cattle': 'गुरांचा चारा पेलेट',
        'feed_silage': 'सायलेज',
        'feed_fodder': 'हिरवा चारा',
        'feed_concentrate': 'केंद्रित मिश्रण',
        'feed_mineral': 'खनिज मिश्रण',
        'moisture': 'ओलावा (%)',
        'protein': 'कच्चे प्रथिने (%)',
        'fiber': 'फायबर सामग्री (%)',
        'energy': 'ऊर्जा मूल्य (MJ/kg)',
        'ph': 'pH पातळी',
        'fermentation': 'किण्वन गुणवत्ता',
        'results_title': 'विश्लेषण निकाल',
        'quality_score': 'गुणवत्ता गुण',
        'overall_quality': 'एकूण गुणवत्ता',
        'advisory_title': 'सल्ला',
        'dashboard_title': 'थेट डॅशबोर्ड',
        'key_metrics': 'मुख्य मोजमाप',
        'total_tests': 'एकूण चाचण्या',
        'avg_protein': 'सरासरी प्रथिने',
        'avg_moisture': 'सरासरी ओलावा',
        'quality_score_label': 'एकूण गुणवत्ता',
        'good_quality': 'चांगली गुणवत्ता',
        'unsafe_label': 'असुरक्षित',
        'recent_tests': 'अलीकडील चाचण्या',
        'quality_distribution': 'गुणवत्ता वितरण',

        'advisory_section': 'चारा सल्ले',
        'advisory_moisture': 'ओलावा व्यवस्थापन',
        'advisory_moisture_desc': 'योग्य पातळी: चाऱ्यासाठी 10-12%, सायलेजसाठी 40-60%',
        'advisory_protein': 'प्रथिनांची गरज',
        'advisory_protein_desc': 'दूध देणाऱ्या गुरांसाठी 18-22% कच्चे प्रथिने शिफारसीय',
        'advisory_fiber': 'फायबर सामग्री',
        'advisory_fiber_desc': 'योग्य रुमेन कार्यासाठी 15-18% फायबर',
        'advisory_contamination': 'दूषितपणा इशारा',
        'advisory_contamination_desc': 'अफ्लाटॉक्सिन आणि मायकोटॉक्सिनचे नियमित निरीक्षण करा',
        'advisory_storage': 'साठवण परिस्थिती',
        'advisory_storage_desc': '25°C पेक्षा कमी थंड, कोरड्या ठिकाणी साठवा',
        'advisory_feeding': 'खाऊ घालण्याचे वेळापत्रक',
        'advisory_feeding_desc': 'दिवसातून दोनदा ताजा चारा द्या आणि खराब झाला आहे का तपासा',
        'status_good': 'चांगले',
        'status_warning': 'निरीक्षण करा',
        'status_alert': 'इशारा',
        
        'test_title': 'चारा गुणवत्ता चाचणी',
        'sample_id': 'नमुना ID',
        'feed_type': 'चारा प्रकार',
        'moisture': 'ओलावा (%)',
        'protein': 'प्रथिने (%)',
        'fiber': 'फायबर (%)',
        'energy': 'ऊर्जा मूल्य (MJ/kg)',
        'ph': 'pH पातळी',
        'fermentation': 'किण्वन गुणवत्ता',
        
        'quality_good': 'चांगले',
        'quality_moderate': 'मध्यम',
        'quality_poor': 'वाईट',
        'quality_unsafe': 'असुरक्षित',
        
        'login': 'लॉगिन',
        'register': 'नोंदणी',
        'logout': 'लॉगआउट',
        'welcome': 'स्वागत आहे',
        'username': 'वापरकर्तानाव',
        'email': 'ईमेल',
        'password': 'पासवर्ड',
        'full_name': 'पूर्ण नाव',
        'cancel': 'रद्द करा',
        
        'online': 'ऑनलाइन',
        'offline': 'ऑफलाइन'
        ,
        'about_title': 'DiaryLens बद्दल',
        'about_mission': 'ध्येय',
        'about_mission_text': 'AI-आधारित सॉफ्टवेअर विश्लेषण आणि स्पष्टपणे दर्शविलेल्या सिम्युलेटेड डेमो रीडिंगद्वारे चारा गुणवत्ता समजून घेण्यास दुग्ध उत्पादक शेतकऱ्यांना मदत करणे.',
        'about_technology': 'तंत्रज्ञान',
        'about_team': 'संघ',
        'about_impact': 'परिणाम'
    }
};

// Home page copy. Kept separate so every page can fall back to English safely.
Object.assign(translations.en, {
    home_title: 'Smart AI-Enabled Rapid Feed and Silage Quality Testing System for Dairy Farmers',
    home_description: 'Enter values from a feed report to view an estimate and practical next steps.',
    manual_input_title: 'Manual input',
    manual_input_desc: 'Use values from an existing feed report',
    demo_values_title: 'Demo values',
    demo_values_desc: 'Optional and clearly simulated',
    saved_reports_title: 'Saved reports',
    saved_reports_desc: 'Stored in the local project database',
    explore_title: 'Explore DiaryLens',
    explore_test_desc: 'Enter values manually or load clearly labelled simulated demo values.'
});
Object.assign(translations.hi, {
    home_title: 'डेयरी किसानों के लिए स्मार्ट एआई-सक्षम त्वरित चारा और साइलेज गुणवत्ता परीक्षण प्रणाली',
    home_description: 'चारा रिपोर्ट के मान दर्ज करें और अनुमान व व्यावहारिक सुझाव देखें।',
    manual_input_title: 'मैन्युअल इनपुट',
    manual_input_desc: 'मौजूदा चारा रिपोर्ट के मान इस्तेमाल करें',
    demo_values_title: 'डेमो मान',
    demo_values_desc: 'वैकल्पिक और स्पष्ट रूप से सिम्युलेटेड',
    saved_reports_title: 'सहेजी गई रिपोर्ट',
    saved_reports_desc: 'प्रोजेक्ट के स्थानीय डेटाबेस में सहेजी गई',
    explore_title: 'DiaryLens देखें',
    explore_test_desc: 'मान खुद दर्ज करें या सिम्युलेटेड डेमो मान भरें।'
});
Object.assign(translations.ta, {
    home_title: 'பால் பண்ணை விவசாயிகளுக்கான ஸ்மார்ட் AI-இயக்கப்படும் விரைவான தீவனம் மற்றும் சைலேஜ் தரப் பரிசோதனை அமைப்பு',
    home_description: 'தீவன அறிக்கை மதிப்புகளை உள்ளிட்டு, மதிப்பீடும் நடைமுறை ஆலோசனைகளும் பெறுங்கள்.',
    manual_input_title: 'கைமுறை உள்ளீடு',
    manual_input_desc: 'ஏற்கனவே உள்ள தீவன அறிக்கை மதிப்புகளைப் பயன்படுத்துங்கள்',
    demo_values_title: 'டெமோ மதிப்புகள்',
    demo_values_desc: 'விருப்பமானவை; உருவகப்படுத்தப்பட்டவை என்று குறிக்கப்பட்டுள்ளன',
    saved_reports_title: 'சேமித்த அறிக்கைகள்',
    saved_reports_desc: 'திட்டத்தின் உள்ளூர் தரவுத்தளத்தில் சேமிக்கப்படும்',
    explore_title: 'DiaryLens-ஐப் பாருங்கள்',
    explore_test_desc: 'மதிப்புகளை நீங்களே உள்ளிடுங்கள் அல்லது உருவகப்படுத்தப்பட்ட டெமோ மதிப்புகளை நிரப்புங்கள்.'
});
Object.assign(translations.te, {
    home_title: 'పాడి రైతుల కోసం స్మార్ట్ AI-ఆధారిత వేగవంతమైన మేత మరియు సైలేజ్ నాణ్యత పరీక్ష వ్యవస్థ',
    home_description: 'మేత నివేదిక విలువలను నమోదు చేసి అంచనా, ఉపయోగకరమైన సూచనలు చూడండి.',
    manual_input_title: 'మాన్యువల్ నమోదు',
    manual_input_desc: 'ఇప్పటికే ఉన్న మేత నివేదిక విలువలను ఉపయోగించండి',
    demo_values_title: 'డెమో విలువలు',
    demo_values_desc: 'ఐచ్ఛికం; అనుకరణ డేటాగా గుర్తించబడతాయి',
    saved_reports_title: 'సేవ్ చేసిన నివేదికలు',
    saved_reports_desc: 'ప్రాజెక్ట్ స్థానిక డేటాబేస్‌లో భద్రపరచబడతాయి',
    explore_title: 'DiaryLens‌ను చూడండి',
    explore_test_desc: 'విలువలను నమోదు చేయండి లేదా అనుకరణ డెమో విలువలను నింపండి.'
});
Object.assign(translations.mr, {
    home_title: 'दुग्धशेतकऱ्यांसाठी स्मार्ट AI-सक्षम जलद चारा आणि सायलेज गुणवत्ता चाचणी प्रणाली',
    home_description: 'चारा अहवालातील मूल्ये भरा आणि अंदाज व उपयोगी सूचना पाहा.',
    manual_input_title: 'मॅन्युअल नोंद',
    manual_input_desc: 'उपलब्ध चारा अहवालातील मूल्ये वापरा',
    demo_values_title: 'डेमो मूल्ये',
    demo_values_desc: 'पर्यायी; सिम्युलेटेड म्हणून स्पष्टपणे दर्शवलेली',
    saved_reports_title: 'जतन केलेले अहवाल',
    saved_reports_desc: 'प्रकल्पाच्या स्थानिक डेटाबेसमध्ये जतन होतात',
    explore_title: 'DiaryLens पाहा',
    explore_test_desc: 'मूल्ये स्वतः भरा किंवा सिम्युलेटेड डेमो मूल्ये वापरा.'
});

Object.assign(translations.en, {
    nav_tools: 'Farm tools', tools_title: 'Farm tools and observations',
    tools_intro: 'Record observations, review entered values, and keep screening separate from laboratory confirmation.',
    tools_integrity: 'Entered values are not sensor measurements. Photos are preview-only. No toxin, chemical, disease, or feed-safety certification is provided.',
    tools_silage: 'Silage screening', tools_contamination: 'Contamination concerns', tools_ration: 'Ration totals', tools_milk: 'Milk and costs', tools_assistant: 'Voice assistant', tools_history: 'Farm history', tools_feed_cta: 'Test feed sample',
    assistant_title: 'Farmer help assistant',
    assistant_disclaimer: 'Rule-based information helper; not a live AI service, veterinarian, laboratory, or safety assessment.',
    assistant_question_feed: 'What does my feed result mean?', assistant_question_silage: 'What should I check in silage?', assistant_question_cost: 'How is cost per litre calculated?',
    assistant_input_label: 'Ask a question', assistant_placeholder: 'Ask about a report, silage, milk, or costs', assistant_send: 'Send', assistant_listen: 'Speak a question', assistant_read_answer: 'Read answer aloud', assistant_stop: 'Stop speaking',
    assistant_speech_notice: 'Speech recognition may use an online browser service; offline recognition is not guaranteed.', tools_date: 'Date',
    assistant_ready: 'Typed questions are always available.', assistant_listening: 'Listening. Speak now.', assistant_processing: 'Preparing an answer…', assistant_speaking: 'Speaking.',
    assistant_no_recognition: 'Speech input is unavailable for this language in this browser. Type your question instead.',
    assistant_no_voice: 'Spoken output for this language is unavailable on this device. The written answer is available.',
    assistant_mic_denied: 'Microphone permission was denied. Allow access and retry, or type your question.',
    assistant_start_failed: 'Could not start speech input. Please type your question.', assistant_stopped: 'Speech stopped.',
    assistant_answer_feed: 'Feed results here are prototype estimates from entered values, not laboratory measurements or proof of safety. Compare them with the original report and consult a qualified nutrition professional.',
    assistant_answer_silage: 'Check for mould-like growth, unusual smell or colour, heating, air exposure, and water entry. These observations cannot confirm toxins or prove silage is safe. Isolate seriously affected feed and seek expert or laboratory advice.',
    assistant_answer_milk: 'Cost per litre is recorded expenses divided by milk litres, when litres are above zero. A change over time does not prove that a feed change caused a milk-yield change.',
    assistant_answer_cost: 'Revenue is milk litres multiplied by sale price. Estimated profit or loss is recorded revenue minus the expenses you entered; omitted expenses are not included.',
    assistant_answer_default: 'I can explain feed report limits, silage observations, milk trends, and entered costs. For suspected toxins, serious spoilage, or animal illness, isolate the feed and contact a veterinarian or laboratory.',
    assistant_latest_feed: 'Latest saved feed report:', assistant_latest_silage: 'Latest saved silage observation:',
    assistant_latest_milk: 'Latest saved milk entry:', assistant_latest_cost: 'Latest saved cost entry:'
});
Object.assign(translations.hi, {
    nav_tools: 'किसान उपकरण', tools_title: 'किसान उपकरण और निरीक्षण',
    tools_intro: 'निरीक्षण और दर्ज मान लिखें; प्रारंभिक जाँच को प्रयोगशाला पुष्टि से अलग रखें।',
    tools_integrity: 'दर्ज मान सेंसर माप नहीं हैं। तस्वीर केवल पूर्वावलोकन है। विष, रसायन, बीमारी या चारे की सुरक्षा प्रमाणित नहीं होती।',
    tools_silage: 'साइलेज जाँच', tools_contamination: 'दूषण संबंधी चिंता', tools_ration: 'आहार कुल', tools_milk: 'दूध और लागत', tools_assistant: 'आवाज़ सहायक', tools_history: 'खेत का इतिहास', tools_feed_cta: 'चारा नमूना जाँचें',
    assistant_title: 'किसान सहायता', assistant_disclaimer: 'नियम-आधारित जानकारी; यह लाइव AI, पशु चिकित्सक, प्रयोगशाला या सुरक्षा जाँच नहीं है।',
    assistant_question_feed: 'मेरे चारा परिणाम का क्या अर्थ है?', assistant_question_silage: 'साइलेज में क्या जाँचें?', assistant_question_cost: 'प्रति लीटर लागत कैसे निकलेगी?',
    assistant_input_label: 'प्रश्न पूछें', assistant_placeholder: 'रिपोर्ट, साइलेज, दूध या लागत के बारे में पूछें', assistant_send: 'भेजें', assistant_listen: 'बोलकर पूछें', assistant_read_answer: 'उत्तर सुनें', assistant_stop: 'बोलना रोकें',
    assistant_speech_notice: 'वाणी पहचान के लिए ब्राउज़र ऑनलाइन सेवा का उपयोग कर सकता है; ऑफ़लाइन पहचान की गारंटी नहीं है।', tools_date: 'तारीख',
    assistant_ready: 'आप हमेशा टाइप करके पूछ सकते हैं।', assistant_listening: 'सुन रहा है। अब बोलें।', assistant_processing: 'उत्तर तैयार हो रहा है…', assistant_speaking: 'उत्तर बोल रहा है।',
    assistant_no_recognition: 'इस ब्राउज़र में इस भाषा की वाणी पहचान उपलब्ध नहीं है। प्रश्न टाइप करें।',
    assistant_no_voice: 'इस डिवाइस पर इस भाषा की वाणी उपलब्ध नहीं है। लिखित उत्तर उपलब्ध है।',
    assistant_mic_denied: 'माइक्रोफ़ोन अनुमति नहीं मिली। अनुमति देकर फिर प्रयास करें या प्रश्न टाइप करें।',
    assistant_start_failed: 'वाणी पहचान शुरू नहीं हुई। कृपया प्रश्न टाइप करें।', assistant_stopped: 'वाणी रोक दी गई।',
    assistant_answer_feed: 'यहाँ चारा परिणाम दर्ज मानों पर आधारित प्रोटोटाइप अनुमान हैं, प्रयोगशाला माप या सुरक्षा प्रमाण नहीं। मूल रिपोर्ट से मिलाएँ और योग्य पोषण विशेषज्ञ से सलाह लें।',
    assistant_answer_silage: 'फफूँद जैसे धब्बे, असामान्य गंध या रंग, गर्मी, हवा और पानी के प्रवेश की जाँच करें। इससे विष की पुष्टि या सुरक्षा प्रमाण नहीं मिलता। गंभीर रूप से प्रभावित चारा अलग रखें और विशेषज्ञ या प्रयोगशाला से संपर्क करें।',
    assistant_answer_milk: 'प्रति लीटर लागत = दर्ज खर्च ÷ दूध लीटर, यदि लीटर शून्य से अधिक हों। समय के साथ बदलाव से यह सिद्ध नहीं होता कि चारे ने दूध उत्पादन बदला।',
    assistant_answer_cost: 'आय = दूध लीटर × बिक्री मूल्य। अनुमानित लाभ/हानि = दर्ज आय − आपके दर्ज खर्च; शामिल न किए गए खर्च इसमें नहीं हैं।',
    assistant_answer_default: 'मैं चारा रिपोर्ट की सीमाएँ, साइलेज निरीक्षण, दूध के रुझान और दर्ज लागत समझा सकता हूँ। विष, गंभीर खराबी या पशु बीमारी की आशंका में चारा अलग रखें और पशु चिकित्सक या प्रयोगशाला से संपर्क करें।',
    assistant_latest_feed: 'सबसे हाल की सहेजी गई चारा रिपोर्ट:', assistant_latest_silage: 'सबसे हाल का सहेजा गया साइलेज निरीक्षण:',
    assistant_latest_milk: 'सबसे हाल की सहेजी गई दूध प्रविष्टि:', assistant_latest_cost: 'सबसे हाल की सहेजी गई लागत प्रविष्टि:'
});
Object.assign(translations.ta, {
    nav_tools: 'பண்ணைக் கருவிகள்', tools_title: 'பண்ணைக் கருவிகளும் பதிவுகளும்',
    tools_intro: 'கண்டறிந்தவற்றையும் உள்ளிட்ட மதிப்புகளையும் பதிவு செய்யுங்கள்; ஆரம்பத் திரையிடலை ஆய்வக உறுதிப்படுத்தலிலிருந்து தனியாக வைத்திருங்கள்.',
    tools_integrity: 'உள்ளிட்ட மதிப்புகள் சென்சார் அளவீடுகள் அல்ல. படம் முன்னோட்டம் மட்டுமே. நச்சு, ரசாயனம், நோய் அல்லது தீவனப் பாதுகாப்பு உறுதிப்படுத்தப்படாது.',
    tools_silage: 'சைலேஜ் திரையிடல்', tools_contamination: 'மாசு குறித்த கவலைகள்', tools_ration: 'ரேஷன் மொத்தங்கள்', tools_milk: 'பால் மற்றும் செலவுகள்', tools_assistant: 'குரல் உதவியாளர்', tools_history: 'பண்ணைப் பதிவு', tools_feed_cta: 'தீவன மாதிரியைச் சோதிக்கவும்',
    assistant_title: 'விவசாயி உதவியாளர்', assistant_disclaimer: 'விதி அடிப்படையிலான தகவல் உதவி; நேரடி AI, கால்நடை மருத்துவர், ஆய்வகம் அல்லது பாதுகாப்பு மதிப்பீடு அல்ல.',
    assistant_question_feed: 'என் தீவன முடிவின் பொருள் என்ன?', assistant_question_silage: 'சைலேஜில் எதைச் சரிபார்க்க வேண்டும்?', assistant_question_cost: 'ஒரு லிட்டருக்கான செலவை எப்படிக் கணக்கிடுவது?',
    assistant_input_label: 'கேள்வி கேளுங்கள்', assistant_placeholder: 'அறிக்கை, சைலேஜ், பால் அல்லது செலவு பற்றி கேளுங்கள்', assistant_send: 'அனுப்பு', assistant_listen: 'குரலில் கேளுங்கள்', assistant_read_answer: 'பதிலைச் சத்தமாகப் படி', assistant_stop: 'பேச்சை நிறுத்து',
    assistant_speech_notice: 'குரல் அடையாளம் காணல் உலாவியின் இணையச் சேவையைப் பயன்படுத்தலாம்; இணையமின்றி வேலை செய்வது உறுதியில்லை.', tools_date: 'தேதி',
    assistant_ready: 'எப்போதும் தட்டச்சு செய்து கேட்கலாம்.', assistant_listening: 'கேட்கிறது. இப்போது பேசுங்கள்.', assistant_processing: 'பதில் தயாராகிறது…', assistant_speaking: 'பதில் பேசப்படுகிறது.',
    assistant_no_recognition: 'இந்த உலாவியில் இந்த மொழிக்கான குரல் உள்ளீடு இல்லை. கேள்வியைத் தட்டச்சு செய்யுங்கள்.',
    assistant_no_voice: 'இந்தச் சாதனத்தில் இந்த மொழிக்கான குரல் வெளியீடு இல்லை. எழுத்துப் பதில் கிடைக்கும்.',
    assistant_mic_denied: 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது. அனுமதி அளித்து மீண்டும் முயலுங்கள் அல்லது தட்டச்சு செய்யுங்கள்.',
    assistant_start_failed: 'குரல் உள்ளீட்டைத் தொடங்க முடியவில்லை. கேள்வியைத் தட்டச்சு செய்யுங்கள்.', assistant_stopped: 'குரல் நிறுத்தப்பட்டது.',
    assistant_answer_feed: 'இங்குள்ள தீவன முடிவுகள் உள்ளிட்ட மதிப்புகளிலிருந்து கிடைக்கும் முன்மாதிரி கணிப்புகள்; ஆய்வக அளவீடோ பாதுகாப்புச் சான்றோ அல்ல. அசல் அறிக்கையுடன் ஒப்பிட்டு ஊட்டச்சத்து நிபுணரிடம் ஆலோசிக்கவும்.',
    assistant_answer_silage: 'பூஞ்சை போன்ற தழும்புகள், வழக்கமற்ற மணம் அல்லது நிறம், வெப்பம், காற்று புகுதல், நீர் நுழைதல் ஆகியவற்றைக் கவனியுங்கள். இவை நச்சை உறுதிப்படுத்தவோ பாதுகாப்பை நிரூபிக்கவோ முடியாது. கடுமையாகப் பாதித்த தீவனத்தைத் தனிமைப்படுத்தி நிபுணர் அல்லது ஆய்வகத்தை அணுகுங்கள்.',
    assistant_answer_milk: 'ஒரு லிட்டருக்கான செலவு = பதிவு செய்த செலவுகள் ÷ பால் லிட்டர்கள் (லிட்டர்கள் பூஜ்ஜியத்தை விட அதிகமாக இருக்கும்போது). கால மாற்றம் மட்டும் தீவனமே பால் மாற்றத்திற்குக் காரணம் என நிரூபிக்காது.',
    assistant_answer_cost: 'வருவாய் = பால் லிட்டர்கள் × விற்பனை விலை. மதிப்பிடப்பட்ட லாபம்/நஷ்டம் = பதிவு செய்த வருவாய் − நீங்கள் உள்ளிட்ட செலவுகள்; விடுபட்ட செலவுகள் இதில் சேராது.',
    assistant_answer_default: 'தீவன அறிக்கை வரம்புகள், சைலேஜ் கவனிப்புகள், பால் போக்குகள் மற்றும் உள்ளிட்ட செலவுகளை விளக்க முடியும். நச்சு, கடுமையான கெடுதல் அல்லது விலங்கு நோய் சந்தேகம் இருந்தால் தீவனத்தைத் தனிமைப்படுத்தி மருத்துவர் அல்லது ஆய்வகத்தை அணுகுங்கள்.',
    assistant_latest_feed: 'சமீபத்தில் சேமித்த தீவன அறிக்கை:', assistant_latest_silage: 'சமீபத்தில் சேமித்த சைலேஜ் கவனிப்பு:',
    assistant_latest_milk: 'சமீபத்தில் சேமித்த பால் பதிவு:', assistant_latest_cost: 'சமீபத்தில் சேமித்த செலவுப் பதிவு:'
});
Object.assign(translations.te, {
    nav_tools: 'వ్యవసాయ సాధనాలు', tools_title: 'వ్యవసాయ సాధనాలు మరియు పరిశీలనలు',
    tools_intro: 'పరిశీలనలను నమోదు చేసి, నమోదు చేసిన విలువలను చూడండి; ప్రాథమిక స్క్రీనింగ్‌ను ప్రయోగశాల నిర్ధారణగా భావించవద్దు.',
    tools_integrity: 'నమోదు చేసిన విలువలు సెన్సార్ కొలతలు కావు. ఫోటో ప్రివ్యూ మాత్రమే. విషం, రసాయనం, వ్యాధి లేదా మేత భద్రతను ఈ సాధనం నిర్ధారించదు.',
    tools_silage: 'సైలేజ్ స్క్రీనింగ్', tools_contamination: 'కాలుష్య ఆందోళనలు', tools_ration: 'రేషన్ మొత్తాలు', tools_milk: 'పాలు మరియు ఖర్చులు', tools_assistant: 'వాయిస్ సహాయకుడు', tools_history: 'వ్యవసాయ చరిత్ర', tools_feed_cta: 'మేత నమూనా పరీక్షించండి',
    assistant_title: 'రైతు సహాయకుడు', assistant_disclaimer: 'నియమాల ఆధారిత సమాచారం మాత్రమే; ప్రత్యక్ష AI, పశువైద్యుడు, ప్రయోగశాల లేదా భద్రతా అంచనా కాదు.',
    assistant_question_feed: 'నా మేత ఫలితం ఏమి సూచిస్తుంది?', assistant_question_silage: 'సైలేజ్‌లో ఏమి చూడాలి?', assistant_question_cost: 'లీటరుకు ఖర్చు ఎలా లెక్కించాలి?',
    assistant_input_label: 'ప్రశ్న అడగండి', assistant_placeholder: 'నివేదిక, సైలేజ్, పాలు లేదా ఖర్చుల గురించి అడగండి', assistant_send: 'పంపండి', assistant_listen: 'మాట్లాడి అడగండి', assistant_read_answer: 'సమాధానాన్ని వినండి', assistant_stop: 'మాట ఆపండి',
    assistant_speech_notice: 'వాయిస్ గుర్తింపు బ్రౌజర్ ఆన్‌లైన్ సేవను ఉపయోగించవచ్చు; ఆఫ్‌లైన్ గుర్తింపు హామీ లేదు.', tools_date: 'తేదీ',
    assistant_ready: 'టైప్ చేసి ఎప్పుడైనా అడగవచ్చు.', assistant_listening: 'వింటోంది. ఇప్పుడు మాట్లాడండి.', assistant_processing: 'సమాధానం సిద్ధమవుతోంది…', assistant_speaking: 'సమాధానం వినిపిస్తోంది.',
    assistant_no_recognition: 'ఈ బ్రౌజర్‌లో ఈ భాషకు వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. టైప్ చేయండి.',
    assistant_no_voice: 'ఈ పరికరంలో ఈ భాషకు వాయిస్ అవుట్‌పుట్ లేదు. రాత సమాధానం అందుబాటులో ఉంది.',
    assistant_mic_denied: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. అనుమతించి మళ్లీ ప్రయత్నించండి లేదా టైప్ చేయండి.',
    assistant_start_failed: 'వాయిస్ ఇన్‌పుట్ ప్రారంభం కాలేదు. దయచేసి టైప్ చేయండి.', assistant_stopped: 'వాయిస్ ఆపబడింది.',
    assistant_answer_feed: 'ఇక్కడి మేత ఫలితాలు నమోదు చేసిన విలువలపై ఆధారపడిన నమూనా అంచనాలు మాత్రమే; ప్రయోగశాల కొలతలు లేదా భద్రతా నిర్ధారణ కాదు. అసలు నివేదికతో పోల్చి అర్హత కలిగిన పోషకాహార నిపుణుడిని సంప్రదించండి.',
    assistant_answer_silage: 'బూజు వంటి మచ్చలు, అసాధారణ వాసన లేదా రంగు, వేడి, గాలి ప్రవేశం, నీరు చేరడం గమనించండి. వీటితో విషాన్ని నిర్ధారించలేరు లేదా భద్రతను నిరూపించలేరు. తీవ్రంగా ప్రభావితమైన మేతను వేరుచేసి నిపుణుడు లేదా ప్రయోగశాలను సంప్రదించండి.',
    assistant_answer_milk: 'లీటరుకు ఖర్చు = నమోదు చేసిన ఖర్చులు ÷ పాల లీటర్లు (లీటర్లు సున్నా కంటే ఎక్కువైతే). కాలక్రమంలోని మార్పు మాత్రమే మేత వల్ల పాల దిగుబడి మారిందని నిరూపించదు.',
    assistant_answer_cost: 'ఆదాయం = పాల లీటర్లు × అమ్మకపు ధర. అంచనా లాభం/నష్టం = నమోదు చేసిన ఆదాయం − మీరు నమోదు చేసిన ఖర్చులు; నమోదు చేయని ఖర్చులు లెక్కలో లేవు.',
    assistant_answer_default: 'మేత నివేదిక పరిమితులు, సైలేజ్ పరిశీలనలు, పాల ధోరణులు, నమోదు చేసిన ఖర్చులను వివరించగలను. విషం, తీవ్రమైన చెడిపోవడం లేదా జంతు అనారోగ్యం అనుమానం ఉంటే మేతను వేరుచేసి పశువైద్యుడు లేదా ప్రయోగశాలను సంప్రదించండి.',
    assistant_latest_feed: 'ఇటీవలి సేవ్ చేసిన మేత నివేదిక:', assistant_latest_silage: 'ఇటీవలి సేవ్ చేసిన సైలేజ్ పరిశీలన:',
    assistant_latest_milk: 'ఇటీవలి సేవ్ చేసిన పాల నమోదు:', assistant_latest_cost: 'ఇటీవలి సేవ్ చేసిన ఖర్చు నమోదు:'
});
Object.assign(translations.mr, {
    nav_tools: 'शेतकरी साधने', tools_title: 'शेतकरी साधने आणि निरीक्षणे',
    tools_intro: 'निरीक्षणे नोंदवा आणि भरलेली मूल्ये पाहा; प्राथमिक तपासणीला प्रयोगशाळेची पुष्टी समजू नका.',
    tools_integrity: 'भरलेली मूल्ये सेन्सर मोजमाप नाहीत. फोटो फक्त पूर्वदृश्य आहे. विष, रसायन, रोग किंवा चारा सुरक्षिततेची खात्री दिली जात नाही.',
    tools_silage: 'सायलेज तपासणी', tools_contamination: 'भेसळविषयक चिंता', tools_ration: 'राशनची बेरीज', tools_milk: 'दूध आणि खर्च', tools_assistant: 'आवाज सहाय्यक', tools_history: 'शेत नोंदी', tools_feed_cta: 'चारा नमुना तपासा',
    assistant_title: 'शेतकरी मदत सहाय्यक', assistant_disclaimer: 'नियमांवर आधारित माहिती; हे लाइव्ह AI, पशुवैद्य, प्रयोगशाळा किंवा सुरक्षितता तपासणी नाही.',
    assistant_question_feed: 'माझ्या चारा निकालाचा अर्थ काय?', assistant_question_silage: 'सायलेजमध्ये काय तपासावे?', assistant_question_cost: 'प्रति लिटर खर्च कसा मोजतात?',
    assistant_input_label: 'प्रश्न विचारा', assistant_placeholder: 'अहवाल, सायलेज, दूध किंवा खर्चाबद्दल विचारा', assistant_send: 'पाठवा', assistant_listen: 'बोलून विचारा', assistant_read_answer: 'उत्तर ऐका', assistant_stop: 'बोलणे थांबवा',
    assistant_speech_notice: 'आवाज ओळखण्यासाठी ब्राउझरची ऑनलाइन सेवा वापरली जाऊ शकते; ऑफलाइन ओळख निश्चित नाही.', tools_date: 'दिनांक',
    assistant_ready: 'टाइप करून प्रश्न नेहमी विचारू शकता.', assistant_listening: 'ऐकत आहे. आता बोला.', assistant_processing: 'उत्तर तयार होत आहे…', assistant_speaking: 'उत्तर बोलले जात आहे.',
    assistant_no_recognition: 'या ब्राउझरमध्ये या भाषेसाठी आवाज ओळख उपलब्ध नाही. प्रश्न टाइप करा.',
    assistant_no_voice: 'या उपकरणावर या भाषेतील आवाज उपलब्ध नाही. लिखित उत्तर मिळेल.',
    assistant_mic_denied: 'मायक्रोफोनची परवानगी नाकारली. परवानगी देऊन पुन्हा प्रयत्न करा किंवा टाइप करा.',
    assistant_start_failed: 'आवाज इनपुट सुरू झाला नाही. कृपया प्रश्न टाइप करा.', assistant_stopped: 'आवाज थांबवला.',
    assistant_answer_feed: 'येथील चारा निकाल भरलेल्या मूल्यांवर आधारित नमुना अंदाज आहेत; प्रयोगशाळेचे मोजमाप किंवा सुरक्षिततेचा पुरावा नाही. मूळ अहवालाशी तुलना करा आणि पात्र पोषणतज्ज्ञांचा सल्ला घ्या.',
    assistant_answer_silage: 'बुरशीसारखे डाग, अनोळखी वास किंवा रंग, गरम होणे, हवा लागणे आणि पाणी शिरणे तपासा. यावरून विषाची पुष्टी किंवा सुरक्षिततेची खात्री होत नाही. गंभीररीत्या खराब चारा वेगळा ठेवा आणि तज्ज्ञ किंवा प्रयोगशाळेशी संपर्क करा.',
    assistant_answer_milk: 'प्रति लिटर खर्च = नोंदवलेला खर्च ÷ दूध लिटर (लिटर शून्यापेक्षा जास्त असल्यास). काळानुसार बदल दिसला तरी चाऱ्यामुळे दूध बदलले हे सिद्ध होत नाही.',
    assistant_answer_cost: 'उत्पन्न = दूध लिटर × विक्री किंमत. अंदाजे नफा/तोटा = नोंदवलेले उत्पन्न − तुम्ही नोंदवलेला खर्च; नोंद न केलेला खर्च यात नाही.',
    assistant_answer_default: 'चारा अहवालाच्या मर्यादा, सायलेज निरीक्षणे, दूधातील कल आणि नोंदवलेला खर्च समजावू शकतो. विष, गंभीर खराबी किंवा जनावर आजारी असल्याची शंका असल्यास चारा वेगळा ठेवा आणि पशुवैद्य किंवा प्रयोगशाळेशी संपर्क करा.',
    assistant_latest_feed: 'अलीकडील जतन केलेला चारा अहवाल:', assistant_latest_silage: 'अलीकडील जतन केलेले सायलेज निरीक्षण:',
    assistant_latest_milk: 'अलीकडील जतन केलेली दूध नोंद:', assistant_latest_cost: 'अलीकडील जतन केलेली खर्च नोंद:'
});

Object.assign(translations.en, {
    tools_silage_title: 'Silage condition check', tools_silage_desc: 'Record storage conditions and visible or sensory warning signs. This is not an image classifier.',
    tools_observation_tag: 'Farmer observations', tools_sample_id: 'Sample ID', tools_date: 'Date', tools_silage_type: 'Silage type',
    tools_storage: 'Storage method', tools_storage_days: 'Storage duration (days)', tools_ph: 'Measured pH (optional)',
    tools_moisture: 'Measured moisture % (optional)', tools_temperature: 'Measured temperature °C (optional)', tools_photo: 'Photo (preview only)',
    tools_observe: 'What did you observe?', tools_mould: 'Mould-like patches', tools_smell: 'Unusual or putrid smell',
    tools_colour: 'Unusual colour change', tools_texture: 'Unusual texture or heating', tools_air: 'Air exposure / loose cover',
    tools_water: 'Water entry or damaged cover', tools_assess_save: 'Review and save observation', tools_next_steps: 'Storage follow-up',
    tools_silage_guidance: 'Limit air and water entry, inspect the exposed face, and keep a dated note. If spoilage is extensive or animals are ill, isolate the affected feed and contact a veterinarian or laboratory.',
    tools_contamination_title: 'Contamination risk notes', tools_contamination_desc: 'Record a concern and evidence without treating it as chemical confirmation.',
    tools_concern: 'Concern', tools_evidence: 'What was seen or reported?', tools_record_concern: 'Record concern',
    tools_ration_title: 'Ration and fodder comparison', tools_ration_desc: 'Totals use only the composition and quantities you enter. This tool does not recommend a diet or certify nutritional adequacy.',
    tools_entered_values: 'User-entered values', tools_daily_mix: 'Daily mix totals', tools_add_ingredient: 'Add ingredient',
    tools_ingredient: 'Ingredient', tools_qty: 'kg/day', tools_protein_pct: 'Protein %', tools_fibre_pct: 'Fibre %',
    tools_energy: 'Energy MJ/kg', tools_price: 'Price/kg (optional)', tools_calculate_totals: 'Calculate entered totals',
    tools_ration_caution: 'Totals are arithmetic estimates from entered numbers. Ingredient sources and animal requirements are not verified; ask a qualified nutrition professional before changing a ration.',
    tools_alternative_title: 'Fodder alternative comparison', tools_alternative_desc: 'Compare two ingredients only when you have composition and price data in matching units.',
    tools_current_feed: 'Current ingredient', tools_alternative: 'Alternative ingredient', tools_current_protein: 'Current protein %',
    tools_alternative_protein: 'Alternative protein %', tools_current_fibre: 'Current fibre %', tools_alternative_fibre: 'Alternative fibre %',
    tools_current_energy: 'Current energy MJ/kg', tools_alternative_energy: 'Alternative energy MJ/kg',
    tools_current_price: 'Current price/kg', tools_alternative_price: 'Alternative price/kg',
    tools_compare: 'Compare entered values', tools_milk_title: 'Milk yield and production costs',
    tools_milk_desc: 'Track dated entries and compare against your recorded baseline. A timeline does not show that one event caused another.',
    tools_milk_entry: 'Daily milk entry', tools_animal_group: 'Animal / group ID', tools_litres: 'Milk yield (litres)',
    tools_event: 'Feed, health, or management note (optional)', tools_save_yield: 'Save milk entry',
    tools_cost_entry: 'Milk production cost entry', tools_feed_cost: 'Feed and fodder expense (₹)',
    tools_other_cost: 'Other recorded costs (₹)', tools_milk_litres: 'Milk produced (litres)', tools_milk_price: 'Sale price per litre (₹)',
    tools_calculate_cost: 'Calculate and save', tools_cost_formula: 'Expenses = feed and fodder + other entered costs. Revenue = milk litres × price. Cost/litre = expenses ÷ litres (when litres > 0). Profit/loss = revenue − expenses. Only entered items are included.',
    tools_history_title: 'Recent farm history', tools_history_desc: 'Account records are stored in this project’s local SQLite database. Unsigned records stay in this browser only.',
    tools_refresh: 'Refresh', tools_export: 'Export visible records (CSV)', tools_footer_note: 'Local prototype; not a substitute for laboratory or veterinary advice.',
    sample_name: 'Sample name (optional)', sample_date: 'Collection date (optional)', measurement_source: 'Source of entered values',
    source_not_specified: 'Not stated / QR source not verified', source_lab: 'Laboratory report', source_manufacturer: 'Manufacturer label',
    source_measured: 'Measured by farmer', source_reference: 'Reference value', source_simulated: 'Simulated demo values',
    source_shared_note: 'This source applies to all values entered for this sample.', source_user_entered: 'User-entered / other',
    tools_animal_category: 'Animal category', tools_body_weight: 'Body weight (kg, optional)',
    tools_daily_milk: 'Daily milk yield (L, optional)', tools_pregnancy: 'Pregnancy status', tools_composition_source: 'Composition source'
});
Object.assign(translations.hi, {
    sample_name: 'नमूने का नाम (वैकल्पिक)', sample_date: 'नमूना लेने की तारीख (वैकल्पिक)', measurement_source: 'दर्ज मानों का स्रोत',
    source_not_specified: 'स्रोत नहीं बताया / QR स्रोत अप्रमाणित', source_lab: 'प्रयोगशाला रिपोर्ट', source_manufacturer: 'निर्माता लेबल',
    source_measured: 'किसान द्वारा मापा', source_reference: 'संदर्भ मान', source_simulated: 'सिम्युलेटेड डेमो मान',
    source_shared_note: 'यह स्रोत इस नमूने के सभी दर्ज मानों पर लागू है।', source_user_entered: 'किसान द्वारा दर्ज / अन्य',
    tools_animal_category: 'पशु की श्रेणी', tools_body_weight: 'शरीर का वजन (किग्रा, वैकल्पिक)',
    tools_daily_milk: 'दैनिक दूध (लीटर, वैकल्पिक)', tools_pregnancy: 'गर्भावस्था की स्थिति', tools_composition_source: 'संरचना का स्रोत',
    tools_current_fibre: 'वर्तमान फाइबर %', tools_alternative_fibre: 'वैकल्पिक फाइबर %',
    tools_current_energy: 'वर्तमान ऊर्जा MJ/kg', tools_alternative_energy: 'वैकल्पिक ऊर्जा MJ/kg'
});
Object.assign(translations.ta, {
    sample_name: 'மாதிரிப் பெயர் (விருப்பம்)', sample_date: 'மாதிரி சேகரித்த தேதி (விருப்பம்)', measurement_source: 'உள்ளிட்ட மதிப்புகளின் மூலம்',
    source_not_specified: 'குறிப்பிடப்படவில்லை / QR மூலம் சரிபார்க்கப்படவில்லை', source_lab: 'ஆய்வக அறிக்கை', source_manufacturer: 'உற்பத்தியாளர் லேபிள்',
    source_measured: 'விவசாயி அளந்தது', source_reference: 'குறிப்பு மதிப்பு', source_simulated: 'உருவகப்படுத்தப்பட்ட டெமோ மதிப்புகள்',
    source_shared_note: 'இந்த மூலம் இந்த மாதிரிக்காக உள்ளிட்ட அனைத்து மதிப்புகளுக்கும் பொருந்தும்.', source_user_entered: 'பயனர் உள்ளிட்டது / மற்றவை',
    tools_animal_category: 'விலங்கு வகை', tools_body_weight: 'உடல் எடை (கிலோ, விருப்பம்)',
    tools_daily_milk: 'தினசரி பால் (லிட்டர், விருப்பம்)', tools_pregnancy: 'கர்ப்ப நிலை', tools_composition_source: 'கலவைத் தகவலின் மூலம்',
    tools_current_fibre: 'தற்போதைய நார்ச்சத்து %', tools_alternative_fibre: 'மாற்று நார்ச்சத்து %',
    tools_current_energy: 'தற்போதைய ஆற்றல் MJ/kg', tools_alternative_energy: 'மாற்று ஆற்றல் MJ/kg'
});
Object.assign(translations.te, {
    sample_name: 'నమూనా పేరు (ఐచ్ఛికం)', sample_date: 'నమూనా సేకరణ తేదీ (ఐచ్ఛికం)', measurement_source: 'నమోదు చేసిన విలువల మూలం',
    source_not_specified: 'పేర్కొనలేదు / QR మూలం ధృవీకరించలేదు', source_lab: 'ప్రయోగశాల నివేదిక', source_manufacturer: 'తయారీదారు లేబుల్',
    source_measured: 'రైతు కొలిచినది', source_reference: 'సూచన విలువ', source_simulated: 'అనుకరణ డెమో విలువలు',
    source_shared_note: 'ఈ మూలం ఈ నమూనాకు నమోదు చేసిన అన్ని విలువలకు వర్తిస్తుంది.', source_user_entered: 'వినియోగదారు నమోదు / ఇతర',
    tools_animal_category: 'జంతువు వర్గం', tools_body_weight: 'శరీర బరువు (కిలోలు, ఐచ్ఛికం)',
    tools_daily_milk: 'రోజువారీ పాలు (లీటర్లు, ఐచ్ఛికం)', tools_pregnancy: 'గర్భధారణ స్థితి', tools_composition_source: 'పోషక కూర్పు మూలం',
    tools_current_fibre: 'ప్రస్తుత ఫైబర్ %', tools_alternative_fibre: 'ప్రత్యామ్నాయ ఫైబర్ %',
    tools_current_energy: 'ప్రస్తుత శక్తి MJ/kg', tools_alternative_energy: 'ప్రత్యామ్నాయ శక్తి MJ/kg'
});
Object.assign(translations.mr, {
    sample_name: 'नमुन्याचे नाव (ऐच्छिक)', sample_date: 'नमुना संकलन दिनांक (ऐच्छिक)', measurement_source: 'भरलेल्या मूल्यांचा स्रोत',
    source_not_specified: 'सांगितलेला नाही / QR स्रोत पडताळलेला नाही', source_lab: 'प्रयोगशाळा अहवाल', source_manufacturer: 'उत्पादकाचे लेबल',
    source_measured: 'शेतकऱ्याने मोजलेले', source_reference: 'संदर्भ मूल्य', source_simulated: 'सिम्युलेटेड डेमो मूल्ये',
    source_shared_note: 'हा स्रोत या नमुन्यासाठी भरलेल्या सर्व मूल्यांना लागू आहे.', source_user_entered: 'वापरकर्त्याने नोंदवलेले / इतर',
    tools_animal_category: 'जनावराचा वर्ग', tools_body_weight: 'शरीराचे वजन (किलो, ऐच्छिक)',
    tools_daily_milk: 'दैनिक दूध (लिटर, ऐच्छिक)', tools_pregnancy: 'गर्भधारणेची स्थिती', tools_composition_source: 'घटक माहितीचा स्रोत',
    tools_current_fibre: 'सध्याचे फायबर %', tools_alternative_fibre: 'पर्यायी फायबर %',
    tools_current_energy: 'सध्याची ऊर्जा MJ/kg', tools_alternative_energy: 'पर्यायी ऊर्जा MJ/kg'
});

Object.assign(translations.en, {
    dashboard_silage_title: 'Latest silage observation', dashboard_silage_note: 'Farmer-reported observations, not a laboratory result.',
    dashboard_silage_signin: 'Sign in to view saved silage observations.', dashboard_silage_none: 'No saved silage observation yet.',
    dashboard_silage_status: '{sample} · {date} · {count} warning sign(s) recorded. This is an observation, not a safety result.',
    dashboard_yield_title: 'Milk yield trend', dashboard_yield_empty: 'Sign in and save at least two dated milk entries to see a trend.',
    dashboard_yield_note: 'Entries show a timeline, not the cause of a change.',
    dashboard_yield_need_two: 'Save at least two dated entries for this animal/group to see a trend.',
    dashboard_chart_unavailable: 'Chart library is unavailable; saved milk entries remain available in Farm Tools.',
    dashboard_yield_error: 'Could not load saved milk-yield entries.', dashboard_yield_series: 'Recorded milk (L)', dashboard_yield_unit: 'Litres',
    dashboard_yield_caution: 'Timeline only; this does not establish cause.'
});
Object.assign(translations.hi, {
    dashboard_silage_title: 'सबसे हाल का साइलेज निरीक्षण', dashboard_silage_note: 'किसान के बताए निरीक्षण; प्रयोगशाला परिणाम नहीं।',
    dashboard_silage_signin: 'सहेजे गए साइलेज निरीक्षण देखने के लिए साइन इन करें।', dashboard_silage_none: 'अभी कोई साइलेज निरीक्षण सहेजा नहीं गया।',
    dashboard_silage_status: '{sample} · {date} · {count} चेतावनी संकेत दर्ज। यह निरीक्षण है, सुरक्षा परिणाम नहीं।',
    dashboard_yield_title: 'दूध उत्पादन का रुझान', dashboard_yield_empty: 'रुझान देखने के लिए साइन इन कर कम-से-कम दो तारीख वाली प्रविष्टियाँ सहेजें।',
    dashboard_yield_note: 'प्रविष्टियाँ समय का क्रम दिखाती हैं, बदलाव का कारण नहीं।', dashboard_yield_need_two: 'रुझान देखने के लिए इस पशु/समूह की कम-से-कम दो तारीख वाली प्रविष्टियाँ सहेजें।',
    dashboard_chart_unavailable: 'चार्ट उपलब्ध नहीं है; सहेजी गई प्रविष्टियाँ Farm Tools में उपलब्ध रहेंगी।', dashboard_yield_error: 'सहेजी गई दूध प्रविष्टियाँ लोड नहीं हुईं।',
    dashboard_yield_series: 'दर्ज दूध (L)', dashboard_yield_unit: 'लीटर', dashboard_yield_caution: 'यह समय का क्रम है; कारण सिद्ध नहीं होता।'
});
Object.assign(translations.ta, {
    dashboard_silage_title: 'சமீபத்திய சைலேஜ் கவனிப்பு', dashboard_silage_note: 'விவசாயி தெரிவித்த கவனிப்பு; ஆய்வக முடிவு அல்ல.',
    dashboard_silage_signin: 'சேமித்த சைலேஜ் கவனிப்புகளைக் காண உள்நுழையவும்.', dashboard_silage_none: 'சேமித்த சைலேஜ் கவனிப்பு இன்னும் இல்லை.',
    dashboard_silage_status: '{sample} · {date} · {count} எச்சரிக்கை அறிகுறிகள் பதிவு. இது கவனிப்பு; பாதுகாப்பு முடிவு அல்ல.',
    dashboard_yield_title: 'பால் மகசூல் போக்கு', dashboard_yield_empty: 'போக்கைக் காண உள்நுழைந்து தேதியுடன் குறைந்தது இரண்டு பால் பதிவுகளைச் சேமிக்கவும்.',
    dashboard_yield_note: 'பதிவுகள் காலவரிசையைக் காட்டும்; மாற்றத்திற்கான காரணத்தை அல்ல.', dashboard_yield_need_two: 'இந்த விலங்கு/குழுவின் போக்கைக் காண தேதியுடன் குறைந்தது இரண்டு பதிவுகளைச் சேமிக்கவும்.',
    dashboard_chart_unavailable: 'வரைபட வசதி இல்லை; சேமித்த பதிவுகள் Farm Tools-இல் கிடைக்கும்.', dashboard_yield_error: 'சேமித்த பால் பதிவுகளை ஏற்ற முடியவில்லை.',
    dashboard_yield_series: 'பதிவு செய்த பால் (L)', dashboard_yield_unit: 'லிட்டர்கள்', dashboard_yield_caution: 'இது காலவரிசை மட்டுமே; காரணத்தை நிரூபிக்காது.'
});
Object.assign(translations.te, {
    dashboard_silage_title: 'ఇటీవలి సైలేజ్ పరిశీలన', dashboard_silage_note: 'రైతు తెలిపిన పరిశీలన; ప్రయోగశాల ఫలితం కాదు.',
    dashboard_silage_signin: 'సేవ్ చేసిన సైలేజ్ పరిశీలనలను చూడటానికి సైన్ ఇన్ చేయండి.', dashboard_silage_none: 'ఇంకా సైలేజ్ పరిశీలన సేవ్ చేయలేదు.',
    dashboard_silage_status: '{sample} · {date} · {count} హెచ్చరిక సూచనలు నమోదు. ఇది పరిశీలన మాత్రమే, భద్రతా ఫలితం కాదు.',
    dashboard_yield_title: 'పాల దిగుబడి ధోరణి', dashboard_yield_empty: 'ధోరణి చూడటానికి సైన్ ఇన్ చేసి తేదీతో కనీసం రెండు పాల నమోదులు సేవ్ చేయండి.',
    dashboard_yield_note: 'నమోదులు కాలక్రమాన్ని చూపుతాయి; మార్పుకు కారణాన్ని కాదు.', dashboard_yield_need_two: 'ఈ జంతువు/సమూహానికి ధోరణి చూడటానికి తేదీతో కనీసం రెండు నమోదులు సేవ్ చేయండి.',
    dashboard_chart_unavailable: 'చార్ట్ అందుబాటులో లేదు; సేవ్ చేసిన నమోదులు Farm Tools‌లో ఉంటాయి.', dashboard_yield_error: 'సేవ్ చేసిన పాల నమోదులను లోడ్ చేయలేకపోయాం.',
    dashboard_yield_series: 'నమోదు చేసిన పాలు (L)', dashboard_yield_unit: 'లీటర్లు', dashboard_yield_caution: 'ఇది కాలక్రమం మాత్రమే; కారణాన్ని నిర్ధారించదు.'
});
Object.assign(translations.mr, {
    dashboard_silage_title: 'अलीकडील सायलेज निरीक्षण', dashboard_silage_note: 'शेतकऱ्याने नोंदवलेले निरीक्षण; प्रयोगशाळेचा निकाल नाही.',
    dashboard_silage_signin: 'जतन केलेली सायलेज निरीक्षणे पाहण्यासाठी साइन इन करा.', dashboard_silage_none: 'अजून सायलेज निरीक्षण जतन केलेले नाही.',
    dashboard_silage_status: '{sample} · {date} · {count} इशारा संकेत नोंदवले. हे निरीक्षण आहे, सुरक्षिततेचा निकाल नाही.',
    dashboard_yield_title: 'दूध उत्पादनाचा कल', dashboard_yield_empty: 'कल पाहण्यासाठी साइन इन करून तारखेसह किमान दोन दूध नोंदी जतन करा.',
    dashboard_yield_note: 'नोंदी कालरेषा दाखवतात; बदलाचे कारण नाही.', dashboard_yield_need_two: 'या जनावर/गटाचा कल पाहण्यासाठी तारखेसह किमान दोन नोंदी जतन करा.',
    dashboard_chart_unavailable: 'चार्ट उपलब्ध नाही; जतन केलेल्या नोंदी Farm Tools मध्ये राहतील.', dashboard_yield_error: 'जतन केलेल्या दूध नोंदी लोड करता आल्या नाहीत.',
    dashboard_yield_series: 'नोंदवलेले दूध (L)', dashboard_yield_unit: 'लिटर', dashboard_yield_caution: 'ही फक्त कालरेषा आहे; कारण सिद्ध होत नाही.'
});

Object.assign(translations.en, {
    login_identifier: 'Username or email', tools_sample_screening: 'Sample screening',
    tools_sample_screening_title: 'Silage and contamination checks',
    tools_sample_screening_desc: 'Record silage observations or a sample concern. Neither is a laboratory confirmation.',
    image_preview_note: 'Photo preview only; no image classifier is connected.',
    image_silage_link: 'Record silage observations',
    image_no_file: 'Choose a photo to preview. Photos are not analyzed here; enter report values under Details or record silage observations in Farm Tools.',
    image_preview_only: 'Photo preview is ready, but no image classifier is connected. Use Details with values from a feed report, or Farm Tools to record silage observations.',
    image_observe_legend: 'What can you see in the photo?', image_observe_mould: 'Mould-like patches',
    image_observe_colour: 'Unusual colour', image_observe_foreign: 'Visible foreign material',
    image_observe_wet_heat: 'Wet, heated, or damaged feed',
    image_observe_note: 'These are your observations; the photo is not automatically analyzed.',
    image_observation_prompt: 'Photo preview is ready. Select any visible warning signs you observe, then Analyze. The photo is not automatically classified.',
    image_result_title: 'Photo observation screen (not AI)', image_result_photo: 'Photo', image_result_findings: 'Signs you selected',
    image_result_none: 'No warning signs selected. This does not establish safety.',
    image_result_caution: 'The image was not automatically analyzed. These are farmer-selected observations, not a diagnosis or toxin test.',
    image_result_warning: 'Warning signs were selected. Keep seriously affected feed separate and seek expert or laboratory review.',
    image_result_no_warning: 'No listed warning sign was selected. Appearance alone cannot confirm feed safety.',
    qr_input_desc: 'Scan a private DiaryLens report QR or a JSON QR containing measurement values',
    qr_create: 'Create QR', qr_download: 'Download QR',
    qr_private_note: 'This QR opens the saved report and requires the same account to sign in.',
    qr_measurement_note: 'This QR contains your entered values; scanning can prefill them. It is not a certified result.'
});
Object.assign(translations.hi, {
    login_identifier: 'उपयोगकर्ता नाम या ईमेल', tools_sample_screening: 'नमूना जाँच',
    tools_sample_screening_title: 'साइलेज और दूषण जाँच',
    tools_sample_screening_desc: 'साइलेज निरीक्षण या नमूने की चिंता दर्ज करें। यह प्रयोगशाला पुष्टि नहीं है।',
    image_preview_note: 'फोटो केवल पूर्वावलोकन है; छवि वर्गीकरण मॉडल उपलब्ध नहीं है।', image_silage_link: 'साइलेज निरीक्षण दर्ज करें',
    image_no_file: 'पूर्वावलोकन के लिए फोटो चुनें। यहाँ फोटो का विश्लेषण नहीं होता; Details में रिपोर्ट के मान भरें या Farm Tools में साइलेज निरीक्षण दर्ज करें।',
    image_preview_only: 'फोटो पूर्वावलोकन तैयार है, लेकिन छवि वर्गीकरण मॉडल नहीं है। रिपोर्ट के मानों के लिए Details चुनें या Farm Tools में साइलेज निरीक्षण दर्ज करें।',
    image_observe_legend: 'फोटो में आपको क्या दिखाई देता है?', image_observe_mould: 'फफूँद जैसे धब्बे', image_observe_colour: 'असामान्य रंग',
    image_observe_foreign: 'दिखाई देने वाली बाहरी सामग्री', image_observe_wet_heat: 'गीला, गर्म या क्षतिग्रस्त चारा',
    image_observe_note: 'ये आपके निरीक्षण हैं; फोटो का अपने-आप विश्लेषण नहीं होता।',
    image_observation_prompt: 'फोटो का पूर्वावलोकन तैयार है। दिखने वाले चेतावनी संकेत चुनें और Analyze दबाएँ। फोटो का स्वचालित वर्गीकरण नहीं होता।',
    image_result_title: 'फोटो निरीक्षण स्क्रीन (AI नहीं)', image_result_photo: 'फोटो', image_result_findings: 'आपने चुने संकेत',
    image_result_none: 'कोई चेतावनी संकेत नहीं चुना। इससे सुरक्षा प्रमाणित नहीं होती।',
    image_result_caution: 'फोटो का स्वचालित विश्लेषण नहीं हुआ। ये किसान के निरीक्षण हैं, निदान या विष परीक्षण नहीं।',
    image_result_warning: 'चेतावनी संकेत चुने गए। गंभीर रूप से प्रभावित चारा अलग रखें और विशेषज्ञ/प्रयोगशाला से जाँच लें।',
    image_result_no_warning: 'कोई सूचीबद्ध संकेत नहीं चुना गया। केवल दिखावट से सुरक्षा की पुष्टि नहीं होती।',
    qr_input_desc: 'निजी DiaryLens रिपोर्ट QR या माप वाले JSON QR को स्कैन करें',
    qr_create: 'QR बनाएँ', qr_download: 'QR डाउनलोड करें', qr_private_note: 'यह QR सहेजी गई रिपोर्ट खोलता है; उसी खाते से साइन इन करना होगा।',
    qr_measurement_note: 'इस QR में आपके दर्ज मान हैं; स्कैन करने पर वे फॉर्म में भरेंगे। यह प्रमाणित परिणाम नहीं है।'
});
Object.assign(translations.ta, {
    login_identifier: 'பயனர்பெயர் அல்லது மின்னஞ்சல்', tools_sample_screening: 'மாதிரி திரையிடல்',
    tools_sample_screening_title: 'சைலேஜ் மற்றும் மாசு சரிபார்ப்பு',
    tools_sample_screening_desc: 'சைலேஜ் கவனிப்புகள் அல்லது மாதிரி குறித்த கவலையைப் பதிவு செய்யுங்கள். இது ஆய்வக உறுதிப்படுத்தல் அல்ல.',
    image_preview_note: 'பட முன்னோட்டம் மட்டுமே; பட வகைப்படுத்தி இணைக்கப்படவில்லை.', image_silage_link: 'சைலேஜ் கவனிப்புகளைப் பதிவு செய்க',
    image_no_file: 'முன்னோட்டத்திற்கு ஒரு படத்தைத் தேர்ந்தெடுக்கவும். இங்கு படம் பகுப்பாய்வு செய்யப்படாது; Details-ல் அறிக்கை மதிப்புகளை உள்ளிடவும் அல்லது Farm Tools-ல் சைலேஜ் கவனிப்புகளைப் பதிவு செய்யவும்.',
    image_preview_only: 'பட முன்னோட்டம் தயார்; ஆனால் பட வகைப்படுத்தி இல்லை. அறிக்கை மதிப்புகளுக்கு Details-ஐப் பயன்படுத்தவும் அல்லது Farm Tools-ல் சைலேஜ் கவனிப்புகளைப் பதிவு செய்யவும்.',
    image_observe_legend: 'படத்தில் நீங்கள் என்ன பார்க்கிறீர்கள்?', image_observe_mould: 'பூஞ்சை போன்ற தழும்புகள்', image_observe_colour: 'வழக்கமற்ற நிறம்',
    image_observe_foreign: 'தெரியும் வெளிப்பொருள்', image_observe_wet_heat: 'ஈரமான, சூடான அல்லது சேதமடைந்த தீவனம்',
    image_observe_note: 'இவை நீங்கள் கூறும் கவனிப்புகள்; படம் தானாகப் பகுப்பாய்வு செய்யப்படாது.',
    image_observation_prompt: 'பட முன்னோட்டம் தயார். தெரியும் எச்சரிக்கை அறிகுறிகளைத் தேர்ந்தெடுத்து Analyze அழுத்துங்கள். படம் தானாக வகைப்படுத்தப்படாது.',
    image_result_title: 'படக் கவனிப்பு திரையிடல் (AI அல்ல)', image_result_photo: 'படம்', image_result_findings: 'நீங்கள் தேர்ந்த அறிகுறிகள்',
    image_result_none: 'எச்சரிக்கை அறிகுறி எதுவும் தேர்ந்தெடுக்கப்படவில்லை. இது பாதுகாப்பை உறுதிப்படுத்தாது.',
    image_result_caution: 'படம் தானாகப் பகுப்பாய்வு செய்யப்படவில்லை. இவை விவசாயியின் கவனிப்புகள்; நோயறிதலோ நச்சுப் பரிசோதனையோ அல்ல.',
    image_result_warning: 'எச்சரிக்கை அறிகுறிகள் தேர்ந்தெடுக்கப்பட்டன. கடுமையாகப் பாதித்த தீவனத்தைத் தனியாக வைத்து நிபுணர்/ஆய்வகத்தை அணுகுங்கள்.',
    image_result_no_warning: 'பட்டியலிலுள்ள அறிகுறி எதுவும் தேர்ந்தெடுக்கப்படவில்லை. தோற்றம் மட்டும் பாதுகாப்பை உறுதிப்படுத்தாது.',
    qr_input_desc: 'தனிப்பட்ட DiaryLens அறிக்கை QR அல்லது அளவுகள் உள்ள JSON QR-ஐ ஸ்கேன் செய்க',
    qr_create: 'QR உருவாக்கு', qr_download: 'QR பதிவிறக்கு', qr_private_note: 'இந்த QR சேமித்த அறிக்கையைத் திறக்கும்; அதே கணக்கில் உள்நுழைய வேண்டும்.',
    qr_measurement_note: 'இந்த QR-ல் நீங்கள் உள்ளிட்ட மதிப்புகள் உள்ளன; ஸ்கேன் செய்தால் படிவத்தில் நிரப்பலாம். இது சான்றளிக்கப்பட்ட முடிவு அல்ல.'
});
Object.assign(translations.te, {
    login_identifier: 'వినియోగదారు పేరు లేదా ఇమెయిల్', tools_sample_screening: 'నమూనా స్క్రీనింగ్',
    tools_sample_screening_title: 'సైలేజ్ మరియు కాలుష్య పరిశీలన',
    tools_sample_screening_desc: 'సైలేజ్ పరిశీలనలు లేదా నమూనా ఆందోళనను నమోదు చేయండి. ఇది ప్రయోగశాల నిర్ధారణ కాదు.',
    image_preview_note: 'ఫోటో ప్రివ్యూ మాత్రమే; చిత్ర వర్గీకరణ మోడల్ అనుసంధానించలేదు.', image_silage_link: 'సైలేజ్ పరిశీలనలను నమోదు చేయండి',
    image_no_file: 'ప్రివ్యూ కోసం ఫోటో ఎంచుకోండి. ఇక్కడ ఫోటో విశ్లేషణ జరగదు; Details‌లో నివేదిక విలువలు నమోదు చేయండి లేదా Farm Tools‌లో సైలేజ్ పరిశీలనలు నమోదు చేయండి.',
    image_preview_only: 'ఫోటో ప్రివ్యూ సిద్ధంగా ఉంది; కానీ చిత్ర వర్గీకరణ మోడల్ లేదు. నివేదిక విలువలకు Details వాడండి లేదా Farm Tools‌లో సైలేజ్ పరిశీలనలు నమోదు చేయండి.',
    image_observe_legend: 'ఫోటోలో మీకు ఏమి కనిపిస్తోంది?', image_observe_mould: 'బూజు వంటి మచ్చలు', image_observe_colour: 'అసాధారణ రంగు',
    image_observe_foreign: 'కనిపించే విదేశీ పదార్థం', image_observe_wet_heat: 'తడి, వేడెక్కిన లేదా దెబ్బతిన్న మేత',
    image_observe_note: 'ఇవి మీరు తెలిపిన పరిశీలనలు; ఫోటోను స్వయంచాలకంగా విశ్లేషించరు.',
    image_observation_prompt: 'ఫోటో ప్రివ్యూ సిద్ధంగా ఉంది. కనిపించే హెచ్చరిక సూచనలను ఎంచుకుని Analyze నొక్కండి. ఫోటో స్వయంచాలకంగా వర్గీకరించబడదు.',
    image_result_title: 'ఫోటో పరిశీలన స్క్రీనింగ్ (AI కాదు)', image_result_photo: 'ఫోటో', image_result_findings: 'మీరు ఎంచుకున్న సూచనలు',
    image_result_none: 'హెచ్చరిక సూచనలు ఎంచుకోలేదు. ఇది భద్రతను నిర్ధారించదు.',
    image_result_caution: 'ఫోటోను స్వయంచాలకంగా విశ్లేషించలేదు. ఇవి రైతు పరిశీలనలు మాత్రమే; నిర్ధారణ లేదా విష పరీక్ష కాదు.',
    image_result_warning: 'హెచ్చరిక సూచనలు ఎంచుకున్నారు. తీవ్రంగా ప్రభావితమైన మేతను వేరుచేసి నిపుణుడు/ప్రయోగశాలను సంప్రదించండి.',
    image_result_no_warning: 'జాబితాలోని సూచనలు ఏవీ ఎంచుకోలేదు. రూపం మాత్రమే భద్రతను నిర్ధారించదు.',
    qr_input_desc: 'ప్రైవేట్ DiaryLens నివేదిక QR లేదా కొలతల JSON QR స్కాన్ చేయండి',
    qr_create: 'QR సృష్టించండి', qr_download: 'QR డౌన్‌లోడ్ చేయండి', qr_private_note: 'ఈ QR సేవ్ చేసిన నివేదికను తెరుస్తుంది; అదే ఖాతాతో సైన్ ఇన్ చేయాలి.',
    qr_measurement_note: 'ఈ QR‌లో మీరు నమోదు చేసిన విలువలు ఉంటాయి; స్కాన్ చేస్తే ఫారమ్‌లో నింపవచ్చు. ఇది ధృవీకరించిన ఫలితం కాదు.'
});
Object.assign(translations.mr, {
    login_identifier: 'वापरकर्तानाव किंवा ईमेल', tools_sample_screening: 'नमुना तपासणी',
    tools_sample_screening_title: 'सायलेज आणि दूषण तपासणी',
    tools_sample_screening_desc: 'सायलेज निरीक्षणे किंवा नमुन्याबद्दलची चिंता नोंदवा. ही प्रयोगशाळेची पुष्टी नाही.',
    image_preview_note: 'फोटोचे फक्त पूर्वदृश्य; प्रतिमा वर्गीकरण मॉडेल जोडलेले नाही.', image_silage_link: 'सायलेज निरीक्षण नोंदवा',
    image_no_file: 'पूर्वदृश्यासाठी फोटो निवडा. येथे फोटोचे विश्लेषण होत नाही; Details मध्ये अहवालातील मूल्ये भरा किंवा Farm Tools मध्ये सायलेज निरीक्षण नोंदवा.',
    image_preview_only: 'फोटोचे पूर्वदृश्य तयार आहे, पण प्रतिमा वर्गीकरण मॉडेल नाही. अहवालातील मूल्यांसाठी Details वापरा किंवा Farm Tools मध्ये सायलेज निरीक्षण नोंदवा.',
    image_observe_legend: 'फोटोमध्ये तुम्हाला काय दिसते?', image_observe_mould: 'बुरशीसारखे डाग', image_observe_colour: 'असामान्य रंग',
    image_observe_foreign: 'दिसणारी परकी वस्तू', image_observe_wet_heat: 'ओला, गरम किंवा खराब झालेला चारा',
    image_observe_note: 'ही तुमची निरीक्षणे आहेत; फोटोचे आपोआप विश्लेषण होत नाही.',
    image_observation_prompt: 'फोटोचे पूर्वदृश्य तयार आहे. दिसणारे इशारा संकेत निवडा आणि Analyze दाबा. फोटोचे स्वयंचलित वर्गीकरण होत नाही.',
    image_result_title: 'फोटो निरीक्षण तपासणी (AI नाही)', image_result_photo: 'फोटो', image_result_findings: 'तुम्ही निवडलेले संकेत',
    image_result_none: 'इशारा संकेत निवडले नाहीत. याने सुरक्षितता सिद्ध होत नाही.',
    image_result_caution: 'फोटोचे स्वयंचलित विश्लेषण झाले नाही. ही शेतकऱ्याची निरीक्षणे आहेत; निदान किंवा विष चाचणी नाही.',
    image_result_warning: 'इशारा संकेत निवडले. गंभीररीत्या प्रभावित चारा वेगळा ठेवा आणि तज्ज्ञ/प्रयोगशाळेशी संपर्क करा.',
    image_result_no_warning: 'यादीतील कोणताही संकेत निवडला नाही. फक्त दिसण्यावरून सुरक्षितता ठरत नाही.',
    qr_input_desc: 'खाजगी DiaryLens अहवाल QR किंवा मोजमाप असलेला JSON QR स्कॅन करा',
    qr_create: 'QR तयार करा', qr_download: 'QR डाउनलोड करा', qr_private_note: 'हा QR जतन केलेला अहवाल उघडतो; त्याच खात्यात साइन इन करावे लागेल.',
    qr_measurement_note: 'या QR मध्ये तुम्ही भरलेली मूल्ये आहेत; स्कॅन केल्यावर ती फॉर्ममध्ये भरतील. हा प्रमाणित निकाल नाही.'
});

const staticTextTranslations = {
    hi: {
        'Quick Links': 'त्वरित लिंक', 'Test Feed': 'चारा जाँच', 'Technologies': 'तकनीक', 'Contact': 'संपर्क', 'India': 'भारत',
        'Software prototype for cattle feed & silage quality support': 'पशु चारा और साइलेज गुणवत्ता सहायता का सॉफ्टवेयर प्रोटोटाइप',
        'Software-generated demo readings': 'सॉफ्टवेयर से बने डेमो मान', 'Python AI/ML model': 'Python AI/ML मॉडल',
        'Local SQLite history': 'स्थानीय SQLite इतिहास', 'Mobile-friendly web UI': 'मोबाइल-अनुकूल वेब इंटरफेस',
        'All rights reserved.': 'सर्वाधिकार सुरक्षित।',
        'View test history, metrics, and summaries.': 'जाँच इतिहास, माप और सारांश देखें।',
        'Advisory & Reports': 'सलाह और रिपोर्ट', 'Read advisories and previous analysis reports.': 'सलाह और पिछली विश्लेषण रिपोर्ट पढ़ें।',
        'Software-only prototype.': 'केवल सॉफ्टवेयर प्रोटोटाइप।',
        'Enter values from a report or use optional simulated demo values. No external sensor is connected; image upload is preview-only and does not run image classification.': 'रिपोर्ट के मान भरें या वैकल्पिक सिम्युलेटेड डेमो मान चुनें। कोई बाहरी सेंसर जुड़ा नहीं है; फोटो केवल पूर्वावलोकन है, छवि वर्गीकरण नहीं होता।',
        'Simulated demo readings · auto-updating': 'सिम्युलेटेड डेमो मान · अपने-आप बदलते हैं',
        'Changing readings are generated by software; they are not live sensor measurements.': 'बदलते मान सॉफ्टवेयर से बनते हैं; ये लाइव सेंसर माप नहीं हैं।',
        'Local database · sign in to save reports': 'स्थानीय डेटाबेस · रिपोर्ट सहेजने के लिए साइन इन करें',
        'Select Available Inputs': 'उपलब्ध इनपुट चुनें', 'Select one or more inputs available for this test': 'इस जाँच के लिए उपलब्ध एक या अधिक इनपुट चुनें',
        'IMAGE': 'फोटो', 'DETAILS': 'विवरण', 'Enter values from a feed report': 'चारा रिपोर्ट के मान भरें', 'Available Inputs:': 'उपलब्ध इनपुट:',
        'Analyze': 'विश्लेषण करें', 'Feed Testing': 'चारा जाँच', 'Silage Testing': 'साइलेज जाँच',
        'Welcome to DiaryLens': 'DiaryLens में आपका स्वागत है', 'Understand feed quality and find practical guidance for better feed management.': 'चारे की गुणवत्ता समझें और बेहतर प्रबंधन के लिए उपयोगी सलाह देखें।',
        'Start Feed Test': 'चारा जाँच शुरू करें', 'Check Silage': 'साइलेज जाँचें', 'View Reports': 'रिपोर्ट देखें',
        'From': 'से', 'To': 'तक', 'Type': 'प्रकार', 'All types': 'सभी प्रकार', 'Cattle feed': 'पशु चारा', 'Green fodder': 'हरा चारा', 'Concentrate': 'सांद्र मिश्रण', 'Mineral mixture': 'खनिज मिश्रण',
        'Apply filters': 'फ़िल्टर लागू करें', 'Clear': 'साफ़ करें', 'No saved results to display yet.': 'दिखाने के लिए अभी कोई सहेजा परिणाम नहीं है।',
        'Recent Reports': 'हाल की रिपोर्ट', 'Needs attention': 'ध्यान देने की आवश्यकता', 'Practical help': 'उपयोगी सहायता',
        'Choose feed or silage.': 'चारा या साइलेज चुनें।', 'Enter measured values.': 'मापे गए मान भरें।', 'Review the result and its limitations.': 'परिणाम और उसकी सीमाएँ देखें।',
        'Saved test reports': 'सहेजी गई जाँच रिपोर्ट', 'Search ID': 'आईडी खोजें', 'Search': 'खोजें',
        'What it demonstrates': 'यह क्या दिखाता है', 'Data used': 'उपयोग किया गया डेटा', 'Current limitations': 'वर्तमान सीमाएँ', 'For dependable decisions': 'विश्वसनीय निर्णयों के लिए',
        'Manually entered values from an existing report': 'मौजूदा रिपोर्ट से हाथ से दर्ज किए मान', 'Optional browser-generated demo values, labelled simulated': 'वैकल्पिक ब्राउज़र डेमो मान, सिम्युलेटेड के रूप में चिह्नित',
        'The model uses generated demonstration training data': 'मॉडल में बनाया गया डेमो प्रशिक्षण डेटा उपयोग होता है', 'No field-data validation or accuracy claim': 'खेत के डेटा पर पुष्टि या सटीकता का दावा नहीं', 'No image classification or physical sensor connection': 'छवि वर्गीकरण या भौतिक सेंसर कनेक्शन नहीं',
        'No saved tests found yet.': 'अभी कोई जाँच सहेजी नहीं गई है।', 'Recent farm history': 'हाल का खेत इतिहास', 'Refresh': 'रीफ़्रेश करें', 'Filter records': 'रिकॉर्ड फ़िल्टर करें', 'Export visible records (CSV)': 'दिख रहे रिकॉर्ड CSV में निकालें'
    },
    ta: {
        'Quick Links': 'விரைவு இணைப்புகள்', 'Test Feed': 'தீவனப் பரிசோதனை', 'Technologies': 'தொழில்நுட்பங்கள்', 'Contact': 'தொடர்பு', 'India': 'இந்தியா',
        'Software prototype for cattle feed & silage quality support': 'கால்நடைத் தீவனம் மற்றும் சைலேஜ் தர ஆதரவுக்கான மென்பொருள் முன்மாதிரி',
        'Software-generated demo readings': 'மென்பொருள் உருவாக்கிய டெமோ அளவீடுகள்', 'Python AI/ML model': 'Python AI/ML மாதிரி',
        'Local SQLite history': 'உள்ளூர் SQLite வரலாறு', 'Mobile-friendly web UI': 'மொபைலுக்கு ஏற்ற இணைய இடைமுகம்',
        'All rights reserved.': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
        'View test history, metrics, and summaries.': 'பரிசோதனை வரலாறு, அளவுகள் மற்றும் சுருக்கங்களைக் காண்க.',
        'Advisory & Reports': 'ஆலோசனைகள் மற்றும் அறிக்கைகள்', 'Read advisories and previous analysis reports.': 'ஆலோசனைகளையும் முந்தைய பகுப்பாய்வு அறிக்கைகளையும் படிக்கவும்.',
        'Software-only prototype.': 'மென்பொருள் மட்டும் கொண்ட முன்மாதிரி.',
        'Enter values from a report or use optional simulated demo values. No external sensor is connected; image upload is preview-only and does not run image classification.': 'அறிக்கையிலுள்ள மதிப்புகளை உள்ளிடவும் அல்லது விருப்பமான உருவகப்படுத்தப்பட்ட டெமோ மதிப்புகளைப் பயன்படுத்தவும். வெளிப்புற உணரி இணைக்கப்படவில்லை; படம் முன்னோட்டம் மட்டுமே, பட வகைப்படுத்தல் நடக்காது.',
        'Simulated demo readings · auto-updating': 'உருவகப்படுத்தப்பட்ட டெமோ அளவீடுகள் · தானாக மாறும்',
        'Changing readings are generated by software; they are not live sensor measurements.': 'மாறும் அளவீடுகள் மென்பொருளால் உருவாக்கப்படுகின்றன; இவை நேரடி உணரி அளவீடுகள் அல்ல.',
        'Local database · sign in to save reports': 'உள்ளூர் தரவுத்தளம் · அறிக்கைகளைச் சேமிக்க உள்நுழையவும்',
        'Select Available Inputs': 'கிடைக்கும் உள்ளீடுகளைத் தேர்ந்தெடுக்கவும்', 'Select one or more inputs available for this test': 'இந்தப் பரிசோதனைக்குக் கிடைக்கும் உள்ளீடுகளில் ஒன்றையாவது தேர்ந்தெடுக்கவும்',
        'IMAGE': 'படம்', 'DETAILS': 'விவரங்கள்', 'Enter values from a feed report': 'தீவன அறிக்கையிலுள்ள மதிப்புகளை உள்ளிடவும்', 'Available Inputs:': 'கிடைக்கும் உள்ளீடுகள்:',
        'Analyze': 'பகுப்பாய்வு செய்', 'Feed Testing': 'தீவனப் பரிசோதனை', 'Silage Testing': 'சைலேஜ் பரிசோதனை',
        'Welcome to DiaryLens': 'DiaryLens-க்கு வரவேற்கிறோம்', 'Understand feed quality and find practical guidance for better feed management.': 'தீவனத் தரத்தைப் புரிந்து சிறந்த மேலாண்மைக்கான நடைமுறை வழிகாட்டுதலைப் பெறுங்கள்.',
        'Start Feed Test': 'தீவனப் பரிசோதனையைத் தொடங்கு', 'Check Silage': 'சைலேஜைச் சரிபார்', 'View Reports': 'அறிக்கைகளைக் காண்க',
        'From': 'தொடக்கம்', 'To': 'முடிவு', 'Type': 'வகை', 'All types': 'அனைத்து வகைகள்', 'Cattle feed': 'கால்நடைத் தீவனம்', 'Green fodder': 'பசுந்தீவனம்', 'Concentrate': 'அடர்தீவனக் கலவை', 'Mineral mixture': 'கனிமக் கலவை',
        'Apply filters': 'வடிகட்டிகளைப் பயன்படுத்து', 'Clear': 'அழி', 'No saved results to display yet.': 'காட்டுவதற்கு சேமித்த முடிவுகள் இன்னும் இல்லை.',
        'Recent Reports': 'சமீபத்திய அறிக்கைகள்', 'Needs attention': 'கவனம் தேவை', 'Practical help': 'நடைமுறை உதவி',
        'Choose feed or silage.': 'தீவனம் அல்லது சைலேஜைத் தேர்ந்தெடுக்கவும்.', 'Enter measured values.': 'அளந்த மதிப்புகளை உள்ளிடவும்.', 'Review the result and its limitations.': 'முடிவையும் அதன் வரம்புகளையும் பாருங்கள்.',
        'Saved test reports': 'சேமித்த பரிசோதனை அறிக்கைகள்', 'Search ID': 'ID-ஐத் தேடு', 'Search': 'தேடு',
        'What it demonstrates': 'இது காட்டுவது', 'Data used': 'பயன்படுத்திய தரவு', 'Current limitations': 'தற்போதைய வரம்புகள்', 'For dependable decisions': 'நம்பகமான முடிவுகளுக்கு',
        'Manually entered values from an existing report': 'ஏற்கெனவே உள்ள அறிக்கையிலிருந்து கைமுறையாக உள்ளிட்ட மதிப்புகள்', 'Optional browser-generated demo values, labelled simulated': 'விருப்பமான உலாவி டெமோ மதிப்புகள்; உருவகப்படுத்தப்பட்டவை எனக் குறிக்கப்பட்டவை',
        'The model uses generated demonstration training data': 'மாதிரி உருவாக்கப்பட்ட டெமோ பயிற்சித் தரவைப் பயன்படுத்துகிறது', 'No field-data validation or accuracy claim': 'களத் தரவு சரிபார்ப்போ துல்லியக் கூற்றோ இல்லை', 'No image classification or physical sensor connection': 'பட வகைப்படுத்தலும் உணரி இணைப்பும் இல்லை',
        'No saved tests found yet.': 'சேமித்த பரிசோதனைகள் இன்னும் இல்லை.', 'Recent farm history': 'சமீபத்திய பண்ணைப் பதிவு', 'Refresh': 'புதுப்பி', 'Filter records': 'பதிவுகளை வடிகட்டு', 'Export visible records (CSV)': 'தெரியும் பதிவுகளை CSV-ஆக ஏற்று'
    },
    te: {
        'Quick Links': 'త్వరిత లింకులు', 'Test Feed': 'మేత పరీక్ష', 'Technologies': 'సాంకేతికతలు', 'Contact': 'సంప్రదింపు', 'India': 'భారతదేశం',
        'Software prototype for cattle feed & silage quality support': 'పశువుల మేత మరియు సైలేజ్ నాణ్యత సహాయ సాఫ్ట్‌వేర్ నమూనా',
        'Software-generated demo readings': 'సాఫ్ట్‌వేర్ రూపొందించిన డెమో కొలతలు', 'Python AI/ML model': 'Python AI/ML నమూనా',
        'Local SQLite history': 'స్థానిక SQLite చరిత్ర', 'Mobile-friendly web UI': 'మొబైల్‌కు అనుకూల వెబ్ ఇంటర్‌ఫేస్',
        'All rights reserved.': 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
        'View test history, metrics, and summaries.': 'పరీక్షల చరిత్ర, కొలతలు, సారాంశాలు చూడండి.',
        'Advisory & Reports': 'సలహాలు మరియు నివేదికలు', 'Read advisories and previous analysis reports.': 'సలహాలు, గత విశ్లేషణ నివేదికలు చదవండి.',
        'Software-only prototype.': 'సాఫ్ట్‌వేర్ మాత్రమే ఉన్న నమూనా.',
        'Enter values from a report or use optional simulated demo values. No external sensor is connected; image upload is preview-only and does not run image classification.': 'నివేదికలోని విలువలు నమోదు చేయండి లేదా ఐచ్ఛిక అనుకరణ డెమో విలువలు వాడండి. బయటి సెన్సార్ లేదు; ఫోటో ప్రివ్యూ మాత్రమే, చిత్ర వర్గీకరణ జరగదు.',
        'Simulated demo readings · auto-updating': 'అనుకరణ డెమో కొలతలు · స్వయంచాలకంగా మారుతాయి',
        'Changing readings are generated by software; they are not live sensor measurements.': 'మారే కొలతలు సాఫ్ట్‌వేర్ రూపొందించినవి; ప్రత్యక్ష సెన్సార్ కొలతలు కావు.',
        'Local database · sign in to save reports': 'స్థానిక డేటాబేస్ · నివేదికలు సేవ్ చేయడానికి సైన్ ఇన్ చేయండి',
        'Select Available Inputs': 'అందుబాటులో ఉన్న ఇన్‌పుట్‌లను ఎంచుకోండి', 'Select one or more inputs available for this test': 'ఈ పరీక్షకు అందుబాటులో ఉన్న ఒకటి లేదా ఎక్కువ ఇన్‌పుట్‌లను ఎంచుకోండి',
        'IMAGE': 'చిత్రం', 'DETAILS': 'వివరాలు', 'Enter values from a feed report': 'మేత నివేదిక విలువలను నమోదు చేయండి', 'Available Inputs:': 'అందుబాటులో ఉన్న ఇన్‌పుట్‌లు:',
        'Analyze': 'విశ్లేషించండి', 'Feed Testing': 'మేత పరీక్ష', 'Silage Testing': 'సైలేజ్ పరీక్ష',
        'Welcome to DiaryLens': 'DiaryLens‌కు స్వాగతం', 'Understand feed quality and find practical guidance for better feed management.': 'మేత నాణ్యతను అర్థం చేసుకుని మెరుగైన నిర్వహణకు ఉపయోగకరమైన సూచనలు పొందండి.',
        'Start Feed Test': 'మేత పరీక్ష ప్రారంభించండి', 'Check Silage': 'సైలేజ్‌ను పరిశీలించండి', 'View Reports': 'నివేదికలు చూడండి',
        'From': 'నుండి', 'To': 'వరకు', 'Type': 'రకం', 'All types': 'అన్ని రకాలు', 'Cattle feed': 'పశువుల మేత', 'Green fodder': 'పచ్చి మేత', 'Concentrate': 'సాంద్రీకృత మిశ్రమం', 'Mineral mixture': 'ఖనిజ మిశ్రమం',
        'Apply filters': 'ఫిల్టర్‌లను వర్తింపజేయండి', 'Clear': 'తొలగించండి', 'No saved results to display yet.': 'చూపించడానికి సేవ్ చేసిన ఫలితాలు లేవు.',
        'Recent Reports': 'ఇటీవలి నివేదికలు', 'Needs attention': 'శ్రద్ధ అవసరం', 'Practical help': 'ఉపయోగకరమైన సహాయం',
        'Choose feed or silage.': 'మేత లేదా సైలేజ్ ఎంచుకోండి.', 'Enter measured values.': 'కొలిచిన విలువలు నమోదు చేయండి.', 'Review the result and its limitations.': 'ఫలితం, దాని పరిమితులను పరిశీలించండి.',
        'Saved test reports': 'సేవ్ చేసిన పరీక్ష నివేదికలు', 'Search ID': 'ID వెతకండి', 'Search': 'వెతకండి',
        'What it demonstrates': 'ఇది చూపించేది', 'Data used': 'ఉపయోగించిన డేటా', 'Current limitations': 'ప్రస్తుత పరిమితులు', 'For dependable decisions': 'నమ్మదగిన నిర్ణయాల కోసం',
        'Manually entered values from an existing report': 'ఇప్పటికే ఉన్న నివేదిక నుంచి చేతితో నమోదు చేసిన విలువలు', 'Optional browser-generated demo values, labelled simulated': 'ఐచ్ఛిక బ్రౌజర్ డెమో విలువలు; అనుకరణగా గుర్తించబడతాయి',
        'The model uses generated demonstration training data': 'నమూనా రూపొందించిన డెమో శిక్షణ డేటాను వాడుతుంది', 'No field-data validation or accuracy claim': 'క్షేత్ర డేటా ధృవీకరణ లేదా ఖచ్చితత్వ హామీ లేదు', 'No image classification or physical sensor connection': 'చిత్ర వర్గీకరణ లేదా భౌతిక సెన్సార్ అనుసంధానం లేదు',
        'No saved tests found yet.': 'ఇంకా సేవ్ చేసిన పరీక్షలు లేవు.', 'Recent farm history': 'ఇటీవలి వ్యవసాయ చరిత్ర', 'Refresh': 'రిఫ్రెష్', 'Filter records': 'రికార్డులను ఫిల్టర్ చేయండి', 'Export visible records (CSV)': 'కనిపించే రికార్డులను CSVగా ఎగుమతి చేయండి'
    },
    mr: {
        'Quick Links': 'जलद दुवे', 'Test Feed': 'चारा तपासणी', 'Technologies': 'तंत्रज्ञान', 'Contact': 'संपर्क', 'India': 'भारत',
        'Software prototype for cattle feed & silage quality support': 'पशुखाद्य आणि सायलेज गुणवत्ता सहाय्यासाठी सॉफ्टवेअर नमुना',
        'Software-generated demo readings': 'सॉफ्टवेअरद्वारे तयार केलेली डेमो मोजमापे', 'Python AI/ML model': 'Python AI/ML नमुना',
        'Local SQLite history': 'स्थानिक SQLite इतिहास', 'Mobile-friendly web UI': 'मोबाइलसाठी अनुकूल वेब इंटरफेस',
        'All rights reserved.': 'सर्व हक्क राखीव.',
        'View test history, metrics, and summaries.': 'तपासणी इतिहास, मोजमापे आणि सारांश पाहा.',
        'Advisory & Reports': 'सल्ले आणि अहवाल', 'Read advisories and previous analysis reports.': 'सल्ले आणि मागील विश्लेषण अहवाल वाचा.',
        'Software-only prototype.': 'फक्त सॉफ्टवेअरचा नमुना.',
        'Enter values from a report or use optional simulated demo values. No external sensor is connected; image upload is preview-only and does not run image classification.': 'अहवालातील मूल्ये भरा किंवा ऐच्छिक सिम्युलेटेड डेमो मूल्ये वापरा. बाह्य सेन्सर जोडलेला नाही; फोटो फक्त पूर्वदृश्य आहे, प्रतिमा वर्गीकरण होत नाही.',
        'Simulated demo readings · auto-updating': 'सिम्युलेटेड डेमो मोजमापे · आपोआप बदलतात',
        'Changing readings are generated by software; they are not live sensor measurements.': 'बदलणारी मोजमापे सॉफ्टवेअर तयार करते; ती प्रत्यक्ष सेन्सर मोजमापे नाहीत.',
        'Local database · sign in to save reports': 'स्थानिक डेटाबेस · अहवाल जतन करण्यासाठी साइन इन करा',
        'Select Available Inputs': 'उपलब्ध इनपुट निवडा', 'Select one or more inputs available for this test': 'या तपासणीसाठी उपलब्ध एक किंवा अधिक इनपुट निवडा',
        'IMAGE': 'प्रतिमा', 'DETAILS': 'तपशील', 'Enter values from a feed report': 'चारा अहवालातील मूल्ये भरा', 'Available Inputs:': 'उपलब्ध इनपुट:',
        'Analyze': 'विश्लेषण करा', 'Feed Testing': 'चारा तपासणी', 'Silage Testing': 'सायलेज तपासणी',
        'Welcome to DiaryLens': 'DiaryLens मध्ये स्वागत आहे', 'Understand feed quality and find practical guidance for better feed management.': 'चारा गुणवत्ता समजून घ्या आणि चांगल्या व्यवस्थापनासाठी उपयुक्त मार्गदर्शन पाहा.',
        'Start Feed Test': 'चारा तपासणी सुरू करा', 'Check Silage': 'सायलेज तपासा', 'View Reports': 'अहवाल पाहा',
        'From': 'पासून', 'To': 'पर्यंत', 'Type': 'प्रकार', 'All types': 'सर्व प्रकार', 'Cattle feed': 'गुरांचा चारा', 'Green fodder': 'हिरवा चारा', 'Concentrate': 'केंद्रित मिश्रण', 'Mineral mixture': 'खनिज मिश्रण',
        'Apply filters': 'फिल्टर लागू करा', 'Clear': 'पुसून टाका', 'No saved results to display yet.': 'दाखवण्यासाठी जतन केलेले निकाल नाहीत.',
        'Recent Reports': 'अलीकडील अहवाल', 'Needs attention': 'लक्ष देणे आवश्यक', 'Practical help': 'उपयुक्त मदत',
        'Choose feed or silage.': 'चारा किंवा सायलेज निवडा.', 'Enter measured values.': 'मोजलेली मूल्ये भरा.', 'Review the result and its limitations.': 'निकाल आणि त्याच्या मर्यादा तपासा.',
        'Saved test reports': 'जतन केलेले तपासणी अहवाल', 'Search ID': 'ID शोधा', 'Search': 'शोधा',
        'What it demonstrates': 'हे काय दाखवते', 'Data used': 'वापरलेला डेटा', 'Current limitations': 'सध्याच्या मर्यादा', 'For dependable decisions': 'विश्वसनीय निर्णयांसाठी',
        'Manually entered values from an existing report': 'विद्यमान अहवालातून हाताने भरलेली मूल्ये', 'Optional browser-generated demo values, labelled simulated': 'ऐच्छिक ब्राउझर डेमो मूल्ये; सिम्युलेटेड म्हणून दर्शवलेली',
        'The model uses generated demonstration training data': 'मॉडेल तयार केलेला डेमो प्रशिक्षण डेटा वापरते', 'No field-data validation or accuracy claim': 'क्षेत्रीय डेटा पडताळणी किंवा अचूकतेचा दावा नाही', 'No image classification or physical sensor connection': 'प्रतिमा वर्गीकरण किंवा भौतिक सेन्सर जोडणी नाही',
        'No saved tests found yet.': 'अजून तपासण्या जतन केलेल्या नाहीत.', 'Recent farm history': 'अलीकडील शेत नोंदी', 'Refresh': 'रीफ्रेश करा', 'Filter records': 'नोंदी फिल्टर करा', 'Export visible records (CSV)': 'दिसणाऱ्या नोंदी CSV मध्ये निर्यात करा'
    }
};
const englishKeyByText = new Map();
Object.assign(staticTextTranslations.hi, {
    'DIARYLENS · FARM RECORDS': 'DIARYLENS · खेत के रिकॉर्ड', '01 · SAMPLE SCREENING': '01 · नमूना जाँच', 'SILAGE': 'साइलेज',
    'Silage condition check': 'साइलेज की स्थिति जाँच', 'Record storage conditions and visible or sensory warning signs. This is not an image classifier.': 'भंडारण की स्थिति और दिखाई देने वाले या महसूस किए गए चेतावनी संकेत दर्ज करें। यह छवि वर्गीकरण नहीं है।',
    'Farmer observations': 'किसान के निरीक्षण', 'Sample ID': 'नमूना आईडी', 'Silage type': 'साइलेज प्रकार', 'Maize': 'मक्का', 'Grass': 'घास', 'Sorghum': 'ज्वार', 'Other / not sure': 'अन्य / पता नहीं',
    'Storage method': 'भंडारण विधि', 'Pit / bunker': 'गड्ढा / बंकर', 'Bag': 'बैग', 'Wrapped bale': 'लपेटी हुई गांठ', 'Storage duration (days)': 'भंडारण अवधि (दिन)',
    'Measured pH (optional)': 'मापा pH (वैकल्पिक)', 'Measured moisture % (optional)': 'मापी नमी % (वैकल्पिक)', 'Measured temperature °C (optional)': 'मापा तापमान °C (वैकल्पिक)',
    'Photo (preview only)': 'फोटो (केवल पूर्वावलोकन)', 'What did you observe?': 'आपने क्या देखा?', 'Mould-like patches': 'फफूँद जैसे धब्बे', 'Unusual or putrid smell': 'असामान्य या सड़ी गंध',
    'Unusual colour change': 'असामान्य रंग परिवर्तन', 'Unusual texture or heating': 'असामान्य बनावट या गर्मी', 'Air exposure / loose cover': 'हवा का संपर्क / ढीला ढक्कन', 'Water entry or damaged cover': 'पानी का प्रवेश या क्षतिग्रस्त ढक्कन',
    'Review and save observation': 'निरीक्षण देखें और सहेजें', 'Storage follow-up': 'भंडारण की अगली जाँच', 'Limit air and water entry, inspect the exposed face, and keep a dated note. If spoilage is extensive or animals are ill, isolate the affected feed and contact a veterinarian or laboratory.': 'हवा और पानी का प्रवेश रोकें, खुले हिस्से की जाँच करें और तारीख सहित नोट रखें। खराबी अधिक हो या पशु बीमार हों तो चारा अलग रखें और पशु चिकित्सक या प्रयोगशाला से संपर्क करें।',
    'SAMPLE CONCERNS': 'नमूने की चिंता', 'Contamination risk notes': 'दूषण संबंधी नोट', 'Record a concern and evidence without treating it as chemical confirmation.': 'चिंता और प्रमाण दर्ज करें; इसे रासायनिक पुष्टि न मानें।', 'Concern': 'चिंता', 'Possible sand / silica': 'संभावित रेत / सिलिका', 'Mould-like growth': 'फफूँद जैसी वृद्धि', 'Suspected adulteration': 'मिलावट का संदेह', 'Possible toxin concern': 'संभावित विष की चिंता', 'What was seen or reported?': 'क्या देखा या बताया गया?', 'Record concern': 'चिंता दर्ज करें',
    '02 · FARM RECORDS': '02 · खेत के रिकॉर्ड', 'Milk yield and production costs': 'दूध उत्पादन और लागत', 'Track dated entries and compare against your recorded baseline. A timeline does not show that one event caused another.': 'तारीख वाली प्रविष्टियाँ रखें और अपने पुराने मान से तुलना करें। समयक्रम किसी कारण को सिद्ध नहीं करता।',
    'Daily milk entry': 'दैनिक दूध प्रविष्टि', 'Animal / group ID': 'पशु / समूह आईडी', 'Milk yield (litres)': 'दूध उत्पादन (लीटर)', 'Feed, health, or management note (optional)': 'चारा, स्वास्थ्य या प्रबंधन नोट (वैकल्पिक)', 'Save milk entry': 'दूध प्रविष्टि सहेजें',
    'Milk production cost entry': 'दूध उत्पादन लागत प्रविष्टि', 'Feed and fodder expense (₹)': 'चारा और भूसे का खर्च (₹)', 'Other recorded costs (₹)': 'अन्य दर्ज खर्च (₹)', 'Milk produced (litres)': 'उत्पादित दूध (लीटर)', 'Sale price per litre (₹)': 'प्रति लीटर बिक्री मूल्य (₹)', 'Calculate and save': 'गणना करें और सहेजें',
    'Expenses = feed and fodder + other entered costs. Revenue = milk litres × price. Cost/litre = expenses ÷ litres (when litres > 0). Profit/loss = revenue − expenses. Only entered items are included.': 'खर्च = चारा/भूसा + अन्य दर्ज खर्च। आय = दूध लीटर × मूल्य। प्रति लीटर लागत = खर्च ÷ लीटर (जब लीटर > 0)। लाभ/हानि = आय − खर्च। केवल दर्ज मदें शामिल हैं।',
    '03 · FARMER SUPPORT': '03 · किसान सहायता', '04 · SAVED RECORDS': '04 · सहेजे रिकॉर्ड', 'Recent farm history': 'हाल के खेत रिकॉर्ड', 'Account records are stored in this project’s local SQLite database. Unsigned records stay in this browser only.': 'खाता रिकॉर्ड इस प्रोजेक्ट के स्थानीय SQLite डेटाबेस में रहते हैं। बिना साइन-इन रिकॉर्ड केवल इस ब्राउज़र में रहते हैं।',
    'Refresh': 'रीफ़्रेश करें', 'Search sample / group': 'नमूना / समूह खोजें', 'Record type': 'रिकॉर्ड प्रकार', 'All records': 'सभी रिकॉर्ड', 'Feed sample': 'चारा नमूना', 'Milk yield': 'दूध उत्पादन', 'Costs': 'खर्च', 'From': 'से', 'Saved on': 'सहेजने का स्थान', 'Any location': 'कोई भी स्थान', 'Project account': 'प्रोजेक्ट खाता', 'This device only': 'केवल यह डिवाइस', 'Filter records': 'रिकॉर्ड फ़िल्टर करें', 'Export visible records (CSV)': 'दिख रहे रिकॉर्ड CSV में निकालें',
    'DiaryLens · SIH26111 · Local prototype; not a substitute for laboratory or veterinary advice.': 'DiaryLens · SIH26111 · स्थानीय प्रोटोटाइप; प्रयोगशाला या पशु चिकित्सक की सलाह का विकल्प नहीं।'
});
Object.assign(staticTextTranslations.ta, {
    'DIARYLENS · FARM RECORDS': 'DIARYLENS · பண்ணைப் பதிவுகள்', '01 · SAMPLE SCREENING': '01 · மாதிரி திரையிடல்', 'SILAGE': 'சைலேஜ்',
    'Silage condition check': 'சைலேஜ் நிலை சரிபார்ப்பு', 'Record storage conditions and visible or sensory warning signs. This is not an image classifier.': 'சேமிப்பு நிலை மற்றும் தெரியும்/உணரப்படும் எச்சரிக்கை அறிகுறிகளைப் பதிவு செய்யுங்கள். இது பட வகைப்படுத்தி அல்ல.',
    'Farmer observations': 'விவசாயியின் கவனிப்புகள்', 'Sample ID': 'மாதிரி ID', 'Silage type': 'சைலேஜ் வகை', 'Maize': 'மக்காச்சோளம்', 'Grass': 'புல்', 'Sorghum': 'சோளம்', 'Other / not sure': 'மற்றவை / தெரியவில்லை',
    'Storage method': 'சேமிப்பு முறை', 'Pit / bunker': 'குழி / பங்கர்', 'Bag': 'பை', 'Wrapped bale': 'சுற்றப்பட்ட கட்டு', 'Storage duration (days)': 'சேமிப்பு காலம் (நாட்கள்)',
    'Measured pH (optional)': 'அளந்த pH (விருப்பம்)', 'Measured moisture % (optional)': 'அளந்த ஈரப்பதம் % (விருப்பம்)', 'Measured temperature °C (optional)': 'அளந்த வெப்பநிலை °C (விருப்பம்)',
    'Photo (preview only)': 'படம் (முன்னோட்டம் மட்டும்)', 'What did you observe?': 'நீங்கள் என்ன கவனித்தீர்கள்?', 'Mould-like patches': 'பூஞ்சை போன்ற தழும்புகள்', 'Unusual or putrid smell': 'வழக்கமற்ற அல்லது அழுகிய மணம்',
    'Unusual colour change': 'வழக்கமற்ற நிற மாற்றம்', 'Unusual texture or heating': 'வழக்கமற்ற அமைப்பு அல்லது வெப்பம்', 'Air exposure / loose cover': 'காற்று புகுதல் / தளர்ந்த மூடி', 'Water entry or damaged cover': 'நீர் புகுதல் அல்லது சேதமான மூடி',
    'Review and save observation': 'கவனிப்பைச் சரிபார்த்து சேமி', 'Storage follow-up': 'சேமிப்பு தொடர்கண்காணிப்பு', 'Limit air and water entry, inspect the exposed face, and keep a dated note. If spoilage is extensive or animals are ill, isolate the affected feed and contact a veterinarian or laboratory.': 'காற்று/நீர் புகுதலைக் குறைத்து, திறந்த பகுதியைப் பார்த்து, தேதியுடன் பதிவு செய்யுங்கள். அதிக கெடுதல் அல்லது விலங்கு நோய் இருந்தால் தீவனத்தைத் தனிமைப்படுத்தி மருத்துவர் அல்லது ஆய்வகத்தை அணுகுங்கள்.',
    'SAMPLE CONCERNS': 'மாதிரி கவலைகள்', 'Contamination risk notes': 'மாசு குறித்த குறிப்புகள்', 'Record a concern and evidence without treating it as chemical confirmation.': 'கவலையையும் ஆதாரத்தையும் பதிவு செய்யுங்கள்; இதை ரசாயன உறுதிப்படுத்தலாகக் கருத வேண்டாம்.', 'Concern': 'கவலை', 'Possible sand / silica': 'மணல் / சிலிகா இருக்கலாம்', 'Mould-like growth': 'பூஞ்சை போன்ற வளர்ச்சி', 'Suspected adulteration': 'கலப்படம் இருக்கலாம்', 'Possible toxin concern': 'நச்சு குறித்த சந்தேகம்', 'What was seen or reported?': 'என்ன பார்த்தீர்கள் அல்லது தெரிவிக்கப்பட்டது?', 'Record concern': 'கவலையைப் பதிவு செய்',
    '02 · FARM RECORDS': '02 · பண்ணைப் பதிவுகள்', 'Milk yield and production costs': 'பால் உற்பத்தி மற்றும் செலவுகள்', 'Track dated entries and compare against your recorded baseline. A timeline does not show that one event caused another.': 'தேதியிட்ட பதிவுகளைச் செய்து முந்தைய பதிவுடன் ஒப்பிடுங்கள். காலவரிசை மட்டும் காரணத்தை நிரூபிக்காது.',
    'Daily milk entry': 'தினசரி பால் பதிவு', 'Animal / group ID': 'விலங்கு / குழு ID', 'Milk yield (litres)': 'பால் அளவு (லிட்டர்)', 'Feed, health, or management note (optional)': 'தீவனம், உடல்நலம் அல்லது பராமரிப்பு குறிப்பு (விருப்பம்)', 'Save milk entry': 'பால் பதிவைச் சேமி',
    'Milk production cost entry': 'பால் உற்பத்திச் செலவு பதிவு', 'Feed and fodder expense (₹)': 'தீவனம் மற்றும் பசுந்தீவனச் செலவு (₹)', 'Other recorded costs (₹)': 'மற்ற பதிவு செய்த செலவுகள் (₹)', 'Milk produced (litres)': 'உற்பத்தியான பால் (லிட்டர்)', 'Sale price per litre (₹)': 'ஒரு லிட்டர் விற்பனை விலை (₹)', 'Calculate and save': 'கணக்கிட்டு சேமி',
    'Expenses = feed and fodder + other entered costs. Revenue = milk litres × price. Cost/litre = expenses ÷ litres (when litres > 0). Profit/loss = revenue − expenses. Only entered items are included.': 'செலவு = தீவனம் + உள்ளிட்ட பிற செலவுகள். வருவாய் = பால் லிட்டர் × விலை. லிட்டருக்கான செலவு = செலவு ÷ லிட்டர் (லிட்டர் > 0). லாபம்/நஷ்டம் = வருவாய் − செலவு. உள்ளிட்டவை மட்டுமே கணக்கில் சேரும்.',
    '03 · FARMER SUPPORT': '03 · விவசாயி உதவி', '04 · SAVED RECORDS': '04 · சேமித்த பதிவுகள்', 'Recent farm history': 'சமீபத்திய பண்ணைப் பதிவுகள்', 'Account records are stored in this project’s local SQLite database. Unsigned records stay in this browser only.': 'கணக்குப் பதிவுகள் திட்டத்தின் உள்ளூர் SQLite தரவுத்தளத்தில் சேமிக்கப்படும். உள்நுழையாத பதிவுகள் இந்த உலாவியில் மட்டுமே இருக்கும்.',
    'Refresh': 'புதுப்பி', 'Search sample / group': 'மாதிரி / குழுவைத் தேடு', 'Record type': 'பதிவு வகை', 'All records': 'அனைத்துப் பதிவுகள்', 'Feed sample': 'தீவன மாதிரி', 'Milk yield': 'பால் அளவு', 'Costs': 'செலவுகள்', 'From': 'தொடக்கம்', 'Saved on': 'சேமித்த இடம்', 'Any location': 'எந்த இடமும்', 'Project account': 'திட்டக் கணக்கு', 'This device only': 'இந்தச் சாதனத்தில் மட்டும்', 'Filter records': 'பதிவுகளை வடிகட்டு', 'Export visible records (CSV)': 'தெரியும் பதிவுகளை CSV-ஆக ஏற்று',
    'DiaryLens · SIH26111 · Local prototype; not a substitute for laboratory or veterinary advice.': 'DiaryLens · SIH26111 · உள்ளூர் முன்மாதிரி; ஆய்வகம் அல்லது கால்நடை மருத்துவர் ஆலோசனைக்கு மாற்று அல்ல.'
});
Object.assign(staticTextTranslations.te, {
    'DIARYLENS · FARM RECORDS': 'DIARYLENS · వ్యవసాయ రికార్డులు', '01 · SAMPLE SCREENING': '01 · నమూనా స్క్రీనింగ్', 'SILAGE': 'సైలేజ్',
    'Silage condition check': 'సైలేజ్ స్థితి పరిశీలన', 'Record storage conditions and visible or sensory warning signs. This is not an image classifier.': 'నిల్వ పరిస్థితులు, కనిపించే లేదా వాసన ద్వారా గమనించిన హెచ్చరికలను నమోదు చేయండి. ఇది చిత్ర వర్గీకరణ కాదు.',
    'Farmer observations': 'రైతు పరిశీలనలు', 'Sample ID': 'నమూనా ID', 'Silage type': 'సైలేజ్ రకం', 'Maize': 'మొక్కజొన్న', 'Grass': 'గడ్డి', 'Sorghum': 'జొన్న', 'Other / not sure': 'ఇతర / తెలియదు',
    'Storage method': 'నిల్వ విధానం', 'Pit / bunker': 'గొయ్యి / బంకర్', 'Bag': 'సంచి', 'Wrapped bale': 'చుట్టిన కట్టు', 'Storage duration (days)': 'నిల్వ వ్యవధి (రోజులు)',
    'Measured pH (optional)': 'కొలిచిన pH (ఐచ్ఛికం)', 'Measured moisture % (optional)': 'కొలిచిన తేమ % (ఐచ్ఛికం)', 'Measured temperature °C (optional)': 'కొలిచిన ఉష్ణోగ్రత °C (ఐచ్ఛికం)',
    'Photo (preview only)': 'ఫోటో (ప్రివ్యూ మాత్రమే)', 'What did you observe?': 'మీరు ఏమి గమనించారు?', 'Mould-like patches': 'బూజు వంటి మచ్చలు', 'Unusual or putrid smell': 'అసాధారణ లేదా కుళ్లిన వాసన',
    'Unusual colour change': 'అసాధారణ రంగు మార్పు', 'Unusual texture or heating': 'అసాధారణ ఆకృతి లేదా వేడి', 'Air exposure / loose cover': 'గాలి తగలడం / వదులైన కవర్', 'Water entry or damaged cover': 'నీరు చేరడం లేదా కవర్ దెబ్బతినడం',
    'Review and save observation': 'పరిశీలనను చూసి సేవ్ చేయండి', 'Storage follow-up': 'నిల్వ తదుపరి పరిశీలన', 'Limit air and water entry, inspect the exposed face, and keep a dated note. If spoilage is extensive or animals are ill, isolate the affected feed and contact a veterinarian or laboratory.': 'గాలి, నీరు చేరకుండా చూసి, తెరిచిన భాగాన్ని పరిశీలించి తేదీతో నమోదు చేయండి. చెడిపోవడం ఎక్కువగా ఉంటే లేదా జంతువులు అనారోగ్యంగా ఉంటే మేతను వేరుచేసి పశువైద్యుడు/ప్రయోగశాలను సంప్రదించండి.',
    'SAMPLE CONCERNS': 'నమూనా ఆందోళనలు', 'Contamination risk notes': 'కాలుష్య ఆందోళనల నోట్లు', 'Record a concern and evidence without treating it as chemical confirmation.': 'ఆందోళన, ఆధారాన్ని నమోదు చేయండి; దీన్ని రసాయన నిర్ధారణగా భావించవద్దు.', 'Concern': 'ఆందోళన', 'Possible sand / silica': 'ఇసుక / సిలికా ఉండవచ్చు', 'Mould-like growth': 'బూజు వంటి పెరుగుదల', 'Suspected adulteration': 'కల్తీ అనుమానం', 'Possible toxin concern': 'విష పదార్థం అనుమానం', 'What was seen or reported?': 'ఏమి చూశారు లేదా నివేదించారు?', 'Record concern': 'ఆందోళన నమోదు చేయండి',
    '02 · FARM RECORDS': '02 · వ్యవసాయ రికార్డులు', 'Milk yield and production costs': 'పాల దిగుబడి మరియు ఉత్పత్తి ఖర్చులు', 'Track dated entries and compare against your recorded baseline. A timeline does not show that one event caused another.': 'తేదీలతో నమోదు చేసి గత నమోదుతో పోల్చండి. కాలక్రమం మాత్రమే కారణాన్ని నిరూపించదు.',
    'Daily milk entry': 'రోజువారీ పాల నమోదు', 'Animal / group ID': 'జంతువు / గుంపు ID', 'Milk yield (litres)': 'పాల దిగుబడి (లీటర్లు)', 'Feed, health, or management note (optional)': 'మేత, ఆరోగ్యం లేదా నిర్వహణ గమనిక (ఐచ్ఛికం)', 'Save milk entry': 'పాల నమోదును సేవ్ చేయండి',
    'Milk production cost entry': 'పాల ఉత్పత్తి ఖర్చు నమోదు', 'Feed and fodder expense (₹)': 'మేత, పశుగ్రాస ఖర్చు (₹)', 'Other recorded costs (₹)': 'ఇతర నమోదు చేసిన ఖర్చులు (₹)', 'Milk produced (litres)': 'ఉత్పత్తి చేసిన పాలు (లీటర్లు)', 'Sale price per litre (₹)': 'లీటరు అమ్మకపు ధర (₹)', 'Calculate and save': 'లెక్కించి సేవ్ చేయండి',
    'Expenses = feed and fodder + other entered costs. Revenue = milk litres × price. Cost/litre = expenses ÷ litres (when litres > 0). Profit/loss = revenue − expenses. Only entered items are included.': 'ఖర్చులు = మేత + నమోదు చేసిన ఇతర ఖర్చులు. ఆదాయం = పాల లీటర్లు × ధర. లీటరుకు ఖర్చు = ఖర్చులు ÷ లీటర్లు (లీటర్లు > 0). లాభం/నష్టం = ఆదాయం − ఖర్చులు. నమోదు చేసినవి మాత్రమే లెక్కలో ఉంటాయి.',
    '03 · FARMER SUPPORT': '03 · రైతు సహాయం', '04 · SAVED RECORDS': '04 · సేవ్ చేసిన రికార్డులు', 'Recent farm history': 'ఇటీవలి వ్యవసాయ చరిత్ర', 'Account records are stored in this project’s local SQLite database. Unsigned records stay in this browser only.': 'ఖాతా రికార్డులు ప్రాజెక్ట్ స్థానిక SQLite డేటాబేస్‌లో ఉంటాయి. సైన్ ఇన్ చేయని రికార్డులు ఈ బ్రౌజర్‌లో మాత్రమే ఉంటాయి.',
    'Refresh': 'రిఫ్రెష్ చేయండి', 'Search sample / group': 'నమూనా / గుంపు వెతకండి', 'Record type': 'రికార్డు రకం', 'All records': 'అన్ని రికార్డులు', 'Feed sample': 'మేత నమూనా', 'Milk yield': 'పాల దిగుబడి', 'Costs': 'ఖర్చులు', 'From': 'నుండి', 'Saved on': 'సేవ్ చేసిన స్థలం', 'Any location': 'ఏ స్థలమైనా', 'Project account': 'ప్రాజెక్ట్ ఖాతా', 'This device only': 'ఈ పరికరంలో మాత్రమే', 'Filter records': 'రికార్డులను వడపోసండి', 'Export visible records (CSV)': 'కనిపించే రికార్డులను CSVగా ఎగుమతి చేయండి',
    'DiaryLens · SIH26111 · Local prototype; not a substitute for laboratory or veterinary advice.': 'DiaryLens · SIH26111 · స్థానిక నమూనా; ప్రయోగశాల లేదా పశువైద్య సలహాకు ప్రత్యామ్నాయం కాదు.'
});
Object.assign(staticTextTranslations.mr, {
    'DIARYLENS · FARM RECORDS': 'DIARYLENS · शेत नोंदी', '01 · SAMPLE SCREENING': '01 · नमुना तपासणी', 'SILAGE': 'सायलेज',
    'Silage condition check': 'सायलेज स्थिती तपासणी', 'Record storage conditions and visible or sensory warning signs. This is not an image classifier.': 'साठवण स्थिती आणि दिसणारे किंवा जाणवलेले इशारे नोंदवा. हे प्रतिमा वर्गीकरण नाही.',
    'Farmer observations': 'शेतकऱ्याची निरीक्षणे', 'Sample ID': 'नमुना ID', 'Silage type': 'सायलेज प्रकार', 'Maize': 'मका', 'Grass': 'गवत', 'Sorghum': 'ज्वारी', 'Other / not sure': 'इतर / माहीत नाही',
    'Storage method': 'साठवण पद्धत', 'Pit / bunker': 'खड्डा / बंकर', 'Bag': 'पिशवी', 'Wrapped bale': 'गुंडाळलेली गाठ', 'Storage duration (days)': 'साठवण कालावधी (दिवस)',
    'Measured pH (optional)': 'मोजलेला pH (ऐच्छिक)', 'Measured moisture % (optional)': 'मोजलेली आर्द्रता % (ऐच्छिक)', 'Measured temperature °C (optional)': 'मोजलेले तापमान °C (ऐच्छिक)',
    'Photo (preview only)': 'फोटो (फक्त पूर्वदृश्य)', 'What did you observe?': 'तुम्ही काय पाहिले?', 'Mould-like patches': 'बुरशीसारखे डाग', 'Unusual or putrid smell': 'वेगळा किंवा कुजका वास',
    'Unusual colour change': 'असामान्य रंगबदल', 'Unusual texture or heating': 'वेगळी रचना किंवा गरम होणे', 'Air exposure / loose cover': 'हवा लागणे / सैल झाकण', 'Water entry or damaged cover': 'पाणी शिरणे किंवा झाकण खराब होणे',
    'Review and save observation': 'निरीक्षण तपासून जतन करा', 'Storage follow-up': 'साठवण पुढील तपासणी', 'Limit air and water entry, inspect the exposed face, and keep a dated note. If spoilage is extensive or animals are ill, isolate the affected feed and contact a veterinarian or laboratory.': 'हवा-पाणी शिरणे रोखा, उघडा भाग तपासा आणि तारीख लिहा. खराबी जास्त असल्यास किंवा जनावर आजारी असल्यास चारा वेगळा ठेवा आणि पशुवैद्य/प्रयोगशाळेशी संपर्क करा.',
    'SAMPLE CONCERNS': 'नमुन्याबद्दलची चिंता', 'Contamination risk notes': 'दूषणविषयक नोंदी', 'Record a concern and evidence without treating it as chemical confirmation.': 'चिंता आणि पुरावा नोंदवा; याला रासायनिक पुष्टी समजू नका.', 'Concern': 'चिंता', 'Possible sand / silica': 'वाळू / सिलिका असण्याची शक्यता', 'Mould-like growth': 'बुरशीसारखी वाढ', 'Suspected adulteration': 'भेसळीचा संशय', 'Possible toxin concern': 'विषारी घटकाची शक्यता', 'What was seen or reported?': 'काय दिसले किंवा कळवले?', 'Record concern': 'चिंता नोंदवा',
    '02 · FARM RECORDS': '02 · शेत नोंदी', 'Milk yield and production costs': 'दूध उत्पादन आणि खर्च', 'Track dated entries and compare against your recorded baseline. A timeline does not show that one event caused another.': 'तारखेनुसार नोंदी ठेवा आणि आधीच्या नोंदीशी तुलना करा. कालरेषा कारण सिद्ध करत नाही.',
    'Daily milk entry': 'दैनिक दूध नोंद', 'Animal / group ID': 'जनावर / गट ID', 'Milk yield (litres)': 'दूध उत्पादन (लिटर)', 'Feed, health, or management note (optional)': 'चारा, आरोग्य किंवा व्यवस्थापन नोंद (ऐच्छिक)', 'Save milk entry': 'दूध नोंद जतन करा',
    'Milk production cost entry': 'दूध उत्पादन खर्च नोंद', 'Feed and fodder expense (₹)': 'चारा व वैरण खर्च (₹)', 'Other recorded costs (₹)': 'इतर नोंदवलेले खर्च (₹)', 'Milk produced (litres)': 'उत्पादित दूध (लिटर)', 'Sale price per litre (₹)': 'प्रति लिटर विक्री किंमत (₹)', 'Calculate and save': 'गणना करून जतन करा',
    'Expenses = feed and fodder + other entered costs. Revenue = milk litres × price. Cost/litre = expenses ÷ litres (when litres > 0). Profit/loss = revenue − expenses. Only entered items are included.': 'खर्च = चारा/वैरण + इतर नोंदवलेले खर्च. उत्पन्न = दूध लिटर × किंमत. प्रति लिटर खर्च = खर्च ÷ लिटर (लिटर > 0). नफा/तोटा = उत्पन्न − खर्च. भरलेल्या नोंदीच धरल्या जातात.',
    '03 · FARMER SUPPORT': '03 · शेतकरी मदत', '04 · SAVED RECORDS': '04 · जतन केलेल्या नोंदी', 'Recent farm history': 'अलीकडील शेत नोंदी', 'Account records are stored in this project’s local SQLite database. Unsigned records stay in this browser only.': 'खाते नोंदी प्रकल्पाच्या स्थानिक SQLite डेटाबेसमध्ये साठवल्या जातात. साइन इन नसलेल्या नोंदी फक्त या ब्राउझरमध्ये राहतात.',
    'Refresh': 'रीफ्रेश करा', 'Search sample / group': 'नमुना / गट शोधा', 'Record type': 'नोंदीचा प्रकार', 'All records': 'सर्व नोंदी', 'Feed sample': 'चारा नमुना', 'Milk yield': 'दूध उत्पादन', 'Costs': 'खर्च', 'From': 'पासून', 'Saved on': 'जतन स्थान', 'Any location': 'कोणतेही स्थान', 'Project account': 'प्रकल्प खाते', 'This device only': 'फक्त हे उपकरण', 'Filter records': 'नोंदी फिल्टर करा', 'Export visible records (CSV)': 'दिसणाऱ्या नोंदी CSV मध्ये निर्यात करा',
    'DiaryLens · SIH26111 · Local prototype; not a substitute for laboratory or veterinary advice.': 'DiaryLens · SIH26111 · स्थानिक नमुना; प्रयोगशाळा किंवा पशुवैद्यकीय सल्ल्याचा पर्याय नाही.'
});
Object.entries(translations.en).forEach(([key, value]) => {
    if (typeof value === 'string' && !englishKeyByText.has(value.trim())) {
        englishKeyByText.set(value.trim(), key);
    }
});
const staticTextState = new WeakMap();
const staticAttributeState = new WeakMap();

function translateStaticTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (!parent || parent.closest('[data-i18n]') || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
        let state = staticTextState.get(node);
        if (!state) {
            const match = node.textContent.match(/^(\s*)([\s\S]*?)(\s*)$/);
            const original = match?.[2] || '';
            const key = englishKeyByText.get(original);
            const hasStaticTranslation = Object.values(staticTextTranslations).some(map => Object.hasOwn(map, original));
            if (!key && !hasStaticTranslation) continue;
            state = { original, key, prefix: match[1], suffix: match[3] };
            staticTextState.set(node, state);
        }
        const localized = staticTextTranslations[currentLanguage]?.[state.original] || (state.key ? t(state.key) : state.original);
        const translated = `${state.prefix}${localized}${state.suffix}`;
        if (node.textContent !== translated) node.textContent = translated;
    }
}

function translateStaticAttributes() {
    document.querySelectorAll('[placeholder], [aria-label], [title]').forEach(element => {
        let state = staticAttributeState.get(element);
        if (!state) {
            state = {};
            staticAttributeState.set(element, state);
        }
        ['placeholder', 'aria-label', 'title'].forEach(attribute => {
            if (!element.hasAttribute(attribute)) return;
            const explicitKey = element.getAttribute(`data-i18n-${attribute}`);
            const original = state[attribute]?.original ?? element.getAttribute(attribute);
            const cleanOriginal = original.trim();
            const key = explicitKey || englishKeyByText.get(cleanOriginal);
            const hasStaticTranslation = Object.values(staticTextTranslations).some(map => Object.hasOwn(map, cleanOriginal));
            if (!key && !hasStaticTranslation) return;
            state[attribute] = { original, key };
            const translated = staticTextTranslations[currentLanguage]?.[cleanOriginal] || (key ? t(key) : original);
            if (element.getAttribute(attribute) !== translated) element.setAttribute(attribute, translated);
        });
    });
}

// ============================================
// LANGUAGE CONTROLLER
// ============================================

// Get current language from localStorage or default to English
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Translate function
function t(key) {
    const keys = key.split('.');
    let result = translations[currentLanguage];
    for (const k of keys) {
        if (result && result[k] !== undefined) {
            result = result[k];
        } else {
            // Fallback to English
            let fallback = translations['en'];
            for (const fk of keys) {
                if (fallback && fallback[fk] !== undefined) {
                    fallback = fallback[fk];
                } else {
                    return key;
                }
            }
            return staticTextTranslations[currentLanguage]?.[fallback] || fallback;
        }
    }
    return result || key;
}

// Update all text on page
function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && element.tagName !== 'SELECT') {
            const textNode = Array.from(element.childNodes).find(node =>
                node.nodeType === Node.TEXT_NODE && node.textContent.trim()
            );
            if (textNode) {
                if (textNode.textContent.trim() !== translation) textNode.textContent = ` ${translation}`;
            } else if (element.textContent !== translation) {
                element.textContent = translation;
            }
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const translation = t(element.getAttribute('data-i18n-placeholder'));
        if (element.placeholder !== translation) element.placeholder = translation;
    });

    document.querySelectorAll('option[data-i18n]').forEach(option => {
        const translation = t(option.getAttribute('data-i18n'));
        if (option.textContent !== translation) option.textContent = translation;
    });
    
    // Update select options
    document.querySelectorAll('select[data-i18n-options]').forEach(select => {
        const key = select.getAttribute('data-i18n-options');
        // Handle specific selects
        if (key === 'feed_types') {
            const options = {
                'cattle': t('feed_cattle'),
                'silage': t('feed_silage'),
                'fodder': t('feed_fodder'),
                'concentrate': t('feed_concentrate'),
                'mineral': t('feed_mineral')
            };
            // Update options (skip first empty option)
            const optGroups = select.querySelectorAll('option');
            optGroups.forEach(opt => {
                if (opt.value && options[opt.value]) {
                    if (opt.textContent !== options[opt.value]) opt.textContent = options[opt.value];
                }
            });
        }
    });

    translateStaticTextNodes();
    translateStaticAttributes();
    
    // Update document title
    const title = `${t('app_title')} | DiaryLens`;
    if (document.title !== title) document.title = title;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = translations[currentLanguage] ? currentLanguage : 'en';
        langSelect.addEventListener('change', function() {
            updateLanguage(this.value);
            showToast(`Language changed to ${this.options[this.selectedIndex].text}`);
        });
    }

    // Apply the saved language even on pages where the selector is unavailable.
    updateLanguage(translations[currentLanguage] ? currentLanguage : 'en');

    // Translate content rendered after page load (results, tables, dialogs, etc.).
    const observer = new MutationObserver((records) => {
        if (records.some(record => record.addedNodes.length)) updateLanguage(currentLanguage);
    });
    observer.observe(document.body, { childList: true, subtree: true });
});

// Export for use in other files
window.t = t;
window.updateLanguage = updateLanguage;
window.currentLanguage = currentLanguage;
window.translations = translations;
