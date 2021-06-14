import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector
} from 'react-redux';
import { State } from '../types';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

export const useCallbackState = <T>(
  initialState: T,
  callback: (value: T) => void,
  debounceCallback?: number
): [T, (value: T) => void, (value: T) => void] => {
  const [state, setState] = useState<T>(initialState);

  const debounced = useDebouncedCallback((value: T) => {
    callback(value);
  }, debounceCallback);

  const setCallbackState = useCallback<(value: T) => void>(
    (value: T) => {
      setState(value);
      debounced(value);
    },
    [debounced]
  );

  return [state, setCallbackState, setState];
};
