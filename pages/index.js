import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { getMetaTags, getTextos } from "../lib/notion-api";
import Footer from "../components/Footer";
export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Index({ metaTags, textos }) {
  const [loadingButton, setLoadingButton] = useState(false);

  const { title, description, author, keywords } = metaTags;
  const { h1, hero_text, copy01 } = textos;

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
            <div className="max-w-md">
              <h1 className="text-3xl font-bold text-white">{h1}</h1>
              <p className="py-6">{hero_text}</p>
              <p className="py-6">{copy01}</p>
              {!loadingButton ? (
                <Link href="/reto_1/intermedio_1">
                  <a
                    className="btn btn-accent btn-lg text-3xl"
                    onClick={() => setLoadingButton(true)}
                  >
                    
                    picar!!! <span className="animate-spin ">⛏️</span>
                  </a>
                </Link>
              ) : (
                <p className="text-4xl text-accent">
                  Picando, picando! ...⛏️⛏️⛏️
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer textos={textos}></Footer>
    </>
  );
}

export const getStaticProps = async () => {
  const metaTags = await getMetaTags(databaseId);
  const textos = await getTextos(databaseId);

  return {
    props: {
      metaTags: metaTags,
      textos: textos,
    },
    revalidate: 1,
  };
};
