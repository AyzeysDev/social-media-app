import React from 'react'
import {useState, useEffect, useRef} from 'react'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import {HeaderMessage, FooterMessage} from '../components/Common/WelcomeMessage'

function Login() {
  const [user, setUser] = useState({
    email: "", password: ""
  });

  const {email, password } = user

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(true)
 
  const handleOnChange= (e) => {
    const {name, value} = e.target;

    setUser(prev => ({ ...prev, [name]: value }))
  };

  const handleOnSubmit = e => e.preventDefault();

  useEffect(() => {
    const isUser = Object.values({email,password}).every(item => Boolean(item))
    isUser ? setSubmitDisabled(false): setSubmitDisabled(true)
  }, [user])

  return (
    <>
      <HeaderMessage />
      <Form loading={formLoading} 
      error={errorMessage !== null} 
      onSubmit={handleOnSubmit}>
      <Message error header="Oops!" content= {errorMessage} 
      onDismiss={() => setErrorMessage(null)}
      />
      <Segment>
      <Form.Input label = "Email" 
        placeholder="Email" name ="email" value = {email} onChange={handleOnChange} 
        fluid icon="envelope" type="email" required/>
        <Form.Input label = "Password" 
        placeholder="Password" name ="password" value = {password} onChange={handleOnChange} 
        fluid icon={{
          name: "eye", circular: true, link: true, onClick:()=> setShowPassword(!showPassword)
        }} type={showPassword ? "text" : "password"}
        required/>
         <Divider hidden />
      <Button icon="signup"
      content="Login" type="submit" color="red" 
      disabled={submitDisabled}></Button>
      </Segment>
      </Form>
      <FooterMessage />
    </>
  )
}

export default Login
