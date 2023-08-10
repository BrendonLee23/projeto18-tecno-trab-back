--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    id integer NOT NULL,
    name text NOT NULL,
    image text,
    description text,
    "providerId" integer,
    "phoneNumber" text,
    "isAvailable" boolean DEFAULT true,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    born date,
    email text NOT NULL,
    password text NOT NULL,
    address text,
    "phoneNumber" text,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "confirmPassword" text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.services VALUES (1, 'Manutenção de Computadores', 'https://www.plurifilter.com/wp-content/uploads/2022/07/slide_4.jpg', 'Realização de manutenção preventiva e corretiva em computadores.', 1, '123-456-7890', true, '2023-08-09 18:47:17.092272');
INSERT INTO public.services VALUES (3, 'Limpeza de Computadores e Notebooks', 'https://www.notebookgoiania.com.br/wp-content/uploads/2017/12/Limpeza-Interna-Promocional-e1513353390795.jpg', 'Limpeza física e remoção de poeira em computadores e notebooks.', 2, '987-654-3210', true, '2023-08-09 19:11:02.814812');
INSERT INTO public.services VALUES (4, 'Formatação de Computadores', 'https://milksystems.com.br/wp-content/uploads/2020/11/hora-de-formatar-o-computador.jpg', 'Formatação e reinstalação do sistema operacional em computadores.', 1, '123-456-7890', true, '2023-08-09 19:14:07.843574');
INSERT INTO public.services VALUES (5, 'Instalação de Computadores', 'https://usnenergia.com.br/images/produtos/instalacao-e-manutencoes-de-armario-de-pc-1657650544.jpeg', 'Montagem e configuração de novos computadores.', 3, '555-555-5555', true, '2023-08-09 19:24:48.080654');
INSERT INTO public.services VALUES (6, 'Montagem de Computadores', 'https://apptuts.b-cdn.net/wp-content/uploads/2019/11/montagem-do-PC.jpg', 'Montagem personalizada de computadores de acordo com as especificações do cliente.', 3, '555-555-5555', true, '2023-08-09 19:27:25.414921');
INSERT INTO public.services VALUES (7, 'Atualização de Softwares', 'https://st3.depositphotos.com/3591429/13954/i/450/depositphotos_139548436-stock-photo-business-man-using-laptop.jpg', 'Atualização e otimização de softwares em computadores.', 2, '987-654-3210', true, '2023-08-09 20:26:09.050665');
INSERT INTO public.services VALUES (8, 'Instalação de Antivírus', 'https://gtrigueiro.com.br/wp-content/uploads/2020/09/Melhores-antivirus-gratis.jpg', 'Instalação e configuração de programas antivírus.', 1, '123-456-7890', true, '2023-08-09 20:27:16.859173');
INSERT INTO public.services VALUES (9, 'Limpeza de Malware', 'https://as1.ftcdn.net/v2/jpg/01/73/26/64/1000_F_173266464_PdFSO4gvub1mHXCueeOphAnnYB6KdqWt.jpg', 'Remoção de malware e programas indesejados de computadores.', 4, '999-999-9999', true, '2023-08-09 20:28:46.389659');
INSERT INTO public.services VALUES (10, 'Recuperação de Dados', 'https://datarestore.com.br/wp-content/uploads/2022/08/datarestore-hd-especializada-recuperacao-dados-brasil.jpg', 'Recuperação de dados perdidos ou danificados em dispositivos de armazenamento.', 4, '999-999-9999', true, '2023-08-09 20:30:19.94984');
INSERT INTO public.services VALUES (11, 'Backup de Dados', 'https://www.artbackup.com.br/wp-content/uploads/2021/09/como-vender-backup-em-nuvem.jpg', 'Criação de cópias de segurança dos dados para prevenção de perda.', 5, '111-111-1111', true, '2023-08-09 20:32:09.717565');
INSERT INTO public.services VALUES (12, 'Limpeza de Notebooks', 'https://m.media-amazon.com/images/I/61cDtbVe1LL._AC_UF894,1000_QL80_.jpg', 'Limpeza física e remoção de poeira em notebooks para melhorar o desempenho e prolongar a vida útil.', NULL, '987-654-3210', true, '2023-08-10 01:40:13.011099');
INSERT INTO public.services VALUES (13, 'Manutenção de Celulares', 'https://4c2c29a79ea051f14213-535d54466216051cb9b2b5848604e921.ssl.cf1.rackcdn.com/FotoInicial/curso-de-manutencao-em-celular-maiscell-sao-jose-do-rio-preto_o1f5lthi091qbq1lqi1kj4q4415l99_3.jpg', 'Limpeza e conserto de smartphones em geral.', 7, '987-654-3210', true, '2023-08-10 01:49:48.767731');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '696122ff-1371-4c1f-98f7-f6d61ad3001a', 1, '2023-08-09 08:55:28.980951');
INSERT INTO public.sessions VALUES (2, 'e6e604ef-9d03-46ee-8af8-3e3f90c547e7', 7, '2023-08-10 00:34:51.089282');
INSERT INTO public.sessions VALUES (3, 'b58c9f06-b9cc-4a82-987a-c3a10962fb23', 7, '2023-08-10 00:34:52.975484');
INSERT INTO public.sessions VALUES (4, '948db274-8e6c-4c8f-a2cc-7f5db0007e65', 7, '2023-08-10 00:47:05.319036');
INSERT INTO public.sessions VALUES (5, '1209b71f-b451-4336-80fa-07f01dca1e17', 7, '2023-08-10 01:29:25.184771');
INSERT INTO public.sessions VALUES (6, '5de0e7c0-3d85-45e3-b0b3-ed1e690c761b', 7, '2023-08-10 01:30:16.093311');
INSERT INTO public.sessions VALUES (7, '2bb9969c-5712-43db-a44b-8f9056a326ca', 7, '2023-08-10 01:32:37.368598');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Brendo', '1990-01-01', 'brendo@driven.com', '$2b$10$31Jt5.SvzW1Hi2zWdRBJAObVWyCrzVT5DdMg4EGZVft50gSvZ7Vvu', NULL, '11982888888', '2023-08-08 20:34:28.17302', '$2b$10$1gegBHrSWJZ5Bfgo0MDwjOpMCYMGmaJQj6j0rbGjWbnHl5XG4x1o.');
INSERT INTO public.users VALUES (2, 'Ana Oliveira', '1993-10-02', 'ana@example.com', '$2b$10$.fnp011h.CQh/0FGKVSwy.dOjYHNVrUbBiqn5jeDuirIkZdgh8wGq', NULL, '555-123-4567', '2023-08-09 19:09:06.714841', '$2b$10$rAI76T0hstccNHJ7jXE0m.EdutWEyP6bTsnTApp1qov9vP8qSfNJW');
INSERT INTO public.users VALUES (3, 'Lucas Costa', '1988-03-18', 'lucas@example.com', '$2b$10$fjG3wuyrkH/2C81PCXGZeu.Q7uyVggWaJWtP4F0unq3qY/utHpc0a', NULL, '555-987-6543', '2023-08-09 19:09:50.790758', '$2b$10$VIUWXZMDAmdEcoQ54BtXzu6STwsganwCZjkoG10QZXVXa/zjHYKbm');
INSERT INTO public.users VALUES (4, 'Fernanda Almeida', '1995-07-25', 'fernanda@example.com', '$2b$10$i59iSuvTPd9XCjEyecvDN.Y2ZseT/4hYLi4kwifQwcHaLNQZJIUqO', NULL, '555-789-0123', '2023-08-09 19:10:02.515244', '$2b$10$Uk8dN1sMs7XDe.Rdwa85aewo51MRRFKZAXsSSf24IHiuiFXkx9KiW');
INSERT INTO public.users VALUES (5, 'Rafael Souza', '1992-01-12', 'rafael@example.com', '$2b$10$mt4pDNtipUXjFl2hCOLqA.RJvmX0qDOjnCYqgLmQkrGFpk/zcZtiS', NULL, '555-456-7890', '2023-08-09 19:10:25.402827', '$2b$10$lFCy6zcfnnxg8oZKn04xU.Q3AVo0dCuSCiB7zwOauusbJWPXTDpOu');
INSERT INTO public.users VALUES (6, 'Julia Pereira', '1998-06-08', 'julia@example.com', '$2b$10$QUETeOKfS5AmigAH5J6K8uuOUrWcUz5Po7OqMIcgVoxIQtumYtmue', NULL, '555-234-5678', '2023-08-09 19:10:41.357363', '$2b$10$Xw5aSNt8elPJg1c0QmT6FuXcsZOWzijsKVk1sNfuxynXWzxivRr1a');
INSERT INTO public.users VALUES (7, 'Bela', '1998-06-08', 'bela@example.com', '$2b$10$7zpH2ii0T678A3xoEvIwjuZTmtGEQj.WRMBas9KriKCR2JG3IpKG2', NULL, '555-234-5678', '2023-08-10 00:34:27.292717', '$2b$10$b0Fv2n/sXhzS/SB9Zo4pE.ZDj40jsa8E.RBdl6Q.MIOYeEALCKygy');
INSERT INTO public.users VALUES (8, 'Bela Safada', '1991-09-27', 'safabela@example.com', '$2b$10$TEGT0xKD.9fEgZBB3UCl2OWE7TWLeEXu94.Psz7B.0uI7ZED0vdm2', NULL, '555-567-1234', '2023-08-10 02:13:35.352542', '$2b$10$c/DfFHHfbveqtEZzOhb45ua4UBJ6phaXxeWanEUQz52n3dyeckiJe');


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.services_id_seq', 13, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: services services_providerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT "services_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

