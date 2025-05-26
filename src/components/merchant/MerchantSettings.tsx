
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings, User, Bell, Shield, CreditCard, Store } from 'lucide-react';

const MerchantSettings = () => {
  const { toast } = useToast();
  
  const [businessSettings, setBusinessSettings] = useState({
    businessName: 'Downtown Firearms & Tobacco',
    taxId: 'EIN-XX-XXXXXXX',
    address: '1247 Liberty Avenue',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85001',
    phone: '(602) 555-0123',
    email: 'contact@gunsmoke.com',
    website: 'www.gunsmoke.com',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    inventoryAlerts: true,
    salesReports: true,
    systemUpdates: false,
    securityAlerts: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    ipWhitelist: '',
    apiAccess: true,
  });

  const [posSettings, setPosSettings] = useState({
    autoSync: true,
    syncInterval: 15,
    backupFrequency: 'daily',
    offlineMode: false,
  });

  const handleSaveBusinessInfo = () => {
    toast({
      title: "Business Information Updated",
      description: "Your business information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been updated successfully.",
    });
  };

  const handleSavePOS = () => {
    toast({
      title: "POS Settings Updated",
      description: "Your POS integration settings have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your account and business preferences</p>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business" className="flex items-center space-x-2">
            <Store className="h-4 w-4" />
            <span>Business</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="pos" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>POS Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessSettings.businessName}
                    onChange={(e) => setBusinessSettings({...businessSettings, businessName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="taxId">Tax ID / EIN</Label>
                  <Input
                    id="taxId"
                    value={businessSettings.taxId}
                    onChange={(e) => setBusinessSettings({...businessSettings, taxId: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={businessSettings.address}
                    onChange={(e) => setBusinessSettings({...businessSettings, address: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={businessSettings.city}
                    onChange={(e) => setBusinessSettings({...businessSettings, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={businessSettings.state}
                    onChange={(e) => setBusinessSettings({...businessSettings, state: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={businessSettings.zipCode}
                    onChange={(e) => setBusinessSettings({...businessSettings, zipCode: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={businessSettings.phone}
                    onChange={(e) => setBusinessSettings({...businessSettings, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessSettings.email}
                    onChange={(e) => setBusinessSettings({...businessSettings, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={businessSettings.website}
                    onChange={(e) => setBusinessSettings({...businessSettings, website: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={handleSaveBusinessInfo}>Save Business Information</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you want to receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-gray-600">Receive important notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailAlerts: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-gray-600">Get urgent notifications via text message</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsAlerts: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Inventory Alerts</Label>
                    <p className="text-sm text-gray-600">Notifications for low stock and inventory updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.inventoryAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, inventoryAlerts: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sales Reports</Label>
                    <p className="text-sm text-gray-600">Daily and weekly sales summary reports</p>
                  </div>
                  <Switch
                    checked={notificationSettings.salesReports}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, salesReports: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-gray-600">Information about new features and updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-gray-600">Important security and login notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                  />
                </div>
              </div>
              <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                    />
                    {securitySettings.twoFactorAuth && (
                      <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                    className="w-32"
                  />
                  <p className="text-sm text-gray-600">Automatically log out after period of inactivity</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                  <Input
                    id="ipWhitelist"
                    placeholder="192.168.1.1, 10.0.0.1"
                    value={securitySettings.ipWhitelist}
                    onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
                  />
                  <p className="text-sm text-gray-600">Restrict access to specific IP addresses (comma-separated)</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Access</Label>
                    <p className="text-sm text-gray-600">Allow third-party applications to access your data</p>
                  </div>
                  <Switch
                    checked={securitySettings.apiAccess}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, apiAccess: checked})}
                  />
                </div>
              </div>
              <Button onClick={handleSaveSecurity}>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>POS Integration</CardTitle>
              <CardDescription>Configure SoundPayment POS synchronization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Sync</Label>
                    <p className="text-sm text-gray-600">Automatically synchronize data with POS system</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={posSettings.autoSync}
                      onCheckedChange={(checked) => setPosSettings({...posSettings, autoSync: checked})}
                    />
                    {posSettings.autoSync && (
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                  <Input
                    id="syncInterval"
                    type="number"
                    value={posSettings.syncInterval}
                    onChange={(e) => setPosSettings({...posSettings, syncInterval: parseInt(e.target.value)})}
                    className="w-32"
                    disabled={!posSettings.autoSync}
                  />
                  <p className="text-sm text-gray-600">How often to sync with the POS system</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Offline Mode</Label>
                    <p className="text-sm text-gray-600">Continue operations when POS system is unavailable</p>
                  </div>
                  <Switch
                    checked={posSettings.offlineMode}
                    onCheckedChange={(checked) => setPosSettings({...posSettings, offlineMode: checked})}
                  />
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Connection Status</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-blue-800">Connected to SoundPayment POS</span>
                </div>
                <p className="text-sm text-blue-700">Last sync: January 21, 2024 at 2:30 PM</p>
              </div>
              <Button onClick={handleSavePOS}>Save POS Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MerchantSettings;
