// const Admin = require("../../../Models/Admin")
// const Customer = require("../../../Models/Customer")
// const Category = require("../../../Models/Category")
// const Product = require("../../../Models/Product")
// const { Host } = require("../../Helpers/Index")

// // Index of dashboard
// const Index = async (req, res, next) => {
//     try {
//         const admin = await Admin.countDocuments()
//         const customer = await Customer.countDocuments()
//         const category = await Category.countDocuments()
//         const product = await Product.countDocuments()

//         // Latest products
//         let products = await Product.find(
//             {},
//             {
//                 name: 1,
//                 stockAmount: 1,
//                 salePrice: 1,
//                 "images.small": 1
//             }
//         )
//             .sort({ _id: -1 })
//             .limit(5)


//         res.status(200).json({
//             status: true,
//             admin,
//             customer,
//             category,
//             product,
//             products: products.map(item => {
//                 return {
//                     _id: item._id,
//                     name: item.name,
//                     stockAmount: item.stockAmount,
//                     salePrice: item.salePrice,
//                     thumbnail: Host(req) + "uploads/product/small/" + item.images.small
//                 }
//             })
//         })
//     } catch (error) {
//         if (error) next(error)
//     }
// }


// module.exports = {
//     Index
// }