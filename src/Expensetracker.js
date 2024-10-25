import React, { useEffect, useState } from "react";
import "./style.css";

const Expensetracker = () => {
  const [input, setInput] = useState({
    des: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpense] = useState([]);
  const [isEditing, setIsEditing]= useState(false);
  const[editIndex, setEditIndex]= useState(true);

  const submitinput = (event, props) => {
    const fieldValue = { ...input, [props]: event.target.value };
    setInput(fieldValue);
  };

  const onSubmitExpense = (event) => {
    event.preventDefault();
    if (!input.des || !input.category || !input.amount || input.amount <= 0) {
      console.log("Please fill all fields correctly.");
      return;
    }
    if(isEditing){
      const updatedExpenses = expenses.map((expense, index)=>
        index === editIndex ? input : expense
      );
      setExpense(updatedExpenses);
      setIsEditing(false);
      setEditIndex(null);
    }
    else{
      const updatedExpenses = [...expenses, input];
      setExpense(updatedExpenses);
    }

    setInput({ des: "", category: "", amount: "" });
    localStorage.setItem("expenses", JSON.stringify(isEditing ? expenses : [...expenses, input]));
  };

  const delbtn = (ind) => {
    const newExpenses = expenses.filter((_, index) => index !== ind);
    setExpense(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  };

  const totalAmount = () => {
    let tamount = 0;
    for (let i = 0; i < expenses.length; i++) {
      tamount = tamount + parseFloat(expenses[i].amount || 0);
    }
    return tamount;
  };
  const updatebtn = (ind) => {
    const expenseToUpdate = expenses[ind];
    setInput(expenseToUpdate);
    setIsEditing(true);
    setEditIndex(ind);
  };

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpense(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      console.log("Expenses updated", expenses);
    }
  }, [expenses]);
  return (
    <>
      <div className="container">
        <form onSubmit={onSubmitExpense}>
          <h1>Expense Tracker</h1>
          <input
            type="text"
            placeholder="Item"
            name="des"
            value={input.des}
            onChange={(e) => submitinput(e, "des")}
          />
          <select
            type="text"
            placeholder="Item"
            name="category"
            value={input.category}
            onChange={(e) => submitinput(e, "category")}
          >
            <option>Select Category</option>
            <option>Food</option>
            <option>Transportation</option>
            <option>Utilities</option>
            <option>Entertainment</option>
            <option>Others</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={input.amount}
            onChange={(e) => submitinput(e, "amount")}
          />
          <button>{isEditing ? "Update Expense" :"AddExpense" }</button>
        </form>
        <table>
          <thead>
            <tr className="tablehead">
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action Button</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((res, index) => (
              <tr id={index}>
                <td>{res.des}</td>
                <td>{res.category}</td>
                <td>${res.amount}</td>
                <td>
                  <button id="delbtn" onClick={(e) => delbtn(index)}>
                    Delete
                  </button>{" "}
                  <button id="updatebtn" onClick={(e) => updatebtn(index)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} id="tamount">
                TotalAmount
              </td>
              <td colSpan={2}>${totalAmount()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Expensetracker;
