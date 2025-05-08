import { useState } from 'react';
import CategoryList from '../../../components/category/CategoryList';
import Modal from '../../../components/modal/Modal';
import CategoryForm from '../../../components/category/CategoryForm';

const CategoriesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => {
            setSelectedCategory(null);
            setShowModal(true);
          }}
        >
          Create New Category
        </button>
      </div>

      <CategoryList onEdit={(category) => {
        setSelectedCategory(category);
        setShowModal(true);
      }} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {selectedCategory ? 'Edit Category' : 'Create New Category'}
          </h3>
          <CategoryForm 
            existingCategory={selectedCategory}
            onSuccess={() => setShowModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesPage;