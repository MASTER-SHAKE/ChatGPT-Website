import { StateCreator } from 'zustand';

export interface PointsState {
    user: string;
    title: string;
    points: number;
    availablePoints: number;
    addPoints: (points: number) => void;
    minusPoints: (min: number) => void;
}

export const createPointsSlice: StateCreator<PointsState> = (set) => ({
    user: 'MASTER',
    title: 'Hunter',
    points: 0,
    availablePoints: 0,
    addPoints: (points) =>
        set((state) => ({ points: state.points + points, availablePoints: state.availablePoints + points })),
    minusPoints: (total) => set(() => ({ availablePoints: total })),
});
