import { useState } from 'react';
import { signIn, signUp, getUser } from './services/fetch-utils.js';

export default function AuthPage({ setEmail, setToken }) {
  // you'll need to track the form state of the email and password for sign in, and separate state for sign up
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [signUpFormData, setSignUpFormData] = useState({
    email: '', 
    password: ''
  });

  async function handleSignIn(e) {
    e.preventDefault();
      
    // sign the user in using the form state
    await signIn(signInEmail, signInPassword);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    const {
      access_token, 
      user: {
        email,
      }
    } = getUser();

    setEmail(email);
    setToken(access_token);
  }
    
  async function handleSignUp(e) {
    e.preventDefault();
    // sign the user up using the form state
    await signUp(signUpFormData.email, signUpFormData.password);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    const {
      access_token, 
      user: {
        email,
      }
    } = getUser();

    setEmail(email);
    setToken(access_token);
  }

  return (
    <div className='auth'>
      <h1><em>Boardzo</em></h1>
      {/* on submit, sign the user up using the function defined above */}
      <form onSubmit={handleSignUp}>
        <label>
            Email
          {/* on change, update the form state for email */}
          <input value={signUpFormData.email} onChange={(e) => setSignUpFormData({
            email: e.target.value,
            password: signUpFormData.password,
          })} required type="email" name="email" />
        </label>
        <label>
            Password
          {/* on change, update the form state for password */}
          <input value={signUpFormData.email} onChange={(e) => setSignUpFormData({
            email: signUpFormData.email,
            password: e.target.value,
          })}required type="password" name="password" />
        </label>
        <button>Sign Up</button>
      </form>
      {/* on submit, sign the user in using the function defined above */}
      <form>
        <label>
            Email
          {/* on change, update the form state for email */}
          <input value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} required type="email" name="email" />
        </label>
        <label>
            Password
          {/* on change, update the form state for password */}
          <input value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required type="password" name="password" />
        </label>
        <button>Sign In</button>
      </form>
    </div>
  );
}
