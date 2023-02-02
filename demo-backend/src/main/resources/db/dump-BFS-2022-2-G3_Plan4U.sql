--
-- PostgreSQL database dump
--

-- Dumped from database version 11.16 (Debian 11.16-0+deb10u1)
-- Dumped by pg_dump version 14.2

-- Started on 2023-02-02 13:12:44

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

DROP DATABASE "Fullstack_2022_2_G3";
--
-- TOC entry 3010 (class 1262 OID 202899)
-- Name: Fullstack_2022_2_G3; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "Fullstack_2022_2_G3" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


\connect "Fullstack_2022_2_G3"

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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3011 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

--
-- TOC entry 209 (class 1259 OID 204748)
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    category character varying NOT NULL,
    photo character varying NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 204746)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 208
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 197 (class 1259 OID 203402)
-- Name: contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    phone integer NOT NULL,
    surname1 character varying(255) NOT NULL,
    surname2 character varying(255) NOT NULL
);


--
-- TOC entry 196 (class 1259 OID 203400)
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 196
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- TOC entry 199 (class 1259 OID 203413)
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id integer NOT NULL,
    description character varying(255),
    name character varying(255)
);


--
-- TOC entry 198 (class 1259 OID 203411)
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 198
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- TOC entry 200 (class 1259 OID 203422)
-- Name: profiles_sections_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles_sections_map (
    profile_id integer NOT NULL,
    section_id integer NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 204762)
-- Name: provinces; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.provinces (
    id integer NOT NULL,
    province_code character varying NOT NULL,
    province_name character varying NOT NULL
);


--
-- TOC entry 210 (class 1259 OID 204760)
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.provinces_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 210
-- Name: provinces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.provinces_id_seq OWNED BY public.provinces.id;


--
-- TOC entry 207 (class 1259 OID 204540)
-- Name: publications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.publications (
    id integer NOT NULL,
    title character varying NOT NULL,
    content text NOT NULL,
    create_date date,
    user_login character varying(255) NOT NULL,
    category_name character varying,
    province_name character varying,
    event_date timestamp without time zone,
    contact character varying NOT NULL,
    optional_contact character varying
);


--
-- TOC entry 206 (class 1259 OID 204538)
-- Name: publications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.publications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 206
-- Name: publications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.publications_id_seq OWNED BY public.publications.id;


--
-- TOC entry 202 (class 1259 OID 203427)
-- Name: sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sections (
    id integer NOT NULL,
    alias character varying(255),
    description character varying(255),
    name character varying(255)
);


--
-- TOC entry 201 (class 1259 OID 203425)
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 201
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;


--
-- TOC entry 205 (class 1259 OID 203841)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nif character varying(10),
    name character varying(255) NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255),
    email character varying(255),
    phone character varying(255),
    surname character varying(255)
);


--
-- TOC entry 204 (class 1259 OID 203839)
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
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 203 (class 1259 OID 203447)
-- Name: users_profiles_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_profiles_map (
    user_id integer NOT NULL,
    profile_id integer NOT NULL
);


--
-- TOC entry 2831 (class 2604 OID 204751)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 2826 (class 2604 OID 203405)
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- TOC entry 2827 (class 2604 OID 203416)
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- TOC entry 2832 (class 2604 OID 204765)
-- Name: provinces id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provinces ALTER COLUMN id SET DEFAULT nextval('public.provinces_id_seq'::regclass);


--
-- TOC entry 2830 (class 2604 OID 204543)
-- Name: publications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publications ALTER COLUMN id SET DEFAULT nextval('public.publications_id_seq'::regclass);


--
-- TOC entry 2828 (class 2604 OID 203430)
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);


--
-- TOC entry 2829 (class 2604 OID 203844)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3002 (class 0 OID 204748)
-- Dependencies: 209
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Deportes', 'Deportes');
INSERT INTO public.categories VALUES (2, 'Gastronomía', 'Gastronomía');
INSERT INTO public.categories VALUES (3, 'Ocio', 'Ocio');
INSERT INTO public.categories VALUES (4, 'Naturaleza', 'Naturaleza');
INSERT INTO public.categories VALUES (5, 'Viajes', 'Viajes');
INSERT INTO public.categories VALUES (6, 'Juegos', 'Juegos');
INSERT INTO public.categories VALUES (7, 'Otros', 'Otros');


--
-- TOC entry 2990 (class 0 OID 203402)
-- Dependencies: 197
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.contacts VALUES (1, 'prueba@gmail.com', 'Pepe', 657890324, 'Perez', 'Quevedo');
INSERT INTO public.contacts VALUES (2, 'prueba2@gmail.com', 'Mario', 657890564, 'Casas', 'Jimenez');
INSERT INTO public.contacts VALUES (3, 'asdasd@asas.com', 'Pedro', 121321223, 'asas', 'asasa');
INSERT INTO public.contacts VALUES (4, 'sergio.misa.garcia@gmail.com', 'das', 123213123, 'dsa', 'dsa');


--
-- TOC entry 2992 (class 0 OID 203413)
-- Dependencies: 199
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profiles VALUES (1, 'Acceso general', 'Administrador');
INSERT INTO public.profiles VALUES (2, 'Acceso usarios', 'Usuario');


--
-- TOC entry 2993 (class 0 OID 203422)
-- Dependencies: 200
-- Data for Name: profiles_sections_map; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profiles_sections_map VALUES (1, 1);
INSERT INTO public.profiles_sections_map VALUES (1, 2);
INSERT INTO public.profiles_sections_map VALUES (2, 1);
INSERT INTO public.profiles_sections_map VALUES (1, 3);
INSERT INTO public.profiles_sections_map VALUES (2, 2);
INSERT INTO public.profiles_sections_map VALUES (1, 4);
INSERT INTO public.profiles_sections_map VALUES (2, 4);
INSERT INTO public.profiles_sections_map VALUES (1, 5);
INSERT INTO public.profiles_sections_map VALUES (2, 5);
INSERT INTO public.profiles_sections_map VALUES (2, 6);
INSERT INTO public.profiles_sections_map VALUES (1, 6);


--
-- TOC entry 3004 (class 0 OID 204762)
-- Dependencies: 211
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.provinces VALUES (13, '13', 'Ciudad Real');
INSERT INTO public.provinces VALUES (16, '16', 'Cuenca');
INSERT INTO public.provinces VALUES (17, '17', 'Girona');
INSERT INTO public.provinces VALUES (18, '18', 'Granada');
INSERT INTO public.provinces VALUES (19, '19', 'Guadalajara');
INSERT INTO public.provinces VALUES (20, '20', 'Gipuzkoa');
INSERT INTO public.provinces VALUES (21, '21', 'Huelva');
INSERT INTO public.provinces VALUES (22, '22', 'Huesca');
INSERT INTO public.provinces VALUES (25, '25', 'Lleida');
INSERT INTO public.provinces VALUES (26, '26', 'Rioja, La');
INSERT INTO public.provinces VALUES (27, '27', 'Lugo');
INSERT INTO public.provinces VALUES (28, '28', 'Madrid');
INSERT INTO public.provinces VALUES (30, '30', 'Murcia');
INSERT INTO public.provinces VALUES (31, '31', 'Navarra');
INSERT INTO public.provinces VALUES (32, '32', 'Ourense');
INSERT INTO public.provinces VALUES (33, '33', 'Asturias');
INSERT INTO public.provinces VALUES (34, '34', 'Palencia');
INSERT INTO public.provinces VALUES (35, '35', 'Palmas, Las');
INSERT INTO public.provinces VALUES (36, '36', 'Pontevedra');
INSERT INTO public.provinces VALUES (37, '37', 'Salamanca');
INSERT INTO public.provinces VALUES (38, '38', 'Santa Cruz de Tenerife');
INSERT INTO public.provinces VALUES (39, '39', 'Cantabria');
INSERT INTO public.provinces VALUES (40, '40', 'Segovia');
INSERT INTO public.provinces VALUES (41, '41', 'Sevilla');
INSERT INTO public.provinces VALUES (42, '42', 'Soria');
INSERT INTO public.provinces VALUES (43, '43', 'Tarragona');
INSERT INTO public.provinces VALUES (44, '44', 'Teruel');
INSERT INTO public.provinces VALUES (45, '45', 'Toledo');
INSERT INTO public.provinces VALUES (47, '47', 'Valladolid');
INSERT INTO public.provinces VALUES (48, '48', 'Bizkaia');
INSERT INTO public.provinces VALUES (49, '49', 'Zamora');
INSERT INTO public.provinces VALUES (50, '50', 'Zaragoza');
INSERT INTO public.provinces VALUES (51, '51', 'Ceuta');
INSERT INTO public.provinces VALUES (52, '52', 'Melilla');
INSERT INTO public.provinces VALUES (10, '10', 'Cáceres');
INSERT INTO public.provinces VALUES (11, '11', 'Cádiz');
INSERT INTO public.provinces VALUES (12, '12', 'Castellón/Castelló');
INSERT INTO public.provinces VALUES (14, '14', 'Córdoba');
INSERT INTO public.provinces VALUES (15, '15', 'Coruña, A');
INSERT INTO public.provinces VALUES (23, '23', 'Jaén');
INSERT INTO public.provinces VALUES (24, '24', 'León');
INSERT INTO public.provinces VALUES (29, '29', 'Málaga');
INSERT INTO public.provinces VALUES (46, '46', 'Valencia/Valéncia');
INSERT INTO public.provinces VALUES (1, '01', 'Araba/Álava');
INSERT INTO public.provinces VALUES (2, '02', 'Albacete');
INSERT INTO public.provinces VALUES (3, '03', 'Alicante/Alacant');
INSERT INTO public.provinces VALUES (4, '04', 'Almería');
INSERT INTO public.provinces VALUES (5, '05', 'Ávila');
INSERT INTO public.provinces VALUES (6, '06', 'Badajoz');
INSERT INTO public.provinces VALUES (7, '07', 'Balears, Illes');
INSERT INTO public.provinces VALUES (8, '08', 'Barcelona');
INSERT INTO public.provinces VALUES (9, '09', 'Burgos');


--
-- TOC entry 3000 (class 0 OID 204540)
-- Dependencies: 207
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.publications VALUES (50, 'Senderismo por monte Alegre', 'Se busca gente para hacer rutas de senderismo por monte Alegre y alrededores los fines de semana ya que una sola persona puede resultar peligroso para esta actividad así que cuantos más seamos mejor. 
Los perros son bienvenidos! 
', '2022-10-27', 'hector', 'Naturaleza', 'Pontevedra', '2022-12-31 00:00:00', '689541236', NULL);
INSERT INTO public.publications VALUES (133, 'Cata de vinos ', 'El hotel-restaurante La Riojana tiene el gusto de presentar una cata de vinos el 18 de Diciembre a las 19:00 donde podrás probar los mejores vinos de esta provincia. ', '2022-11-11', 'josemaria99', 'Gastronomía', 'Rioja, La', '2022-12-18 00:00:00', 'vinosrioja@gmail.com', '666159951');
INSERT INTO public.publications VALUES (48, 'Clase de zumba y yoga ', 'El gimnasio FullPower de la calle Principal ofrece este sábado a las 10:30 una clase de zumba y otra de yoga de manera gratuita a todo aquel que quiera probarla seas cliente del gimnasio o no. 
Si vienes a una de estas clases y decides apuntarte en el próximo mes recibirás un descuento del 30% en la matrícula!
', '2022-10-27', 'olimpio', 'Deportes', 'Gipuzkoa', '2022-12-01 00:00:00', '666333000', 'gym@mail.com');
INSERT INTO public.publications VALUES (53, 'Vuelos a Roma', 'Últimos billetes para el vuelo Madrid-Roma para el 2 de Diciembre a las 18:00 y vuelta para el 6 de Diciembre a las 19:30 con una rebaja del 70% con la compañía aérea VueloFeliz. 

Escápate este puente de la constitución con esta oferta! 

Reserva los billetes en nuestra web :  https://www.vuelofeliz.com/madrid-roma/billetes ', '2022-10-27', 'hector', 'Viajes', 'Madrid', '2022-12-02 00:00:00', 'vuelo@mail.com', NULL);
INSERT INTO public.publications VALUES (134, 'Curso de primeros auxilios', 'Se necesitan 5 personas para cumplir el requisito mínimo de asistentes para poder llevar a cabo el curso de primeros auxilios. Matrícula gratuita, el curso consta de 30h. ', '2022-11-11', 'rodri', 'Otros', 'Almería', '2022-12-13 00:00:00', 'primerosauxilios@curso.com', '741852963');
INSERT INTO public.publications VALUES (136, 'Voluntarios para limpiar el río', 'Se buscan voluntari@s para el fin de semana del sábado 19 y domingo 20 para limpiar el río Aguascebas debido a su mal estado después de las últimas tormentas.  ', '2022-11-11', 'rodri', 'Naturaleza', 'Jaén', '2022-11-30 00:00:00', 'riosjaen@mail.com', '666222888');
INSERT INTO public.publications VALUES (157, 'Feria del pulpo en O Carballiño ', 'En la ciudad de O Carballiño podremos disfrutar todo el fin de semana del 14 de enero de la feria del pulpo con los mejores pulpeiros y pulpeiras del mundo. Todo el mundo está invitado a venir. 

No os lo perdaís!', '2022-11-22', 'sergio', 'Gastronomía', 'Ourense', '2023-01-14 00:00:00', 'pulpo@carballiño.com', NULL);
INSERT INTO public.publications VALUES (131, 'Pareja para futbolín', 'Necesito una pareja para jugar al futbolín para las distintas partidas de la liga de la provincia de Albacete. 
Preferiblemente que juegue de en la delantera aunque podría adaptarme.', '2022-11-11', 'Angel', 'Juegos', 'Albacete', '2022-12-07 00:00:00', '666555000', NULL);
INSERT INTO public.publications VALUES (129, 'Equipo para League of Legends', 'Busco equipo o formar un equipo para participar en las próximas competiciones que tendrán lugar el año que viene del juego League of Legends. 
Sólo con jugadores de rango Oro o más ', '2022-11-11', 'sergio', 'Juegos', 'Pontevedra', '2022-12-29 00:00:00', 'lolteam@gmail.com', NULL);
INSERT INTO public.publications VALUES (130, 'Inauguración "La Croqueta"', 'Se inaugura restaurante "La Croqueta", habrá tapas y bebidas gratuitas para que probar comida casera. ', '2022-11-11', 'martin', 'Gastronomía', 'Coruña, A', '2022-12-01 00:00:00', '777666555', 'martin@gmail.com');
INSERT INTO public.publications VALUES (132, 'Compañer@s para Camino de Santiago', 'Busco compañer@s para realizar le Camino de Santiago, siguiendo la ruta de la plata.
Contactar antes del día 1 de diciembre para coordinarnos.', '2022-11-11', 'olimpio', 'Viajes', 'Coruña, A', '2022-12-03 00:00:00', '666369369', 'caminantes@mail.com');
INSERT INTO public.publications VALUES (128, 'Torneo de Fortnite', 'Se buscan jugadores para hacer un torneo de Fortnite, consiste en 3 partidas, se contabilizarán las victorias con 10 pts por cada una y 3 pts por muerte. ', '2022-11-11', 'martin', 'Juegos', 'Coruña, A', '2022-12-01 00:00:00', '999888777', 'martin@gmail.com');
INSERT INTO public.publications VALUES (158, 'Exposición de arte al aire libre ', 'En la Gran Vía de Madrid podremos ver desde mediados de mes hasta fin de año , una exposición de arte al aire libre de las mejores esculturas de los mas grandes escultores nacionales del momento. 
Pasaros todos a disfrutar de esta maravillosa exposición !', '2022-11-22', 'martin', 'Otros', 'Madrid', '2022-12-16 00:00:00', 'madridesculturas@mail.com', '666222888');
INSERT INTO public.publications VALUES (55, 'Inauguración KFC', 'Gran inauguración el próximo jueves 3/10, a las 19:00, del nuevo restaurante KFC en el centro comercial con precios especiales, no te la pierdas! ', '2022-10-27', 'sergio', 'Gastronomía', 'Guadalajara', '2023-01-04 00:00:00', '658432431', 'kfc@mail.com');
INSERT INTO public.publications VALUES (63, 'Ruta de copas ', 'Soy nuevo en la ciudad y me gustaría conocer los sitios de marcha que hay por la ciudad y de paso gente nueva. Yo soy un chico de 23 años estudiante de carrera, a la primera invito yo. Quien se anima?
', '2022-10-28', 'olimpio', 'Ocio', 'Lugo', '2022-12-15 00:00:00', '655999333', 'copas@gmail.com');
INSERT INTO public.publications VALUES (52, 'Curso de fotografía', 'El estudio fotográfico PhotoJPG comenzará este próximo mes de diciembre un curso de fotografía y edición de imágenes de 3 meses de duración. Hay 20 plazas disponibles, entra en nuestra web e infórmate! 

', '2022-10-27', 'olimpio', 'Otros', 'Pontevedra', '2022-12-05 00:00:00', 'curso@mail.com', NULL);
INSERT INTO public.publications VALUES (51, 'Concierto en el Bar Sound', 'Este viernes el Bar Sound de la calle Avenida tendrá el placer de acoger al grupo Random con su música pop actual a partir de las 22:30. Ven a disfrutar de su actuación acompañándola de las mejores cervezas, bocadillos y hamburguesas de la zona  ', '2022-10-27', 'martin', 'Ocio', 'Lugo', '2022-12-24 00:00:00', '644555666', 'bar@mail.com');
INSERT INTO public.publications VALUES (135, 'Ir a por setas', 'El sábado voy a coger setas al Souto dos Frades.
Si alguien se anima, saldré a las 9:00 desde la calle Progreso, nº 15.

Traer un cesto para recoger la cosecha ;-)', '2022-11-11', 'Helena', 'Naturaleza', 'Ourense', '2022-12-17 00:00:00', '666963369', NULL);
INSERT INTO public.publications VALUES (155, 'Concierto de Foo Fighters', 'Busco peña para ir al conciertazo de Foo Figthers del 11 de enero del 2023. El homenaje a Taylor va a ser brutal y deberíamos todos organizarnos para hacer algo guapo.', '2022-11-22', 'pedro90', 'Ocio', 'Madrid', '2023-01-11 00:00:00', '90pedrorock@gmail.com', NULL);
INSERT INTO public.publications VALUES (156, 'Clases de Yoga en el paseo marítimo', 'Somos un grupo de 5 personas que nos reunimos en el paseo marítimo para hacer Yoga. El profesor está certificado, es genial y es un gran yogui. Si estas interesado contáctanos al correo. Siempre buscamos nuevos compañeros.', '2022-11-22', 'shaki', 'Otros', 'Coruña, A', '2022-12-10 00:00:00', 'yoguishaki@yahoo.es', 'Sólo Whatsapp  635439876');
INSERT INTO public.publications VALUES (159, 'Viaje en coche hasta Berlín', 'El viernes 20 de enero debo de hacer un viaje en coche desde Lugo hasta la ciudad alemana de Berlín. Se buscan dos compañeros para llenar los espacios libres del coche y así poder compartir los gastos del viaje. 
No importa que estés en otra ciudad porque podría pasar a recoger.
La fecha a pesar de ser para el día 20 en un principio hay margen para poder adelantarla o atrasarla un par de días si fuera necesario. ', '2022-11-22', 'olimpio', 'Viajes', 'Lugo', '2023-01-20 00:00:00', '666111929', NULL);
INSERT INTO public.publications VALUES (161, 'Intercambio de cartas Magic', 'Busco gente con la que poder intercambiar cartas del juego de mesa Magic y porque no, echar también alguna partida para pasar el rato. 
Estoy en la ciudad de Guadalajara pero puedo moverme por la provincia y comunidad sin problema. 

', '2022-11-22', 'sergio', 'Juegos', 'Guadalajara', '2023-01-31 00:00:00', 'magic@mail.com', NULL);
INSERT INTO public.publications VALUES (160, 'Vamos a conocer Barcelona', 'Mi chica y yo tenemos una caravana y vamos a conocer Barcelona el primer fin de semana. Nos gustaría compartir gastos e ir con una o dos parejas en plan pasarlo bien de turistas. La idea es tomarnos primero un café o caña y conocernos para comprobar el buen rollo y ver si seremos buenos compañeros de viaje.', '2022-11-22', 'Angel99', 'Viajes', 'Gipuzkoa', '2022-12-03 00:00:00', 'angelsandracaravan@gmail.com', NULL);
INSERT INTO public.publications VALUES (163, 'Marismas del Odiel en Huelva', 'organizamos viajes para visitar en Enero las Marismas del Odiel. Puedes contactarnos al teléfono: 671 564 186 o visitar nuestra web', '2022-11-22', 'manuel80', 'Naturaleza', 'Huelva', '2023-01-14 00:00:00', '671 564 186', 'http://www.turismohuelva.org/productos-turisticos/Naturaleza/');
INSERT INTO public.publications VALUES (151, 'Compañero para hacer Running', 'Salgo todas las mañanas a las 6:00 a hacer dos horas de running a las afueras de la ciudad de Lugo. Busco a alguien amante de este deporte que quiera acompañarme algunos de los días para hacer más amena la sesión', '2022-11-16', 'sergio', 'Deportes', 'Lugo', '2023-04-11 00:00:00', '666222383', '');
INSERT INTO public.publications VALUES (164, 'Exposición de Navajas', 'Busco aficionados a las piezas hechas a mano para ir a disfrutar el primer fin de semana de Diciembre de la exposición de cuchillos y navajas en Navajas Albacete. Tengo entendido que mostrarán piezas de de época y enseñarán técnicas de este maravilloso arte.', '2022-11-22', 'Pablo', 'Otros', 'Albacete', '2022-12-03 00:00:00', '687540921', 'https://navajasalbacete.com/');
INSERT INTO public.publications VALUES (162, 'Buscamos peña para fin de semana LAN, tipo en el CyberGames del centro', 'Somos de Jaén del clan KillerBanelings de Starcraft 2. Buscamos peña para jugar y practicar. La idea sería reunirnos en el CyberGames del centro los fines de semana, empezaríamos el 17 de Diciembre. Si estas al menos en Tier Platinum y quieres unirte a nosotros quedemos para compartir estrategias', '2022-11-22', 'davidt', 'Juegos', 'Jaén', '2022-12-17 00:00:00', 'davidHydra@yahoo.es', 'CyberGames del Centro');
INSERT INTO public.publications VALUES (166, 'Exhibición Canina de Belleza y Agility', 'El 18 y de 19 de febrero la ciudad de Lugo acogerá en su recinto ferial la Exhibición canina que nos traerá el tercer certamen de belleza de la temporada con perros llegados de todas partes de España y la 4 prueba de Agility de la liga donde perros y guías competirán entre sí por ser los mas rápidos en completar el circuito. 
También tendremos puestos con comida, bebida y productos para nuestro mejores amigos, no os lo perdáis! ', '2022-11-22', 'sergio', 'Deportes', 'Lugo', '2023-02-18 00:00:00', 'perros@gmail.com', '666434565');
INSERT INTO public.publications VALUES (167, 'Quedada para mariscada en A Batea de Vilagarcía', 'Si te gusta comer bien y a buen precio únete a nosotros. Somos una pareja que busca completar un grupo de 10 para comer en A Batea. Por 10 personas tienen una oferta en la que te hartas de buen marisco de VilaGarcía y sale tirado. Contáctenos para quedar, si eso el mismo Domingo 4 de Diciembre.', '2022-11-22', 'Angel2', 'Gastronomía', 'Pontevedra', '2022-12-04 00:00:00', 'angelramap@gmail.com', 'https://restauranteabatea.com/');
INSERT INTO public.publications VALUES (168, 'Paseos en Catamarán por la ría ', 'Desde el primer fin de semana de Febrero hasta el ultimo de Mayo la empresa de Catamaranes de Vigo ofrecemos excursiones por la ría en los barcos con fondo de cristal para conocer en profundidad la diversidad marina de la zona. 
Haz ya tus reservas! ', '2022-11-22', 'olimpio', 'Naturaleza', 'Pontevedra', '2023-02-04 00:00:00', 'diversidadmarina@mail.com', '666123838');
INSERT INTO public.publications VALUES (169, 'De acampada a la Laguna de Urbión', 'Tenemos un grupo de escalada y senderismo al que le gusta lo extremo. Vamos a hacer un paseo y acampada a la laguna de Urbión para el segundo fin de Diciembre.
Si te animas contacta con nosotros', '2022-11-22', 'hector', 'Naturaleza', 'Rioja, La', '2022-12-17 00:00:00', 'hectordin@gmail.com', NULL);
INSERT INTO public.publications VALUES (170, 'Presentación proyectos Bootcamp FullStack', 'Exposición publica de los proyectos realizados en el Bootcamp FullStack de Campus Dual', '2022-11-22', 'hector', 'Otros', 'Ourense', '2023-01-05 00:00:00', 'info@campusdual.com', NULL);
INSERT INTO public.publications VALUES (171, 'Gente para la oferta del restaurante gourmet', 'Busco un grupo de gente para juntar a las 6 personas necesarias para aprovechar la oferta de descuento del 50% para grupos del nuevo restaurante gourmet del centro comercial. Tengo muchas ganas de probarlo pero su precio elevado es un obstáculo. 
Si nos juntamos los suficientes podemos acordar una fecha que nos venga bien a todos!', '2022-11-22', 'martin', 'Gastronomía', 'Lugo', '2023-01-15 00:00:00', 'gourmet@mail.com', '666333444');
INSERT INTO public.publications VALUES (172, 'Room Scape ', 'Busco gente para juntar un grupo de 4 personas para hacer las diferente Room Scape que ofrece la ciudad de Madrid, soy muy fan de este tipo de juegos pero no conozco a gente en esta ciudad con quien poder ir a hacerlos. 
', '2022-11-22', 'martin', 'Juegos', 'Madrid', '2023-02-10 00:00:00', '666838404', NULL);
INSERT INTO public.publications VALUES (173, 'Entradas para El Rey León', 'Tengo dos entradas para la función del Rey León de Madrid pero al final mi pareja y yo no podremos ir. Las vendo 5€ mas baratas que el precio que me costaron en taquilla.', '2022-11-22', 'hector', 'Ocio', 'Madrid', '2022-12-10 00:00:00', '666994339', 'reyleon@mail.com');
INSERT INTO public.publications VALUES (174, 'Rutas a Caballo', 'Desde el grupo "Al Galope" empezaremos a hacer rutas a caballo cada fin de semana desde el 8 de Enero. 
Arrancamos con ofertas especiales para grupos, así que llámanos o entra en nuestra web para informarte. ', '2022-11-22', 'hector', 'Naturaleza', 'Pontevedra', '2023-01-08 00:00:00', 'www.algalope.com', '666333929');
INSERT INTO public.publications VALUES (175, 'Rutas en Quad', 'Desde el 15 de Enero, desde la empresa "4ruedas" tendremos un servicio de rutas en Quad por diferentes puntos de la provincia. Precio especial para grupos grandres. Más información por teléfono o en nuestra web ', '2022-11-22', 'hector', 'Naturaleza', 'Pontevedra', '2023-01-15 00:00:00', 'www.4ruedas.com', '665556332');
INSERT INTO public.publications VALUES (176, 'Pareja de Badminton', 'Busco pareja para jugar al badminton, tanto para practicar en uno contra uno como para jugar en pareja en 2 vs 2 ', '2022-11-22', 'Helena', 'Deportes', 'Lugo', '2023-02-01 00:00:00', 'badminton@mail.com', '664337227');
INSERT INTO public.publications VALUES (165, 'Buscamos el mejor plato en la Alpujarra almeriense', 'Somos un grupete al que nos encanta disfrutar de una buena comida en Alpujarra. Conocemos varios sitios pero hemos hecho una apuesta a ver quien encuentra/conoce el mejor Restaurant que de la zona. Si te apuntas a está búsqueda escríbenos y pautamos quedar para cenar. Abstenerse pesados. ', '2022-11-22', 'rodri', 'Gastronomía', 'Almería', '2022-12-08 00:00:00', 'alpujarraatope@outlook.es', 'myalmeria.com/la-alpujarra');
INSERT INTO public.publications VALUES (177, 'Equipos para Paintball', 'Busco reunir gente para formar dos equipos para ir a jugar al paintball, de momento somos 4 personas, pero necesitamos algunas más. 
La idea es quedar al menos una vez cada dos meses para jugar. Animaos!', '2022-11-22', 'sergio', 'Juegos', 'Coruña, A', '2022-12-17 00:00:00', 'paintball@mail.com', 'facebook/paintball-coruña');
INSERT INTO public.publications VALUES (49, 'Equipo de futbol sala', 'Buscamos gente de entre 18 y 40 años para formar dos equipos de futbol sala para jugar partidos amistosos los domingos por la mañana. 
Necesitamos un mínimo de 3 personas más, pero vendría bien que se apuntase más gente para sustituir a aquellos que no puedan venir o tener banquillo con el que ir rotando.

Mandame un Whatsapp! 666111222', '2022-10-27', 'sergio', 'Deportes', 'Coruña, A', '2023-01-31 00:00:00', 'futbol@mail.com', '666111222');
INSERT INTO public.publications VALUES (191, 'Se busca compañero para jugar al tenis', 'Se busca pareja para jugar al tenis el jueves por la tarde en el polideportivo.', '2022-11-29', 'martinseijo', 'Deportes', 'Coruña, A', '2022-12-01 00:00:00', '645978312', 'martinsdeijo@gmail.com');


--
-- TOC entry 2995 (class 0 OID 203427)
-- Dependencies: 202
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sections VALUES (1, 'CONTACTS', 'Perfiles y secciones a los que puede acceder cada perfil.', 'Contactos');
INSERT INTO public.sections VALUES (2, 'USERS', 'Seccion de registro de usuario', 'Usuarios');
INSERT INTO public.sections VALUES (3, 'PUBLICATIONS', 'Sección de publicaciones', 'Publicaciones');
INSERT INTO public.sections VALUES (4, 'CATEGORIES', 'Categorías', 'Categorias');
INSERT INTO public.sections VALUES (5, 'PROVINCES', 'Provincias', 'Provincias');
INSERT INTO public.sections VALUES (6, 'PUBLICATIONSUSER', 'Sección de publicaciones de usuario', 'Publicaciones usuario');


--
-- TOC entry 2998 (class 0 OID 203841)
-- Dependencies: 205
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (109, NULL, 'chema', 'elchema', 'tSwoVPoLaboTWEihp728rg==', 'elchemita@gmail.com', '789456123', 'Lopez');
INSERT INTO public.users VALUES (67, '55043321K', 'Fito', 'fitofiti', '23+xApMjn1OwaDF/nt3cYA==', 'fitot@gmx.com', '990381999', 'Fitipaldis');
INSERT INTO public.users VALUES (11, '87654311S', 'Olimpio', 'olimpio', 'VCDaKbsvHCoHVQ4r/YzzzA==', 'olimpio@gmail.com', '666000333', 'Rey');
INSERT INTO public.users VALUES (9, '87654321S', 'Martin', 'martin', 'dF3YiFVknh/DMEbgW1DBTQ==', 'martin@gmail.com', '666000111', 'Seijo');
INSERT INTO public.users VALUES (14, '66688899Z', 'Pablo', 'Pablo', 'tg9jiJJ8QiD183084BOBPg==', 'ppicapiedra@gmail.com', '666999001', 'Picapiedra');
INSERT INTO public.users VALUES (15, '66688877K', 'Pedro', 'Pedro', 'zuyq7tqUxEPMdFhdVM2qqA==', 'pmarmol@gmail.com', '666999002', 'Marmol');
INSERT INTO public.users VALUES (17, '12512812J', 'Andres', 'andrelbl', 'ImgjkT7pbZtiZpqTeJh6CQ==', 'andrelbl@gmail.com', '666550444', 'Eloy Blanco');
INSERT INTO public.users VALUES (18, '66655577K', 'Ángel', 'Angel', '1ia8b8OrFpsem0TlVrW8Qg==', 'angelito@gmail.com', '666999003', 'García');
INSERT INTO public.users VALUES (19, '23123123N', 'Shakira', 'shaki', 'vLze/8Ho57GT/hGiykBZFQ==', 'shakiM@gmail.com', '661760444', 'Martinez');
INSERT INTO public.users VALUES (20, '66655578K', 'Ángel', 'Angel2', '9bAzdMa2/hedPh5bzS7CBQ==', 'angelito2@gmail.com', '666999003', 'García');
INSERT INTO public.users VALUES (21, '66699977K', 'Ángel', 'Angel99', 'lnt4mVCJGbNlIGGEOAFSjw==', 'perez@gmail.com', '665222003', 'Pérez');
INSERT INTO public.users VALUES (22, '66677777K', 'Rodrigo', 'rodri', '72RMWvydaPaz9+k8gdVkHg==', 'rodrigo@gmail.com', '665777773', 'Pérez');
INSERT INTO public.users VALUES (23, '231473123N', 'David', 'shadavotki', 'TChbjgK5+JHpWu0Nl4siRw==', 'davot@gmail.com', '661067444', 'Oterop');
INSERT INTO public.users VALUES (24, '230343123N', 'Davasasid', 'shadavasasotki', '3hS9egUKkiu5RNRfeHfivg==', 'dasasavot@gmail.com', '601067444', 'Oterasasop');
INSERT INTO public.users VALUES (29, '87650980S', 'mengan', 'mengan', '/lGCrLszr7/MZ2C+zEbM7g==', 'mengan@gmail.com', '666088009', 'dsddd');
INSERT INTO public.users VALUES (53, '1234567D', 'Helena', 'Helena', 'S0Bn1IvZ+98V8wUiIZtPew==', 'helena@gmail.com', '661111222', 'Gonzalez');
INSERT INTO public.users VALUES (61, '85243912K', 'Manuel', 'manuel80', 'PNK2hgcCxqSDL5ZklXn1lg==', 'manuel80@gmail.com', '938762145', 'Ochenta');
INSERT INTO public.users VALUES (62, '74290476D', 'pedro', 'pedro90', 'YpC0dmuhXoMlQUBSkQfeKA==', 'pedro@90.com', '654783456', 'rodriguez');
INSERT INTO public.users VALUES (1, '78965412T', 'Demo', 'demo', 'C5rCRzh9s2DPHYrnnLS/eg==', 'correo@electronico', '987456321', 'Demo');
INSERT INTO public.users VALUES (10, '87654329S', 'Sergio', 'sergio', 'GVC/EAuqSwxu3++/eLpRuw==', 'sergio@gmail.com', '666000222', 'Misa2');
INSERT INTO public.users VALUES (12, '87654300S', 'Hector', 'hector', 'QL5yl+J/VQ+WraMUD3jFMg==', 'hector@gmail.com', '666000555', 'Acosta G.');
INSERT INTO public.users VALUES (73, '93524312R', 'jose', 'josemaria99', 'h7kgrHVxQcH8ke2GOeUz9Q==', 'josemaria99@gmail.com', '976532158', 'mariafernandez');
INSERT INTO public.users VALUES (111, NULL, 'David', 'davidt', 'EAjqZXx9UDLJkrs/6ieuBg==', 'davidt@mail.com', '666111299', 'Tubio');
INSERT INTO public.users VALUES (124, NULL, 'Martín', 'martinseijo', '+ogxGZJBBuSEeCay4a1odg==', 'martinseijo@gmail.com', '645978312', 'Seijo');
INSERT INTO public.users VALUES (103, '666333222H', 'Herminio', 'hermipala', 'ddIGEulo0fBXDXgjj192Jg==', 'hermipala@yoquese.com', '666333222', 'Palanca');


--
-- TOC entry 2996 (class 0 OID 203447)
-- Dependencies: 203
-- Data for Name: users_profiles_map; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users_profiles_map VALUES (124, 2);
INSERT INTO public.users_profiles_map VALUES (9, 1);
INSERT INTO public.users_profiles_map VALUES (14, 2);
INSERT INTO public.users_profiles_map VALUES (15, 2);
INSERT INTO public.users_profiles_map VALUES (17, 2);
INSERT INTO public.users_profiles_map VALUES (18, 2);
INSERT INTO public.users_profiles_map VALUES (19, 2);
INSERT INTO public.users_profiles_map VALUES (20, 2);
INSERT INTO public.users_profiles_map VALUES (21, 2);
INSERT INTO public.users_profiles_map VALUES (22, 2);
INSERT INTO public.users_profiles_map VALUES (23, 2);
INSERT INTO public.users_profiles_map VALUES (24, 2);
INSERT INTO public.users_profiles_map VALUES (29, 2);
INSERT INTO public.users_profiles_map VALUES (53, 2);
INSERT INTO public.users_profiles_map VALUES (61, 2);
INSERT INTO public.users_profiles_map VALUES (62, 2);
INSERT INTO public.users_profiles_map VALUES (67, 2);
INSERT INTO public.users_profiles_map VALUES (73, 2);
INSERT INTO public.users_profiles_map VALUES (10, 2);
INSERT INTO public.users_profiles_map VALUES (103, 2);
INSERT INTO public.users_profiles_map VALUES (1, 1);
INSERT INTO public.users_profiles_map VALUES (109, 2);
INSERT INTO public.users_profiles_map VALUES (111, 2);
INSERT INTO public.users_profiles_map VALUES (12, 1);
INSERT INTO public.users_profiles_map VALUES (11, 1);


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 208
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 7, true);


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 196
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contacts_id_seq', 4, true);


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 198
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.profiles_id_seq', 2, true);


--
-- TOC entry 3022 (class 0 OID 0)
-- Dependencies: 210
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.provinces_id_seq', 52, true);


--
-- TOC entry 3023 (class 0 OID 0)
-- Dependencies: 206
-- Name: publications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.publications_id_seq', 191, true);


--
-- TOC entry 3024 (class 0 OID 0)
-- Dependencies: 201
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sections_id_seq', 6, true);


--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 124, true);


--
-- TOC entry 2854 (class 2606 OID 204756)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- TOC entry 2856 (class 2606 OID 204758)
-- Name: categories categories_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_un UNIQUE (category);


--
-- TOC entry 2834 (class 2606 OID 203410)
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- TOC entry 2838 (class 2606 OID 203421)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 2858 (class 2606 OID 204832)
-- Name: provinces provinces_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_name UNIQUE (province_name);


--
-- TOC entry 2860 (class 2606 OID 204770)
-- Name: provinces provinces_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_pk PRIMARY KEY (id);


--
-- TOC entry 2852 (class 2606 OID 204548)
-- Name: publications publications_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_pk PRIMARY KEY (id);


--
-- TOC entry 2840 (class 2606 OID 203435)
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- TOC entry 2842 (class 2606 OID 203455)
-- Name: sections uk_3hhqmvx0pt70xjvmjdo5a76go; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT uk_3hhqmvx0pt70xjvmjdo5a76go UNIQUE (alias);


--
-- TOC entry 2846 (class 2606 OID 203853)
-- Name: users uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- TOC entry 2836 (class 2606 OID 203453)
-- Name: contacts uk_9mg1wlguu09et002069e9qeum; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT uk_9mg1wlguu09et002069e9qeum UNIQUE (phone);


--
-- TOC entry 2848 (class 2606 OID 203851)
-- Name: users users_login_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- TOC entry 2850 (class 2606 OID 203849)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 2844 (class 2606 OID 203451)
-- Name: users_profiles_map users_profiles_map_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT users_profiles_map_pkey PRIMARY KEY (user_id, profile_id);


--
-- TOC entry 2866 (class 2606 OID 204826)
-- Name: publications category_name_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT category_name_fk FOREIGN KEY (category_name) REFERENCES public.categories(category);


--
-- TOC entry 2864 (class 2606 OID 203854)
-- Name: users_profiles_map fkgu8qveimyui706fn78n4xbenf; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT fkgu8qveimyui706fn78n4xbenf FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2861 (class 2606 OID 203458)
-- Name: profiles_sections_map fkkqferkfgrrnho62b21rya9ej9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles_sections_map
    ADD CONSTRAINT fkkqferkfgrrnho62b21rya9ej9 FOREIGN KEY (section_id) REFERENCES public.sections(id);


--
-- TOC entry 2862 (class 2606 OID 203463)
-- Name: profiles_sections_map fknbjkd2pgwcyijblewp1d33rox; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles_sections_map
    ADD CONSTRAINT fknbjkd2pgwcyijblewp1d33rox FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- TOC entry 2863 (class 2606 OID 203468)
-- Name: users_profiles_map fksv94wyv9yb3b2hmvr5f48o281; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_profiles_map
    ADD CONSTRAINT fksv94wyv9yb3b2hmvr5f48o281 FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- TOC entry 2867 (class 2606 OID 204833)
-- Name: publications province_name; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT province_name FOREIGN KEY (province_name) REFERENCES public.provinces(province_name);


--
-- TOC entry 2865 (class 2606 OID 204590)
-- Name: publications publications_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.publications
    ADD CONSTRAINT publications_fk FOREIGN KEY (user_login) REFERENCES public.users(login);


-- Completed on 2023-02-02 13:12:47

--
-- PostgreSQL database dump complete
--

