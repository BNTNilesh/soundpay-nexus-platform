
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

interface MerchantRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onMerchantAdded: (merchant: any) => void;
}

const MerchantRegistrationForm = ({ isOpen, onClose, onMerchantAdded }: MerchantRegistrationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    description: '',
    website: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.contactEmail || !formData.contactPhone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newMerchant = {
      id: Date.now(),
      name: formData.businessName,
      email: formData.contactEmail,
      status: 'Pending',
      revenue: '$0',
      products: 0,
      locations: 1,
      phone: formData.contactPhone,
      address: formData.address,
      website: formData.website,
      description: formData.description,
    };

    onMerchantAdded(newMerchant);
    
    toast({
      title: "Merchant Registration Submitted",
      description: `${formData.businessName} has been registered and is pending approval.`,
    });

    setFormData({
      businessName: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      description: '',
      website: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-green-600" />
            <span>Register New Merchant</span>
          </DialogTitle>
          <DialogDescription>
            Register a new merchant business to the platform.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="businessName" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Business Name *</span>
            </Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Enter business name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="contactEmail" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Contact Email *</span>
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="Enter contact email"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="contactPhone" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Contact Phone *</span>
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              placeholder="Enter contact phone"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="address" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Business Address</span>
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter business address"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://www.example.com"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the business"
              rows={3}
            />
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              Register Merchant
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MerchantRegistrationForm;
