import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readDate = () => {
    try {
        const data = fs.readFileSync("./Profesores.json");
        return JSON.parse(data);
    }catch (error){
        console.log(error);
    }

};

const writeData = (data) =>{
    try {
        fs.writeFileSync("./Profesores.json",JSON.stringify(data));
        return JSON.parse(data);
    }catch (error){
        console.log(error);
    }


};

app.get("/", (req, res) => {
    res.send("Bienvenidos a mi primer API en Node js!");
});

app.get("/Profes", (req, res) =>{
    const data = readDate();
    res.json(data.Profes);
});

app.get("/Profes/:id", (req, res) =>{
    const data = readDate ();
    const id = parseInt(req.params.id);
    const profe =data.Profes.find((profe) => profe.id === id);
    res.json(profe);
});

app.post("/Profes",(req, res) =>{
    const data = readDate();
    const body = req.body;
    const newProfe = {
        id: data.Profes.length + 1,
        ...body,
    };
    data.Profes.push(newProfe);
    writeData(data);
    res.json(newProfe); 
});

app.put("/Profes/:id",(req, res) => {
    const data = readDate ();
    const body = req.body;
    const id = parseInt(req.params.id);
    const profeIndex = data.Profes.findIndex((profe) => profe.id === id);
    data.Profes[profeIndex] = {
        ...data.Profes[profeIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Profesor cambiado exitosamente"});
});

app.delete("/Profes/:id",(req, res)=> {
    const data = readDate ();
    const id = parseInt(req.params.id);
    const profeIndex = data.Profes.findIndex((profe) => profe.id === id);
    data.Profes.splice(profeIndex, 1);
    writeData (data);
    res.json({message: "Profesor Eliminado Exitosamente"});


})


app.listen(3002, () => {
    console.log ('server listo en puerto 3002');
});
