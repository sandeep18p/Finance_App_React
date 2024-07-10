import React from "react";
import "./styles.css";
import { Row, Card } from "antd";
import Button from "../Button";

const Cards = ({showExpenseModal,
    showIncomeModal,})=>{
  return (<>
       <Row className="row">
       <Card className="card" title="Current Balance">
          <p>₹ </p>
          <Button text={"Reset Balance"} blue="true" />
        </Card>

        <Card className="card" title="Total Income">
          <p>₹ </p>
          <Button
            text={"Add Income"}
            blue="true"
            onClick={showIncomeModal}
          />
        </Card>

        <Card className="card" title="Total Expense">
          <p>₹ </p>
          <Button
            text={"Add Expense"}
            blue="true"
            onClick={showExpenseModal}
          />
        </Card>
       </Row>
  </>)
}

export default Cards;