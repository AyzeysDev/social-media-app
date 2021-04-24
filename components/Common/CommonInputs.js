import React from 'react'
import { Form, Button, Message, Segment, TextArea, Divider } from 'semantic-ui-react'

function CommonInputs({user: {bio, twitter, 
  linkedin, github, instagram, youtube}, handleOnChange, 
  showSocialLink, setShowSocialLink}) {
  return (
    <>
      <Form.Field required control={TextArea} 
      name ="bio"  value={bio}
      onChange={handleOnChange}
      placeholder="bio" />
      <Button content="Add Social Links" color="blue" icon="at" type="button"
      onClick={() => setShowSocialLink(!showSocialLink)} />
      {showSocialLink && <>
      <Divider />
      <Form.Input icon= "github" name="github" value={github} onChange={handleOnChange} />
      <Form.Input icon= "linkedin" name="linkedin" value={linkedin} onChange={handleOnChange} />
      <Form.Input icon= "twitter" name="twitter" value={twitter} onChange={handleOnChange} />
      <Form.Input icon= "instagram" name="instagram" value={instagram} onChange={handleOnChange} />
      <Form.Input icon= "youtube" name="youtube" value={youtube} onChange={handleOnChange} />

      <Message icon="attention" info size ="small" header="Social Media Links are Optional!" />

      </>}

    </>
  )
}

export default CommonInputs
