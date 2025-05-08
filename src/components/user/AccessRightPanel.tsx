import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { AccessRight } from '../../models/logActions';

interface AccessRightsPanelProps {
    accessRights: AccessRight[];
  }

export const AccessRightsPanel = ({ accessRights }: AccessRightsPanelProps) => {
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Document Access Rights</h3>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accessRights.map((right, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">User : {right.user.firstName} {right.user.lastName}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {right.canRead ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span>Read Access</span>
              </div>
              
              <div className="flex items-center gap-2">
                {right.canWrite ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span>Write Access</span>
              </div>
              
              <div className="flex items-center gap-2">
                {right.canDelete ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span>Delete Access</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};