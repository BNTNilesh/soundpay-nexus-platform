
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Plus, Edit, Trash2, Phone, Mail, Clock, Building } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Location {
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

const MerchantLocations = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    manager: '',
  });

  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Downtown Location',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '(555) 123-4567',
      email: 'downtown@example.com',
      manager: 'John Smith',
      status: 'active',
      storeCount: 3,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Mall Location',
      address: '456 Shopping Center',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      phone: '(555) 987-6543',
      email: 'mall@example.com',
      manager: 'Sarah Johnson',
      status: 'active',
      storeCount: 2,
      createdAt: '2024-01-05',
    },
    {
      id: '3',
      name: 'Airport Terminal',
      address: '789 Airport Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      phone: '(555) 456-7890',
      email: 'airport@example.com',
      manager: 'Mike Wilson',
      status: 'inactive',
      storeCount: 1,
      createdAt: '2024-01-10',
    },
  ]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddLocation = () => {
    if (!newLocation.name || !newLocation.address || !newLocation.city) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const location: Location = {
      id: Date.now().toString(),
      name: newLocation.name,
      address: newLocation.address,
      city: newLocation.city,
      state: newLocation.state,
      zipCode: newLocation.zipCode,
      phone: newLocation.phone,
      email: newLocation.email,
      manager: newLocation.manager,
      status: 'active',
      storeCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setLocations([...locations, location]);
    setNewLocation({ name: '', address: '', city: '', state: '', zipCode: '', phone: '', email: '', manager: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Location Added",
      description: `${location.name} has been added successfully.`,
    });
  };

  const handleDeleteLocation = (locationId: string) => {
    setLocations(locations.filter(location => location.id !== locationId));
    toast({
      title: "Location Deleted",
      description: "Location has been removed from your business.",
    });
  };

  const toggleLocationStatus = (locationId: string) => {
    setLocations(locations.map(location => {
      if (location.id === locationId) {
        const newStatus = location.status === 'active' ? 'inactive' : 'active';
        return { ...location, status: newStatus };
      }
      return location;
    }));
  };

  const activeLocations = locations.filter(l => l.status === 'active').length;
  const totalStores = locations.reduce((sum, l) => sum + l.storeCount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Locations</p>
                <p className="text-3xl font-bold text-gray-900">{locations.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Active Locations</p>
                <p className="text-3xl font-bold text-green-600">{activeLocations}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stores</p>
                <p className="text-3xl font-bold text-purple-600">{totalStores}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Building className="h-6 w-6 text-white" />
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
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Business Locations</span>
              </CardTitle>
              <CardDescription>Manage your business locations and their details</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Location</DialogTitle>
                  <DialogDescription>
                    Add a new business location to your network.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Location Name</Label>
                    <Input
                      id="name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      placeholder="Enter location name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Textarea
                      id="address"
                      value={newLocation.address}
                      onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                      placeholder="Enter street address"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={newLocation.city}
                        onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={newLocation.state}
                        onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                        placeholder="Enter state"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={newLocation.zipCode}
                        onChange={(e) => setNewLocation({ ...newLocation, zipCode: e.target.value })}
                        placeholder="Enter ZIP code"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newLocation.phone}
                        onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
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
                        value={newLocation.email}
                        onChange={(e) => setNewLocation({ ...newLocation, email: e.target.value })}
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manager">Manager</Label>
                      <Input
                        id="manager"
                        value={newLocation.manager}
                        onChange={(e) => setNewLocation({ ...newLocation, manager: e.target.value })}
                        placeholder="Enter manager name"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleAddLocation} className="flex-1">
                      Add Location
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
                          <Badge className={getStatusBadgeColor(location.status)}>
                            {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
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
                        
                        {location.email && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{location.email}</span>
                          </div>
                        )}
                        
                        {location.manager && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Building className="h-4 w-4" />
                            <span>Manager: {location.manager}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Building className="h-4 w-4" />
                          <span>{location.storeCount} stores</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Added {location.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleLocationStatus(location.id)}
                        className={location.status === 'active' ? 'hover:bg-yellow-50' : 'hover:bg-green-50'}
                      >
                        {location.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="p-2 hover:bg-red-50 hover:border-red-200"
                        onClick={() => handleDeleteLocation(location.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantLocations;
