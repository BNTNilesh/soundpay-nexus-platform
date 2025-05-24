
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Database, Shield, Bell, RefreshCw, Globe, Server, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface SystemSettingsProps {
  userRole: string;
}

const SystemSettings = ({ userRole }: SystemSettingsProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    general: {
      siteName: 'MerchantHub',
      siteUrl: 'https://merchanthub.com',
      supportEmail: 'support@merchanthub.com',
      maintenanceMode: false,
    },
    security: {
      twoFactorRequired: false,
      passwordComplexity: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
    },
    pos: {
      syncInterval: 15,
      autoSync: true,
      soundPaymentUrl: 'https://api.soundpayment.com',
      lastSync: '2024-01-15 14:30:00',
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      systemAlerts: true,
      merchantAlerts: true,
    },
  });

  const canEditSettings = userRole === 'admin';

  const updateSetting = (category: keyof typeof settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  const handleSyncNow = () => {
    toast({
      title: "Sync Started",
      description: "Initiating manual sync with SoundPayment POS...",
    });
    // Simulate sync
    setTimeout(() => {
      updateSetting('pos', 'lastSync', new Date().toLocaleString());
      toast({
        title: "Sync Complete",
        description: "Successfully synchronized with SoundPayment POS.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-600" />
            <span>System Settings</span>
          </CardTitle>
          <CardDescription>Configure system-wide settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="pos" className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>POS Sync</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">General Configuration</CardTitle>
                  <CardDescription>Basic system settings and information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={settings.general.siteName}
                        onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                        disabled={!canEditSettings}
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteUrl">Site URL</Label>
                      <Input
                        id="siteUrl"
                        value={settings.general.siteUrl}
                        onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
                        disabled={!canEditSettings}
                      />
                    </div>
                    <div>
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={settings.general.supportEmail}
                        onChange={(e) => updateSetting('general', 'supportEmail', e.target.value)}
                        disabled={!canEditSettings}
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        id="maintenanceMode"
                        checked={settings.general.maintenanceMode}
                        onCheckedChange={(checked) => updateSetting('general', 'maintenanceMode', checked)}
                        disabled={!canEditSettings}
                      />
                      <Label htmlFor="maintenanceMode" className="flex items-center space-x-2">
                        <span>Maintenance Mode</span>
                        {settings.general.maintenanceMode && (
                          <Badge variant="destructive">Active</Badge>
                        )}
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Security Settings</CardTitle>
                  <CardDescription>Configure authentication and security policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="twoFactorRequired"
                          checked={settings.security.twoFactorRequired}
                          onCheckedChange={(checked) => updateSetting('security', 'twoFactorRequired', checked)}
                          disabled={!canEditSettings}
                        />
                        <Label htmlFor="twoFactorRequired">Require Two-Factor Authentication</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="passwordComplexity"
                          checked={settings.security.passwordComplexity}
                          onCheckedChange={(checked) => updateSetting('security', 'passwordComplexity', checked)}
                          disabled={!canEditSettings}
                        />
                        <Label htmlFor="passwordComplexity">Enforce Password Complexity</Label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                          disabled={!canEditSettings}
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                        <Input
                          id="maxLoginAttempts"
                          type="number"
                          value={settings.security.maxLoginAttempts}
                          onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                          disabled={!canEditSettings}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SoundPayment POS Integration</CardTitle>
                  <CardDescription>Configure synchronization with POS system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="soundPaymentUrl">SoundPayment API URL</Label>
                        <Input
                          id="soundPaymentUrl"
                          value={settings.pos.soundPaymentUrl}
                          onChange={(e) => updateSetting('pos', 'soundPaymentUrl', e.target.value)}
                          disabled={!canEditSettings}
                        />
                      </div>
                      <div>
                        <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                        <Input
                          id="syncInterval"
                          type="number"
                          value={settings.pos.syncInterval}
                          onChange={(e) => updateSetting('pos', 'syncInterval', parseInt(e.target.value))}
                          disabled={!canEditSettings}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="autoSync"
                          checked={settings.pos.autoSync}
                          onCheckedChange={(checked) => updateSetting('pos', 'autoSync', checked)}
                          disabled={!canEditSettings}
                        />
                        <Label htmlFor="autoSync" className="flex items-center space-x-2">
                          <span>Enable Auto Sync</span>
                          {settings.pos.autoSync && (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          )}
                        </Label>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Last Sync:</span>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {settings.pos.lastSync}
                          </Badge>
                        </div>
                        <Button onClick={handleSyncNow} disabled={!canEditSettings} className="w-full">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sync Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notification Settings</CardTitle>
                  <CardDescription>Configure system and user notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="emailNotifications"
                          checked={settings.notifications.emailNotifications}
                          onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                          disabled={!canEditSettings}
                        />
                        <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="systemAlerts"
                          checked={settings.notifications.systemAlerts}
                          onCheckedChange={(checked) => updateSetting('notifications', 'systemAlerts', checked)}
                          disabled={!canEditSettings}
                        />
                        <Label htmlFor="systemAlerts">System Alert Emails</Label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="smsNotifications"
                          checked={settings.notifications.smsNotifications}
                          onCheckedChange={(checked) => updateSetting('notifications', 'smsNotifications', checked)}
                          disabled={!canEditSettings}
                        />
                        <Label htmlFor="smsNotifications">Enable SMS Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Switch
                          id="merchantAlerts"
                          checked={settings.notifications.merchantAlerts}
                          onCheckedChange={(checked) => updateSetting('notifications', 'merchantAlerts', checked)}
                          disabled={!canEditSettings}
                        />
                        <Label htmlFor="merchantAlerts">Merchant Alert Messages</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {canEditSettings && (
            <div className="flex justify-end pt-6">
              <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Save Settings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
