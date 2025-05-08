import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingType } from '../../../models/store';
import { AuthUser } from '../../../models/auth';
import UserHeadProfile from '../../../components/user/UserHeadProfile';
import UserProfileForm from '../../../components/user/UserProfileForm';
import PasswordChangeForm from '../../../components/user/PasswordChangeForm';
import { RootState } from '../../../store';
import { UserActivity } from '../../../components/user/UserActivity';
import { AccessRightsPanel } from '../../../components/user/AccessRightPanel';

const UserProfilePage = () => {

  const { status, error } = useSelector(
    (state: RootState) => state.user.currentProfile
  );
  const [activeTab, setActiveTab] = useState('UserProfileForm');

  const user = useSelector<RootState, AuthUser | null>((state) => state.session.currentUser.entities);


  if (status === LoadingType.PENDING) {
    return <div className="text-center p-8">Loading user profile...</div>;
  }

  // if (error) {
  //   return <div className="text-red-500 p-8">Error: {error}</div>;
  // }

  if (!user) {
    return <div className="p-8">User not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <UserHeadProfile user={user} />

      {/* Navigation Tabs */}
      <nav className="flex overflow-hidden my-6 bg-white shadow-md rounded">
        <button
          onClick={() => setActiveTab('UserProfileForm')}
          className={`p-4  ${activeTab === 'UserProfileForm'
            ? '  text-white bg-purple-600  '
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Infos et mis à Jours
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`p-4 ${activeTab === 'activity'
            ? '  text-white bg-purple-600  '
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Activity Log
        </button>
        <button
          onClick={() => setActiveTab('access')}
          className={`p-4 ${activeTab === 'access'
            ? '  text-white bg-purple-600  '
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Access Rights
        </button>
      </nav>

      {/* Tab Content */}
      {activeTab === 'UserProfileForm' && <div className=' grid grid-cols-2 gap-1 my-6'>
        <UserProfileForm />
        <PasswordChangeForm />
      </div>}{activeTab === 'activity' && <UserActivity auditLogs={user.auditLogs} />}
      {activeTab === 'access' && <AccessRightsPanel accessRights={user.accessRights} />}


    </div>
  );
};

export default UserProfilePage;