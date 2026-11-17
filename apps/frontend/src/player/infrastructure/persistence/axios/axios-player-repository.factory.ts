import axios from 'axios';
import type { AccessTokenProvider } from '@/player/infrastructure/authentication/common/access-token-provider.interface';
import { AxiosPlayerRepository } from './axios-player-repository';

export function createAxiosPlayerRepository(
  playerApiBaseUrl: string,
  accessTokenProvider: AccessTokenProvider,
) {
  const axiosInstance = axios.create({
    baseURL: playerApiBaseUrl,
  });
  return new AxiosPlayerRepository(axiosInstance, accessTokenProvider);
}
