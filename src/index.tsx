import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@components/Button'

const App = () => {
  return (
    <>
      <Button name={'Aperte'} />
      <h1>My React and TypeScript App!</h1>
      <h1>mode: {process.env.NODE_ENV}</h1>
      <h1>api: {process.env.ENV_API}</h1>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
