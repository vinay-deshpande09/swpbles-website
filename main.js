// Main JavaScript Functions

// Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (menu) menu.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
}

// Search Modal
function openSearch() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    if (modal) modal.classList.add('active');
    if (input) input.focus();
}

function closeSearch() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    
    if (modal) modal.classList.remove('active');
    if (input) input.value = '';
    if (results) results.innerHTML = '<div class="no-results">Start typing to search products...</div>';
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    
    if (!resultsContainer) return;
    
    if (searchTerm.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Start typing to search products...</div>';
        return;
    }
    
    const results = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No products found.</div>';
        return;
    }
    
    resultsContainer.innerHTML = results.map(product => `
        <div class="search-result-item" onclick="addToCart(${product.id}); closeSearch();">
            <img src="${product.image}" 
                 alt="${product.name}" 
                 class="search-result-image"
                 onerror="this.src='${product.fallback}'">
            <div class="search-result-info">
                <h4>${product.name}</h4>
                <div class="search-result-price">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `).join('');
}

// Account Modal
function openAccount() {
    const modal = document.getElementById('account-modal');
    if (modal) modal.classList.add('active');
}

function closeAccount() {
    const modal = document.getElementById('account-modal');
    if (modal) modal.classList.remove('active');
}

function switchAccountTab(tab) {
    document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.account-form').forEach(f => f.classList.remove('active'));
    
    event.target.classList.add('active');
    const form = document.getElementById(tab + '-form');
    if (form) form.classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    alert('Welcome back! Logged in successfully.');
    closeAccount();
    return false;
}

function handleRegister(event) {
    event.preventDefault();
    alert('Account created successfully! Welcome to DentalLux.');
    closeAccount();
    return false;
}

// Checkout
function selectPaymentMethod(element) {
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });
    element.classList.add('selected');
}

function handleCheckoutSubmit(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return false;
    }
    
    const orderNumber = 'DL-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const orderDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 9.99 + (subtotal * 0.08);
    
    // Store order details in sessionStorage
    sessionStorage.setItem('orderNumber', orderNumber);
    sessionStorage.setItem('orderDate', orderDate);
    sessionStorage.setItem('orderTotal', total.toFixed(2));
    sessionStorage.setItem('deliveryDate', deliveryDate);
    
    // Redirect to success page
    window.location.href = 'pages/success.html';
    return false;
}

// Contact Form
function handleContactSubmit(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We\'ll respond within 24 hours.');
    event.target.reset();
    return false;
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const searchModal = document.getElementById('search-modal');
    const accountModal = document.getElementById('account-modal');
    const cartSidebar = document.getElementById('cart-sidebar');
    
    if (searchModal && event.target === searchModal) {
        closeSearch();
    }
    
    if (accountModal && event.target === accountModal) {
        closeAccount();
    }
    
    if (cartSidebar && !cartSidebar.contains(event.target) && 
        !event.target.closest('.nav-icon-btn') && 
        cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
    }
});

// Initialize checkout summary on checkout page
if (window.location.pathname.includes('checkout.html')) {
    document.addEventListener('DOMContentLoaded', updateCheckoutSummary);
}
