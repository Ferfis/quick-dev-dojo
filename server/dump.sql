# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.31)
# Database: quickdev-dojo
# Generation Time: 2023-02-09 18:41:26 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `post_id` int(11) unsigned NOT NULL,
  `description` text NOT NULL,
  `removed_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;

INSERT INTO `comment` (`id`, `user_id`, `post_id`, `description`, `removed_by`, `created_at`, `updated_at`)
VALUES
	(7,11,22,'adssd ad ',11,'2023-02-08 15:43:27','2023-02-08 17:01:47'),
	(8,18,22,'Outo texto qualquer',NULL,'2023-02-08 15:43:27','2023-02-08 12:49:48'),
	(9,11,21,'Teste final',11,'2023-02-08 15:55:59','2023-02-09 16:42:17'),
	(10,18,21,'Teste shaiane',18,'2023-02-08 15:55:59','2023-02-08 13:49:56'),
	(11,11,20,'Coment??rio de teste',NULL,'2023-02-08 17:01:25','2023-02-09 13:55:38'),
	(12,19,20,'Show!',NULL,'2023-02-09 18:36:35','2023-02-09 18:36:35');

/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table post
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `image` varchar(100) NOT NULL DEFAULT '',
  `title` varchar(100) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `status` char(10) DEFAULT NULL,
  `views` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;

INSERT INTO `post` (`id`, `user_id`, `image`, `title`, `description`, `status`, `views`, `created_at`, `updated_at`)
VALUES
	(20,11,'/uploads/posts/1675792543896.webp','Aprova????o de agrot??xicos no Brasil bate recorde anual desde 2016','<p>A aprova????o de novos agrot??xicos no Brasil vem crescendo ano a ano desde 2016, renovando recordes.</p><p><br></p><p>Somente em 2022, 652 agrot??xicos foram liberados, uma alta de 16% em rela????o a 2016 e o maior n??mero j?? registrado pela s??rie hist??rica da Coordena????o-Geral de Agrot??xicos e Afins (CGAA) do Minist??rio da Agricultura, que come??ou h?? 23 anos.</p><p><br></p><p>Uma das mudan??as foi a atra????o de servidores de outras ??reas da Anvisa para o setor de agrot??xicos, por exemplo. Um dos objetivos era acelerar as an??lises.</p><p><br></p><p>O professor da Escola Superior de Agricultura da USP Jos?? Oct??vio Mentem tamb??m associa o recorde a uma maior efici??ncia dos ??rg??os registrantes. S??o estes: Anvisa, Ibama (que analisa os riscos ambientais) e o Minist??rio da Agricultura, que formaliza os registros.</p><p><br></p><p>\"Ainda existe uma fila muito grande, mas devido ?? melhor articula????o entre Anvisa, Ibama e Minist??rio da Agricultura, houve esse aumento dos produtos registrados\", acrescenta.</p>','publish',6,'2023-02-07 17:35:51','2023-02-09 16:56:07'),
	(21,11,'/uploads/posts/1675793052600.webp','B3 (B3SA3): discuss??es sobre concorr??ncia ressurgem ap??s opera????o feita pelo Mubadala.','<p>A Americas Trading Group (ATG), empresa brasileira de tecnologia, recebeu, nesta semana, um aporte da Mubadala Capital, respons??vel por fazer a gest??o de ativos do fundo soberano de Abu Dhabi. O valor dos recursos n??o foi divulgado. Mas, de acordo com o comunicado do Mubadala, a inje????o de capital t??m como objetivo acelerar o crescimento da plataforma da ATG e fomentar o desenvolvimento de novos tecnologias.</p><p><br></p><p>A ATG ?? dona de uma plataforma de negocia????o eletr??nica de ativos financeiros e faz o trading de a????es listadas em Bolsas da Am??rica Latina. Com o aporte do Mubadala, a empresa poder?? retomar o prop??sito de quando foi criada: lan??ar uma nova Bolsa no Brasil e, dessa forma, se tornar um competidora da B3 (B3SA3).</p><p><br></p><p>Com isso, ??s 14h10 (hor??rio de Bras??lia), a a????o B3SA3 recuava 3,39%, a R$ 11,70, ainda que analistas ponderem os efeitos da concorr??ncia para a operadora da Bolsa.</p>','publish',74,'2023-02-07 18:04:13','2023-02-09 11:14:33'),
	(22,18,'/uploads/posts/1675795644747.webp','CEO defende viabilidade operacional da Oi (OIBR3) e diz que foco ?? reestruturar d??vida','<p>O CEO da Oi (OIBR3), Rodrigo Abreu, defendeu na manh?? desta ter??a-feira, 7, que a companhia ?? sustent??vel do ponto de vista de estrat??gia e opera????o e que a reestrutura????o da d??vida financeira da empresa n??o ir?? afetar as atividades. ???Ela carrega d??vida do passado. N??o tem nada a ver com a opera????o atual da companhia???, disse Abreu. As declara????es foram dadas ap??s os executivos da empresa sa??rem de reuni??o em Bras??lia com a Ag??ncia Nacional de Telecomunica????es (Anatel).</p><p><br></p><p>De acordo com Abreu, o encontro teve car??ter de ???acompanhamento de status??? da Oi, em que ela prestou contas e mostrou seus planos e passos para a sustentabilidade futura da tele. ???Se n??o acredit??ssemos na sustentabilidade n??o estar??amos fazendo todo o plano que estamos fazendo h?? bastante tempo???, disse a jornalistas. ???A Anatel tem dever de of??cio de acompanhar concess??o.???</p><p><br></p><p>A reuni??o aconteceu ap??s a companhia precisar buscar na Justi??a prote????o contra seus credores, pouco mais de um m??s ap??s ter decretado o fim de seu processo de recupera????o judicial. Nesse contexto, Abreu dividiu o plano da empresa em tr??s blocos de atua????o. O primeiro, ???operacional???, relativo a continuidade do processo de reconstru????o da empresa, focada no neg??cio de fibra. ???Fizemos aposta estrat??gica de investimento em fibra, j?? agora h?? pouco mais de tr??s anos. E de fato se n??o tivesse sido feito a companhia n??o teria perspectiva para futuro, ela tem aspira????o de se tornar maior empresa de fibra do Pa??s, do ponto de vista de banda larga???, afirmou o Executivo.</p><p><br></p><p><br></p><p>O segundo pilar ?? o de reestrutura????o de d??vida. Defendendo que a opera????o da Oi ?? vi??vel e que o problema da d??vida passada foi parcialmente resolvido com a primeira recupera????o judicial, Abreu destacou que se ???nada for feito???, a d??vida que a tele carrega n??o ?? compat??vel com a capacidade de gera????o de resultados futuros. ?? por isso, segundo ele, que a empresa est?? focada na reestrutura????o desse passivo, ???primordialmente??? o financeiro.</p><p><br></p>','publish',149,'2023-02-07 18:47:25','2023-02-08 22:12:43'),
	(25,19,'/uploads/posts/1675967715173.png','Figma e seus erros','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at tellus non risus rutrum dapibus. Morbi sit amet consectetur turpis, sed fermentum nisi. Aenean leo nisi, blandit eu dictum at, porta at libero. Sed fermentum pellentesque est, vitae maximus nunc sodales vel. Nam eget urna id justo tempor venenatis. Sed lobortis rhoncus mi eget dapibus. Proin sit amet bibendum risus. Duis pellentesque sodales eros eget luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin sem velit, iaculis et turpis eget, scelerisque fermentum lacus.</p><p><br></p><p>Nam vel bibendum metus. Integer scelerisque risus a nibh vehicula vehicula. Proin cursus vulputate tellus, non feugiat ligula porttitor in. Phasellus id mollis dui. In aliquet ac lectus eget consectetur. Sed consequat leo nec enim rhoncus tristique. Fusce porttitor nibh sit amet augue ultrices cursus. Sed et mollis felis. Nam ac facilisis mi, ac eleifend dolor.</p><p><br></p><p>Sed pretium mattis lorem in semper. In scelerisque facilisis nisi, non feugiat tortor euismod quis. Aenean eget nisi felis. Nam bibendum enim vitae leo scelerisque, ut commodo nisi scelerisque. Praesent eget imperdiet augue, in consequat felis. Nullam sed viverra ipsum. Maecenas id tempor magna, vel efficitur sem. Nunc id sollicitudin velit, non maximus libero. Curabitur ultricies, nibh vel pulvinar pulvinar, eros eros ultricies lectus, ut egestas augue massa commodo enim.</p><p><br></p>','publish',1,'2023-02-09 18:35:15','2023-02-09 18:35:15');

/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table post_actions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post_actions`;

CREATE TABLE `post_actions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `post_id` int(11) unsigned NOT NULL,
  `type` int(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_actions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_actions_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `post_actions` WRITE;
/*!40000 ALTER TABLE `post_actions` DISABLE KEYS */;

INSERT INTO `post_actions` (`id`, `user_id`, `post_id`, `type`, `created_at`, `updated_at`)
VALUES
	(1,11,22,0,'2023-02-09 00:10:07','2023-02-09 11:02:25'),
	(4,18,22,1,'2023-02-09 00:10:07','2023-02-09 00:10:07'),
	(8,11,21,1,'2023-02-09 11:04:05','2023-02-09 11:04:05'),
	(9,11,20,1,'2023-02-09 11:04:19','2023-02-09 11:04:19'),
	(10,19,20,1,'2023-02-09 18:36:28','2023-02-09 18:36:28');

/*!40000 ALTER TABLE `post_actions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table post_history
# ------------------------------------------------------------

DROP TABLE IF EXISTS `post_history`;

CREATE TABLE `post_history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(11) unsigned NOT NULL,
  `image` varchar(100) NOT NULL DEFAULT '',
  `title` varchar(100) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_history_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `post_history` WRITE;
/*!40000 ALTER TABLE `post_history` DISABLE KEYS */;

INSERT INTO `post_history` (`id`, `post_id`, `image`, `title`, `description`, `created_at`)
VALUES
	(1,21,'/uploads/posts/1675793052600.webp','B3 (B3SA3): discuss??es sobre concorr??ncia ressurgem ap??s opera????o feita pelo Mubadala.','<p>A Americas Trading Group (ATG), empresa brasileira de tecnologia, recebeu, nesta semana, um aporte da Mubadala Capital, respons??vel por fazer a gest??o de ativos do fundo soberano de Abu Dhabi. O valor dos recursos n??o foi divulgado. Mas, de acordo com o comunicado do Mubadala, a inje????o de capital t??m como objetivo acelerar o crescimento da plataforma da ATG e fomentar o desenvolvimento de novos tecnologias.</p><p><br></p><p>A ATG ?? dona de uma plataforma de negocia????o eletr??nica de ativos financeiros e faz o trading de a????es listadas em Bolsas da Am??rica Latina. Com o aporte do Mubadala, a empresa poder?? retomar o prop??sito de quando foi criada: lan??ar uma nova Bolsa no Brasil e, dessa forma, se tornar um competidora da B3 (B3SA3).</p><p><br></p><p>Com isso, ??s 14h10 (hor??rio de Bras??lia), a a????o B3SA3 recuava 3,39%, a R$ 11,70, ainda que analistas ponderem os efeitos da concorr??ncia para a operadora da Bolsa.</p>','2023-02-09 00:03:27'),
	(2,21,'/uploads/posts/1675793052600.webp','B3 (B3SA3): discuss??es sobre concorr??ncia ressurgem ap??s opera????o feita pelo Mubadala.','<p>A Americas Trading Group (ATG), empresa brasileira de tecnologia, recebeu, nesta semana, um aporte da Mubadala Capital, respons??vel por fazer a gest??o de ativos do fundo soberano de Abu Dhabi. O valor dos recursos n??o foi divulgado. Mas, de acordo com o comunicado do Mubadala, a inje????o de capital t??m como objetivo acelerar o crescimento da plataforma da ATG e fomentar o desenvolvimento de novos tecnologias.</p><p><br></p><p>A ATG ?? dona de uma plataforma de negocia????o eletr??nica de ativos financeiros e faz o trading de a????es listadas em Bolsas da Am??rica Latina. Com o aporte do Mubadala, a empresa poder?? retomar o prop??sito de quando foi criada: lan??ar uma nova Bolsa no Brasil e, dessa forma, se tornar um competidora da B3 (B3SA3).</p><p><br></p><p>Com isso, ??s 14h10 (hor??rio de Bras??lia), a a????o B3SA3 recuava 3,39%, a R$ 11,70, ainda que analistas ponderem os efeitos da concorr??ncia para a operadora da Bolsa.</p>','2023-02-09 00:06:52'),
	(3,21,'/uploads/posts/1675793052600.webp','B3 (B3SA3): discuss??es sobre concorr??ncia ressurgem ap??s opera????o feita pelo Mubadala.','<p>A Americas Trading Group (ATG), empresa brasileira de tecnologia, recebeu, nesta semana, um aporte da Mubadala Capital, respons??vel por fazer a gest??o de ativos do fundo soberano de Abu Dhabi. O valor dos recursos n??o foi divulgado. Mas, de acordo com o comunicado do Mubadala, a inje????o de capital t??m como objetivo acelerar o crescimento da plataforma da ATG e fomentar o desenvolvimento de novos tecnologias.</p><p><br></p><p>A ATG ?? dona de uma plataforma de negocia????o eletr??nica de ativos financeiros e faz o trading de a????es listadas em Bolsas da Am??rica Latina. Com o aporte do Mubadala, a empresa poder?? retomar o prop??sito de quando foi criada: lan??ar uma nova Bolsa no Brasil e, dessa forma, se tornar um competidora da B3 (B3SA3).</p><p><br></p><p>Com isso, ??s 14h10 (hor??rio de Bras??lia), a a????o B3SA3 recuava 3,39%, a R$ 11,70, ainda que analistas ponderem os efeitos da concorr??ncia para a operadora da Bolsa.</p>','2023-02-09 11:14:33'),
	(4,20,'/uploads/posts/1675792543896.webp','Aprova????o de agrot??xicos no Brasil bate recorde anual desde 2016','<p>A aprova????o de novos agrot??xicos no Brasil vem crescendo ano a ano desde 2016, renovando recordes.</p><p><br></p><p>Somente em 2022, 652 agrot??xicos foram liberados, uma alta de 16% em rela????o a 2016 e o maior n??mero j?? registrado pela s??rie hist??rica da Coordena????o-Geral de Agrot??xicos e Afins (CGAA) do Minist??rio da Agricultura, que come??ou h?? 23 anos.</p><p><br></p><p>Uma das mudan??as foi a atra????o de servidores de outras ??reas da Anvisa para o setor de agrot??xicos, por exemplo. Um dos objetivos era acelerar as an??lises.</p><p><br></p><p>O professor da Escola Superior de Agricultura da USP Jos?? Oct??vio Mentem tamb??m associa o recorde a uma maior efici??ncia dos ??rg??os registrantes. S??o estes: Anvisa, Ibama (que analisa os riscos ambientais) e o Minist??rio da Agricultura, que formaliza os registros.</p><p><br></p><p>\"Ainda existe uma fila muito grande, mas devido ?? melhor articula????o entre Anvisa, Ibama e Minist??rio da Agricultura, houve esse aumento dos produtos registrados\", acrescenta.</p>','2023-02-09 16:56:07');

/*!40000 ALTER TABLE `post_history` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(191) NOT NULL DEFAULT '',
  `password` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`)
VALUES
	(11,'Fernando Leoncio Santos','fernando.leoncio@hotmail.com','e10adc3949ba59abbe56e057f20f883e','2023-02-09 17:45:10','2023-02-09 17:45:10'),
	(18,'Shaiane Melo','shaiane_leoncio@hotmail.com','d438129538c9edef265f053a97a8bc40','2023-02-07 18:23:31','2023-02-07 18:23:31'),
	(19,'Teste','teste@teste.com.br','d438129538c9edef265f053a97a8bc40','2023-02-09 18:34:25','2023-02-09 18:34:25');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
