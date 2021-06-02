import axios from 'axios';
import dayjs from 'dayjs';

const BASE_URL = process.env.VITE_API_ENDPOINT;

/**
 * Redirect to spotify login and redirects back upon successful login
 */
export const login = (): void => {
  window.location.href = `${BASE_URL}/auth/authorize`;
};

/**
 * Redirect to spotify login and redirects back upon successful login
 */
interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}
export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const res = await axios.post(`${BASE_URL}/auth/refresh_token`, {
    refresh_token: refreshToken,
  });
  return res.data;
};

export const checkExpired = (): boolean => {
  const expiresIn = localStorage.getItem('expires_in');
  const expiredDate = dayjs(expiresIn || undefined);
  return expiredDate.diff(dayjs(), 'second') <= 0;
};

/**
 * Remove tokens and route to login
 */
export const logout = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
