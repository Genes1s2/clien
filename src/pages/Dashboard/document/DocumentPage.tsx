import { useState } from 'react';
import Modal from '../../../components/modal/Modal';
import DocumentList from '../../../components/document/DocumentList';
import DocumentForm from '../../../components/document/DocumentForm';
import { Document } from '../../../models/documents';
import { Link } from 'react-router';
import { Plus, Trash2 } from 'lucide-react';
import AllDocumentsOwner from '../../../components/document/AllDocumentsOwner';
import AllSensitiveDocuments from '../../../components/document/AllSensitiveDocuments';
import AllArchivedDocuments from '../../../components/document/AllArchivedDocuments';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { AuthUser } from '../../../models/auth';

const DocumentsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState('myDocuments');
  const user = useSelector<RootState, AuthUser | null>(
    (state) => state.session.currentUser.entities
  );

  const isAdmin = user?.role.name === "admin";

  return (
    <div className="w-full max-w-[100rem] px-2 py-6 sm:px-3 mx-auto relative">

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-6">
        {/* Title */}
        <h1 className="text-xl font-bold sm:text-2xl">
          Document Management
        </h1>

        {/* New Document Button */}
        <button
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold 
               px-4 py-2.5 sm:py-2 sm:px-6 rounded-lg text-sm sm:text-base transition-all
               duration-200 transform hover:scale-105 active:scale-95 inline-flex justify-center items-center"
          onClick={() => {
            setEditingDoc(null);
            setShowModal(true);
          }}
        >
          <Plus className="h-5 w-5 mr-2" />
          New Document
        </button>
      </div>

      {/* Navigation Tabs */}
      <nav className={`${isAdmin? '': 'hidden'} flex overflow-x-auto my-4 sm:my-6 bg-white shadow-md rounded-lg 
               scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}>
        <div className={`flex flex-nowrap min-w-max`}>
          {['myDocuments', 'archivedDocuments', 'sensitiveDocuments', 'allDocuments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={` px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium transition-colors
                   duration-200 whitespace-nowrap ${activeTab === tab
                  ? 'text-white bg-purple-600 border-b-4 border-purple-400'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {tab
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
            </button>
          ))}
        </div>
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
        {activeTab === 'archivedDocuments' &&
          <AllArchivedDocuments
            onEdit={(doc) => {
              setEditingDoc(doc);
              setShowModal(true);
            }}
          />
        }
        {activeTab === 'sensitiveDocuments' &&
          <AllSensitiveDocuments
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
            {editingDoc ? 'Edit Document' : 'Create New Document'}
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