import Head from "next/head"; 
import Link from "next/link";
import { getMetaTags, getTextos } from "../../lib/notion-api";
import Footer from "../../components/Footer";

export default function Intermedop1({ metaTags, textos }) {
  const { title, description, author, keywords } = metaTags;
  const { copy02 } = textos;

  return (
    <>
      <Head>
        <title>R1 - {title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="athor" content={author} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="bg-fondo hero min-h-screen ">
        <div className="card w-100 bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <div className="max-w-md">
              <p className="py-10">{copy02}</p>
              <Link href="/reto_1/solucion_1">
                <a className="btn btn-accent btn-lg text-3xl">
                  Volver a picar!!! <span className="animate-spin ">⛏️</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer textos={textos}></Footer>
    </>
  );
}

export const databaseId = process.env.NOTION_DATABASE_ID;

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
