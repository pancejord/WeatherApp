import React from 'react';
import { getClient } from '@/apollo-client';
import typeDefs from '@/graphql/queries/typeDefs';
import CalloutCard from '@/components/CalloutCard';
import StatCard from '@/components/StatCard';

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { lat, long } }: Props) {

  const client = getClient();

  try {
    const { data } = await client.query({
      query: typeDefs,
      variables: {
        current_weather: "true",
        longitude: long,
        latitude: lat,
        timezone: "EST"
      }
    });

    const results = data.myQuery;

    console.log(results);

    return (
      <div>
        <div className='p-5'>
          <div className='pb-5'>
            <h2 className='text-xl font-bold'>Today's Overview</h2>
            <p className='text-sm text-gray-400'>
              Last Updated At: {new Date(results.current_weather.time).toLocaleString()} ({results.timezone})
            </p>
          </div>
          <div><CalloutCard message='This is where GPT-4 Will GO!' /></div>
          {results.daily && results.daily.temperature_2m_max && results.daily.temperature_2m_max[0] !== undefined ? (
            <div><StatCard title='Maximum Temperature' metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`} color='yellow' /></div>
          ) : (
            <div>Loading temperature data...</div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return (
      <div>
        <p>Error fetching weather data. Please try again later.</p>
      </div>
    );
  }
}

export default WeatherPage;
