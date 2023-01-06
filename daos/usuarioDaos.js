import Users from "../models/usuarioSchema.js";

const update = async (userId, cartId) => {
  return await Users.findOneAndUpdate({ _id: userId }, { cart_id: cartId });
};

export { update };