// --- Product Data ---
const products = [
    { id: 1, title: "Anel de Diamante Solitário", category: "aneis", price: 5400, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Colar de Pérolas Clássico", category: "colares", price: 2800, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Brincos de Esmeralda", category: "brincos", price: 3200, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Pulseira de Ouro 18k", category: "braceletes", price: 1900, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Anel de Safira Azul", category: "aneis", price: 4100, image: "https://images.unsplash.com/photo-1573408302185-9127ff5f6133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "Conjunto Diamantes Noiva", category: "conjuntos", price: 12500, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 7, title: "Bracelete Cravejado", category: "braceletes", price: 6700, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 8, title: "Colar Coração Rubi", category: "colares", price: 3900, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

// --- State Management ---
let cart = [];

// --- DOM Elements ---
const productsGrid = document.getElementById('products-grid');
const tabBtns = document.querySelectorAll('.tab-btn');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCount = document.getElementById('cart-count');
const themeToggle = document.getElementById('theme-toggle');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileSidebar = document.getElementById('mobile-sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const loginIconBtn = document.getElementById('login-icon-btn');
const loginModal = document.getElementById('login-modal');
const productModal = document.getElementById('product-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    renderProducts(products);
    initHeroScrollAnimation();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// --- Hero Scroll Animation ---
function initHeroScrollAnimation() {
    const heroSection = document.querySelector('.hero-scroll-zoom');
    const heroText = document.querySelector('.hero-text-side');
    const zoomImage = document.querySelector('.zoom-image');
    
    if (!heroSection || !zoomImage) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 993px)", () => {
        // Desktop Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        tl.to(zoomImage, {
            scale: 4,
            rotate: 0,
            x: "-25vw", // Move from right to center
            ease: "none"
        }, 0);

        tl.to(heroText, {
            opacity: 0,
            x: -150,
            scale: 0.8,
            ease: "none"
        }, 0);
    });

    mm.add("(max-width: 992px)", () => {
        // Mobile/Tablet Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        tl.to(zoomImage, {
            scale: 1.8,
            rotate: 0,
            ease: "none"
        }, 0);

        tl.to(heroText, {
            opacity: 0,
            y: -50,
            ease: "none"
        }, 0);
    });
}

// --- Product Rendering ---
function renderProducts(productsToRender) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card animate-up';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <button class="btn-quick-view" onclick="openProductModal(${product.id})">Visualizar</button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <button class="btn-primary btn-block" style="margin-top: 15px;" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// --- Filtering ---
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        if (category === 'todos') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    });
});

// --- Cart Logic ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    openCart();
}

function updateCartUI() {
    cartCount.innerText = cart.length;
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer;"><i class="fas fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalValue.innerText = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function openCart() {
    cartSidebar.classList.add('active');
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));

// --- Modals ---
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="about-grid" style="padding:0;">
            <div class="about-image">
                <img src="${product.image}" alt="${product.title}" style="width:100%; height:auto;">
            </div>
            <div class="about-text">
                <h2 class="section-title" style="text-align:left; margin-bottom:20px;">${product.title}</h2>
                <p class="product-price" style="font-size:1.8rem; margin-bottom:20px;">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p style="margin-bottom:30px;">Uma peça exclusiva da coleção CLAR’S, desenhada para destacar sua beleza e elegância natural. Produzida com materiais da mais alta qualidade e acabamento impecável.</p>
                <button class="btn-primary" onclick="addToCart(${product.id}); closeModal();">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
    productModal.classList.add('active');
}

function closeModal() {
    productModal.classList.remove('active');
    loginModal.classList.remove('active');
}

closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
loginIconBtn.addEventListener('click', () => loginModal.classList.add('active'));

// --- Theme Toggle ---
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// --- Search Logic ---
searchBtn.addEventListener('click', () => {
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    }
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
    );
    renderProducts(filtered);
});

// --- Mobile Menu ---
mobileMenuBtn.addEventListener('click', () => mobileSidebar.classList.add('active'));
closeSidebar.addEventListener('click', () => mobileSidebar.classList.remove('active'));
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => mobileSidebar.classList.remove('active'));
});
