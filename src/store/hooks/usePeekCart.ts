import { shallowEqual, useSelector } from "react-redux";
import { State } from "../state";


export const usePeekCart = () => {
    const state = useSelector<State, State["cartId"]>((state) => state.cartId, shallowEqual);
    return state;
};
