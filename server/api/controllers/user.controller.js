const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

exports.init = (req, res) => {
    res.send({ message: 'Hello, world!' });
}

exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.create = (req, res) => {
    // Data atual no formato Y-m-dZH:i:s
    const currentDate = new Date().toISOString().replace("Z", "");
    // Cria o objeto com os dados recebidos na requisição.
    const user = {
        id: req.body && req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created_at: currentDate,
        updated_at: currentDate
    };

    // Verifica se já existe algum usuário com endereço de e-mail informado.
    User.find('email', user.email, (err, data) => {
        if (err) throw err; // Trata qualquer erro
        // Cria o usuário na tabela User
        if(typeof user.id === "undefined") {
            // Se existir um e-mail já cadastrado interrompe o fluxo com status 409(Conflito de dados)
            if(data[0]) {
                res.status(409).json({ message: 'Já existe um usuário com este endereço de e-mail.' });
                return false;
            }
            User.create(user, (err, rs) => {
                if (err) throw err;
                res.status(201).json({ message: 'Cadastro efetuado com sucesso!', rs });
            });
        } else {
            User.update(user.id, user, (err, rs) => {
                if (err) throw err;
                res.status(201).json({ message: 'Cadastro atualizado com sucesso!', user });
            });
        }
    })
}

exports.find = (req, res) => {
    User.find(req.body.id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

