import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getMetaTags = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "Tipo", select: { equals: "meta" } },
    sorts: [{ property: "Variable", direction: "ascending" }],
  });

  const datosMetaTags = {};

  response.results
    .map((result) => result.properties)
    .map((property) => {
      return (datosMetaTags[property.Variable.title[0].plain_text] =
        property.Texto.rich_text[0].plain_text);
    });
  return datosMetaTags;
};

export const getTextos = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "Tipo", select: { equals: "texto" } },
    sorts: [{ property: "Variable", direction: "ascending" }],
  });

  const datosTextos = {};

  response.results
    .map((result) => result.properties)
    .map((property) => {
      return (datosTextos[property.Variable.title[0].plain_text] =
        property.Texto.rich_text[0].plain_text);
    });
  return datosTextos;
};

export const getSolucion1 = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: "Tipo", select: { equals: "solucion" } },
    sorts: [{ property: "Variable", direction: "ascending" }],
  });

  const datosSolucion = {};

  response.results
    .map((result) => result.properties)
    .map((property) => {
      return (datosSolucion[property.Variable.title[0].plain_text] =
        property.Texto.rich_text[0].plain_text);
    });
  return datosSolucion;
};

export const getStatsUser = async (idUser) => {
  console.clear();
  const databaseNotion = process.env.NOTION_DATABASE_USERS;

  const response = await notion.databases.query({
    database_id: databaseNotion,
    filter: {
      property: "user",
      rich_text: {
        contains: idUser,
      },
    },
    sorts: [{ property: "action_at", direction: "descending" }],
  });

  const totalIntentos = response.results.length;

  var arr_incompletos = [];
  var arr_completos = [];

  response.results
    .map((result) => result.properties)
    .map((property) => {
      property.finalizado.number == 0
        ? arr_incompletos.push(0)
        : arr_completos.push(1);
    });
  const datosStatsUser = {
    totalIntentos: totalIntentos,
    incompletos: arr_incompletos.length,
    completos: arr_completos.length,
  };
  return datosStatsUser;
};
