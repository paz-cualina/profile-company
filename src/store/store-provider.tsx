'use client';
import { useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import type { AppStore } from './store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Use a ref to make sure the same store instance is used across renders
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Assign the preconfigured store instance
    storeRef.current = store;
  }

  // storeRef.current is guaranteed to be non-null
  return <ReduxProvider store={storeRef.current as AppStore}>{children}</ReduxProvider>;
}
