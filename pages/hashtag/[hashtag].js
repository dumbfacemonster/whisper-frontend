import { useRouter } from 'next/router';
import Hashtag from './../../components/Hashtag'
import Head from 'next/head';
 
function HashtagPage() {
    const router = useRouter();
    const { hashtag } = router.query;

    return (
        <>
          <Head>
            <title>#{hashtag} / Whisper</title>
          </Head>
          <Hashtag />
        </>
      );
  }
  
  export default HashtagPage;

