/** @format */

import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { enUS } from 'date-fns/locale'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale
)

const CryptoPriceChart = ({ cryptoId }) => {
  const [priceData, setPriceData] = useState([])

  const [timeInterval, setTimeInterval] = useState('d1')

  const fetchPriceData = async () => {
    try {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=${timeInterval}`
      )
      const data = await response.json()
      setPriceData(data.data)
    } catch (error) {
      console.error('Error fetching price data:', error)
    }
  }

  useEffect(() => {
    fetchPriceData()
  }, [cryptoId, timeInterval])

  const chartData = {
    labels: priceData.map((entry) => entry.date),
    datasets: [
      {
        label: 'Price (USD)',
        data: priceData.map((entry) => entry.priceUsd),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        adapters: {
          date: {
            locale: enUS,
          },
        },
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  }

  const handleTimeIntervalChange = (interval) => {
    setTimeInterval(interval)
  }

  return (
    <div>
      <h2>Price Chart for {cryptoId}</h2>
      <div>
        <div>
          <button onClick={() => handleTimeIntervalChange('m1')}>m1</button>
          <button onClick={() => handleTimeIntervalChange('m5')}>m5</button>
          <button onClick={() => handleTimeIntervalChange('m15')}>m15</button>
          <button onClick={() => handleTimeIntervalChange('m30')}>m30</button>
          <button onClick={() => handleTimeIntervalChange('h1')}>h1</button>
          <button onClick={() => handleTimeIntervalChange('h2')}>h2</button>
          <button onClick={() => handleTimeIntervalChange('h6')}>h6</button>
          <button onClick={() => handleTimeIntervalChange('h12')}>h12</button>
          <button onClick={() => handleTimeIntervalChange('d1')}>d1</button>
        </div>
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default CryptoPriceChart
