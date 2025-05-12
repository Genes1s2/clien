import { useState } from 'react';
// import DocumentViewer from '../components/DocumentViewer';
import Modal from '../../../components/modal/Modal';
import DocumentList from '../../../components/document/DocumentList';
import DocumentForm from '../../../components/document/DocumentForm';
import { Document } from '../../../models/documents';
import { Link } from 'react-router';
import { Trash2 } from 'lucide-react';
import AllDocumentsOwner from '../../../components/document/AllDocumentsOwner';

const DocumentsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState('myDocuments');

  return (
    <div className="p-6 relative">
      <div className="flex justify-between mb-6">
        <h1>Document Management</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={() => {
            setEditingDoc(null);
            setShowModal(true);
          }}>
          New Document
        </button>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex overflow-hidden my-6 bg-white shadow-md rounded">
        <button
          onClick={() => setActiveTab('myDocuments')}
          className={`p-4  ${activeTab === 'myDocuments'
            ? '  text-white bg-purple-600  '
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          My Documents
        </button>
        <button
          onClick={() => setActiveTab('allDocuments')}
          className={`p-4 ${activeTab === 'allDocuments'
            ? '  text-white bg-purple-600  '
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          All Documents
        </button>
      </nav>

      {/* Tab Content */}
      <div>
        {activeTab === 'myDocuments' &&
          <AllDocumentsOwner
            onEdit={(doc) => {
              setEditingDoc(doc);
              setShowModal(true);
            }}
          />
        }
        {activeTab === 'allDocuments' &&
          <DocumentList
            onEdit={(doc) => {
              setEditingDoc(doc);
              setShowModal(true);
            }}
          />
        }
      </div>

      <div className='fixed bottom-10 right-6'>
        <Link to={"deleted-documents"}>
          <div className='bg-red-500 rounded p-2 flex flex-col items-center'>
            <Trash2 size={25} color='white' />
            <p className='text-white font-medium text-sm'>Trash</p>
          </div>
        </Link>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {editingDoc ? 'Edit Category' : 'Create New Category'}
          </h3>
          <DocumentForm
            existingDocument={editingDoc}
            onSuccess={() => setShowModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DocumentsPage;