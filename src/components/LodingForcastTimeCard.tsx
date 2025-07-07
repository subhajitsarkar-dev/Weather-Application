import { Skeleton } from "@nextui-org/skeleton";

const LodingForcastTimeCard = () => {
  return (
    <>
      <div className="p-2 flex flex-col gap-3 lg:w-14 w-16 items-center backdrop-blur bg-slate-900/50 text-sm lg:text-xs rounded-md hover:scale-105 duration-300">
        <Skeleton className="border-b p-1 w-10 h-5 rounded-md"></Skeleton>
        <div className="flex items-center">
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <Skeleton className="w-10 h-5 rounded-md">°C</Skeleton>
      </div>
    </>
  );
};

export default LodingForcastTimeCard;
