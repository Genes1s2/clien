// components/UserProfileLayout.jsx
import { useEffect, useState } from 'react';
import { UserActivity } from './UserActivity';
import { AccessRightsPanel } from './AccessRightPanel';
import { AuthUser } from '../../models/auth';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, Edit, Trash } from 'lucide-react';
import ConfirmationModal from '../modal/ConfirmationModal';
import RoleSelectModal from '../modal/RoleSelectModal';
import { deleteUser, fetchUserProfile, getAllUsers, updateUserRole } from '../../store/user/actions';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';

interface UserProfileLayoutProps {
  user: AuthUser;
}

export const UserProfileLayout = ({ user }: UserProfileLayoutProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('activity');

  const handleDelete = async () => {
    try {
      if (user) {
        navigate('/dashboard/admin/users');
        await dispatch(deleteUser(user.id)).unwrap();
      }
      setShowDeleteModal(false);
      showSuccess('User deleted successfully');

    } catch (error: any) {

      showError(error || 'Failed to delete user');
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 flex justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center">
            <span className="text-2xl font-bold capitalize text-purple-600">
              {user.firstName[0]}
              {user.lastName[0]}
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
                        onClick={() => setShowDeleteModal(true)}
                        className={`${active ? 'bg-gray-100 text-red-600' : 'text-red-500'
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
      <nav className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-4 px-1 ${activeTab === 'activity'
            ? 'border-b-2 border-purple-500 text-purple-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Activity Log
        </button>
        <button
          onClick={() => setActiveTab('access')}
          className={`pb-4 px-1 ${activeTab === 'access'
            ? 'border-b-2 border-purple-500 text-purple-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Access Rights
        </button>
      </nav>

      {/* Tab Content */}
      {activeTab === 'activity' && <UserActivity auditLogs={user.auditLogs} />}
      {activeTab === 'access' && <AccessRightsPanel accessRights={user.accessRights} />}

      {/* Modals */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirm User Deletion"
        message={`Are you sure you want to delete completely ${user.firstName} ${user.lastName}? This action cannot be undone.`}
        bgColor="bg-red-600"
        hoverbgColor="hover:bg-red-700"
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