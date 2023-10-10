/** @format */
import { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'

const AddRemovePortfolio = ({ isInPortfolio, onTogglePortfolio }) => {
  const [amount, setAmount] = useState(0)
  const handleInputChange = (event) => {
    setAmount(event.target.value)
  }

  return (
    <Box display='flex' alignItems='center'>
      <TextField
        type='number'
        value={amount}
        onChange={handleInputChange}
        inputProps={{ min: 0 }}
        size='small'
        style={{ marginRight: '8px' }}
        disabled={isInPortfolio}
      />
      <Button
        onClick={() => onTogglePortfolio(amount)}
        variant='outlined'
        color='primary'>
        {isInPortfolio ? 'remove' : '+portfolio'}
      </Button>
    </Box>
  )
}

export default AddRemovePortfolio
