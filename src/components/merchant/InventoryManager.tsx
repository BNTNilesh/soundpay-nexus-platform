
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Store, Package, Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import LocationManager from './LocationManager';
import StoreManager from './StoreManager';
import ProductManager from './ProductManager';
import POSSyncDashboard from './POSSyncDashboard';
import { useToast } from "@/hooks/use-toast";
import { cachedLocations, cachedStores, cachedProducts, CachedLocation, CachedStore, CachedProduct } from '@/data/industryData';

// Re-export interfaces for compatibility
export interface Location extends CachedLocation {}
export interface Store extends CachedStore {}
export interface Product extends CachedProduct {}

const InventoryManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Use cached data from industryData
  const [locations, setLocations] = useState<Location[]>(cachedLocations);
  const [stores, setStores] = useState<Store[]>(cachedStores);
  const [products, setProducts] = useState<Product[]>(cachedProducts);

  // Update store count when stores change
  const updateLocationStoreCounts = () => {
    const updatedLocations = locations.map(location => ({
      ...location,
      storeCount: stores.filter(store => store.locationId === location.id).length
    }));
    setLocations(updatedLocations);
  };

  // Update product count when products change
  const updateStoreProductCounts = () => {
    const updatedStores = stores.map(store => ({
      ...store,
      productCount: products.filter(product => product.storeId === store.id).length
    }));
    setStores(updatedStores);
  };

  const handleSyncPOS = () => {
    toast({
      title: "POS Sync Started",
      description: "Synchronizing with SoundPayment POS system...",
    });
    
    // Simulate sync process
    setTimeout(() => {
      // Update lastSynced for all products
      const updatedProducts = products.map(product => ({
        ...product,
        lastSynced: new Date().toLocaleString()
      }));
      setProducts(updatedProducts);
      
      toast({
        title: "POS Sync Completed",
        description: "Successfully synchronized inventory with SoundPayment POS.",
      });
    }, 3000);
  };

  const stats = {
    totalLocations: locations.length,
    activeLocations: locations.filter(l => l.status === 'active').length,
    totalStores: stores.length,
    activeStores: stores.filter(s => s.status === 'active').length,
    totalProducts: products.length,
    lowStockProducts: products.filter(p => p.quantity && p.minStock && p.quantity <= p.minStock).length,
    outOfStockProducts: products.filter(p => p.status === 'out_of_stock').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Locations</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalLocations}</p>
                <p className="text-xs text-gray-500">{stats.activeLocations} active</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stores</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalStores}</p>
                <p className="text-xs text-gray-500">{stats.activeStores} active</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <Store className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalProducts}</p>
                <p className="text-xs text-gray-500">{stats.lowStockProducts} low stock</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">POS Sync</p>
                <Button 
                  onClick={handleSyncPOS}
                  size="sm"
                  className="mt-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="stores">Stores</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="sync">POS Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>Summary of your firearms and tobacco inventory management system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Alerts</h3>
                  {stats.outOfStockProducts > 0 && (
                    <Badge variant="destructive" className="w-full justify-center">
                      {stats.outOfStockProducts} products out of stock
                    </Badge>
                  )}
                  {stats.lowStockProducts > 0 && (
                    <Badge className="w-full justify-center bg-yellow-100 text-yellow-700">
                      {stats.lowStockProducts} products low on stock
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-sm text-gray-600">Last POS sync: {products[0]?.lastSynced}</p>
                  <p className="text-sm text-gray-600">New products added today: 2</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                  <Button 
                    size="sm" 
                    onClick={() => setActiveTab('products')}
                    className="w-full"
                  >
                    Manage Products
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleSyncPOS}
                    className="w-full"
                  >
                    Sync with POS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <LocationManager 
            locations={locations}
            setLocations={setLocations}
            stores={stores}
            onLocationUpdate={updateLocationStoreCounts}
          />
        </TabsContent>

        <TabsContent value="stores">
          <StoreManager 
            stores={stores}
            setStores={setStores}
            locations={locations}
            products={products}
            onStoreUpdate={updateStoreProductCounts}
          />
        </TabsContent>

        <TabsContent value="products">
          <ProductManager 
            products={products}
            setProducts={setProducts}
            stores={stores}
            locations={locations}
          />
        </TabsContent>

        <TabsContent value="sync">
          <POSSyncDashboard 
            products={products}
            onSyncComplete={() => {
              const updatedProducts = products.map(product => ({
                ...product,
                lastSynced: new Date().toLocaleString()
              }));
              setProducts(updatedProducts);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManager;
