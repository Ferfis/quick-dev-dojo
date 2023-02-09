const express = require('express');
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const User = require('../models/user.model');
const Post = require("../models/posts.model");
const PostHistory = require("../models/posts_history.model");

exports.getAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.getAnalytics = (req, res) => {
    Post.getAnalytics((err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.create = (req, res) => {
    // Data atual no formato Y-m-dZH:i:s
    const currentDate = new Date().toISOString().replace("Z", "");

    // Define o path para salvar a imagem de capa da postagem
    const path = "./public/uploads/posts/";

    // Cria o objeto com os dados recebidos na requisição.
    let post = {
        id: req.body && req.body.id,
        user_id: req.body.user_id,
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        views: req.body.views ? req.body.views : 0,
        created_at: currentDate,
        updated_at: currentDate
    };
    // Trata a extensão do arquivo baseado no prefixo base64
    const base64Header = post.image.substring(0, 50);
    let extension = '';
    if (base64Header.startsWith('data:image/jpeg;')) {
        extension = '.jpeg';
    } else if (base64Header.startsWith('data:image/png;')) {
        extension = '.png';
    } else if (base64Header.startsWith('data:image/gif;')) {
        extension = '.gif';
    } else if (base64Header.startsWith('data:image/webp;')) {
        extension = '.webp';
    }

    // Se houver uma extensão removida do prefixo base64 é porque houve atualização da imagem.
    if(extension !== '') {
        // Caminho completo onde será salva a imagem
        const fullPath = path + new Date().getTime() + extension;

        // Remove o prefixo para tratar somente os dados da imagem
        const imageData = post.image.replace(/^data:image\/\w+;base64,/, '');

        // Salva a imagem de capa
        fs.writeFile(fullPath, imageData, 'base64', (err) => {
            if (err) throw err;
        });
        // Atribui o valor de fullPath para post.image
        post.image = fullPath.replace('./public', '');
    } else {
        post.image = post.image.replace(req.body.server_url,'');
    }

    if(typeof post.id === "undefined") {
        // Insere registro na tabela Post
        Post.create(post, (err, rs) => {
            if (err) throw err;
            res.status(201).json({message: 'Postagem efetuada com sucesso!', rs});
        });
    } else {
        delete(post.created_at);
        Post.find('id', post.id, (err, rs) => {
            if (err) throw err;
            let lastPost = [];
            if(rs[0] && rs[0].id){
                lastPost = rs[0];
                lastPost.post_id = post.id;
                lastPost.created_at = currentDate;
            }

            delete(lastPost.id);
            delete(lastPost.user_id);
            delete(lastPost.updated_at);
            delete(lastPost.status);
            delete(lastPost.views);
            delete(lastPost.user_name);
            delete(lastPost.comment_count);

            PostHistory.create(lastPost, (errHistory, rsHistory) => {
                if (errHistory) throw errHistory;
                delete(post.post_id);
                Post.update(post.id, post, (error, result) => {
                    if (error) throw error;
                    res.status(201).json({message: 'Postagem atualizada com sucesso!'});
                })
            })
        })
    }
}
exports.updateView = (req, res) => {
    let objPost = req.body;
    delete(objPost.user_name);
    delete(objPost.created_at);
    delete(objPost.updated_at);
    delete(objPost.comment_count);
    Post.update(objPost.id, objPost, (error, result) => {
        if (error) throw error;
        res.status(201).json({message: 'Visualização atualizada com sucesso!'});
    })
}

exports.getByUser = (req, res) => {
    Post.find('user_id', req.headers.user_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.getPostHistory = (req, res) => {
    PostHistory.find('post_id', req.headers.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}

exports.find = (req, res) => {
    Post.find('id', req.headers.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data[0]);
    });
}

exports.delete = (req, res) => {
    Post.delete(req.body.post_id, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
}
