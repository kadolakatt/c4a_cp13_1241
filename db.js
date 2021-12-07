const MongoClient = require("mongodb").MongoClient;
const config = require("./config.json");

const connectionString = config.CONNECTION_URL;

let mongoDBClient = null;

const connectToMongoDB = async () => {
    try {
        console.log("Conectandose a MongoDB");
        mongoDBClient = new MongoClient(connectionString);
        await mongoDBClient.connect();
        console.log("Conexión establecida a MongoDB");
    }catch (e) {
        console.log("Ha ocurrido un error al conectarse a MongoDB.");
        console.log(e);
    }/*
    Subscribir estos eventos es una buena practica
    para cerrar la conexión a MongoDB en caso de errores o cuando se 
    detenga la ejecución de nuestro backend.
    finally {
        setUpProcessWatchers();
    }
    */
}

const closeMongoDB = async () => {
    try {
        console.log("Cerrando la conexión a MongoDB...");
        await mongoDBClient.close();
        console.log("Se cerró la conexión con MongoDB.");
    }catch(e) {
        console.log("Ha ocurrido un error al conectarse a MongoDB.");
        console.log(e);
    }
}
//limit es la cantidad de elementos por página
//page es el número de página que mostrará nuestro frontend.
exports.listarProyectos = async (limit, page) => {
    if (!mongoDBClient) {
        await connectToMongoDB();
    }
    try  {

        const cursor = mongoDBClient.db("DB1241").collection("Proyectos").find();
        return await cursor.sort({ nombre: 1 })
                           .skip(page > 0 ? (page-1)*limit : 0)
                           .limit(limit)
                           .toArray();

    }catch (e) {
        console.log("Error consultando datos en MongoDB.");
        console.log(e);
        await closeMongoDB();
    }
}
