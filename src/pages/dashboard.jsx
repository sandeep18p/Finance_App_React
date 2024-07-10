import React, { useState, useEffect } from "react";
import Header from "../components/header/header";
import Cards from "../components/Cards";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import AddExpenseModal from "../components/Modals/AddExpense";
import AddIncomeModal from "../components/Modals/AddIncome";
import moment from "moment";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Dashboard =()=>{
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);

  

    const showExpenseModal = () => {
        setIsExpenseModalVisible(true);
      };
    const showIncomeModal = () => {
        setIsIncomeModalVisible(true);
      };
    
      const handleExpenseCancel = () => {
        setIsExpenseModalVisible(false);
      };
    
      const handleIncomeCancel = () => {
        setIsIncomeModalVisible(false);
      };

      const onFinish = (values, type) => {
          console.log("finish", values, type);
        const newTransaction = {
          type: type,
          date: moment(values.date).format("YYYY-MM-DD"),
          amount: parseFloat(values.amount),
          tag: values.tag,
          name: values.name,
        }; 
        addTransaction(newTransaction);
    }

    async function addTransaction(transaction, many) {
        try {
          const docRef = await addDoc(
            collection(db, `users/${user.uid}/transactions`),
            transaction
          );
          await getTransactions();
          if (!many) toast.success("Transaction Added!");
        } catch (error) {
          console.log("error", error.message);
          if (!many) toast.error("Transaction could not be added!");
        }
      }
 
      async function getTransactions() {
        setLoading(true);
        console.log('user: ', user);
        if (user) {
          const q = query(collection(db, `users/${user.uid}/transactions`));
          const querySnapshots = await getDocs(q);
          let transactionArray = [];
          querySnapshots.forEach((doc) => {
            transactionArray.push(doc.data());
          });
          console.log("transactionArray: ", transactionArray);
          setTransactions(transactionArray);
          calculateBalance(transactions);
          setLoading(false);
          return transactionArray;
        }
        setLoading(false);
      }

 
      function calculateBalance(transactions) {
        let incomeTotal = 0;
        let expenseTotal = 0;
        transactions.forEach((transaction) => {
          if (transaction.type === "income") {
            incomeTotal += transaction.amount;
          } else {
            expenseTotal += transaction.amount;
          }
        });
        setIncome(incomeTotal);
        setExpense(expenseTotal);
        setBalance(incomeTotal - expenseTotal);
      }
    
      useEffect(() => {
        getTransactions();
      }, [user]);

      
  useEffect(() => {
    calculateBalance(transactions);
  }, [transactions]);
    return(<>
    <div>
        <Header></Header>
        {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <Cards showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal} 
          
            ></Cards>
            <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          </>) }
    </div>
    </>)
}

export default Dashboard;