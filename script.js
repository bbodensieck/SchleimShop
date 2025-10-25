// Product Data
const products = [
    {
        id: 1,
        name: 'Glitzer Galaxy Schleim',
        category: 'glitter',
        price: 12.99,
        description: 'Funkelnder Schleim mit Glitzerpartikeln in Galaxie-Farben',
        icon: '✨',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        badge: 'Beliebt'
    },
    {
        id: 2,
        name: 'Fluffy Cloud Schleim',
        category: 'fluffy',
        price: 14.99,
        description: 'Super weicher und fluffiger Schleim wie Wolken',
        icon: '☁️',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        badge: 'Neu'
    },
    {
        id: 3,
        name: 'Crystal Clear Schleim',
        category: 'clear',
        price: 11.99,
        description: 'Kristallklarer durchsichtiger Schleim',
        icon: '💎',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        id: 4,
        name: 'Butter Slime Deluxe',
        category: 'butter',
        price: 13.99,
        description: 'Geschmeidiger Butter-Schleim zum Streichen',
        icon: '🧈',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        badge: 'Top'
    },
    {
        id: 5,
        name: 'Regenbogen Glitzer',
        category: 'glitter',
        price: 15.99,
        description: 'Alle Regenbogenfarben mit extra Glitzer',
        icon: '🌈',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        badge: 'Bestseller'
    },
    {
        id: 6,
        name: 'Mint Fluffy Dream',
        category: 'fluffy',
        price: 14.99,
        description: 'Minzgrüner fluffiger Traum-Schleim',
        icon: '🌿',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        id: 7,
        name: 'Diamant Clear',
        category: 'clear',
        price: 12.99,
        description: 'Glänzend klarer Schleim wie ein Diamant',
        icon: '💠',
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    },
    {
        id: 8,
        name: 'Vanille Butter Schleim',
        category: 'butter',
        price: 13.99,
        description: 'Weicher Butter-Schleim mit Vanilleduft',
        icon: '🍦',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
        id: 9,
        name: 'Pink Sparkle',
        category: 'glitter',
        price: 12.99,
        description: 'Rosa Glitzer-Schleim für Prinzessinnen',
        icon: '👑',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    },
    {
        id: 10,
        name: 'Bubble Gum Fluffy',
        category: 'fluffy',
        price: 14.99,
        description: 'Kaugummi-rosa fluffiger Schleim',
        icon: '🍬',
        gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)'
    },
    {
        id: 11,
        name: 'Ocean Clear',
        category: 'clear',
        price: 11.99,
        description: 'Meeresblauer klarer Schleim',
        icon: '🌊',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        id: 12,
        name: 'Chocolate Butter',
        category: 'butter',
        price: 13.99,
        description: 'Schokoladenbrauner Butter-Schleim',
        icon: '🍫',
        gradient: 'linear-gradient(135deg, #c79081 0%, #dfa579 100%)'
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('all');
    loadCart();
    updateCartUI();
});

// Load Products
function loadProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image" style="background: ${product.gradient}">
            <span style="font-size: 5rem">${product.icon}</span>
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price.toFixed(2)} €</span>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Kaufen</span>
                </button>
            </div>
        </div>
    `;
    return card;
}

// Get Category Name
function getCategoryName(category) {
    const names = {
        'glitter': 'Glitzer',
        'fluffy': 'Fluffy',
        'clear': 'Clear',
        'butter': 'Butter'
    };
    return names[category] || category;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    // Show feedback
    showNotification('Produkt zum Warenkorb hinzugefügt! 🎉');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update Cart Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Dein Warenkorb ist leer</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background: ${item.gradient}">
                    ${item.icon}
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toFixed(2)} €`;
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('schleimshop_cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('schleimshop_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Cart Modal Toggle
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Product Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Load products with filter
        const filter = btn.getAttribute('data-filter');
        loadProducts(filter);
    });
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Vielen Dank für deine Nachricht! Wir melden uns bald. 📧');
    contactForm.reset();
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Dein Warenkorb ist leer! 🛒');
        return;
    }
    
    showNotification('Vielen Dank für deine Bestellung! 🎉');
    cart = [];
    saveCart();
    updateCartUI();
    cartModal.classList.remove('active');
});

// Add animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================================
// Music Playground with Tone.js
// ===========================================

let isPlaying = false;
let currentPattern = 'pattern1';
let drumEnabled = true;
let bassEnabled = true;
let synthEnabled = true;

// Define patterns
const patterns = {
    pattern1: {
        drum: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        bass: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        synth: [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]
    },
    pattern2: {
        drum: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        bass: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        synth: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]
    },
    pattern3: {
        drum: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        bass: [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
        synth: [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0]
    },
    custom: {
        drum: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        bass: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        synth: [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]
    }
};

// Note arrays for bass and synth (can be modified by live code)
let bassNotes = ['C2', 'C2', 'G1', 'G1', 'A1', 'A1', 'F1', 'F1', 'C2', 'C2', 'G1', 'G1', 'A1', 'A1', 'F1', 'F1'];
let synthNotes = ['C4', 'E4', 'G4', 'E4', 'C4', 'E4', 'G4', 'E4', 'C4', 'E4', 'G4', 'E4', 'C4', 'E4', 'G4', 'E4'];

// Synths and instruments
let drumSynth, bassSynth, melodySynth, drumPart, bassPart, synthPart;

// Initialize Tone.js instruments
function initToneInstruments() {
    // Drum synth (kick drum sound)
    drumSynth = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 4,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
    }).toDestination();
    
    // Bass synth
    bassSynth = new Tone.MonoSynth({
        oscillator: { type: 'sawtooth' },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.2, release: 0.5 },
        filter: { Q: 3, type: 'lowpass', rolloff: -24 },
        filterEnvelope: { attack: 0.001, decay: 0.1, sustain: 0.5, release: 2, baseFrequency: 200, octaves: 2.6 }
    }).toDestination();
    
    // Melody synth
    melodySynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'square' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
    }).toDestination();
}

// Create sequencers
function createSequencers() {
    const pattern = patterns[currentPattern];
    
    // Drum sequencer
    drumPart = new Tone.Sequence((time, step) => {
        if (pattern.drum[step] && drumEnabled) {
            drumSynth.triggerAttackRelease('C2', '8n', time);
        }
        highlightStep('drum', step);
    }, [...Array(16).keys()], '16n');
    
    // Bass sequencer
    bassPart = new Tone.Sequence((time, step) => {
        if (pattern.bass[step] && bassEnabled) {
            bassSynth.triggerAttackRelease(bassNotes[step], '8n', time);
        }
        highlightStep('bass', step);
    }, [...Array(16).keys()], '16n');
    
    // Synth sequencer
    synthPart = new Tone.Sequence((time, step) => {
        if (pattern.synth[step] && synthEnabled) {
            melodySynth.triggerAttackRelease(synthNotes[step], '8n', time);
        }
        highlightStep('synth', step);
    }, [...Array(16).keys()], '16n');
}

// Highlight current step in visualizer
function highlightStep(track, step) {
    Tone.Draw.schedule(() => {
        // Remove previous highlighting
        document.querySelectorAll(`.pattern-step[data-track="${track}"]`).forEach(el => {
            el.classList.remove('playing');
        });
        
        // Add current step highlighting
        const stepElement = document.querySelector(`.pattern-step[data-track="${track}"][data-step="${step}"]`);
        if (stepElement) {
            stepElement.classList.add('playing');
            setTimeout(() => stepElement.classList.remove('playing'), 100);
        }
    }, 0);
}

// Generate pattern grid
function generatePatternGrid() {
    const patternGrid = document.getElementById('patternGrid');
    if (!patternGrid) return;
    
    patternGrid.innerHTML = '';
    
    const pattern = patterns[currentPattern];
    const tracks = ['drum', 'bass', 'synth'];
    const trackLabels = { drum: '🥁 Drums', bass: '🎸 Bass', synth: '🎹 Synth' };
    
    tracks.forEach(track => {
        // Add track label
        const label = document.createElement('div');
        label.className = 'pattern-label';
        label.textContent = trackLabels[track];
        patternGrid.appendChild(label);
        
        // Add steps
        for (let i = 0; i < 16; i++) {
            const step = document.createElement('div');
            step.className = 'pattern-step';
            step.dataset.track = track;
            step.dataset.step = i;
            
            if (pattern[track][i]) {
                step.classList.add('active');
            }
            
            // Allow toggling steps
            step.addEventListener('click', () => {
                pattern[track][i] = pattern[track][i] ? 0 : 1;
                step.classList.toggle('active');
            });
            
            patternGrid.appendChild(step);
        }
    });
}

// Play button
const playBtn = document.getElementById('playBtn');
if (playBtn) {
    playBtn.addEventListener('click', async () => {
        if (!isPlaying) {
            await Tone.start();
            
            // Initialize instruments if not already done
            if (!drumSynth) {
                initToneInstruments();
                createSequencers();
            }
            
            // Start all parts
            Tone.Transport.start();
            drumPart.start(0);
            bassPart.start(0);
            synthPart.start(0);
            
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        } else {
            // Pause
            Tone.Transport.pause();
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
        }
    });
}

// Stop button
const stopBtn = document.getElementById('stopBtn');
if (stopBtn) {
    stopBtn.addEventListener('click', () => {
        Tone.Transport.stop();
        if (drumPart) drumPart.stop(0);
        if (bassPart) bassPart.stop(0);
        if (synthPart) synthPart.stop(0);
        
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
        
        // Clear highlighting
        document.querySelectorAll('.pattern-step').forEach(el => {
            el.classList.remove('playing');
        });
    });
}

// Tempo slider
const tempoSlider = document.getElementById('tempoSlider');
const tempoValue = document.getElementById('tempoValue');
if (tempoSlider && tempoValue) {
    tempoSlider.addEventListener('input', (e) => {
        const bpm = e.target.value;
        tempoValue.textContent = bpm;
        Tone.Transport.bpm.value = bpm;
    });
}

// Pattern selection
const patternBtns = document.querySelectorAll('.pattern-btn');
patternBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Stop current playback
        const wasPlaying = isPlaying;
        if (isPlaying) {
            Tone.Transport.stop();
            if (drumPart) drumPart.stop(0);
            if (bassPart) bassPart.stop(0);
            if (synthPart) synthPart.stop(0);
            isPlaying = false;
        }
        
        // Update active button
        patternBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Change pattern
        currentPattern = btn.dataset.pattern;
        
        // Dispose old parts
        if (drumPart) drumPart.dispose();
        if (bassPart) bassPart.dispose();
        if (synthPart) synthPart.dispose();
        
        // Create new sequencers
        createSequencers();
        
        // Update grid
        generatePatternGrid();
        
        // Resume if was playing
        if (wasPlaying) {
            Tone.Transport.start();
            drumPart.start(0);
            bassPart.start(0);
            synthPart.start(0);
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
    });
});

// Instrument toggles
const toggleDrum = document.getElementById('toggleDrum');
const toggleBass = document.getElementById('toggleBass');
const toggleSynth = document.getElementById('toggleSynth');

if (toggleDrum) {
    toggleDrum.addEventListener('change', (e) => {
        drumEnabled = e.target.checked;
    });
}

if (toggleBass) {
    toggleBass.addEventListener('change', (e) => {
        bassEnabled = e.target.checked;
    });
}

if (toggleSynth) {
    toggleSynth.addEventListener('change', (e) => {
        synthEnabled = e.target.checked;
    });
}

// Initialize pattern grid on load
if (document.getElementById('patternGrid')) {
    generatePatternGrid();
}

// ===========================================
// Live Code Editor
// ===========================================

const codeEditor = document.getElementById('codeEditor');
const editorHighlight = document.getElementById('editorHighlight');
const runCodeBtn = document.getElementById('runCode');
const clearCodeBtn = document.getElementById('clearCode');
const modeBtns = document.querySelectorAll('.mode-btn');
const editorView = document.getElementById('editorView');
const visualView = document.getElementById('visualView');

// Example patterns
const examplePatterns = {
    basic: `// Basic Beat Pattern
// Syntax: pattern(track, notes, duration)
pattern('drum', 'C2', '1 0 0 0 1 0 0 0 1 0 0 0 1 0 0 0');
pattern('bass', 'C2 C2 G1 G1', '1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0');
pattern('synth', 'C4 E4 G4 E4', '1 0 1 0 0 0 1 0 1 0 0 0 1 0 1 0');`,
    
    techno: `// Techno Pattern
pattern('drum', 'C2', '1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0');
pattern('bass', 'C2 C2 D2 C2 C2 D2', '1 0 0 1 0 0 1 0 1 0 0 1 0 0 1 0');
pattern('synth', 'C4 E4 G4 B4', '0 0 1 0 0 0 1 0 0 0 1 0 0 0 1 0');`,
    
    ambient: `// Ambient Pattern
pattern('drum', 'C2', '1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0');
pattern('bass', 'C2 A1 F1', '1 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0');
pattern('synth', 'C4 E4 G4 C5 E5', '1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0');`,
    
    slime: `// Gibbery Slime Theme 🧪
// Bubbly, squishy, and fun!
pattern('drum', 'C2', '1 0 1 0 0 1 0 0 1 0 0 1 0 1 0 0');
pattern('bass', 'G1 A1 F1 G1 E1', '1 0 0 1 0 1 0 0 0 1 0 0 1 0 1 0');
pattern('synth', 'E5 G5 C5 E5 D5 G5 C5', '1 1 0 1 0 0 1 1 0 1 0 1 0 0 1 0');`
};

// Set default example
if (codeEditor) {
    codeEditor.value = examplePatterns.basic;
    highlightCode();
}

// Syntax highlighting
function highlightCode() {
    if (!codeEditor || !editorHighlight) return;
    
    const code = codeEditor.value;
    
    // First, escape HTML to prevent XSS
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    
    let highlighted = escapeHtml(code);
    
    // Highlight comments
    highlighted = highlighted.replace(/(\/\/.*)/g, '<span style="color: #6A9955;">$1</span>');
    
    // Highlight function names
    highlighted = highlighted.replace(/\b(pattern)\b/g, '<span style="color: #DCDCAA;">$1</span>');
    
    // Highlight strings
    highlighted = highlighted.replace(/('[^']*'|"[^"]*")/g, '<span style="color: #CE9178;">$1</span>');
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span style="color: #B5CEA8;">$1</span>');
    
    // Highlight track names (drum, bass, synth)
    highlighted = highlighted.replace(/\b(drum|bass|synth)\b/g, '<span style="color: #4EC9B0;">$1</span>');
    
    // Highlight note names (C2, E4, etc.)
    highlighted = highlighted.replace(/\b([A-G][#b]?[0-9])\b/g, '<span style="color: #9CDCFE;">$1</span>');
    
    editorHighlight.innerHTML = highlighted;
}

// Editor input handler
if (codeEditor) {
    codeEditor.addEventListener('input', highlightCode);
    codeEditor.addEventListener('scroll', () => {
        if (editorHighlight) {
            editorHighlight.scrollTop = codeEditor.scrollTop;
            editorHighlight.scrollLeft = codeEditor.scrollLeft;
        }
    });
    
    // Handle tab key
    codeEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
            codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
            highlightCode();
        }
        
        // Ctrl+Enter to run code
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });
}

// Parse and execute code
function runCode() {
    if (!codeEditor) return;
    
    const code = codeEditor.value;
    const lines = code.split('\n');
    
    // Reset patterns
    patterns.custom = {
        drum: new Array(16).fill(0),
        bass: new Array(16).fill(0),
        synth: new Array(16).fill(0)
    };
    
    // Custom notes arrays
    let customBassNotes = [];
    let customSynthNotes = [];
    
    try {
        lines.forEach((line, lineNum) => {
            line = line.trim();
            
            // Skip comments and empty lines
            if (line.startsWith('//') || line === '') return;
            
            // Parse pattern() function
            const patternMatch = line.match(/pattern\s*\(\s*['"](\w+)['"]\s*,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
            
            if (patternMatch) {
                const track = patternMatch[1];
                const notes = patternMatch[2].trim().split(/\s+/);
                const rhythm = patternMatch[3].trim().split(/\s+/).map(x => parseInt(x));
                
                if (!['drum', 'bass', 'synth'].includes(track)) {
                    throw new Error(`Line ${lineNum + 1}: Invalid track "${track}". Use drum, bass, or synth.`);
                }
                
                if (rhythm.length > 16) {
                    throw new Error(`Line ${lineNum + 1}: Pattern too long (max 16 steps).`);
                }
                
                // Pad rhythm to 16 steps
                const paddedRhythm = rhythm.concat(new Array(16 - rhythm.length).fill(0));
                
                patterns.custom[track] = paddedRhythm;
                
                // Store notes for bass and synth
                if (track === 'bass') {
                    customBassNotes = notes;
                } else if (track === 'synth') {
                    customSynthNotes = notes;
                }
            } else if (line.length > 0) {
                throw new Error(`Line ${lineNum + 1}: Invalid syntax. Use pattern('track', 'notes', 'rhythm').`);
            }
        });
        
        // Helper function to expand notes to 16 steps
        const expandNotes = (notes, defaultNotes) => {
            if (notes.length === 0) return defaultNotes;
            const result = [];
            for (let i = 0; i < 16; i++) {
                result.push(notes[i % notes.length]);
            }
            return result;
        };
        
        // Update note arrays if provided
        bassNotes = expandNotes(customBassNotes, bassNotes);
        synthNotes = expandNotes(customSynthNotes, synthNotes);
        
        // Switch to custom pattern
        currentPattern = 'custom';
        
        // Stop current playback
        const wasPlaying = isPlaying;
        if (isPlaying) {
            Tone.Transport.stop();
            if (drumPart) drumPart.stop(0);
            if (bassPart) bassPart.stop(0);
            if (synthPart) synthPart.stop(0);
            isPlaying = false;
        }
        
        // Dispose old parts
        if (drumPart) drumPart.dispose();
        if (bassPart) bassPart.dispose();
        if (synthPart) synthPart.dispose();
        
        // Create new sequencers
        createSequencers();
        
        // Update visual grid
        generatePatternGrid();
        
        // Resume if was playing
        if (wasPlaying) {
            Tone.Transport.start();
            drumPart.start(0);
            bassPart.start(0);
            synthPart.start(0);
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
        
        showNotification('✅ Code executed successfully!');
        
    } catch (error) {
        showNotification('❌ Error: ' + error.message);
        console.error('Code execution error:', error);
    }
}

// Run code button
if (runCodeBtn) {
    runCodeBtn.addEventListener('click', runCode);
}

// Clear code button
if (clearCodeBtn) {
    clearCodeBtn.addEventListener('click', () => {
        if (codeEditor) {
            codeEditor.value = '';
            highlightCode();
        }
    });
}

// Example buttons
const exampleBtns = document.querySelectorAll('.example-btn');
exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const example = btn.dataset.example;
        if (codeEditor && examplePatterns[example]) {
            codeEditor.value = examplePatterns[example];
            highlightCode();
        }
    });
});

// Mode switcher
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        
        // Update active button
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Toggle views
        if (mode === 'editor') {
            editorView.style.display = 'flex';
            visualView.style.display = 'none';
        } else {
            editorView.style.display = 'none';
            visualView.style.display = 'block';
        }
    });
});

