
const Product = require('../models/product')




function productController() {
    return {
        // ************************ data Get************************************//
        user(req, resp) {
            resp.render('home')
        },

        // ****************************  Product Create ******************************//

        async create(req, resp) {

            const { name, price, quantity } = req.body;
            let document;
            try {
                document = await Product.create({
                    name,
                    price,
                    quantity,

                });
                resp.status(201).json({ 'data': { product: document } });
                document.save();
            } catch (err) {
                resp.status(500).json(err);
            }



        },

        // ********************************  Find List All Product *******************************//
        async index(req, resp) {
            let documents;
            try {
                documents = await Product.find()
                    .select('-updatedAt -createdAt -__v')
                    .sort({ _id: -1 });
                resp.json({ 'data': { "product": documents } });
            } catch (err) {
                resp.status(500).json(err);
            }

        },

        //******************************** Product Update by Id  **************************** */
        async update(req, resp) {
            const { name, price, quantity } = req.body;
            let document;
            try {
                document = await Product.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        name,
                        price,
                        quantity
                    },
                    { new: true }
                ) .select('-updatedAt -createdAt -__v')
                .sort({ _id: -1 });

                console.log(document);
                resp.status(200).json({ 'data':{ product: document , message: "Update sucessfully" } });
              
            } catch (err) {
                resp.status(500).json(err);
            }

        },
        // ********************************  Delete products by Id  ******************************//
        async delete(req, resp,) {
            const documentProduct = await Product.findOneAndRemove({ _id: req.params.id });
            if (!documentProduct) {
                resp.status(500).json(err);
            } resp.status(200).json({ 'data': { message: "product deleted" } });

        },






        //**********************************  Find One Product  ******************************** */
        async find(req, resp) {
            let productFind;
            try {
                productFind = await Product.findOne({ _id: req.params.id }).select(
                    '-updatedAt -__v'
                );
                resp.json(productFind);
            } catch (err) {
                resp.status(500).json(err);
            }

        }



    }
}
module.exports = productController

