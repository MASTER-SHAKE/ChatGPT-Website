import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';


export interface CardsState {
    cards: Array<number>;
    addCard: (points: number) => void;
}

export const createCardsSlice: StateCreator<CardsState, [], [['zustand/immer', never], ...[]]> = immer((set) => ({
    cards: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    addCard: (card) =>
        set((state) => {
            const empty = state.cards.findIndex((el) => el === -1);
            if (empty >= 0) {
                state.cards[empty] = card;
            } else {
                state.cards;
            }
        }),
}));
