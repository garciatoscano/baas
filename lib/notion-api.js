import { Client } from "@notionhq/client";
import moment from "moment";

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
        property.Texto.rich_text[0].text.content);
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
  const databaseNotion = process.env.NOTION_DATABASE_USERS;

  const datosUser = await notion.databases.query({
    database_id: databaseNotion,
    filter: {
      property: "user",
      rich_text: {
        contains: idUser,
      },
    },
    sorts: [{ property: "action_at", direction: "descending" }],
  });

 
  var arr_incompletos = [];
  var arr_completos = [];
  var arr_historial = [];

  var arr_grafica_fecha= [];
  var arr_grafica_golpes= [];

 
  
 datosUser.results 
  .map((result) => result.properties)
  .map((row)=>{
 
    let fechaAccion =  moment(row.action_at.created_time).format("DD MMM YY HH:MM");

    arr_historial.push([{
      fecha: fechaAccion,
      golpes: row.intentos.formula.number,
      comlpetado: row.finalizado.number == 0 ? 'No' : 'Sí',
      color: row.finalizado.number == 0 ? 'badge-error' : 'badge-success',
    }
  ]);
  
  if( row.finalizado.number == 1){
    arr_grafica_fecha.push(fechaAccion);
    arr_grafica_golpes.push( row.intentos.formula.number);
}
  
  });
 

  datosUser.results
.map((result) => result.properties)
.map((property) => {
  property.finalizado.number == 0
    ? arr_incompletos.push(0)
    : arr_completos.push(1);
});
 



const costeOro = datosUser.results
.map((result) => result.properties)
.reduce((memo,row) => {
// console.log('row',row,memo)
  if(row.finalizado.number == 1){ 
    return (row.intentos.formula.number +memo )
   } else { 
      return (memo) }

},0);


// console.log('costeOro --------------------------', costeOro)

const totalIntentos = datosUser.results.length;


const datosStatsUser = {
  totalIntentos: totalIntentos,
  incompletos: arr_incompletos.length,
  completos: arr_completos.length,
  historial: arr_historial,
  costeOro: (costeOro / arr_completos.length),
  arr_grafica_golpes:{arr_grafica_fecha,arr_grafica_golpes}
};
  return datosStatsUser;
};
