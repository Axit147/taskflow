import React from "react";
import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <Skeleton className="h-48 w-80 p-6">
      <Skeleton className="h-7 rounded-full w-32" />
      <Skeleton className="h-3 w-52 rounded-md mt-8" />
      <Skeleton className="h-3 w-52 rounded-md mt-3" />
      <Skeleton className="h-7 w-7 rounded-full mt-6" />
    </Skeleton>
  );
};

export default CardSkeleton;
