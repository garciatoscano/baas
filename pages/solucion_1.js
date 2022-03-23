import Head from 'next/head' 
import Image from 'next/image' 
import Link from 'next/link' 
import React from "react";
import moment from "moment";
import { useSession, getSession,signIn, signOut } from "next-auth/react"
import { getMetaTags,getSolucion1,savePicanter } from "../lib/notion-api"
 

export const databaseId = process.env.NOTION_DATABASE_ID;
export const databaseUsers = process.env.NOTION_DATABASE_USERS;

export default function Solucion1({ metaTags,solucion_1}) { 

  const { data: session, loading,status } = useSession();

  const {title,description,author,keywords} = metaTags; 
  const {solucion} = solucion_1; 
  
  if (session && status == 'authenticated') { 
      console.log('session',session,session.user.email , loading,status)
 
 savePicanter(databaseUsers,session.user.email, moment().format("YYYY-MM-DD"));

  } 

  return (
    <>
    <Head> 
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="athor" content={author} />
        <meta name="keywords" content={keywords} /> 
    </Head> 
    
    <div className='flex-grow'>
        <div className="bg-fondo hero h-screen">
          <div className="card w-100 bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-bold text-white  animate-pulse ">{solucion}</h1> 
                    <p>Has encontrado tu primer Oro! </p>
                    <h2 className="text-3xl font-bold text-white">¿Quieres más...?</h2> 
                  </div>
                </div> 

              <div className="card w-100 bg-base-100 shadow-xl">
                <div className="card-body text-center"> 
                  <div className="max-w-md">
                 
                    {!session ? (
                              <>
                                <p>Necesitamos tu nombre ... Identifícate! (por favor)</p>
                                  <button onClick={() => signIn("github")} className="btn btn-md mt-10 text-white"> 
                                  <Image src="/icons8-github-30.png" width="30" height="30" className="mx-4"/> Entrar </button>
                              </>
                          ) : (
                              <> 
                                  <h2  className="text-3xl font-bold text-white">
                                      Hola, {session.user.name || session.user.email}! </h2><button onClick={signOut} className="btn btn-xs btn-outline mb-9"> Desconectar</button>


                    <Link href="/picar_auth">
                      <a className="btn btn-accent btn-lg text-3xl"> Vamos a darle al pico! <span className=" ">⛏️</span></a>
                    </Link> 
        </>
                          )}
              
                  </div>
                </div> 
              </div>
          </div>
        </div>
    </div>
    </> 
  )
}



;

export const getStaticProps = async () => { 

  const metaTags = await getMetaTags(databaseId); 
  const solucion_1 = await getSolucion1(databaseId); 
 
  return {
    props: {
      metaTags:metaTags,
      solucion_1:solucion_1 
    },
    revalidate: 1,
  };
};
 
