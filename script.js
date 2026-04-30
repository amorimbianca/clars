// --- Product Data ---
const products = [
    { id: 1, title: "Anel de Diamante Solitário", category: "aneis", price: 5400, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Colar de Pérolas Clássico", category: "colares", price: 2800, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Brincos de Esmeralda", category: "brincos", price: 3200, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Pulseira de Ouro 18k", category: "braceletes", price: 1900, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Anel de Safira Azul", category: "aneis", price: 4100, image: "https://images.unsplash.com/photo-1573408302185-9127ff5f6133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "Conjunto Diamantes Noiva", category: "conjuntos", price: 12500, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 7, title: "Bracelete Cravejado", category: "braceletes", price: 6700, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 8, title: "Colar Coração Rubi", category: "colares", price: 3900, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 9, title: "Brincos Gota Diamante", category: "brincos", price: 4500, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 10, title: "Aliança Eternidade", category: "aneis", price: 3200, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 11, title: "Colar Riviera Ouro", category: "colares", price: 8900, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 12, title: "Conjunto Pérola Real", category: "conjuntos", price: 7200, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 13, title: "Bracelete Minimalista", category: "braceletes", price: 1500, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 14, title: "Anel Quartzo Rosa", category: "aneis", price: 2100, image: "https://images.unsplash.com/photo-1573408302185-9127ff5f6133?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 15, title: "Brincos Argola Ouro", category: "brincos", price: 1800, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 16, title: "Colar Relicário Prata", category: "colares", price: 1200, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 17, title: "Anel Topázio Imperial", category: "aneis", price: 3800, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 18, title: "Brincos Cascata Prata", category: "brincos", price: 2400, image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

// --- State Management ---
let cart = [];
let isLoginMode = true;

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
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileSidebar = document.getElementById('mobile-sidebar');
const closeSidebar = document.getElementById('close-sidebar');

// Auth Modal Elements
const openAuthBtn = document.getElementById('open-auth-btn');
const closeAuthBtn = document.getElementById('close-auth-btn');
const authModal = document.getElementById('auth-modal');
const authOverlay = document.querySelector('.auth-overlay');
const authForm = document.getElementById('auth-form');
const authModalTitle = document.getElementById('auth-modal-title');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const registerOnlyFields = document.getElementById('register-only-fields');
const confirmPassField = document.getElementById('confirm-pass-field');
const loginOptions = document.getElementById('login-options');
const visualDescription = document.getElementById('visual-description');
const authTabBtns = document.querySelectorAll('.auth-tab-btn');
const btnLearnMoreAuth = document.getElementById('btn-learn-more-auth');

const productModal = document.getElementById('product-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    initIntroLoader();
    renderProducts(products);
    initHeroScrollAnimation();
    initInteractiveBackground();
    
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    });

    initAuthModal();
});

// --- Intro Loader ---
function initIntroLoader() {
    const loader = document.getElementById('intro-loader');
    const logo = document.querySelector('.loader-logo');
    if (!loader || !logo) return;
    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline({
        onComplete: () => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden';
        }
    });
    tl.to(logo, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.5 })
    .to(loader, { opacity: 0, duration: 0.8, ease: "power2.inOut", delay: 0.8 })
    .to(logo, { scale: 1.1, opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.8");
}

// --- Interactive Background ---
function initInteractiveBackground() {
    const overlay = document.querySelector('.bg-gradient-overlay');
    if (!overlay) return;
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        const isDark = document.body.classList.contains('dark-mode');
        const c1 = '#ffebef'; const c2 = '#ffccd5'; const c3 = '#ffb3c1'; const c4 = '#ff8fa3'; 
        const d1 = '#1A080C'; const d2 = '#0F0407'; const d3 = '#3C1521';
        if (!isDark) gsap.to(overlay, { background: `radial-gradient(circle at ${x}% ${y}%, ${c1} 0%, ${c3} 30%, ${c2} 60%, ${c4} 100%)`, duration: 1.5, ease: "sine.out" });
        else gsap.to(overlay, { background: `radial-gradient(circle at ${x}% ${y}%, ${d1} 0%, ${d3} 40%, ${d2} 100%)`, duration: 1.5, ease: "sine.out" });
    });
}

// --- Hero Scroll Animation ---
function initHeroScrollAnimation() {
    const heroSection = document.querySelector('.hero-scroll-zoom');
    const heroContent = document.querySelector('.hero-content-left');
    const zoomImage = document.querySelector('.zoom-image');
    const splashBg = document.querySelector('.splash-bg');
    if (!heroSection || !zoomImage) return;
    let mm = gsap.matchMedia();
    mm.add("(min-width: 993px)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: 1.5 } });
        tl.to(zoomImage, { rotation: -5, scale: 1.2, y: -50, ease: "power2.out" }, 0);
        tl.to(splashBg, { scale: 1.5, opacity: 0.1, ease: "power2.out" }, 0);
        tl.to(heroContent, { opacity: 0, x: -100, scale: 0.9, ease: "power2.out" }, 0);
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
            <div class="product-image"><img src="${product.image}" alt="${product.title}"></div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <button class="btn-add-cart-chic" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// --- Auth Modal Logic ---
function initAuthModal() {
    if (!openAuthBtn || !authModal) return;

    openAuthBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeFn = () => {
        authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeAuthBtn.addEventListener('click', closeFn);
    authOverlay.addEventListener('click', closeFn);

    // Saiba Mais logic: close modal and scroll
    if (btnLearnMoreAuth) {
        btnLearnMoreAuth.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btnLearnMoreAuth.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            closeFn();
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }, 400); // Wait for modal close animation
            }
        });
    }

    const switchAuth = (mode) => {
        isLoginMode = (mode === 'login');
        authTabBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-auth-tab') === mode));

        if (isLoginMode) {
            authModalTitle.innerText = 'Bem-vindo à CLAR’S';
            authSubmitBtn.innerText = 'Entrar';
            registerOnlyFields.style.display = 'none';
            confirmPassField.style.display = 'none';
            loginOptions.style.display = 'flex';
            visualDescription.innerText = 'Onde cada detalhe conta uma história de brilho e exclusividade. Descubra a perfeição em cada peça.';
        } else {
            authModalTitle.innerText = 'Crie sua conta na CLAR’S';
            authSubmitBtn.innerText = 'Finalizar Cadastro';
            registerOnlyFields.style.display = 'block';
            confirmPassField.style.display = 'block';
            loginOptions.style.display = 'none';
            visualDescription.innerText = 'Junte-se à nossa comunidade exclusiva e receba ofertas personalizadas e acesso antecipado às novas coleções.';
        }
        gsap.from([registerOnlyFields, confirmPassField], { opacity: 0, y: -10, duration: 0.3 });
    };

    authTabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchAuth(btn.getAttribute('data-auth-tab')));
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const action = isLoginMode ? 'Login realizado' : 'Cadastro realizado';
        alert(`${action} com sucesso! Bem-vindo à CLAR’S.`);
        closeFn();
    });
}

// --- Cart & Other ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    openCart();
}

function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.innerText = cart.length;
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

function removeFromCart(index) { cart.splice(index, 1); updateCartUI(); }
function openCart() { cartSidebar.classList.add('active'); }
cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) icon.classList.replace('fa-moon', 'fa-sun');
    else icon.classList.replace('fa-sun', 'fa-moon');
});

mobileMenuBtn.addEventListener('click', () => mobileSidebar.classList.add('active'));
closeSidebar.addEventListener('click', () => mobileSidebar.classList.remove('active'));
