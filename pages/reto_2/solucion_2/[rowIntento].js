import Link from "next/link";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useSession, getSession, signOut } from "next-auth/react";
import { getMetaTags, getStatsUser,getTextos } from "../../../lib/notion-api";
import Footer from "../../../components/Footer";

export const databaseId = process.env.NOTION_DATABASE_ID;
export const databaseUsers = process.env.NOTION_DATABASE_USERS;

export default function Solucion_r2({ metaTags, statsUser,textos }) {
  const { data: session } = useSession();
  if (!session) {
    router.push("/reto_2/picar");
  }

  const [showModal, setShowModal] = React.useState(false);
  const { totalIntentos, incompletos, completos } = statsUser;
 

  const { title, description, author, keywords } = metaTags;

  const router = useRouter();

  return (
    <>
      <Head>
        <title>R2 - {title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="athor" content={author} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="flex-grow">
        <div className="bg-fondo  hero h-screen">
          <div className="card w-1/2 bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className=" w-full">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-accent">
                    {textos.r2_solucion_auth_line_1}
                  </h2>
                  <p className="pb-1 text-7xl">{textos.r2_solucion_auth_line_2}</p>
                  <Link href="/reto_2/picar">
                    <a className="btn btn-accent btn-lg mt-6">
                    {textos.r2_solucion_auth_btn}
                    </a>
                  </Link>
                  <div>
                    <button
                      onClick={signOut}
                      className="btn btn-xs btn-outline-secondary  text-xs my-1"
                    >
                      {textos.btn_logout}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg shadow-inner border border-slate-900 p-3 pb-10">
                  <p className="text-xl pt-6  ">
                    {session.user.name || session.user.email}
                    <br /> {textos.r2_solucion_auth_line_stats}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-4 place-items-center ...">
                    <div className="text-slate-400  border border-slate-500 rounded-lg shadow-lg p-3">
                      <p className="text-5xl font-bold text-slate-100">
                        {totalIntentos}
                      </p>
                      <p className="  text-slate-400">
                        {totalIntentos === 1 ? "Intento" : "Intentos"}
                      </p>
                    </div>

                    <div className="text-slate-400 border border-slate-500 rounded-lg shadow-lg p-3">
                      <p className="text-5xl font-bold text-green-300">
                        {completos}
                      </p>
                      <p className="  text-green-300">
                        {completos === 1 ? "Completado" : "Completados"}
                      </p>
                    </div>

                    <div className="text-slate-400 border border-slate-500 rounded-lg shadow-lg p-3">
                      <p className="text-5xl font-bold text-red-300">
                        {incompletos}
                      </p>
                      <p className="  text-red-300">
                        {incompletos === 1 ? "Incompleto" : "Incompletos"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className=" mt-4 bg-transparent text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Ver historial de intentos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer textos={textos}></Footer>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-200 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">Tus intentos</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overscroll-contain ">
                  <p className="my-4 text-dark text-lg leading-relaxed">
                   Lista de intentos
                  </p>
                 
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export async function getServerSideProps(context) {
  const sessionUser = await getSession(context);
 
  const textos = await getTextos(databaseId);
  if (sessionUser == null || sessionUser.user == null) {
    context.res.writeHead(302, { Location: "/reto_2/picar" });
  }

  const metaTags = await getMetaTags(databaseId);
  var getIntentos = null;

  const porrazos = 0;

  const page = context.query.rowIntento;
  const databaseNotion = process.env.NOTION_DATABASE_USERS;
  const options = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2022-02-22",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: {
        database_id: databaseNotion,
      },
      properties: {
        finalizado: {
          number: 1,
        },
      },
    }),
  };

  var getIntentos = await fetch(
    `https://api.notion.com/v1/pages/${page}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));

  const statsUser = await getStatsUser(sessionUser.user.email);

  return {
    props: {
      intentos: getIntentos,
      metaTags: metaTags,
      statsUser: statsUser,
      session: sessionUser,
      textos:textos
    },
  };
}
