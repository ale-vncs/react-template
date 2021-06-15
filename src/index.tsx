import React, { useEffect } from 'react'
import Button from '@components/Button'
import ReactDOM from 'react-dom'

const App = () => {
  console.log('ff')
  return (
    <>
      <Button name={'Aperte'} />
      <h1>My React and TypeScript App!</h1>
      <h1>mode: {process.env.NODE_ENV}</h1>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
