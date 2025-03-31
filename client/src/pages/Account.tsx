import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Profile update schema
const profileSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  phone: z.string().optional()
});

// Password change schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Vui lòng nhập mật khẩu hiện tại' }),
  newPassword: z.string().min(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' }),
  confirmPassword: z.string().min(1, { message: 'Vui lòng xác nhận mật khẩu mới' })
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const Account: React.FC = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Fetch current user data
  const { data: user, isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ['/api/auth/me'],
    refetchOnWindowFocus: false,
    onError: () => {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  });

  // Set up profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || ''
    },
    values: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });

  // Set up password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      return apiRequest('PUT', '/api/auth/update-profile', data);
    },
    onSuccess: () => {
      toast({
        title: 'Hồ sơ đã được cập nhật',
        description: 'Thông tin của bạn đã được cập nhật thành công.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Cập nhật thất bại',
        description: error.message || 'Không thể cập nhật thông tin. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async (data: PasswordFormValues) => {
      return apiRequest('PUT', '/api/auth/change-password', data);
    },
    onSuccess: () => {
      toast({
        title: 'Mật khẩu đã được thay đổi',
        description: 'Mật khẩu của bạn đã được thay đổi thành công.'
      });
      passwordForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Thay đổi mật khẩu thất bại',
        description: error.message || 'Không thể thay đổi mật khẩu. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  });

  // Handle profile form submission
  const onProfileSubmit = async (data: ProfileFormValues) => {
    await updateProfileMutation.mutateAsync(data);
  };

  // Handle password form submission
  const onPasswordSubmit = async (data: PasswordFormValues) => {
    await changePasswordMutation.mutateAsync(data);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout');
      toast({
        title: 'Đã đăng xuất',
        description: 'Bạn đã đăng xuất thành công.'
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Đăng xuất thất bại',
        description: error.message || 'Không thể đăng xuất. Vui lòng thử lại sau.',
        variant: 'destructive'
      });
    }
  };

  if (isUserLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (userError || !user) {
    // Will redirect to login, but just in case
    return (
      <div className="container py-12">
        <Card>
          <CardHeader>
            <CardTitle>Không tìm thấy tài khoản</CardTitle>
            <CardDescription>
              Vui lòng đăng nhập để xem thông tin tài khoản của bạn.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/login')}>Đăng nhập</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <div className="sticky top-4 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Tài khoản</h2>
              <p className="text-muted-foreground">{user.username}</p>
            </div>
            <Separator />
            <div className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start" disabled>
                Thông tin tài khoản
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigate('/orders')}>
                Đơn hàng của tôi
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => navigate('/wishlist')}>
                Sản phẩm yêu thích
              </Button>
              <Button variant="ghost" className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </div>
          </div>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Hồ sơ cá nhân</TabsTrigger>
              <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hồ sơ cá nhân</CardTitle>
                  <CardDescription>
                    Quản lý thông tin hồ sơ của bạn
                  </CardDescription>
                </CardHeader>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Tên đăng nhập</Label>
                      <Input
                        id="username"
                        value={user.username}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">
                        Tên đăng nhập không thể thay đổi
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <Input
                        id="fullName"
                        placeholder="Nhập họ và tên của bạn"
                        {...profileForm.register('fullName')}
                      />
                      {profileForm.formState.errors.fullName && (
                        <p className="text-sm text-red-500">
                          {profileForm.formState.errors.fullName.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Nhập địa chỉ email của bạn"
                        {...profileForm.register('email')}
                      />
                      {profileForm.formState.errors.email && (
                        <p className="text-sm text-red-500">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        placeholder="Nhập số điện thoại của bạn"
                        {...profileForm.register('phone')}
                      />
                      {profileForm.formState.errors.phone && (
                        <p className="text-sm text-red-500">
                          {profileForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      disabled={updateProfileMutation.isPending || !profileForm.formState.isDirty}
                    >
                      {updateProfileMutation.isPending ? 'Đang cập nhật...' : 'Cập nhật hồ sơ'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="password" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Đổi mật khẩu</CardTitle>
                  <CardDescription>
                    Cập nhật mật khẩu của bạn để bảo mật tài khoản
                  </CardDescription>
                </CardHeader>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại"
                        {...passwordForm.register('currentPassword')}
                      />
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-sm text-red-500">
                          {passwordForm.formState.errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        {...passwordForm.register('newPassword')}
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-red-500">
                          {passwordForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        {...passwordForm.register('confirmPassword')}
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {passwordForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      disabled={changePasswordMutation.isPending}
                    >
                      {changePasswordMutation.isPending ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;