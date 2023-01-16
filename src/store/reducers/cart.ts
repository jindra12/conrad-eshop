import { CartResult } from "../../api";
import { simpleReducerFactory } from "./simpleReducer";

/**
 * User cart API reducer
 */
export const cartReducer = simpleReducerFactory<CartResult[]>("cart", "loadCart", "setCart", "errorCart", "clearCart");