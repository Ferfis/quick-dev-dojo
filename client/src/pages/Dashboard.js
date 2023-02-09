import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "../css/Dashboard.css";
import axios from "axios";
import {API_URL, SERVER_URL} from "../constants";
import SideMenu from "./components/SideMenu";
import {connect} from "react-redux";
import {Container, Row, Col, Card, Button,} from "react-bootstrap";
import {encrypt, stripHTMLTags, truncateText, ValidateToken} from "../Utils";

const Dashboard = (props) => {
    ValidateToken();
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState('');
    const getAllPosts = () => {
        axios.get(API_URL + '/posts/get-all', {}).then((rs) => {
            setPosts(rs.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if(limit < 1) {
            getAllPosts();
            setLimit(1);
        }
    });

    return (
        <Container className="dashboard-container" fluid>
            <Row>

                <SideMenu/>

                <Col md={9}>
                    <h2 className="my-4 text-center">Veja as últimas postagens</h2>
                    <Row>
                        {posts.map((item) => (
                        <Col md={4} key={item.id} className='card-container mb-4'>
                            <Card>
                                <Card.Img variant="top" src={SERVER_URL + item.image}/>
                                <Card.Body>
                                    <Card.Title className='mb-0'>{truncateText(item.title, 50, 50)}</Card.Title>
                                    <small className='pb-5'>Por: {item.user_name}</small>
                                    <Card.Text className='mt-2'>
                                        {truncateText(stripHTMLTags(item.description), 50, 100)}
                                    </Card.Text>
                                    <Link to={`/dashboard/post/view/${encodeURIComponent(encrypt(item.id.toString()))}`}>
                                        <Button variant="primary">Ver mais</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
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

export default connect(mapStateToProps)(Dashboard);
