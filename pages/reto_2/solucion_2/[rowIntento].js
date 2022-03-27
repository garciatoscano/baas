import Link from 'next/link'  
import React from "react" 
import { useSession,getSession,signIn, signOut } from "next-auth/react"  

export const databaseId = process.env.NOTION_DATABASE_ID;
export const databaseUsers = process.env.NOTION_DATABASE_USERS;


export default function Solucion_r2() {  
 
  const { data: session } = useSession();
  const porrazos = 0; 

  return (
    <> 
    <div className='flex-grow'>
        <div className="bg-fondo hero h-screen">
          <div className="card w-100 bg-base-100 shadow-xl">
                <div className="card-body text-center">           
                  <div className="max-w-md">      
                            <p className="text-2xl "> {session.user.name || session.user.email}!</p>
                        
                        <button onClick={signOut} className="btn btn-xs btn-outline mb-9"> Desconectar</button>
                        <div>

                        <h2 className="text-lg font-bold text-accent"> Has conseguido...</h2>
                            <p className='pb-3 text-5xl'> 👑 Oro! </p>
                            <p className=" mt-6">Quieres más oro? ...</p>
                            <Link href="/reto_2/picar">
                                 <a className="btn btn-accent btn-sm mt-6"> Quiero más oro!!  </a>
                            </Link>
                        </div>
                  </div>
                </div> 
              </div>
          </div>
        </div> 
    </> 
  )
} 

   
export async function getServerSideProps(context) {
  const sessionUser =  await getSession(context) 
  var getIntentos = null;
      if(sessionUser){
          const page = context.query.rowIntento;

        console.log('sessionUser:', sessionUser)
        console.log('page:', page)



        const databaseNotion = process.env.NOTION_DATABASE_USERS;
        const options = {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
            "Notion-Version": "2022-02-22",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
               
          "parent": {
            "database_id": databaseNotion,
                    },
                      "properties": {   
                         
                        "finalizado": {
                          "number":1
                        }  
                      } 
                    })
                };
        
                var getIntentos = await fetch(`https://api.notion.com/v1/pages/${page}`, options)
          .then(response => response.json())
          .then((response) =>{
          console.log(response  )
          return response ;
          } 
          )
          .catch(err => console.error(err)); 
      }
    return {
       props: { 
        intentos: getIntentos,
        session:sessionUser
          }
    };
}