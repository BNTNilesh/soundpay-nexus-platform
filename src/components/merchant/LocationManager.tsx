
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Plus, Edit, Trash2, Phone, Store as StoreIcon, Building } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Location, Store } from './InventoryManager';

interface LocationManagerProps {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
  stores: Store[];
  onLocationUpdate: () => void;
}

const LocationManager = ({ locations, setLocations, stores, onLocationUpdate }: LocationManagerProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    manager: '',
  });

  const resetForm = () => {
    setFormData({ name: '', address: '', city: '', state: '', zipCode: '', phone: '', email: '', manager: '' });
    setEditingLocation(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.city) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingLocation) {
      // Update existing location
      const updatedLocations = locations.map(location => 
        location.id === editingLocation.id 
          ? { ...location, ...formData }
          : location
      );
      setLocations(updatedLocations);
      toast({
        title: "Location Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new location
      const newLocation: Location = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
        storeCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setLocations([...locations, newLocation]);
      toast({
        title: "Location Added",
        description: `${formData.name} has been added successfully.`,
      });
    }

    resetForm();
    setIsAddDialogOpen(false);
    onLocationUpdate();
  };

  const handleEdit = (location: Location) => {
    setFormData({
      name: location.name,
      address: location.address,
      city: location.city,
      state: location.state,
      zipCode: location.zipCode,
      phone: location.phone,
      email: location.email,
      manager: location.manager,
    });
    setEditingLocation(location);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (locationId: string) => {
    const locationStores = stores.filter(store => store.locationId === locationId);
    if (locationStores.length > 0) {
      toast({
        title: "Cannot Delete Location",
        description: "Please remove all stores from this location first.",
        variant: "destructive",
      });
      return;
    }

    setLocations(locations.filter(location => location.id !== locationId));
    toast({
      title: "Location Deleted",
      description: "Location has been removed successfully.",
    });
    onLocationUpdate();
  };

  const toggleStatus = (locationId: string) => {
    const updatedLocations = locations.map(location => 
      location.id === locationId 
        ? { ...location, status: location.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : location
    );
    setLocations(updatedLocations);
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Location Management</span>
            </CardTitle>
            <CardDescription>Manage your business locations and their details</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingLocation ? 'Edit Location' : 'Add New Location'}
                </DialogTitle>
                <DialogDescription>
                  {editingLocation ? 'Update location details' : 'Add a new business location to your network'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Location Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter location name"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter street address"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Enter state"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="manager">Manager</Label>
                    <Input
                      id="manager"
                      value={formData.manager}
                      onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                      placeholder="Enter manager name"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleSubmit} className="flex-1">
                    {editingLocation ? 'Update Location' : 'Add Location'}
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
        <div className="space-y-6">
          {locations.map((location) => (
            <Card key={location.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={location.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">
                            {stores.filter(s => s.locationId === location.id).length} stores
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start space-x-2 text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5" />
                        <div>
                          <p>{location.address}</p>
                          <p>{location.city}, {location.state} {location.zipCode}</p>
                        </div>
                      </div>
                      
                      {location.phone && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{location.phone}</span>
                        </div>
                      )}
                      
                      {location.manager && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Building className="h-4 w-4" />
                          <span>Manager: {location.manager}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <StoreIcon className="h-4 w-4" />
                        <span>Added: {location.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(location.id)}
                      className={location.status === 'active' ? 'hover:bg-yellow-50' : 'hover:bg-green-50'}
                    >
                      {location.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(location)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="hover:bg-red-50 hover:border-red-200"
                      onClick={() => handleDelete(location.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {locations.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No locations yet</h3>
              <p className="text-gray-600 mb-6">Get started by adding your first business location.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Location
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationManager;
