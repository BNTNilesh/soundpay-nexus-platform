
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle, AlertCircle, Clock, Database, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Product } from './InventoryManager';

interface POSSyncDashboardProps {
  products: Product[];
  onSyncComplete: () => void;
}

const POSSyncDashboard = ({ products, onSyncComplete }: POSSyncDashboardProps) => {
  const { toast } = useToast();
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSync, setIsSync] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Never');
  const [cronJobStatus, setCronJobStatus] = useState<'active' | 'inactive'>('active');

  useEffect(() => {
    // Simulate cron job running every 30 seconds
    const cronInterval = setInterval(() => {
      if (cronJobStatus === 'active' && !isSync) {
        handleAutomaticSync();
      }
    }, 30000);

    return () => clearInterval(cronInterval);
  }, [cronJobStatus, isSync]);

  const startManualSync = () => {
    setIsSync(true);
    setSyncStatus('running');
    setSyncProgress(0);
    setSyncLogs(['Manual sync initiated by user']);
    performSync();
  };

  const handleAutomaticSync = () => {
    if (isSync) return;
    
    setIsSync(true);
    setSyncStatus('running');
    setSyncProgress(0);
    setSyncLogs(['Automatic sync started by cron job']);
    performSync(true);
  };

  const performSync = (isAutomatic = false) => {
    const steps = [
      'Connecting to SoundPayment POS API...',
      'Authenticating with POS system...',
      'Fetching product updates...',
      'Synchronizing inventory levels...',
      'Updating product prices...',
      'Syncing sales data...',
      'Validating data integrity...',
      'Finalizing synchronization...',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSyncLogs(prev => [...prev, `✓ ${steps[currentStep]}`]);
        setSyncProgress((currentStep + 1) * (100 / steps.length));
        currentStep++;
      } else {
        clearInterval(interval);
        setSyncStatus('completed');
        setIsSync(false);
        setLastSyncTime(new Date().toLocaleString());
        
        // Simulate random inventory updates
        const syncMessage = isAutomatic 
          ? "Automatic sync completed successfully"
          : "Manual sync completed successfully";
        
        setSyncLogs(prev => [...prev, `✓ ${syncMessage}`]);
        
        toast({
          title: isAutomatic ? "Auto Sync Completed" : "Manual Sync Completed",
          description: `Successfully synchronized ${products.length} products with SoundPayment POS.`,
        });
        
        onSyncComplete();
      }
    }, 800);
  };

  const toggleCronJob = () => {
    const newStatus = cronJobStatus === 'active' ? 'inactive' : 'active';
    setCronJobStatus(newStatus);
    
    toast({
      title: newStatus === 'active' ? "Cron Job Activated" : "Cron Job Deactivated",
      description: newStatus === 'active' 
        ? "Automatic sync will run every 30 seconds" 
        : "Automatic sync has been disabled",
    });
  };

  const getSyncStatusBadge = () => {
    switch (syncStatus) {
      case 'running':
        return <Badge className="bg-blue-100 text-blue-700">Syncing...</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-700">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Ready</Badge>;
    }
  };

  const getCronStatusBadge = () => {
    return cronJobStatus === 'active' 
      ? <Badge className="bg-green-100 text-green-700">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Sync Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-purple-600" />
              <span>Manual Sync Control</span>
            </CardTitle>
            <CardDescription>
              Manually trigger synchronization with SoundPayment POS
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sync Status:</span>
              {getSyncStatusBadge()}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Sync:</span>
              <span className="text-sm text-gray-600">{lastSyncTime}</span>
            </div>
            
            <Button 
              onClick={startManualSync} 
              disabled={isSync}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isSync ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Start Manual Sync
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span>Automated Sync (Cron Job)</span>
            </CardTitle>
            <CardDescription>
              Configure automatic synchronization schedule
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cron Job Status:</span>
              {getCronStatusBadge()}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Frequency:</span>
              <span className="text-sm text-gray-600">Every 30 seconds</span>
            </div>
            
            <Button 
              onClick={toggleCronJob} 
              variant={cronJobStatus === 'active' ? 'destructive' : 'default'}
              className="w-full"
            >
              {cronJobStatus === 'active' ? (
                <>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Disable Cron Job
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Enable Cron Job
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sync Progress */}
      {isSync && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-blue-600" />
              <span>Sync Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(syncProgress)}%</span>
              </div>
              <Progress value={syncProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sync Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-blue-600">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-3xl font-bold text-green-600">
                  {products.filter(p => p.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {products.filter(p => p.quantity <= p.minStock && p.quantity > 0).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">
                  {products.filter(p => p.status === 'out_of_stock').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sync Log */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span>Sync Activity Log</span>
          </CardTitle>
          <CardDescription>
            Real-time synchronization activity and status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-md p-4 max-h-64 overflow-y-auto">
            {syncLogs.length === 0 ? (
              <p className="text-sm text-gray-500">No sync activity yet. Start a manual sync or enable cron job.</p>
            ) : (
              <div className="space-y-2">
                {syncLogs.map((log, index) => (
                  <div key={index} className="text-sm text-gray-700 flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="font-mono text-xs text-gray-500">
                      {new Date().toLocaleTimeString()}
                    </span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default POSSyncDashboard;
