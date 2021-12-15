const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");

// ARQUIVOS DE ROTAS - IMPORTAÇÃO
const routes = require("./routes");

// APP
const app = express();

// VIEW ENGINE - A PASTA DAS VIEWS E A SINTAXE (EJS)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PASTA PÚBLICA PARA ARQUIVOS ESTÁTICOS (IMG, JS, CSS...)
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

// CAPTURA DO 404 E SEQUÊNCIA AO TRATAMENTO DO ERRO
app.use(function (req, res, next) {
  next(createError(404));
});

// MANIPULAÇÃO DE ERRO
app.use(function (err, req, res, next) {
  // DEFINE LOCALS, EXIBINDO ERROS APENAS EM AMBIENTE DE DESENVOLVIMENTO
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  if (err.status === 404) {
    return res.render("404");
  }
  // RENDERIZANDO A VIEW DE ERROS
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
