
const Product = require('../models/product')




function productController() {
    return {
        // ************************ data Get************************************//
        user(req, resp) {
            resp.render('home')
        },

        // ****************************  Product Create ******************************//

        async create(req, resp) {
            try {
                  const { name, price, quantity } = req.body;
               const createProduct = await Product.create({
                    name,
                    price,
                    quantity,

                });
                resp.status(201).json({ 'data': { product: createProduct } });
                createProduct.save();
            } catch (err) {
                 resp.status(500).json({ error: 'Failed to save product' });
            }
        },

        // ********************************  Find List All Product *******************************//
        async index(req, resp) {
          
            try {
             const productList = await Product.find()
                    .select('-updatedAt -createdAt -__v')
                    .sort({ _id: -1 });
                resp.json({ 'data': { "product": productList } });
            } catch (err) {
                resp.status(500).json({ error: 'Failed to fetch product' });
            }

        },

        //******************************** Product Update by Id  **************************** */
        async update(req, resp) {
            try {
                  const eComId = req.params.id;
                 const { name, price, quantity } = req.body;
            const updateProduct = await Product.findOneAndUpdate(
                    { _id:eComId },
                    {
                        name,
                        price,
                        quantity
                    },
                    { new: true }
                ) .select('-updatedAt -createdAt -__v')
                .sort({ _id: -1 });
                  if (!updateProduct) {
                    return resp.status(404).json({ error: 'Product not found' });
                }
                console.log(updateProduct);
                   resp.status(200).json({ 'data':{ product: updateProduct , message: "Product Update sucessfully" } });
            } 
            catch (err) {
               resp.status(500).json({ error: 'Failed to update product' });
            }

        },
        // ********************************  Delete products by Id  ******************************//
        async delete(req, resp) {
            try{
                 const eComId = req.params.id;
                const deleteProduct = await Product.findOneAndRemove({_id:eComId});
                  if (!deleteProduct) {
                    return resp.status(404).json({ error: 'Product not found' });
                }
                resp.status(200).json({ 'data': { message: "product deleted successfully" } });
            }
            catch{
                  resp.status(500).json({ error: 'Failed to delete product' });
            }
        },






        //**********************************  Find One Product  ******************************** */
        async find(req, resp) {
            try {
                 const eComId = req.params.id;
                  const findOneProduct = await Product.findOne({ _id: eComId }).select('-updatedAt -createdAt -_v');
                if (!findOneProduct) {
                    return resp.status(404).json({ error: 'Product not found' });
                }
                resp.json(findOneProduct);
               
            } catch (err) {
                 resp.status(500).json({ error: 'Failed to fetch product' });
            }

        }



    }
}
module.exports = productController

