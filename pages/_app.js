import { SessionProvider } from "next-auth/react"
import Head from 'next/head' 
import Footer from '../components/Footer'
import '../styles/globals.css' 
  
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
<SessionProvider session={session}>
      <Component {...pageProps} /> 
      <Footer></Footer> 
</SessionProvider>
    </>
  )
}