import styles from '../styles/Trends.module.css';
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
import ScrollToTop from 'react-scroll-to-top';

function Trends() {

    const tweets = useSelector((state) => state.tweets.value);
    //création tableau d'objets Trends avec # répertoriés
    const [trendsData, setTrendsData] = useState([]);
    //console.log(tweets)

useEffect(() => {
    fetch('http://localhost:3000/tweets/trends')
    .then(resp => resp.json())
    .then(data => {
        if(data.result){
       // console.log(data)
        setTrendsData(data.trends)
        }
        else {
            console.log('Error getting trends')
        }
    })
     
}, [tweets])


const formattedTrends = trendsData.map((data, i) => {
    return (
            <Link key={i} href={`/hashtag/${data.tag}`}>
              <div className={styles.tweetContainer}>
                <h3 className={styles.hashtag}>#{data.tag}</h3>
                <h4 className={styles.nbrTweet}>{data.nb} Tweet{data.nb > 1 && 's'}</h4>
              </div>
            </Link>
      
          );
});

  /*const formattedTrends = trendsData.map((data, i) => {
        return (
            <Link key={i} href={`/hashtag/${data.tag.slice(1)}`} className={styles.hashtagBox}>
                <div className={styles.hashtagTitle}>{data.tag}</div>
                {data.nb === 1 ? (
                    <div className={styles.hashtagNb}>{data.nb} Tweet</div>)
                    : (<div className={styles.hashtagNb}>{data.nb} Tweets</div>)}
            </Link>
        )
    }) */

    return (
        <>
            <div className={styles.allHashtags}>
                {formattedTrends}
            </div>
        </>

    )
}

export default Trends;