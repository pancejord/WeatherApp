'use client'
import CityPicker from "@/components/CityPicker"
import { Card, Divider, Subtitle, Text } from "@tremor/react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9999b1] to-[white] p-10 flex flex-col justify-center items-center">
      <Card className="bg-white max-w-4xl mx-auto ">
        <Text className="text-6xl font-bold text-center mb-10">Weather App</Text>
        <Subtitle className="text-xl text-center"> Powered by Next.JS, TailWind, Tremor, GraphQL, StepZen, OpenAI</Subtitle>
        <Divider className="my-10"/>
        <Card className="bg-gradient-to-br from-[#9999b1] to-[white]">
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
