import { update } from "../daos/usuarioDaos.js";

const usuarioUpdate = async (userId, cartId) => {
  return await update(userId, cartId);
};

export { usuarioUpdate };
