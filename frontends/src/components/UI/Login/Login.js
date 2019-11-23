import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

const login = (props) => {
  let error, loader;
  const button = props.username ? 'secondary' : 'disabled';
  if (props.error !== 'none') {
    error = 'primaryError';
  } else {
    error = 'primary';
  }
  if (props.isSigningIn) loader = <div></div>;
  return (
    <div>
      <div onClick={props.closeLogin}></div>
      <section>
        <div>
          <div>Username</div>
          <div>
            <Input
              required={true}
              skin={error}
              onChange={props.handleChangeLogin}
              type='text'
              placeholder='username'
              name='username'
            />
          </div>
        </div>
        <div>
          <div>Password</div>
          <div>
            <Input
              required={true}
              skin={error}
              onChange={props.handleChangeLogin}
              type='password'
              placeholder='password'
              name='pass'
            />
          </div>
        </div>
        <div>
          <Button text='Submit' skin={button} onClick={props.login} />
        </div>
      </section>
      {loader}
    </div>
  );
};

export default login;
