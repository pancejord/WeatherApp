'use client'
import React, { useState } from 'react'
import { Country, City } from "country-state-city" 
import Select from "react-select"
import { useRouter } from 'next/navigation';
import { GlobeIcon } from "@heroicons/react/solid"

type option = {
    value: {
        latitude: string,
        longitude: string,
        isoCode: string,
    };
    label: string;
} | null;

type cityOption = {
    value: {
        latitude: string,
        longitude: string,
        countryCode: string,
        name: string,
        stateCode: string,
    };
    label: string,
} | null;

const CityPicker = () => {
    const [selectedCountry, setSelectedCountry] = useState<option>(null);
    const [selectedCity, setSelectedCity]= useState<cityOption>(null);
    const router = useRouter();

const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
}

const handleSelectedCity = (option: cityOption) => {
    setSelectedCity(option);
    router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`);
}


const options = Country.getAllCountries().map((country) => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name,
}));



  return (
    <div className='space-y-4'>
        <div className='space-y-2'>
        <div className='flex items-center space-x-1 text-black/80 font-bold '>
            <GlobeIcon className='w-7 h-6 text-black '/>
            <label htmlFor='country'>Country</label>
        </div>
        <Select 
        value={selectedCountry}
        onChange={handleSelectedCountry}
        options={options}/>
        </div>

        {selectedCountry && (

        <div className='space-y-2'>
        <div className='flex items-center space-x-1 text-black/80 font-bold '>
            <GlobeIcon className='w-7 h-6 text-black '/>
            <label htmlFor='country'>City</label>
        </div>
        
        <Select 
        value={selectedCity}
        onChange={handleSelectedCity}
        options={City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map((city) => ({
            value: {
                latitude: city.latitude!,
                longitude: city.longitude!,
                countryCode: city.countryCode,
                name: city.name,
                stateCode: city.stateCode,
            },
            label: city.name,
        }))}/>
        </div>
)}
    </div>
    
  )
}

export default CityPicker