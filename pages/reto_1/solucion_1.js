import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { getMetaTags, getSolucion1 } from "../../lib/notion-api";

export const databaseId = process.env.NOTION_DATABASE_ID;
export const databaseUsers = process.env.NOTION_DATABASE_USERS;

export default function Solucion1({ metaTags, solucion_1 }) {
  const { title, description, author, keywords } = metaTags;
  const { solucion } = solucion_1;

  return (
    <>
      <Head>
        <title>R1 - {title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="athor" content={author} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="flex-grow">
        <div className="bg-fondo hero h-screen">
          <div className="card w-100 bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="max-w-md">
                <h1 className="text-7xl font-bold text-white  animate-pulse ">
                  {solucion}
                </h1>
                <p className="pb-9 text-3xl text-accent">
                  Has encontrado tu primer Oro!
                </p>
                <h2 className=" font-bold text-white">¿Quieres más...?</h2>
                <Link href="/reto_2/picar">
                  <a className="btn btn-accent btn-lg text-xl mt-6">
                    Continuar ...
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const metaTags = await getMetaTags(databaseId);
  const solucion_1 = await getSolucion1(databaseId);

  return {
    props: {
      metaTags: metaTags,
      solucion_1: solucion_1,
    },
    revalidate: 1,
  };
};
