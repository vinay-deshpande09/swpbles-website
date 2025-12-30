// ═══════════════════════════════════════════════════════════
//  SHOPPING CART FUNCTIONS
// ═══════════════════════════════════════════════════════════

let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    
    // Animate cart badge
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.classList.add('bump');
        setTimeout(() => cartBadge.classList.remove('bump'), 300);
    }
    
    // Show toast notification
    showToast(`✓ ${product.name} added to cart!`);
    
    // Open cart sidebar after short delay
    setTimeout(() => {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.add('open');
        }
    }, 300);
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) cartCount.textContent = totalItems;
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${subtotal.toFixed(2)}`;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add products to get started!</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span style="margin: 0 10px; font-weight: 600;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
    }

    updateCheckoutSummary();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
    }
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTax = document.getElementById('checkout-tax');
    const checkoutTotal = document.getElementById('checkout-total');

    if (!checkoutItems) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    checkoutTax.textContent = `$${tax.toFixed(2)}`;
    checkoutTotal.textContent = `$${total.toFixed(2)}`;

    checkoutItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-info">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div style="font-weight: 600; font-size: 15px;">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

// Toast notification function
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="margin-right: 8px;">✓</span>${message}`;
    document.body.appendChild(toast);
    
    console.log('Toast created:', message); // Debug log
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
