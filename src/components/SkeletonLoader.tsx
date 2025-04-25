// components/SkeletonLoader.tsx
export const SkeletonLoader = () => (
  <div className="animate-pulse flex items-center gap-2">
    <div className="flex items-end flex-col space-y-1 ">
      <div className="h-5 bg-gray-400 rounded w-32"></div>
      <div className="h-3 bg-gray-400 rounded w-24 content-end"></div>
    </div>
    <div className="h-10 bg-gray-400 rounded-full w-10"></div>
  </div>
);

// Usage in components
//   {status === LoadingType.PENDING ? <SkeletonLoader /> : <ActualContent />}