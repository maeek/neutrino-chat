import { Reducer } from 'redux';
import { messagesMock } from './mock';
import {
  AddMessageReactions,
  MessagesActionsEnum,
  MessagesActionsType,
  MessagesState,
  MessageStatus,
  ModifyMessage,
  RemoveAttachments,
  RemoveMessageReactions,
  RemoveMessages
} from './types';

export const initialState: MessagesState = import.meta.env.VITE_DEMO
  ? messagesMock
  : {
    list: {},
    attachments: {}
  };

export const messages: Reducer<MessagesState, MessagesActionsType> = (
  state = initialState,
  action = {} as MessagesActionsType
) => {
  switch (action.type) {
  case MessagesActionsEnum.ADD_MESSAGES:
    return {
      list: {
        ...state.list,
        ...Object.fromEntries(action.data.messages.map((ms) => [ ms.uuid, ms ]))
      },
      attachments: {
        ...state.attachments,
        ...Object.fromEntries(
          action.data.attachments
            ? action.data.attachments.map((at) => [ at.uuid, at ])
            : []
        )
      }
    };

  case MessagesActionsEnum.ADD_ATTACHMENTS:
    return {
      list: {
        ...state.list,
        [ action.data.messageId ]: {
          ...state.list[ action.data.messageId ],
          attachments: [
            ...state.list[ action.data.messageId ].attachments,
            ...action.data.attachments.map((at) => at.uuid)
          ]
        }
      },
      attachments: {
        ...Object.fromEntries(
          action.data.attachments.map((at) => [ at.uuid, at ])
        )
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
      list: {
        ...state.list,
        [ action.data.messageId ]: {
          ...state.list[ action.data.messageId ],
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

const removeMessages = (
  state: MessagesState,
  action: RemoveMessages
): MessagesState => {
  const newState = { ...state };

  for (const id of action.data.ids) {
    const ms = newState.list[ id ];

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
const removeAttachments = (
  state: MessagesState,
  action: RemoveAttachments
): MessagesState => {
  const newState = { ...state };

  for (const aid of action.data.ids) {
    // Revoke uri
    delete newState.attachments[ aid ];
  }

  const ms = newState.list[ action.data.messageId ];
  ms.attachments = ms.attachments.filter((id) => !action.data.ids.includes(id));

  return newState;
};

const addMessageReactions = (
  state: MessagesState,
  action: AddMessageReactions
): MessagesState => {
  const newState = { ...state };

  const ms = newState.list[ action.data.messageId ];
  ms.reactions = [
    ...(ms.reactions || []),
    ...action.data.reactions.filter(
      (react) => !ms.reactions?.find((r) => r.uuid === react.uuid)
    )
  ];

  return newState;
};

const removeMessageReactions = (
  state: MessagesState,
  action: RemoveMessageReactions
): MessagesState => {
  const newState = { ...state };

  const ms = newState.list[ action.data.messageId ];
  ms.reactions = (ms.reactions || []).filter((react) =>
    action.data.reactionsIds.includes(react.uuid)
  );

  return newState;
};

const modifyMessage = (
  state: MessagesState,
  action: ModifyMessage
): MessagesState => {
  const newState = { ...state };

  newState.list[ action.data.uuid ] = {
    ...newState.list[ action.data.uuid ],
    ...action.data
  };

  return newState;
};

export default messages;
