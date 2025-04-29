// // components/UserList.tsx
// import { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { LoadingType } from '../../../models/store';
// import { AppDispatch, RootState } from '../../../store';
// import { getAllUsers } from '../../../store/user/actions';
// import { UserListEntry } from '../../../models/auth';
// import { getRandomColor } from '../../../utils/RandomColor';

// const UserList = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const avatarBgColor = useMemo(() => getRandomColor(), []);

//     const { data: users, status, error } = useSelector((state: RootState) => state.user.list);
//     useEffect(() => {
//         dispatch(getAllUsers());
//     }, [dispatch]);

//     if (status === LoadingType.PENDING) return <div>Loading users...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="overflow-x-auto rounded-lg border">
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {users.map((user: UserListEntry, index: number) => (
//                         <tr key={user.id} className="hover:bg-gray-50">
//                             <td className={`h-10 w-10 rounded-full text-white ${avatarBgColor} flex items-center justify-center`}>{`${user.firstName[0]} ${user.lastName[0]}`}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{`${index + 1}`}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{`${user.firstName} ${user.lastName}`}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{user.roleId}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 {new Date(user.createdAt).toLocaleDateString()}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };


// export default UserList;

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingType } from '../../../models/store';
import { AppDispatch, RootState } from '../../../store';
import { getAllUsers, desactivateUser, deleteUser, updateUserRole } from '../../../store/user/actions';
import { AuthUser, UserListEntry } from '../../../models/auth';
import { getRandomColor } from '../../../utils/RandomColor';
import { Menu, Transition } from '@headlessui/react';
import Pagination from '../../../components/Pagination';
import { ChevronDown, Edit, Trash, User } from 'lucide-react';
import ConfirmationModal from '../../../components/modal/ConfirmationModal';
import RoleSelectModal from '../../../components/modal/RoleSelectModal';
import { showError, showSuccess } from '../../../utils/Notifications';

const ITEMS_PER_PAGE = 10;

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<UserListEntry | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const avatarBgColor = useMemo(() => getRandomColor(), []);

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
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = async () => {

        try {
            if (selectedUser) {
                console.log("selectedUser.id: ", selectedUser.id);

                await dispatch(desactivateUser(selectedUser.id)).unwrap();
                dispatch(getAllUsers());
                setShowDeleteModal(false);

                showSuccess('User desactivated successfully');
            }

        } catch (error: any) {
            console.log("desactivate error: ", error);

            setShowDeleteModal(false);
            showError(error || 'Failed to change password');
        }
    };

    const handleRoleUpdate = async (roleId: string) => {
        if (selectedUser) {
            //   await dispatch(updateUserRole({ userId: selectedUser.id, roleId }));
            setShowRoleModal(false);
        }
    };

    if (status === LoadingType.PENDING) return <div className="text-center py-4">Loading users...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center mb-6">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Manage all registered users( {users.length}) in the system
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="block w-48 rounded-md border-gray-300 shadow-sm px-4 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
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
                                            <span className="text-white text-sm font-medium">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 ">{user.firstName} {user.lastName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-gray-500">{user.email}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-gray-500">{user.roleId}</td>
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
                                                                onClick={() => {/* Navigate to profile */ }}
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
                                                                <Trash className="h-5 w-5 mr-2" />
                                                                Delete User
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
                onConfirm={handleDelete}
                title="Confirm User Deletion"
                message={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
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

export default UserList;

<Menu as="div" className="relative inline-block text-left">
    <Menu.Button className="inline-flex justify-center w-full rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
    </Menu.Button>

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
                    {({ active: isActive }) => (
                        <button
                            className={`${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                } flex w-full px-4 py-2 text-sm`}
                        >
                            <User className="h-5 w-5 mr-2" />
                            View Profile
                        </button>
                    )}
                </Menu.Item>
                {/* Other Menu Items */}
            </div>
        </Menu.Items>
    </Transition>
</Menu>