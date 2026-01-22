import { Skeleton } from "@mantine/core";

type ProductCardSkeletonProps = {
  isConcise?: boolean;
};

export const ProductCardSkeleton = ({
  isConcise = false,
}: ProductCardSkeletonProps) => {
  const height = isConcise ? 300 : 420;

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-700 pointer-events-none"
      style={{ height }}
      aria-hidden="true"
      role="status"
      aria-label="Loading product"
    >
      <Skeleton height="100%" radius={0} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Skeleton height={22} width={50} radius="md" />
        <Skeleton height={22} width={40} radius="xl" />
      </div>

      {!isConcise && (
        <div className="absolute top-4 right-4 z-10">
          <Skeleton height={34} width={34} radius="xl" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="mb-2 flex items-baseline gap-2">
          <Skeleton height={14} width={30} radius="sm" />
          <Skeleton height={28} width={70} radius="sm" />
        </div>

        <Skeleton height={22} width="80%" radius="sm" mb={4} />

        {!isConcise && <Skeleton height={16} width="60%" radius="sm" mb={12} />}

        <div className="flex items-center gap-4 mb-4">
          <Skeleton height={14} width={100} radius="sm" />
          {!isConcise && (
            <>
              <Skeleton height={14} width={60} radius="sm" />
              <Skeleton height={14} width={70} radius="sm" />
            </>
          )}
        </div>

        {!isConcise && (
          <div className="flex flex-wrap gap-1.5">
            <Skeleton height={20} width={50} radius="xl" />
            <Skeleton height={20} width={60} radius="xl" />
            <Skeleton height={20} width={45} radius="xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
