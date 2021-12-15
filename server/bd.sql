CREATE DATABASE products;

USE products;

CREATE TABLE categories (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  description varchar(200) NOT NULL,
  image VARCHAR(150) DEFAULT '/images/product-placeholder.png',
  category_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name)
VALUES 
	("roupa"),
	("brinquedo"),
	("calçado"),
  ("eletrodoméstico");
    
INSERT INTO products (name, description, image, category_id)
VALUES 
	("Blusa do jacaré", "Blusa que parece da lacoste mas é do jacaré", "/images/jacare.jpg", 1),
  ("Carrinho", "Carrinho da hotweels", "/images/carrinho.jpg", 2),
  ("Basqueteira", "Tênis de basquete", "/images/tenis.jpg", 3),
  ("Futsal", "Tênis de futsal", "/images/futsal.jpg", 3),
  ("Geladeira", "Mais gelado que o polo norte", "/images/geladeira.jpg", 1),
  ("Fogão", "Tem um mucado de boca", "/images/fogao.jpg", 1);
	
    