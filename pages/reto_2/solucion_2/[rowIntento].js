import Link from "next/link";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useSession, getSession, signOut } from "next-auth/react";
import { getMetaTags, getStatsUser, getTextos } from "../../../lib/notion-api";
import Footer from "../../../components/Footer";
import GraficaGolpes from "../../../components/GraficaGolpes";

export const databaseId = process.env.NOTION_DATABASE_ID;
export const databaseUsers = process.env.NOTION_DATABASE_USERS;

export default function Solucion_r2({ metaTags, statsUser, textos }) {
  const { data: session } = useSession();
  if (!session) {
    router.push("/reto_2/picar");
  }

  const [showModal, setShowModal] = React.useState(false);
  const { totalIntentos, incompletos, completos, historial, costeOro } =
    statsUser;

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
        <div className="bg-fondo  hero h-scr___een">
          <div className="card my-12 lg:w-1/2  xs:w-full xs:m-2 bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className=" w-full">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-accent">
                    {textos.r2_solucion_auth_line_1}
                  </h2>
                  <p className="pb-1 text-7xl">
                    {textos.r2_solucion_auth_line_2}
                  </p>
                  <Link href="/reto_2/picar">
                    <a className="btn btn-accent btn-lg mt-6">
                      {textos.r2_solucion_auth_btn}
                    </a>
                  </Link>
                  <div>
                    <button
                      onClick={() => signOut(
                        {callbackUrl: '/reto_2/picar'}
                        )}
                      className="btn btn-xs btn-outline-secondary  text-xs my-1"
                    >
                      {textos.btn_logout}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-700  rounded-2xl shadow-inner border border-slate-900 p-3 pb-10">
                  <p className="text-xl pt-6  ">
                    {session.user.name || session.user.email}
                    <br /> {textos.r2_solucion_auth_line_stats}
                  </p>

                  <div className="mt-6 grid md:grid-cols-3  xs:grid-cols-1 gap-4 place-items-center ">
                    <div className="text-slate-400   rounded-lg shadow-lg p-3">
                      <p className="text-5xl font-bold text-slate-100">
                        {totalIntentos}
                      </p>
                      <p className="  text-slate-400">
                        {textos.txt_intentos}
                        {totalIntentos > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="text-slate-400  rounded-lg shadow-lg p-3">
                      <p className="text-5xl font-bold text-green-300">
                        {completos}
                      </p>
                      <p className="  text-green-300">
                        {textos.txt_completados}
                        {completos > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="text-slate-400 rounded-lg shadow-lg p-3">
                      <p className="text-5xl font-bold text-red-300">
                        {incompletos}
                      </p>
                      <p className="  text-red-300">
                        {textos.txt_incompletos}
                        {incompletos > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-1 grid md:grid-cols-2  xs:grid-cols-1 gap-4 place-items-center ">
                  <div className=" stat text-slate-400 rounded-lg shadow-lg p-3 mt-1">
                    <p className="text-white">{textos.costeoro_title} </p>
                    <p className="text-5xl font-bold text-accent ">
                      {costeOro.toFixed(2)}
                    </p>
                    <div className="text-lg font-bold text-yellow-400">
                      {textos.costeoro_coin}
                    </div>

                    <div className="stat-desc">
                    {textos.costeoro_legend}
                    </div>
                  </div>
                  <>
                    <GraficaGolpes
                      datos={statsUser.arr_grafica_golpes}
                    ></GraficaGolpes>
                  </>
                </div>

                <button
                  className=" mt-4 bg-transparent text-white active:bg-accent font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  {textos.r2_solucion_auth_btn_historial}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer textos={textos}></Footer>
      {showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="bg-slate-500 text-slate-800 relative w-full my-6 mx-auto max-w-3xl  shadow-2xl ">
              {/*content*/}
              <div className="  relative flex flex-col w-full bg-withe outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid  bg-slate-500  ">
                  <div>
                    <div className="text-xl font-semibold text-slate-200 ">
                      {textos.r2_solucion_auth_btn_historial}{" "}
                    </div>
                    <div className="text-sm ">
                      {" "}
                      Lo has intentado {historial.length} veces
                    </div>
                  </div>
                  <button
                    className="p-1 ml-auto bg-red  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="modal-body relative p-1 bg-white">
                  <table className="text-left  min-w-full divide-y  divide-slate-400">
                    <thead className="bg-slate-300  flex text-slate-700 w-full">
                      <tr className="flex w-full mb-1">
                        <th className="p-1 w-1/3 text-center">Fecha</th>
                        <th className="p-1 w-1/3 text-center">Golpes</th>
                        <th className="p-1 w-1/3 text-center">Finalizado</th>
                      </tr>
                    </thead>
                    <tbody className="  flex flex-col items-center justify-between overflow-y-scroll w-full tbody  ">
                      {historial.map((item, index) => {
                        return (
                          <tr
                            className=" flex w-full hover:bg-gray-100 divide-y  divide-slate-100"
                            key={index}
                          >
                            <td className="p-1 w-1/3 text-center">
                              {item[0].fecha}{" "}
                            </td>
                            <td className="p-1 w-1/3 text-center">
                              {item[0].golpes}{" "}
                            </td>
                            <td
                              className={` ${item[0].color} p-1 w-1/3 text-center `}
                            >
                              {item[0].comlpetado}{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-end p-2 border-solid bg-slate-100  ">
                  <button
                    className="  btn btn-md  px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <style jsx global>{`
        .tbody {
          height: 50vh;
        }
      `}</style>
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
      textos: textos,
    },
  };
}
