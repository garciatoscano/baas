import Head from 'next/head' 
import Image from 'next/image';
import Link from 'next/link' 
import { getMetaTags,getSolucion1 } from "../lib/notion-api"; 
 

export default function Solucion1({ metaTags,solucion_1}) { 

const {title,description,author,keywords} = metaTags; 
const {solucion} = solucion_1; 

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
<div className="bg-fondo hero h-screen ">
 
    <div className="card w-100 bg-base-100 shadow-xl animate-pulse ">
  <div className="card-body text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold text-white">{solucion}</h1> 
 
    </div>
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
  const solucion_1 = await getSolucion1(databaseId); 

  return {
    props: {
      metaTags:metaTags,
      solucion_1:solucion_1
    },
    revalidate: 1,
  };
};
 
