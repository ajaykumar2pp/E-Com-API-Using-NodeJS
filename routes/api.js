const productController = require("../app/controller/productController")
function initRoutes(app) {
    //*********************************   API routes  **************************** *//
    app.get('/', productController().user);

    //  POST  http://localhost:2000/products/create
    app.post('/products/create', productController().create);

    //  GET  http://localhost:2000/products/:_id
    app.get('/products/:id', productController().find);


    //  PUT  http://localhost:2000/products/:_id
    app.put('/products/:id', productController().update);


    //  GET  http://localhost:2000/products   All List Products
    app.get('/products', productController().index);



    // delete   http://localhost:2000/products/:_id
    app.delete('/products/:id', productController().delete);

}
module.exports = initRoutes

