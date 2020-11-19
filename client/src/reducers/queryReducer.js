
export function queryReducer(state, action) {
    switch (action.type) {
      case "BUILD_QUERY":
        return {
          ...state,
        ...action.payload
        }
        case "QUERY_SUCCESS":
            return {
              ...state,
            result:action.payload
            }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }
  