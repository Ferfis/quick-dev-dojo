const express = require('express');

const PostsActions = require("../models/posts-actions.model");

exports.create = (req, res) => {
    // Data atual no formato Y-m-dZH:i:s
    const currentDate = new Date().toISOString().replace("Z", "");

    // Cria o objeto com os dados recebidos na requisição.
    let action = {
        id: req.body && req.body.id,
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        type: req.body.type,
        created_at: currentDate,
        updated_at: currentDate
    };

    // Verifica se já exite um comentário com o post_id e user_id cadatrado
    if(!action.id) {
        delete(action.id);
        // Insere registro na tabela Post
        PostsActions.create(action, (err, rs) => {
            if (err) throw err;
            res.status(201).json({message: 'Ação efetuado com sucesso!', rs});
        });
    } else {
        delete(action.created_at);
        PostsActions.update(action.id, action, (error, rs) => {
            if (error) throw error;
            res.status(201).json({message: 'Ação atualizada com sucesso!', rs});
        });
    }
}

exports.getByUser = (req, res) => {
    PostsActions.find('user_id', req.headers.user_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.getByPost = (req, res) => {
    PostsActions.findByPost(req.headers.user_id, req.headers.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.find = (req, res) => {
    PostsActions.find('id', req.headers.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data[0]);
    });
}

exports.delete = (req, res) => {
    PostsActions.delete(req.body.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}
