import React, {useState, useEffect, useRef} from 'react'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react'
import {HeaderMessage, FooterMessage} from '../components/Common/WelcomeMessage'
import CommonInputs from '../components/Common/CommonInputs';
import ImageDrop from '../components/Common/ImageDrop';

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

function Signup() {
  const [user, setUser] = useState({
    name:"", email: "", password: "", bio: "", 
    github: "", linkedin: "",
    twitter: "", instagram: "", youtube: ""
  });

  const {name, email, password, bio} = user

  const [showSocialLink, setShowSocialLink] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [userName, setUserName] = useState('')
  const [usernameLoading, setUsernameLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [media, setMedia] = useState(null)
  const [mediaPreview, setMediaPreview] = useState(null)
  const [highlighted, setHighlighted] = useState(false)
  
  const inputRef = useRef()
  
  const handleOnSubmit = e => e.preventDefault();

  const handleOnChange= (e) => {
    const {name, value, files} = e.target;

    if(name==="media"){
      setMedia(files[0])
      setMediaPreview(URL.createObjectURL(files[0]))
    }

    setUser(prev => ({ ...prev, [name]: value }))
  };

  useEffect(() => {
    const isUser = Object.values({name,email,password,bio}).every(item => Boolean(item))
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
      <ImageDrop mediaPreview = {mediaPreview} setMediaPreview = {setMediaPreview}
      setMedia = {setMedia} inputRef = {inputRef} highlighted = {highlighted}
      setHighlighted = {setHighlighted} handleOnChange = {handleOnChange}
      />
        <Form.Input label = "Name" 
        placeholder="Name" name ="name" value = {name} onChange={handleOnChange} 
        fluid icon="user" required/>
        <Form.Input label = "Email" 
        placeholder="Email" name ="email" value = {email} onChange={handleOnChange} 
        fluid icon="envelope" type="email" required/>
        <Form.Input label = "Password" 
        placeholder="Password" name ="password" value = {password} onChange={handleOnChange} 
        fluid icon={{
          name: "eye", circular: true, link: true, onClick:()=> setShowPassword(!showPassword)
        }} type={showPassword ? "text" : "password"}
        required/>

      <Form.Input loading = {usernameLoading} error = {!usernameAvailable}
        label = "Username" 
        placeholder="Username" value = {userName} 
        onChange={e => { setUserName(e.target.value)
        if(regexUserName.test(e.target.value)){
          setUsernameAvailable(true);
        } else {
          setUsernameAvailable(false);
        }
        }} 
        fluid icon={usernameAvailable ? "check" : "close"} required/>

      <CommonInputs user={user} showSocialLink={showSocialLink} setShowSocialLink={setShowSocialLink}
      handleOnChange = {handleOnChange} />

      <Divider hidden />
      <Button icon="signup"
      content="Signup" type="submit" color="red" 
      disabled={submitDisabled || !usernameAvailable}></Button>

      </Segment>
      </Form>
      <FooterMessage />
    </>
  )
}

export default Signup;
