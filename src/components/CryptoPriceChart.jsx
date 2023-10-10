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
import Button from '@mui/material/Button'
import { ButtonGroup, Paper } from '@mui/material'

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

  const timeIntervals = [
    'm1',
    'm5',
    'm15',
    'm30',
    'h1',
    'h2',
    'h6',
    'h12',
    'd1',
  ]

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
    <Paper>
      <h2>Price Chart for {cryptoId}</h2>
      <div>
        <div>
          <ButtonGroup
            variant='contained'
            aria-label='outlined primary button group'>
            {timeIntervals.map((interval) => (
              <Button
                key={interval}
                variant='contained'
                color={interval === timeInterval ? 'primary' : 'secondary'}
                onClick={() => handleTimeIntervalChange(interval)}>
                {interval}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
      <Line data={chartData} options={chartOptions} />
    </Paper>
  )
}

export default CryptoPriceChart
