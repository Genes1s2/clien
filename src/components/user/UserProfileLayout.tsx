import { useState } from 'react';
import { UserActivity } from './UserActivity';
import { AuthUser } from '../../models/auth';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, Edit, Trash, UserCheck, UserLock } from 'lucide-react';
import ConfirmationModal from '../modal/ConfirmationModal';
import RoleSelectModal from '../modal/RoleSelectModal';
import { activateUser, deleteUser, desactivateUser, fetchUserProfile, updateUserRole } from '../../store/user/actions';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';
import { AccessRightProfile } from './AccessRigntProfile';

interface UserProfileLayoutProps {
  user: AuthUser;
}

export const UserProfileLayout = ({ user }: UserProfileLayoutProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('activity');

  const handleDelete = async () => {
    try {
      if (user) {
        await dispatch(deleteUser(user.id)).unwrap();
      }
      setShowDeleteModal(false);
      navigate('/dashboard/admin/users');
      showSuccess('User and all related data deleted successfully');

    } catch (error: any) {

      showError('Failed to delete user');
      await dispatch(fetchUserProfile(user.id)).unwrap();
    }
  };

  const handleRoleUpdate = async (roleId: string) => {
    try {
      if (user) {
        await dispatch(updateUserRole({ userId: user.id, data: { roleId } })).unwrap();
        await dispatch(fetchUserProfile(user.id)).unwrap();
        showSuccess('User role updated successfully');
      }
      setShowRoleModal(false);
    } catch (error: any) {
      showError(error || 'Failed to update user role');
    }
  };

  const handleDesactivation = async () => {

    try {
      if (user) {
        await dispatch(desactivateUser(user.id)).unwrap();
        await dispatch(fetchUserProfile(user.id));
        setShowStateModal(false);

        showSuccess('User desactivated successfully');
      }

    } catch (error: any) {
      setShowStateModal(false);
      await dispatch(fetchUserProfile(user.id));
      showError(error || 'Failed to desactivate user');
    }
  };

  const handleActivation = async () => {

    try {
      if (user) {
        await dispatch(activateUser(user.id)).unwrap();
        await dispatch(fetchUserProfile(user.id));
        setShowStateModal(false);

        showSuccess('User activated successfully');
      }

    } catch (error: any) {
      setShowStateModal(false);
      await dispatch(fetchUserProfile(user.id));
      showError(error || 'Failed to activate user');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 flex justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center">
            <span className="text-2xl font-bold capitalize text-purple-600">
              {user?.firstName?.[0] ?? ''}
              {user?.lastName?.[0] ?? ''}
            </span>
          </div>
          <div>
            <h1 className="text-2xl capitalize font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              {user.role?.name} • Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center items-center p-2 rounded-md hover:bg-gray-100">
                <ChevronDown className="h-5 w-5 text-gray-700" />
              </Menu.Button>
            </div>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setShowRoleModal(true)}
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } flex items-center px-4 py-2 text-sm w-full`}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Role
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          // setSelectedUser(user);
                          setShowStateModal(true);
                        }}
                        className={`${active ? 'bg-gray-100 text-green-600' : 'text-green-500'
                          } ${user.deletedAt === null ? 'text-red-600' : 'text-green-600'} flex w-full px-4 py-2 text-sm`}
                      >
                        {user.deletedAt === null ?
                          <>
                            <UserLock className="h-4 w-4 mr-2" />
                            Desactivate User
                          </> :
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Activate User
                          </>
                        }

                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className={`${active ? 'bg-red-100 text-red-600' : 'text-red-500'
                          } flex items-center px-4 py-2 text-sm w-full`}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete User
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex overflow-x-auto my-4 sm:my-6 bg-white shadow-md rounded-lg 
               scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="flex flex-nowrap min-w-max">
          {['activity', 'access'].map((tab) => (
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
      {activeTab === 'activity' && <UserActivity auditLogs={user.auditLogs} />}
      {activeTab === 'access' && <AccessRightProfile accessRights={user.accessRights} />}

      {/* Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirm User Deletion"
        message={
          <>
            <p>
              If you delete {user.firstName} {user.lastName} completely,
              all documents, versions (including versions uploaded by other users),
              comments and access related to {user.firstName} {user.lastName} even sensitive and archived files will be lost. This action cannot be undone.
            </p>
            <p className="mt-3 font-medium">
              Are you sure you want to proceed?
            </p>
          </>
        }
        bgColor="bg-red-600"
        hoverbgColor="hover:bg-red-700"
      />

      <ConfirmationModal
        isOpen={showStateModal}
        onClose={() => setShowStateModal(false)}
        onConfirm={user.deletedAt === null ? handleDesactivation : handleActivation}
        title={`Confirm User ${user.deletedAt === null ? 'Desactivation' : 'Activation'}`}
        message={`Are you sure you want to ${user.deletedAt === null ? 'desactivate' : 'activate'} the user ${user.firstName} ${user.lastName}?`}
        bgColor={user.deletedAt === null ? 'bg-red-600' : 'bg-green-600'}
        hoverbgColor={user.deletedAt === null ? 'hover:bg-red-700' : 'hover:bg-green-700'}
      />

      <RoleSelectModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onConfirm={handleRoleUpdate}
        currentRole={user.roleId}
      />
    </div>
  );
};