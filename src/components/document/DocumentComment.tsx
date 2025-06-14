import React from 'react';
import { Text } from 'lucide-react';
import { DocumentComment } from '../../models/documents';

interface DocumentCommentProps {
    comment: DocumentComment[];
  }

export const DocumentComments = ({ comment }: DocumentCommentProps) => {
  
  return (
    <div className="z-10relative overflow-hidden bg-white rounded-lg shadow p-6">
      
      <div><Text className="-z-20 animate-pulse opacity-30 w-96 h-96 absolute text-purple-500 bottom-0 -right-24 " /></div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Text className="h-6 w-6 text-purple-500" />
        Comments
      </h3>
      
      <div className={`space-y-4 scroll ${comment.length > 6 ? 'h-[50vh]':'' } overflow-y-auto pr-1`}>
        {comment.length > 0
        ? (comment && comment.map((com, index) => (
          <div key={index} className="border-l-4 border-purple-200 pl-4">
            <div className="flex items-start gap-3">
              {/* <div className="mt-1">{com.user?.firstName} {com.user?.lastName}</div> */}
              <div>
                <p className="font-medium text-gray-900">{com.content}</p>
                <p className="text-sm text-gray-600">By: {com.user?.firstName ?? "User Deleted"} {com.user?.lastName ?? "User Deleted"}</p>
                <time className="text-xs text-gray-500 mt-1 block">
                  {new Date(com.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </time>
              </div>
            </div>
          </div>
        ))) 
        : (
          <div className="text-gray-500">
            No comments available.
          </div>
        )
        }
      </div>
    </div>
  );
};