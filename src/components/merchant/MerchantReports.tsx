
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Download, Calendar, DollarSign, Package, Users } from 'lucide-react';

const MerchantReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedStore, setSelectedStore] = useState('all');

  // Sample sales data
  const salesData = [
    { date: '2024-01-15', revenue: 4250, transactions: 28, firearms: 2850, tobacco: 980, ammunition: 420 },
    { date: '2024-01-16', revenue: 3890, transactions: 24, firearms: 2200, tobacco: 1240, ammunition: 450 },
    { date: '2024-01-17', revenue: 5120, transactions: 32, firearms: 3400, tobacco: 1120, ammunition: 600 },
    { date: '2024-01-18', revenue: 4680, transactions: 29, firearms: 2980, tobacco: 1200, ammunition: 500 },
    { date: '2024-01-19', revenue: 6200, transactions: 38, firearms: 4100, tobacco: 1350, ammunition: 750 },
    { date: '2024-01-20', revenue: 5850, transactions: 35, firearms: 3850, tobacco: 1400, ammunition: 600 },
    { date: '2024-01-21', revenue: 4950, transactions: 31, firearms: 3200, tobacco: 1250, ammunition: 500 },
  ];

  // Category breakdown
  const categoryData = [
    { name: 'Firearms', value: 45, color: '#8884d8' },
    { name: 'Ammunition', value: 30, color: '#82ca9d' },
    { name: 'Tobacco', value: 20, color: '#ffc658' },
    { name: 'Accessories', value: 5, color: '#ff7c7c' },
  ];

  // Top products
  const topProducts = [
    { name: 'Glock 19 Gen5', category: 'Handguns', sold: 8, revenue: 4399.92 },
    { name: 'Federal Premium 9mm', category: 'Ammunition', sold: 45, revenue: 1124.55 },
    { name: 'Cohiba Robusto Cigars', category: 'Cigars', sold: 12, revenue: 1079.88 },
    { name: 'AR-15 Upper Receiver', category: 'Parts', sold: 6, revenue: 1799.94 },
    { name: 'Winchester .308 Ammo', category: 'Ammunition', sold: 25, revenue: 824.75 },
  ];

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalTransactions = salesData.reduce((sum, day) => sum + day.transactions, 0);
  const avgOrderValue = totalRevenue / totalTransactions;

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Reports</h2>
          <p className="text-gray-600">Analyze your business performance and trends</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              <SelectItem value="firearms">Firearms Center</SelectItem>
              <SelectItem value="tobacco">Tobacco Lounge</SelectItem>
              <SelectItem value="ammo">Ammunition Store</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+12.5% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+8.2% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">${avgOrderValue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              <span className="text-sm text-red-600">-3.1% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-gray-900">489</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+15 new this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Daily revenue over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing products in the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Units Sold</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>{product.sold}</TableCell>
                  <TableCell>${product.revenue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantReports;
