export const SkeletonLoader = () => (
  <div className="animate-pulse flex items-center gap-2">
    <div className="flex items-end flex-col space-y-1 ">
      <div className="h-5 bg-gray-400 rounded w-32"></div>
      <div className="h-3 bg-gray-400 rounded w-24 content-end"></div>
    </div>
    <div className="h-10 bg-gray-400 rounded-full w-10"></div>
  </div>
);

export const DocumentsSkeletonLoader = ({ count = 12 }) => {
  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="group flex flex-col">
            {/* Image/Thumbnail Area with Dynamic Aspect Ratio */}
            <div className="aspect-[4/3] w-full bg-gray-100 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-gray-100" />
            </div>
            
            {/* Text Content with Responsive Spacing */}
            <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
              <div className="h-3 sm:h-4 bg-gray-100 rounded-full w-[85%]" />
              <div className="h-2.5 sm:h-3 bg-gray-100 rounded-full w-[65%]" />
              <div className="h-2.5 sm:h-3 bg-gray-100 rounded-full w-[45%]" />
            </div>
            
            {/* Responsive Metadata */}
            <div className="mt-2 sm:mt-3 flex items-center justify-between">
              <div className="h-2.5 sm:h-3 bg-gray-100 rounded-full w-1/4" />
              <div className="h-2.5 sm:h-3 bg-gray-100 rounded-full w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

const TableSkeleton = ({ rows = 5, cols = 5 }: TableSkeletonProps) => {
  return (
    <div className="animate-pulse w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, index) => (
              <th key={index} className="px-4 py-3">
                <div className="h-6 bg-gray-100 rounded-md w-3/4 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-100">
              {Array.from({ length: cols }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-4">
                  <div className="h-5 bg-gray-100 rounded-md w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Skeleton */}
      <div className="mt-4 flex justify-between items-center">
        <div className="h-8 w-32 bg-gray-100 rounded-md"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-100 rounded-md"></div>
          <div className="h-8 w-8 bg-gray-100 rounded-md"></div>
          <div className="h-8 w-24 bg-gray-100 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;