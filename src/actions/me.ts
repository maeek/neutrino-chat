import { ApiMe } from '@/api/me';

export const fetchMeBasicInfo = () => {
  return ApiMe.getMe().catch((e: any) => {
    console.error('Request failed with reason: ', e);
    // TODO: error reducer
  });
};
