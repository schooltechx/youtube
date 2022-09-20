import mongoose from 'mongoose'
const { Schema } = mongoose
const productSchema = new Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  tags: [String]
})
//_id is object can't serialize, delete it
productSchema.set('toJSON', { transform:(doc,ret)=>{
  ret.id=ret._id.toJSON()
  ret._id=ret._id.toJSON()
  //delete ret._id
} });
productSchema.set('toObject', { transform:(doc,ret)=>{
  ret.id=ret._id.toJSON()
  ret._id=ret._id.toJSON()
  //delete ret._id
} });

const ProductModel = mongoose.model('Product', productSchema)
export default ProductModel;
