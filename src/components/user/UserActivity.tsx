import React from 'react';
import { ArchiveIcon, ArchiveRestore, Clock, Edit, File, LucideNotebookPen, PercentDiamond, ShieldIcon, ShieldOffIcon, Text, Trash, UploadIcon, View } from 'lucide-react';
import { AuditLog } from '../../models/logActions';

interface UserActivityProps {
  auditLogs: AuditLog[];
}

export const UserActivity = ({ auditLogs }: UserActivityProps) => {
  
  const getActionIcon = (action: any) => {
    switch (action) {
      case 'DOCUMENT_CREATED':
        return <File className="h-5 w-5 text-green-500" />;
      case 'DOCUMENT_UPDATED':
        return <Edit className="h-5 w-5 text-blue-500" />;
      case 'DOCUMENT_SOFT_DELETED':
        return <Trash className="h-5 w-5 text-red-500" />;
      case 'DOCUMENT_VIEWED':
        return <View className="h-5 w-5 text-orange-500" />;
      case 'DOCUMENT_COMMENTED':
        return <Text className="h-5 w-5 text-gray-500" />;
      case 'DOCUMENT_VERSION_UPLOADED':
        return <UploadIcon className="h-5 w-5 text-purple-500" />;
      case 'DOCUMENT_ACCESS_UPDATED':
        return <PercentDiamond className="h-5 w-5 text-pink-600" />;
      case 'DOCUMENT_RESTORED':
        return <ArchiveRestore className="h-5 w-5 text-pink-600" />;
      case 'DOCUMENT_ARCHIVED':
        return <ArchiveIcon className="h-5 w-5 text-yellow-600" />;
      case 'DOCUMENT_UNARCHIVED':
        return <ArchiveRestore className="h-5 w-5 text-yellow-800" />;
      case 'DOCUMENT_MARKED_SENSITIVE':
        return <ShieldIcon className="h-5 w-5 text-purple-600" />;
      case 'DOCUMENT_MARKED_NORMAL':
        return <ShieldOffIcon className="h-5 w-5 text-purple-800" />;
      default:
        return <LucideNotebookPen className="h-5 w-5 text-black" />;
    }
  };

  return (
    <div className="z-10 relative overflow-hidden bg-white rounded-lg shadow p-6">
      <div><Clock className="-z-20 animate-pulse opacity-30 w-96 h-96 absolute text-purple-500 bottom-0 -right-24 " /></div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="h-6 w-6 text-purple-500" />
        Recent Activity
      </h3>
      
      <div className={` space-y-4 scroll ${auditLogs && auditLogs.length > 10 ? 'h-[50vh]':'' } overflow-y-auto`}>
        {auditLogs && auditLogs.map((log, index) => (
          <div key={index} className="border-l-4 border-purple-200 pl-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">{getActionIcon(log.action)}</div>
              <div>
                <p className="font-medium text-gray-900">{log.action.replace(/_/g, ' ')}</p>
                <p className="text-sm text-gray-600">{log.details}</p>
                <time className="text-xs text-gray-500 mt-1 block">
                  {new Date(log.createdAt).toLocaleDateString('en-US', {
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
        ))}
      </div>
    </div>
  );
};