// Price comparison service for Jumia and Marketsquare
const PLATFORMS = {
    JUMIA: 'Jumia',
    MARKETSQUARE: 'Marketsquare'
};

// Products available on both platforms
const AVAILABLE_PRODUCTS = [
    'Hypo', 'Bonnet', 'Flower Vase', 'Collage', 'Mosaic', 'Batik',
    'Hair Ruffles', 'Apron', 'Drawstring Bag', 'Key Chains', 'Caps',
    'Liquid Soap', 'Waist Bead', 'Beaded Necklace', 'Table Cloth',
    'Bracelet', 'Chicken Floss', 'Cake Parfait', 'Meat Floss',
    'Corn Dog', 'Chapman', 'Coconut Candy'
];

// Convert price string to number
const priceToNumber = (priceStr) => {
    return parseInt(priceStr.replace('₦', '').replace(',', ''));
};

// Format number to price string
const formatPrice = (number) => {
    return `₦${number.toLocaleString()}`;
};

// Generate a random price variation within 20% of base price
const generatePriceVariation = (basePrice) => {
    const variation = (Math.random() - 0.5) * 0.4; // -20% to +20%
    const price = basePrice * (1 + variation);
    return Math.round(price / 100) * 100; // Round to nearest hundred
};

// Mock delay to simulate API calls
const mockDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get price for a specific platform
const getPlatformPrice = (product, platform) => {
    if (!AVAILABLE_PRODUCTS.includes(product.name)) {
        if (platform === PLATFORMS.MARKETSQUARE) {
            return { status: 'error', message: 'Unable to fetch price currently' };
        }
        return { status: 'not_found', message: 'Price not found' };
    }

    const basePrice = priceToNumber(product.price);
    return {
        status: 'found',
        price: formatPrice(generatePriceVariation(basePrice))
    };
};

// Mock API call to get price comparisons
export const getPriceComparisons = async (product) => {
    // Simulate API delay between 1-2 seconds
    await mockDelay(Math.random() * 1000 + 1000);
    
    return Object.values(PLATFORMS).map(platform => ({
        platform,
        ...getPlatformPrice(product, platform)
    }));
};

// Search products by name
export const searchProducts = (query) => {
    if (!query) return [];
    
    const searchTerm = query.toLowerCase();
    return Object.values(products).flat().filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
}; 