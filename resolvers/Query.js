module.exports = {
    colors: async(parent, args, {Models})=>{
        return await Models.Colors.find({})
    },
    color: async(parent, args, {Models})=>{
        return await Models.Colors.findById(args.id)
    },
    productsFeed: async(parent, args, {Models})=> {
        return await Models.products.find({})
    },
    product: async(parent, {id},{Models})=> {
        return await Models.products.findById(id)
    },
    productType: async(parent, {gender},{Models})=> {
        return await Models.products.find({gender})
    },
    productColor: async(parent, {color},{Models})=> {
        return await Models.products.find({color})
    },
    promocodes: async(parent, args,{Models})=> {
        return await Models.promocodes.find({}).sort({"createdAt":-1})
    },
    promocode: async(parent, {id},{Models})=> {
        return await Models.promocodes.findOne({_id: id})
    },
    checkPromocode: async(parent, {code},{Models})=> {
        return await Models.promocodes.findOne({code})
    },
    OrdersFeed: async(parent, args,{Models})=>{
        return await Models.orders.find({})
    }
}
