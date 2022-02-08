import {
  CREATE_FISCALIA,
  RETRIEVE_FISCALIAS,
  UPDATE_FISCALIA,
  DELETE_FISCALIA,
  DELETE_ALL_FISCALIAS,
} from "../actions/types";
const initialState = [];
function fiscaliaReducer(fiscalias = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_FISCALIA:
      return [...fiscalias, payload];
    case RETRIEVE_FISCALIAS:
      return payload;
    case UPDATE_FISCALIA:
      return fiscalias.map((item) => {
        console.log(item);
        if (item.id === payload.id) {
          return {
            ...item,
            ...payload,
          };
        } else {
          return item;
        }
      });
    case DELETE_FISCALIA:
      return fiscalias.filter(({ id }) => id !== payload.id);
    case DELETE_ALL_FISCALIAS:
      return [];
    default:
      return fiscalias;
  }
}
export default fiscaliaReducer;
