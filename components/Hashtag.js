import styles from '../styles/Hashtag.module.css';
import { useState, useEffect } from 'react';
import { getAllTrendTweets } from '../reducers/tweets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Trends from './Trends';
import Tweet from './Tweet';


function Hashtag() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const tweetsData = useSelector((state) => state.tweets.value);

  // Redirect to / if not logged in
  const router = useRouter();
  //const { hashtag } = router.query;
  //const [hashtag, setHashtag] = useState('')
  const { hashtag } = router.query;
  if (!user.token) {
    router.push('/');
  }
  console.log(router.query.hashtag)
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!hashtag) {
      return;
    }
    setQuery(router.query.hashtag);

    fetch(`https://whisper-backend-two.vercel.app/tweets/trend/${router.query.hashtag}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        dispatch(getAllTrendTweets(data.tweets))})
  }, [hashtag]);

  const handleSubmit = () => {
    if (query.length > 1) {
      router.push(`/hashtag/${query}`);
      hashtag = query
    }
    else {
      setQuery('Invalid search')
    }
  };

  const tweets = tweetsData.map((data, i) => {
    return <Tweet key={i} {...data} />;
  });
  console.log(tweets)

  return (
    <div className={styles.hashtagPage}>
      <div className={styles.leftContainer}>
        <div>
          <Link href="/">
            <FontAwesomeIcon icon={faGhost} className={styles.icon} />
          </Link>
        </div>
        <div>
          <div className={styles.userSection}>
            <div>
              <img src='../profile-pic.png' className={styles.profilePic} alt='Profile picture' />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.firstname}>{user.firstname}</p>
              <p className={styles.username}>@{user.username}</p>
            </div>
          </div>
          <button onClick={() => { router.push('/'); dispatch(logout()); }} className={styles.logout}>Logout</button>
        </div>
      </div>

      <div className={styles.middleContainer}>
        <div className={styles.topMiddle}>
        <div className={styles.home}>
            <h3 className={styles.title}>Hashtags</h3>
          </div>
        
          <div className={styles.searchSection}>
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              value={query}
              className={styles.searchBar}
              placeholder='#'
            />
            </div>
          </div>
          { tweets.length >=1 ? ( <div> {tweets} </div> ) : (<p className={styles.noTweet}>No tweets found with #{hashtag}</p>)}
        </div>

      <div className={styles.rightSection}>
        <h2 className={styles.title}>Trends</h2>
        <Trends />
      </div>
    </div>
  );

/*   const user = useSelector((state) => state.user.value);
  const tweetsData = useSelector((state) => state.tweets.value);
  const [tagged, setTagged] = useState([]);

  const router = useRouter();
  const { hashtag } = router.query;
  if (!user.token) {
    router.push('/');
  };
  const [query, setQuery] = useState('#');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hashtag) {
      return;
    }

    setQuery('#' + hashtag);
    console.log(query)


fetch(`http://localhost:3000/tweets/trends/${query}`)
      .then(response => response.json())
      .then(data => {
        data.result && dispatch(getAllTrendTweets(data.tweets));
      });
      setTagged(tweetsData)
  }, [hashtag]);

  const handleSubmit = () => {
    if (query.length > 1) {
      router.push(`/hashtag/${query.slice(1)}`);
    }
  };

  console.log(tagged)
 

  const tweets = tagged.map((data, i) => {
    return <Tweet key={i} {...data} />;
  });
  

  return (
    <div className={styles.hashtagPage}>
      <div className={styles.leftContainer}>
          <Link href="/">
          <FontAwesomeIcon icon={faGhost} className={styles.icon} />
          </Link>
        <div>
          <div className={styles.userSection}>
            <div>
            <img src='profile-pic.png' className={styles.profilePic} alt='Profile picture' />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.firstname}>{user.firstName}</p>
              <p className={styles.username}>@{user.username}</p>
            </div>
          </div>
          <button onClick={() => { router.push('/'); dispatch(logout()); }} className={styles.logout}>Logout</button>
        </div>
      </div>

      <div className={styles.middleContainer}>
        <h2 className={styles.title}>Hashtag</h2>
        <div>
          <div className={styles.search}>
            <input
              type="text"
              onChange={(e) => setQuery('#' + e.target.value.replace(/^#/, ''))}
              onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
              value={query}
              className={styles.searchBar}
            />
          </div>
         {/*  {tweetsData.length === 0 && <p className={styles.noTweet}>No tweets found with #{hashtag}</p>} }
          {tweets}
        </div>
      </div>

      <div className={styles.rightContainer}>
        <h2 className={styles.title}>Trends</h2>
        <Trends />
      </div>
    </div>
  );*/
} 


export default Hashtag;
