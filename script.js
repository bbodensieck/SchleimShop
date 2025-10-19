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
