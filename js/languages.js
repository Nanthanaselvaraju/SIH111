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
        'app_title': 'AI-Powered Portable Cattle Feed & Silage Quality Intelligence',
        'app_subtitle': 'Rapid on-field quality assessment for immediate feed-quality decisions.',
        'app_badge': 'AI-Powered • Smart India Hackathon 2026',
        'results_time': 'Results in under 5 minutes!',
        
        // Buttons
        'btn_start_test': 'Start Testing',
        'btn_dashboard': 'View Dashboard',
        'btn_simulate': 'Simulate Sensors',
        'btn_analyze': 'Analyze Sample',
        'btn_auto_fill': 'Auto-Fill from Virtual Sensors',
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
        'sensor_active': 'Virtual Sensors Active',
        'cloud_sync': 'Cloud Sync Active',
        'local_mode': 'Local Mode - Login to sync',
        'online': 'Online',
        'offline': 'Offline',
        
        // About
        'about_title': 'About SmartFeed',
        'about_mission': 'Mission',
        'about_mission_text': 'To empower dairy farmers with affordable, rapid, and accurate feed quality testing using AI and sensor technology.',
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
        
        'app_title': 'एआई-संचालित पोर्टेबल पशु चारा और साइलेज गुणवत्ता परीक्षण प्रणाली',
        'app_subtitle': 'तत्काल चारा-गुणवत्ता निर्णयों के लिए त्वरित ऑन-फील्ड गुणवत्ता आकलन।',
        'app_badge': 'एआई-संचालित • स्मार्ट इंडिया हैकाथॉन 2026',
        'results_time': '5 मिनट से भी कम में परिणाम!',
        
        'btn_start_test': 'परीक्षण शुरू करें',
        'btn_dashboard': 'डैशबोर्ड देखें',
        'btn_simulate': 'सेंसर सिम्युलेट करें',
        'btn_analyze': 'नमूना का विश्लेषण करें',
        'btn_auto_fill': 'वर्चुअल सेंसर से ऑटो-भरें',
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
        
        'sensor_active': 'वर्चुअल सेंसर सक्रिय',
        'cloud_sync': 'क्लाउड सिंक सक्रिय',
        'local_mode': 'स्थानीय मोड - सिंक के लिए लॉगिन करें',
        'online': 'ऑनलाइन',
        'offline': 'ऑफलाइन',
        
        'about_title': 'स्मार्टफीड के बारे में',
        'about_mission': 'मिशन',
        'about_mission_text': 'एआई और सेंसर तकनीक का उपयोग करके किफायती, तेज और सटीक चारा गुणवत्ता परीक्षण के साथ डेयरी किसानों को सशक्त बनाना।',
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
        
        'app_title': 'AI-இயக்கப்படும் கால்நடை தீவனம் மற்றும் சைலேஜ் தர சோதனை அமைப்பு',
        'app_subtitle': 'உடனடி தீவன-தர முடிவுகளுக்கான விரைவான களத்தில் தர மதிப்பீடு.',
        'app_badge': 'AI-இயக்கப்படும் • ஸ்மார்ட் இந்தியா ஹாக்காதோன் 2026',
        'results_time': '5 நிமிடங்களில் முடிவுகள்!',
        
        'btn_start_test': 'சோதனையை தொடங்கு',
        'btn_dashboard': 'டாஷ்போர்டை காண்க',
        'btn_simulate': 'உணரிகளை உருவகப்படுத்து',
        'btn_analyze': 'மாதிரியை பகுப்பாய்வு செய்',
        'btn_auto_fill': 'மெய்நிகர் உணரிகளிலிருந்து தானாக நிரப்பு',
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
        
        'sensor_active': 'மெய்நிகர் உணரிகள் செயலில்',
        'cloud_sync': 'கிளவுட் ஒத்திசைவு செயலில்',
        'local_mode': 'உள்ளூர் முறை - ஒத்திசைக்க உள்நுழையவும்',
        'online': 'இணைப்பில்',
        'offline': 'இணைப்பில்லை',

        'about_title': 'SmartFeed பற்றி',
        'about_mission': 'நோக்கம்',
        'about_mission_text': 'AI மற்றும் சென்சார் தொழில்நுட்பத்தைப் பயன்படுத்தி மலிவான, விரைவான மற்றும் துல்லியமான தீவன தர சோதனையை பால் விவசாயிகளுக்கு வழங்குதல்.',
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
        
        'app_title': 'AI-ఆధారిత పోర్టబుల్ పశువుల మేత మరియు సైలేజ్ నాణ్యత పరీక్ష వ్యవస్థ',
        'app_subtitle': 'తక్షణ మేత-నాణ్యత నిర్ణయాల కోసం వేగవంతమైన క్షేత్ర స్థాయి నాణ్యత అంచనా.',
        'app_badge': 'AI-ఆధారిత • స్మార్ట్ ఇండియా హ్యాకథాన్ 2026',
        'results_time': '5 నిమిషాల్లో ఫలితాలు!',
        'sample_id': 'నమూనా ID',
        'sample_id_placeholder': 'నమూనా ID నమోదు చేయండి లేదా ఆటోగా వదిలేయండి',
        
        'btn_start_test': 'పరీక్ష ప్రారంభించండి',
        'btn_dashboard': 'డాష్బోర్డ్ చూడండి',
        'btn_simulate': 'సెన్సార్లను అనుకరించండి',
        'btn_analyze': 'నమూనాను విశ్లేషించండి',
        'btn_auto_fill': 'వర్చువల్ సెన్సార్ల నుండి ఆటో-ఫిల్',
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
        'about_title': 'SmartFeed గురించి',
        'about_mission': 'లక్ష్యం',
        'about_mission_text': 'AI మరియు సెన్సార్ సాంకేతికతతో సరసమైన, వేగవంతమైన మరియు ఖచ్చితమైన మేత నాణ్యత పరీక్షను పాడి రైతులకు అందించడం.',
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
        
        'app_title': 'AI-चालित पोर्टेबल गुरांचा चारा आणि सायलेज गुणवत्ता चाचणी प्रणाली',
        'app_subtitle': 'तात्काळ चारा-गुणवत्ता निर्णयांसाठी जलद ऑन-फील्ड गुणवत्ता मूल्यांकन.',
        'app_badge': 'AI-चालित • स्मार्ट इंडिया हैकाथॉन 2026',
        'results_time': '5 मिनिटांत निकाल!',
        'sample_id': 'नमुना ID',
        'sample_id_placeholder': 'नमुना ID लिहा किंवा ऑटो सोडा',
        
        'btn_start_test': 'चाचणी सुरू करा',
        'btn_dashboard': 'डॅशबोर्ड पहा',
        'btn_simulate': 'सेन्सर सिम्युलेट करा',
        'btn_analyze': 'नमुन्याचे विश्लेषण करा',
        'btn_auto_fill': 'व्हर्च्युअल सेन्सरमधून ऑटो-भरा',
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
        'about_title': 'SmartFeed बद्दल',
        'about_mission': 'ध्येय',
        'about_mission_text': 'AI आणि सेन्सर तंत्रज्ञानाच्या मदतीने दुग्ध उत्पादक शेतकऱ्यांना स्वस्त, जलद आणि अचूक चारा गुणवत्ता चाचणी उपलब्ध करून देणे.',
        'about_technology': 'तंत्रज्ञान',
        'about_team': 'संघ',
        'about_impact': 'परिणाम'
    }
};

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
            return fallback;
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
            element.textContent = translation;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        element.placeholder = t(element.getAttribute('data-i18n-placeholder'));
    });

    document.querySelectorAll('option[data-i18n]').forEach(option => {
        option.textContent = t(option.getAttribute('data-i18n'));
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
                    opt.textContent = options[opt.value];
                }
            });
        }
    });
    
    // Update document title
    document.title = `${t('app_title')} | SmartFeed`;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = currentLanguage;
        langSelect.addEventListener('change', function() {
            updateLanguage(this.value);
            showToast(`Language changed to ${this.options[this.selectedIndex].text}`);
        });
        // Apply initial language
        updateLanguage(currentLanguage);
    }
});

// Export for use in other files
window.t = t;
window.updateLanguage = updateLanguage;
window.currentLanguage = currentLanguage;