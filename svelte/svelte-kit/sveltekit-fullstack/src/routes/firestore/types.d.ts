export type Product = {
    id?: string,
    name?: string,
    category?: string?,
    price?: number,
    tags?: string[]?
};
export type Products = Product[]
export type Data = {
    products: Products,
    message:string
}
