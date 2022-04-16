import React,{useState,useEffect} from "react";

import firebaseApp from "./credenciales";
import {getAuth, signOut} from 'firebase/auth'
import {getFirestore, doc,getDoc,setDoc} from 'firebase/firestore'
import './stilo.css'
import {Container,Button} from 'react-bootstrap'

import PublicarEnMuro from "./PublicarEnMuro";
import ListadoDePublicaciones from "./ListadoDePublicaciones";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home =({correoUsuario})=>{

const [arrayPublicaciones,setArrayPublicaciones]= useState(null);

const fakeData =[{id: 1, asunto:'Calor', descripcion:'mucho calor en semana santa'},
{id:2, asunto:'palomeria alex',descripcion:'alex eres palomo jajajaj'},
{id:3, asunto:'Piscina el 28', descripcion:'Listo para la piscina?'},

];

async function buscarPublicacionOrCrearPublicacion(idPublicacion){
  const pubRef = doc(firestore, `usuarios/${idPublicacion}`);
  const consulta = await getDoc(pubRef);
  
  if(consulta.exists()){
    const infoPub = consulta.data();
    return infoPub.publicacion;
  }else{
    await setDoc(pubRef,{publicacion:[...fakeData]});
    const consulta = await getDoc(pubRef);
    const infoPub = consulta.data();
    return infoPub.publicacion;
  }
}

useEffect(()=>{

async function fetchPublicacion(){
  const publicacionesFetchadas = await buscarPublicacionOrCrearPublicacion(
       correoUsuario
    );

    setArrayPublicaciones(publicacionesFetchadas);
}

fetchPublicacion();

},[])

   return(<Container>
     <h1>Bienvenido a jefftwit</h1>
     <h4>Bienvenido!</h4>
     <Button onClick={()=> signOut(auth)}>Cerrar sesión</Button>
     <hr/>
     
     <PublicarEnMuro
     
       arrayPublicaciones={arrayPublicaciones}
       setArrayPublicacion={setArrayPublicaciones}
       correoUsuario={correoUsuario}
      
     />
     <h4>Tus publicaciones</h4>
     
    {arrayPublicaciones?(
        <ListadoDePublicaciones
          arrayPublicaciones={arrayPublicaciones}
          setArrayPublicacion={setArrayPublicaciones}
          correoUsuario={correoUsuario}
          />
    ) :null }


   </Container>
   );
};

export default Home