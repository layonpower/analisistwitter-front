
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FaFeather } from 'react-icons/fa';


import { getTweetMetrics } from "../../utils/apicalls.js";
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

export default function Dashboard(){

  const [searchTerm, setSearchTerm] = useState("");
  
  const [metrics, setMetrics] = useState({});

  const [ dataChart, setDataChart ] = useState ( {} );

  const {register, errors, handleSubmit} = useForm();

  const handleChange = e => {
    //alert(e.target.value);
    setSearchTerm(e.target.value);
  };

  /*const getTweetsMetrics = (term) => {
    //1417555335108235266  1370805087254290432

    getTweetMetrics('1417555335108235266').then((metrics) => {
      metrics=JSON.parse(metrics);
      setMetrics(metrics);
      console.log("front");
      console.log(metrics);


    });
 
  }
  */

  useEffect(() => {
    //llamamos a la funcion asíncrona  
    //getTweetsMetrics(searchTerm);
    //let met = [];
    getTweetMetrics('1417555335108235266').then((metrics) => {
      metrics=JSON.parse(metrics);
      setMetrics(metrics);
      console.log("front");
      console.log(metrics);
      //met = metrics;
      console.log("dentro" + metrics);
      //creamos los datos del chart, le pasamos los datos devueltos en la llamada de la API
      
      setDataChart({
        labels: ['interaccion', 'inter_rate', 'reach'],
        datasets: [
          {
            label: "probando",
            data: [metrics.reach, metrics.interaccion, metrics.interaction_rate],
            //data: [56, metrics.interaction, 7],
            backgroundColor: ["rgba(75, 192, 192, 0.6)"],
            borderWidth: 4
          }
        ]
      });
    });

  
  }, {});


  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [metrics.interaction, metrics.rate, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

const data2 = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

return (
  <>
    <div>HOla {metrics.reach}</div>
    <Doughnut data={dataChart} /> 
    
    <Line data={data2} options={options} />
  </>
);

}