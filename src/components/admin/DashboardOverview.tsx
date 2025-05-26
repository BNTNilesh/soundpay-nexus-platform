import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Building2, Package, TrendingUp, ShoppingCart, DollarSign, Activity, Clock, RefreshCw, Settings, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AddUserForm from './AddUserForm';
import MerchantRegistrationForm from './MerchantRegistrationForm';
import POSSyncManager from './POSSyncManager';
import ProductManager from './ProductManager';

const DashboardOverview = () => {
  const { toast } = useToast();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isMerchantFormOpen, setIsMerchantFormOpen] = useState(false);
  const [isPOSSyncOpen, setIsPOSSyncOpen] = useState(false);
  const [isProductManagerOpen, setIsProductManagerOpen] = useState(false);
  
  // Updated merchant data for Ammo and Smoke industry
  const [merchants, setMerchants] = useState([
    { id: 1, name: "Tactical Defense Supply", email: "contact@tacticaldefense.com", status: "Active", revenue: "$78,450", products: 285, locations: 4 },
    { id: 2, name: "Liberty Gun & Smoke", email: "info@libertygunsmoke.com", status: "Active", revenue: "$65,280", products: 198, locations: 3 },
    { id: 3, name: "Eagle Point Firearms", email: "hello@eaglepointfirearms.com", status: "Pending", revenue: "$34,650", products: 127, locations: 2 },
    { id: 4, name: "Patriot Arms & Tobacco", email: "admin@patriotarms.com", status: "Active", revenue: "$92,130", products: 347, locations: 6 },
    { id: 5, name: "Smoke & Steel Co.", email: "sales@smokesteel.com", status: "Inactive", revenue: "$18,920", products: 89, locations: 1 },
  ]);

  const stats = [
    { title: "Total Users", value: "247", change: "+12%", icon: Users, color: "from-blue-500 to-indigo-500" },
    { title: "Active Merchants", value: merchants.filter(m => m.status === "Active").length.toString(), change: "+8%", icon: Building2, color: "from-green-500 to-emerald-500" },
    { title: "Products", value: merchants.reduce((acc, m) => acc + m.products, 0).toString(), change: "+24%", icon: Package, color: "from-purple-500 to-pink-500" },
    { title: "Revenue", value: "$289K", change: "+18%", icon: DollarSign, color: "from-orange-500 to-red-500" },
  ];

  // Updated activity for Ammo and Smoke industry
  const recentActivity = [
    { action: "New FFL dealer registered", user: "Tactical Defense Supply", time: "2 minutes ago", type: "registration" },
    { action: "Ammunition inventory updated", user: "Liberty Gun & Smoke", time: "15 minutes ago", type: "update" },
    { action: "ATF compliance check completed", user: "Eagle Point Firearms", time: "1 hour ago", type: "permission" },
    { action: "POS sync with ATF database", user: "SoundPayment POS", time: "2 hours ago", type: "sync" },
  ];

  const handleAddUser = () => {
    setIsAddUserOpen(true);
  };

  const handleNewMerchant = () => {
    setIsMerchantFormOpen(true);
  };

  const handleSyncPOS = () => {
    setIsPOSSyncOpen(true);
  };

  const handleViewReports = () => {
    toast({
      title: "Reports",
      description: "Analytics and reports dashboard would open here.",
    });
  };

  const handleManageProducts = () => {
    setIsProductManagerOpen(true);
  };

  const handleSystemSettings = () => {
    toast({
      title: "System Settings",
      description: "System configuration panel would open here.",
    });
  };

  const handleUserAdded = (user: any) => {
    // In a real app, this would update the user list
    console.log('New user added:', user);
  };

  const handleMerchantAdded = (merchant: any) => {
    setMerchants([...merchants, merchant]);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration': return <Users className="h-4 w-4 text-green-600" />;
      case 'update': return <Package className="h-4 w-4 text-blue-600" />;
      case 'permission': return <Activity className="h-4 w-4 text-purple-600" />;
      case 'sync': return <TrendingUp className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'Pending': return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case 'Inactive': return <Badge className="bg-red-100 text-red-700">Inactive</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                    {stat.change}
                  </Badge>
                </div>
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-full`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Merchants List */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <span>FFL Dealers Overview</span>
          </CardTitle>
          <CardDescription>Manage and monitor all registered firearms dealers and tobacco shops</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Locations</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {merchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{merchant.name}</p>
                      <p className="text-sm text-gray-600">{merchant.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(merchant.status)}</TableCell>
                  <TableCell className="font-medium">{merchant.revenue}</TableCell>
                  <TableCell>{merchant.products}</TableCell>
                  <TableCell>{merchant.locations}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest system activities and compliance updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.user}</p>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>System Health</span>
            </CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Database Performance</span>
                <span className="text-gray-600">94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">API Response Time</span>
                <span className="text-gray-600">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">POS Sync Status</span>
                <span className="text-gray-600">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">ATF Compliance</span>
                <span className="text-gray-600">99%</span>
              </div>
              <Progress value={99} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={handleAddUser}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="p-3 bg-blue-500 rounded-full mb-2 group-hover:scale-110 transition-transform duration-200">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Add User</span>
            </button>
            
            <button
              onClick={handleNewMerchant}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="p-3 bg-green-500 rounded-full mb-2 group-hover:scale-110 transition-transform duration-200">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">New Dealer</span>
            </button>
            
            <button
              onClick={handleSyncPOS}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="p-3 bg-purple-500 rounded-full mb-2 group-hover:scale-110 transition-transform duration-200">
                <RefreshCw className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Sync POS</span>
            </button>
            
            <button
              onClick={handleViewReports}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="p-3 bg-orange-500 rounded-full mb-2 group-hover:scale-110 transition-transform duration-200">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">View Reports</span>
            </button>
            
            <button
              onClick={handleManageProducts}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="p-3 bg-pink-500 rounded-full mb-2 group-hover:scale-110 transition-transform duration-200">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Manage Products</span>
            </button>
            
            <button
              onClick={handleSystemSettings}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-center group"
            >
              <div className="p-3 bg-indigo-500 rounded-full mb-2 group-hover:scale-110 transition-transform duration-200">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">System Settings</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddUserForm 
        isOpen={isAddUserOpen} 
        onClose={() => setIsAddUserOpen(false)}
        onUserAdded={handleUserAdded}
      />
      
      <MerchantRegistrationForm 
        isOpen={isMerchantFormOpen} 
        onClose={() => setIsMerchantFormOpen(false)}
        onMerchantAdded={handleMerchantAdded}
      />
      
      <POSSyncManager 
        isOpen={isPOSSyncOpen} 
        onClose={() => setIsPOSSyncOpen(false)}
      />
      
      <ProductManager 
        isOpen={isProductManagerOpen} 
        onClose={() => setIsProductManagerOpen(false)}
      />
    </div>
  );
};

export default DashboardOverview;
