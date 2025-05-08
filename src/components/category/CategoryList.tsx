import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteCategory, fetchCategories } from '../../store/categories/actions';
import { LoadingType } from '../../models/store';
import { Category } from '../../models/category';
import { showError, showSuccess } from '../../utils/Notifications';
import ConfirmationModal from '../modal/ConfirmationModal';

const CategoryList = ({ onEdit }: { onEdit: (category: any) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const { items, status, error } = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = async () => {
        try {
            if (selectedCategory) {
                await dispatch(deleteCategory(selectedCategory.id)).unwrap();
                // await dispatch(fetchRoles()).unwrap();
                setShowDeleteModal(false);

                showSuccess('Role deleted successfully!');
            }

        } catch (error: any) {
            showError(error || "Failled to delete role")

        }
    };

    if (status === LoadingType.PENDING) return <div>Loading categories...</div>;
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
                    {items.map((category) => (
                        <tr key={category.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
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
                    ))}
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

        </div>
    );
};

export default CategoryList;