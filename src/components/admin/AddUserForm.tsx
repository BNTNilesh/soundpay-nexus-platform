
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, User, Shield } from 'lucide-react';

interface AddUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (user: any) => void;
}

const AddUserForm = ({ isOpen, onClose, onUserAdded }: AddUserFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'viewer',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role as 'admin' | 'editor' | 'viewer',
      status: 'active' as const,
      lastLogin: 'Never',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onUserAdded(newUser);
    
    toast({
      title: "User Added Successfully",
      description: `${formData.name} has been added to the system.`,
    });

    setFormData({ name: '', email: '', role: 'viewer', password: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            <span>Add New User</span>
          </DialogTitle>
          <DialogDescription>
            Create a new user account with appropriate role and permissions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Full Name *</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Address *</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="role" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Role</span>
            </Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              Create User
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

export default AddUserForm;
