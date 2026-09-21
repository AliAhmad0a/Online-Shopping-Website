const orders = [
  {
    id: 'ORD-001',
    userId: 2,
    items: [
      { productId: 1, name: 'Wireless Noise-Cancelling Headphones', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80' }
    ],
    subtotal: 299.99,
    shipping: 0.00,
    tax: 24.00,
    total: 323.99,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: { street: '456 Maple St', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
    trackingNumber: 'TRK123456789',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-18',
    deliveredAt: '2024-02-18'
  },
  {
    id: 'ORD-002',
    userId: 3,
    items: [
      { productId: 9, name: 'Ceramic Coffee Mug Set', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80' },
      { productId: 16, name: 'Organic Matcha Powder', price: 24.99, quantity: 1, image: 'https://images.unsplash.com/photo-1582782787884-6355653b4991?w=600&q=80' }
    ],
    subtotal: 84.97,
    shipping: 5.99,
    tax: 6.80,
    total: 97.76,
    status: 'shipped',
    paymentMethod: 'PayPal',
    shippingAddress: { street: '789 Oak Ln', city: 'Austin', state: 'TX', zip: '73301', country: 'US' },
    trackingNumber: 'TRK987654321',
    createdAt: '2024-03-25',
    updatedAt: '2024-03-26',
    deliveredAt: null
  },
  {
    id: 'ORD-003',
    userId: 4,
    items: [
      { productId: 3, name: 'Pro Smartphone X', price: 999.99, quantity: 1, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80' }
    ],
    subtotal: 999.99,
    shipping: 0.00,
    tax: 80.00,
    total: 1079.99,
    status: 'processing',
    paymentMethod: 'Credit Card',
    shippingAddress: { street: '10 Downing St', city: 'London', state: 'LND', zip: 'SW1A 2AA', country: 'UK' },
    trackingNumber: null,
    createdAt: '2024-03-28',
    updatedAt: '2024-03-28',
    deliveredAt: null
  },
  {
    id: 'ORD-004',
    userId: 2,
    items: [
      { productId: 6, name: 'Running Sneakers', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' }
    ],
    subtotal: 129.99,
    shipping: 0.00,
    tax: 10.40,
    total: 140.39,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: { street: '456 Maple St', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
    trackingNumber: 'TRK456123789',
    createdAt: '2023-12-10',
    updatedAt: '2023-12-14',
    deliveredAt: '2023-12-14'
  },
  {
    id: 'ORD-005',
    userId: 5,
    items: [
      { productId: 7, name: 'Minimalist Leather Watch', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80' }
    ],
    subtotal: 89.99,
    shipping: 5.99,
    tax: 7.20,
    total: 103.18,
    status: 'pending',
    paymentMethod: 'PayPal',
    shippingAddress: { street: '321 Palm Blvd', city: 'Miami', state: 'FL', zip: '33101', country: 'US' },
    trackingNumber: null,
    createdAt: '2024-03-29',
    updatedAt: '2024-03-29',
    deliveredAt: null
  },
  {
    id: 'ORD-006',
    userId: 6,
    items: [
      { productId: 13, name: 'Vitamin C Face Serum', price: 35.00, quantity: 2, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80' },
      { productId: 14, name: 'Professional Hair Dryer', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80' }
    ],
    subtotal: 199.99,
    shipping: 0.00,
    tax: 16.00,
    total: 215.99,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: { street: '55 Broadway', city: 'New York', state: 'NY', zip: '10006', country: 'US' },
    trackingNumber: 'TRK112233445',
    createdAt: '2024-02-28',
    updatedAt: '2024-03-03',
    deliveredAt: '2024-03-03'
  },
  {
    id: 'ORD-007',
    userId: 8,
    items: [
      { productId: 17, name: 'Premium Yoga Mat', price: 65.00, quantity: 1, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80' },
      { productId: 18, name: 'Insulated Water Bottle', price: 34.99, quantity: 1, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80' }
    ],
    subtotal: 99.99,
    shipping: 0.00,
    tax: 8.00,
    total: 107.99,
    status: 'cancelled',
    paymentMethod: 'Credit Card',
    shippingAddress: { street: '400 Market St', city: 'San Francisco', state: 'CA', zip: '94104', country: 'US' },
    trackingNumber: null,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-16',
    deliveredAt: null
  },
  {
    id: 'ORD-008',
    userId: 4,
    items: [
      { productId: 22, name: 'Sci-Fi Masterpiece Trilogy', price: 39.99, quantity: 1, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80' }
    ],
    subtotal: 39.99,
    shipping: 5.99,
    tax: 3.20,
    total: 49.18,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: { street: '10 Downing St', city: 'London', state: 'LND', zip: 'SW1A 2AA', country: 'UK' },
    trackingNumber: 'TRK998877665',
    createdAt: '2023-11-28',
    updatedAt: '2023-12-05',
    deliveredAt: '2023-12-05'
  },
  {
    id: 'ORD-009',
    userId: 2,
    items: [
      { productId: 10, name: 'Soft Cotton Bed Sheets', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80' }
    ],
    subtotal: 89.99,
    shipping: 5.99,
    tax: 7.20,
    total: 103.18,
    status: 'processing',
    paymentMethod: 'Credit Card',
    shippingAddress: { street: '456 Maple St', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
    trackingNumber: null,
    createdAt: '2024-03-28',
    updatedAt: '2024-03-28',
    deliveredAt: null
  },
  {
    id: 'ORD-010',
    userId: 3,
    items: [
      { productId: 20, name: 'Adjustable Dumbbell Set', price: 159.99, quantity: 1, image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80' }
    ],
    subtotal: 159.99,
    shipping: 19.99,
    tax: 12.80,
    total: 192.78,
    status: 'shipped',
    paymentMethod: 'PayPal',
    shippingAddress: { street: '789 Oak Ln', city: 'Austin', state: 'TX', zip: '73301', country: 'US' },
    trackingNumber: 'TRK554433221',
    createdAt: '2024-03-22',
    updatedAt: '2024-03-24',
    deliveredAt: null
  },
  {
    id: 'ORD-011',
    userId: 6,
    items: [
      { productId: 5, name: 'Classic Denim Jacket', price: 79.99, quantity: 1, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80' },
      { productId: 8, name: 'Silk Blend Scarf', price: 34.99, quantity: 1, image: 'https://images.unsplash.com/photo-1606293459228-76c1dc703774?w=600&q=80' }
    ],
    subtotal: 114.98,
    shipping: 0.00,
    tax: 9.20,
    total: 124.18,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: { street: '55 Broadway', city: 'New York', state: 'NY', zip: '10006', country: 'US' },
    trackingNumber: 'TRK776655443',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-14',
    deliveredAt: '2024-01-14'
  },
  {
    id: 'ORD-012',
    userId: 8,
    items: [
      { productId: 11, name: 'Aromatherapy Essential Oil Diffuser', price: 45.00, quantity: 1, image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80' }
    ],
    subtotal: 45.00,
    shipping: 5.99,
    tax: 3.60,
    total: 54.59,
    status: 'pending',
    paymentMethod: 'PayPal',
    shippingAddress: { street: '400 Market St', city: 'San Francisco', state: 'CA', zip: '94104', country: 'US' },
    trackingNumber: null,
    createdAt: '2024-03-29',
    updatedAt: '2024-03-29',
    deliveredAt: null
  }
];

export default orders;

export { orders };
