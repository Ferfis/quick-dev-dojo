import {Button, Card, Col, Container, Image, Modal, Row, Table} from "react-bootstrap";
import SideMenu from "./components/SideMenu";
import {React, useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_URL, SERVER_URL} from "../constants";
import {encrypt, formatDate, ValidateToken} from "../Utils";

const Posts = (props) => {
    ValidateToken();
    const [limit, setLimit] = useState("");
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({});
    const handleClose = () => {
        setModalData('');
        setShow(false)
    };
    const handleDelete = (post_id) => {
        const objModal = {
            post_id: post_id,
            title: 'Deletar postagem?',
            message: 'Ao deletar sua postagem a sua ação não poderá ser defeita.',
            buttonCancel: 'Cancelar',
            buttonConfirm: 'Deletar',
            color: 'danger'
        }
        setModalData(objModal);
        setShow(true);
    };
    const doDelete = () => {
        if(modalData.post_id) {
            axios.post(API_URL + '/posts/delete', modalData).then((rs) => {
                setModalData('');
                setShow(false);
                getAll();
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const getAll = () => {
        axios.get(API_URL + '/posts/get-by-user', {
            headers: {user_id: props.objUser.id}
        }).then((rs) => {
            // Com o retorno da validação do certificado seto o objUser.
            setItems(rs.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (props.objUser && limit < 1) {
            setLimit(1);
            getAll();
        }
    });

    return (
        <Container className="dashboard-container" fluid>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalData && modalData.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalData && modalData.message}</Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        {modalData && modalData.buttonCancel}
                    </Button>
                    <Button type='button' variant={modalData && modalData.color} onClick={doDelete}>
                        {modalData && modalData.buttonConfirm}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <SideMenu/>
                <Col md={9}>
                    <Card>
                        <h4 className="text-center mt-4">Suas postagens</h4>
                        <Link to="/dashboard/post">
                            <Button className="w-25" variant="primary my-4">
                                Nova postagem
                            </Button>
                        </Link>
                    </Card>
                    {items.length > 0 &&
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th className="w-25">Capa</th>
                                <th>Título</th>
                                <th className="text-center">Visualizações</th>
                                <th className="text-center">Comentários</th>
                                <th className="text-center">Atualizado em</th>
                                <th className="text-center">#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((item) => (
                                <tr className="align-middle" key={item.id}>
                                    <td>
                                        <Image thumbnail={true} src={SERVER_URL + item.image} alt=""/>
                                    </td>
                                    <td>{item.title}</td>
                                    <td className="text-center">{item.views}</td>
                                    <td className="text-center">{item.comment_count}</td>
                                    <td>{formatDate(item.updated_at)}</td>
                                    <td className="text-center">
                                        <Link to={`/dashboard/post/${encodeURIComponent(encrypt(item.id.toString()))}`}>
                                            <Button variant="warning my-1 mx-1"> Editar </Button>
                                        </Link>
                                        <Button variant="danger my-1 mx-1" onClick={() => handleDelete(item.id)}> Excluir </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    }
                    {items.length <= 0 && <h5 className="text-center">Você ainda não realizou nenhuma postagem.</h5>}
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

export default connect(mapStateToProps)(Posts);
