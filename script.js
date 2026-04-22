// Data: Products
const products = [
    {
        id: 1,
        name: "Colar Aurora Rosê",
        price: 2450.00,
        image: "product1.png",
        description: "Um colar delicado em ouro rosê 18k com um diamante central lapidado à mão. Perfeito para iluminar momentos especiais.",
        rating: 5
    },
    {
        id: 2,
        name: "Brincos Sophia",
        price: 1890.00,
        image: "product2.png",
        description: "Brincos de safira rosa envoltos em ouro rosê. Uma peça que combina força e delicadeza em um design atemporal.",
        rating: 4
    },
    {
        id: 3,
        name: "Bracelete Harmony",
        price: 3200.00,
        image: "product3.png",
        description: "Bracelete rígido com design minimalista. Uma peça de afirmação que traz sofisticação a qualquer look.",
        rating: 5
    },
    {
        id: 4,
        name: "Anel Essence",
        price: 1560.00,
        image: "hero_ring.png",
        description: "O clássico anel de noivado CLAR'S. Brilho intenso e elegância pura em cada detalhe.",
        rating: 5
    }
];

// State
let cart = [];
let isDarkMode = false;

// DOM Elements
const navbar = document.getElementById('navbar');
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartPanel = document.getElementById('cart-panel');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceDisplay = document.getElementById('total-price');
const themeToggle = document.getElementById('theme-toggle');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const loginBtn = document.getElementById('login-icon-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileSidebar = document.getElementById('mobile-sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const heroRing = document.getElementById('hero-ring');
const productModal = document.getElementById('product-modal');
const productDetailBody = document.getElementById('product-detail-body');
const closeProductModal = document.getElementById('close-product-modal');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    initAnimations();
    setupEventListeners();
});

// --- Functions ---

function renderProducts(items) {
    productGrid.innerHTML = items.map(product => `
        <div class="product-card animate-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="btn-view-details" onclick="openProductDetail(${product.id})">Ver detalhes</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            </div>
        </div>
    `).join('');
    
    // Observer for new elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-up, .animate-fade-zoom').forEach(el => observer.observe(el));
}

function setupEventListeners() {
    // Navbar Scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });

    // Hero Parallax / 3D Effect
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        
        if (heroRing) {
            heroRing.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) translateY(${y * 0.5}px)`;
        }
    });

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        const icon = themeToggle.querySelector('i');
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Search Toggle
    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.classList.remove('active');
            closeAllModals();
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box-container')) {
            searchInput.classList.remove('active');
        }
    });

    // Cart Controls
    cartBtn.addEventListener('click', () => {
        cartPanel.classList.add('active');
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => closeCartPanel());
    cartOverlay.addEventListener('click', () => {
        closeCartPanel();
        closeAllModals();
    });

    // Login Modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    closeLogin.addEventListener('click', () => loginModal.classList.remove('active'));

    // Mobile Menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileSidebar.classList.add('active');
    });
    closeSidebar.addEventListener('click', () => mobileSidebar.classList.remove('active'));
    
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => mobileSidebar.classList.remove('active'));
    });

    closeProductModal.addEventListener('click', () => productModal.classList.remove('active'));
}

function closeCartPanel() {
    cartPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
}

function closeAllModals() {
    loginModal.classList.remove('active');
    productModal.classList.remove('active');
    mobileSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// --- Cart Logic ---

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    // Show cart panel automatically when adding
    cartPanel.classList.add('active');
    cartOverlay.classList.add('active');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    cartCount.innerText = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 2rem;">Seu carrinho está vazio.</p>';
        totalPriceDisplay.innerText = 'R$ 0,00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                <button class="btn-remove" onclick="removeFromCart(${index})">Remover</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceDisplay.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// --- Product Modal Logic ---

window.openProductDetail = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    productDetailBody.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail-info">
            <h2>${product.name}</h2>
            <div class="detail-rating">
                ${'<i class="fas fa-star"></i>'.repeat(product.rating)}
                ${'<i class="far fa-star"></i>'.repeat(5 - product.rating)}
            </div>
            <p class="detail-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            <p class="detail-desc">${product.description}</p>
            <div class="detail-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id}); closeAllModals();">Adicionar ao carrinho</button>
                <button class="btn-buy-now">Comprar agora</button>
            </div>
        </div>
    `;

    productModal.classList.add('active');
};
