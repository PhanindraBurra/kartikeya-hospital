/**
 * SATYA SRI KARTIKEYA MULTI SPECIALITY HOSPITAL
 * Modern Application Scripts (Delta Hospitals Architecture)
 * 100% English Only • Enhanced Animations & Fast Interactive Flows
 * -----------------------------------------------------------------
 */

// Global Hospital Configuration
const HOSPITAL_PHONE = '9391131013';
const HOSPITAL_PHONE_INTL = '919391131013';
const HOSPITAL_NAME = 'Satya Sri Kartikeya Multi Speciality Hospital';
const GOOGLE_MAPS_LINK = 'https://share.google/5C07fv22zy8TrJrzH';

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCounterAnimation();
  initDoctorFilter();
  initFaqAccordion();
  initMobileNav();
  initBookingSystem();
  initChatbox();
  initLightbox();
  initDoctorBookingButtons();
});

/* ==========================================================================
   1. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in'
  );

  if (!('IntersectionObserver' in window)) {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('reveal-active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   2. ANIMATED NUMBER COUNTERS (On Viewport Scroll)
   ========================================================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1400; // ms
        const steps = 35;
        const stepTime = Math.abs(Math.floor(duration / steps));
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = prefix + target + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = prefix + Math.floor(current) + suffix;
          }
        }, stepTime);

        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   3. DOCTOR SPECIALTY FILTER TABS
   ========================================================================== */
function initDoctorFilter() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const doctorCards = document.querySelectorAll('.doctor-card');

  if (!filterBtns.length || !doctorCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      doctorCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.classList.add('reveal-active');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE PATIENT FAQ ACCORDION (Animated Toggle)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other FAQ items for clean accordion behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle clicked item
        item.classList.toggle('active', !isOpen);
      });
    }
  });
}

/* ==========================================================================
   5. MOBILE NAVIGATION
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

    // Close menu when clicking nav links or mobile book button
    navMenu.querySelectorAll('.nav-link, .btn-nav-book-mobile').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.innerHTML = '☰';
      });
    });
  }
}

/* ==========================================================================
   6. APPOINTMENT BOOKING & WHATSAPP DISPATCH (100% English)
   ========================================================================== */
function initBookingSystem() {
  const bookingForm = document.getElementById('appointmentForm');
  const modalOverlay = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const waModalBtn = document.getElementById('modalSendWhatsApp');

  if (!bookingForm) return;

  // Set minimum date to today
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
      alert('Please enter your full name and phone number to proceed.');
      return;
    }

    // Generate Unique Token
    const token = 'KRT-' + Math.floor(100000 + Math.random() * 900000);

    // Update modal elements
    document.getElementById('tokenVal').textContent = token;
    document.getElementById('tokenPatient').textContent = `${name} (${age || 'N/A'} yrs)`;
    document.getElementById('tokenDoctor').textContent = doctorName;
    document.getElementById('tokenDateTime').textContent = `${date} - ${timeSlot}`;
    document.getElementById('tokenPhone').textContent = phone;

    // Build prefilled English WhatsApp message
    const waText = encodeURIComponent(
      `*Hello Satya Sri Kartikeya Multi Speciality Hospital (Jaggampeta)*\n\n` +
      `I would like to confirm my doctor consultation request:\n` +
      `📋 *Token ID:* ${token}\n` +
      `👤 *Patient Name:* ${name}\n` +
      `🎂 *Age:* ${age || 'N/A'} yrs\n` +
      `📱 *Phone Number:* ${phone}\n` +
      `🩺 *Doctor / Department:* ${doctorName}\n` +
      `📅 *Appointment Date:* ${date}\n` +
      `⏰ *Preferred Slot:* ${timeSlot}\n` +
      `📝 *Reason / Notes:* ${notes}\n\n` +
      `Please confirm my appointment slot. Thank you!`
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
        `*Hello Satya Sri Kartikeya Hospital!*\nI would like to book a consultation with *${doctorName}*.\n` +
        `👤 Patient Name: ${name} (Age: ${age})\n` +
        `📅 Date: ${date}\n` +
        `⏰ Preferred Time: ${timeSlot}\n` +
        `Please share appointment details.`
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
   7. DOCTOR CARDS DIRECT BOOKING TRIGGER
   ========================================================================== */
function initDoctorBookingButtons() {
  document.querySelectorAll('.btn-doc-book').forEach(btn => {
    btn.addEventListener('click', () => {
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
        `Hello Doctor! I would like to enquire about consultation with *${docName}* (${dept}) at Satya Sri Kartikeya Hospital, Jaggampeta.`
      );
      window.open(`https://wa.me/${HOSPITAL_PHONE_INTL}?text=${text}`, '_blank');
    });
  });
}

/* ==========================================================================
   8. AI / VIRTUAL ASSISTANT CHATBOX (100% English)
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

  // Comprehensive English Knowledge Base
  const knowledgeBase = [
    {
      keywords: ['doctor', 'specialist', 'specialists', 'list', 'consultant', 'gynecologist', 'pediatrician', 'ortho', 'surgeon', 'physician', 'radiologist'],
      reply: 'Our Senior Medical Specialists at Satya Sri Kartikeya Hospital:\n\n• Dr. Surekha M.S. (OBG) – Consultant Obstetrician & Gynecologist\n• Dr. Prashanth Kumar M.B.B.S., DNB – General Medicine & Critical Care\n• Dr. Masthan Vali Shaik M.B.B.S., DCH – Pediatrician & Child Specialist\n• Dr. Avinash M.S. (Ortho) – Orthopedic & Joint Surgeon\n• Dr. Moushmi MD – Radiologist (Ultrasound & Diagnostic Imaging)\n• Dr. S. Subbaraju M.S. – General & Laparoscopic Surgeon\n\nWould you like to book an appointment with any doctor?'
    },
    {
      keywords: ['free', 'camp', 'scan', 'offer', 'sugar', 'checkup', 'discount'],
      reply: 'Inaugural Free Launch Offers & Health Camps:\n\n🎁 100% FREE OP Consultations for 1 full month across all departments!\n🤰 FREE Ultrasound Scans (worth ₹1100) for pregnancy & abdomen every Monday, Thursday & Saturday!\n🩸 FREE Fasting & Post-Prandial Blood Sugar Tests + Free OP every Wednesday!\n👶 FREE Pediatric Checkup & Fever Blood Tests every Friday!'
    },
    {
      keywords: ['aarogyasri', 'aarogya', 'insurance', 'ehs', 'cashless', 'star health', 'hdfc', 'icici', 'care health', 'claim'],
      reply: 'Yes! We proudly offer 100% Cashless Healthcare:\n\n✅ Dr. YSR Aarogyasri (Full coverage for eligible families)\n✅ AP Govt Employees Health Scheme (EHS)\n✅ Empanelled with all leading private insurance TPAs (Star Health, HDFC Ergo, ICICI Lombard, Care Health, Medi Assist, etc.).\n\nCall our insurance desk at +91 9391131013 for immediate pre-authorization assistance.'
    },
    {
      keywords: ['location', 'address', 'where', 'maps', 'directions', 'reach', 'jaggampeta'],
      reply: '📍 Hospital Address:\nSatya Sri Kartikeya Multi Speciality Hospital\n(Formerly Satyakrishna Hospital Premises)\nDoor No. 3-212/2, NH-16 National Highway, Neeladrirao Peta, Jaggampeta, Kakinada District, Andhra Pradesh - 533435.\n\nHelpline: +91 9391131013\nOpen 24/7 for Emergency & Casualty.'
    },
    {
      keywords: ['emergency', 'ambulance', 'call', 'casualty', 'night', 'contact', 'phone', 'hotline'],
      reply: '🚨 24/7 Emergency Casualty & Ambulance Hotline:\nCall immediately: +91 9391131013 or +91 9441931333.\nOur trauma care team, ICU physicians, and emergency surgical OT are active 24 hours every day.'
    },
    {
      keywords: ['book', 'appointment', 'op', 'timings', 'slot', 'schedule', 'fee'],
      reply: 'How to Book an Appointment:\n1. Use the online form on this page to get an instant token ID.\n2. Or message us directly on WhatsApp at +91 9391131013.\n\nOPD Consultation Hours:\n• Morning: 9:30 AM - 1:30 PM\n• Evening: 5:00 PM - 8:30 PM\n• 24/7 Emergency Casualty is always open.'
    }
  ];

  function appendMessage(text, sender = 'bot', hasWhatsAppBtn = false) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = text.replace(/\n/g, '<br>');

    if (hasWhatsAppBtn) {
      const waLink = document.createElement('a');
      waLink.href = `https://wa.me/${HOSPITAL_PHONE_INTL}?text=${encodeURIComponent('Hello Satya Sri Kartikeya Hospital! I need medical assistance / appointment.')}`;
      waLink.target = '_blank';
      waLink.className = 'btn-header-whatsapp';
      waLink.style.marginTop = '10px';
      waLink.style.display = 'inline-flex';
      waLink.innerHTML = '💬 Chat on WhatsApp';
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
    const match = knowledgeBase.find(kb => 
      kb.keywords.some(k => lower.includes(k.toLowerCase()))
    );

    setTimeout(() => {
      if (match) {
        appendMessage(match.reply, 'bot', true);
      } else {
        const defaultReply = 'Thank you for reaching out! For detailed medical consultation or immediate assistance, please connect with our 24/7 reception desk or WhatsApp helpline at +91 9391131013.';
        appendMessage(defaultReply, 'bot', true);
      }
    }, 350);
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
   9. IMAGE LIGHTBOX (Brochures Zoom)
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

// Global quick booking helper for Free Launch Camps
window.bookFreeCamp = function(campType) {
  const bookingSec = document.getElementById('appointment-booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
    const notes = document.getElementById('patientNotes');
    if (notes) {
      notes.value = `Booking for Special Launch Privilege: ${campType}`;
    }
  }
};
