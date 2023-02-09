const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require('../controllers/user.controller');
const postController = require('../controllers/posts.controller');
const commentsController = require('../controllers/comments.controller');
const postsActionsController = require('../controllers/posts-actions.controller');

router.post('/api/auth/login', authController.login);
router.get('/api/auth/validate', authController.validateUserToken);

router.get('/api/users/get-all', userController.getAll);
router.post('/api/users/create', userController.create);
router.post('/api/users/get', userController.find);

router.post('/api/posts/create', postController.create);
router.get('/api/posts/get-all', postController.getAll);
router.get('/api/posts/get-analytics', postController.getAnalytics);
router.get('/api/posts/get-by-user', postController.getByUser);
router.get('/api/posts/get-history', postController.getPostHistory);
router.get('/api/posts/find', postController.find);
router.post('/api/posts/update-view', postController.updateView);
router.post('/api/posts/delete', postController.delete);

router.post('/api/comments/create', commentsController.create);
router.get('/api/comments/get-by-post', commentsController.getByPost);
router.get('/api/comments/get-by-user', commentsController.getCommentsByUser);
router.post('/api/comments/removed-by', commentsController.removedBy);

router.post('/api/post-action/create', postsActionsController.create);
router.get('/api/post-action/get-by-post-user', postsActionsController.getByPost);

module.exports = router;
