import { HourlyForecastType } from "@/utils/weatherTypr";
import Image from "next/image";

const ForcastTimeCard = ({ info }: { info: HourlyForecastType }) => {
  const now = new Date(info.time);
  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <>
      <div className="p-2 flex flex-col gap-3 lg:w-14 w-16 items-center backdrop-blur bg-slate-900/50 text-sm lg:text-xs rounded-md hover:scale-105 duration-300">
        <div className="border-b p-1">{currentTime}</div>
        <div className="border p-1 bg-white/10 rounded-md h-8 flex items-center">
          <Image
            src={`https:${info.condition.icon}`}
            alt="icon"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="">{info.temp_c}°C</div>
      </div>
    </>
  );
};

export default ForcastTimeCard;
