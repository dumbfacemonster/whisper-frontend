import styles from '../styles/Login.module.css';
import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function Login() {

  const user = useSelector((state) => state.user.value)

  const router = useRouter();
  if (user.token) {
    router.push('/home');
  }

const [signUpOpen, setSignUpOpen] = useState(false);
const [signInOpen, setSignInOpen] = useState(false);

console.log(signInOpen)

  return (
    <div className={styles.loginPage}>
      <div className={styles.imgContainer}>
      <FontAwesomeIcon icon={faGhost} className={styles.imgIcon} />
        <img className={styles.image} src="login-img.jpeg" alt="Whisper scenery image" />
      </div>
      <div className={styles.loginContainer}>
        <FontAwesomeIcon icon={faGhost} className={styles.icon} />
        <h1 className={styles.title}>See what's<br />happening</h1>
        <h2 className={styles.secondTitle}>Join Whisper today.</h2>
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
