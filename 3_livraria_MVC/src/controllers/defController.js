const getDefaultRoute = (req, res) => {
  res.status(200).json({
    mensagem: "Olá mundo! Bem vindo à 2_2_livraria_MVC API!",
    acesso: `http://localhost:${process.env.PORT}/`,
  });
};

export default getDefaultRoute;