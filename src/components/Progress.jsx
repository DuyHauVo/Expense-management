import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../sevice/FirebaseService";
import { useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Progress(props) {
  const chartRef = useRef(null);
  const [spend, setSpend] = useState([]);
  const [update, setUpdate] = useState(false);
  const { id } = useParams();
  //get API spend
  useEffect(() => {
    fetchAPI_Spen();
  }, [update, id]);
  const fetchAPI_Spen = async () => {
    try {
      setSpend(await fetchDocuments("spending"));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(spend);
  useEffect(() => {
    getData();
  }, [spend]);

  function getData() {
    // console.log("svvsd")
    const data = [];
    spend.map((element) => {
      const month = getMonthByDate(element.date);
      // console.log("askhdgsaj");
      result(month);
    });
    // console.log(data);
  }
  function getMonthByDate(date) {
    const array = date.split("-");
    return date ? array[1] : "";
  }

  function result(month) {
    switch (month) {
      case "7":
        console.log("akjsdsa");
        break;
      case "8":
        console.log("akjsdsa");
        break;
      default:
        break;
    }
    console.log(month);
  }
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="p-5" style={{ width: "600px", height: "400px" }}>
      <h2>Bar Example</h2>
      <Bar
        ref={chartRef}
        data={data}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default Progress;
