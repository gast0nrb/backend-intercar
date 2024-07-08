const Categoria = require("../models/Categoria");

const createCategorias = async (req, res, next) => {
  try {
    const cat = await Categoria.create({nombre : req.body.nombre.toUpperCase()});
    res.status(201).json({
      data: {
        created: {
          categoria: req.body,
        },
        error: {},
      },
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      data: {
        error: err,
      },
    });
  }
};

const listCategorias = async (req, res, next) => {
  try {
    const cat = await Categoria.findAll();
    if (cat.length == 0) {
      return res.status(404).json({
        success: true,
        data: {
          categorias: {},
          error: {
            lengthError: "No existen elementos",
          },
        },
      });
    }
    console.log("data");
    res.status(200).json({
        success : true,
        data : {
            categorias : cat,
            error : {}
        }
    })
  } catch (err) {
    res.status(500).json({
        success : false, 
        data : {
            error : err
        }
    })
  }
};


module.exports = {
    listCategorias, createCategorias
}