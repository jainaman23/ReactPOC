import {
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  UPDATE_USER_IMAGE,
  UPDATE_USER_IMAGE_SUCCESS,
  UPDATE_USER_IMAGE_FAILURE,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAILURE,
} from '../../../helpers/actionConstants';

export function userEdit(state = {
  updatingUserDetails: false,
  updatedUserDetails: false,
  userEdit: null,
  userEditError: null,
  userEditStatus: null
}, action) {
  switch (action.type) {
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        updatingUserDetails: true,
        updatedUserDetails: false,
        userEdit: null,
        userEditError: null,
      };
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        updatingUserDetails: false,
        updatedUserDetails: true,
        userEdit: action.payload.data,
        userEditError: null,
        userEditStatus: action.payload.status
      };
    case UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        updatedUserDetails: false,
        userEditError: action.payload,
        updatingUserDetails: false,
        userEdit: null,
        userEditStatus: action.payload.status
      };
    default:
      return state;
  }
}

export function userImage(state = {
  updatingUserImage: false,
  updatedUserImage: false,
  userImage: null,
  userImageError: null,
  userImageStatus: null
}, action) {
  switch (action.type) {
    case UPDATE_USER_IMAGE:
      return {
        ...state,
        updatingUserImage: true,
        updatedUserImage: false,
        userImage: null,
        userImageError: null,
      };
    case UPDATE_USER_IMAGE_SUCCESS:
      return {
        ...state,
        updatingUserImage: false,
        updatedUserImage: true,
        userImage: action.payload.data,
        userImageError: null,
      };
    case UPDATE_USER_IMAGE_FAILURE:
      return {
        ...state,
        updatedUserImage: false,
        userImageError: action.payload,
        updatingUserImage: false,
        userImage: null,
        userImageStatus: action.payload.status
    };
    default:
      return state;
  }
}

export function userPass(state = {
  updatingUserPass: false,
  updatedUserPass: false,
  userPass: null,
  userPassError: null,
  userPassStatus: null
}, action) {
  switch (action.type) {
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        updatingUserPass: true,
        updatedUserPass: false,
        userPass: null,
        userPassError: null,
      };
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        updatingUserPass: false,
        updatedUserPass: true,
        userPass: action.payload.data,
        userPassError: null,
        userPassStatus: action.payload.status
      };
    case UPDATE_USER_PASSWORD_FAILURE:
      return {
        ...state,
        updatedUserPass: true,
        userPassError: action.payload,
        updatingUserPass: false,
        userPass: null,
        userPassStatus: action.payload.status
    };
    default:
      return state;
  }
}
