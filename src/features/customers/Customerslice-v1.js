const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payLoad.fullName,
        nationalID: action.payLoad.nationalID,
        createdAt: action.payLoad.createdAt,
      };
    case "customer/updateName":
      console.log("payload updated name", action.payLoad);

      return {
        ...state,
        fullName: action.payLoad,
      };

    default:
      return state;
  }
}

//action creators
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payLoad: { fullName, nationalID, createdAt: new Date().toISOString },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payLoad: fullName };
}
