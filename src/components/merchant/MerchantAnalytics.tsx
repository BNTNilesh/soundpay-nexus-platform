
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Store, Target, Calendar } from 'lucide-react';

const MerchantAnalytics = () => {
  const salesData = [
    { name: 'Mon', sales: 2400, orders: 24 },
    { name: 'Tue', sales: 1398, orders: 18 },
    { name: 'Wed', sales: 9800, orders: 42 },
    { name: 'Thu', sales: 3908, orders: 32 },
    { name: 'Fri', sales: 4800, orders: 38 },
    { name: 'Sat', sales: 3800, orders: 28 },
    { name: 'Sun', sales: 4300, orders: 35 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 40, color: '#3B82F6' },
    { name: 'Clothing', value: 30, color: '#10B981' },
    { name: 'Home & Garden', value: 20, color: '#F59E0B' },
    { name: 'Books', value: 10, color: '#EF4444' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 12000, profit: 3600 },
    { month: 'Feb', revenue: 15000, profit: 4500 },
    { month: 'Mar', revenue: 18000, profit: 5400 },
    { month: 'Apr', revenue: 16000, profit: 4800 },
    { month: 'May', revenue: 22000, profit: 6600 },
    { month: 'Jun', revenue: 25000, profit: 7500 },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', revenue: 4500, units: 45, growth: 12 },
    { name: 'Coffee Mug Set', revenue: 2300, units: 89, growth: -3 },
    { name: 'Bluetooth Speaker', revenue: 3200, units: 23, growth: 8 },
    { name: 'Phone Case', revenue: 1800, units: 67, growth: 15 },
    { name: 'Desk Lamp', revenue: 1200, units: 34, growth: 5 },
  ];

  const kpis = [
    {
      title: "Total Revenue",
      value: "$25,340",
      change: "+12.5%",
      positive: true,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Orders",
      value: "1,247",
      change: "+8.2%",
      positive: true,
      icon: Package,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Customers",
      value: "892",
      change: "+15.3%",
      positive: true,
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Avg. Order Value",
      value: "$89.45",
      change: "-2.1%",
      positive: false,
      icon: Target,
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                  <Badge 
                    variant="secondary" 
                    className={`mt-2 ${kpi.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {kpi.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {kpi.change}
                  </Badge>
                </div>
                <div className={`p-3 bg-gradient-to-r ${kpi.color} rounded-full`}>
                  <kpi.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              <span>Weekly Sales</span>
            </CardTitle>
            <CardDescription>Sales performance over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [name === 'sales' ? `$${value}` : value, name === 'sales' ? 'Sales' : 'Orders']} />
                <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span>Sales by Category</span>
            </CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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

      {/* Monthly Revenue Trend */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Monthly Revenue Trend</span>
          </CardTitle>
          <CardDescription>Revenue and profit trends over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} />
              <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-orange-600" />
              <span>Top Performing Products</span>
            </CardTitle>
            <CardDescription>Best sellers by revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>${product.revenue.toLocaleString()}</span>
                      <span>{product.units} units</span>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={product.growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                  >
                    {product.growth >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {Math.abs(product.growth)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-indigo-600" />
              <span>Performance Metrics</span>
            </CardTitle>
            <CardDescription>Key business performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Customer Satisfaction</span>
                <span className="text-gray-600">4.8/5.0</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Inventory Turnover</span>
                <span className="text-gray-600">8.2x</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Order Fulfillment Rate</span>
                <span className="text-gray-600">98.5%</span>
              </div>
              <Progress value={98.5} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Return Rate</span>
                <span className="text-gray-600">2.1%</span>
              </div>
              <Progress value={21} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Profit Margin</span>
                <span className="text-gray-600">28.5%</span>
              </div>
              <Progress value={28.5} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals and Targets */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span>Monthly Goals</span>
          </CardTitle>
          <CardDescription>Track your progress towards monthly targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">$30K</div>
              <div className="text-sm text-gray-600 mb-3">Revenue Goal</div>
              <Progress value={84.5} className="h-2 mb-2" />
              <div className="text-xs text-gray-500">$25.3K achieved (84.5%)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">1,500</div>
              <div className="text-sm text-gray-600 mb-3">Orders Goal</div>
              <Progress value={83.1} className="h-2 mb-2" />
              <div className="text-xs text-gray-500">1,247 achieved (83.1%)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">1,000</div>
              <div className="text-sm text-gray-600 mb-3">New Customers</div>
              <Progress value={89.2} className="h-2 mb-2" />
              <div className="text-xs text-gray-500">892 achieved (89.2%)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantAnalytics;
