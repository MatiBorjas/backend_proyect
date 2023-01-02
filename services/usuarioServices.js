import { update } from "../daos/usuarioDaos";

const usuarioUpdate = async (userId, cartId) => {
  return await update(userId, cartId);
};

export { usuarioUpdate };
