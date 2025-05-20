import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingType } from '../../../models/store';
import { AuthUser } from '../../../models/auth';
import UserHeadProfile from '../../../components/user/UserHeadProfile';
import UserProfileForm from '../../../components/user/UserProfileForm';
import PasswordChangeForm from '../../../components/user/PasswordChangeForm';
import { RootState } from '../../../store';
import { UserActivity } from '../../../components/user/UserActivity';
import { AccessRightProfile } from '../../../components/user/AccessRigntProfile';

const UserProfilePage = () => {

  const { status, error } = useSelector(
    (state: RootState) => state.user.currentProfile
  );
  const [activeTab, setActiveTab] = useState('Infos et mis à Jours');

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
      <nav className="flex overflow-x-auto my-4 sm:my-6 bg-white shadow-md rounded-lg 
               scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="flex flex-nowrap min-w-max">
          {['Infos et mis à Jours', 'activity', 'access'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium transition-colors
                   duration-200 whitespace-nowrap ${activeTab === tab
                  ? 'text-white bg-purple-600 border-b-4 border-purple-400'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {tab
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      {activeTab === 'Infos et mis à Jours' && <div className=' grid lg:grid-cols-2 gap-1 my-6'>
        <UserProfileForm />
        <PasswordChangeForm />
      </div>}{activeTab === 'activity' && <UserActivity auditLogs={user.auditLogs} />}
      {activeTab === 'access' && <AccessRightProfile accessRights={user.accessRights} />}


    </div>
  );
};

export default UserProfilePage;