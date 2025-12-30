// Product Database
const products = [
    {
        id: 1,
        name: "DentalLux Pro",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
        badge: "Best Seller",
        category: "Professional Series",
        description: "Professional sonic technology with 5 cleaning modes",
        rating: "4.9 (2,341)"
    },
    {
        id: 2,
        name: "DentalLux Essential",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
        badge: "Popular",
        category: "Essential Series",
        description: "Perfect balance of quality and value",
        rating: "4.8 (1,823)"
    },
    {
        id: 3,
        name: "DentalLux Kids",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
        badge: "For Kids",
        category: "Kids Series",
        description: "Gentle cleaning for young smiles",
        rating: "4.9 (987)"
    },
    {
        id: 4,
        name: "DentalLux Ultra",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
        badge: "Premium",
        category: "Ultra Series",
        description: "Ultimate cleaning with AI-powered tracking",
        rating: "5.0 (654)"
    },
    {
        id: 5,
        name: "DentalLux Travel",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
        badge: "Compact",
        category: "Travel Series",
        description: "Portable power for on-the-go care",
        rating: "4.7 (542)"
    },
    {
        id: 6,
        name: "DentalLux Sensitive",
        price: 109.99,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
        badge: "Gentle",
        category: "Sensitive Series",
        description: "Extra soft for sensitive teeth and gums",
        rating: "4.8 (1,234)"
    }
];


// Load products on page
function loadProducts() {
    const productHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="stars">★★★★★</span>
                    <span>${product.rating}</span>
                </div>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');

    const homeProducts = document.getElementById('home-products');
    const allProducts = document.getElementById('all-products');
    
    if (homeProducts) homeProducts.innerHTML = productHTML;
    if (allProducts) allProducts.innerHTML = productHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadProducts);
