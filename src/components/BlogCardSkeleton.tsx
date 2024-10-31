const BlogCardSkeleton = () => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mb-6 animate-pulse">
      {/* Skeleton Image */}
      <div className="relative h-48 w-full bg-gray-200" />

      {/* Skeleton Content */}
      <div className="p-6">
        {/* Header with Meta Info */}
        <div className="flex items-center gap-4 mb-3">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        {/* Skeleton Title */}
        <div className="space-y-2 mb-3">
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
        </div>

        {/* Skeleton Content */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>

        {/* Skeleton Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-gray-200 rounded-full" />
            <div className="h-8 w-16 bg-gray-200 rounded-full" />
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;