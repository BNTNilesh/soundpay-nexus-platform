
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface POSSyncManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const POSSyncManager = ({ isOpen, onClose }: POSSyncManagerProps) => {
  const { toast } = useToast();
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSync, setIsSync] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [syncLogs, setSyncLogs] = useState<string[]>([]);

  const startSync = () => {
    setIsSync(true);
    setSyncStatus('running');
    setSyncProgress(0);
    setSyncLogs([]);
    
    // Simulate sync process
    const steps = [
      'Connecting to SoundPayment POS...',
      'Fetching merchant data...',
      'Synchronizing inventory...',
      'Updating product information...',
      'Syncing sales data...',
      'Finalizing synchronization...',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSyncLogs(prev => [...prev, steps[currentStep]]);
        setSyncProgress((currentStep + 1) * (100 / steps.length));
        currentStep++;
      } else {
        clearInterval(interval);
        setSyncStatus('completed');
        setIsSync(false);
        toast({
          title: "Sync Completed",
          description: "Successfully synchronized with SoundPayment POS system.",
        });
      }
    }, 1000);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 text-purple-600" />
            <span>POS Synchronization</span>
          </DialogTitle>
          <DialogDescription>
            Synchronize data with SoundPayment POS system.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Sync Status:</span>
            {getSyncStatusBadge()}
          </div>
          
          {isSync && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(syncProgress)}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
          )}
          
          <div className="space-y-2">
            <span className="text-sm font-medium">Sync Log:</span>
            <div className="bg-gray-50 rounded-md p-3 max-h-32 overflow-y-auto">
              {syncLogs.length === 0 ? (
                <p className="text-sm text-gray-500">No sync activity yet.</p>
              ) : (
                syncLogs.map((log, index) => (
                  <div key={index} className="text-sm text-gray-700 mb-1 flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={startSync} 
              disabled={isSync}
              className="flex-1"
            >
              {isSync ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Start Sync
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default POSSyncManager;
