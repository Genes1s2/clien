import { useState } from 'react';
import RoleForm from '../../../components/rolePermission/RoleForm';
import RoleList from '../../../components/rolePermission/RoleList';
import Modal from '../../../components/modal/Modal';
import { Plus } from 'lucide-react';

export interface RoleType {
  id: string;
  name: string;
  permissions: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
}

const RolesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [existingRole, setExistingRole] = useState<RoleType | null>(null);

  // Add this function to handle edit actions from RoleList
  const handleEditRole = (role: RoleType) => {
    setExistingRole(role);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setExistingRole(null); // Reset existing role when closing modal
  };

  return (
    <div className="w-full max-w-[80rem] px-2 py-6 sm:px-3 mx-auto relative">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">Role Management</h1>
        <button
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold 
               px-4 py-2.5 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-base transition-all
               duration-200 transform hover:scale-105 active:scale-95 inline-flex justify-center items-center"
          onClick={() => {
            setExistingRole(null);
            setShowModal(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Role
        </button>
      </div>

      <RoleList onEdit={handleEditRole} />

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="p-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {existingRole ? 'Edit Role' : 'Create New Role'}
          </h3>
          <RoleForm
            existingRole={existingRole || undefined}
            onSuccess={handleCloseModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default RolesPage;