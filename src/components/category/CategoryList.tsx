import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteCategory, fetchCategories } from '../../store/categories/actions';
import { LoadingType } from '../../models/store';
import { Category } from '../../models/category';
import { showError, showSuccess } from '../../utils/Notifications';
import ConfirmationModal from '../modal/ConfirmationModal';
import TableSkeleton from '../SkeletonLoader';
import { Group, Plus } from 'lucide-react';
import CategoryForm from './CategoryForm';
import Modal from '../modal/Modal';

const CategoryList = ({ onEdit }: { onEdit: (category: any) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const { items, status, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = async () => {
        try {
            if (selectedCategory) {
                await dispatch(deleteCategory(selectedCategory.id)).unwrap();
                setShowDeleteModal(false);

                showSuccess('Role deleted successfully!');
            }

        } catch (error: any) {
            showError(error || "Failled to delete category")

        }
    };

    if (status === LoadingType.PENDING) return <div><TableSkeleton rows={items.length} cols={2} /></div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!Array.isArray(items)) return <div className="text-red-500">Invalid categories data</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={2} className="py-12 text-center">
                                <div className="flex flex-col items-center justify-center space-y-4">
                              
                                    <Group className="h-24 w-24 text-gray-400" />
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-medium text-gray-900">No category found</h3>
                                        <p className="text-gray-500 max-w-md">
                                            Start by creating a new category or adjust your search filters.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="mt-4 inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Create a category
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        items.map((category) => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap capitalize">{category.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => { onEdit(category) }}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Confirm Role Deletion"
                message={`Are you sure you want to delete the category ${selectedCategory?.name}?`}
                bgColor="bg-red-600"
                hoverbgColor="hover:bg-red-700"
            />

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

export default CategoryList;