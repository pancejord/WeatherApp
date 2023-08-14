import Image from 'next/image';
import CityPicker from './CityPicker';
import weatherCodeToString, { WeatherCode } from '@/lib/weatherCodeToString';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

type Props =  {
  city: string;
  lat: string;
  long: string;
  result: Root;
}

const InformationPanel = ({city, lat, long, result }: Props) => {
  return (
    <div className='bg-gradient-to-br from-[#9999b1] to-[white] p-10'>
      <div className='pb-5'>
        <h1 className='text-6xl font-bold'>{decodeURI(city)}</h1>
        <p className='text-xs '>
          Long/Lat: {long}, {lat}
        </p>
      </div>
      <CityPicker />
      <hr className='my-10' />
      <div className='mt-5 items-center flex justify-between space-x-10'>
        <div>
          <p className='text-xl'>
            {new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className='font-bold'>
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className='text-xl font-bold uppercase'>
          {new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </p>
      </div>
      <hr className='mt-10 mb-5' />
      <div className='flex items-center justify-between'>
        <div>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString(
                result.current_weather.weathercode as WeatherCode
              )?.icon
            }.png`}
            alt={
              weatherCodeToString(
                result.current_weather.weathercode as WeatherCode
              )!.label
            }
            width={75}
            height={75}
          />
          <div className='flex items-center justify-between space-x-10'>
            <p className='text-6xl font-bold'>
              {result.current_weather.temperature.toFixed(1)}°C
            </p>
            <p className='text-right font-bold'>
              {
                weatherCodeToString(
                  result.current_weather.weathercode as WeatherCode
                )?.label
              }
            </p>
          </div>
        </div>
      </div>
      <div className='space-y-2 py-5'>
        <div className='flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]'>
          <SunIcon className='h-10 w-10 text-gray-400' />
          <div className='flex-1 flex justify-between items-center'>
            <p className='font-bold'>Sunrise</p>
            <p className='uppercase text-2xl'>
              {new Date(result.daily.sunrise[0]).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className='flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]'>
          <MoonIcon className='h-10 w-10 text-gray-400' />
          <div className='flex-1 flex justify-between items-center'>
            <p className='font-bold'>Sunset</p>
            <p className='uppercase text-2xl'>
              {new Date(result.daily.sunset[0]).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPanel;