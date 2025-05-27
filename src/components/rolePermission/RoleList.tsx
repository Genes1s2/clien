import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteRole, fetchRoles } from '../../store/rolePermissions/action';
import { LoadingType } from '../../models/store';
import { showError, showSuccess } from '../../utils/Notifications';
import { UserRole } from '../../models/rolePermissions';
import { RoleType } from '../../pages/Dashboard/rolePermissions/RolesPage';
import ConfirmationModal from '../modal/ConfirmationModal';
import TableSkeleton from '../SkeletonLoader';

interface RoleListProps {
  onEdit: (role: RoleType) => void;
}

const RoleList = ({ onEdit }: RoleListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { roles, status, error } = useSelector((state: RootState) => state.rolePermissions);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      if (selectedRole) {
        await dispatch(deleteRole(selectedRole.id)).unwrap();
        await dispatch(fetchRoles()).unwrap();
        setShowDeleteModal(false);

        showSuccess('Role deleted successfully!');
      }

    } catch (error: any) {
      showError(error || "Failled to delete role")

    }
  };

  if (status === LoadingType.PENDING) return <div><TableSkeleton rows={roles.length} cols={3} /></div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!Array.isArray(roles)) {
    return <div className="text-red-500">Roles data is corrupted</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {roles && roles.map((role: UserRole) => (
            <tr key={role.id}>
              <td className="px-6 py-4 whitespace-nowrap capitalize">{role.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {role.permissions?.map((p: any) => (
                  <span key={p.id} className="mr-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {p.name.replace(/_/g, ' ')}
                  </span>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(role)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirm Role Deletion"
        message={`Are you sure you want to delete the role ${selectedRole?.name}?`}
        bgColor="bg-red-600"
        hoverbgColor="hover:bg-red-700"
      />
    </div>
  );
};

export default RoleList;