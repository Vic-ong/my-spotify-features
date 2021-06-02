/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, reactive, ComputedRef } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import { refreshAccessToken, checkExpired } from './auth';
import {
  SpotifyProfile,
  SpotifyPlaylists,
  SpotifyPlaylist,
  SpotifyTopTracks,
  SpotifyTopArtists,
  SpotifyTracksFeatures,
} from './types';

enum State {
  Profile = 'profile',
  Playlists = 'playlists',
  Playlist = 'playlist',
  TopTracks = 'topTracks',
  TopArtists = 'topArtists',
  TracksFeatures = 'tracksFeatures',
}
interface DataState<T> {
  loading: boolean;
  error: boolean;
  data: T;
}
interface StateObject {
  [key: string]: DataState<any>;
}

const BASE_URL = process.env.VITE_SPOTIFY_API_ENDPOINT;

const state = reactive<StateObject>({
  [State.Profile]: {
    loading: false,
    error: false,
    data: null,
  },
  [State.Playlists]: {
    loading: false,
    error: false,
    data: null,
  },
  [State.Playlist]: {
    loading: false,
    error: false,
    data: null,
  },
  [State.TopTracks]: {
    loading: false,
    error: false,
    data: null,
  },
  [State.TopArtists]: {
    loading: false,
    error: false,
    data: null,
  },
  [State.TracksFeatures]: {
    loading: false,
    error: false,
    data: null,
  },
});

/**
 * Sets the request header. Refresh the access_token if it's expired.
 * @returns Http Request Header
 */
interface RequestHeader {
  'Authorization': string;
  'Content-Type': string;
}
const setHeaders = async (isExpired = false): Promise<RequestHeader> => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken && isExpired) {
    const { access_token, expires_in } = await refreshAccessToken(refreshToken);
    const expireDateTime = dayjs().add(parseInt(expires_in.toString()), 'second').toString();
    localStorage.setItem('access_token', access_token.toString());
    localStorage.setItem('expires_in', expireDateTime);
  }
  return {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  };
};

export const useSpotify = () => {
  const profile: ComputedRef<DataState<SpotifyProfile>> = computed(() => state[State.Profile]);
  const playlists: ComputedRef<DataState<SpotifyPlaylists>> = computed(() => state[State.Playlists]);
  const playlist: ComputedRef<DataState<SpotifyPlaylist>> = computed(() => state[State.Playlist]);
  const topTracks: ComputedRef<DataState<SpotifyTopTracks>> = computed(() => state[State.TopTracks]);
  const topArtists: ComputedRef<DataState<SpotifyTopArtists>> = computed(() => state[State.TopArtists]);
  const tracksFeatures: DataState<SpotifyTracksFeatures> = state[State.TracksFeatures];

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

  const executeAction = async (stateKey: State, callback: (param: RequestHeader) => void): Promise<void> => {
    try {
      setLoading(stateKey, true);
      const isExpired = checkExpired();
      const headers = await setHeaders(isExpired);
      await callback(headers);
      setLoading(stateKey, false);
    } catch (err) {
      setError(stateKey, err);
    }
  };

  const getProfile = async () => {
    const stateKey = State.Profile;
    await executeAction(stateKey, async (headers) => {
      const res = await axios.get(`${BASE_URL}/me`, { headers });
      setData(stateKey, res.data);
    });
  };

  const getPlaylists = async () => {
    const stateKey = State.Playlists;
    await executeAction(stateKey, async (headers) => {
      const res = await axios.get(`${BASE_URL}/me/playlists`, { headers });
      setData(stateKey, res.data);
    });
  };

  const getPlaylist = async (id: string) => {
    const stateKey = State.Playlist;
    await executeAction(stateKey, async (headers) => {
      const res = await axios.get(`${BASE_URL}/playlists/${id}`, { headers });
      setData(stateKey, res.data);
    });
  };

  const getTopTracks = async ({ timeRange = 'short_term', limit = 10 } = {}) => {
    const stateKey = State.TopTracks;
    await executeAction(stateKey, async (headers) => {
      const res = await axios.get(
        `${BASE_URL}/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
        { headers },
      );
      setData(stateKey, res.data);
    });
  };

  const getTopArtists = async ({ timeRange = 'short_term', limit = 10 } = {}) => {
    const stateKey = State.TopArtists;
    await executeAction(stateKey, async (headers) => {
      const res = await axios.get(
        `${BASE_URL}/me/top/artists?time_range=${timeRange}&limit=${limit}`,
        { headers },
      );
      setData(stateKey, res.data);
    });
  };

  const getTracksFeatures = async ({ ids = [] as string[] } = {}) => {
    const stateKey = State.TracksFeatures;
    await executeAction(stateKey, async (headers) => {
      // TODO: parse pagination
      // const limit = 100;
      // if (ids.length > limit) {
      //   let offset = 0;
      //   while (offset < ids.length) {
      //     const partitionedIds = ids.slice(offset, 100);
      //     offset += 100;
      //     console.log(partitionedIds, offset);
      //   }
      // }
      const res = await axios.get(
        `${BASE_URL}/audio-features?ids=${ids.slice(0, 100).join(',')}`,
        { headers },
      );
      console.log(res.data);
      setData(stateKey, res.data);
    });
  };

  return {
    // getters
    profile,
    playlists,
    playlist,
    topTracks,
    topArtists,
    tracksFeatures,

    // actions
    getProfile,
    getPlaylists,
    getPlaylist,
    getTopTracks,
    getTopArtists,
    getTracksFeatures,
  };
};
