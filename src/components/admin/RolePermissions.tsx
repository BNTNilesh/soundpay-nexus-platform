
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Package, Settings, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'inventory' | 'settings' | 'reports';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
}

interface RolePermissionsProps {
  userRole: string;
}

const RolePermissions = ({ userRole }: RolePermissionsProps) => {
  const { toast } = useToast();

  const permissions: Permission[] = [
    // Users permissions
    { id: 'users.view', name: 'View Users', description: 'View user list and profiles', category: 'users' },
    { id: 'users.create', name: 'Create Users', description: 'Create new user accounts', category: 'users' },
    { id: 'users.edit', name: 'Edit Users', description: 'Modify user information and roles', category: 'users' },
    { id: 'users.delete', name: 'Delete Users', description: 'Remove users from the system', category: 'users' },
    
    // Inventory permissions
    { id: 'inventory.view', name: 'View Inventory', description: 'View products, stores, and locations', category: 'inventory' },
    { id: 'inventory.create', name: 'Create Inventory', description: 'Add new products, stores, and locations', category: 'inventory' },
    { id: 'inventory.edit', name: 'Edit Inventory', description: 'Modify inventory items', category: 'inventory' },
    { id: 'inventory.delete', name: 'Delete Inventory', description: 'Remove inventory items', category: 'inventory' },
    
    // Settings permissions
    { id: 'settings.view', name: 'View Settings', description: 'View system configuration', category: 'settings' },
    { id: 'settings.edit', name: 'Edit Settings', description: 'Modify system settings', category: 'settings' },
    
    // Reports permissions
    { id: 'reports.view', name: 'View Reports', description: 'Access analytics and reports', category: 'reports' },
    { id: 'reports.export', name: 'Export Reports', description: 'Export data and generate reports', category: 'reports' },
  ];

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: permissions.map(p => p.id),
      userCount: 3,
      color: 'bg-red-100 text-red-700 border-red-200',
    },
    {
      id: 'editor',
      name: 'Editor',
      description: 'Can manage inventory and view users',
      permissions: ['users.view', 'inventory.view', 'inventory.create', 'inventory.edit', 'reports.view'],
      userCount: 12,
      color: 'bg-green-100 text-green-700 border-green-200',
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to inventory and reports',
      permissions: ['inventory.view', 'reports.view'],
      userCount: 25,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      id: 'merchant',
      name: 'Merchant',
      description: 'Manage own inventory and products',
      permissions: ['inventory.view', 'inventory.create', 'inventory.edit', 'reports.view'],
      userCount: 89,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
    },
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'users': return <Users className="h-4 w-4" />;
      case 'inventory': return <Package className="h-4 w-4" />;
      case 'settings': return <Settings className="h-4 w-4" />;
      case 'reports': return <Eye className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'users': return 'from-blue-500 to-indigo-500';
      case 'inventory': return 'from-green-500 to-emerald-500';
      case 'settings': return 'from-purple-500 to-pink-500';
      case 'reports': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const updateRolePermissions = (roleId: string, permissionId: string, enabled: boolean) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const newPermissions = enabled 
          ? [...role.permissions, permissionId]
          : role.permissions.filter(p => p !== permissionId);
        return { ...role, permissions: newPermissions };
      }
      return role;
    }));

    toast({
      title: "Permissions Updated",
      description: `Role permissions have been ${enabled ? 'granted' : 'revoked'}.`,
    });
  };

  const canEditRoles = userRole === 'admin';

  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Role & Permission Management</span>
          </CardTitle>
          <CardDescription>Configure roles and their associated permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="roles">Roles Overview</TabsTrigger>
              <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roles.map((role) => (
                  <Card key={role.id} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <Badge className={role.color}>{role.name}</Badge>
                        <span className="text-sm text-gray-500">{role.userCount} users</span>
                      </div>
                      <CardDescription className="text-sm">{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Permissions:</div>
                        <div className="text-2xl font-bold text-gray-900">{role.permissions.length}</div>
                        <div className="text-xs text-gray-500">
                          out of {permissions.length} total
                        </div>
                        {canEditRoles && (
                          <Button variant="outline" size="sm" className="w-full mt-4">
                            <Edit className="h-3 w-3 mr-2" />
                            Edit Role
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              <div className="grid gap-6">
                {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                  <Card key={category} className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <div className={`p-2 bg-gradient-to-r ${getCategoryColor(category)} rounded-lg`}>
                          {getCategoryIcon(category)}
                          <span className="sr-only">{category}</span>
                        </div>
                        <span className="capitalize">{category} Permissions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-medium text-gray-700">Permission</th>
                              {roles.map((role) => (
                                <th key={role.id} className="text-center py-3 px-4 font-medium text-gray-700 min-w-24">
                                  <Badge className={role.color} variant="outline">
                                    {role.name}
                                  </Badge>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {categoryPermissions.map((permission) => (
                              <tr key={permission.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4">
                                  <div>
                                    <p className="font-medium text-gray-900">{permission.name}</p>
                                    <p className="text-sm text-gray-600">{permission.description}</p>
                                  </div>
                                </td>
                                {roles.map((role) => (
                                  <td key={role.id} className="py-4 px-4 text-center">
                                    <Switch
                                      checked={role.permissions.includes(permission.id)}
                                      onCheckedChange={(checked) => 
                                        canEditRoles && updateRolePermissions(role.id, permission.id, checked)
                                      }
                                      disabled={!canEditRoles}
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RolePermissions;
