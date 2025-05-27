import { useState } from 'react';
import CategoryList from '../../../components/category/CategoryList';
import Modal from '../../../components/modal/Modal';
import CategoryForm from '../../../components/category/CategoryForm';
import { Plus } from 'lucide-react';
import { Category } from '../../../models/category';

const CategoriesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="w-full max-w-[80rem] px-2 py-6 sm:px-3 mx-auto relative">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">Category Management</h1>
        <button
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold 
               px-4 py-2.5 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-base transition-all
               duration-200 transform hover:scale-105 active:scale-95 inline-flex justify-center items-center"
          onClick={() => {
            setSelectedCategory(null);
            setShowModal(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
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