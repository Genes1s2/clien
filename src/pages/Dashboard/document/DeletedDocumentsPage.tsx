import { useEffect, useState } from 'react';
// import DocumentViewer from '../components/DocumentViewer';
import { e } from 'react-router/dist/development/route-data-Cq_b5feC';
import Modal from '../../../components/modal/Modal';
import DocumentList from '../../../components/document/DocumentList';
import DocumentForm from '../../../components/document/DocumentForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Document } from '../../../models/documents';
import { LoadingType } from '../../../models/store';
import { Link } from 'react-router';
import { Delete, Trash, Trash2, Trash2Icon, TrashIcon } from 'lucide-react';
import AllDeletedDocuments from '../../../components/document/AllDeletedDocuments';
import AllDocumentsOwner from '../../../components/document/AllDocumentsOwner';
import AllDeletedDocumentsByOwner from '../../../components/document/AllDeletedtOwnerDoc';

const DeletedDocumentsPage = () => {
  const [activeTab, setActiveTab] = useState('myDeletedDocuments');

  return (
    <div className="p-6 relative">
      <div className="flex justify-between mb-6">
        <h1>Deleted Document Management</h1>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex overflow-hidden my-6 bg-white shadow-md rounded">
        <button
          onClick={() => setActiveTab('myDeletedDocuments')}
          className={`p-4  ${activeTab === 'myDeletedDocuments'
            ? '  text-white bg-purple-600  '
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          My Deleted Documents
        </button>
        <button
          onClick={() => setActiveTab('allDletedDocuments')}
          className={`p-4 ${activeTab === 'allDletedDocuments'
            ? '  text-white bg-purple-600  '
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          All Deleted Documents
        </button>
      </nav>

      {/* Tab Content */}
      <div>
        {activeTab === 'myDeletedDocuments' &&
          <AllDeletedDocumentsByOwner/>
        }
        {activeTab === 'allDletedDocuments' &&
          <AllDeletedDocuments/>
        }
      </div>
    </div>
  );
};

export default DeletedDocumentsPage;