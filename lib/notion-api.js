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
  
  
     
  export const getSaveUser= async (databaseNotion,userEmail,dateNow) => { 
 
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Authorization": "Bearer secret_WXXQ0YmVnuWGCOi2doE7T5E1zZcr4orVXsatfo9U4Dp",
        "Notion-Version": "2022-02-22",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      "parent": {
          "database_id": databaseNotion,
                  },
                  "properties": {
                    "user": {
                      "title": [
                        {
                          "text": {
                            "content": 'email',
                          }
                        } 
                      ]
                    } 
                  }
                })
    };
    
   const dataSave = await fetch('https://api.notion.com/v1/pages', options)
      .then(response => response.json())
      .then((response) =>{
    
       console.log(response.properties.intentos.formula.number )
       return response.properties.intentos.formula.number ;
      } 
      )
      .catch(err => console.error(err)); 

 
 
    return {   dataSave  };


    }
  //   const options = {
  //     method: 'POST',
  //     url: 'https://api.notion.com/v1/pages',
  //     headers: {
  //       Accept: 'application/json',
  //       'Notion-Version': '2022-02-22',
  //       'Content-Type': 'application/json'
  //     },
  //     mode: 'no-cors',
  //     data: {
  //       parent: 'string',
  //       properties: 'string',
  //       children: ['Unknown Type: mixed type'],
  //       icon: 'string',
  //       cover: 'string'
  //     }
  //   };
    
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
  //       'Notion-Version': '2022-02-22',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     mode: 'no-cors',
  //     body:{
  //     parent: {
  //       database_id: databaseNotion,
  //     },
  //     properties: {
  //       user: {
  //         title: [
  //           {
  //             text: {
  //               content: userEmail,
  //             },
  //           },
  //         ],
  //       },
  //       actionAt: {
  //         date: [
  //           { 
  //               start:dateNow,
             
  //           },
  //         ],
  //       },
  //     }
  //   }
  //   };

    
  //  const saveUser =  await fetch('https://api.notion.com/v1/pages', options)
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err));


  //     console.log(options,saveUser)


    // let headers = new Headers();  
    // headers.append("Access-Control-Allow-Origin", "*");


    // const response =  await notion.pages.create({
    //   headers: {
    //     "Access-Control-Allow-Origin": "*"
    // },
    //   parent: {
    //     database_id: databaseNotion,
    //   },
    //   properties: {
    //     user: {
    //       title: [
    //         {
    //           text: {
    //             content: userEmail,
    //           },
    //         },
    //       ],
    //     },
    //     actionAt: {
    //       date: [
    //         { 
    //             start:dateNow,
             
    //         },
    //       ],
    //     },
    //   },
    // });
 
  //         return saveUser;
  // };
  
  