// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Prevent background scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when a link is clicked (mobile UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Coming Soon Modal functionality
const comingSoonModal = document.getElementById('comingSoonModal');
const accountBtn = document.getElementById('accountBtn');
const closeComingSoonModal = comingSoonModal.querySelector('.close-modal');

function openComingSoonModal() {
    comingSoonModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeComingSoonModalHandler() {
    comingSoonModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for Coming Soon Modal
accountBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openComingSoonModal();
});

closeComingSoonModal.addEventListener('click', closeComingSoonModalHandler);

comingSoonModal.addEventListener('click', (e) => {
    if (e.target === comingSoonModal) {
        closeComingSoonModalHandler();
    }
});

// Live Search Functionality
const searchInput = document.getElementById('searchInput');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        const productGrid = document.getElementById('productGrid');
        const allProducts = Object.values(products).flat();
        
        const filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        
        productGrid.innerHTML = '';
        filteredProducts.forEach(product => {
            productGrid.innerHTML += createProductCard(product);
        });

        // Add click event listeners to the newly created product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productData = JSON.parse(card.dataset.product);
                openModal(productData);
            });
        });

        // If there's exactly one result, scroll to it
        if (filteredProducts.length === 1) {
            const foundCard = document.querySelector('.product-card');
            if (foundCard) {
                foundCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Highlight the product temporarily
                foundCard.style.transition = 'all 0.3s ease';
                foundCard.style.boxShadow = '0 0 20px rgba(20, 148, 234, 0.5)';
                setTimeout(() => {
                    foundCard.style.boxShadow = '';
                }, 2000);
            }
        }
    }, 300);
});

// Product Data
console.log('Initializing products object...');
const products = {
    art: [
        { 
            name: 'Pencil Work', 
            price: '₦1,000', 
            image: 'assets/Art/Pencil work 1000.jpg', 
            description: 'A meticulously crafted pencil artwork created by our talented student artists. Each piece demonstrates exceptional attention to detail, shading techniques, and artistic expression. Perfect for home or office decoration.'
        },
        { 
            name: 'Flower Vase', 
            price: '₦1,000', 
            image: 'assets/Art/Flower vase 1000.jpg', 
            description: 'A beautifully handcrafted flower vase designed and created by our creative arts students. Made with careful attention to form and aesthetics, this vase combines functionality with artistic beauty. Ideal for fresh or artificial flower arrangements.'
        },
        { 
            name: 'Collage', 
            price: '₦5,000', 
            image: 'assets/Art/Collage 5000.jpg', 
            description: 'An innovative collage artwork that showcases our students\' creativity in combining different materials and textures. Each piece tells a unique story through carefully selected and arranged elements, making it a conversation starter in any room.'
        },
        { 
            name: 'Mosaic', 
            price: '₦10,000', 
            image: 'assets/Art/Mosaic 10000.jpg', 
            description: 'A stunning mosaic piece created by our dedicated art students, featuring intricate patterns and vibrant colors. Each tile is carefully placed to create a harmonious design that demonstrates patience, precision, and artistic vision.'
        },
        { 
            name: 'Batik', 
            price: '₦15,000', 
            image: 'assets/Art/Batik 15000.jpg', 
            description: 'A unique batik fabric artwork showcasing traditional dyeing techniques mastered by our students. Each piece features original patterns and color combinations, making it a perfect blend of traditional craft and contemporary design.'
        },
        { 
            name: 'Framed Islamic Calligraphy', 
            price: '₦20,000', 
            image: 'assets/Art/Framed islamic Calligraphy 20000.jpg', 
            description: 'Elegant Islamic calligraphy expertly crafted by our student artists. Each piece combines religious significance with artistic beauty, featuring carefully written Arabic script in traditional calligraphic styles. Beautifully framed and ready to enhance any space.'
        },
        { 
            name: 'Islamic Calligraphy on Canvas', 
            price: '₦15,000', 
            image: 'assets/Art/Painting on canvass(islamic calligraphy) 15000.jpg', 
            description: 'A masterful blend of Islamic calligraphy and canvas artistry created by our talented students. Each canvas features carefully composed Arabic script, painted with precision and artistic flair. Perfect for adding spiritual and artistic elegance to any room.'
        }
    ],
    diy: [
        { 
            name: 'Hair Ruffles', 
            price: '₦500', 
            image: 'assets/DIY/Hair ruffles 500.jpg', 
            description: 'Stylish and comfortable hair accessories handcrafted by our creative DIY students. Made with quality materials and attention to detail, these ruffles add a perfect finishing touch to any hairstyle. Available in various colors and patterns.'
        },
        { 
            name: 'Apron', 
            price: '₦5,000', 
            image: 'assets/DIY/Apron 5000.jpg', 
            description: 'A durable and fashionable apron designed and sewn by our DIY students. Features convenient pockets and adjustable straps for comfort. Made with high-quality, washable fabric perfect for cooking, crafting, or gardening activities.'
        },
        { 
            name: 'Drawstring Bag', 
            price: '₦4,000', 
            image: 'assets/DIY/drawstring bag 4000.jpg', 
            description: 'A versatile drawstring bag handcrafted by our students. Made with sturdy materials and reinforced stitching, these bags are perfect for gym, travel, or everyday use. Features a unique design that combines style with practicality.'
        },
        { 
            name: 'Key Chains', 
            price: '₦1,000', 
            image: 'assets/DIY/key chains 1000.jpg', 
            description: 'Charming handmade key chains created by our creative students. Each piece is uniquely designed and crafted with attention to detail. Made with durable materials to ensure long-lasting use while adding a personal touch to your keys.'
        },
        { 
            name: 'Caps', 
            price: '₦1,000', 
            image: 'assets/DIY/caps 1000.jpg', 
            description: 'Customized caps designed and decorated by our DIY students. Each cap features unique embellishments and creative designs. Perfect for sun protection while making a fashion statement. Made with quality materials for comfort and durability.'
        },
        { 
            name: 'Bonnet', 
            price: '₦2,000', 
            image: 'assets/DIY/bonnet 2000.jpg', 
            description: 'Comfortable and stylish bonnets handcrafted by our students. Made with soft, hair-friendly materials to protect your hair while you sleep. Features secure elastic for a comfortable fit and comes in various attractive designs.'
        },
        { 
            name: 'Oven Mitten', 
            price: '₦2,000', 
            image: 'assets/DIY/Oven mitten 2000.jpg', 
            description: 'Heat-resistant oven mittens handmade by our DIY students. Features multiple layers of insulation for maximum protection while handling hot items. Includes a convenient hanging loop and is made with washable, durable materials.'
        },
        { 
            name: 'Throw Pillows', 
            price: '₦5,000', 
            image: 'assets/DIY/throw pillows 5000.webp', 
            description: 'Decorative throw pillows designed and crafted by our creative students. Each pillow features unique patterns and color combinations. Made with soft, comfortable materials and sturdy stitching for long-lasting use. Perfect for adding style to any room.'
        },
        { 
            name: 'Soft Toys', 
            price: '₦10,000', 
            image: 'assets/DIY/soft toys 10000.jpg', 
            description: 'Adorable soft toys lovingly handcrafted by our students. Each toy is made with child-safe materials and secure stitching. Features unique designs and characters that make perfect gifts for children or collectibles for toy enthusiasts.'
        },
        { 
            name: 'Tote Bag', 
            price: '₦5,000', 
            image: 'assets/DIY/Tote bag 5000.jpg', 
            description: 'Sturdy and stylish tote bags handmade by our DIY students. Features reinforced handles and stitching for durability. Made with eco-friendly materials and includes inner pockets for organization. Perfect for shopping, school, or everyday use.'
        }
    ],
    entrepreneurship: [
        { 
            name: 'Liquid Soap', 
            price: '₦1,000', 
            image: 'assets/Entrepreneurship/Liquid soap, 1000.jpg', 
            description: 'High-quality liquid soap produced by our entrepreneurship students. Made with gentle, effective cleaning agents and pleasant fragrances. Perfect for household use. Each bottle is carefully formulated to ensure proper cleaning while being gentle on hands.'
        },
        { 
            name: 'Waist Bead', 
            price: '₦2,000', 
            image: 'assets/Entrepreneurship/Waist bead 2000.jpg', 
            description: 'Beautiful waist beads handcrafted by our creative entrepreneurs. Each piece features carefully selected beads and secure clasps. Available in various colors and styles, these traditional accessories celebrate beauty and culture.'
        },
        { 
            name: 'Beaded Necklace', 
            price: '₦2,000', 
            image: 'assets/Entrepreneurship/Beeded necklace 2000.jpg', 
            description: 'Elegant beaded necklaces designed and created by our student entrepreneurs. Each piece showcases unique patterns and color combinations. Made with quality beads and strong threading for durability. Perfect for any occasion.'
        },
        { 
            name: 'Table Cloth', 
            price: '₦2,000', 
            image: 'assets/Entrepreneurship/Table cloth 2000.jpg', 
            description: 'Beautiful table cloths crafted by our entrepreneurial students. Made with quality fabric and finished with neat edges. Features attractive patterns and designs that enhance any dining setting. Easy to clean and maintain.'
        },
        { 
            name: 'Bracelet', 
            price: '₦1,000', 
            image: 'assets/Entrepreneurship/Bracelet 1000.jpg', 
            description: 'Stylish bracelets handcrafted by our young entrepreneurs. Each piece features unique designs and secure clasps. Made with quality materials for everyday wear. Available in various styles to suit different preferences.'
        },
        { 
            name: 'Hypo', 
            price: '₦1,000', 
            image: 'assets/Entrepreneurship/Hypo 1000.jpg', 
            description: 'Effective cleaning solution produced by our entrepreneurship students. Carefully formulated for maximum cleaning and disinfecting power. Safe for household use and comes with usage instructions. Perfect for maintaining a hygienic environment.'
        },
        { 
            name: 'Slippers with Accessories', 
            price: '₦3,000', 
            image: 'assets/Entrepreneurship/Slippers with accessories, 3000.jpg', 
            description: 'Uniquely decorated slippers created by our creative entrepreneurs. Each pair features handpicked accessories and embellishments. Comfortable design with secure attachment of decorations. Perfect for adding style to casual footwear.'
        }
    ],
    'home-makers': [
        { 
            name: 'SFC Chicken', 
            price: '₦2,000', 
            image: 'assets/Home makers/SFC Chicken 2000.jpg', 
            description: 'Delicious Student Fried Chicken prepared by our culinary students. Made with a special blend of seasonings and spices. Crispy on the outside, juicy on the inside. Prepared following strict hygiene standards.'
        },
        { 
            name: 'Chicken Floss', 
            price: '₦2,000', 
            image: 'assets/Home makers/Chicken floss 2000.jpg', 
            description: 'Savory chicken floss made by our home-making students. Prepared using quality chicken and special seasonings. Perfect as a topping or snack. Stored in airtight containers for freshness.'
        },
        { 
            name: 'Cake Parfait', 
            price: '₦2,000', 
            image: 'assets/Home makers/Cake parfait 2000.jpg', 
            description: 'Delightful cake parfait created by our student bakers. Layers of fresh cake, cream, and toppings. Made with quality ingredients and artistic presentation. Perfect for dessert or special occasions.'
        },
        { 
            name: 'Meat Floss', 
            price: '₦2,000', 
            image: 'assets/Home makers/Meat floss 2000.jpg', 
            description: 'Flavorful meat floss prepared by our culinary students. Made with quality meat and carefully seasoned. Perfect for sandwiches, toppings, or as a snack. Packaged for optimal freshness.'
        },
        { 
            name: 'Corn Dog', 
            price: '₦1,500', 
            image: 'assets/Home makers/Corn dog 1500.jpg', 
            description: 'Classic corn dogs made fresh by our home-making students. Features quality sausages coated in perfectly seasoned batter. Crispy outside with a soft, fluffy coating. Served with condiments of your choice.'
        },
        { 
            name: 'Chapman', 
            price: '₦1,000', 
            image: 'assets/Home makers/Chapman 1000.jpg', 
            description: 'Refreshing Chapman drink prepared by our student mixologists. A perfect blend of fruits and beverages. Made with fresh ingredients and proper proportions. Served chilled for maximum refreshment.'
        },
        { 
            name: 'Coconut Candy', 
            price: '₦1,000', 
            image: 'assets/Home makers/Coconut candy 1000.jpg', 
            description: 'Sweet coconut candy crafted by our confectionery students. Made with fresh coconut and quality ingredients. Perfect balance of sweetness and coconut flavor. Individually wrapped for freshness.'
        },
        { 
            name: 'Beef Jerky', 
            price: '₦2,000', 
            image: 'assets/Home makers/Beef jerky 2000.jpg', 
            description: 'Tasty beef jerky prepared by our culinary students. Made with quality beef and special marinade. Perfectly dried and seasoned for maximum flavor. Packed in resealable bags for convenience.'
        },
        { 
            name: 'Milky Popcorn', 
            price: '₦1,000', 
            image: 'assets/Home makers/Milky popcorn 1000.jpg', 
            description: 'Delicious milky popcorn made by our student snack makers. Perfect blend of sweet and creamy flavors. Made with quality corn and milk coating. Packed fresh for optimal taste and crunch.'
        },
        { 
            name: 'Glazed Doughnut Box', 
            price: '₦3,000', 
            image: 'assets/Home makers/Glazed goughnut box of 4, 3000.jpg', 
            description: 'Box of 4 freshly made glazed doughnuts by our student bakers. Light and fluffy texture with perfect sweetness. Made with quality ingredients and traditional recipes. Carefully packed to maintain freshness.'
        },
        { 
            name: 'Glazed Puff Box', 
            price: '₦2,000', 
            image: 'assets/Home makers/Glazed puff box of 6, 2000.jpg', 
            description: 'Box of 6 delicious glazed puffs created by our pastry students. Light, flaky pastry with sweet glaze coating. Made fresh with quality ingredients. Perfect for sharing or special treats.'
        },
        { 
            name: 'Dried Tea', 
            price: '₦1,000', 
            image: 'assets/Home makers/Dried tea 1000.jpg', 
            description: 'Special blend of dried tea prepared by our home-making students. Made with carefully selected herbs and tea leaves. Perfect for hot or cold brewing. Packed in sealed bags to preserve freshness and aroma.'
        }
    ],
    'young-farmers': [
        { 
            name: 'Broilers', 
            price: '₦12,000', 
            image: 'assets/Young farmers/Broilers 12000.jpg', 
            description: 'Healthy broiler chickens raised by our young farming students. Fed with quality feed and raised in clean conditions. Regular veterinary care ensures healthy growth. Perfect for family consumption or special occasions.'
        },
        { 
            name: 'Cat Fish (per kg)', 
            price: '₦4,000', 
            image: 'assets/Young farmers/Cat Fish 4000kg.jpg', 
            description: 'Fresh catfish raised by our aquaculture students. Grown in well-maintained ponds with quality feed. Regular water quality monitoring ensures healthy fish. Sold by weight and guaranteed fresh.'
        }
    ]
};
console.log('Products object initialized with categories:', Object.keys(products));

// Shopping Cart State
let cart = [];

// Modal Elements
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modalProductImage');
const modalImageContainer = document.querySelector('.modal-image');
const modalName = document.getElementById('modalProductName');
const modalPrice = document.getElementById('modalProductPrice');
const modalProductDescription = document.getElementById('modalProductDescription');
const modalQuantity = document.getElementById('modalProductQuantity');
const addToCartModal = document.querySelector('.add-to-cart-modal');
const zoomInBtn = document.querySelector('.zoom-in');
const zoomOutBtn = document.querySelector('.zoom-out');

// Cart Elements
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCart = document.querySelector('.close-cart');
const cartIcon = document.querySelector('.fa-shopping-cart');

// Zoom and Pan Variables
let isZoomed = false;
let isDragging = false;
let startX;
let startY;
let translateX = 0;
let translateY = 0;
let scale = 1;

// Product Modal Functions
function openModal(product) {
    modalImage.src = product.image;
    modalName.textContent = product.name;
    modalPrice.textContent = product.price;
    modalProductDescription.textContent = product.description;
    modalQuantity.value = 1;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset zoom and pan when opening modal
    resetZoomAndPan();
}

function closeModalHandler() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    resetZoomAndPan();
}

// Zoom and Pan Functions
function resetZoomAndPan() {
    isZoomed = false;
    isDragging = false;
    scale = 1;
    translateX = 0;
    translateY = 0;
    modalImageContainer.classList.remove('zoomed');
    updateImageTransform();
}

function updateImageTransform() {
    modalImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
}

function handleZoomIn() {
    if (scale < 3) {
        scale += 0.5;
        isZoomed = scale > 1;
        modalImageContainer.classList.toggle('zoomed', isZoomed);
        updateImageTransform();
    }
}

function handleZoomOut() {
    if (scale > 1) {
        scale -= 0.5;
        isZoomed = scale > 1;
        modalImageContainer.classList.toggle('zoomed', isZoomed);
        updateImageTransform();
    }
    if (scale === 1) {
        resetZoomAndPan();
    }
}

function handleDragStart(e) {
    if (!isZoomed) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    modalImage.style.cursor = 'grabbing';
}

function handleDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.clientX - startX;
    const y = e.clientY - startY;
    
    // Calculate bounds
    const maxX = modalImage.width * (scale - 1) / 2;
    const maxY = modalImage.height * (scale - 1) / 2;
    
    // Constrain movement
    translateX = Math.min(Math.max(x, -maxX), maxX);
    translateY = Math.min(Math.max(y, -maxY), maxY);
    
    updateImageTransform();
}

function handleDragEnd() {
    isDragging = false;
    modalImage.style.cursor = 'move';
}

// Event Listeners for Zoom and Pan
zoomInBtn.addEventListener('click', handleZoomIn);
zoomOutBtn.addEventListener('click', handleZoomOut);

modalImageContainer.addEventListener('mousedown', handleDragStart);
modalImageContainer.addEventListener('mousemove', handleDragMove);
modalImageContainer.addEventListener('mouseup', handleDragEnd);
modalImageContainer.addEventListener('mouseleave', handleDragEnd);

// Cart Functions
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace('₦', '').replace(',', '')) * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">&times;</button>
            </div>
        `;
    });

    cartTotal.textContent = `₦${total.toLocaleString()}`;
}

function openCart() {
    cartSidebar.classList.add('active');
}

function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity
        });
    }
    
    updateCart();
    
    // Show the cart confirmation
    showCartConfirmation(product);
}

function showCartConfirmation(product) {
    // Update the confirmation modal with product details
    document.getElementById('addedProductImage').src = product.image;
    document.getElementById('addedProductName').textContent = product.name;
    document.getElementById('addedProductPrice').textContent = product.price;
    
    // Show the confirmation modal
    cartConfirmationModal.classList.add('active');
    
    // Hide the product modal if it's open
    modal.classList.remove('active');
}

function hideCartConfirmation() {
    cartConfirmationModal.classList.remove('active');
}

// Event Listeners
closeModal.addEventListener('click', closeModalHandler);
closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));
cartIcon.addEventListener('click', () => cartSidebar.classList.add('active'));

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

// Quantity buttons in modal
document.querySelector('.quantity-btn.minus').addEventListener('click', () => {
    if (modalQuantity.value > 1) {
        modalQuantity.value = parseInt(modalQuantity.value) - 1;
    }
});

document.querySelector('.quantity-btn.plus').addEventListener('click', () => {
    modalQuantity.value = parseInt(modalQuantity.value) + 1;
});

// Add to cart from modal
addToCartModal.addEventListener('click', () => {
    const product = {
        name: modalName.textContent,
        price: modalPrice.textContent,
        image: modalImage.src
    };
    addToCart(product, parseInt(modalQuantity.value));
    closeModalHandler();
});

// Cart item quantity and remove handlers
cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-btn')) {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('plus')) {
            cart[index].quantity++;
        } else if (e.target.classList.contains('minus')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
        }
        updateCart();
    } else if (e.target.classList.contains('remove-item')) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
    }
});

// Add after the product card creation function
function createProductCard(product) {
    console.log('Creating card for:', product.name);
    // Ensure all product data is properly escaped for HTML attributes
    const productData = {
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description || `${product.name} - A quality product from GHAMart.`
    };
    
    const card = `
        <div class="product-card" data-product='${JSON.stringify(productData)}'>
            <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ddd%22/></svg>'">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
        </div>
    `;
    console.log('Created card:', card);
    return card;
}

// Price Comparison Functions
function getPriceComparisons(product) {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            // Generate dummy comparison data
            const comparisons = [
                {
                    platform: 'Jumia',
                    status: 'found',
                    price: `₦${(parseFloat(product.price.replace('₦', '').replace(',', '')) * 1.2).toLocaleString()}`
                },
                {
                    platform: 'MarketSquare',
                    status: 'found',
                    price: `₦${(parseFloat(product.price.replace('₦', '').replace(',', '')) * 1.1).toLocaleString()}`
                }
            ];
            resolve(comparisons);
        }, 1500); // 1.5 second delay to simulate API call
    });
}

// Update Price Comparison Modal functionality
const priceComparisonModal = document.getElementById('priceComparisonModal');
const comparisonSearch = document.getElementById('comparisonSearch');
const compareSearchBtn = document.getElementById('compareSearchBtn');
const searchResults = document.getElementById('searchResults');
const comparisonProductImage = document.getElementById('comparisonProductImage');
const comparisonProductName = document.getElementById('comparisonProductName');
const comparisonProductPrice = document.getElementById('comparisonProductPrice');
const comparisonGrid = document.getElementById('comparisonGrid');

function showPriceComparison(product) {
    // Update product info
    comparisonProductImage.src = product.image;
    comparisonProductName.textContent = product.name;
    comparisonProductPrice.textContent = product.price;

    // Show loading state
    priceComparisonModal.className = 'modal price-comparison-modal active loading';

    // Fetch price comparisons
    getPriceComparisons(product)
        .then(comparisons => {
            comparisonGrid.innerHTML = comparisons.map(platform => `
                <div class="platform-card ${platform.status === 'found' ? 'found' : 'not-found'}">
                    <h4>${platform.platform}</h4>
                    ${platform.status === 'found' 
                        ? `<div class="price">${platform.price}</div>
                           <div class="savings">You save: ${calculateSavings(product.price, platform.price)}</div>`
                        : `<div class="message">${platform.message}</div>`
                    }
                </div>
            `).join('');

            priceComparisonModal.className = 'modal price-comparison-modal active has-results';
        })
        .catch(error => {
            console.error('Price comparison error:', error);
            priceComparisonModal.className = 'modal price-comparison-modal active error';
        });
}

function calculateSavings(ourPrice, theirPrice) {
    const our = parseFloat(ourPrice.replace('₦', '').replace(',', ''));
    const their = parseFloat(theirPrice.replace('₦', '').replace(',', ''));
    const savings = their - our;
    return savings > 0 ? `₦${savings.toLocaleString()}` : 'Best Price!';
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return Object.values(products).flat().filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
}

function showSearchResults(results) {
    searchResults.innerHTML = results.map(product => `
        <div class="search-result-item" data-product='${JSON.stringify(product)}'>
            <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ddd%22/></svg>'">
            <div class="details">
                <h4>${product.name}</h4>
                <p class="price">${product.price}</p>
            </div>
        </div>
    `).join('');

    priceComparisonModal.className = 'modal price-comparison-modal active searching';
}

// Event Listeners for Price Comparison
compareSearchBtn.addEventListener('click', () => {
    const query = comparisonSearch.value.trim();
    if (query) {
        const results = searchProducts(query);
        showSearchResults(results);
    }
});

comparisonSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        compareSearchBtn.click();
    }
});

searchResults.addEventListener('click', (e) => {
    const resultItem = e.target.closest('.search-result-item');
    if (resultItem) {
        const product = JSON.parse(resultItem.dataset.product);
        showPriceComparison(product);
    }
});

// Close modal handler
priceComparisonModal.querySelector('.close-modal').addEventListener('click', () => {
    priceComparisonModal.className = 'modal price-comparison-modal';
    comparisonSearch.value = '';
    document.body.style.overflow = '';
});

// Close modal when clicking outside
priceComparisonModal.addEventListener('click', (e) => {
    if (e.target === priceComparisonModal) {
        priceComparisonModal.className = 'modal price-comparison-modal';
        comparisonSearch.value = '';
        document.body.style.overflow = '';
    }
});

// Update AI Features price comparison button
document.getElementById('priceCompareBtn').addEventListener('click', (e) => {
    e.preventDefault();
    priceComparisonModal.className = 'modal price-comparison-modal active';
    document.body.style.overflow = 'hidden';
    comparisonSearch.focus();
});

// Function to load products by category
function loadProducts(category) {
    console.log('Loading products for category:', category);
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) {
        console.error('Product grid element not found!');
        return;
    }
    productGrid.innerHTML = '';
    
    if (category === 'all') {
        // Show all products from all categories
        const allProducts = Object.values(products).flat();
        console.log('Total products to display:', allProducts.length);
        allProducts.forEach(product => {
            productGrid.innerHTML += createProductCard(product);
        });
    } else if (products[category]) {
        // Show products from specific category
        console.log('Products in category:', products[category].length);
        products[category].forEach(product => {
            productGrid.innerHTML += createProductCard(product);
        });
    }
    console.log('Finished loading products');

    // Add click event listeners to all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productData = JSON.parse(card.dataset.product);
            openModal(productData);
        });
    });
}

// Category click handlers
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        // Remove active class from all category cards
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        // Add active class to clicked category card
        card.classList.add('active');
        loadProducts(category);
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Skip if href is just "#"
        
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
            behavior: 'smooth'
        });
        }
    });
});

// Voice Search Functionality
const voiceSearchBtn = document.getElementById('voiceSearchBtn');
let recognition = null;
let isListening = false;

// Initialize speech recognition
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isListening = true;
            voiceSearchBtn.classList.add('listening');
            showVoiceFeedback('Listening...');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            performSearch(transcript);
            speakResults(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            showVoiceFeedback('Error: ' + event.error);
        };

        recognition.onend = () => {
            isListening = false;
            voiceSearchBtn.classList.remove('listening');
        };
    } else {
        console.error('Speech recognition not supported');
        voiceSearchBtn.style.display = 'none';
    }
}

// Initialize speech synthesis
const synth = window.speechSynthesis;

// Initialize speech synthesis voices
let synthVoices = [];

function initVoices() {
    // Get the voices and store them
    synthVoices = speechSynthesis.getVoices();
    
    // If no voices are available yet, wait for them to be loaded
    if (synthVoices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
            synthVoices = speechSynthesis.getVoices();
        });
    }
}

// Initialize voices when the page loads
window.addEventListener('load', initVoices);

function speakResults(searchTerm) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `Searching for ${searchTerm}`;
    
    // Use the stored voices
    const femaleVoice = synthVoices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('victoria')
    ) || synthVoices.find(voice => 
        voice.lang.startsWith('en') && voice.name.toLowerCase().includes('google')
    );

    // Set the voice if found, otherwise use default
    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }

    // Adjust pitch and rate for a more natural female voice
    utterance.pitch = 1.2;
    utterance.rate = 1.0;

    utterance.onend = () => {
        // Set flag to indicate this is a voice search
        window.isVoiceSearch = true;
        performSearch(searchTerm);
    };
    speechSynthesis.speak(utterance);
}

// Show voice feedback
function showVoiceFeedback(message) {
    let feedback = document.querySelector('.voice-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'voice-feedback';
        document.body.appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.classList.add('active');

    setTimeout(() => {
        feedback.classList.remove('active');
    }, 3000);
}

// Add these utility functions before the performSearch function
function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j - 1] + 1, // substitution
                    dp[i - 1][j] + 1,     // deletion
                    dp[i][j - 1] + 1      // insertion
                );
            }
        }
    }
    return dp[m][n];
}

function getWordVariations(word) {
    const variations = new Set([word]);
    
    // Common plural/singular variations
    if (word.endsWith('s')) {
        variations.add(word.slice(0, -1)); // Remove 's'
    } else {
        variations.add(word + 's'); // Add 's'
    }
    
    // Common pronunciation variations
    const commonVariations = {
        'cap': ['caps', 'cap'],
        'caps': ['cap', 'caps'],
        'fish': ['fishes', 'fish'],
        'fishes': ['fish', 'fishes'],
        'chicken': ['chickens', 'chicken'],
        'chickens': ['chicken', 'chickens'],
        'soap': ['soaps', 'soap'],
        'soaps': ['soap', 'soaps'],
        'bag': ['bags', 'bag'],
        'bags': ['bag', 'bags'],
        'toy': ['toys', 'toy'],
        'toys': ['toy', 'toys'],
        'pillow': ['pillows', 'pillow'],
        'pillows': ['pillow', 'pillows'],
        'doughnut': ['doughnuts', 'doughnut'],
        'doughnuts': ['doughnut', 'doughnuts'],
        'parfait': ['parfaits', 'parfait'],
        'parfaits': ['parfait', 'parfaits']
    };

    if (commonVariations[word]) {
        commonVariations[word].forEach(variation => variations.add(variation));
    }

    return Array.from(variations);
}

function findBestMatch(searchTerm, productNames) {
    const searchTermLower = searchTerm.toLowerCase();
    let bestMatch = null;
    let bestScore = Infinity;
    const threshold = 3; // Maximum allowed distance for a match

    productNames.forEach(productName => {
        const productNameLower = productName.toLowerCase();
        
        // Get variations of both search term and product name
        const searchVariations = getWordVariations(searchTermLower);
        const productVariations = getWordVariations(productNameLower);

        // Check each variation combination
        for (const searchVar of searchVariations) {
            for (const productVar of productVariations) {
                const distance = levenshteinDistance(searchVar, productVar);
                if (distance < bestScore && distance <= threshold) {
                    bestScore = distance;
                    bestMatch = productName;
                }
            }
        }
    });

    return bestMatch;
}

// Update the performSearch function
function performSearch(searchTerm) {
    const productGrid = document.getElementById('productGrid');
    const products = Array.from(productGrid.getElementsByClassName('product-card'));
    let found = false;

    // Get all product names
    const productNames = products.map(product => 
        product.querySelector('h3').textContent
    );

    // Find the best matching product
    const bestMatch = findBestMatch(searchTerm, productNames);

    products.forEach(product => {
        const title = product.querySelector('h3').textContent;
        const isMatch = title === bestMatch;
        product.style.display = isMatch ? 'flex' : 'none';
        
        if (isMatch) {
            found = true;
            // If this is from voice search, scroll to the product and read description
            if (window.isVoiceSearch) {
                product.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Highlight the product temporarily
                product.style.transition = 'all 0.3s ease';
                product.style.boxShadow = '0 0 20px rgba(20, 148, 234, 0.5)';
                setTimeout(() => {
                    product.style.boxShadow = '';
                }, 2000);

                // Get product data and read description
                const productData = JSON.parse(product.dataset.product);
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = `Found ${productData.name}. ${productData.description}`;
                
                // Use the stored voices
                const femaleVoice = synthVoices.find(voice => 
                    voice.name.toLowerCase().includes('female') || 
                    voice.name.toLowerCase().includes('zira') ||
                    voice.name.toLowerCase().includes('samantha') ||
                    voice.name.toLowerCase().includes('victoria')
                ) || synthVoices.find(voice => 
                    voice.lang.startsWith('en') && voice.name.toLowerCase().includes('google')
                );

                // Set the voice if found, otherwise use default
                if (femaleVoice) {
                    utterance.voice = femaleVoice;
                }

                // Adjust pitch and rate for a more natural female voice
                utterance.pitch = 1.2;
                utterance.rate = 1.0;

                speechSynthesis.speak(utterance);
            }
        }
    });

    // Reset voice search flag
    window.isVoiceSearch = false;

    if (!found) {
        showVoiceFeedback('No products found matching your search.');
    }
}

// Voice search button click handler
voiceSearchBtn.addEventListener('click', () => {
    if (!recognition) {
        initSpeechRecognition();
    }

    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

// Cart Confirmation Modal functionality
const cartConfirmationModal = document.querySelector('.cart-confirmation-modal');
const continueShoppingBtn = document.querySelector('.continue-shopping-btn');
const viewCartBtn = document.querySelector('.view-cart-btn');

// Event listeners for the confirmation modal buttons
continueShoppingBtn.addEventListener('click', () => {
    hideCartConfirmation();
});

viewCartBtn.addEventListener('click', () => {
    hideCartConfirmation();
    openCart();
});

// Close cart confirmation modal when clicking outside
cartConfirmationModal.addEventListener('click', (e) => {
    if (e.target === cartConfirmationModal) {
        hideCartConfirmation();
    }
});

// Scroll to Top Button functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Show button when user scrolls down 300px
window.addEventListener('scroll', () => {
    const categoriesSection = document.getElementById('categories');
    const categoryPosition = categoriesSection.getBoundingClientRect().top;
    
    if (window.scrollY > 300 && categoryPosition < 0) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to categories section when button is clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// WhatsApp Checkout Function
function formatWhatsAppMessage(cart, total) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    let message = `*New Order from GHAMart*\n`;
    message += `Date: ${date}\n`;
    message += `Time: ${time}\n\n`;
    message += `*Order Details:*\n`;
    
    cart.forEach((item, index) => {
        message += `\n${index + 1}. ${item.name}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: ${item.price} each\n`;
        message += `   Subtotal: ₦${(parseFloat(item.price.replace('₦', '').replace(',', '')) * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n*Total Amount: ₦${total.toLocaleString()}*\n\n`;
    message += `Please confirm my order. Thank you!`;
    
    return encodeURIComponent(message);
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    const total = cart.reduce((sum, item) => {
        return sum + (parseFloat(item.price.replace('₦', '').replace(',', '')) * item.quantity);
    }, 0);

    const message = formatWhatsAppMessage(cart, total);
    const phoneNumber = '2348112598270'; // Replace with your actual WhatsApp business number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
}

// Event Listeners
document.querySelector('.checkout-btn').addEventListener('click', handleCheckout);

// === LOGIN MODAL LOGIC FOR AI FEATURES ===
(function() {
    const exploreAIBtn = document.getElementById('exploreAIBtn');
    const aiFeatures = document.getElementById('aiFeatures');
    const aiLoginModal = document.getElementById('aiLoginModal');
    const closeAiLoginModal = document.getElementById('closeAiLoginModal');
    const aiLoginForm = document.getElementById('aiLoginForm');
    const aiLoginError = document.getElementById('aiLoginError');
    let aiLoginPassed = false;

    // Show login modal when AI Features button is clicked
    exploreAIBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (aiLoginPassed) {
        aiFeatures.style.display = 'block';
        aiFeatures.classList.add('active');
        aiFeatures.scrollIntoView({ behavior: 'smooth' });
        } else {
            aiLoginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Reset form and error
            aiLoginForm.reset();
            aiLoginError.style.display = 'none';
            setTimeout(() => {
                document.getElementById('aiUsername').focus();
            }, 200);
        }
    });

    // Close modal logic
    closeAiLoginModal.addEventListener('click', function() {
        aiLoginModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aiLoginModal.classList.contains('active')) {
            aiLoginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    aiLoginModal.addEventListener('click', function(e) {
        if (e.target === aiLoginModal) {
            aiLoginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle login form submit
    aiLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = aiLoginForm.aiUsername.value.trim();
        const password = aiLoginForm.aiPassword.value;
        if (username === 'ghamart' && password === 'admin') {
            aiLoginPassed = true;
            aiLoginModal.classList.remove('active');
            document.body.style.overflow = '';
            aiFeatures.style.display = 'block';
            aiFeatures.classList.add('active');
            aiFeatures.scrollIntoView({ behavior: 'smooth' });
        } else {
            aiLoginError.textContent = 'Invalid username or password.';
            aiLoginError.style.display = 'block';
        }
    });
})();

// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            dots[index].classList.remove('active');
        });
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
});

// Load all products when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('all');
});

// AI Features Card functionality
(() => {
    const aiFeatureCards = document.querySelectorAll('.ai-feature-card');
    
    aiFeatureCards.forEach(card => {
        // Make the entire card clickable
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            // Get the link inside the card
            const link = card.querySelector('.feature-link');
            
            // If clicking on the link itself, let it handle its own click
            if (e.target.closest('.feature-link')) {
                return;
            }
            
            // Get the feature name
            const featureName = card.querySelector('h3').textContent;
            
            // Handle different features
            if (featureName === 'Poultry Health Assistant') {
                window.location.href = 'poultry-health.html';
                return;
            }
            
            if (featureName === 'Fish Health Monitor') {
                window.location.href = 'fish-health.html';
                return;
            }
            
            // If it's the price comparison card, trigger the price comparison modal
            if (card.querySelector('#priceCompareBtn')) {
                priceComparisonModal.className = 'modal price-comparison-modal active';
                document.body.style.overflow = 'hidden';
                return;
            }
            
            // For other cards, show the coming soon modal
            showFeatureComingSoon(featureName);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.querySelector('.feature-icon').style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    function showFeatureComingSoon(featureName) {
        const modal = document.getElementById('comingSoonModal');
        const modalBody = modal.querySelector('.coming-soon-body');
        
        // Update modal content
        modalBody.innerHTML = `
            <i class="fas fa-tools"></i>
            <h2>Coming Soon!</h2>
            <p>We're working hard to bring you the ${featureName} feature. Stay tuned for updates!</p>
            <div class="feature-preview">
                <p>This AI-powered solution will revolutionize how you manage and monitor your agricultural business.</p>
                <p>Expected features:</p>
                <ul>
                    <li>Real-time monitoring and analysis</li>
                    <li>Predictive insights and recommendations</li>
                    <li>Mobile app integration</li>
                    <li>Detailed reporting and analytics</li>
                </ul>
            </div>
        `;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
})();

// Hide cart sidebar on page load
window.addEventListener('DOMContentLoaded', function() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar.classList.contains('active')) {
        cartSidebar.classList.remove('active');
    }
});

// Fullscreen product image modal logic
const imageFullscreenModal = document.getElementById('imageFullscreenModal');
const fullscreenProductImage = document.getElementById('fullscreenProductImage');
const closeFullscreenImage = document.getElementById('closeFullscreenImage');

modalImage.addEventListener('click', () => {
    fullscreenProductImage.src = modalImage.src;
    imageFullscreenModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

fullscreenProductImage.addEventListener('click', () => {
    imageFullscreenModal.classList.remove('active');
    document.body.style.overflow = '';
});

closeFullscreenImage.addEventListener('click', () => {
    imageFullscreenModal.classList.remove('active');
    document.body.style.overflow = '';
});

imageFullscreenModal.addEventListener('click', (e) => {
    if (e.target === imageFullscreenModal) {
        imageFullscreenModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});