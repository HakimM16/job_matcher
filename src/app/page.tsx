'use client';

import Image from 'next/image';
import ResumeAnalyser from './components/ResumeAnalyser';
import styles from './styles/Home.module.css';
import Logo from './logo.png';

export default function Home() {
  return (
    <main className={styles.App}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.centeredContent}>
            <div className={styles.logoBox}>
              <Image src={Logo} alt='InterviewGPT logo' width={400} height={200} />
            </div>
            <div>
              <ResumeAnalyser />
            </div>
          </div>
        </div>
        <p className={styles.footer}>Built by <a href='https://www.linkedin.com/in/hakim-mabike-643848214' target='_blank'>Hakim Mabike</a></p>
      </div>
    </main>
  )
}