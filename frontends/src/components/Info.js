import React from 'react';
import { Button, Label, Input } from 'reactstrap';

const Info = (props) => {
  return (
    <div>
      <Label>Username</Label>
      <Input
        type='text'
        name='username'
        id='exampleUsername'
        placeholder='username'
        onChange={props.handleChangeLogin}
      />

      <Label>Password</Label>
      <Input
        type='password'
        name='pass'
        id='examplePassword'
        placeholder='password'
        onChange={props.handleChangeLogin}
      />

      <Button onClick={props.login}>Submit</Button>
    </div>
  );
};

export default Info;
