import { SimpleActionFactory } from "../actions";
import { initialState, State } from "../state";

/**
 * Simple reducer factory for APIs with a string attribute of Store + 4 actions (load, set, error and clear)
 */
export const simpleReducerFactory = <
    TPayload,
    TLoad extends string = string,
    TSet extends string = string,
    TError extends string = string,
    TClear extends string = string,
>(
    at: keyof State,
    load: TLoad,
    set: TSet,
    error: TError,
    clear: TClear
) => {
    type SimpleAction = SimpleActionFactory<
        TPayload,
        TLoad,
        TSet,
        TError,
        TClear
    >;
    return (state = initialState[at], action: SimpleAction) => {
        switch (action.type) {
            case load:
                return {
                    isLoading: true,
                };
            case set:
                return (action as any).payload;
            case error:
                return (action as any).payload;
            case clear:
                return {};
            default:
                return state;
        }
    };
};
