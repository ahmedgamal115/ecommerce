module.exports = {
    color: async(promo, args,{Models})=>{
        return await Models.Colors.findById(promo.color)
    },
}