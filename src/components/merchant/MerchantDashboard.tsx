
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Package, MapPin, BarChart3, LogOut, Store, Plus } from 'lucide-react';
import MerchantInventory from './MerchantInventory';
import MerchantLocations from './MerchantLocations';
import MerchantStores from './MerchantStores';
import MerchantAnalytics from './MerchantAnalytics';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer' | 'merchant';
  name: string;
}

interface MerchantDashboardProps {
  user: User;
  onLogout: () => void;
}

const MerchantDashboard = ({ user, onLogout }: MerchantDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Merchant Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your business operations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  Merchant
                </Badge>
              </div>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm p-1 rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="locations" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <MapPin className="h-4 w-4" />
              <span>Locations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="stores" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Store className="h-4 w-4" />
              <span>Stores</span>
            </TabsTrigger>
            <TabsTrigger 
              value="inventory" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <MerchantAnalytics />
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <MerchantLocations />
          </TabsContent>

          <TabsContent value="stores" className="space-y-6">
            <MerchantStores />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <MerchantInventory />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <MerchantAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MerchantDashboard;
