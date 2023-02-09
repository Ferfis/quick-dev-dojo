const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const md5 = require("md5-hash")
const jwt = require('jsonwebtoken');

exports.init = (req, res) => {
    res.send({ message: 'Hello, world!' });
}

exports.login = (req, res) => {
    // Cria o objeto com os dados recebidos na requisição.
    const userLogin = {
        email: req.body.email,
        password: req.body.password,
    };
    // Verifica se já existe algum usuário com endereço de e-mail informado.
    User.find('email', userLogin.email, (err, data) => {
        if (err) throw err; // Trata qualquer erro
        const user = data[0];
        // Se não for encontrado nenhum usuário retorna 404 para aplicação
        if(!user) {
            res.status(404).json({ message: 'Login ou senha inválidos.' });
            return false;
        }
        // Se o usuário for encontrado, compara as senhas criando a hash da senha atual enviada.
        // Se a autenticação for bem sucedida cria o token e envia com status 200
        if(md5.default(userLogin.password) === user.password) {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            res.status(200).json({ token });
        }
    })
}

exports.validateUserToken = (req, res) => {
    // Atribuo o token recebido na requisição a variavel abaixo
    let token = req.headers.authorization;
    // Removo o prefixo Bearer para isolar somente o token enviado
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }
    // Se não hover nenhum token após a tratativa acima, retorna o erro.
    if(!token) {
        res.status(404).json({ message: 'Token não encontrado.' });
    }
    // Com o token isolado, verifica se ele é autentico
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    // Se não foi retorna o erro com status 409
    if (!verified) {
        res.status(409).json({ message: 'Token inválido.' });
    }
    // Com o token autenticado extraio os dados do usuário
    objJwt = jwt.decode(token);

    // Verifica se já existe algum usuário com endereço de e-mail informado.
    User.find('id', objJwt.id, (err, data) => {
        if (err) throw err; // Trata qualquer erro
        const user = data[0];
        // Se não for encontrado nenhum usuário retorna 404 para aplicação
        if(!user) {
            res.status(404).json({ message: 'Nenhum usuário encontrado.' });
            return false;
        }
        // Se o usuário for encontrado, retorn os dados como 200.
        res.status(200).json(user);

    })
}
