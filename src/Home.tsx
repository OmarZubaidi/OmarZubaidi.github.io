import Footer from './components/Footer';
import Header from './components/Header';

/** Home page component */
export default function Home() {
  return (
    <>
      <Header />
      <div aria-hidden style={{ height: 'var(--header-height)' }} />
      {/* todo add body here */}
      <div aria-hidden style={{ height: 'var(--footer-height)' }} />
      <Footer />
    </>
  );
}
