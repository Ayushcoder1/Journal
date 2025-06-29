PGDMP                      }            blog    17.5 (Debian 17.5-1.pgdg120+1)    17.5     <           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            =           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            >           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            ?           1262    16384    blog    DATABASE     o   CREATE DATABASE blog WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE blog;
                     blog    false                        3079    16385 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                        false            @           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                             false    2            �            1259    16432    post    TABLE     
  CREATE TABLE public.post (
    id bigint NOT NULL,
    title character varying(200) NOT NULL,
    content text,
    published boolean DEFAULT false,
    authorid bigint,
    reads bigint,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.post;
       public         heap r       blog    false            �            1259    16431    post_id_seq    SEQUENCE     t   CREATE SEQUENCE public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.post_id_seq;
       public               blog    false    221            A           0    0    post_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;
          public               blog    false    220            �            1259    16423    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(60) NOT NULL,
    name character varying(40),
    password character varying(40) NOT NULL
);
    DROP TABLE public.users;
       public         heap r       blog    false            �            1259    16422    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               blog    false    219            B           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               blog    false    218            �           2604    16435    post id    DEFAULT     b   ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);
 6   ALTER TABLE public.post ALTER COLUMN id DROP DEFAULT;
       public               blog    false    220    221    221            �           2604    16426    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               blog    false    218    219    219            9          0    16432    post 
   TABLE DATA           Z   COPY public.post (id, title, content, published, authorid, reads, created_at) FROM stdin;
    public               blog    false    221   k       7          0    16423    users 
   TABLE DATA           :   COPY public.users (id, email, name, password) FROM stdin;
    public               blog    false    219   �       C           0    0    post_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.post_id_seq', 25, true);
          public               blog    false    220            D           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public               blog    false    218            �           2606    16440    post post_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.post DROP CONSTRAINT post_pkey;
       public                 blog    false    221            �           2606    16430    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 blog    false    219            �           2606    16428    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 blog    false    219            �           2606    16441    post post_authorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_authorid_fkey FOREIGN KEY (authorid) REFERENCES public.users(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.post DROP CONSTRAINT post_authorid_fkey;
       public               blog    false    219    3233    221            9   ,  x��V�r7<�_1>�|�")R��K�ʑ;�C��T��I�X`����#|L~�_�,��S)]��====����v�q+z�7t��ܨ����T{�E�H7�Ty�J�r ]���J��5iHs��������7-W����%ʉ�^ <q�C35z�4ik>e=TI��x6Q��d�|��|2����x|�w0�Ng�������D��)sK�憱A�tau�ko�]���]&"���չi: ���/)��ڀ����Ե9�{��S�t�h�"��W��X�m)�W����8�RM����{�j��Ӈ�tZ��.!��V ��za�YX��s������Z��ki�T��k|��JN�V��K�J��Z�bڮ�!�ߔ��[��I�s�I������S�;�����]��8'9�O+mm�.�Z;T�#�>�~�=$������i@'��o?�K��,��6T�i|�p���py���=��=~�^�W��LpKht����W��+��'�e�}Ͷ���O@�w����|��7��qX���.q@�hcq��,?����J���:�{򾚧�W++[�˫`@�_=��I��PgjD%�o�h' w��j��Xf7���֗Xk��x^��N�ʇz��e]����rH�A��[v�0�dP���
�2�~��.���ߕn� V'��xWhB[�#y�߾���r�G�聊�A�[m7x|^�iF�cG�����>榕ܒ��& %�����G?:;�N���d6B�%�\�-x*�~����n�\	r�{8TǺZC.0���Zڮ=�5���o`�t�|��܊v]M%i!m"2_���d����1`K�2�G)QHaK��"�E�m�&r�;�!�;�A00_8rbw²�3Q{�G�9T'qCﳨ�O����(��0[Ճ��wzYd�v�,��. �@�� @�2[���+���ޫ�V��W�P����qm���O^lMZ�vw��_{����ì+�{��6L�� эh���9R�05�`x��s�鏾�5�
�d��Dk-�P�GܘF�w�	/�X�}�!�����p_J�kS�2�7�3h�Y�m�-�	�*c�,2�h�/'�\�gW�s����C��*[��C��3��a-�S@Z�i��_�f$�驥D�]��^�X,|�XX���C&�f�sR���r���E%'��}�y�Fb��.�B��-��"�(����c�3��%m[趑9	�K�;�E[+�Tͽ�. A;8�9��YyPE)�]3/��q[�62n.�+�s�5�h���C	Mc��<�|�v@�����7z^Ӧ�<#Ӿ�t}��������Xw�3O�d �p��������|5�Y�¨^�k����r�$Ks
�6�jA'm�9�?rU�����B���s��e�
��j��`�Mh<:�;<���۟���H��*-b\��d����0pl�M��zx1�TB;TQзV��)IWAt�Y.M�m�j-��V�^�Ww7=Y�8jpЯy���$��;i���H�vR�-�l���\�.>-�N�MJ����t2�;<�L�%���'O��߯      7   �   x�]�MK�0@ϓ_�_l�C��UAXvA���K��6Y�Q&	��ަ
R���c���F�I��_�E�
��àb���0	�&S4�P�E���ҧ�^���>!I��h#�^�Uv�9�X8t6w��z�k|��-h�ѹ~�1�Ʉ����+RW
�:z[,�z�������u��坔��)c��.������������}
��7xyp�     