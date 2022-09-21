import mongoose from 'mongoose'
const { Schema } = mongoose
const productSchema = new Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  tags: [String]
})
const ProductModel = mongoose.model('Product', productSchema)
export default ProductModel;