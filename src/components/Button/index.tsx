import React from "react";

interface Props {
  name: string
}

const Button = (props: Props): JSX.Element => {
  return (
    <input type={'button'} value={props.name}/>
  )
}

export default Button
