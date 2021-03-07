import { NeutrinoApiAvatarTypes } from './const';

export interface NeutrinoApiAvatar {
  uri: string;
  isLocal: boolean;
  type: NeutrinoApiAvatarTypes;
}
