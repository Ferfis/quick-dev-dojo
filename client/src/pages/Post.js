import {React, useEffect, useRef, useState} from "react";
import ReactQuill from 'react-quill';
import {connect} from "react-redux";
import {Alert, Button, Card, Col, Container, Form, Image, Row, Spinner, Tab, Table, Tabs} from "react-bootstrap";
import SideMenu from "./components/SideMenu";
import {useParams} from "react-router-dom";
import {ValidateToken, decrypt, formatDate, encrypt} from "../Utils";
import axios from "axios";
import {API_URL, SERVER_URL} from "../constants";
import 'react-quill/dist/quill.snow.css';
import "../css/Post.css";

const Post = (props) => {
    ValidateToken();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('');
    const [views, setViews] = useState('');
    const [spinner, setSpinner] = useState('');
    const [show, setShow] = useState('');
    const [variant, setVariant] = useState('');
    const [message, setMessage] = useState('');
    const alertRef = useRef(null);
    const { id } = useParams();
    const [limit, setLimit] = useState('');
    const [buttonSubmit, setButtonSubmit] = useState('Cadastrar');
    const [itemsHistory, setItemsHistory] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    const doPost = (e) => {
        e.preventDefault();
        setSpinner(1);
        const objPost = {
            id: id && decodeURIComponent(decrypt(id)),
            user_id: props.objUser && props.objUser.id,
            image,
            title,
            description,
            server_url: SERVER_URL,
            status,
            views
        };
        axios.post(API_URL + '/posts/create', objPost)
            .then(res => {
                if(!id) {
                    setImage('');
                    setTitle('');
                    setDescription('');
                }
                setVariant('success');
                setMessage(res.data.message);
                setShow(1);
                setSpinner('');
                window.scrollTo(0, 0);
            }).catch(err => {
                    setVariant('danger');
                    setMessage(err.response.data.message);
                    setShow(1);
                    setSpinner('');
                }
            );
    };

    const loadPost = () => {
        const post_id = decodeURIComponent(decrypt(id));
        axios.get(API_URL + '/posts/find', {
            headers: {post_id: post_id, user_id: props.objUser && props.objUser.id }
        }).then((rs) => {
            // Com o retorno da validação do certificado seto o objUser.
            setTitle(rs.data.title);
            setDescription(rs.data.description);
            setStatus(rs.data.status);
            setViews(rs.data.views);
            setImage(SERVER_URL + rs.data.image);
            setButtonSubmit('Atualizar');
        }).catch((err) => {
            console.log(err);
        });
    }

    const loadHistory = () => {
        axios.get(API_URL + '/posts/get-history', {
            headers: {'post_id': decrypt(id)}
        }).then((rs) => {
            // Com o retorno da validação do certificado seto o objUser.
            setItemsHistory(rs.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if(id) {
            if(props.objUser && limit < 1){
                loadPost();
                loadHistory();
                setLimit(1);
            }
        }
    });

    return (
        <Container className="dashboard-container" fluid>
            <Row>
                <SideMenu/>
                <Col md={9}>
                    <Tabs
                        defaultActiveKey="post"
                        id="uncontrolled-tab-example"
                        className="m-3"
                    >
                        <Tab eventKey="post" title="Post">
                            <Card>
                                <h4 className="text-center mt-4">Nova postagem</h4>
                            </Card>
                            <Form onSubmit={doPost}>
                                { show &&
                                    <Alert ref={alertRef} variant={variant} onClose={() => setShow(false)} dismissible>
                                        <Alert.Heading>{message}</Alert.Heading>
                                    </Alert>
                                }
                                {image && <div className="container-image"><Image className="img-fluid" src={image} alt="Preview"/></div>}
                                <Form.Group controlId="formControlFile">
                                    <Form.Label>Imagem de capa</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={handleImageChange}/>
                                </Form.Group>
                                <Form.Group className="text-start" controlId="formTitle">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite o título"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="text-start" controlId="formTitle">
                                    <Form.Label>Título</Form.Label>
                                    <ReactQuill
                                        theme="snow"
                                        modules={{
                                            toolbar: [
                                                [{'header': [1, 2, 3, 4, false]}],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                                ['link'],
                                                ['clean']
                                            ]
                                        }}
                                        value={description}
                                        onChange={setDescription}
                                    />
                                </Form.Group>
                                <Form.Group className="mt-4" controlId="status.ControlSelect">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Selecione o status</option>
                                        <option value="publish">Publicado</option>
                                        <option value="draft">Rascunho</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="text-center my-4">
                                    <Button variant="primary" type="submit" disabled={!title || !description}>
                                        {spinner ? <Spinner animation="border"/> : buttonSubmit}
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Tab>

                        <Tab disabled={!id} eventKey="history" title="Histórico de edições">
                            <Table striped bordered hover responsive>
                                <thead>
                                <tr>
                                    <th className="w-25">Capa</th>
                                    <th>Título</th>
                                    <th className="text-center">Última atualização</th>
                                    <th className="text-center">#</th>
                                </tr>
                                </thead>
                                <tbody>
                                {itemsHistory.map((item) => (
                                    <tr className="align-middle" key={item.id}>
                                        <td>
                                            <Image thumbnail={true} src={SERVER_URL + item.image} alt=""/>
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{formatDate(item.created_at)}</td>
                                        <td className="text-center">
                                            <Button disabled={true} variant="warning my-1 mx-1"> Recuperar </Button>
                                            <Button variant="danger my-1 mx-1"> Excluir </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        objUser: state.objUser
    };
};

export default connect(mapStateToProps)(Post);
