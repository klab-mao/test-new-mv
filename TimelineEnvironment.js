// TimelineEnvironment.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

class TimelineEnvironment {
  constructor() {
    this.witts = [];
    this.isLoading = false;
    this.listeners = new Set();
  }

  setWitts(witts) {
    this.witts = witts;
    this.notifyListeners();
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
    this.notifyListeners();
  }

  likeWitt(id) {
    const wittIndex = this.witts.findIndex(witt => witt.id === id);
    if (wittIndex !== -1) {
      this.witts[wittIndex] = {
        ...this.witts[wittIndex],
        likes: (this.witts[wittIndex].likes || 0) + 1
      };
      this.notifyListeners();
    }
  }

  addListener(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this));
  }
}

const TimelineContext = createContext(null);

export const TimelineProvider = ({ children }) => {
  const [environment] = useState(() => new TimelineEnvironment());

  return (
    <TimelineContext.Provider value={environment}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const environment = useContext(TimelineContext);
  const [state, setState] = useState(environment);

  useEffect(() => {
    return environment.addListener(setState);
  }, [environment]);

  const likeWitt = useCallback((id) => environment.likeWitt(id), [environment]);

  return { ...state, likeWitt };
};

export const useTimelineActions = () => {
  const environment = useContext(TimelineContext);
  return {
    setWitts: useCallback((witts) => environment.setWitts(witts), [environment]),
    setIsLoading: useCallback((isLoading) => environment.setIsLoading(isLoading), [environment]),
  };
};