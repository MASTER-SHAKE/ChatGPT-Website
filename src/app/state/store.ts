import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {createHistorySlice, HistoryState} from "@/app/state/historySlice";
import {createUserSettings, SettingsState} from "@/app/state/userSettings";
import {createPointsSlice, PointsState} from '../components/hunter/state/pointsSlice';
import {createCardsSlice, CardsState} from '../components/hunter/state/cardsSlice';

export const useCodeMaxStore = create<SettingsState & HistoryState & PointsState & CardsState>()(
  devtools(
    persist(
      (...a) => ({
        ...createHistorySlice(...a),
        ...createUserSettings(...a),
        ...createPointsSlice(...a),
        ...createCardsSlice(...a),
      }),
      {
        name: 'code-max-data',
      },
    ),
  ),
);