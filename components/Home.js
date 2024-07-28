import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import { addTweet, removeTweet } from '../reducers/tweets';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LastTweets from './LastTweets';
import Trends from './Trends';
import ScrollToTop from 'react-scroll-to-top';

function Home() {

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const tweets = useSelector((state) => state.tweets.value);

  const [newTweet, setNewTweet] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/')
  }

  useEffect(() => {
    if (!user.token) {
      router.push('/');
    }
  }, [])

  const handleTweet = () => {
    if (newTweet.length < 1 || !user.token) {
      setErrorMessage(true);
      return;
    }
    else {
      const sendTweet = {
        author: user.token,
        content: newTweet,
      }
      fetch('http://localhost:3000/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendTweet)
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          data.result === true ? dispatch(addTweet(data.newTweet)) : console.log('Add to reducer failed');
        })
      setNewTweet('');
    }
  }




  return (
    <div className={styles.homePage}>
      <div className={styles.leftContainer}>
        <Link href='/'>
          <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
        </Link>
        <div className={styles.userSection}>
          <img src='profile-pic.png' alt="Photo de profil" className={styles.profilePic} />
          <div className={styles.userInfo}>
            <p className={styles.firstname}>
              {user.firstname}
            </p>
            <p className={styles.username}>
              @{user.username}
            </p>
          </div>
        </div>
        <button onClick={() => handleLogout()} className={styles.logout}>Logout</button>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.topMiddle}>
          <div className={styles.home}>
            <h3 className={styles.title}>Home</h3>
          </div>
          <div className={styles.newTweetBox}>
            <textarea rows="3" onChange={(e) => setNewTweet(e.target.value)} value={newTweet} maxLength={280} className={styles.tweetInput} placeholder="What's up ?" />
            <div className={styles.underInput}>
              {errorMessage === true ? (
                <p className={styles.errorMessage}>Can't whisp in these conditions !</p>
              ) : null}
              <p className={styles.counter}>{newTweet.length}/280</p>
              <button onClick={() => handleTweet()} className={styles.newTweet}>Tweet</button>
            </div>
          </div>
        </div>
        <div className={styles.lastTweets}>
          <LastTweets />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h3 className={styles.title}>Trends</h3>
        <div className={styles.allTrendsBox}>
          <Trends />
        </div>
      </div>
      <ScrollToTop smooth={true} color="#ffffff" className={styles.ScrollToTop} />
    </div>
  );
}


export default Home;
