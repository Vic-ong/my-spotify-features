interface SpotifyImage {
  height?: number;
  width?: number;
  url: string;
}

interface TracksReference {
  href: string;
  total: number;
}

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href?: string;
  total: number;
}

interface BaseObject {
  id: string;
  type: string;
  uri: string;
  href: string;
  external_urls: ExternalUrls;
}

interface Playlist extends BaseObject {
  public: true;
  collaborative: boolean;
  name: string;
  description: string;
  images: SpotifyImage[];
  snapshot_id: string;
  tracks: TracksReference;
}

interface Artist extends BaseObject {
  name: string;
  popularity: number;
  genres: string[];
  images: SpotifyImage[];
  followers: Followers;
}

interface ArtistRef extends BaseObject {
  name: string;
}

interface Album extends BaseObject {
  name: string;
  album_type: string;
  available_markets: string[];
  images: SpotifyImage[];
  artists: ArtistRef[];
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
}

interface SpotifyTrack extends BaseObject {
  name: string;
  explicit: boolean;
  preview_url?: string;
  popularity: number;
  track_number: number;
  is_local: boolean;
  album: Album;
  artists: ArtistRef[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  external_ids: {
    isrc: string;
  };
}

interface SpotifyPlaylistTrack {
  added_at: string;
  added_by: BaseObject;
  is_local: boolean;
  primary_color?: string;
  track: SpotifyTrack;
}

export enum TimeRange {
  FourWeeks = 'short_term',
  SixMonths = 'medium_term',
  AllTime = 'long_term',
}

export interface SpotifyProfile extends BaseObject {
  product: string;
  country: string;
  display_name: string;
  email: string;
  images: SpotifyImage[];
  followers: Followers;
}

export interface SpotifyList<T> {
  href: string;
  items: T[];
  limit: number;
  total: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export type SpotifyPlaylists = SpotifyList<Playlist>;

export interface SpotifyPlaylist extends BaseObject {
  name: string;
  collaborative: boolean;
  description: string;
  images: SpotifyImage[];
  followers: Followers;
  owner: {
    display_name: string;
  };
  primary_color?: string;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyList<SpotifyPlaylistTrack>;
}

export type SpotifyTopTracks = SpotifyList<SpotifyTrack>;

export type SpotifyTopArtists = SpotifyList<Artist>;

export interface SpotifyTrackFeature {
  id: string;
  key: number;
  acousticness: number;
  danceability: number;
  duration_ms: number;
  energy: number;
  instrumentalness: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  valence: number;
  track_href: string;
  type: string;
  uri: string;
  analysis_url: string;
}

export interface SpotifyTracksFeatures {
  audio_features: SpotifyTrackFeature[];
}
