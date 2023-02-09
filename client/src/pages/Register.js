import {API_URL} from "../constants";
import {React, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import md5 from 'md5-hash'
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const doRegister = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            let hashedPass = md5(password);
            const objUser = {name, email, password: hashedPass}
            axios.post(API_URL+'/users/create', objUser)
                .then(res => {
                    // Com o cadastro bem sucedido armazeno o token no localStorage do usuário
                    localStorage.setItem('token', res.data.rs);
                    // Redireciono para a tela inicia do painel.
                    navigate('/dashboard');
                })
                .catch(err => {
                        setError(err.response.data.message);
                        setTimeout(() => {
                            setError('');
                        },3000);
                    }
                );
        } else {
            setError("As senhas digitadas não são iguais.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col sm={12} md={5} lg={5} className="login-form">
                    <Card>
                        <div className="text-center container-logo mb-3">
                            <Card.Img className="img-fluid" variant="top" src="/assets/img/logo.png"/>
                        </div>
                        <h4 className="text-center">Cadastre-se</h4>
                        {error && <div className="error">{error}</div>}
                        <Form onSubmit={doRegister}>
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

                            <Button variant="primary" type="submit" disabled={!name || !email || !password || !confirmPassword}> Cadastrar </Button>

                            <Card className="mt-4">
                                <h5>Já possui conta?</h5>
                                <p>
                                    <Link to="/login">Faça login</Link>
                                </p>
                            </Card>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
