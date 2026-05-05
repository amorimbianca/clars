// --- Product Data ---
const products = [
    { id: 1, title: "Colar Solitaire Diamante", category: "colares", price: 5400, image: "product1.png", description: "Diamante lapidação brilhante em corrente de ouro 18k." },
    { id: 2, title: "Brincos Pink Sapphire", category: "brincos", price: 3200, image: "product2.png", description: "Safiras rosas selecionadas com cravação pavê em ouro rosé." },
    { id: 3, title: "Aliança Eternity Gold", category: "aneis", price: 2100, image: "product3.png", description: "Design minimalista e atemporal em ouro maciço polido." },
    { id: 4, title: "Tiara Royal Diamond", category: "conjuntos", price: 12500, image: "product4.png", description: "Peça exclusiva cravejada com diamantes e pérolas naturais." },
    { id: 5, title: "Anel de Safira Imperial", category: "aneis", price: 4100, image: "hero_ring.png", description: "Safira central profunda cercada por micro-diamantes." },
    { id: 6, title: "Colar Riviera Esmeralda", category: "colares", price: 8900, image: "hero2.png", description: "Esmeraldas colombianas em degradê de tamanhos perfeitos." },
    { id: 7, title: "Bracelete Cravejado", category: "braceletes", price: 6700, image: "hero3.png", description: "Luxo artesanal com centenas de pedras preciosas." },
    { id: 8, title: "Pendente Rubi Heart", category: "colares", price: 3900, image: "hero_jewelry.png", description: "O símbolo máximo do amor em rubi e ouro branco." }
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
    const featuredCards = document.querySelectorAll('.featured-card');
    
    if (!heroSection || !zoomImage) return;

    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 993px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 2, // Slightly more lag for extreme smoothness
            }
        });

        tl.to(zoomImage, { 
            rotation: 8, 
            scale: 1.15, 
            y: -80, 
            ease: "none" 
        }, 0);

        tl.to(splashBg, { 
            scale: 1.8, 
            opacity: 0.2, 
            y: 50,
            ease: "none" 
        }, 0);

        tl.to(heroContent, { 
            opacity: 0, 
            y: -100, 
            scale: 0.95, 
            ease: "none" 
        }, 0);

        // Subtle parallax for the featured mini-cards
        featuredCards.forEach((card, index) => {
            tl.to(card, {
                y: -150 - (index * 50),
                opacity: 0,
                ease: "none"
            }, 0);
        });
    });
}

// --- Product Rendering ---
function renderProducts(productsToRender) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <button class="btn-quick-view" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Comprar agora
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Cascade animation for products
    gsap.to('.product-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 85%'
        }
    });
}

// --- Auth Modal Logic ---
function initAuthModal() {
    if (!openAuthBtn || !authModal) return;

    openAuthBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const openAuthBtnMobile = document.getElementById('open-auth-btn-mobile');
    if (openAuthBtnMobile) {
        openAuthBtnMobile.addEventListener('click', () => {
            authModal.classList.add('active');
            mobileSidebar.classList.remove('active'); // Close sidebar after clicking login
            document.body.style.overflow = 'hidden';
        });
    }

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

    const btnForgotPass = document.getElementById('btn-forgot-pass');
    const btnBackToLogin = document.getElementById('btn-back-to-login');
    const passwordFields = document.getElementById('password-fields');
    const socialAuthSection = document.getElementById('social-auth-section');
    const backToLoginRow = document.getElementById('back-to-login-row');
    const authTabsContainer = document.querySelector('.auth-tabs-container');

    const switchAuth = (mode) => {
        isLoginMode = (mode === 'login');
        const isRecoverMode = (mode === 'recover');
        
        authTabBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-auth-tab') === mode));
        authTabsContainer.style.display = isRecoverMode ? 'none' : 'flex';

        if (mode === 'login') {
            authModalTitle.innerText = 'Bem-vindo à CLAR’S';
            authSubmitBtn.innerText = 'Entrar';
            registerOnlyFields.style.display = 'none';
            confirmPassField.style.display = 'none';
            passwordFields.style.display = 'block';
            loginOptions.style.display = 'flex';
            socialAuthSection.style.display = 'block';
            backToLoginRow.style.display = 'none';
            visualDescription.innerText = 'Onde cada detalhe conta uma história de brilho e exclusividade. Descubra a perfeição em cada peça.';
        } else if (mode === 'register') {
            authModalTitle.innerText = 'Crie sua conta na CLAR’S';
            authSubmitBtn.innerText = 'Finalizar Cadastro';
            registerOnlyFields.style.display = 'block';
            confirmPassField.style.display = 'block';
            passwordFields.style.display = 'block';
            loginOptions.style.display = 'none';
            socialAuthSection.style.display = 'block';
            backToLoginRow.style.display = 'none';
            visualDescription.innerText = 'Junte-se à nossa comunidade exclusiva e receba ofertas personalizadas e acesso antecipado às novas coleções.';
        } else if (mode === 'recover') {
            authModalTitle.innerText = 'Recupere sua Senha';
            authSubmitBtn.innerText = 'Enviar Link de Recuperação';
            registerOnlyFields.style.display = 'none';
            confirmPassField.style.display = 'none';
            passwordFields.style.display = 'none';
            loginOptions.style.display = 'none';
            socialAuthSection.style.display = 'none';
            backToLoginRow.style.display = 'block';
            visualDescription.innerText = 'Não se preocupe. Enviaremos as instruções para você redefinir sua senha com segurança.';
        }
        gsap.from('.auth-form-side > *', { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 });
    };

    authTabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchAuth(btn.getAttribute('data-auth-tab')));
    });

    if (btnForgotPass) btnForgotPass.addEventListener('click', (e) => { e.preventDefault(); switchAuth('recover'); });
    if (btnBackToLogin) btnBackToLogin.addEventListener('click', (e) => { e.preventDefault(); switchAuth('login'); });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let message = 'Ação realizada com sucesso!';
        if (isLoginMode) message = 'Login realizado com sucesso! Bem-vindo.';
        else if (authModalTitle.innerText.includes('Recupere')) message = 'Link de recuperação enviado para o seu e-mail.';
        else message = 'Cadastro realizado com sucesso! Bem-vindo à CLAR’S.';
        
        alert(message);
        closeFn();
    });
}

// --- Cart & Other ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
    
    // Subtle button feedback
    const btn = event.currentTarget;
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Adicionado';
        setTimeout(() => btn.innerHTML = originalText, 2000);
    }
}

function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; padding:50px; opacity:0.5;">Seu carrinho está vazio.</p>';
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div class="quantity-control">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})"><i class="fas fa-times"></i></button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    cartTotalValue.innerText = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function removeFromCart(index) { 
    cart.splice(index, 1); 
    updateCartUI(); 
}

function openCart() { cartSidebar.classList.add('active'); }
cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) icon.classList.replace('fa-moon', 'fa-sun');
    else icon.classList.replace('fa-sun', 'fa-moon');
});

mobileMenuBtn.addEventListener('click', () => {
    mobileSidebar.classList.add('active');
    mobileMenuBtn.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
    mobileSidebar.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
});

// Close sidebar when clicking on a link
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        toggleScroll(false);
    });
});

// --- Contact Form ---
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        gsap.to(contactForm, { 
            opacity: 0, 
            y: -20, 
            duration: 0.5, 
            onComplete: () => {
                contactForm.style.display = 'none';
                contactSuccess.style.display = 'block';
                gsap.from(contactSuccess, { opacity: 0, scale: 0.9, duration: 0.5 });
            }
        });
    });
}
// --- About Section Animations ---
function initAboutAnimations() {
    gsap.from('.about-visual-panel', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.about-content-panel > *', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
}

// --- Interface Polish ---
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Lock Utility
function toggleScroll(lock) {
    document.body.classList.toggle('no-scroll', lock);
}

// Safe Event Assignment
const safeListen = (id, event, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
};

safeListen('mobile-menu-btn', 'click', () => toggleScroll(true));
safeListen('close-sidebar', 'click', () => toggleScroll(false));
safeListen('cart-btn', 'click', () => toggleScroll(true));
safeListen('close-cart', 'click', () => toggleScroll(false));
safeListen('login-btn', 'click', () => toggleScroll(true));
safeListen('close-auth-btn', 'click', () => toggleScroll(false));

// Global Safety: Force hide loader after 5s
setTimeout(() => {
    const loader = document.getElementById('intro-loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none';
    }
}, 5000); 

// Global Section Reveals
function initGlobalReveals() {
    const revealElements = document.querySelectorAll('.section-title, .contact-grid, .footer-grid, .featured-card');
    
    revealElements.forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Subtle parallax on about and hero images
    gsap.to('.about-store-image', {
        y: -30,
        scrollTrigger: {
            trigger: '.about-section',
            scrub: true
        }
    });
}

initGlobalReveals();
initAboutAnimations();
