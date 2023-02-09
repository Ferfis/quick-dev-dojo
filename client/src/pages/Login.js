import React, {useState} from "react";
import {Form, Button, Container, Row, Col, Card} from "react-bootstrap";
import axios from "axios";
import {API_URL} from "../constants";
import {Link, useNavigate} from "react-router-dom";
import "../css/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const doLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Usuário ou senha incorretos.");
            return false;
        }
        const objLogin = {email, password}
        axios.post(API_URL + '/auth/login', objLogin)
            .then(res => {
                // Se houver falha na obtenção do token pelo lado do server exibe o erro
                if (!res.data.token) {
                    setError("Houve um problema ao realizar seu login. Atualize a página e tente novamente.");
                    return false;
                }
                // Com o login bem sucedido armazeno o token no localStorage do usuário
                localStorage.setItem('token', res.data.token);
                // Redireciono para a tela inicia do painel.
                navigate('/dashboard');
            })
            .catch(err => {
                    setError(err.response.data.message);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
            );
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col sm={12} md={5} lg={5} className="login-form">
                    <Card>
                        <div className="text-center container-logo mb-3">
                            <Card.Img className="img-fluid" variant="top" src="/assets/img/logo.png"/>
                        </div>
                        <h4 className="text-center">Login</h4>
                        {error && <div className="error">{error}</div>}
                        <Form onSubmit={doLogin}>
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

                            <Button variant="primary" type="submit" disabled={!email || !password}>
                                Entrar
                            </Button>

                            <Card className="mt-4">
                                <h5>Não possui cadastro?</h5>
                                <p>
                                    <Link to="/cadastro">Cadastre-se</Link>
                                </p>
                            </Card>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

};

export default Login;
