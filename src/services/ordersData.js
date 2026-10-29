// Realistic sample orders for the Orders management pages.
// Replace with real API calls once a backend exists — components consume
// plain order objects, so the swap is a data-source change only.

export const paymentStatuses = ['Paid', 'Pending', 'Failed', 'Refunded'];
export const orderStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function buildOrder({ items, deliveryFee, ...rest }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {
    ...rest,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}

export const initialOrders = [
  buildOrder({
    id: 'KB-1050',
    date: '2026-09-20',
    customer: {
      name: 'Adaeze Chukwu',
      phone: '+234 803 555 1122',
      email: 'adaeze.chukwu@example.com',
    },
    delivery: { address: '14 Bode Thomas Street', city: 'Surulere', state: 'Lagos' },
    items: [{ name: 'Ankara Wrap Dress', category: 'Clothes', quantity: 1, price: 45000 }],
    deliveryFee: 2500,
    payment: { reference: 'PSK-88213', method: 'Card', status: 'Paid' },
    orderStatus: 'Delivered',
  }),
  buildOrder({
    id: 'KB-1049',
    date: '2026-09-19',
    customer: {
      name: 'Tunde Bakare',
      phone: '+234 805 222 9981',
      email: 'tunde.bakare@example.com',
    },
    delivery: { address: '22 Allen Avenue', city: 'Ikeja', state: 'Lagos' },
    items: [{ name: 'Leather Loafers', category: 'Shoes', quantity: 1, price: 32500 }],
    deliveryFee: 2000,
    payment: { reference: 'TRX-77102', method: 'Bank Transfer', status: 'Paid' },
    orderStatus: 'Shipped',
  }),
  buildOrder({
    id: 'KB-1048',
    date: '2026-09-18',
    customer: {
      name: 'Ngozi Obi',
      phone: '+234 810 444 6673',
      email: 'ngozi.obi@example.com',
    },
    delivery: { address: '5 Nnamdi Azikiwe Road', city: 'Enugu', state: 'Enugu' },
    items: [{ name: 'Silk Blouse', category: 'Clothes', quantity: 2, price: 28000 }],
    deliveryFee: 3000,
    payment: { reference: 'TRX-77098', method: 'Bank Transfer', status: 'Pending' },
    orderStatus: 'Processing',
  }),
  buildOrder({
    id: 'KB-1047',
    date: '2026-09-15',
    customer: {
      name: 'Kelechi Nwosu',
      phone: '+234 802 999 3345',
      email: 'kelechi.nwosu@example.com',
    },
    delivery: { address: '9 Ahmadu Bello Way', city: 'Kaduna', state: 'Kaduna' },
    items: [
      { name: 'Denim Jacket', category: 'Clothes', quantity: 1, price: 39900 },
      { name: 'High-Waist Trousers', category: 'Clothes', quantity: 1, price: 25000 },
    ],
    deliveryFee: 3500,
    payment: { reference: 'PSK-88190', method: 'Card', status: 'Paid' },
    orderStatus: 'Delivered',
  }),
  buildOrder({
    id: 'KB-1046',
    date: '2026-09-14',
    customer: {
      name: 'Bisi Adigun',
      phone: '+234 807 111 5567',
      email: 'bisi.adigun@example.com',
    },
    delivery: { address: '3 Ring Road', city: 'Ibadan', state: 'Oyo' },
    items: [{ name: 'Suede Ankle Boots', category: 'Shoes', quantity: 1, price: 52000 }],
    deliveryFee: 3000,
    payment: { reference: 'PSK-88055', method: 'Card', status: 'Failed' },
    orderStatus: 'Cancelled',
  }),
  buildOrder({
    id: 'KB-1045',
    date: '2026-09-12',
    customer: {
      name: 'Ifeoma Eze',
      phone: '+234 813 666 7789',
      email: 'ifeoma.eze@example.com',
    },
    delivery: { address: '18 Aba Road', city: 'Port Harcourt', state: 'Rivers' },
    items: [{ name: 'Sequin Evening Gown', category: 'Clothes', quantity: 1, price: 68500 }],
    deliveryFee: 4000,
    payment: { reference: 'PSK-87991', method: 'Card', status: 'Paid' },
    orderStatus: 'Delivered',
  }),
  buildOrder({
    id: 'KB-1044',
    date: '2026-09-10',
    customer: {
      name: 'Chiamaka Okafor',
      phone: '+234 809 333 2214',
      email: 'chiamaka.okafor@example.com',
    },
    delivery: { address: '27 Adeola Odeku Street', city: 'Victoria Island', state: 'Lagos' },
    items: [{ name: 'Classic White Sneakers', category: 'Shoes', quantity: 1, price: 29000 }],
    deliveryFee: 2000,
    payment: { reference: 'TRX-76890', method: 'Bank Transfer', status: 'Paid' },
    orderStatus: 'Confirmed',
  }),
  buildOrder({
    id: 'KB-1043',
    date: '2026-09-08',
    customer: {
      name: 'Emeka Umeh',
      phone: '+234 806 888 4432',
      email: 'emeka.umeh@example.com',
    },
    delivery: { address: '12 Zik Avenue', city: 'Awka', state: 'Anambra' },
    items: [
      { name: 'Kaftan Maxi Dress', category: 'Clothes', quantity: 1, price: 52000 },
      { name: 'Statement Silk Scarf', category: 'Clothes', quantity: 1, price: 12500 },
    ],
    deliveryFee: 3000,
    payment: { reference: 'PSK-87755', method: 'Card', status: 'Refunded' },
    orderStatus: 'Cancelled',
  }),
  buildOrder({
    id: 'KB-1042',
    date: '2026-09-05',
    customer: {
      name: 'Halima Suleiman',
      phone: '+234 812 555 7890',
      email: 'halima.suleiman@example.com',
    },
    delivery: { address: '8 Ahmadu Bello Crescent', city: 'Kano', state: 'Kano' },
    items: [{ name: 'Tailored Blazer', category: 'Clothes', quantity: 1, price: 47500 }],
    deliveryFee: 3500,
    payment: { reference: 'CASH-10021', method: 'Cash on Delivery', status: 'Pending' },
    orderStatus: 'Pending',
  }),
  buildOrder({
    id: 'KB-1041',
    date: '2026-09-01',
    customer: {
      name: 'Yetunde Adeyemi',
      phone: '+234 815 222 3345',
      email: 'yetunde.adeyemi@example.com',
    },
    delivery: { address: '41 Ligali Ayorinde Street', city: 'Victoria Island', state: 'Lagos' },
    items: [{ name: 'Espadrille Wedges', category: 'Shoes', quantity: 1, price: 26800 }],
    deliveryFee: 2000,
    payment: { reference: 'PSK-87500', method: 'Card', status: 'Paid' },
    orderStatus: 'Delivered',
  }),
  buildOrder({
    id: 'KB-1040',
    date: '2026-08-25',
    customer: {
      name: 'David Okon',
      phone: '+234 803 777 1290',
      email: 'david.okon@example.com',
    },
    delivery: { address: '6 Marina Road', city: 'Calabar', state: 'Cross River' },
    items: [{ name: 'Chelsea Rain Boots', category: 'Shoes', quantity: 1, price: 41200 }],
    deliveryFee: 3000,
    payment: { reference: 'PSK-87322', method: 'Card', status: 'Paid' },
    orderStatus: 'Shipped',
  }),
  buildOrder({
    id: 'KB-1039',
    date: '2026-08-18',
    customer: {
      name: 'Amina Bello',
      phone: '+234 816 999 4501',
      email: 'amina.bello@example.com',
    },
    delivery: { address: '15 Yakubu Gowon Way', city: 'Jos', state: 'Plateau' },
    items: [{ name: 'Pleated Midi Skirt', category: 'Clothes', quantity: 2, price: 22500 }],
    deliveryFee: 2500,
    payment: { reference: 'TRX-76200', method: 'Bank Transfer', status: 'Paid' },
    orderStatus: 'Delivered',
  }),
  buildOrder({
    id: 'KB-1038',
    date: '2026-08-05',
    customer: {
      name: 'Obinna Chukwuemeka',
      phone: '+234 802 111 6678',
      email: 'obinna.chukwuemeka@example.com',
    },
    delivery: { address: '30 Aba Road', city: 'Owerri', state: 'Imo' },
    items: [{ name: 'Beaded Clutch Bag', category: 'Clothes', quantity: 1, price: 33000 }],
    deliveryFee: 2500,
    payment: { reference: 'PSK-87010', method: 'Card', status: 'Failed' },
    orderStatus: 'Cancelled',
  }),
  buildOrder({
    id: 'KB-1037',
    date: '2026-07-28',
    customer: {
      name: 'Funmilayo Adisa',
      phone: '+234 814 333 8890',
      email: 'funmilayo.adisa@example.com',
    },
    delivery: { address: '2 Opebi Road', city: 'Ikeja', state: 'Lagos' },
    items: [
      { name: 'Cropped Cardigan', category: 'Clothes', quantity: 1, price: 19900 },
      { name: 'Strappy Block Heels', category: 'Shoes', quantity: 1, price: 37500 },
    ],
    deliveryFee: 3000,
    payment: { reference: 'PSK-86750', method: 'Card', status: 'Paid' },
    orderStatus: 'Delivered',
  }),
];
