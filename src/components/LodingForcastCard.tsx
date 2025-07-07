import { Skeleton } from "@nextui-org/skeleton";

const LodingForcastCard = () => {
  return (
    <>
      <div className="grid grid-cols-5 gap-3 place-items-center">
        <div className="col-span-1 flex justify-center items-center">
          <Skeleton className="w-8 h-8 rounded-md" />
        </div>
        <div className="col-span-3 space-y-1">
          <Skeleton className="h-3 w-20 rounded-md "></Skeleton>
          <Skeleton className="h-4 w-28 rounded-md"></Skeleton>
        </div>
        <div className="border-l pl-1 flex flex-col gap-1 items-center">
          <Skeleton className="h-4 w-6 rounded-md"></Skeleton>
          <Skeleton className="h-4 w-6 rounded-md"></Skeleton>
        </div>
      </div>
    </>
  );
};

export default LodingForcastCard;
