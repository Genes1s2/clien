import { useState } from 'react';
import { Dialog } from '@headlessui/react';

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
  const roles = [
    { id: 'admin', name: 'Administrator' },
    { id: 'editor', name: 'Editor' },
    { id: 'viewer', name: 'Viewer' }
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Select User Role
          </Dialog.Title>

          <div className="space-y-2 mb-6">
            {roles.map(role => (
              <label key={role.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={role.id}
                  checked={selectedRole === role.id}
                  onChange={() => setSelectedRole(role.id)}
                  className="form-radio h-4 w-4 text-blue-600"
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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