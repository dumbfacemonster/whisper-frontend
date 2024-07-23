import styles from '../styles/Login.module.css';
import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

function Login() {

const [signUpOpen, setSignUpOpen] = useState(false);
const [signInOpen, setSignInOpen] = useState(false);

  return (
    <div>
      <div className={styles.imgContainer}>
        <img src="login-img.png" alt="Twitter image" />
      </div>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>See what's happening</h1>
        <h2 className={styles.secondTitle}>Join Twitter today.</h2>
        <button className={styles.signUp} onClick={() => setSignUpOpen(!signUpOpen)}>Sign Up</button>
        <p className={styles.text}>Already have an account ?</p>
        <button className={styles.signIn} onClick={() => setSignInOpen(!signInOpen)}>Sign in</button>
      </div>
        <SignIn isOpen={signInOpen} onClose={() => setSignInOpen(!signInOpen)} />
        <SignUp isOpen={signUpOpen} onClose={() => setSignUpOpen(!signUpOpen)} />
    </div>
  );
}

export default Login;
