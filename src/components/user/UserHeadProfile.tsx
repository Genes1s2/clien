import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthUser } from '../../models/auth';
import { getRandomColor } from '../../utils/RandomColor';
import { LoadingType } from '../../models/store';
import { RootState } from '../../store';

interface UserHeadProfiletProps {
  user: AuthUser;
}

const UserHeadProfile = ({ user }: UserHeadProfiletProps) => {

  const avatarBgColor = useMemo(() => getRandomColor(), []);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`h-16 w-16 rounded-full ${avatarBgColor} flex items-center justify-center`}>
              <span className="text-white text-2xl font-medium uppercase">
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="mt-1 text-gray-900">{user.role.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Account Created</label>
              <p className="mt-1 text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Last Updated</label>
              <p className="mt-1 text-gray-900">
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserHeadProfile;