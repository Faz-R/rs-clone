import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { ViewedState, ViewedDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useViewedDispatch = () => useDispatch<ViewedDispatch>();
export const useViewedSelector: TypedUseSelectorHook<ViewedState> = useSelector;
