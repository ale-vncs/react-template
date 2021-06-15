import React from 'react'

interface Props {
  name: string
}

const Button = (props: Props) => {
  return <input type={'button'} value={props.name} />
}

export default Button
