export const conversations = [
  {
    id: 1,
    contactName: 'Support Team',
    avatar: 'https://i.pravatar.cc/150?u=support',
    unreadCount: 2,
    lastMessageTime: '10:42 AM',
    messages: [
      { id: 1, sender: 'admin', text: 'Hello! How can we help you today?', timestamp: '10:30 AM', status: 'read' },
      { id: 2, sender: 'user', text: 'I have a question about my recent order #12345.', timestamp: '10:32 AM', status: 'read' },
      { id: 3, sender: 'admin', text: 'Sure, I can help with that. What seems to be the issue?', timestamp: '10:35 AM', status: 'read' },
      { id: 4, sender: 'user', text: 'The tracking status hasn\'t updated in 3 days.', timestamp: '10:40 AM', status: 'read' },
      { id: 5, sender: 'admin', text: 'Let me check that for you right away.', timestamp: '10:42 AM', status: 'delivered' }
    ]
  },
  {
    id: 2,
    contactName: 'Seller: TechGadgets',
    avatar: 'https://i.pravatar.cc/150?u=tech',
    unreadCount: 0,
    lastMessageTime: 'Yesterday',
    messages: [
      { id: 1, sender: 'user', text: 'Is the warranty valid internationally?', timestamp: '09:00 AM', status: 'read' },
      { id: 2, sender: 'admin', text: 'Yes, it comes with a 1-year international warranty.', timestamp: '09:15 AM', status: 'read' }
    ]
  },
  {
    id: 3,
    contactName: 'Billing Support',
    avatar: 'https://i.pravatar.cc/150?u=billing',
    unreadCount: 0,
    lastMessageTime: 'Monday',
    messages: [
      { id: 1, sender: 'user', text: 'My card was charged twice.', timestamp: '11:00 AM', status: 'read' },
      { id: 2, sender: 'admin', text: 'We have initiated a refund for the duplicate charge. It should reflect in 3-5 business days.', timestamp: '11:30 AM', status: 'read' }
    ]
  }
];
