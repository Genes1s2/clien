import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingType } from '../../models/store';
import { UserRole } from '../../models/rolePermissions';
import { AppDispatch, RootState } from '../../store';
import { fetchRoles } from '../../store/rolePermissions/action';

interface RoleSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (roleId: string) => void;
  currentRole: string;
}

const RoleSelectModal = ({
  isOpen,
  onClose,
  onConfirm,
  currentRole
}: RoleSelectModalProps) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  const dispatch = useDispatch<AppDispatch>();
  const { roles, status, error } = useSelector((state: RootState) => state.rolePermissions);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole]);
  
  if (status === LoadingType.PENDING) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Select User Role
          </Dialog.Title>

          <div className="space-y-2 mb-6">
            {roles.map((role: UserRole) => (
              <label key={role.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={role.id}
                  checked={selectedRole === role.id}
                  onChange={() => setSelectedRole(role.id)}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="text-gray-700">{role.name}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(selectedRole)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Update Role
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RoleSelectModal;