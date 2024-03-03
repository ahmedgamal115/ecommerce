const { default: mongoose } = require("mongoose")
const path = require('path')
const fs = require('fs')
const { GetColorName } = require("hex-color-to-color-name")


module.exports = {
    addProduct: async(parent, args, {Models})=>{
        const colorName = GetColorName(args.color)
        let imagesPath = []
        for (let index = 0; index < args.image.length; index++) {
            const { createReadStream, filename, encoding, mimetype } = await args.image[index]
            
            const stream = createReadStream()
            const pathName = path.join(`./images/${colorName}_${index}_${Date.now()}_${path.extname(filename)}`)
            await stream.pipe(fs.WriteStream(pathName))
            imagesPath.push(pathName)
        }
        let newProduct = Models.products({
            image: imagesPath,
            status: args.status,
            gender: args.gender,
            color: args.color,
            price: args.price
        })
        return await newProduct.save()
    },
    deleteProduct: async(parent, args, {Models})=>{
        try {
            if(await Models.products.findById(id)){
                await Models.products.findByIdAndDelete(args.id)
                return 'Product deleted'
            }else{
                return "Invalid id"
            }
        } catch (error) {
            console.error(error)
        }
    },
    updateProduct: async(parent, args, {Models})=>{
        try {
            if(args.image){
                // Delete old image from files images
                for (let index = 0; index < args.oldImage.length; index++) {
                   if(fs.existsSync(`./${args.oldImage[index]}`)){
                       await fs.unlinkSync(`./${args.oldImage[index]}`)
                   }
                }
                // Upload new image
                const colorName = GetColorName(args.color)
                let imagesPath = []
                for (let index = 0; index < args.image.length; index++) {
                    const { createReadStream, filename, encoding, mimetype } = await args.image[index]
                    
                    const stream = createReadStream()
                    const pathName = path.join(`./images/${colorName}_${index}_${Date.now()}_${path.extname(filename)}`)
                    await stream.pipe(fs.WriteStream(pathName))
                    imagesPath.push(pathName)
                }
                // set new data in db
                return await Models.products.findOneAndUpdate( {_id:args.id},{$set:{
                    image: imagesPath,
                    status: args.status,
                    gender: args.gender,
                    color: args.color,
                    price: args.price}},{new:true})
            }else{
                return await Models.products.findOneAndUpdate( {_id:args.id},{$set:{
                    image: args.image,
                    status: args.status,
                    gender: args.gender,
                    color: args.color,
                    price: args.price}},{new:true})
            }
        } catch (error) {
            console.error(error)
        }
    },

    addPromoCode: async(parent, args, {Models})=>{
        let newPromoCode = Models.promocodes({
            code: args.code,
            discount: args.discount,
            expire: new Date(args.expire).toString(),
        })
        return await newPromoCode.save()
    },
    deletePromoCode: async(parent, args, {Models})=>{
        try {
            if(await Models.promocodes.findById(args.id)){
                await Models.promocodes.findByIdAndDelete(args.id)
                return 'Promo code deleted'
            }else{
                return 'Invalid id'
            }
        } catch (error) {
            console.error(error)
        }
    },
    updatePromoCode: async(parent, args, {Models})=>{
        try {
            return await Models.promocodes.findOneAndUpdate( {_id:args.id},{$set:{
                code: args.code,
                discount: args.discount,
                expire: new Date(args.expire).toString()}},{new:true})
        } catch (error) {
            console.error(error)
        }
    },

    makeOrder: async(parent, args, {Models})=>{
        try {
            let newOrder = Models.orders({
                username: args.username,
                email: args.email,
                phone: args.phone,
                otherPhone: args.otherPhone,
                address: args.address,
                size: args.size,
                amount:args.amount,
                payway: args.payway,
                commentQ: args.commentQ,
                orderNumber: args.orderNumber,
                discountCode: args.discountCode,
                productOrder: args.productOrder,
            })
            await newOrder.save()
            return newOrder

        } catch (error) {
            console.error('Error When Make Order'+error)
        }
    },
    deliverOrder: async(parent, { id }, {Models})=>{   
        try {
            if(await Models.orders.findById(id)){
                await Models.orders.findOneAndUpdate({_id: id},{delivered: true})
                return "Delivered Done"
            }else{
                return "Not avalid id"
            }
        } catch (error) {
            console.error(error)
        }
    },
    deleteOrder: async(parent, { id }, {Models})=>{
        try {
           if(await Models.orders.findById(id)){
            await Models.orders.findByIdAndDelete(id)
            return "Order deleted"
           }else{
            return "Not avalid id"
           }
        } catch (error) {
            console.error(error)
        }
    }
}