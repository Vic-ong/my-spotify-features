/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, reactive, ComputedRef } from 'vue';

enum State {
  Audio = 'audio',
}
interface DataState<T> {
  loading: boolean;
  error: boolean;
  data: T;
}
interface StateObject {
  [key: string]: DataState<any>;
}
interface AudioControls {
  name: string;
  src: string;
  pause: boolean;
}

const state = reactive<StateObject>({
  [State.Audio]: {
    loading: false,
    error: false,
    data: {
      name: '',
      src: '',
      pause: false,
    },
  },
});

export const useControls = () => {
  const audio: ComputedRef<DataState<AudioControls>> = computed(() => state[State.Audio]);

  const setLoading = (stateKey: State, loadingState: boolean) => {
    state[stateKey].error = false;
    state[stateKey].loading = loadingState;
  };

  const setError = (stateKey: State, err: any) => {
    state[stateKey].error = true;
    state[stateKey].loading = false;
    console.error(err);
  };

  const setData = (stateKey: State, data: any) => {
    state[stateKey].data = data;
  };

  const executeAction = async (stateKey: State, callback: () => void): Promise<void> => {
    try {
      setLoading(stateKey, true);
      await callback();
      setLoading(stateKey, false);
    } catch (err) {
      setError(stateKey, err);
    }
  };

  const getAudioElement = (id: string) => document.getElementById(id) as HTMLAudioElement;

  const setAudioTrack = async (params: AudioControls) => {
    const stateKey = State.Audio;
    await executeAction(stateKey, () => {
      setData(stateKey, params);
    });
  };

  const setAudioPause = () => {
    const stateKey = State.Audio;
    executeAction(stateKey, () => {
      state[stateKey].data.pause = true;
    });
  };

  const setAudioPlay = () => {
    const stateKey = State.Audio;
    executeAction(stateKey, () => {
      state[stateKey].data.pause = false;
    });
  };

  return {
    // getters
    audio,

    // actions
    getAudioElement,
    setAudioTrack,
    setAudioPause,
    setAudioPlay,
  };
};
