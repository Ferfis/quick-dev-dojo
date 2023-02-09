import {Button, Card, Col, Container, Row, Table, Modal, Form, FormControl} from "react-bootstrap";
import SideMenu from "./components/SideMenu";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {formatDate, ValidateToken} from "../Utils";
import axios from "axios";
import {API_URL} from "../constants";
import {useState} from "react";

const Comments = (props) => {
    ValidateToken();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [comments, setComments] = useState([]);
    const [objEdit, setObjEdit] = useState({});
    const [newComment, setNewComment] = useState('');

    const handleShow = (item) => {
        setObjEdit(item);
        setNewComment(item.comment);
        setShow(true)
    };

    const getAll = () => {
        axios.get(API_URL + '/comments/get-by-user', {
            headers: {user_id: props.objUser.id}
        }).then((rs) => {
            // Com o retorno da validação do certificado seto o objUser.
            setComments(rs.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const update = (e) => {
        e.preventDefault();
        let objComment = {
            id: objEdit.id_comment,
            user_id: objEdit.user_id,
            post_id: objEdit.id,
            description: newComment
        }
        axios.post(API_URL + '/comments/create', objComment)
            .then(res => {
                getAll();
                handleClose();
            }).catch(err => {
                console.log(err);
            }
        );
    }

    const removeComment = (idComment) => {
        axios.post(API_URL + '/comments/removed-by', {id: idComment, user_id: props.objUser.id})
            .then(res => {
                getAll();
            }).catch(err => {
                console.log(err);
            }
        );
    }

    useEffect(() => {
        getAll();
    }, [])

    return (
        <Container className="dashboard-container" fluid>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <Form className='m-0' style={{maxWidth: '100%'}}>
                        <Form.Group>
                            <Form.Label>Edite o comentário</Form.Label>
                            <FormControl
                                className='w-100'
                                as="textarea"
                                rows="3"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)} required/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button onClick={update} variant="success">
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <SideMenu/>
                <Col md={9}>
                    <Card>
                        <h4 className="text-center my-4">Comentários</h4>
                    </Card>
                    {comments.length > 0 &&
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Título da postagem</th>
                                <th>Comentário</th>
                                <th>Data de envio</th>
                                <th className="text-center">#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {comments.map((item) => (
                                item.name && (
                                    <tr className="align-middle" key={item.id_comment}>
                                        <td>{item.name}</td>
                                        <td>{item.title}</td>
                                        <td>{item.comment}</td>
                                        <td>{formatDate(item.comment_created_at)}</td>
                                        <td className="text-center">
                                            {item.user_id_comment === props.objUser.id && (
                                                <Button
                                                    variant="warning"
                                                    className="my-1 mx-1"
                                                    onClick={() => {
                                                        handleShow(item);
                                                    }}
                                                >
                                                    Editar
                                                </Button>
                                            )}
                                            <Button
                                                variant="danger"
                                                className="my-1 mx-1"
                                                onClick={() => {
                                                    removeComment(item.id_comment);
                                                }}
                                            >
                                                Excluir
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            ))}
                            </tbody>
                        </Table>
                    }
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        objUser: state.objUser
    };
};

export default connect(mapStateToProps)(Comments);
