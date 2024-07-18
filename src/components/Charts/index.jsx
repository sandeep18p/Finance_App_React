import { Line, Pie } from "@ant-design/charts";
import React from "react";
import './styles.css'
import { Col, Row } from "antd";

const Charts = ({ transactions }) => {
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  console.log("sortedTransactions: ", sortedTransactions);

  let lineGraphData = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  let spendingData = transactions.filter((item) => {
    if (item.type === "expense") {
      return { amount: item.amount, tag: item.tag };
    }
  });
  console.log("spendingData: ", spendingData);

  let expensesData = spendingData.reduce((acc, item) => {
    let key = item.tag;
    if (!acc[key]) {
      acc[key] = { tag: item.tag, amount: item.amount };
    } else {
      acc[key].amount += item.amount;
    }
    return acc;
  }, {});
  expensesData = Object.values(expensesData);
  console.log("expensesData: ", expensesData);
  const data = [...lineGraphData];
  const config = {
    data,
    xField: "date",
    width:500,
    yField: "amount",
    point: {
      shapeField: "diamond",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  const spendingConfig = {
    data: expensesData,
    width:500,
    angleField: "amount",
    colorField: "tag",
    label: {
        text: ({ tag, amount }) => { 
          return `${tag}: ₹${amount}`;
        },
        fill: '#fff',
        fontSize: 18,
      },
    legend: false,
  };


  return (
    <Row className="graphs_div" justify="space-between" gutter={[16,16]}>
    {/* <div className="graphs_div"> */}
    <Col xs={24} sm={24} md={12} lg={15} xl={15}>
      {/* <div> */}
        <h2>Transaction Graph</h2>
        <Line {...config} />;
      {/* </div> */}
      </Col>
      <Col xs={24} sm={24} md={11} lg={8} xl={8}>
      {/* <div> */}
        <h2>Expenses Data</h2>
        <Pie {...spendingConfig} />
      {/* </div> */}
      </Col>
    {/* </div> */}
    </Row>
  );
};

export default Charts;