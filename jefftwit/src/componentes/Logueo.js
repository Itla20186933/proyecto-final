import React, { useState } from "react";
import { Stack, Container, Form, Button } from "react-bootstrap";
import firebaseApp from "./credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithRedirect,GoogleAuthProvider } from 'firebase/auth'
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


const Logueo = () => {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function submitHandler(e) {
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contra = e.target.formBasicPassword.value;
        const nombre = e.target.formBasicNombre.value;
        const apellido = e.target.formBasicApellido.value;

        if (estaRegistrandose) {
            const usuario = await createUserWithEmailAndPassword(
                auth, 
                correo, 
                contra,
                nombre,
                apellido,
                );
        } else {
            signInWithEmailAndPassword(auth, correo, contra,nombre,apellido);
        }
        
           
    }

    return (
        <Container>
            <Stack gap={3}>
                <h1>{estaRegistrandose ? "Registrate" : "incia sesión"}</h1>
                <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3" controlId="formBasicNombre" style={{ width: "400px" }}>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="Name" placeholder="Enter Nombre" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicApellido" style={{ width: "400px" }}>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="Lastname" placeholder="Enter Apellido" />

                    </Form.Group>



                    <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: "400px" }}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: "400px" }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ background: "#00A86B" }}>
                        {estaRegistrandose ? "Registrate" : "inicia sesión"}

                    </Button>
                </Form>

                <Button variant="primary" type="submit" style={{ width: "250px" }} onClick={()=>signInWithRedirect(auth,googleProvider)}>
                    Acceder con Google
                </Button>

                <Button variant="primary" onClick={() => setEstaRegistrandose(!estaRegistrandose)} style={{ width: "300px", background: "#144973" }}>
                    {estaRegistrandose ? "¿ya tienes cuenta? inicia sesión" : "¿no tienes cuenta? Registrate"}
                </Button>

            </Stack>


            
        </Container>
    );
}

export default Logueo