import Button from '@components/Button'
import React from 'react'

export const App = () => {
  return (
    <>
      <Button name={'Aperte'} />
      <h1>My React and TypeScript App!</h1>
      <h1>mode: {process.env.NODE_ENV}</h1>
      <h1>api: {process.env.ENV_API}</h1>
    </>
  )
}
