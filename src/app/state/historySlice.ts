import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface HistoryState {
  chatHistory: Array<number>;
}

export const createHistorySlice: StateCreator<HistoryState, [], [['zustand/immer', never], ...[]]> = immer((set) => ({
  chatHistory: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
}));
