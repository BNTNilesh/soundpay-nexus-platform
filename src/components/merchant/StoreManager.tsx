import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Store, Plus, Edit, Trash2, Package, DollarSign, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Location, Store as StoreType, Product } from './InventoryManager';

interface StoreManagerProps {
  stores: StoreType[];
  setStores: (stores: StoreType[]) => void;
  locations: Location[];
  products: Product[];
  onStoreUpdate: () => void;
}

const StoreManager = ({ stores, setStores, locations, products, onStoreUpdate }: StoreManagerProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    locationId: '',
    manager: '',
    openingHours: '',
  });

  // Updated store types for Ammo and Smoke industry
  const storeTypes = ['Firearms', 'Ammunition', 'Hunting Gear', 'Tobacco', 'Vaping', 'Cigars', 'Accessories', 'Training'];

  const resetForm = () => {
    setFormData({ name: '', type: '', locationId: '', manager: '', openingHours: '' });
    setEditingStore(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.locationId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingStore) {
      // Update existing store
      const updatedStores = stores.map(store => 
        store.id === editingStore.id 
          ? { 
              ...store, 
              ...formData,
              openingHours: formData.openingHours || '9:00 AM - 5:00 PM'
            }
          : store
      );
      setStores(updatedStores);
      toast({
        title: "Store Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new store
      const newStore: StoreType = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
        productCount: 0,
        dailyRevenue: 0,
        employees: 1,
        openingHours: formData.openingHours || '9:00 AM - 5:00 PM',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setStores([...stores, newStore]);
      toast({
        title: "Store Added",
        description: `${formData.name} has been added successfully.`,
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
    onStoreUpdate();
  };

  const handleEdit = (store: StoreType) => {
    setFormData({
      name: store.name,
      type: store.type,
      locationId: store.locationId,
      manager: store.manager,
      openingHours: store.openingHours,
    });
    setEditingStore(store);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (storeId: string) => {
    const storeProducts = products.filter(product => product.storeId === storeId);
    if (storeProducts.length > 0) {
      toast({
        title: "Cannot Delete Store",
        description: "Please remove all products from this store first.",
        variant: "destructive",
      });
      return;
    }

    setStores(stores.filter(store => store.id !== storeId));
    toast({
      title: "Store Deleted",
      description: "Store has been removed successfully.",
    });
    onStoreUpdate();
  };

  const toggleStatus = (storeId: string) => {
    const updatedStores = stores.map(store => {
      if (store.id === storeId) {
        const statusOrder = ['active', 'inactive', 'maintenance'];
        const currentIndex = statusOrder.indexOf(store.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...store, status: nextStatus as any };
      }
      return store;
    });
    setStores(updatedStores);
  };

  const getLocationName = (locationId: string) => {
    return locations.find(loc => loc.id === locationId)?.name || 'Unknown Location';
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Store className="h-5 w-5 text-green-600" />
              <span>Store Management</span>
            </CardTitle>
            <CardDescription>Manage your stores across different locations</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                disabled={locations.length === 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Store
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingStore ? 'Edit Store' : 'Add New Store'}
                </DialogTitle>
                <DialogDescription>
                  {editingStore ? 'Update store details' : 'Create a new store at one of your locations'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Store Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter store name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Store Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
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
                    <Label htmlFor="location">Location *</Label>
                    <Select value={formData.locationId} onValueChange={(value) => setFormData({ ...formData, locationId: value })}>
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
                      value={formData.manager}
                      onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                      placeholder="Enter manager name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="openingHours">Opening Hours</Label>
                    <Input
                      id="openingHours"
                      value={formData.openingHours}
                      onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleSubmit} className="flex-1">
                    {editingStore ? 'Update Store' : 'Add Store'}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    resetForm();
                    setIsAddDialogOpen(false);
                  }} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {locations.length === 0 ? (
          <div className="text-center py-12">
            <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No locations available</h3>
            <p className="text-gray-600">Please add a location first before creating stores.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {stores.map((store) => (
              <Card key={store.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                          <Store className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{store.type}</Badge>
                            <Badge className={getStatusBadgeColor(store.status)}>
                              {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                            </Badge>
                            <Badge variant="secondary">{getLocationName(store.locationId)}</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Package className="h-4 w-4" />
                          <span>{products.filter(p => p.storeId === store.id).length} products</span>
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
                          <Store className="h-4 w-4" />
                          <span>{store.openingHours}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {store.manager && <p>Manager: {store.manager}</p>}
                        <p>Created: {store.createdAt}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(store.id)}
                        className="hover:bg-blue-50"
                      >
                        Change Status
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(store)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover:bg-red-50 hover:border-red-200"
                        onClick={() => handleDelete(store.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {stores.length === 0 && (
              <div className="text-center py-12">
                <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No stores yet</h3>
                <p className="text-gray-600 mb-6">Create your first store to start managing inventory.</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Store
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoreManager;
