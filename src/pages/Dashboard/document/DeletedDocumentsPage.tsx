import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AllDeletedDocuments from '../../../components/document/AllDeletedDocuments';
import AllDeletedDocumentsByOwner from '../../../components/document/AllDeletedtOwnerDoc';
import { AuthUser } from '../../../models/auth';

const DeletedDocumentsPage = () => {
  const [activeTab, setActiveTab] = useState('myDeletedDocuments');
    const user = useSelector<RootState, AuthUser | null>(
      (state) => state.session.currentUser.entities
    );
  
    const isAdmin = user?.role.name === "admin";

  return (
    <div className="w-full max-w-[100rem] px-2 py-6 sm:px-3 mx-auto relative">

       <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-6">
        {/* Title */}
        <h1 className="text-xl font-bold sm:text-2xl">
          Deleted Document Management
        </h1>

      </div>

      {/* Navigation Tabs */}
      <nav className={`${isAdmin? '': 'hidden'} flex overflow-x-auto my-4 sm:my-6 bg-white shadow-md rounded-lg 
               scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}>
        <div className="flex flex-nowrap min-w-max">
          {['myDeletedDocuments', 'allDletedDocuments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium transition-colors
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