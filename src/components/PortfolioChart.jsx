/** @format */
import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'

ChartJS.register(ArcElement, Tooltip, Legend)

const ChartContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const DataContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}))

const PortfolioChart = ({ portfolioData }) => {
  const [chartData, setChartData] = useState({})
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    if (portfolioData && portfolioData.length > 0) {
      const labels = portfolioData.map((crypto) => crypto.name)
      const values = portfolioData.map(
        (crypto) => crypto.amount * crypto.priceUsd
      )
      const totalPortfolioValue = values.reduce((acc, value) => acc + value, 0)
      setTotalValue(totalPortfolioValue)
      const percentages = values.map((value) =>
        ((value / totalPortfolioValue) * 100).toFixed(2)
      )
      const chartData = {
        labels: labels,
        datasets: [
          {
            data: percentages,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
            ],
          },
        ],
      }
      setChartData(chartData)
    }
  }, [portfolioData])

  return (
    <Grid container spacing={2} style={{ marginTop: '1rem' }}>
      <ChartContainer item xs={12} md={6}>
        {chartData.labels && <Doughnut data={chartData} />}
      </ChartContainer>
      <DataContainer item xs={12} md={6}>
        <Typography variant='h6'>Total Portfolio Value</Typography>
        <Typography variant='h4'>${totalValue.toFixed(2)}</Typography>
        <Typography variant='h6'>Cryptocurrencies</Typography>
        {portfolioData.map((crypto, index) => (
          <Typography key={index}>
            {crypto.name}: ({crypto.amount * crypto.priceUsd.toFixed(2)}$)
          </Typography>
        ))}
      </DataContainer>
    </Grid>
  )
}

export default PortfolioChart
