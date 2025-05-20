import React from "react";
import { setSearchModalOpen } from "../../store/search/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import excellLogo from '../../assets/images/excellogo.jpeg';
import pdfLogo from '../../assets/images/pdflogo.png';
import wordLogo from '../../assets/images/wordlogo.jpeg';
import powerpointLogo from '../../assets/images/powerpointlogo.jpeg';
import { useNavigate } from "react-router";

const SearchModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, isLoading, error, isModalOpen } = useSelector((state: RootState) => state.search);
  const navigate = useNavigate()

  const handleClose = () => dispatch(setSearchModalOpen(false));

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[70vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Search Results</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 p-4 text-center">{error}</div>
          )}

          {!isLoading && !error && (
            <div className="space-y-4">
              {results.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No documents found
                </p>
              ) : (
                results.map((document) => (
                  <div
                    key={document.id}
                    onClick={() => navigate(`documents/${document.id}`)}
                    className="p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-purple-600">{document.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {document.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
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