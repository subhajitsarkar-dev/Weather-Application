import { WeatherDataType } from "@/utils/weatherTypr";
import { Card } from "@nextui-org/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsWind } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import ForcastCard from "./ForcastCard";
import ForcastTimeCard from "./ForcastTimeCard";
import LodingDisplay from "./LodingDisplay";

const Display = () => {
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((geo) => {
        setLatitude(geo.coords.latitude);
        setLongitude(geo.coords.longitude);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const { data, isLoading, isFetched, isFetching, isSuccess } = useQuery({
    queryKey: ["Current weather"],
    queryFn: async () => {
      if (latitude != undefined && longitude != undefined) {
        const query = `${latitude},${longitude}`;
        const req = await axios.get(apiUrl, {
          params: {
            key: process.env.NEXT_PUBLIC_API_KEY,
            q: query,
            days: 3,
          },
        });
        const res = req.data as WeatherDataType;
        const data = res;
        return data;
      }
    },
    enabled: !!latitude && !!longitude,
  });

  if (isLoading || isFetching) {
    return <LodingDisplay />;
  }

  if (isFetched && isSuccess) {
    const now = new Date();
    const currentDate = now.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const currentTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return (
      <>
        <div className="flex justify-center items-center h-screen backdrop-blur p-3">
          <Card
            isBlurred
            className="lg:w-[1085px] lg:h-[440px] w-full h-full flex flex-col lg:flex-row gap-4 bg-[#1F2937]"
          >
            {/*section--1-start /// */}
            <Card className="backdrop-blur lg:border-r px-7 py-6 flex flex-col gap-5 bg-[#1F2937] shadow-xl shadow-slate-900 lg:shadow-none">
              <div className="px-7 py-1 rounded-md flex justify-center gap-3">
                <LuMapPin className="w-5 h-5" />
                <div className="font-semibold text-white">
                  {data?.location.name}, {data?.location.region}
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center">
                <div className="text-5xl">
                  {data?.current.temp_c.toFixed()}°C
                </div>
                <div className="text-white/50 text-sm flex gap-1">
                  <div className="flex items-center">
                    <BsWind />
                  </div>
                  <div className="">
                    {data?.current.wind_dir},{data?.current.wind_kph.toFixed(1)}{" "}
                    km/h
                  </div>
                </div>
              </div>
              <hr className="border-white/50" />
              <div className="flex flex-col items-center gap-4 ">
                <div className="text-sm">The Next Days Forecast</div>
                <div className="bg-black/40 px-2 rounded-lg text-sm">
                  3 days
                </div>
              </div>

              {/* section--2-start ---CardfiveDays-->/// */}
              <div className="flex flex-col gap-4 overflow-y-scroll lg:scrollbar-thin h-40 scrollbar-hide">
                {data?.forecast.forecastday.map((day, index) => (
                  <ForcastCard key={index} info={day} />
                ))}
              </div>
              {/* section--2-end---CardthreeDays-->/// */}
            </Card>
            {/* section--1-end/// */}

            {/* section--3-start/// */}
            <div className="flex flex-col justify-between lg:w-[800px]">
              <div className="flex lg:flex-row justify-between gap-3 p-4 lg:h-screen">
                <div className="">
                  <a
                    href="https://weather.com/en-AU/weather/tenday/l/2be48f6e4a71da5d6b684009663b1cfbc5163c59e968ad8ea2fe1ba8d03ce68e?par=oppo_widget"
                    className="text-blue-600 font-semibold md:hidden"
                  >
                    Weather forecast for the next 15 days
                  </a>
                </div>
                <div className="flex flex-col lg:justify-between gap-3 lg:h-40">
                  <div className="flex flex-col text-end font-semibold h-10 lg:py-2">
                    <div className="">{currentDate}</div>
                    <div className="">{currentTime}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end gap-3 p-4 lg:h-screen">
                <div className="text-3xl font-bold">
                  {data?.current.condition.text}
                </div>
                <hr />
              </div>

              {/* section--4-start----Cardforecast---->/// */}
              <div className="flex flex-row gap-3 p-4 lg:h-[1085px] lg:w-[800px] overflow-x-scroll scroll whitespace-nowrap scroll-smooth ">
                {data?.forecast.forecastday.map((day) =>
                  day.hour.map((time, index) => (
                    <ForcastTimeCard key={index} info={time} />
                  ))
                )}
              </div>
              {/* section--4-end----Cardforecast---->/// */}
            </div>
            {/* section--3-end/// */}
          </Card>
        </div>
      </>
    );
  }
};

export default Display;
