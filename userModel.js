const mongoose = require ('mongoose');
const userModel = new mongoose.Schema(
{

        nombre: {
            type: String
          },
        apellido: {
            type: String
          },
        edad: {
            type: Number
          },
        materia: {
            type: String
          },
        correo: {
            type: String
          },
        telefono: {
            type: String
          }
},
{
    timestamps:true,
    versionKey:false,

}
)
const ModelUser = mongoose.model("Profesores",userModel);
module.exports = ModelUser;