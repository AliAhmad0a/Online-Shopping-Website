const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@shopsphere.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    phone: '+1 234-567-8900',
    address: { street: '123 Admin Ave', city: 'Tech City', state: 'CA', zip: '90001', country: 'US' },
    joinedAt: '2023-01-15',
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    phone: '+1 555-123-4567',
    address: { street: '456 Maple St', city: 'Seattle', state: 'WA', zip: '98101', country: 'US' },
    joinedAt: '2023-06-15',
    totalOrders: 5,
    totalSpent: 1250.50
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'mchen@example.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '+1 555-987-6543',
    address: { street: '789 Oak Ln', city: 'Austin', state: 'TX', zip: '73301', country: 'US' },
    joinedAt: '2023-08-22',
    totalOrders: 2,
    totalSpent: 345.99
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phone: '+44 20 7123 4567',
    address: { street: '10 Downing St', city: 'London', state: 'LND', zip: 'SW1A 2AA', country: 'UK' },
    joinedAt: '2023-11-05',
    totalOrders: 8,
    totalSpent: 2100.75
  },
  {
    id: 5,
    name: 'James Rodriguez',
    email: 'jrod@example.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+1 305-555-0192',
    address: { street: '321 Palm Blvd', city: 'Miami', state: 'FL', zip: '33101', country: 'US' },
    joinedAt: '2024-01-10',
    totalOrders: 1,
    totalSpent: 89.99
  },
  {
    id: 6,
    name: 'Olivia Martinez',
    email: 'olivia.m@example.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '+1 212-555-9012',
    address: { street: '55 Broadway', city: 'New York', state: 'NY', zip: '10006', country: 'US' },
    joinedAt: '2024-02-18',
    totalOrders: 3,
    totalSpent: 450.25
  },
  {
    id: 7,
    name: 'William Taylor',
    email: 'will.t@example.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    phone: '+1 312-555-3456',
    address: { street: '890 Lake Shore Dr', city: 'Chicago', state: 'IL', zip: '60611', country: 'US' },
    joinedAt: '2024-03-05',
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: 8,
    name: 'Sophia Lee',
    email: 'sophia.l@example.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    phone: '+1 415-555-7890',
    address: { street: '400 Market St', city: 'San Francisco', state: 'CA', zip: '94104', country: 'US' },
    joinedAt: '2024-03-20',
    totalOrders: 2,
    totalSpent: 125.50
  }
];

export default users;

export { users };
