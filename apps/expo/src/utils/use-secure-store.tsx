import * as React from "react";
import * as SecureStore from "expo-secure-store";

type UseStateHook<T> = [
  [boolean, T | null],
  (value: T | null, callback?: () => void) => void,
];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export function useSecureStore(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  React.useEffect(() => {
    SecureStore.getItemAsync(key)
      .then((value) => {
        setState(value);
      })
      .catch((e) => {
        console.error("Secure storage is unavailable:", e);
      });
  }, [key, setState]);

  const setValue = React.useCallback(
    async (value: string | null, callback?: () => void) => {
      setState(value);
      await setStorageItemAsync(key, value);
      callback?.();
    },
    [key, setState],
  );

  return [state, setValue];
}
