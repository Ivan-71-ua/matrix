import { useState, useEffect } from 'react';

import { updateUserData } from '@/api/user';
import UserPhoto from '@/assets/user-photo.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useGetUser } from '@/hooks/useGetUser';
import PageWrapper from '@/layouts/PageWrapper';
import { formatDate } from '@/lib/utils';
import { useAuthContext } from '@/providers/AuthProvider';

export default function ProfilePage() {
  const { user } = useGetUser();
  const { setUser } = useAuthContext();

  const [description, setDescription] = useState(user.description);
  const [isChanged, setIsChanged] = useState(false);

  const formattedDate = formatDate(+user.createdAt);

  useEffect(() => {
    setIsChanged(description !== user.description);
  }, [description, user.description]);

  const handleSave = () => {
    updateUserData({
      userId: user.uid,
      data: { ...user, description },
    });
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        description,
      };
    });

    setIsChanged(false);
  };

  const handleCancel = () => {
    setDescription(user.description);
    setIsChanged(false);
  };

  const role = user.role === 'teacher' ? 'Teacher' : 'Student';

  return (
    <PageWrapper pageTitle="Profile">
      <div className="flex justify-between gap-6">
        <div className="w-full">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">Personal details</h2>
            </CardHeader>
            <CardContent className="text-lg grid grid-cols-2 gap-2">
              <span>Name: </span>
              <span>{user.username}</span>
              <span>Email: </span> <span>{user.email}</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Bio</h2>
            </CardHeader>
            <CardContent className="flex flex-col items-end gap-4">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={!isChanged}>
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="destructive"
                  disabled={!isChanged}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="w-1/4 shrink-0 h-[350px]">
          <CardHeader>
            <img
              src={UserPhoto}
              alt="user photo"
              className="block w-[200px] h-[200px] mx-auto object-cover "
            />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-lg"> {role}</p>
              <p className="font-semibold mt-2">Registered on:</p>
              <p>{formattedDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
