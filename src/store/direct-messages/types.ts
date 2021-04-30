export interface DmsSettings {
  backgroundUri?: string
  backgroundOpacity?: number;
  backgroundBlur?: number;
  color?: string;
  blocked?: string;
}

export interface Dms {
  id: string;
  nickname?: string;
  settings: DmsSettings;
  messages: string[];
  createdDate: string;
  lastMessage:{
    id: string;
    content: string;
  };
  typing: boolean;
}

export interface DmsState {
  joined: string[];
  recent: string[];
  entries: {
    [key: string]: Dms
  }
}
