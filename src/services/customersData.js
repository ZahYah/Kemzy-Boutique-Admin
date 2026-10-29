// Realistic sample customers for the Customers management pages.
// Replace with real API calls once a backend exists — components consume
// plain customer objects, so the swap is a data-source change only.

export const customerStatuses = ['Active', 'Inactive'];

const ACTIVE_WINDOW_DAYS = 120;
const DAY_MS = 24 * 60 * 60 * 1000;

function buildCustomer({ orders, registrationDate, ...rest }) {
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const lastOrderDate = orders.length
    ? orders.reduce((latest, o) => (new Date(o.date) > new Date(latest) ? o.date : latest), orders[0].date)
    : null;

  const daysSinceLastOrder = lastOrderDate
    ? (Date.now() - new Date(lastOrderDate).getTime()) / DAY_MS
    : Infinity;

  const status = daysSinceLastOrder <= ACTIVE_WINDOW_DAYS ? 'Active' : 'Inactive';

  return {
    ...rest,
    registrationDate,
    orders,
    totalOrders,
    totalSpent,
    lastOrderDate,
    status,
  };
}

export const initialCustomers = [
  buildCustomer({
    id: 'CUST-001',
    name: 'Adaeze Chukwu',
    email: 'adaeze.chukwu@example.com',
    phone: '+234 803 555 1122',
    registrationDate: '2025-11-02',
    orders: [
      { id: 'KB-1050', date: '2026-09-20', total: 47500, status: 'Delivered' },
      { id: 'KB-1032', date: '2026-07-10', total: 52000, status: 'Delivered' },
      { id: 'KB-1018', date: '2026-05-02', total: 33000, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-002',
    name: 'Tunde Bakare',
    email: 'tunde.bakare@example.com',
    phone: '+234 805 222 9981',
    registrationDate: '2026-02-14',
    orders: [
      { id: 'KB-1049', date: '2026-09-19', total: 34500, status: 'Shipped' },
      { id: 'KB-1005', date: '2026-06-15', total: 28800, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-003',
    name: 'Ngozi Obi',
    email: 'ngozi.obi@example.com',
    phone: '+234 810 444 6673',
    registrationDate: '2026-09-01',
    orders: [{ id: 'KB-1048', date: '2026-09-18', total: 59000, status: 'Processing' }],
  }),
  buildCustomer({
    id: 'CUST-004',
    name: 'Kelechi Nwosu',
    email: 'kelechi.nwosu@example.com',
    phone: '+234 802 999 3345',
    registrationDate: '2025-09-20',
    orders: [
      { id: 'KB-1047', date: '2026-09-15', total: 68400, status: 'Delivered' },
      { id: 'KB-0961', date: '2026-04-03', total: 45000, status: 'Delivered' },
      { id: 'KB-0899', date: '2026-01-20', total: 31000, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-005',
    name: 'Bisi Adigun',
    email: 'bisi.adigun@example.com',
    phone: '+234 807 111 5567',
    registrationDate: '2026-08-01',
    orders: [{ id: 'KB-1046', date: '2026-09-14', total: 55000, status: 'Cancelled' }],
  }),
  buildCustomer({
    id: 'CUST-006',
    name: 'Ifeoma Eze',
    email: 'ifeoma.eze@example.com',
    phone: '+234 813 666 7789',
    registrationDate: '2025-12-11',
    orders: [
      { id: 'KB-1045', date: '2026-09-12', total: 72500, status: 'Delivered' },
      { id: 'KB-0930', date: '2026-03-08', total: 40000, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-007',
    name: 'Chiamaka Okafor',
    email: 'chiamaka.okafor@example.com',
    phone: '+234 809 333 2214',
    registrationDate: '2026-09-05',
    orders: [{ id: 'KB-1044', date: '2026-09-10', total: 31000, status: 'Confirmed' }],
  }),
  buildCustomer({
    id: 'CUST-008',
    name: 'Emeka Umeh',
    email: 'emeka.umeh@example.com',
    phone: '+234 806 888 4432',
    registrationDate: '2026-01-18',
    orders: [
      { id: 'KB-1043', date: '2026-09-08', total: 67500, status: 'Cancelled' },
      { id: 'KB-0872', date: '2026-02-14', total: 29500, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-009',
    name: 'Halima Suleiman',
    email: 'halima.suleiman@example.com',
    phone: '+234 812 555 7890',
    registrationDate: '2026-08-20',
    orders: [{ id: 'KB-1042', date: '2026-09-05', total: 51000, status: 'Pending' }],
  }),
  buildCustomer({
    id: 'CUST-010',
    name: 'Yetunde Adeyemi',
    email: 'yetunde.adeyemi@example.com',
    phone: '+234 815 222 3345',
    registrationDate: '2025-08-30',
    orders: [
      { id: 'KB-1041', date: '2026-09-01', total: 28800, status: 'Delivered' },
      { id: 'KB-0810', date: '2026-01-05', total: 61000, status: 'Delivered' },
      { id: 'KB-0705', date: '2025-10-12', total: 38000, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-011',
    name: 'David Okon',
    email: 'david.okon@example.com',
    phone: '+234 803 777 1290',
    registrationDate: '2026-06-05',
    orders: [{ id: 'KB-1040', date: '2026-08-25', total: 44200, status: 'Shipped' }],
  }),
  buildCustomer({
    id: 'CUST-012',
    name: 'Amina Bello',
    email: 'amina.bello@example.com',
    phone: '+234 816 999 4501',
    registrationDate: '2025-10-22',
    orders: [
      { id: 'KB-1039', date: '2026-08-18', total: 47500, status: 'Delivered' },
      { id: 'KB-0845', date: '2026-03-02', total: 35000, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-013',
    name: 'Obinna Chukwuemeka',
    email: 'obinna.chukwuemeka@example.com',
    phone: '+234 802 111 6678',
    registrationDate: '2026-07-15',
    orders: [{ id: 'KB-1038', date: '2026-08-05', total: 35500, status: 'Cancelled' }],
  }),
  buildCustomer({
    id: 'CUST-014',
    name: 'Funmilayo Adisa',
    email: 'funmilayo.adisa@example.com',
    phone: '+234 814 333 8890',
    registrationDate: '2025-12-30',
    orders: [
      { id: 'KB-1037', date: '2026-07-28', total: 60400, status: 'Delivered' },
      { id: 'KB-0780', date: '2026-01-30', total: 22000, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-015',
    name: 'Grace Adeyinka',
    email: 'grace.adeyinka@example.com',
    phone: '+234 817 444 2290',
    registrationDate: '2025-06-10',
    orders: [
      { id: 'KB-0912', date: '2026-01-15', total: 42000, status: 'Delivered' },
      { id: 'KB-0850', date: '2025-10-20', total: 28000, status: 'Delivered' },
    ],
  }),
  buildCustomer({
    id: 'CUST-016',
    name: 'Segun Afolabi',
    email: 'segun.afolabi@example.com',
    phone: '+234 818 666 3312',
    registrationDate: '2025-08-01',
    orders: [{ id: 'KB-0777', date: '2025-12-05', total: 51500, status: 'Delivered' }],
  }),
  buildCustomer({
    id: 'CUST-017',
    name: 'Blessing Nwachukwu',
    email: 'blessing.nwachukwu@example.com',
    phone: '+234 819 222 5541',
    registrationDate: '2026-09-15',
    orders: [],
  }),
];
