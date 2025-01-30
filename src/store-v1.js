import { useReducer } from "react";
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer={
  fullName:'',
  nationalID:'',
  createdAt:''

}

// const [state,dispatch]=useReducer(reducer,initilaState);

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer,action) {
  switch (action.type) {
    case "customer/createCustomer":
        return {...state,
          fullName:action.payLoad.fullName,
          nationalID:action.payLoad.nationalID,
          createdAt:action.payLoad.createdAt
        };
    case "account/updateName":
       return{
        ...state,
        fullName:action.payLoad
       }

    default:
      return state;
  }
}

const rootReducer=combineReducers({
  account:accountReducer,
  customer:customerReducer,
})
const store = createStore(rootReducer);


// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buy a car" },
// });

// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// const Account_Deposit = "account/deposit";

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}


function payLoan() {
  return{
    type: "account/payLoan"
  }
}


store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a cheap car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());


function createCustomer(fullName,nationalID){
  return { type: "customer/createCustomer",payLoad:{fullName,nationalID,createdAt:new Date().toISOString} };
}

function updateName(fullName){
  return {type:"account/updateName",payLoad:fullName};
}

store.dispatch(createCustomer('Jonas Schmedtmann',"2423435"));
console.log(store.getState());
