/**
 * PREMIUM ONLINE BOOK STORE - CORE SCRIPT
 * Version: 1.0.0
 * Architecture: Vanilla JS Module Pattern
 */

// ==========================================
// 1. DATA SOURCE (MOCK DATABASE)
// ==========================================
const PRODUCTS_DB = {
    "fiction": [
        { id: "f1", name: "The Midnight Library", author: "Matt Haig", price: 24.99, description: "Between life and death there is a library, and within that library, the shelves go on forever.", category: "Fiction" },
        { id: "f2", name: "The Alchemist", author: "Paulo Coelho", price: 18.50, description: "A fable about following your dream.", category: "Fiction" },
        { id: "f3", name: "Beloved", author: "Toni Morrison", price: 21.00, description: "Staring unflinchingly into the abyss of slavery, this spellbinding novel transforms history into a story as powerful as Exodus.", category: "Fiction" },
        { id: "f4", name: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 15.99, description: "A story of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan.", category: "Fiction" },
        { id: "f5", name: "To Kill a Mockingbird", author: "Harper Lee", price: 19.99, description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.", category: "Fiction" }
    ],
    "non-fiction": [
        { id: "nf1", name: "Sapiens", author: "Yuval Noah Harari", price: 29.99, description: "A Brief History of Humankind.", category: "Non-Fiction" },
        { id: "nf2", name: "Educated", author: "Tara Westover", price: 22.50, description: "A Memoir about growing up in a survivalist family in Idaho.", category: "Non-Fiction" },
        { id: "nf3", name: "Becoming", author: "Michelle Obama", price: 25.00, description: "A memoir by the former First Lady of the United States.", category: "Non-Fiction" },
        { id: "nf4", name: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 19.95, description: "The major New York Times bestseller that changes the way we think.", category: "Non-Fiction" },
        { id: "nf5", name: "Atomic Habits", author: "James Clear", price: 21.99, description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.", category: "Non-Fiction" }
    ],
    "sci-fi": [
        { id: "sf1", name: "Dune", author: "Frank Herbert", price: 27.99, description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides.", category: "Sci-Fi" },
        { id: "sf2", name: "Project Hail Mary", author: "Andy Weir", price: 26.00, description: "A lone astronaut must save the earth from disaster.", category: "Sci-Fi" },
        { id: "sf3", name: "Neuromancer", author: "William Gibson", price: 18.99, description: "The sky above the port was the color of television, tuned to a dead channel.", category: "Sci-Fi" },
        { id: "sf4", name: "Foundation", author: "Isaac Asimov", price: 20.50, description: "The story of our future begins with the history of Foundation.", category: "Sci-Fi" },
        { id: "sf5", name: "Ender's Game", author: "Orson Scott Card", price: 16.99, description: "The war with the Buggers has been raging for a hundred years.", category: "Sci-Fi" }
    ],
    "biography": [
        { id: "b1", name: "Steve Jobs", author: "Walter Isaacson", price: 30.00, description: "The exclusive biography of Steve Jobs.", category: "Biography" },
        { id: "b2", name: "The Diary of a Young Girl", author: "Anne Frank", price: 15.00, description: "Discovered in the attic in which she spent the last years of her life.", category: "Biography" },
        { id: "b3", name: "Long Walk to Freedom", author: "Nelson Mandela", price: 24.50, description: "The autobiography of global human rights icon Nelson Mandela.", category: "Biography" },
        { id: "b4", name: "Einstein", author: "Walter Isaacson", price: 28.00, description: "His Life and Universe.", category: "Biography" },
        { id: "b5", name: "Born a Crime", author: "Trevor Noah", price: 18.99, description: "Stories from a South African Childhood.", category: "Biography" }
    ],
    "self-help": [
        { id: "sh1", name: "The Power of Now", author: "Eckhart Tolle", price: 19.99, description: "A Guide to Spiritual Enlightenment.", category: "Self-Help" },
        { id: "sh2", name: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 17.50, description: "What the Rich Teach Their Kids About Money.", category: "Self-Help" },
        { id: "sh3", name: "The Four Agreements", author: "Don Miguel Ruiz", price: 14.99, description: "A Practical Guide to Personal Freedom.", category: "Self-Help" },
        { id: "sh4", name: "How to Win Friends", author: "Dale Carnegie", price: 16.00, description: "The only book you need to lead you to success.", category: "Self-Help" },
        { id: "sh5", name: "Deep Work", author: "Cal Newport", price: 22.00, description: "Rules for Focused Success in a Distracted World.", category: "Self-Help" }
    ],
    "kids": [
        { id: "k1", name: "Harry Potter", author: "J.K. Rowling", price: 29.99, description: "The Philosopher's Stone.", category: "Kids" },
        { id: "k2", name: "The Hobbit", author: "J.R.R. Tolkien", price: 25.00, description: "In a hole in the ground there lived a hobbit.", category: "Kids" },
        { id: "k3", name: "Charlotte's Web", author: "E.B. White", price: 12.99, description: "Some Pig. Humble. Radiant.", category: "Kids" },
        { id: "k4", name: "The Giving Tree", author: "Shel Silverstein", price: 18.50, description: "Once there was a tree... and she loved a little boy.", category: "Kids" },
        { id: "k5", name: "Matilda", author: "Roald Dahl", price: 14.99, description: "The story of an extraordinary little girl with ordinary parents.", category: "Kids" }
    ]
};

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
const AppState = {
    cart: JSON.parse(localStorage.getItem('bookStore_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('bookStore_wishlist')) || [],

    save: function() {
        localStorage.setItem('bookStore_cart', JSON.stringify(this.cart));
        localStorage.setItem('bookStore_wishlist', JSON.stringify(this.wishlist));
        updateCounters();
    },

    addToCart: function(product) {
        const existing = this.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.save();
        showNotification(`${product.name} added to cart!`);
    },

    removeFromCart: function(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.save();
        // If on cart page, re-render
        if (window.location.pathname.includes('cart.html')) renderCartPage();
    },
    
    addToWishlist: function(product) {
        if (!this.wishlist.find(item => item.id === product.id)) {
            this.wishlist.push(product);
            this.save();
            showNotification(`${product.name} added to wishlist!`);
            // If on wishlist page, re-render
            if (window.location.pathname.includes('wishlist.html')) renderWishlistPage();
        } else {
            showNotification(`${product.name} is already in wishlist.`);
        }
    },

    removeFromWishlist: function(id) {
        this.wishlist = this.wishlist.filter(item => item.id !== id);
        this.save();
         if (window.location.pathname.includes('wishlist.html')) renderWishlistPage();
    }
};

// Helper: Get Image URL
const getImageUrl = (id) => `https://loremflickr.com/600/900/book,cover?lock=${id}`;

// ==========================================
// 3. UI INJECTION & UTILS
// ==========================================
function getPathPrefix() {
    // Check if we are in the root or a subfolder
    const path = window.location.pathname;
    // Simple check: if ends with / or index.html, we are root. Else if we are in pages/, we are 1 level deep.
    // NOTE: This logic might need adjustment based on actual local server path.
    // For now, assuming pages/*.html structure means we need ../ for root assets
    return path.includes('/pages/') ? '../' : './';
}

function injectNavbar() {
    const prefix = getPathPrefix();
    const navbarHTML = `
        <div class="container">
            <a href="${prefix}index.html" class="brand-logo">Lumina<span style="color:#fff">Books</span>.</a>
            <div class="nav-links">
                <a href="${prefix}index.html" class="nav-item">Home</a>
                <a href="#categories" class="nav-item">Categories</a> <!-- Smooth scroll or link to index -->
                <a href="${prefix}pages/wishlist.html" class="nav-item">Wishlist</a>
            </div>
            <div class="nav-icons">
                <a href="${prefix}pages/wishlist.html" class="icon-btn">
                    ♥ <span id="wishlist-count" class="badge">0</span>
                </a>
                <a href="${prefix}pages/cart.html" class="icon-btn">
                    🛒 <span id="cart-count" class="badge">0</span>
                </a>
                <a href="${prefix}pages/signin.html" class="glass-button secondary" style="padding: 8px 16px; font-size: 0.8rem;">Sign In</a>
            </div>
        </div>
    `;
    const navElement = document.createElement('nav');
    navElement.className = 'navbar glass-panel';
    document.body.prepend(navElement);
    navElement.innerHTML = navbarHTML;
    
    updateCounters();
}

function injectFooter() {
    const prefix = getPathPrefix();
    const footerHTML = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>LuminaBooks</h4>
                    <p style="color: var(--text-muted);">Curating the finest literature for the discerning reader.</p>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="${prefix}index.html">Home</a></li>
                        <li><a href="${prefix}pages/cart.html">My Cart</a></li>
                        <li><a href="${prefix}pages/wishlist.html">Wishlist</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="#">Shipping</a></li>
                        <li><a href="#">Returns</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Newsletter</h4>
                   <div style="display: flex; gap: 0.5rem;">
                        <input type="email" placeholder="Email" style="padding: 8px; border-radius: 4px; border:none; width: 100%;">
                        <button class="glass-button" style="padding: 8px 12px;">→</button>
                   </div>
                </div>
            </div>
            <div class="copyright">
                © 2025 LuminaBooks. All rights reserved.
            </div>
        </div>
    `;
    const footerElement = document.createElement('footer');
    footerElement.className = 'footer';
    footerElement.innerHTML = footerHTML;
    document.body.appendChild(footerElement);
}

function updateCounters() {
    const cartCount = document.getElementById('cart-count');
    const wishlistCount = document.getElementById('wishlist-count');
    if (cartCount) cartCount.innerText = AppState.cart.reduce((acc, item) => acc + item.quantity, 0);
    if (wishlistCount) wishlistCount.innerText = AppState.wishlist.length;
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.background = 'var(--primary)';
    notif.style.color = 'var(--background)';
    notif.style.padding = '1rem 2rem';
    notif.style.borderRadius = '8px';
    notif.style.fontWeight = 'bold';
    notif.style.zIndex = '9999';
    notif.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    notif.innerText = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// ==========================================
// 4. INIT & DISPATCHER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (path.endsWith('index.html') || path === '/') {
        renderLandingPage();
    } else if (path.includes('category.html')) {
        const catKey = params.get('c');
        if (catKey) renderCategoryPage(catKey);
    } else if (path.includes('product.html')) {
        const prodId = params.get('id');
        if (prodId) renderProductPage(prodId);
    } else if (path.includes('cart.html')) {
        renderCartPage();
    } else if (path.includes('wishlist.html')) {
        renderWishlistPage();
    } else if (path.includes('checkout.html')) {
        // Checkout logic
    }
    
    injectFooter();
});

// ==========================================
// 5. PAGE RENDERERS
// ==========================================

function renderLandingPage() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;

    const categories = Object.keys(PRODUCTS_DB);
    // category images map (static for design)
    const catImages = {
        'fiction': 'https://loremflickr.com/400/300/fantasy,book',
        'non-fiction': 'https://loremflickr.com/400/300/library',
        'sci-fi': 'https://loremflickr.com/400/300/space,technology',
        'biography': 'https://loremflickr.com/400/300/portrait,historic',
        'self-help': 'https://loremflickr.com/400/300/meditation,sunrise',
        'kids': 'https://loremflickr.com/400/300/cartoon,toys'
    };

    grid.innerHTML = categories.map(cat => `
        <div class="category-card glass-panel" onclick="window.location.href='./pages/category.html?c=${cat}'">
            <style>.category-card:nth-child(${categories.indexOf(cat) + 1})::before { background-image: url('${catImages[cat]}'); }</style>
            <h3 class="category-title">${cat.toUpperCase()}</h3>
        </div>
    `).join('');
}

function renderCategoryPage(catKey) {
    const container = document.getElementById('category-products');
    const title = document.getElementById('category-title');
    
    if (!container || !PRODUCTS_DB[catKey]) {
        if(container) container.innerHTML = '<p>Category not found.</p>';
        return;
    }

    if (title) title.innerText = catKey.toUpperCase();

    const products = PRODUCTS_DB[catKey];
    container.innerHTML = products.map(prod => `
        <div class="glass-panel" style="padding: 1rem; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <img src="${getImageUrl(prod.id)}" alt="${prod.name}" style="width: 150px; height: 220px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            <h4 style="margin: 0.5rem 0; font-size: 1.1rem;">${prod.name}</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">${prod.author}</p>
            <p style="color: var(--primary); font-weight: bold; margin-bottom: 1rem;">$${prod.price.toFixed(2)}</p>
            <div style="margin-top: auto; display: flex; gap: 0.5rem;">
                <button onclick="window.location.href='product.html?id=${prod.id}'" class="glass-button secondary" style="padding: 8px 12px; font-size: 0.8rem;">View</button>
                <button onclick="AppState.addToCart(PRODUCTS_DB['${catKey}'].find(p => p.id === '${prod.id}'))" class="glass-button" style="padding: 8px 12px; font-size: 0.8rem;">Add</button>
            </div>
        </div>
    `).join('');
}

function renderProductPage(prodId) {
    // Find product
    let product = null; 
    let category = null;
    for (const [cat, items] of Object.entries(PRODUCTS_DB)) {
        const found = items.find(p => p.id === prodId);
        if (found) { product = found; category = cat; break; }
    }

    if (!product) return;

    // Set content
    document.getElementById('product-img').src = getImageUrl(prodId);
    document.getElementById('product-title').innerText = product.name;
    document.getElementById('product-author').innerText = `By ${product.author}`;
    document.getElementById('product-price').innerText = `$${product.price.toFixed(2)}`;
    document.getElementById('product-desc').innerText = product.description;
    
    // Bind buttons - finding the exact object again to pass to methods to ensure no reference issues
    const getProductRef = () => PRODUCTS_DB[category].find(p => p.id === prodId);
    
    document.getElementById('btn-add-cart').onclick = () => AppState.addToCart(getProductRef());
    document.getElementById('btn-wishlist').onclick = () => AppState.addToWishlist(getProductRef());
}

function renderCartPage() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;

    if (AppState.cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        totalEl.innerText = '$0.00';
        return;
    }

    let total = 0;
    container.innerHTML = AppState.cart.map(item => {
        total += item.price * item.quantity;
        return `
        <div class="glass-panel" style="padding: 1rem; display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="${getImageUrl(item.id)}" style="width: 50px; height: 75px; object-fit: cover; border-radius: 4px;">
                <div>
                    <h4>${item.name}</h4>
                    <p style="color: var(--text-muted);">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
            <button onclick="AppState.removeFromCart('${item.id}')" class="glass-button secondary" style="color: #ff4444; border-color: #ff4444;">Remove</button>
        </div>
    `;
    }).join('');
    
    totalEl.innerText = `$${total.toFixed(2)}`;
}

function renderWishlistPage() {
    const container = document.getElementById('wishlist-items');
    if (!container) return;

    if (AppState.wishlist.length === 0) {
        container.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    container.innerHTML = AppState.wishlist.map(item => `
        <div class="glass-panel" style="padding: 1rem; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <img src="${getImageUrl(item.id)}" style="width: 100px; height: 150px; object-fit: cover; border-radius: 4px; margin-bottom: 1rem;">
            <h4>${item.name}</h4>
            <p style="color: var(--primary);">$${item.price.toFixed(2)}</p>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button onclick="AppState.addToCart({id: '${item.id}', name: '${item.name}', price: ${item.price}})" class="glass-button">Move to Cart</button>
                <button onclick="AppState.removeFromWishlist('${item.id}')" class="glass-button secondary">Remove</button>
            </div>
        </div>
    `).join('');
}
