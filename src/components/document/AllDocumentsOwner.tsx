
import { useEffect, useState } from 'react';
import { Document } from '../../models/documents';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { showError, showSuccess } from '../../utils/Notifications';
import Modal, { ModalPreview } from '../modal/Modal';
import { allDocumentsByOwner, softDeleteDocument } from '../../store/document/actions';
import { LoadingType } from '../../models/store';
import { useNavigate } from 'react-router';
import excellLogo from '../../assets/images/excellogo.jpeg';
import pdfLogo from '../../assets/images/pdflogo.png';
import wordLogo from '../../assets/images/wordlogo.jpeg';
import powerpointLogo from '../../assets/images/powerpointlogo.jpeg';
import DocumentViewer from '../DocumentViewer';
import { ArchiveIcon, Download, DownloadIcon, EyeIcon, Files, MoreVerticalIcon, PencilIcon, Plus, ShieldIcon, TrashIcon } from 'lucide-react';
import Pagination from '../Pagination';
import ConfirmationModal from '../modal/ConfirmationModal';
import { DocumentsSkeletonLoader } from '../SkeletonLoader';
import DocumentForm from './DocumentForm';

const ITEMS_PER_PAGE = 24;

const AllDocumentsOwner = ({ onEdit }: { onEdit: (category: any) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [previewDoc, setPreviewdDoc] = useState<Document | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { items, status, error } = useSelector((state: RootState) => state.documents);
    const navigate = useNavigate()
    const [filterTag, setFilterTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf': return pdfLogo;
            case 'doc': case 'docx': return wordLogo;
            case 'xls': case 'xlsx': return excellLogo;
            case 'pptx': case 'ppt': return powerpointLogo;
            default: return '📁';
        }
    };

    useEffect(() => {
        dispatch(allDocumentsByOwner())
    }, [dispatch])

    const handleDownload = async (filePath: string, fileName: string) => {

        const viewerUrl = `http://127.0.0.1:4000${filePath}`;
        try {
            const response = await fetch(viewerUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            showError('Failed to download file');
        }
    };

    const handleDelete = async () => {
        if (selectedDoc) {
            try {
                await dispatch(softDeleteDocument(selectedDoc.id)).unwrap();
                await dispatch(allDocumentsByOwner()).unwrap();
                setShowDeleteModal(false);
                showSuccess('Document deleted successfully');
            } catch (error: any) {
                setShowDeleteModal(false);
                await dispatch(allDocumentsByOwner()).unwrap();
                showError(error || 'Failed to delete document');
            }
        }
    };

    const getColorByTag = (tag: string) => {
        const colors = [
            'bg-blue-100 text-blue-800 border-blue-300',
            'bg-green-100 text-green-800 border-green-300',
            'bg-yellow-100 text-yellow-800 border-yellow-300',
            'bg-purple-100 text-purple-800 border-purple-300',
            'bg-pink-100 text-pink-800 border-pink-300',
        ];
        const index = tag.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const handleTagClick = (tag: string) => {
        setFilterTag(prev => (prev === tag ? null : tag));
    };

    // Pagination and filter logic
    const safeItems = Array.isArray(items) ? items : [];
    const filteredDocs = safeItems.filter((doc: Document) =>
        `${doc.title}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tagFilteredDocs = filterTag
        ? filteredDocs.filter(doc => doc?.tags?.includes(filterTag))
        : filteredDocs;

    const paginatedItems = tagFilteredDocs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    const filteredItems = paginatedItems;

    if (status === LoadingType.PENDING) return <div className="w-full"><DocumentsSkeletonLoader count={filteredItems.length} /></div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!Array.isArray(items)) return <div className="text-red-500">Invalid documents data</div>;

    return (
        <div className="max-w-[150rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-3'>
                {/* Stats Container */}
                <div className='w-full py-2 px-3 bg-white rounded-md shadow-md md:w-auto'>
                    <div className='flex flex-col gap-1 sm:flex-row sm:gap-4'>
                        <h2 className='text-gray-400'>Total documents: <span className='text-gray-800'>{items.length}</span></h2>
                        <h2 className='text-gray-400'>Display documents: <span className='text-gray-800'>{filteredItems.length}</span></h2>
                    </div>
                </div>

                {/* Search Input */}
                <div className="w-full sm:max-w-lg md:w-96 lg:w-[500px] shadow-md">
                    <input
                        type="text"
                        placeholder="Search document by title and category..."
                        className="w-full rounded-md border-gray-300 outline-purple-600 focus:ring-purple-500 shadow-sm px-4 py-2 text-sm sm:text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            {/* style Grid */}
            <div className={`${filteredItems.length === 0 ? "" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-4 gap-2"} `}>
                {filteredItems.length === 0 ? (
                    <div className=" w-full bg-white flex flex-col items-center p-6 text-center rounded-md justify-center space-y-4">

                        <Files className="h-24 w-24 text-gray-400" />
                        <div className="space-y-1">
                            <h3 className="text-xl font-medium text-gray-900">No Document found</h3>
                            <p className="text-gray-500 max-w-md">
                                Start by creating a new document or adjust your search filters. Your uploaded documents would be display here.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-4 inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Create a document
                        </button>
                    </div>
                ) : (
                    Array.isArray(filteredItems) &&
                    filteredItems.map((doc: Document) => (
                        <div
                            key={doc.id}
                            className="group bg-white border flex flex-col justify-between rounded-lg p-3 hover:shadow-lg transition-shadow"
                        >
                            <div className='w-full flex justify-between items-center rounded-lg'>
                                <div className=' flex gap-2'>

                                    <p>
                                        {doc.isArchived && <span title='Archived' className=' cursor-pointer text-yellow-600 hover:text-yellow-800 inline-flex'><ArchiveIcon className="w-4 h-4 mr-1" /></span>}
                                    </p>
                                </div>
                                <button
                                    className="bg-orange-100 hover:bg-orange-200 md:text-sm text-orange-600 hover:text-orange-700 font-semibold p-2 rounded transition-colors flex items-center"
                                    onClick={() => setPreviewdDoc(doc)}
                                >
                                    <EyeIcon className="w-4 h-4 mr-1 md:mr-2" />
                                    Preview
                                </button>
                            </div>
                            <div className='overflow-hidden flex justify-center mb-2 border-slate-100 border-b-2'>
                                {doc.filePath && (
                                    <img
                                        src={getFileIcon(doc.filePath)}
                                        className='w-52 rounded-lg group-hover:scale-150 group-hover:rotate-12 transition-all'
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="flex items-start w-full gap-3 mb-2">
                                <div className="flex-1">
                                    <h3 className="font-medium text-purple-700 uppercase truncate">{doc.title}</h3>
                                    <p className="text-sm text-gray-600 truncate">
                                        <span className=' font-medium capitalize'>Category</span>: {doc.category?.name}
                                    </p>
                                    <p className="text-sm text-gray-600 truncate capitalize">
                                        <span className=' font-medium'>Uploaded by</span> : {doc.user?.firstName} {doc.user?.lastName}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate capitalize">
                                        <span className=' font-medium'>On</span>: {new Date(doc.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        <i className="text-sm text-gray-500 truncate">Tags (clickable):</i>{' '}
                                        {doc.tags.map((tag, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleTagClick(tag)}
                                                className={`px-2 py-0.5 text-xs font-medium rounded border ${getColorByTag(tag)} hover:brightness-105 transition`}
                                            // className={`inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded mr-1`}
                                            >
                                                🔖 {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className=" overflow-x-auto grid grid-cols-2 gap-2 text-sm w-full pt-2 rounded-lg">

                                <button
                                    onClick={() => handleDownload(doc.filePath, doc.title)}
                                    className="flex gap-1 justify-center items-center rounded hover:bg-purple-100 bg-slate-100 p-2 text-purple-600 hover:text-purple-800 text-sm transition-all w-full"
                                >
                                    <DownloadIcon className="w-4 h-4" />
                                    <span className=" items-center">Download</span>
                                </button>
                                <button
                                    onClick={() => navigate(`${doc.id}`)}
                                    className="  flex gap-1 justify-center items-center rounded hover:bg-blue-100 bg-slate-100 p-2 text-blue-600 hover:text-blue-800 text-sm transition-all w-full"
                                >
                                    <MoreVerticalIcon className="w-4 h-4" />
                                    <span className=" items-center">Details</span>
                                </button>
                                <button
                                    onClick={() => onEdit(doc)}
                                    className="  flex gap-1 justify-center items-center rounded hover:bg-green-100 bg-slate-100 p-2 text-green-600 hover:text-green-800 text-sm transition-all w-full"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                    <span className=" items-center">Edit</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedDoc(doc);
                                        setShowDeleteModal(true);
                                    }}
                                    className="  flex gap-1 justify-center items-center rounded hover:bg-red-100 bg-slate-100 p-2 text-red-600 hover:text-red-800 text-sm transition-all w-full"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                    <span className=" items-center">Delete</span>
                                </button>
                            </div>
                        </div>
                    )))}
            </div>

            {filterTag && (
                <div className="p-2 text-sm text-gray-600">
                    Filtering by tag: <strong>{filterTag}</strong>{' '}
                    <button className="ml-2 text-blue-500" onClick={() => setFilterTag(null)}>
                        Clear
                    </button>
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalItems={tagFilteredDocs.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />

            {/* Preview Modal */}

            <ModalPreview isOpen={!!previewDoc} onClose={() => setPreviewdDoc(null)}>
                {previewDoc && (
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                <span className='text-2xl text-purple-600 capitalize'>{previewDoc?.title}</span>
                            </h3>
                        </div>
                        <div className="max-h-[80vh] overflow-hidden rounded-lg">
                            <DocumentViewer fileUrl={previewDoc?.filePath} />
                        </div>
                        <button
                            onClick={() => handleDownload(previewDoc.filePath, previewDoc.title)}
                            className="flex gap-2 bg-purple-600 text-white mt-2 px-4 py-2 rounded hover:bg-purple-700"
                        >
                            <Download size={22} /> Download File
                        </button>
                    </div>
                )}
            </ModalPreview>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="p-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {selectedDoc ? 'Edit Category' : 'Create New Category'}
                    </h3>
                    <DocumentForm
                        existingDocument={selectedDoc}
                        onSuccess={() => setShowModal(false)}
                    />
                </div>
            </Modal>
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Confirm User Deletion"
                message={`Are you sure you want to delete ${selectedDoc?.title}?`}
                bgColor="bg-red-600"
                hoverbgColor="hover:bg-red-700"
            />
        </div>
    );
};

export default AllDocumentsOwner;