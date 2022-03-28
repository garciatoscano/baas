import Image from "next/image";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { getMetaTags } from "../../lib/notion-api";

export const databaseId = process.env.NOTION_DATABASE_ID;
export const databaseUsers = process.env.NOTION_DATABASE_USERS;

export default function Picar_r2({ getIntentos, metaTags }) {
  const { title, description, author, keywords } = metaTags;
  const { data: session, loading, status } = useSession();
  const router = useRouter();

  if (session && status == "authenticated") {
    const porrazos = 0;

    const { intentos, page } = getIntentos.datosSave;
    console.log(" intentos,page ", intentos, page);

    const cuentaPicar = () => {
      if (intentos == 0) intentos = 1;
      porrazos++;

      if (porrazos == intentos) {
        router.push({
          pathname: `/reto_2/solucion_2/${page}`,
        });
      } else {
        console.log("SIGUE!");
      }
    };
  }

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
        <div className="bg-fondo hero h-screen">
          <div className="card w-100 bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="max-w-md">
                {!session ? (
                  <>
                    <div className="max-w-md">
                      <p> Vamos!! </p>
                      <h2 className="text-xl font-bold text-accent">
                        Aquí solo pican los que se identifican
                      </h2>
                    </div>
                    <p>
                      Necesitamos tu nombre ... Identifícate!
                      <em>(por favor)</em>
                    </p>

                    <button
                      onClick={() => signIn("github")}
                      className="btn btn-md mt-10 text-white"
                    >
                      <Image
                        src="/icons8-github-30.png"
                        width="30"
                        height="30"
                        className="mx-4"
                      />
                      Entrar
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-white">
                      Hola, {session.user.name || session.user.email}!
                    </h2>
                    <button
                      onClick={signOut}
                      className="btn btn-xs btn-outline-secondary mb-9"
                    >
                      Desconectar
                    </button>
                    <div>
                      <p className="pb-3 text-xl">
                        Tienes que picar una o más veces <br />
                        para conseguir más oro
                      </p>
                      <button
                        onClick={cuentaPicar}
                        className="btn btn-accent btn-lg text-xl mt-3"
                      >
                        
                        ¡Picar! <span className=" ml-3">⛏️</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const sessionUser = await getSession(context);
  const metaTags = await getMetaTags(databaseId);
  var getIntentos = null;
  if (sessionUser) {
    const databaseNotion = process.env.NOTION_DATABASE_USERS;
    const options = {
      method: "POST",
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
          user: {
            title: [
              {
                text: {
                  content: sessionUser.user.email,
                },
              },
            ],
          },
          finalizado: {
            number: 0,
          },
        },
      }),
    };

    var getIntentos = await fetch("https://api.notion.com/v1/pages", options)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp.properties.intentos.formula.number);

        var numIntentos = resp.properties.intentos.formula.number;
        numIntentos == 0 ? (numIntentos = 1) : (numIntentos = numIntentos);
        return {
          datosSave: {
            page: resp.id,
            intentos: numIntentos,
          },
        };
      })
      .catch((err) => console.error(err));
  }
  return {
    props: {
      getIntentos: getIntentos,
      metaTags: metaTags,
    },
  };
}
