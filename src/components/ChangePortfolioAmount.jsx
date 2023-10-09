/** @format */
import { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'

const ChangePortfolioAmount = ({ onAdd, onSubtract, onDelete }) => {
  const [number, setNumber] = useState(0)

  const handleInputChange = (event) => {
    setNumber(event.target.value)
  }

  return (
    <Box display='flex' alignItems='center'>
      <TextField
        type='number'
        value={number}
        onChange={handleInputChange}
        inputProps={{ min: 0 }}
        size='small'
        style={{ marginRight: '8px' }}
      />
      <Button
        onClick={() => onAdd(number)}
        variant='outlined'
        color='primary'
        disabled={!number}>
        +
      </Button>
      <Button
        onClick={() => onSubtract(number)}
        variant='outlined'
        color='secondary'
        style={{ marginLeft: '8px' }}
        disabled={!number}>
        -
      </Button>
      <Button
        onClick={() => onDelete()}
        variant='outlined'
        color='error'
        style={{ marginLeft: '8px' }}>
        Delete
      </Button>
    </Box>
  )
}

export default ChangePortfolioAmount
