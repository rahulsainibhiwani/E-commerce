import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({varient,message}) => {
  return  <Alert variant={varient}>{message}</Alert>  
}

Message.defaultProps={
    varient:"info"
}

export default Message