import { CartItem } from "../../api";
import { simpleReducerFactory } from "./simpleReducer";

export const cartReducer = simpleReducerFactory<CartItem[]>("cart", "loadCart", "setCart", "errorCart", "clearCart");