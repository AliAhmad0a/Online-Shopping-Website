const categories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and tech accessories',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80',
    icon: 'Laptop',
    productCount: 4,
    subcategories: ['Audio', 'Smartphones', 'Televisions', 'Wearables'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    icon: 'Shirt',
    productCount: 4,
    subcategories: ['Outerwear', 'Footwear', 'Accessories'],
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 3,
    name: 'Home & Living',
    slug: 'home-and-living',
    description: 'Decor, furniture, and kitchenware',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    icon: 'Home',
    productCount: 4,
    subcategories: ['Kitchen', 'Bedding', 'Home Decor', 'Lighting'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 4,
    name: 'Beauty & Health',
    slug: 'beauty-and-health',
    description: 'Skincare, haircare, and wellness products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    icon: 'Sparkles',
    productCount: 4,
    subcategories: ['Skincare', 'Hair Care', 'Personal Care', 'Wellness'],
    color: 'from-teal-400 to-emerald-500'
  },
  {
    id: 5,
    name: 'Sports & Outdoors',
    slug: 'sports-and-outdoors',
    description: 'Gear for fitness and outdoor adventures',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
    icon: 'Dumbbell',
    productCount: 4,
    subcategories: ['Fitness', 'Accessories', 'Camping'],
    color: 'from-red-500 to-red-700'
  },
  {
    id: 6,
    name: 'Books & Media',
    slug: 'books-and-media',
    description: 'Books, music, and entertainment',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80',
    icon: 'BookOpen',
    productCount: 4,
    subcategories: ['Art & Design', 'Fiction', 'Music', 'Stationery'],
    color: 'from-purple-500 to-fuchsia-600'
  }
];

export default categories;

export { categories };
