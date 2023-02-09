import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {API_URL, SERVER_URL} from "../constants";
import SideMenu from "./components/SideMenu";
import {connect} from "react-redux";
import {Container, Row, Col, ListGroup, Card, Button, Form, FormControl,} from "react-bootstrap";
import {BsHandThumbsUp, BsHandThumbsDown, BsFillPencilFill, BsFillTrashFill, BsFillHandThumbsUpFill, BsHandThumbsDownFill} from "react-icons/bs";
import {decrypt, formatDate, ValidateToken} from "../Utils";
import "../css/Dashboard.css";
import "../css/SinglePost.css";

const SinglePost = (props) => {
    let [post, setPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState('');
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const {id} = useParams();
    const [actions, setActions] = useState('');
    const [id_comment, setIdComment] = useState('');
    const [owner, setOwner] = useState(false);
    ValidateToken();

    const getAllPosts = () => {
        axios.get(API_URL + '/posts/get-all', {}).then((rs) => {
            // Com o retorno da validação do certificado seto o objUser.
            setPosts(rs.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const getComments = (post_id) => {
        axios.get(API_URL + '/comments/get-by-post', {
            headers: {post_id: post_id}
        }).then((rs) => {
            // Com o retorno da validação do certificado seto o objUser.
            setComments(rs.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const getActions = (post_id) => {
        axios.get(API_URL + '/post-action/get-by-post-user', {
            headers: {post_id: post_id, user_id: props.objUser.id}
        }).then((rs) => {
            // Com o retorno da validação do certificado seto o objUser.
            const data = typeof rs.data[0] !== 'undefined' ? rs.data[0] : [];
            setActions(data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const loadPost = () => {
        const post_id = decodeURIComponent(decrypt(id));
        axios.get(API_URL + '/posts/find', {
            headers: {post_id: post_id, user_id: props.objUser.id}
        }).then((rs) => {
            // Recupero comentários da postagem
            getComments(post_id);
            // Recupera likes e unlikes
            getActions(post_id);
            // Com o retorno da validação do certificado seto o objeto post.
            setPost(rs.data);
            // Cria um obj para receber o retorna da requisição
            let objView = rs.data;
            // Incremento a o objView.views
            objView.views = (parseInt(objView.views) + 1);
            // Atualizo o registro
            axios.post(API_URL + '/posts/update-view', objView);

        }).catch((err) => {
            console.log(err);
        });
    }

    const doComment = (e) => {
        e.preventDefault();
        let objComment = {
            id: id_comment,
            user_id: props.objUser.id,
            post_id: decodeURIComponent(decrypt(id)),
            description: comment
        }
        axios.post(API_URL + '/comments/create', objComment)
            .then(res => {
                setName('');
                setComment('');
                getComments(objComment.post_id);
            }).catch(err => {
                console.log(err);
            }
        );
    }

    const doAction = (e, type) => {
        e.preventDefault();
        let objAction = {
            id: actions && actions.id,
            user_id: props.objUser.id,
            post_id: decodeURIComponent(decrypt(id)),
            type
        }
        axios.post(API_URL + '/post-action/create', objAction)
            .then(res => {
                getActions(decodeURIComponent(decrypt(id)));
            }).catch(err => {
                console.log(err);
            }
        );
    }

    const removeComment = (idComment) => {
        axios.post(API_URL + '/comments/removed-by', {id: idComment, user_id: props.objUser.id})
            .then(res => {
                getComments(post.id);
            }).catch(err => {
                console.log(err);
            }
        );
    }

    useEffect(() => {
        console.log(actions);
        if (limit < 1) {
            if (post.user_id === props.objUser.id) {
                setOwner(true);
            }
            getAllPosts();
            if (id) {
                loadPost();
            }
            setLimit(1);
        }
    }, [ id, actions, limit, post.user_id,props.objUser.id]);

    return (
        <Container className="dashboard-container post-container" fluid>
            <Row>
                <SideMenu/>
                <Col md={9}>
                    <Card className='mt-4'>
                        <Card.Img variant="top" src={SERVER_URL + post.image}/>
                        <Card.Body>
                            <Card.Title className='mb-0'>
                                <h3>{post.title}</h3>
                            </Card.Title>
                            <div className='d-inline'>
                                <small className='pb-5'>Por: {post.user_name} em {formatDate(post.created_at)}</small>
                            </div>
                                <div className='d-inline ms-4 icon'>
                                    {(actions.hasOwnProperty("type") && actions.type === 0 || !actions.hasOwnProperty("type")) &&
                                        <BsHandThumbsUp
                                            className='link-success'
                                            onClick={(e) => doAction(e, '1')}
                                        />
                                    }
                                    { (actions.hasOwnProperty("type") && actions.type === 1) &&
                                        <BsFillHandThumbsUpFill
                                            className='link-success'
                                            onClick={(e) => doAction(e, '1')}
                                        />
                                    }
                                </div>
                            <div className='d-inline mx-4 icon'>
                                {(actions.hasOwnProperty("type") && actions.type === 1 || !actions.hasOwnProperty("type")) &&
                                    <BsHandThumbsDown
                                        className='link-danger'
                                        onClick={(e) => doAction(e, '0')}/>
                                }
                                {(actions.hasOwnProperty("type") && actions.type === 0) &&
                                    <BsHandThumbsDownFill
                                        className='link-danger'
                                        onClick={(e) => doAction(e, '0')}/>
                                }
                            </div>
                            <Card.Text className='mt-4' dangerouslySetInnerHTML={{__html: post.description}}>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Row className='mb-5'>
                        <Col md={12}>
                            <h4>Comentários</h4>
                        </Col>
                        <Col md={12}>
                            {comments.length > 0 &&
                                <ListGroup className='comments-container'>
                                    {comments.map((item) => (
                                        <ListGroup.Item key={item.id}>
                                            <Row className='h-100'>
                                                <Col md={10}>
                                                    <h6><strong>{item.user_name}</strong> - {formatDate(item.created_at)}</h6>
                                                    {item.removed_by === post.user_id &&
                                                        <p className='mt-3 link-danger'>Comentário removido pelo moderador do post.</p>
                                                    }
                                                    {(item.removed_by !== null && item.removed_by !== post.user_id) &&
                                                        <p className='mt-3 link-danger'>Comentário removido pelo usuário.</p>
                                                    }
                                                    {item.removed_by === null &&
                                                        <p className='mt-3'>{item.description}</p>
                                                    }
                                                </Col>
                                                {item.user_id === props.objUser.id &&
                                                    <Col md={1} className='my-auto'>
                                                        <Button onClick={() => {
                                                            setComment(item.description);
                                                            setIdComment(item.id)
                                                        }}>
                                                            <BsFillPencilFill/>
                                                        </Button>
                                                    </Col>
                                                }
                                                {(item.user_id === props.objUser.id || owner) &&
                                                    <Col md={1} className='my-auto'>
                                                        <Button variant='danger' onClick={() => removeComment(item.id)}>
                                                            <BsFillTrashFill/>
                                                        </Button>
                                                    </Col>
                                                }
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            }

                            {comments.length <= 0 && <h5 className="text-center">Seja o primeiro a comentar!</h5>}

                            <Col md={12}>
                                <h4 className='my-4'>Comente!</h4>
                            </Col>

                            <Form className='mx-0' onSubmit={doComment}>
                                <Form.Group>
                                    <Form.Label>Comentário</Form.Label>
                                    <FormControl
                                        as="textarea"
                                        rows="3"
                                        maxLength='500'
                                        placeholder="Digite seu comentário"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Enviar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
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

export default connect(mapStateToProps)(SinglePost);
