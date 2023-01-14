import { CartResult } from "../../api";
import { simpleReducerFactory } from "./simpleReducer";

export const cartReducer = simpleReducerFactory<CartResult[]>("cart", "loadCart", "setCart", "errorCart", "clearCart");