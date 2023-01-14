import { Cart } from "../../api";
import { simpleReducerFactory } from "./simpleReducer";

export const cartReducer = simpleReducerFactory<Cart>("cart", "loadCart", "setCart", "errorCart", "clearCart");