const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

const controller = {
  index: async (req, res, next) => {
    try {
      const products = await db.query("SELECT * FROM products", {
        type: Sequelize.QueryTypes.SELECT,
      });
      return res.render("products", {
        titulo: "Produtos",
        subtitulo: "Produtos incríveis para você",
        produtos: products,
        textoPromo: "Ofertas imperdíveis",
        bannerTopo: "/images/banner-topo-produtos-1564x472.png",
        bannerMeio: "/images/banner-meio-produtos-1920x1080.png",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro do servidor", error });
    }
  },
  show: async (req, res, next) => {
    try {
      const { id } = req.params;
      let product = await db.query(
        `SELECT * FROM products WHERE products.id = ${id}`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      product = product[0];

      res.render("product", {
        titulo: `${product.name}`,
        subtitulo: `${product.name} | ${product.category_id}`,
        produto: product,
        textoPromo: "Últimas unidades!",
        bannerTopo: "/images/banner-topo-produto-1564x472.png",
        bannerMeio: "/images/banner-meio-produto-1920x1080.png",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro do servidor", error });
    }
  },

  store: async (req, res, next) => {
    const { name, description, image, category_id } = req.body;
    try {
      if (!name || !description || !image || !category_id)
        return res.status(400).json({ message: "Parametros inválidos" });
      const product = await db.query(
        "INSERT INTO products (name, description, image, category_id) VALUES (:name, :description, :image, :category_id)",
        {
          replacements: {
            name,
            description,
            image,
            category_id,
          },
          type: Sequelize.QueryTypes.INSERT,
        }
      );
      if (!product) throw Error("Erro ao inserir produto");
      console.log(product);
      return res.status(200).json({ message: "Produto inserido com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro do servidor", error });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const { name, description, image, category_id } = req.body;
    try {
      const product = await db.query(
        "UPDATE products SET name = :name,  description = :description, image = :image, category_id = :category_id) WHERE products.id = :id",
        {
          replacements: {
            name,
            description,
            image,
            category_id,
            id,
          },
          type: Sequelize.QueryTypes.UPDATE,
        }
      );

      return res
        .status(200)
        .json({ message: "Produto atualizado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro do servidor", error });
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      await db.query("DELETE FROM products  WHERE products.id = :id", {
        replacements: {
          id,
        },
        type: Sequelize.QueryTypes.DELETE,
      });

      return res.status(200).json({ message: "Produto deletado" });
    } catch (error) {
      return res.status(500).json({ message: "Erro do servidor", error });
    }
  },
};

module.exports = controller;
