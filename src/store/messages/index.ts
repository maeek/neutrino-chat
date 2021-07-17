import { Reducer } from 'redux';
import { AddMessageReactions, MessagesActionsEnum, MessagesActionsType, MessagesState, MessageStatus, MessageTypes, ModifyMessage, RemoveAttachments, RemoveMessageReactions, RemoveMessages } from './types';

export const initialState: MessagesState = {
  messages: {},
  attachments: {}
};

export const messages: Reducer<MessagesState, MessagesActionsType> = (state = initialState, action) => {
  switch (action.type) {
  case MessagesActionsEnum.ADD_MESSAGES:
    return {
      messages: {
        ...state.messages,
        ...Object.fromEntries(action.data.messages.map((ms) => [ ms.uuid, ms ]))
      },
      attachments: {
        ...state.attachments,
        ...Object.fromEntries(action.data.attachments ? action.data.attachments.map((at) => [ at.uuid, at ]) : [])
      }
    };

  case MessagesActionsEnum.ADD_ATTACHMENTS:
    return {
      messages: {
        ...state.messages,
        [ action.data.messageId ]: {
          ...state.messages[ action.data.messageId ],
          attachments: [
            ...state.messages[ action.data.messageId ].attachments,
            ...action.data.attachments.map((at) => at.uuid)
          ]
        }
      },
      attachments: {
        ...Object.fromEntries(action.data.attachments.map((at) => [ at.uuid, at ]))
      }
    };

  case MessagesActionsEnum.REMOVE_MESSAGES:
    return removeMessages(state, action);

  case MessagesActionsEnum.REMOVE_ATTACHMENTS:
    return removeAttachments(state, action);

  case MessagesActionsEnum.MODIFY_MESSAGE:
    return modifyMessage(state, action);

  case MessagesActionsEnum.UPDATE_MESSAGE_STATUS:
    return {
      ...state,
      messages: {
        ...state.messages,
        [ action.data.messageId ]: {
          ...state.messages[ action.data.messageId ],
          status: action.data.status
        }
      }
    };

  case MessagesActionsEnum.ADD_MESSAGE_REACTIONS:
    return addMessageReactions(state, action);

  case MessagesActionsEnum.REMOVE_MESSAGE_REACTIONS:
    return removeMessageReactions(state, action);

  default:
    return state;
  }
};

const removeMessages = (state: MessagesState, action: RemoveMessages): MessagesState => {
  const newState = { ...state };

  for (const id of action.data.ids) {
    const ms = newState.messages[ id ];

    for (const at of ms.attachments) {
      delete newState.attachments[ at ];
    }

    delete ms.body;
    delete ms.mentions;
    delete ms.reactions;
    delete ms.timeSent;
    ms.attachments = [];
    ms.status = MessageStatus.REMOVED;
  }
  
  return newState;
};
const removeAttachments = (state: MessagesState, action: RemoveAttachments): MessagesState => {
  const newState = { ...state };
  
  for (const aid of action.data.ids) {
    // Revoke uri
    delete newState.attachments[ aid ];
  }

  const ms = newState.messages[ action.data.messageId ];
  ms.attachments = ms.attachments.filter((id) => !action.data.ids.includes(id));

  return newState;
};

const addMessageReactions = (state: MessagesState, action: AddMessageReactions): MessagesState => {
  const newState = { ...state };

  const ms = newState.messages[ action.data.messageId ];
  ms.reactions = [
    ...(ms.reactions || []),
    ...action.data.reactions.filter((react) => !ms.reactions?.find((r) => r.uuid === react.uuid))
  ];

  return newState;
};

const removeMessageReactions = (state: MessagesState, action: RemoveMessageReactions): MessagesState => {
  const newState = { ...state };

  const ms = newState.messages[ action.data.messageId ];
  ms.reactions = (ms.reactions || []).filter((react) => action.data.reactionsIds.includes(react.uuid));

  return newState;
};

const modifyMessage = (state: MessagesState, action: ModifyMessage): MessagesState => {
  const newState = { ...state };

  newState.messages[ action.data.uuid ] = {
    ...newState.messages[ action.data.uuid ],
    ...action.data
  };

  if (action.data.attachments) {
    newState.messages[ action.data.uuid ].attachments = newState.messages[ action.data.uuid ].attachments
      .filter((atid) => !newState.attachments[ atid ]);
  }
  
  return newState;
};
