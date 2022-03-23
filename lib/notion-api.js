import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

 

export const getMetaTags = async (databaseId) => {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: { property: "Tipo", select: { equals: "meta" } },
      sorts: [  { property: "Variable", direction: "ascending"}]
    }); 
    
    const datosMetaTags = {};
  
    response.results
      .map((result) => result.properties)
      .map((property) => {
        return datosMetaTags[property.Variable.title[0].plain_text] = property.Texto.rich_text[0].plain_text;
      });
    return datosMetaTags;
  };
  
   


  export const getTextos = async (databaseId) => {
    const response = await notion.databases.query({
            database_id: databaseId,
            filter: { property: "Tipo", select: { equals: "texto" } },
            sorts: [ { property: "Variable", direction: "ascending"}],
    });
  
        const datosTextos = {};
 
            response.results
            .map((result) => result.properties)
            .map((property) => { 

                return datosTextos[property.Variable.title[0].plain_text] = property.Texto.rich_text[0].plain_text;
                
            });
        return datosTextos;
  };
  
  
     

  export const getSolucion1 = async (databaseId) => {
    const response = await notion.databases.query({
            database_id: databaseId,
            filter: { property: "Tipo", select: { equals: "solucion" } },
            sorts: [ { property: "Variable", direction: "ascending"}],
    });
  
        const datosSolucion= {};
 
            response.results
            .map((result) => result.properties)
            .map((property) => { 

                return datosSolucion[property.Variable.title[0].plain_text] = property.Texto.rich_text[0].plain_text;
                
            });
        return datosSolucion;
  };
  
  
     
  export const savePicanter = async (databaseNotion,userEmail,dateNow) => { 
    let headers = new Headers();  
    headers.append("Access-Control-Allow-Origin", "*");


    const response =  await notion.pages.create({

    headers: headers,
      parent: {
        database_id: databaseNotion,
      },
      properties: {
        user: {
          title: [
            {
              text: {
                content: userEmail,
              },
            },
          ],
        },
        actionAt: {
          date: [
            { 
                start:dateNow,
             
            },
          ],
        },
      },
    });



          return savePicanter;
  };
  
  