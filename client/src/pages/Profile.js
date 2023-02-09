import {React, useState} from "react";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {API_URL} from "../constants";
import SideMenu from "./components/SideMenu";
import {connect} from "react-redux";
import {Container, Row, Col, Card, Form, Button,} from "react-bootstrap";
import {ValidateToken} from "../Utils";
import md5 from "md5-hash";

const Profile = (props) => {
    ValidateToken();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [limit, setLimit] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        setId(props.objUser.id);
        setName(props.objUser.name);
        setName(props.objUser.name);
        setEmail(props.objUser.email);
        setPassword(props.objUser.password);
        setConfirmPassword(props.objUser.password);
    }, []);

    const doUpdate = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            let hashedPass = password !== props.objUser.password ? md5(password) : password;
            const objUser = {id, name, email, password: hashedPass}
            axios.post(API_URL+'/users/create', objUser)
                .then(res => {
                    dispatch({type: "SET_OBJ_USER", objUser});
                })
                .catch(err => {
                       console.log(err);
                    }
                );
        } else {
            setError("As senhas digitadas não são iguais.");
        }
    };

    return (
        <Container className="dashboard-container" fluid>
            <Row>

                <SideMenu />

                <Col md={9}>
                    <Card>
                        <h4 className="text-center mt-4">Atualize seus dados</h4>
                    </Card>
                    {error && <div className="error">{error}</div>}
                    <Form onSubmit={doUpdate}>
                        <Form.Group className="text-start" controlId="formEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="text-start" controlId="formEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="text-start" controlId="formPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="text-start" controlId="formPassword">
                            <Form.Label>Confirme a Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!name || !email || !password || !confirmPassword}> Atualizar </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        objUser: state.objUser
    };
};

export default connect(mapStateToProps)(Profile);
