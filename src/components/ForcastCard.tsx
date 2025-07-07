import { ForecastDayType } from "@/utils/weatherTypr";
import Image from "next/image";

const ForcastCard = ({ info }: { info: ForecastDayType }) => {
  const dateObject = new Date(info.date);
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  const dayName = dateObject.toLocaleDateString("en-US", options);
  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-1 flex justify-center items-center border bg-slate-100/40 rounded-lg h-10 w-10 lg:w-8 lg:h-8">
          <Image
            src={`https:${info.day.condition.icon}`}
            alt="icon"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-3 ">
          <div className="text-xs">{dayName}</div>
          <div className="text-white/50 text-xs">{info.day.condition.text}</div>
        </div>
        <div className="border-l px-1 flex flex-col items-center">
          <div className="text-xs">{info.day.mintemp_c.toFixed()}°C</div>
          <div className="text-xs">{info.day.maxtemp_c.toFixed()}°C</div>
        </div>
      </div>
    </>
  );
};

export default ForcastCard;
