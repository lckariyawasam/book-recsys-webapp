'use client';

import { FloatingLabelInput } from "@/app/_components/users/NameInput/FloatingLabelInput";
import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { notifications } from '@mantine/notifications';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();

  // Form states
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Add useEffect to update name when session loads
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  // Update name handler
  const handleNameUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/update-name', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: session?.user?.id,
          name 
        }),
      });

      if (!response.ok) throw new Error('Failed to update name');

      await updateSession();
      notifications.show({
        title: 'Success',
        message: 'Name updated successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update name',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update password handler
  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword) {
      notifications.show({
        title: 'Error',
        message: 'Please fill in both password fields',
        color: 'red',
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/user/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: session?.user?.id,
          oldPassword, 
          newPassword 
        }),
      });

      if (!response.ok) throw new Error('Failed to update password');

      setOldPassword('');
      setNewPassword('');
      notifications.show({
        title: 'Success',
        message: 'Password updated successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update password. Please check your old password.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/user/delete-account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session?.user?.id }),
      });

      if (!response.ok) throw new Error('Failed to delete account');

      await signOut({ callbackUrl: '/' });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete account',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-3xl font-semibold text-gray-600">
        Account Settings
      </div>
      <div className="border-2 p-10 rounded-md">
        <div className="flex flex-col space-y-5">
          {/* profile name change */}
          <div className="flex flex-col space-y-5 border-b-2 pb-5">
            <div className="text-2xl font-semibold text-gray-500">
              Account Name
            </div>
            <div className="flex space-x-5 items-end">
              <FloatingLabelInput
                label="Name"
                placeholder="Enter Your Name"
                Invalue={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Button 
                size="compact-md" 
                color="yellow"
                onClick={handleNameUpdate}
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </div>

          {/* password change */}
          <div className="flex flex-col space-y-5 border-b-2 pb-5">
            <div className="text-2xl font-semibold text-gray-500">Password</div>
            <div className="flex space-x-5 items-end">
              <FloatingLabelInput
                label="Old Password"
                placeholder="Enter Your Old Password"
                Invalue={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <FloatingLabelInput
                label="New Password"
                placeholder="Enter Your New Password"
                Invalue={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Button 
                size="compact-md" 
                color="yellow"
                onClick={handlePasswordUpdate}
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="flex flex-col space-y-5">
            <div className="text-2xl font-semibold text-gray-500">
              Delete Account
            </div>
            <div className="text-red-500">
              Warning: This action cannot be undone.
            </div>
            <div className="flex space-x-5 items-end">
              <Button 
                size="compact-md" 
                color="red"
                onClick={handleDeleteAccount}
                loading={isLoading}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
