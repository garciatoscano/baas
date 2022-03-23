import Head from 'next/head'  
import Link from 'next/link'   
import Image from 'next/image'   
import { useSession} from "next-auth/react"
import { getMetaTags } from "../lib/notion-api"

import AccessDenied from '../components/accessDenied'



export default function PicarAuth({metaTags ,textos}) { 
const {title,description,author,keywords} = metaTags;  
 

  const { data: session, loading } = useSession();
 
if (typeof window !== 'undefined' && loading) return null

if (!session) { return  <><AccessDenied/></> }  
  return (
    <>
    <Head> 
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="athor" content={author} />
        <meta name="keywords" content={keywords} /> 
    </Head> 
    <div className="bg-fondo hero min-h-screen ">
        <div className="card w-100 bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <div className="max-w-md"> <Image
                    src={session.user.image}
                    className="rounded-full h-16 w-16 mx-auto "
                    width="30" height="30" />
                <p className="pb-10 text-2xl"> {session.user.name} </p>  
                <Link href="/solucion_1">
                <a className="btn btn-accent btn-lg">Puedes picar <span className=" pl-3 ">⛏️</span></a>
                </Link>
                </div>
            </div>
        </div>
    </div>
    </> 
  )
}



export const databaseId = process.env.NOTION_DATABASE_ID;

export const getStaticProps = async () => {
 
  const metaTags = await getMetaTags(databaseId);  

  return {
    props: {
      metaTags:metaTags
    },
    revalidate: 1,
  };
};
 
