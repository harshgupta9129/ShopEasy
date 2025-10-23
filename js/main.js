// Main JavaScript File for E-commerce Website

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let currentPage = 1;
const productsPerPage = 9;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    loadProducts();
    updateCartCount();
    setupEventListeners();
    initializeAnimations();
    
    // Check if we're on products page and initialize filters
    if (window.location.pathname.includes('products.html')) {
        initializeProductFilters();
    }
    
    // Check if we're on product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        initializeProductDetail();
    }
    
    // Check if we're on cart page
    if (window.location.pathname.includes('cart.html')) {
        initializeCartPage();
    }
    
    // Check if we're on checkout page
    if (window.location.pathname.includes('checkout.html')) {
        initializeCheckoutPage();
    }
}

// Load Products Data
async function loadProducts() {
    try {
        // In a real application, this would be an API call
        // For demo purposes, we're using mock data
        products = await fetchMockProducts();
        
        // Render featured products on homepage
        if (document.getElementById('featured-products')) {
            renderFeaturedProducts();
        }
        
        // Render all products on products page
        if (document.getElementById('products-container')) {
            renderProducts();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showToast('Error loading products. Please try again.', 'error');
    }
}

// Mock Products Data
async function fetchMockProducts() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
        {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            price: 79.99,
            originalPrice: 99.99,
            category: "electronics",
            image: "images/products/headphones.jpg",
            rating: 4.5,
            reviews: 128,
            description: "High-quality wireless headphones with noise cancellation.",
            features: ["Noise Cancellation", "30hr Battery", "Fast Charging"],
            inStock: true,
            badge: "Sale"
        },
        {
            id: 2,
            name: "Classic Cotton T-Shirt",
            price: 24.99,
            originalPrice: 29.99,
            category: "fashion",
            image: "images/products/tshirt.jpg",
            rating: 4.2,
            reviews: 89,
            description: "Comfortable cotton t-shirt available in multiple colors.",
            features: ["100% Cotton", "Machine Wash", "Multiple Colors"],
            inStock: true,
            badge: "Popular"
        },
        {
            id: 3,
            name: "Smartphone Pro Max",
            price: 999.99,
            originalPrice: 1199.99,
            category: "electronics",
            image: "images/products/smartphone.jpg",
            rating: 4.8,
            reviews: 256,
            description: "Latest smartphone with advanced camera and performance.",
            features: ["5G Ready", "Triple Camera", "128GB Storage"],
            inStock: true,
            badge: "New"
        },
        {
            id: 4,
            name: "Stainless Steel Water Bottle",
            price: 29.99,
            originalPrice: 39.99,
            category: "home",
            image: "images/products/water-bottle.jpg",
            rating: 4.6,
            reviews: 167,
            description: "Keep your drinks hot or cold for hours with this insulated bottle.",
            features: ["24hr Insulation", "BPA Free", "Leak Proof"],
            inStock: true,
            badge: "Eco"
        },
        {
            id: 5,
            name: "Organic Face Cream",
            price: 34.99,
            originalPrice: 44.99,
            category: "beauty",
            image: "images/products/face-cream.jpg",
            rating: 4.3,
            reviews: 93,
            description: "Natural and organic face cream for daily skincare routine.",
            features: ["Organic", "Cruelty Free", "For All Skin Types"],
            inStock: true,
            badge: "Natural"
        },
        {
            id: 6,
            name: "Wireless Gaming Mouse",
            price: 59.99,
            originalPrice: 79.99,
            category: "electronics",
            image: "images/products/gaming-mouse.jpg",
            rating: 4.7,
            reviews: 201,
            description: "Precision wireless gaming mouse with RGB lighting.",
            features: ["RGB Lighting", "Programmable Buttons", "Long Battery"],
            inStock: true,
            badge: "Gaming"
        },
        {
            id: 7,
            name: "Yoga Mat Premium",
            price: 45.99,
            originalPrice: 59.99,
            category: "beauty",
            image: "images/products/yoga-mat.jpg",
            rating: 4.4,
            reviews: 112,
            description: "Non-slip yoga mat for comfortable exercise sessions.",
            features: ["Non-slip", "Eco-friendly", "Extra Thick"],
            inStock: true,
            badge: "Wellness"
        },
        {
            id: 8,
            name: "Ceramic Coffee Mug Set",
            price: 32.99,
            originalPrice: 39.99,
            category: "home",
            image: "images/products/coffee-mug.jpg",
            rating: 4.5,
            reviews: 78,
            description: "Set of 4 beautiful ceramic coffee mugs for your kitchen.",
            features: ["Set of 4", "Dishwasher Safe", "Modern Design"],
            inStock: true,
            badge: "Kitchen"
        },
        {
            id: 9,
            name: "Running Shoes",
            price: 89.99,
            originalPrice: 119.99,
            category: "fashion",
            image: "images/products/running-shoes.jpg",
            rating: 4.6,
            reviews: 145,
            description: "Lightweight running shoes with superior cushioning.",
            features: ["Lightweight", "Breathable", "Shock Absorbing"],
            inStock: true,
            badge: "Sport"
        }
    ];
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Back to top button
    window.addEventListener('scroll', handleScroll);
    
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }
}

// Initialize Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.category-card, .product-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Render Featured Products
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = products.slice(0, 6); // Show first 6 products as featured
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to add-to-cart buttons
    container.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.closest('.product-card').dataset.id);
            addToCart(productId);
        });
    });
}

// Render Products with Pagination
function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    const filteredProducts = filterProducts();
    const paginatedProducts = paginateProducts(filteredProducts);
    
    container.innerHTML = paginatedProducts.map(product => createProductCard(product)).join('');
    
    // Update pagination controls
    updatePagination(filteredProducts.length);
    
    // Add event listeners to add-to-cart buttons
    container.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.closest('.product-card').dataset.id);
            addToCart(productId);
        });
    });
}

// Create Product Card HTML
function createProductCard(product) {
    const discount = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
        <div class="product-card stagger-item" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-actions">
                    <button class="action-btn wishlist-btn" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn quick-view-btn" title="Quick View">
                        <i class="far fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart btn btn-primary">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Generate Star Rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Cart Functions
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    
    // Show success message
    showToast(`${product.name} added to cart!`, 'success');
    
    // Add animation effect
    animateAddToCart(productId);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
    }
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            if (window.location.pathname.includes('cart.html')) {
                renderCartItems();
            }
        }
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Add animation when count changes
        if (totalItems > 0) {
            cartCount.classList.add('bump');
            setTimeout(() => cartCount.classList.remove('bump'), 300);
        }
    }
}

// Animation for Add to Cart
function animateAddToCart(productId) {
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!productCard) return;
    
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon) return;
    
    const productRect = productCard.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    const animation = document.createElement('div');
    animation.className = 'add-to-cart-animation';
    animation.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    animation.style.cssText = `
        position: fixed;
        left: ${productRect.left + productRect.width / 2}px;
        top: ${productRect.top + productRect.height / 2}px;
        font-size: 20px;
        color: var(--primary-color);
        pointer-events: none;
        z-index: 10000;
    `;
    
    document.body.appendChild(animation);
    
    // Calculate animation path
    const deltaX = cartRect.left - productRect.left;
    const deltaY = cartRect.top - productRect.top;
    
    animation.style.setProperty('--tx', `${deltaX}px`);
    animation.style.setProperty('--ty', `${deltaY}px`);
    
    setTimeout(() => {
        document.body.removeChild(animation);
    }, 1000);
}

// Toast Notification
function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}"></i>
        </div>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Scroll Handling
function handleScroll() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Search Handling
function handleSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    }
}

// Newsletter Subscription
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Simulate API call
        setTimeout(() => {
            showToast('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        }, 1000);
    } else {
        showToast('Please enter a valid email address.', 'error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export functions for use in other files
window.ecommerce = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    showToast
};