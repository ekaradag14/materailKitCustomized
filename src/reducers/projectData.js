const projectData = (
  state = {
    publicsector: JSON.parse(sessionStorage.getItem("publicsector")),
    company: JSON.parse(sessionStorage.getItem("company")),
    publicinstitution: JSON.parse(sessionStorage.getItem("publicinstitution")),
    energysource: JSON.parse(sessionStorage.getItem("energysource")),
    roles: JSON.parse(sessionStorage.getItem("roles")),
    privilege: JSON.parse(sessionStorage.getItem("privilege")),
    user: JSON.parse(sessionStorage.getItem("user")),
    dashboardStats: JSON.parse(sessionStorage.getItem("dashboardStats")),
    AuthToken: sessionStorage.getItem("AuthToken"),
  },
  action
) => {
  switch (action.type) {
    case "ADD_AUTH":
      return {
        ...state,
        user: action.user,
      };
    case "ADD_ITEM":
      return {
        ...state,
        [action.itemType]: [...state[action.itemType], action.data],
      };
    case "ADD_DATA":
      return {
        ...state,
        [action.data.dataName]: action.data.payload,
      };
    default:
      return state;
  }
};

export default projectData;
