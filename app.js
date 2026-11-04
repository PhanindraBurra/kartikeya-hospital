/**
 * SATYA SRI KARTIKEYA MULTI SPECIALITY HOSPITAL
 * Interactive Application Scripts
 * ----------------------------------------------------
 * Features:
 * 1. AI / Hospital Virtual Assistant Chatbox (English & Telugu)
 * 2. Instant Appointment Booking with WhatsApp dispatch
 * 3. Free Health Camp Appointment Scheduler
 * 4. Image Lightbox for Official Hospital Posters & Gallery
 * 5. Dynamic Bilingual Switcher (English <-> Telugu)
 * 6. Smooth Mobile Navigation & Quick Actions
 */

// Global Configuration
const HOSPITAL_PHONE = '9391131013';
const HOSPITAL_PHONE_INTL = '919391131013';
const HOSPITAL_NAME_EN = 'Satya Sri Kartikeya Multi Speciality Hospital';
const HOSPITAL_NAME_TE = 'సత్యశ్రీ కార్తికేయ మల్టీ స్పెషాలిటీ హాస్పిటల్';
const GOOGLE_MAPS_LINK = 'https://share.google/5C07fv22zy8TrJrzH';

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLanguageSwitcher();
  initBookingSystem();
  initChatbox();
  initLightbox();
  initDoctorBookingButtons();
});

/* ==========================================================================
   1. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.innerHTML = '☰';
      });
    });
  }
}

/* ==========================================================================
   2. BILINGUAL LANGUAGE SWITCHER (English <-> Telugu)
   ========================================================================== */
let currentLang = 'te'; // Telugu default as requested by regional demographic

function initLanguageSwitcher() {
  const switchBtn = document.getElementById('langSwitchBtn');
  if (!switchBtn) return;

  switchBtn.addEventListener('click', () => {
    currentLang = currentLang === 'te' ? 'en' : 'te';
    document.body.classList.toggle('lang-te', currentLang === 'te');
    switchBtn.innerHTML = currentLang === 'te' 
      ? '🌐 <span>English</span>' 
      : '🌐 <span>తెలుగు</span>';

    // Toggle all elements with data-lang-te and data-lang-en
    document.querySelectorAll('[data-lang-te]').forEach(el => {
      const teText = el.getAttribute('data-lang-te');
      const enText = el.getAttribute('data-lang-en');
      if (currentLang === 'te' && teText) {
        el.textContent = teText;
      } else if (currentLang === 'en' && enText) {
        el.textContent = enText;
      }
    });

    // Also update chatbot greeting
    if (window.chatUpdateGreeting) {
      window.chatUpdateGreeting();
    }
  });
}

/* ==========================================================================
   3. APPOINTMENT BOOKING & WHATSAPP DISPATCH
   ========================================================================== */
function initBookingSystem() {
  const bookingForm = document.getElementById('appointmentForm');
  const modalOverlay = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const waModalBtn = document.getElementById('modalSendWhatsApp');

  if (!bookingForm) return;

  // Set min date to today
  const dateInput = document.getElementById('bookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Handle Form Submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const doctorSelect = document.getElementById('bookDoctor');
    const doctorName = doctorSelect.options[doctorSelect.selectedIndex].text;
    const date = document.getElementById('bookDate').value;
    const timeSlot = document.getElementById('bookSlot').value;
    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();
    const age = document.getElementById('patientAge').value.trim();
    const notes = document.getElementById('patientNotes').value.trim() || 'General Consultation';

    if (!name || !phone) {
      alert('దయచేసి మీ పేరు మరియు ఫోన్ నంబర్ నమోదు చేయండి / Please enter your name and phone number.');
      return;
    }

    // Generate Token
    const token = 'KRT-' + Math.floor(100000 + Math.random() * 900000);

    // Update modal
    document.getElementById('tokenVal').textContent = token;
    document.getElementById('tokenPatient').textContent = `${name} (${age || 'N/A'} yrs)`;
    document.getElementById('tokenDoctor').textContent = doctorName;
    document.getElementById('tokenDateTime').textContent = `${date} - ${timeSlot}`;
    document.getElementById('tokenPhone').textContent = phone;

    // Build prefilled WhatsApp message
    const waText = encodeURIComponent(
      `*నమస్తే సత్యశ్రీ కార్తికేయ హాస్పిటల్ (Satya Sri Kartikeya Hospital)*\n\n` +
      `నా అపాయింట్‌మెంట్ బుకింగ్ వివరాలు (Appointment Request):\n` +
      `📋 *టోకెన్ నంబర్ (Token):* ${token}\n` +
      `👤 *రోగి పేరు (Patient):* ${name}\n` +
      `🎂 *వయస్సు (Age):* ${age || 'N/A'}\n` +
      `📱 *ఫోన్ నంబర్ (Phone):* ${phone}\n` +
      `🩺 *డాక్టర్ (Doctor):* ${doctorName}\n` +
      `📅 *తేదీ (Date):* ${date}\n` +
      `⏰ *సమయం (Slot):* ${timeSlot}\n` +
      `📝 *సమస్య / వివరాలు (Reason):* ${notes}\n\n` +
      `దయచేసి నా బుకింగ్ కన్ఫర్మ్ చేయగలరు. ధన్యవాదాలు!`
    );

    const waUrl = `https://wa.me/${HOSPITAL_PHONE_INTL}?text=${waText}`;
    waModalBtn.href = waUrl;

    // Show modal
    modalOverlay.classList.add('active');
  });

  // Direct WhatsApp Book Button in Form
  const directWaBtn = document.getElementById('btnDirectWaBook');
  if (directWaBtn) {
    directWaBtn.addEventListener('click', () => {
      const doctorSelect = document.getElementById('bookDoctor');
      const doctorName = doctorSelect.options[doctorSelect.selectedIndex].text;
      const date = document.getElementById('bookDate').value;
      const timeSlot = document.getElementById('bookSlot').value;
      const name = document.getElementById('patientName').value.trim() || 'Patient';
      const phone = document.getElementById('patientPhone').value.trim() || 'Direct WhatsApp';
      const age = document.getElementById('patientAge').value.trim() || 'N/A';

      const waText = encodeURIComponent(
        `*నమస్తే కార్తికేయ హాస్పిటల్!*\nనేను డాక్టర్ *${doctorName}* గారి వద్ద అపాయింట్‌మెంట్ బుక్ చేసుకోవాలనుకుంటున్నాను.\n` +
        `👤 పేరు: ${name} (Age: ${age})\n` +
        `📅 తేది: ${date}\n` +
        `⏰ సమయం: ${timeSlot}\n` +
        `దయచేసి వివరాలు తెలియజేయగలరు.`
      );
      window.open(`https://wa.me/${HOSPITAL_PHONE_INTL}?text=${waText}`, '_blank');
    });
  }

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      bookingForm.reset();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   4. DOCTOR CARDS DIRECT BOOKING TRIGGER
   ========================================================================== */
function initDoctorBookingButtons() {
  document.querySelectorAll('.btn-doc-book').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const docName = btn.getAttribute('data-doctor');
      const docSelect = document.getElementById('bookDoctor');
      if (docSelect && docName) {
        for (let i = 0; i < docSelect.options.length; i++) {
          if (docSelect.options[i].text.includes(docName)) {
            docSelect.selectedIndex = i;
            break;
          }
        }
      }
      // Scroll to booking section smoothly
      const bookingSec = document.getElementById('appointment-booking');
      if (bookingSec) {
        bookingSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Doctor WhatsApp Consult
  document.querySelectorAll('.btn-doc-wa').forEach(btn => {
    btn.addEventListener('click', () => {
      const docName = btn.getAttribute('data-doctor');
      const dept = btn.getAttribute('data-dept');
      const text = encodeURIComponent(
        `నమస్తే డాక్టర్! నేను కార్తికేయ హాస్పిటల్ లో *${docName}* (${dept}) గారి కన్సల్టేషన్ గురించి వివరాలు తెలుసుకోవాలనుకుంటున్నాను.`
      );
      window.open(`https://wa.me/${HOSPITAL_PHONE_INTL}?text=${text}`, '_blank');
    });
  });
}

/* ==========================================================================
   5. AI / VIRTUAL ASSISTANT CHATBOX
   ========================================================================== */
function initChatbox() {
  const launcher = document.getElementById('chatLauncher');
  const panel = document.getElementById('chatWidget');
  const closeBtn = document.getElementById('chatCloseBtn');
  const sendBtn = document.getElementById('chatSendBtn');
  const input = document.getElementById('chatInput');
  const messagesBody = document.getElementById('chatMessages');

  if (!launcher || !panel) return;

  launcher.addEventListener('click', () => {
    panel.classList.toggle('active');
    if (panel.classList.contains('active')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('active');
  });

  // Knowledge Base for the Assistant
  const knowledgeBase = [
    {
      keywords: ['doctor', 'specialist', 'డాక్టర్', 'వైద్యులు', 'లిస్ట్', 'డైరెక్టరీ', 'gynecologist', 'pediatrician', 'ortho', 'surgeon'],
      replyEn: 'Our Hospital Doctors:\n• Dr. Surekha M.S., (OBG) - Gynecology & Maternity\n• Dr. Prashanth Kumar M.B.B.S., DNB - General Medicine & Critical Care\n• Dr. Masthan Vali Shaik M.B.B.S., DCH - Pediatrics & Child Specialist\n• Dr. Avinash M.S., Ortho - Bones & Joint Care\n• Dr. Moushmi MD - Radiologist & Ultrasound\n• Dr. S. Subbaraju M.S. - General & Laparoscopic Surgery\n\nWould you like to book an appointment with any doctor?',
      replyTe: 'కార్తికేయ హాస్పిటల్ వైద్యుల జాబితా:\n• డా॥ సురేఖ M.S., (OBG) - గైనకాలజీ & ప్రసూతి\n• డా॥ ప్రశాంత్ కుమార్ M.B.B.S., DNB - జనరల్ మెడిసిన్ & క్రిటికల్ కేర్\n• డా॥ మస్తాన్ వలి షేక్ M.B.B.S., DCH - పీడియాట్రిక్స్ (చిన్నపిల్లల నిపుణులు)\n• డా॥ అవినాష్ M.S., Ortho - ఆర్థోపెడిక్స్ (ఎముకలు, కీళ్ళు)\n• డా॥ మౌషిమీ MD - రేడియాలజిస్ట్ (అల్ట్రాసౌండ్ స్కానింగ్)\n• డా॥ ఎస్. సుబ్బరాజు M.S. - జనరల్ & లాప్రోస్కోపిక్ సర్జరీ\n\nమీరు ఎవరి వద్ద అపాయింట్‌మెంట్ తీసుకోవాలనుకుంటున్నారు?'
    },
    {
      keywords: ['free', 'camp', 'scan', 'స్కానింగ్', 'ఉచిత', 'ఆఫర్', 'offer', 'sugar', 'షుగర్'],
      replyEn: 'Free Launch Offers & Camp Schedule:\n🎁 FREE OP Consultations for 1 full month!\n🤰 FREE Ultrasound Scans (worth ₹1100) for pregnancy & abdomen every Monday, Thursday & Saturday!\n🩸 FREE Fasting & PP Blood Sugar Tests + Free OP every Wednesday!\n👶 FREE Pediatric OP & Fever Tests every Friday!',
      replyTe: 'విశేష ఉచిత వైద్య శిబిరాలు & ఆఫర్లు:\n🎁 నెల రోజుల పాటు అన్ని ఓ.పి (OP) పూర్తిగా ఉచితం!\n🤰 రూ. 1100/- విలువ గల పొట్ట & గర్భిణీ స్త్రీలకు అల్ట్రాసౌండ్ స్కానింగ్ పూర్తిగా ఉచితం (ప్రతి సోమ, గురు, శనివారాలు)!\n🩸 ఉచిత షుగర్ టెస్ట్లు (Fasting & PP) + ఉచిత OP (ప్రతి బుధవారం)!\n👶 చిన్నపిల్లల ఉచిత OP & జ్వర పరీక్షలు (ప్రతి శుక్రవారం)!'
    },
    {
      keywords: ['aarogyasri', 'aarogya', 'insurance', 'ఆరోగ్యశ్రీ', 'ఇన్సూరెన్స్', 'ehs', 'cashless', 'నగదు రహిత'],
      replyEn: 'Yes! We proudly accept:\n✅ Dr. YSR Aarogyasri\n✅ E.H.S. (Employees Health Scheme)\n✅ 100% Cashless Health Insurance for all leading private & public TPAs (Star Health, HDFC Ergo, ICICI Lombard, Care Health, Medi Assist, etc.).\nCall 9391131013 for insurance desk assistance.',
      replyTe: 'అవును! మా వద్ద:\n✅ డా॥ వైఎస్సార్ ఆరోగ్యశ్రీ సేవలు\n✅ E.H.S. (ఉద్యోగుల హెల్త్ స్కీమ్)\n✅ అన్ని ప్రముఖ కంపెనీల హెల్త్ ఇన్సూరెన్స్ కార్డులు గల వారికి 100% నగదు రహిత (Cashless) వైద్య సేవలు అందుబాటులో ఉన్నాయి.\nవివరాలకు 9391131013 కు కాల్ చేయండి.'
    },
    {
      keywords: ['location', 'address', 'ఎక్కడ', 'అడ్రస్', 'maps', 'దారి', 'route', 'jaggampeta'],
      replyEn: '📍 Hospital Address:\nSatya Sri Kartikeya Multi Speciality Hospital\n(Formerly Satyakrishna Hospital Premises)\nDoor No. 3-212/2, NH-16, Neeladrirao Peta, Jaggampeta, Kakinada District, AP - 533435.\n\nPhone: 9391131013\nOpen 24/7 for Emergency & Casualty.',
      replyTe: '📍 హాస్పిటల్ చిరునామా:\nసత్యశ్రీ కార్తికేయ మల్టీ స్పెషాలిటీ హాస్పిటల్\n(మన జగ్గంపేట సత్యకృష్ణ గారి హాస్పిటల్ వద్ద)\nడోర్ నెం: 3-212/2, NH-16, నీలాద్రిరావు పేట, జగ్గంపేట, కాకినాడ జిల్లా, ఆంధ్రప్రదేశ్ - 533435.\n\nఫోన్: 9391131013\nఎమర్జెన్సీ & ప్రమాద చికిత్స 24 గంటలు అందుబాటులో ఉంటాయి.'
    },
    {
      keywords: ['emergency', 'call', 'ambulance', 'ఎమర్జెన్సీ', 'అంబులెన్స్', 'నంబర్', 'phone', 'contact'],
      replyEn: '🚨 24/7 Emergency & Ambulance Helpline:\nCall immediately: +91 9391131013 or +91 9441931333.\nOur trauma & critical care team is available 24 hours every day.',
      replyTe: '🚨 24/7 ఎమర్జెన్సీ & అంబులెన్స్ హెల్ప్‌లైన్:\nవెంటనే సంప్రదించండి: +91 9391131013 లేదా +91 9441931333.\nమా ఎమర్జెన్సీ మరియు ఐసియు బృందం 24 గంటలూ సిద్ధంగా ఉంది.'
    },
    {
      keywords: ['book', 'appointment', 'అపాయింట్‌మెంట్', 'బుకింగ్', 'టైమింగ్స్', 'timings', 'slot'],
      replyEn: 'You can book an appointment directly through our online form below, or send us a WhatsApp message at +91 9391131013.\nOP Timings: 9:00 AM - 2:00 PM & 5:00 PM - 9:00 PM.',
      replyTe: 'మీరు క్రింది ఆన్‌లైన్ ఫారమ్ ద్వారా లేదా మా వాట్సాప్ (+91 9391131013) ద్వారా సులభంగా అపాయింట్‌మెంట్ బుక్ చేసుకోవచ్చు.\nఓ.పి సమయాలు: ఉదయం 9:00 నుండి మధ్యాహ్నం 2:00 వరకు & సాయంత్రం 5:00 నుండి రాత్రి 9:00 వరకు.'
    }
  ];

  function appendMessage(text, sender = 'bot', hasWhatsAppBtn = false) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = text.replace(/\n/g, '<br>');

    if (hasWhatsAppBtn) {
      const waLink = document.createElement('a');
      waLink.href = `https://wa.me/${HOSPITAL_PHONE_INTL}?text=${encodeURIComponent('నమస్తే కార్తికేయ హాస్పిటల్! నాకు వైద్య సలహా / అపాయింట్‌మెంట్ కావాలి.')}`;
      waLink.target = '_blank';
      waLink.className = 'btn-header-whatsapp';
      waLink.style.marginTop = '10px';
      waLink.style.display = 'inline-flex';
      waLink.innerHTML = '💬 వాట్సాప్‌లో మాట్లాడండి';
      msg.appendChild(waLink);
    }

    messagesBody.appendChild(msg);
    messagesBody.scrollTop = messagesBody.scrollHeight;
  }

  function handleUserInput(userText) {
    if (!userText.trim()) return;

    appendMessage(userText, 'user');
    input.value = '';

    const lower = userText.toLowerCase();

    // Find match
    let match = knowledgeBase.find(kb => 
      kb.keywords.some(k => lower.includes(k.toLowerCase()))
    );

    setTimeout(() => {
      if (match) {
        const reply = currentLang === 'te' ? match.replyTe : match.replyEn;
        appendMessage(reply, 'bot', true);
      } else {
        const defaultReply = currentLang === 'te'
          ? `ధన్యవాదాలు! మీ ప్రశ్నకు సరైన సమాధానం కోసం మా హాస్పిటల్ రిసెప్షన్ లేదా వాట్సాప్ హెల్ప్‌లైన్ (+91 9391131013) ను సంప్రదించవచ్చు.`
          : `Thank you! For more details or direct assistance, please contact our 24/7 hospital reception or WhatsApp at +91 9391131013.`;
        appendMessage(defaultReply, 'bot', true);
      }
    }, 400);
  }

  sendBtn.addEventListener('click', () => handleUserInput(input.value));
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserInput(input.value);
    }
  });

  // Suggestion chips
  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        handleUserInput(query);
      }
    });
  });
}

/* ==========================================================================
   6. IMAGE LIGHTBOX (Brochures & Campus Showcase)
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const close = document.getElementById('lightboxClose');

  if (!modal || !img) return;

  document.querySelectorAll('[data-lightbox-src]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-lightbox-src');
      img.src = src;
      modal.classList.add('active');
    });
  });

  if (close) {
    close.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// Global quick booking helper for Free Camps
window.bookFreeCamp = function(campType) {
  const bookingSec = document.getElementById('appointment-booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
    const notes = document.getElementById('patientNotes');
    if (notes) {
      notes.value = `Booking for Special Launch Offer: ${campType}`;
    }
  }
};

