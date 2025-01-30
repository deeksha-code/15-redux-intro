import React, { createContext, useContext, useReducer, useState } from "react";

// Actions
const DEPOSIT = "DEPOSIT";
const WITHDRAW = "WITHDRAW";
const REQUEST_LOAN = "REQUEST_LOAN";
const PAY_LOAN = "PAY_LOAN";

// Reducer function to manage the state
function accountReducer(state, action) {
  switch (action.type) {
    case DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        currency: action.payload.currency,
      };
    case WITHDRAW:
      return {
        ...state,
        balance: state.balance - action.payload.amount,
      };
    case REQUEST_LOAN:
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case PAY_LOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

// Initial state
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  currency: "USD",
  isLoading: false,
};

// Create Context
const AccountContext = createContext();

// Custom hook to use the AccountContext
const useAccount = () => useContext(AccountContext);

// AccountProvider component to wrap the app
export const AccountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
};

// AccountOperations component
function AccountOperations() {
  const { state, dispatch } = useAccount();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency,setCurrency]=useState("");

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch({
      type: DEPOSIT,
      payload: { amount: +depositAmount, currency: state.currency },
    });
    setDepositAmount("");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch({ type: WITHDRAW, payload: { amount: +withdrawalAmount } });
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch({
      type: REQUEST_LOAN,
      payload: { amount: +loanAmount, purpose: loanPurpose },
    });
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch({ type: PAY_LOAN });
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={state.currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={state.isLoading}>
            {state.isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {state.loan > 0 && (
          <div>
            <span>
              Pay back ${state.loan} ({state.loanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
