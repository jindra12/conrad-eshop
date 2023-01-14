import { Cart } from "../../api";
import { simpleReducerFactory } from "./simpleReducer";

export const cartIdReducer = simpleReducerFactory<Cart>("cartId", "loadCart", "setCart", "errorCart", "clearCart");