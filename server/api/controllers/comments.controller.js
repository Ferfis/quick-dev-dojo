const express = require('express');
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const User = require('../models/user.model');
const Post = require("../models/posts.model");
const PostHistory = require("../models/posts_history.model");
const Comments = require("../models/comments.model");

exports.getAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.create = (req, res) => {
    // Data atual no formato Y-m-dZH:i:s
    const currentDate = new Date().toISOString().replace("Z", "");

    // Cria o objeto com os dados recebidos na requisição.
    let comment = {
        id: req.body && req.body.id,
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        description: req.body.description,
        created_at: currentDate,
        updated_at: currentDate
    };
    if(!comment.id) {
        delete(comment.id);
        // Insere registro na tabela Post
        Comments.create(comment, (err, rs) => {
            if (err) throw err;
            res.status(201).json({message: 'Postagem efetuada com sucesso!', rs});
        });
    } else {
        delete(comment.created_at);
        Comments.update(comment.id, comment, (error, result) => {
            if (error) throw error;
            res.status(201).json({message: 'Postagem atualizada com sucesso!'});
        });
    }
}

exports.removedBy = (req, res) => {
    Comments.find('id', req.body.id, (err, data) => {
        if (err) throw err;
        let objComment = data[0];
        objComment.removed_by = req.body.user_id;
        delete(objComment.user_name);
        Comments.update(objComment.id, objComment, (error, result) => {
            if (error) throw error;
            res.status(201).json({message: 'Comentário moderado com sucesso.'});
        });
    });
}

exports.getByUser = (req, res) => {
    Comments.find('user_id', req.headers.user_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.getByPost = (req, res) => {
    Comments.find('post_id', req.headers.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.getCommentsByUser = (req, res) => {
    console.log(req.headers.user_id);
    Comments.findByUser(req.headers.user_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.find = (req, res) => {
    Comments.find('id', req.headers.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data[0]);
    });
}

exports.delete = (req, res) => {
    Comments.delete(req.body.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}
