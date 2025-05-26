
// Shared cache for Ammo and Smoke industry data
export interface CachedLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  manager: string;
  status: 'active' | 'inactive';
  storeCount: number;
  createdAt: string;
}

export interface CachedStore {
  id: string;
  name: string;
  type: string;
  locationId: string;
  manager: string;
  status: 'active' | 'inactive' | 'maintenance';
  productCount: number;
  dailyRevenue: number;
  employees: number;
  openingHours: string;
  createdAt: string;
}

export interface CachedProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost?: number;
  quantity?: number;
  minStock?: number;
  stock?: number;
  storeId?: string;
  locationId?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  supplier?: string;
  description?: string;
  createdAt: string;
  lastSynced?: string;
}

export interface CachedMerchant {
  id: number;
  name: string;
  email: string;
  status: string;
  revenue: string;
  products: number;
  locations: number;
}

// Cached Ammo and Smoke industry data
export const cachedLocations: CachedLocation[] = [
  {
    id: '1',
    name: 'Downtown Firearms & Tobacco',
    address: '1247 Liberty Avenue',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85001',
    phone: '(602) 555-0123',
    email: 'downtown@gunsmoke.com',
    manager: 'Jake Morrison',
    status: 'active',
    storeCount: 3,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Westside Gun & Smoke Shop',
    address: '892 Range Road',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    phone: '(713) 555-0456',
    email: 'westside@gunsmoke.com',
    manager: 'Maria Rodriguez',
    status: 'active',
    storeCount: 2,
    createdAt: '2024-01-05',
  },
];

export const cachedStores: CachedStore[] = [
  {
    id: '1',
    name: 'Tactical Firearms Center',
    type: 'Firearms',
    locationId: '1',
    manager: 'Steve Thompson',
    status: 'active',
    productCount: 156,
    dailyRevenue: 4250.00,
    employees: 8,
    openingHours: '8:00 AM - 8:00 PM',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Premium Tobacco Lounge',
    type: 'Tobacco',
    locationId: '1',
    manager: 'Rebecca Chen',
    status: 'active',
    productCount: 89,
    dailyRevenue: 1890.00,
    employees: 5,
    openingHours: '10:00 AM - 10:00 PM',
    createdAt: '2024-01-05',
  },
  {
    id: '3',
    name: 'Eagle Point Ammunition',
    type: 'Ammunition',
    locationId: '2',
    manager: 'Carlos Martinez',
    status: 'maintenance',
    productCount: 234,
    dailyRevenue: 3200.00,
    employees: 6,
    openingHours: '9:00 AM - 9:00 PM',
    createdAt: '2024-01-10',
  },
];

export const cachedProducts: CachedProduct[] = [
  {
    id: '1',
    name: 'Glock 19 Gen5',
    sku: 'GLK19G5-9MM',
    category: 'Handguns',
    price: 549.99,
    cost: 425.00,
    quantity: 12,
    minStock: 3,
    storeId: '1',
    locationId: '1',
    status: 'active',
    supplier: 'Glock USA',
    description: '9mm Compact Pistol with 15-round capacity',
    createdAt: '2024-01-01',
    lastSynced: '2024-01-20 10:30:00',
  },
  {
    id: '2',
    name: 'Federal Premium 9mm FMJ',
    sku: 'FED-9MM-115-FMJ',
    category: 'Ammunition',
    price: 24.99,
    cost: 18.50,
    quantity: 2,
    minStock: 10,
    storeId: '1',
    locationId: '1',
    status: 'out_of_stock',
    supplier: 'Federal Ammunition',
    description: '115gr Full Metal Jacket - Box of 50',
    createdAt: '2024-01-03',
    lastSynced: '2024-01-20 10:30:00',
  },
  {
    id: '3',
    name: 'Cohiba Robusto Cigars',
    sku: 'COH-ROB-5PK',
    category: 'Premium Cigars',
    price: 89.99,
    cost: 65.00,
    quantity: 25,
    minStock: 5,
    storeId: '2',
    locationId: '1',
    status: 'active',
    supplier: 'Premium Tobacco Imports',
    description: 'Hand-rolled Dominican cigars - 5 pack',
    createdAt: '2024-01-10',
    lastSynced: '2024-01-20 10:30:00',
  },
  {
    id: '4',
    name: 'Remington 870 Shotgun',
    sku: 'REM870-12GA',
    category: 'Shotguns',
    price: 449.99,
    stock: 8,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: '5',
    name: 'Winchester .308 Ammo',
    sku: 'WIN308-150GR',
    category: 'Ammunition',
    price: 32.99,
    stock: 120,
    status: 'active',
    createdAt: '2024-01-02',
  },
];

export const cachedMerchants: CachedMerchant[] = [
  { id: 1, name: "Tactical Defense Supply", email: "contact@tacticaldefense.com", status: "Active", revenue: "$78,450", products: 285, locations: 4 },
  { id: 2, name: "Liberty Gun & Smoke", email: "info@libertygunsmoke.com", status: "Active", revenue: "$65,280", products: 198, locations: 3 },
  { id: 3, name: "Eagle Point Firearms", email: "hello@eaglepointfirearms.com", status: "Pending", revenue: "$34,650", products: 127, locations: 2 },
  { id: 4, name: "Patriot Arms & Tobacco", email: "admin@patriotarms.com", status: "Active", revenue: "$92,130", products: 347, locations: 6 },
  { id: 5, name: "Smoke & Steel Co.", email: "sales@smokesteel.com", status: "Inactive", revenue: "$18,920", products: 89, locations: 1 },
];

export const storeTypes = ['Firearms', 'Tobacco', 'Ammunition', 'Hunting Gear', 'Tactical Equipment', 'Cigars & Pipes'];
export const productCategories = ['Handguns', 'Rifles', 'Shotguns', 'Ammunition', 'Premium Cigars', 'Cigarettes', 'Pipe Tobacco', 'Tactical Gear', 'Hunting Equipment'];
