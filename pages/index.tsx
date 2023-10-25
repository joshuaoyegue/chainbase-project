"use client"

import { Inter } from 'next/font/google'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import dotenv from "dotenv"
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

dotenv.config()

export default function Home() {

  ChartJS.register(ArcElement, Tooltip, Legend);
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/balance')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  })

  return (
    <main className={`${inter.className} w-full h-full flex flex-col items-center justify-center`}>
      <div className='flex flex-col items-center justify-center space-y-10'>
        <h1 className='text-2xl font-semibold'>My ETH Crypto Portfolio from chainbase</h1>
        <Pie data={
          {
            labels: ['Polygon', 'Optimism', 'Avalanche'],
            datasets: [
              {
                label: "Blockchains",
                data: [data?.polygon, data?.ethereum, data?.optimism],
                backgroundColor: ["purple", "blue", "red"],
              },
            ],
          }
        } />
      </div>
    </main>
  )
}
