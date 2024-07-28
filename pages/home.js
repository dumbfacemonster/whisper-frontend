import Home from '../components/Home';
import Head from 'next/head';

function HomePage() {
  return (
    <>
      <Head>
        <title>Home / Whisper</title>
      </Head>
      <Home />
    </>
  );
}

export default HomePage;