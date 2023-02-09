import {Card, Col, Container, Row, Table} from "react-bootstrap";
import React, {useEffect} from "react";
import axios from "axios";
import {API_URL} from "../constants";
import {useState} from "react";

const Analytics = () => {
    const [items, setItems] = useState([]);
    const getAll = () => {
        axios.get(API_URL + '/posts/get-analytics', {}).then((rs) => {
            // Com o retorno da validação do certificado seto o objUser.
            setItems(rs.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAll();
    }, [])

    return (
        <Container className="dashboard-container" fluid>
            <Row>
                <Col md={12}>
                    <Card>
                        <h4 className="text-center my-4">Relatório de postagens</h4>
                    </Card>
                    {items.length > 0 &&
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>Título da postagem</th>
                                <th>Comentários</th>
                                <th>Curtidas</th>
                                <th>Não Curtidas</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map((item) => (
                                <tr className="align-middle" key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.comment_count || 0}</td>
                                    <td>{item.likes_count || 0}</td>
                                    <td>{item.unlike_count || 0}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Analytics;
