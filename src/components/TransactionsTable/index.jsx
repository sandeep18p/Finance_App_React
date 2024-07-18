import React, { useState } from "react";
import "./styles.css";
import { Button, Radio, Row, Select, Table } from "antd";
import search_icon from "../../assets/search.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

const TransactionsTable = ({ transactions,getTransactions,addTransaction})=>{
     
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");

    function exportCsv() {
      let csv = unparse({
        fields: ["name", "amount", "type", "tag", "date"],
        data: [...transactions],
      }); 
      var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      var csvURL = window.URL.createObjectURL(blob);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.download = "transactions.csv";
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);


    }

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Tag",
          dataIndex: "tag",
          key: "tag",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
      ];
      let filteredTransactions = transactions.filter(
        (item) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) &&
          item.type?.includes(typeFilter)
      );  


      let sortedTransactions = [...filteredTransactions].sort((a, b) => {
        console.log("sortKey: ", sortKey);
        if (sortKey === "date") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
          return a.amount - b.amount;
        } else {
          return 0;
        }
      });

      function importFromCsv(event) {
        event.preventDefault();
        try {
          parse(event.target.files[0], {
            header: true,
            complete: async function (results) {
              // Now results.data is an array of objects representing your CSV rows
              for (const transaction of results.data) {
                // Write each transaction to Firebase, you can use the addTransaction function here
                console.log("Transactions", transaction);
                const newTransaction = {
                  ...transaction,
                  amount: parseFloat(transaction.amount),
                };
                console.log("new Transactions", newTransaction)
                await addTransaction(newTransaction, true);
              }
            },
          });
          toast.success("All Transactions Added");
          getTransactions();
          event.target.files = null;
        } catch (e) {
          toast.error(e.message);
        }
      }
      
      const dataSource = sortedTransactions.map((transaction, index) => ({
        key: index,
        ...transaction,
      }));

      
    return(<>
       <div className="tp">
        <div className="input-flex">
          <img src={search_icon} alt="img"/>
          <input
            placeholder="Search By Name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      {/* <input
            placeholder="Search By Name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          /> */}
           <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
        <Radio.Group
          className="input-radio"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort By Date</Radio.Button>
          <Radio.Button value="amount">Sort By Amount</Radio.Button>
        </Radio.Group>
        <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn"  
            onClick={exportCsv}
            >
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
    </>)
}

export default TransactionsTable;