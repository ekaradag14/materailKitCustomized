export const addAuth = (user) => ({
  type: "ADD_AUTH",
  user,
});
export const addData = (data) => ({
  type: "ADD_DATA",
  data,
});

export const addItem = (itemType,data) => ({
  type: "ADD_ITEM",
  itemType,
  data,
});
