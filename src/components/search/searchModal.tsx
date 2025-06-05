import React from "react";
import { setSearchModalOpen } from "../../store/search/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router";
import { Document } from "../../models/documents";
import { Files } from "lucide-react";

const SearchModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, isLoading, error, isModalOpen } = useSelector((state: RootState) => state.search);
  const navigate = useNavigate()

  const handleClose = () => dispatch(setSearchModalOpen(false));

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-2 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[70vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-700 font-medium">Search Results</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 p-4 text-center">{error}</div>
          )}

          {!isLoading && !error && (
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className=" w-full bg-white flex flex-col items-center p-6 text-center rounded-md justify-center space-y-4">

              <Files className="h-24 w-24 text-gray-400" />
              <div className="space-y-1">
                <h3 className="text-xl font-medium text-gray-900">No Document found</h3>
                <p className="text-gray-500 max-w-md">
                  This can be due to the fact that the document do not exist, you have no access to the document or the document is sensitive.
                </p>
              </div>
            </div>
              ) : (
                results.map((document: Document) => (
                  <div
                    key={document.id}
                    onClick={() => {handleClose(); navigate(`documents/${document.id}`)}}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <h3 className="font-semibold text-purple-600">{document.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {document.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;