import { useSyncExternalStore } from 'react';
import { leaveStore } from '../services/leaveService';

export function useLeaveData() {
  const state = useSyncExternalStore(
    (onStoreChange) => leaveStore.subscribe(onStoreChange),
    () => leaveStore.getState()
  );

  return {
    ...state,
    applyLeave: leaveStore.applyLeave.bind(leaveStore),
    reviewLeaveRequest: leaveStore.reviewLeaveRequest.bind(leaveStore),
    resetToDefault: leaveStore.resetToDefault.bind(leaveStore),
  };
}
