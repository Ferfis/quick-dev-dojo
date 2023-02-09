import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import { connect } from "react-redux";
import {Container, Row, Col, Image, ListGroup, Nav, Navbar,} from "react-bootstrap";

const SideMenu = (props) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/login');

    }
    return (
        <Col md={3} className="d-none d-md-block bg-light sidebar">
            <h5 className="text-center mt-3">
                {props.objUser && props.objUser.name}
                <br/>
                <small>
                    <Link to="/dashboard/profile">Meu Perfil</Link>
                </small>
                <small className="px-2">|</small>
                <small onClick={logout}>Sair</small>
            </h5>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Link to="/dashboard">Início</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/dashboard/posts">Meus Posts</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/dashboard/comments">Comentários</Link>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )
}

const mapStateToProps = (state) => {
    return {
        objUser: state.objUser
    };
};

export default connect(mapStateToProps)(SideMenu);
