import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Store, Plus, Edit, Trash2, Clock, Package, DollarSign, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cachedStores, cachedLocations, storeTypes, CachedStore } from '@/data/industryData';

const MerchantStores = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStore, setNewStore] = useState({
    name: '',
    type: '',
    locationId: '',
    manager: '',
    openingHours: '',
  });

  const [stores, setStores] = useState<CachedStore[]>(cachedStores);

  const locations = cachedLocations;

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddStore = () => {
    if (!newStore.name || !newStore.type || !newStore.locationId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const store: CachedStore = {
      id: Date.now().toString(),
      name: newStore.name,
      type: newStore.type,
      locationId: newStore.locationId,
      manager: newStore.manager,
      status: 'active',
      productCount: 0,
      dailyRevenue: 0,
      employees: 1,
      openingHours: newStore.openingHours || '9:00 AM - 5:00 PM',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setStores([...stores, store]);
    setNewStore({ name: '', type: '', locationId: '', manager: '', openingHours: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Store Added",
      description: `${store.name} has been added successfully.`,
    });
  };

  const handleDeleteStore = (storeId: string) => {
    setStores(stores.filter(store => store.id !== storeId));
    toast({
      title: "Store Deleted",
      description: "Store has been removed from your business.",
    });
  };

  const toggleStoreStatus = (storeId: string) => {
    setStores(stores.map(store => {
      if (store.id === storeId) {
        const statusOrder = ['active', 'inactive', 'maintenance'];
        const currentIndex = statusOrder.indexOf(store.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...store, status: nextStatus as any };
      }
      return store;
    }));
  };

  const activeStores = stores.filter(s => s.status === 'active').length;
  const totalRevenue = stores.reduce((sum, s) => sum + s.dailyRevenue, 0);
  const totalProducts = stores.reduce((sum, s) => sum + s.productCount, 0);
  const totalEmployees = stores.reduce((sum, s) => sum + s.employees, 0);

  const getLocationName = (locationId: string) => {
    return locations.find(loc => loc.id === locationId)?.name || 'Unknown Location';
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stores</p>
                <p className="text-3xl font-bold text-gray-900">{stores.length}</p>
                <p className="text-xs text-gray-500">{activeStores} active</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                <Store className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Revenue</p>
                <p className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(0)}</p>
                <p className="text-xs text-gray-500">across all stores</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-3xl font-bold text-purple-600">{totalProducts}</p>
                <p className="text-xs text-gray-500">total inventory</p>
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
                <p className="text-sm font-medium text-gray-600">Employees</p>
                <p className="text-3xl font-bold text-orange-600">{totalEmployees}</p>
                <p className="text-xs text-gray-500">total staff</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Store className="h-5 w-5 text-blue-600" />
                <span>Store Management</span>
              </CardTitle>
              <CardDescription>Manage your firearms and tobacco stores across different locations</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Store
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Store</DialogTitle>
                  <DialogDescription>
                    Create a new firearms or tobacco store at one of your locations.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Store Name</Label>
                    <Input
                      id="name"
                      value={newStore.name}
                      onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                      placeholder="Enter store name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Store Type</Label>
                      <Select value={newStore.type} onValueChange={(value) => setNewStore({ ...newStore, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {storeTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select value={newStore.locationId} onValueChange={(value) => setNewStore({ ...newStore, locationId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.filter(loc => loc.status === 'active').map((location) => (
                            <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="manager">Store Manager</Label>
                      <Input
                        id="manager"
                        value={newStore.manager}
                        onChange={(e) => setNewStore({ ...newStore, manager: e.target.value })}
                        placeholder="Enter manager name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="openingHours">Opening Hours</Label>
                      <Input
                        id="openingHours"
                        value={newStore.openingHours}
                        onChange={(e) => setNewStore({ ...newStore, openingHours: e.target.value })}
                        placeholder="e.g., 9:00 AM - 5:00 PM"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleAddStore} className="flex-1">
                      Add Store
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {stores.map((store) => (
              <Card key={store.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                          <Store className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{store.type}</Badge>
                            <Badge className={getStatusBadgeColor(store.status)}>
                              {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Package className="h-4 w-4" />
                          <span>{store.productCount} products</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>${store.dailyRevenue.toFixed(0)}/day</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{store.employees} employees</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{store.openingHours}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        <p>Location: {getLocationName(store.locationId)}</p>
                        {store.manager && <p>Manager: {store.manager}</p>}
                        <p>Created: {store.createdAt}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStoreStatus(store.id)}
                        className="hover:bg-blue-50"
                      >
                        {store.status === 'active' ? 'Change Status' : 'Activate'}
                      </Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="p-2 hover:bg-red-50 hover:border-red-200"
                        onClick={() => handleDeleteStore(store.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {stores.length === 0 && (
            <div className="text-center py-12">
              <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stores yet</h3>
              <p className="text-gray-600 mb-6">Create your first firearms or tobacco store to start managing inventory.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Store
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantStores;
