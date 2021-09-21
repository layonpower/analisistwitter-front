
import React, { useState, useEffect } from 'react';
import { Button,Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FaFeather } from 'react-icons/fa';


import { getTweetMetrics } from "../../utils/apicalls.js";
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {CSVLink} from 'react-csv';

export default function Dashboard(props){

  const [searchTerm, setSearchTerm] = useState("");
  
  const [metrics, setMetrics] = useState({});

  const [ dataChart, setDataChart ] = useState ( {} );
  const [ dataChart2, setDataChart2 ] = useState ( {} );
  const [ dataChart3, setDataChart3 ] = useState ( {} );

  const [userID, setUerID] = useState("");

  const {register, errors, handleSubmit} = useForm();

  const [csvData, setCsvData] = useState([]); 

  const handleChange = e => {
    //alert(e.target.value);
    setSearchTerm(e.target.value);
  };

 

  useEffect(() => {
    //llamamos a la funcion asíncrona  

      setUerID(props.id);
      getTweetMetrics(props.id).then((metrics) => {
      metrics=JSON.parse(metrics);
      setMetrics(metrics);
      console.log("front");
      console.log(metrics);
      console.log("dentro" + metrics);
      //creamos los datos del chart, le pasamos los datos devueltos en la llamada de la API

      setDataChart({
        labels: ['Tweet id:'+props.id],
        datasets: [
          {
            label: "Alcance potencial",
            data: [metrics.reach],
            //data: [56, metrics.interaction, 7],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'
            ],
            borderWidth: 4
          }
        ]
      });

      setDataChart2({
        labels: ['Tweet id:'+props.id],
        datasets: [
          {
            label: "Interacción",
            data: [metrics.interaccion],
            //data: [56, metrics.interaction, 7],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'
            ],
            borderWidth: 4
          }
        ]
      });

      setDataChart3({
        labels: ['Tweet id:'+props.id],
        datasets: [
          {
            label: "Tasa de Interacción",
            data: [metrics.interaction_rate],
            //data: [56, metrics.interaction, 7],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'
            ],
            borderWidth: 4
          }
        ]
      });

      const csvData2 = [
        ['Alcance potencial','Interacción','Tasa de Interacción'],
        [metrics.reach,metrics.interaccion,metrics.interaction_rate]
      ];
  
      console.log('csv:' + csvData2);
      setCsvData(csvData2);

    });


  
  }, {});


  //metricas de alcance
  const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
            //position: 'right',
            display : false
    },
    title: {
      display: true,
      text: 'Alcance potencial',
    },
  },
};

const options2 = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
            //position: 'right',
            display : false
    },
    title: {
      display: true,
      text: 'Interacción',
    },
  },
};

const options3 = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
           //position: 'right',
           display : false
    },
    title: {
      display: true,
      text: 'Tasa de Interacción',
    },
  },
};

console.log('datachart' +dataChart.datasets);

return (
  <>
    <CardTitle tag="left"><Alert color="white"><strong>Análisis del Tweet con id {userID} </strong></Alert></CardTitle>
    <CSVLink data={csvData} filename="datos.csv"><Button outline color="success" >Descargar csv</Button></CSVLink> 
    <Table>
        <tbody>
          <Row>
              <Col>
                <Bar data={dataChart} options={options} />
              </Col>
              <Col>
                <Bar data={dataChart2} options={options2} /> 
              </Col>
              
          </Row>
          <Row>
              <Col>
                <Bar data={dataChart3} options={options3} />
              </Col>

          </Row>

          </tbody>




    </Table>
        

  
  </>
  
);

}