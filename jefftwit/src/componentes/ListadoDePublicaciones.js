import React from "react";
import { Container, Row, Stack,Col,Button } from "react-bootstrap";
import firebaseApp from "./credenciales";
import { getFirestore, updateDoc,doc } from "firebase/firestore";
const firestore=getFirestore(firebaseApp);


const ListadoDePublicaciones =({arrayPublicaciones, correoUsuario, setArrayPublicacion})=>{
   async function eliminarPublicacion(idPublicacionAelim){
       const nvaPublicacion =arrayPublicaciones.filter(
           (objetoPublicacion) => objetoPublicacion.id !== idPublicacionAelim
       );
       
       const pubRef= doc(firestore,`usuarios/${correoUsuario}`);
       updateDoc(pubRef, {publicacion:[...nvaPublicacion]});
       setArrayPublicacion(nvaPublicacion)

   }
   
   
    return(
       <Container>
           <Stack>
               {arrayPublicaciones.map((objetoPublicacion)=>{
                   return(
                       <>
                       <Row>
                           <Col>{objetoPublicacion.descripcion}</Col>
                           <Col><Button variant="danger" onClick={()=>eliminarPublicacion(objetoPublicacion.id)}>Eliminar Publicacion</Button></Col>
                       </Row>
                       <hr/>
                       </>
                       
                   )
               })}
           </Stack>
       </Container>
   )

}

export default ListadoDePublicaciones