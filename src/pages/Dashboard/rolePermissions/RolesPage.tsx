// import { useState } from 'react';
// import RoleForm from '../../../components/rolePermission/RoleForm';
// import RoleList from '../../../components/rolePermission/RoleList';
// import Modal from '../../../components/modal/Modal';

// const RolesPage = () => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Role Management</h1>
//         <button
//           className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
//           onClick={() => setShowModal(true)}
//         >
//           Create New Role
//         </button>
//       </div>

//       <RoleList />
//       <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//   <div className="p-4">
//     <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
//       {/* {existingRole ? 'Edit Role' : 'Create New Role'} */}
//     </h3>
//     <RoleForm 
//       // existingRole={existingRole}
//       onSuccess={() => setShowModal(false)}
//     />
//   </div>
// </Modal>
//     </div>
//   );
// };

// export default RolesPage;

import { useState } from 'react';
import RoleForm from '../../../components/rolePermission/RoleForm';
import RoleList from '../../../components/rolePermission/RoleList';
import Modal from '../../../components/modal/Modal';
import { UserRole } from '../../../models/rolePermissions';

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => {
            setExistingRole(null);
            setShowModal(true);
          }}
        >
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