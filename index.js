const express = require("express");
const { listarProyectos } = require("./db");
const port = 9000;
const app = express();

app.get("/projects/all", async (request, response) => {
    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);
    const datos = await listarProyectos(limit, page);
    response.json(datos);
});

app.listen(port, () => {
    console.log(`Backend funcionando en puerto ${port}`);
});