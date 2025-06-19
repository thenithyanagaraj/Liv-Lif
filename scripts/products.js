// Liv-Lif Menu Data
const livlifMenu = {
    soups: [
        {
            id: 'moringa-soup',
            name: 'Moringa Soup',
            category: 'Cup of Nourishment',
            price: 180,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Nutrient-rich moringa leaves in a warming, healing broth',
            rating: 4.8,
            reviews: 47,
            tags: ['organic', 'vegan', 'gluten-free'],
            bestseller: true
        },
        {
            id: 'dal-soup',
            name: 'Dal Soup',
            category: 'Cup of Nourishment',
            price: 160,
            image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Traditional lentil soup with aromatic spices',
            rating: 4.6,
            reviews: 35,
            tags: ['protein-rich', 'vegan', 'comfort-food']
        },
        {
            id: 'rasam-soup',
            name: 'Rasam Soup',
            category: 'Cup of Nourishment',
            price: 170,
            image: 'https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'South Indian tangy tamarind soup with healing spices',
            rating: 4.7,
            reviews: 42,
            tags: ['digestive', 'immunity-boost', 'traditional']
        },
        {
            id: 'banana-stem-soup',
            name: 'Banana Stem Soup',
            category: 'Cup of Nourishment',
            price: 190,
            image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Detoxifying banana stem in a light, flavorful broth',
            rating: 4.5,
            reviews: 28,
            tags: ['detox', 'fiber-rich', 'unique']
        },
        {
            id: 'mushroom-soup',
            name: 'Mushroom Soup',
            category: 'Cup of Nourishment',
            price: 200,
            image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Creamy mushroom soup with fresh herbs',
            rating: 4.4,
            reviews: 31,
            tags: ['creamy', 'umami', 'comfort-food']
        }
    ],
    
    salads: [
        {
            id: 'american-coleslaw',
            name: 'American Coleslaw',
            category: 'Garden of Flavours',
            price: 140,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Crisp cabbage and carrots in creamy dressing',
            rating: 4.3,
            reviews: 25,
            tags: ['fresh', 'crunchy', 'classic']
        },
        {
            id: 'russian-salad',
            name: 'Russian Salad',
            category: 'Garden of Flavours',
            price: 160,
            image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Mixed vegetables with creamy mayonnaise dressing',
            rating: 4.5,
            reviews: 33,
            tags: ['hearty', 'filling', 'comfort']
        },
        {
            id: 'chickpea-salad',
            name: 'Chickpea Salad',
            category: 'Garden of Flavours',
            price: 150,
            image: 'https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Protein-packed chickpeas with fresh vegetables',
            rating: 4.6,
            reviews: 29,
            tags: ['protein-rich', 'vegan', 'healthy']
        },
        {
            id: 'boiled-peanut-salad',
            name: 'Boiled Peanut Salad',
            category: 'Garden of Flavours',
            price: 130,
            image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Nutritious boiled peanuts with spiced vegetables',
            rating: 4.2,
            reviews: 22,
            tags: ['protein', 'traditional', 'spiced']
        },
        {
            id: 'avocado-salad',
            name: 'Avocado Salad',
            category: 'Garden of Flavours',
            price: 220,
            image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Fresh avocado with mixed greens and citrus dressing',
            rating: 4.8,
            reviews: 41,
            tags: ['superfood', 'healthy-fats', 'fresh']
        }
    ],
    
    mains: [
        {
            id: 'thai-green-curry',
            name: 'Thai Green Curry',
            category: 'Traditional Techniques',
            price: 320,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Authentic Thai curry with coconut milk and vegetables',
            rating: 4.7,
            reviews: 52,
            tags: ['spicy', 'coconut', 'authentic']
        },
        {
            id: 'palak-lesuni',
            name: 'Palak Lesuni',
            category: 'Traditional Techniques',
            price: 280,
            image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Spinach curry with garlic and traditional spices',
            rating: 4.5,
            reviews: 38,
            tags: ['iron-rich', 'traditional', 'garlic']
        },
        {
            id: 'paneer-bhurji',
            name: 'Paneer Bhurji',
            category: 'Traditional Techniques',
            price: 300,
            image: 'https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Scrambled cottage cheese with onions and spices',
            rating: 4.6,
            reviews: 45,
            tags: ['protein', 'vegetarian', 'spiced']
        },
        {
            id: 'vegetable-korma',
            name: 'Vegetable Korma',
            category: 'Traditional Techniques',
            price: 290,
            image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Mixed vegetables in rich, creamy coconut gravy',
            rating: 4.4,
            reviews: 36,
            tags: ['creamy', 'coconut', 'mild']
        }
    ],
    
    desserts: [
        {
            id: 'jamun-ice-cream',
            name: 'Jamun Ice Cream',
            category: 'Chill Treats',
            price: 150,
            image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Creamy ice cream made with fresh jamun fruit',
            rating: 4.8,
            reviews: 67,
            tags: ['antioxidant', 'natural', 'cooling'],
            new: true
        },
        {
            id: 'mango-chill',
            name: 'Mango Chill',
            category: 'Chill Treats',
            price: 140,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Refreshing mango-based frozen dessert',
            rating: 4.7,
            reviews: 54,
            tags: ['tropical', 'vitamin-c', 'refreshing']
        },
        {
            id: 'coffee-scoop',
            name: 'Coffee Scoop',
            category: 'Chill Treats',
            price: 160,
            image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Rich coffee-flavored ice cream with a caffeine kick',
            rating: 4.6,
            reviews: 43,
            tags: ['coffee', 'energizing', 'rich']
        },
        {
            id: 'dry-fruit-fantasy',
            name: 'Dry Fruit Fantasy',
            category: 'Chill Treats',
            price: 180,
            image: 'https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Premium ice cream loaded with mixed dry fruits',
            rating: 4.5,
            reviews: 39,
            tags: ['premium', 'nuts', 'indulgent']
        }
    ],
    
    beverages: [
        {
            id: 'filter-coffee',
            name: 'Filter Coffee',
            category: 'Quench Couture',
            price: 80,
            image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Traditional South Indian filter coffee',
            rating: 4.7,
            reviews: 89,
            tags: ['traditional', 'energizing', 'aromatic']
        },
        {
            id: 'mocha',
            name: 'Mocha',
            category: 'Quench Couture',
            price: 120,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Rich coffee blended with chocolate',
            rating: 4.6,
            reviews: 56,
            tags: ['chocolate', 'coffee', 'indulgent']
        },
        {
            id: 'tulsi-tea',
            name: 'Tulsi Tea',
            category: 'Quench Couture',
            price: 70,
            image: 'https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Healing holy basil tea with natural herbs',
            rating: 4.8,
            reviews: 72,
            tags: ['healing', 'herbal', 'immunity']
        },
        {
            id: 'saffron-milk',
            name: 'Saffron Milk',
            category: 'Quench Couture',
            price: 100,
            image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Warm milk infused with premium saffron',
            rating: 4.5,
            reviews: 34,
            tags: ['premium', 'warming', 'luxury']
        }
    ],
    
    snacks: [
        {
            id: 'garlic-cashews',
            name: 'Garlic Cashews',
            category: 'Vital Crisps',
            price: 250,
            image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Roasted cashews with aromatic garlic seasoning',
            rating: 4.6,
            reviews: 48,
            tags: ['crunchy', 'protein', 'garlic']
        },
        {
            id: 'chakli',
            name: 'Chakli',
            category: 'Vital Crisps',
            price: 180,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Traditional spiral-shaped savory snack',
            rating: 4.4,
            reviews: 35,
            tags: ['traditional', 'crispy', 'savory']
        },
        {
            id: 'banana-chips',
            name: 'Banana Chips',
            category: 'Vital Crisps',
            price: 120,
            image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
            description: 'Crispy banana chips with natural sweetness',
            rating: 4.3,
            reviews: 41,
            tags: ['natural', 'sweet', 'crispy']
        }
    ]
};

// Get all products as a flat array
function getAllProducts() {
    const allProducts = [];
    Object.values(livlifMenu).forEach(category => {
        allProducts.push(...category);
    });
    return allProducts;
}

// Get products by category
function getProductsByCategory(category) {
    return livlifMenu[category] || [];
}

// Get product by ID
function getProductById(id) {
    const allProducts = getAllProducts();
    return allProducts.find(product => product.id === id);
}

// Filter products
function filterProducts(products, filters = {}) {
    let filtered = [...products];
    
    // Filter by search term
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by price range
    if (filters.minPrice !== undefined) {
        filtered = filtered.filter(product => product.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(product => product.price <= filters.maxPrice);
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter(product => 
            filters.tags.some(tag => product.tags.includes(tag))
        );
    }
    
    return filtered;
}

// Sort products
function sortProducts(products, sortBy = 'featured') {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'featured':
        default:
            // Sort by bestseller, new, then rating
            return sorted.sort((a, b) => {
                if (a.bestseller && !b.bestseller) return -1;
                if (!a.bestseller && b.bestseller) return 1;
                if (a.new && !b.new) return -1;
                if (!a.new && b.new) return 1;
                return b.rating - a.rating;
            });
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        livlifMenu,
        getAllProducts,
        getProductsByCategory,
        getProductById,
        filterProducts,
        sortProducts
    };
}