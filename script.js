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
let currentUser = null;

// --- DOM Elements ---
const productsGrid = document.getElementById('products-grid');
const tabBtns = document.querySelectorAll('.tab-btn');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalValue = document.getElementById('cart-total-value');
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
const authTabBtns = document.querySelectorAll('.auth-tab-btn');

const productModal = document.getElementById('product-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    initIntroLoader();
    renderProducts(products);
    initHeroCarousel();
    
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    });

    initAuthModal();
    initProductTabs();
    initSearch();
});

// --- Product Tabs ---
function initProductTabs() {
    if (!tabBtns || tabBtns.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            // Filter products
            const filteredProducts = category === 'todos' 
                ? products 
                : products.filter(p => p.category === category);
            
            // Animate grid out and in
            gsap.to(productsGrid, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    renderProducts(filteredProducts);
                    gsap.to(productsGrid, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
        });
    });
}

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


// --- Hero Carousel ---
function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentSlide = 0;
    let slideInterval;

    if (!slides.length) return;

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    startAutoPlay();
}

// --- Product Rendering ---
function renderProducts(productsToRender) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p class="no-results">Nenhum produto encontrado para sua busca.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.opacity = '0'; // Start hidden for animation
        productCard.style.transform = 'translateY(20px)';
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
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out'
    });
}

// --- Auth Modal Logic ---
function initAuthModal() {
    const authModal = document.getElementById('auth-modal');
    const closeAuthBtn = document.getElementById('close-auth-btn');
    const authContainer = document.getElementById('auth-card-container');
    const signUpBtn = document.getElementById('signUp');
    const signInBtn = document.getElementById('signIn');
    const openAuthBtn = document.getElementById('open-auth-btn');
    const openAuthBtnMobile = document.getElementById('open-auth-btn-mobile');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    
    const signInForm = document.getElementById('signin-form');
    const signUpForm = document.getElementById('signup-form');

    const openFn = () => {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeFn = () => {
        if (authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Reset to sign-in panel on close after a small delay to hide the swap
            setTimeout(() => {
                if (authContainer) authContainer.classList.remove('right-panel-active');
            }, 400);
        }
    };

    if (openAuthBtn) openAuthBtn.addEventListener('click', openFn);
    if (openAuthBtnMobile) {
        openAuthBtnMobile.addEventListener('click', () => {
            openFn();
            if (mobileSidebar) mobileSidebar.classList.remove('active');
        });
    }

    if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeFn);
    
    // Panel Toggling
    if (signUpBtn && authContainer) signUpBtn.addEventListener('click', () => {
        authContainer.classList.add('right-panel-active');
    });

    if (signInBtn && authContainer) signInBtn.addEventListener('click', () => {
        authContainer.classList.remove('right-panel-active');
    });

    // Form Submission Logic
    const handleAuth = (e, emailId, nameId) => {
        e.preventDefault();
        const emailEl = document.getElementById(emailId);
        const nameEl = nameId ? document.getElementById(nameId) : null;
        
        const emailVal = emailEl ? emailEl.value : '';
        const nameVal = nameEl ? nameEl.value : '';
        
        let userName = nameVal || emailVal.split('@')[0];
        userName = userName.trim().split(/[ ._@]/)[0];
        userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
        
        currentUser = { name: userName, email: emailVal };
        updateNavbarUser();
        
        alert(`Bem-vindo à CLAR’S, ${userName}!`);
        closeFn();
    };

    if (signInForm) signInForm.addEventListener('submit', (e) => handleAuth(e, 'login-email'));
    if (signUpForm) signUpForm.addEventListener('submit', (e) => handleAuth(e, 'reg-email', 'reg-name'));
}

function updateNavbarUser() {
    const loginBtn = document.getElementById('open-auth-btn');
    const loginBtnMobile = document.getElementById('open-auth-btn-mobile');
    
    const userHTML = currentUser ? `
        <div class="user-logged-in">
            <span>Olá, ${currentUser.name}</span>
            <i class="fas fa-sign-out-alt logout-trigger" title="Sair" onclick="logoutUser()"></i>
        </div>
    ` : '';
    
    if (currentUser) {
        if (loginBtn) {
            const wrapper = document.createElement('div');
            wrapper.id = 'user-display-desktop';
            wrapper.innerHTML = userHTML;
            loginBtn.parentNode.replaceChild(wrapper, loginBtn);
        }
        if (loginBtnMobile) {
            const wrapperMobile = document.createElement('div');
            wrapperMobile.id = 'user-display-mobile';
            wrapperMobile.innerHTML = userHTML;
            loginBtnMobile.parentNode.replaceChild(wrapperMobile, loginBtnMobile);
        }
    } else {
        // Handle logout: restore buttons
        const desktopDisplay = document.getElementById('user-display-desktop');
        const mobileDisplay = document.getElementById('user-display-mobile');
        
        if (desktopDisplay) {
            const newBtn = document.createElement('button');
            newBtn.id = 'open-auth-btn';
            newBtn.className = 'nav-login-btn';
            newBtn.innerText = 'Login';
            desktopDisplay.parentNode.replaceChild(newBtn, desktopDisplay);
            // Re-attach listener
            newBtn.addEventListener('click', () => {
                document.getElementById('auth-modal').classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        if (mobileDisplay) {
            const newBtnMobile = document.createElement('button');
            newBtnMobile.id = 'open-auth-btn-mobile';
            newBtnMobile.className = 'nav-login-btn';
            newBtnMobile.style.marginTop = '20px';
            newBtnMobile.style.width = '100%';
            newBtnMobile.innerText = 'Login';
            mobileDisplay.parentNode.replaceChild(newBtnMobile, mobileDisplay);
            // Re-attach listener
            newBtnMobile.addEventListener('click', () => {
                document.getElementById('auth-modal').classList.add('active');
                document.getElementById('mobile-sidebar').classList.remove('active');
                document.body.style.overflow = 'hidden';
            });
        }
    }
}

function logoutUser() {
    currentUser = null;
    updateNavbarUser();
    alert('Você saiu da sua conta.');
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
    
    // Update checkout button state
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
    }
}

// --- Checkout Functionality ---
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout');

function openCheckout() {
    if (cart.length === 0) return;
    
    // Close cart sidebar first
    cartSidebar.classList.remove('active');
    
    // Reset to step 1
    nextStep(1);
    
    // Update summary items
    updateCheckoutSummary();
    
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateCheckoutSummary() {
    const summaryList = document.getElementById('checkout-summary-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');
    
    if (!summaryList) return;
    
    summaryList.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'summary-item';
        itemEl.innerHTML = `
            <div class="summary-item-left">
                <div class="summary-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="summary-item-details">
                    <p class="summary-item-name">${item.title}</p>
                    <div class="summary-quantity-wrapper">
                        <div class="summary-quantity-control">
                            <button onclick="changeQuantityCheckout(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantityCheckout(${index}, 1)">+</button>
                        </div>
                        <button class="btn-remove-summary" onclick="removeFromCartCheckout(${index})">Remover</button>
                    </div>
                </div>
            </div>
            <p class="summary-item-price">R$ ${itemTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        `;
        summaryList.appendChild(itemEl);
    });
    
    subtotalEl.innerText = `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    totalEl.innerText = `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // If cart becomes empty during checkout, close it
    if (cart.length === 0) {
        closeCheckoutAndReset();
    }
}

// Special handlers for checkout to keep UI in sync
function changeQuantityCheckout(index, delta) {
    changeQuantity(index, delta);
    updateCheckoutSummary();
}

function removeFromCartCheckout(index) {
    removeFromCart(index);
    updateCheckoutSummary();
}


function nextStep(stepNumber) {
    // Hide all panels
    document.querySelectorAll('.checkout-step-panel').forEach(panel => panel.classList.remove('active'));
    // Show target panel
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    
    // Update stepper
    document.querySelectorAll('.step').forEach((step, idx) => {
        const stepIdx = idx + 1;
        if (stepIdx < stepNumber) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepIdx === stepNumber) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

function prevStep(stepNumber) {
    nextStep(stepNumber);
}

// Payment method toggle
document.addEventListener('click', (e) => {
    const tab = e.target.closest('.payment-tab');
    if (tab) {
        const value = tab.querySelector('input').value;
        
        // Update active classes
        document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show relevant panel
        document.querySelectorAll('.payment-method-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(`payment-${value}`).classList.add('active');
    }
});

// Card Masking
const cardNumberInput = document.getElementById('card-number');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
        e.target.value = formatted;
    });
}

function copyPixCode() {
    const pixInput = document.getElementById('pix-code-input');
    const toast = document.getElementById('pix-toast');
    
    if (pixInput) {
        pixInput.select();
        document.execCommand('copy');
        
        if (toast) {
            toast.style.display = 'block';
            gsap.fromTo(toast, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 });
            setTimeout(() => {
                gsap.to(toast, { opacity: 0, x: 10, duration: 0.3, onComplete: () => toast.style.display = 'none' });
            }, 3000);
        }
    }
}

function copyBoletoCode() {
    const code = document.getElementById('boleto-digital-code').innerText;
    const toast = document.getElementById('boleto-toast');
    
    navigator.clipboard.writeText(code).then(() => {
        if (toast) {
            toast.style.display = 'block';
            gsap.fromTo(toast, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 });
            setTimeout(() => {
                gsap.to(toast, { opacity: 0, x: 10, duration: 0.3, onComplete: () => toast.style.display = 'none' });
            }, 3000);
        }
    });
}

function downloadBoletoPDF() {
    // Simulate PDF generation
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjcKOCAwIG9iagogIDw8IC9UeXBlIC9QYWdlcyAvS2lkcyBbIDEgMCBSIF0gL0NvdW50IDEgPj4KZW5kb2JqCjEgMCBvYmoKICA8PCAvVHlwZSAvUGFnZSAvUGFyZW50IDggMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUgODQyIF0gL1Jlc291cmNlcyA8PCAvRm9udCA8PCAvRjEgMiAwIFIgPj4gPj4gL0NvbnRlbnRzIDMgMCBSID4+CmVuZG9iagoyIDAgb2JqCiAgPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iagozIDAgb2JqCiAgPDwgL0xlbmd0aCA0NCA+PgogIHN0cmVhbQogIEJUIC9GMSA0OCBUZiAxMDAgNzAwIFREIChCTE9FVE8gQ0xBUidTKSBUaiBFVAogIGVuZHN0cmVhbQplbmRvYmoKNCAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgOCAwIFIgPj4KZW5kb2JqCnRyYWlsZXIKPDwgL1NpemUgNSAvUm9vdCA0IDAgUiA+Pgp%%RU9G';
    link.download = 'Boleto_CLARS_Pedido.pdf';
    link.click();
}

function openBoletoTab() {
    // Simulate opening in new tab
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<html><head><title>Boleto CLAR\'S</title><style>body{font-family:sans-serif;padding:50px;text-align:center;} .boleto{border:1px solid #000;padding:20px;display:inline-block;}</style></head><body><div class="boleto"><h1>CLAR\'S - BOLETO BANCARIO</h1><p>Valor: ' + document.getElementById('boleto-final-value').innerText + '</p><p>Vencimento: ' + document.getElementById('boleto-expiry-date').innerText + '</p></div><p>Simulação de boleto real.</p></body></html>');
}

function updateBoletoData() {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const buyerInput = document.querySelector('#delivery-form input[placeholder="Nome completo"]');
    const orderNum = 'CL' + Math.floor(100000 + Math.random() * 900000);
    
    const finalValue = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const buyerName = buyerInput && buyerInput.value ? buyerInput.value : 'Cliente CLAR’S';
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 3);
    const expiryStr = expiry.toLocaleDateString('pt-BR');

    // Update simulation view (Step 3)
    const simValue = document.getElementById('boleto-sim-value');
    const simBuyer = document.getElementById('boleto-sim-buyer');
    const simExpiry = document.getElementById('boleto-sim-expiry');
    
    if (simValue) simValue.innerText = finalValue;
    if (simBuyer) simBuyer.innerText = buyerName;
    if (simExpiry) simExpiry.innerText = expiryStr;
    
    // Set Order Ref for all
    const orderRefEls = document.querySelectorAll('#boleto-order-ref, #order-number');
    orderRefEls.forEach(el => el.innerText = '#' + orderNum);

    // Update success screen total too
    const successTotal = document.getElementById('success-final-total');
    if (successTotal) successTotal.innerText = finalValue;
}

function finishOrder() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (paymentMethod === 'boleto') {
        updateBoletoData();
        // Specific logic: the success screen might want to show the boleto card instead
        // But for now, we follow the user request to "abrir a tela de confirmação"
        // I will ensure the summary on confirmation is also updated.
    }
    
    // Generate order number if not already done by boleto
    if (paymentMethod !== 'boleto') {
        const orderNum = 'CL' + Math.floor(100000 + Math.random() * 900000);
        const orderNumberEls = document.querySelectorAll('#order-number');
        orderNumberEls.forEach(el => el.innerText = '#' + orderNum);
        
        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const successTotal = document.getElementById('success-final-total');
        if (successTotal) successTotal.innerText = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Populate success summary
    const successList = document.getElementById('success-items-list');
    if (successList) {
        successList.innerHTML = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            const miniItem = document.createElement('div');
            miniItem.className = 'success-mini-item';
            miniItem.innerHTML = `
                <span>${item.quantity}x ${item.title}</span>
                <span>R$ ${itemTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            `;
            successList.appendChild(miniItem);
        });
    }
    
    // Go to confirmation step
    nextStep(4);
    
    // Scroll to top of modal content
    const content = document.querySelector('.checkout-content');
    if (content) content.scrollTo({ top: 0, behavior: 'smooth' });
}


// --- Track Order Logic ---
const trackModal = document.getElementById('track-modal');
const trackOrderLink = document.getElementById('track-order-link');
const trackOrderLinkMobile = document.getElementById('track-order-link-mobile');
const closeTrackBtn = document.getElementById('close-track');
const btnTrackSubmit = document.getElementById('btn-track-submit');
const btnTrackOrderSuccess = document.querySelector('.btn-track-order');
const trackResults = document.getElementById('track-results');
const trackDetails = document.getElementById('track-details');
const trackLoading = document.querySelector('.track-loading');
const trackOrderInput = document.getElementById('track-order-number');

function openTrackModal(orderNum = '') {
    trackModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (orderNum) {
        trackOrderInput.value = orderNum;
        simulateTracking(orderNum);
    } else {
        trackOrderInput.value = '';
        trackDetails.style.display = 'none';
        trackLoading.style.display = 'none';
    }
}

function closeTrackModal() {
    trackModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function simulateTracking(orderNum) {
    trackDetails.style.display = 'none';
    trackLoading.style.display = 'block';
    
    // Simulate API delay
    setTimeout(() => {
        trackLoading.style.display = 'none';
        trackDetails.style.display = 'block';
        
        const resNum = document.getElementById('track-res-number');
        if (resNum) resNum.innerText = orderNum.startsWith('#') ? orderNum : '#' + orderNum;
        
        // Animate timeline
        gsap.from('.timeline-step', {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
    }, 1500);
}

if (trackOrderLink) trackOrderLink.addEventListener('click', () => openTrackModal());
if (trackOrderLinkMobile) trackOrderLinkMobile.addEventListener('click', () => {
    closeSidebar();
    openTrackModal();
});
if (closeTrackBtn) closeTrackBtn.addEventListener('click', closeTrackModal);
if (btnTrackSubmit) btnTrackSubmit.addEventListener('click', () => {
    const val = trackOrderInput.value.trim();
    if (val) simulateTracking(val);
});

// Link from Success Screen
if (btnTrackOrderSuccess) {
    btnTrackOrderSuccess.addEventListener('click', () => {
        const orderNum = document.getElementById('order-number').innerText;
        closeCheckoutAndReset();
        openTrackModal(orderNum);
    });
}

// --- Chatbot Logic ---
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const btnSendChat = document.getElementById('btn-send-chat');
const closeChatBtn = document.getElementById('close-chat');

function openChat() {
    chatWindow.classList.add('active');
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

function closeChat() {
    chatWindow.classList.remove('active');
}

function addMessage(text, sender = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = `
        <p>${text}</p>
        <span class="chat-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Animate new message
    gsap.from(msgDiv, { opacity: 0, y: 10, duration: 0.3 });
}

function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        let response = "Entendi perfeitamente. Um de nossos especialistas em joias irá analisar sua mensagem e retornaremos em breve para garantir que seu atendimento seja excepcional.";
        
        if (text.toLowerCase().includes('pedido')) {
            response = "Para verificar o status detalhado do seu pedido, você também pode usar a nossa ferramenta de rastreamento no menu principal. Mas não se preocupe, estou verificando as últimas atualizações para você!";
        } else if (text.toLowerCase().includes('atendente') || text.toLowerCase().includes('falar')) {
            response = "Com certeza. Estou conectando você agora mesmo com um de nossos consultores de luxo. Aguarde um breve momento.";
        }
        
        addMessage(response, 'bot');
    }, 1000);
}

function sendQuickMessage(text) {
    addMessage(text, 'user');
    setTimeout(() => {
        let response = "Ótima escolha. Vou processar essa informação agora mesmo.";
        if (text === 'Onde está meu pedido?') response = "Seu pedido está atualmente em fase de preparação cuidadosa em nosso ateliê. Você receberá um e-mail assim que ele for enviado!";
        addMessage(response, 'bot');
    }, 1000);
}

if (closeChatBtn) closeChatBtn.addEventListener('click', closeChat);
if (btnSendChat) btnSendChat.addEventListener('click', handleSendMessage);
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
}

function closeCheckoutAndReset() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Clear cart
    cart = [];
    updateCartUI();
    
    // Return to home
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delivery form handler
const deliveryForm = document.getElementById('delivery-form');
if (deliveryForm) {
    deliveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        nextStep(3);
    });
}

// Safe listeners for checkout
if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', () => {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

const checkoutBtnMain = document.querySelector('.btn-checkout');
if (checkoutBtnMain) checkoutBtnMain.addEventListener('click', openCheckout);

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

// --- Premium Contact Form Logic ---
const contactFormPremium = document.getElementById('contact-form-premium');
const contactFeedback = document.getElementById('contact-feedback-premium');
const btnContactSubmit = document.getElementById('btn-contact-submit');

if (contactFormPremium) {
    contactFormPremium.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic Validation
        const name = document.getElementById('contact-name-premium').value.trim();
        const email = document.getElementById('contact-email-premium').value.trim();
        const message = document.getElementById('contact-message-premium').value.trim();
        
        if (!name || !email || !message) {
            showContactFeedback("Por favor, preencha todos os campos obrigatórios.", "error");
            return;
        }
        
        if (!validateEmail(email)) {
            showContactFeedback("Por favor, insira um e-mail válido.", "error");
            return;
        }

        // Loading State
        const btnText = btnContactSubmit.querySelector('.btn-text');
        const btnLoader = btnContactSubmit.querySelector('.btn-loader');
        
        btnText.style.opacity = '0';
        btnLoader.style.display = 'block';
        btnContactSubmit.style.pointerEvents = 'none';

        // Simulate Email Sending
        setTimeout(() => {
            btnLoader.style.display = 'none';
            btnText.style.opacity = '1';
            btnContactSubmit.style.pointerEvents = 'auto';
            
            showContactFeedback("Mensagem enviada com sucesso! Nosso concierge entrará em contato em breve.", "success");
            contactFormPremium.reset();
        }, 2000);
    });
}

function showContactFeedback(msg, type) {
    contactFeedback.innerText = msg;
    contactFeedback.className = `contact-feedback-premium active ${type}`;
    
    setTimeout(() => {
        contactFeedback.classList.remove('active');
    }, 5000);
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// Scroll Reveals for Contact
gsap.from('.contact-header-premium > *', {
    scrollTrigger: {
        trigger: '.contact-premium-section',
        start: 'top 85%'
    },
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out'
});

gsap.from('.contact-form-container-premium', {
    scrollTrigger: {
        trigger: '.contact-premium-section',
        start: 'top 75%'
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power4.out'
});
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
// --- Search Functionality ---
function initSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchWrapper = document.getElementById('search-wrapper');
    const navSearchInput = document.getElementById('nav-search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');

    if (!searchBtn || !searchWrapper) return;

    // Toggle search expand
    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!searchWrapper.classList.contains('active')) {
            searchWrapper.classList.add('active');
            navSearchInput.focus();
        } else {
            // If already open and has value, maybe search? 
            // But requirement says automatic, so just closing or keeping open.
            // Let's toggle for better UX.
            if (!navSearchInput.value) {
                searchWrapper.classList.remove('active');
            }
        }
    });

    // Prevent closing when clicking inside search
    searchWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchWrapper.classList.remove('active');
            navSearchInput.blur();
        }
    });

    // Close on click outside
    document.addEventListener('click', () => {
        searchWrapper.classList.remove('active');
    });

    // Real-time filtering logic
    const handleSearch = (query) => {
        const lowerQuery = query.toLowerCase().trim();
        
        // If query is present, we filter products
        const filtered = products.filter(p => 
            p.title.toLowerCase().includes(lowerQuery) || 
            p.category.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );

        // Update grid with animation
        gsap.to(productsGrid, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            onComplete: () => {
                renderProducts(filtered);
                gsap.to(productsGrid, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });

                // Scroll to products if not in view and searching
                if (query.length > 1) {
                    const productsSection = document.getElementById('products');
                    const rect = productsSection.getBoundingClientRect();
                    if (rect.top > window.innerHeight || rect.bottom < 0) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    };

    // Nav input listener
    navSearchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // Mobile input listener
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });
    }
}

initGlobalReveals();
initAboutAnimations();

