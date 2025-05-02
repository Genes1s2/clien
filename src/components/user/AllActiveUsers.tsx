import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, Edit, Trash, User, UserLock } from 'lucide-react';
import { showError, showSuccess } from '../../utils/Notifications';
import { desactivateUser, getAllActiveUsers, updateUserRole } from '../../store/user/actions';
import { getRandomColor } from '../../utils/RandomColor';
import { LoadingType } from '../../models/store';
import Pagination from '../Pagination';
import ConfirmationModal from '../modal/ConfirmationModal';
import RoleSelectModal from '../modal/RoleSelectModal';
import { AuthUser, UserListEntry } from '../../models/auth';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router';

const ITEMS_PER_PAGE = 10;

const AllActiveUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<UserListEntry | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const avatarBgColor = useMemo(() => getRandomColor(), []);
    const navigate = useNavigate();

    const { data: users, status, error } = useSelector((state: RootState) => state.user.list);

    // Filter and pagination logic
    const filteredUsers = users.filter((user: AuthUser) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        dispatch(getAllActiveUsers());
    }, [dispatch]);

    const handleDesactivation = async () => {

        try {
            if (selectedUser) {
                console.log("selectedUser.id: ", selectedUser.id);

                await dispatch(desactivateUser(selectedUser.id)).unwrap();
                await dispatch(getAllActiveUsers());
                setShowDeleteModal(false);

                showSuccess('User desactivated successfully');
            }

        } catch (error: any) {
            console.log("desactivate error: ", error);

            setShowDeleteModal(false);
            showError(error || 'Failed to desactivate user');
        }
    };

    const handleRoleUpdate = async (roleId: string) => {
        if (selectedUser) {
            await dispatch(updateUserRole({ userId: selectedUser.id, data: { roleId }  })).unwrap();
            setShowRoleModal(false);
        }
    };

    if (status === LoadingType.PENDING) return <div className="text-center py-4">Loading users...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center mb-6">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Active User Management</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Manage all active registered users ( {users.length} ) in the system
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <input
                        type="text"
                        placeholder="Search users name and email..."
                        className="block w-64 rounded-md border-gray-300 outline-blue-600 focus:ring-blue-500 shadow-sm px-4 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className=" overflow-x-scroll shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Desactivated At</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {paginatedUsers.map((user: UserListEntry) => (
                            <tr key={user.id}>
                                <td className="whitespace-nowrap px-3 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-8 w-8 rounded-full ${avatarBgColor} flex items-center justify-center mr-3`}>
                                            <span className="text-white uppercase text-sm font-medium">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium uppercase text-gray-900 ">{user.firstName} {user.lastName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-gray-500">{user.email}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-gray-500">{user.role.name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                                    {/* {new Date(user.createdAt).toLocaleDateString()} */}
                                    {user.deletedAt ? new Date(user.deletedAt).toLocaleDateString() : 'Active'}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                                                <ChevronDown className="h-5 w-5" aria-hidden="true" />
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
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => navigate(`/dashboard/admin/users/${user.id}`)}
                                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                    } flex w-full px-4 py-2 text-sm`}
                                                            >
                                                                <User className="h-5 w-5 mr-2" />
                                                                View Profile
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedUser(user);
                                                                    setShowRoleModal(true);
                                                                }}
                                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                    } flex w-full px-4 py-2 text-sm`}
                                                            >
                                                                <Edit className="h-5 w-5 mr-2" />
                                                                Edit Role
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedUser(user);
                                                                    setShowDeleteModal(true);
                                                                }}
                                                                className={`${active ? 'bg-gray-100 text-red-600' : 'text-red-500'
                                                                    } flex w-full px-4 py-2 text-sm`}
                                                            >
                                                                <UserLock className="h-5 w-5 mr-2" />
                                                                Desactivate User
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredUsers.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                //   className="mt-4"
                />
            </div>


            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDesactivation}
                title="Confirm User Deletion"
                message={`Are you sure you want to desactivate ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
                bgColor="bg-red-600"
                hoverbgColor="hover:bg-red-700"
            />

            <RoleSelectModal
                isOpen={showRoleModal}
                onClose={() => setShowRoleModal(false)}
                onConfirm={handleRoleUpdate}
                currentRole={selectedUser?.roleId || ''}
            />
        </div>
    );
};

export default AllActiveUser;
