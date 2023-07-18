import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SettingsState {
  userSettings: number[];
}

export const createUserSettings: StateCreator<SettingsState, [], [['zustand/immer', never], ...[]]> = immer((set) => ({
  userSettings: [-1, -1, -1, -1, -1, -1, -1, -1, -1]
}));