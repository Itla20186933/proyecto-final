import React from "react";
import { Container,Form,Col,Row, Button } from "react-bootstrap";

import firebaseApp from "./credenciales";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
const firestore =getFirestore(firebaseApp);

const PublicarEnMuro =({correoUsuario, setArrayPublicacion, arrayPublicaciones })=>{
    async function Publicar(e){
       e.preventDefault();

       const descripcion = e.target.formDescripcion.value;
       const nvoArrayTareas =[...arrayPublicaciones,{id: + new Date,descripcion: descripcion 
      },
      ];
       
      const pubRef = doc(firestore, `usuarios/${correoUsuario}`);
      updateDoc(pubRef,{publicacion:[...nvoArrayTareas]});

      setArrayPublicacion(nvoArrayTareas);
      e.target.formDescripcion.value="";

    }
      
   



   return<Container>
        <Form onSubmit={Publicar}>
          <Row className="mb-5">
           
            <Col><Form.Control as="textarea" placeholder="Descripcion" rows={"3"} id="formDescripcion" /></Col>
            <Col><Button type="submit">Publicar!</Button></Col>
          </Row>
        </Form>
        <hr/>
   </Container>

}

export default PublicarEnMuro