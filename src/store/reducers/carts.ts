import { Cart } from "../../api";
import { simpleReducerFactory } from "./simpleReducer";

export const cartsReducer = simpleReducerFactory<Cart>("cart", "loadCart", "setCart", "errorCart", "clearCart");