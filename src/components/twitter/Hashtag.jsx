import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FaFeather } from 'react-icons/fa';


import { getHashtagMetrics } from "../../utils/apicalls.js";

import { Bar } from 'react-chartjs-2';

import {CSVLink} from 'react-csv';

export default function Hashtag(){

  const [panel, setPanel] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [tweets, setPosts] = useState([]);
   
  const [id_tweet,  setId_Tweet] = useState("");

  const {register, errors, handleSubmit} = useForm();

  const [metrics, setMetrics] = useState({});

  const [ dataChart, setDataChart ] = useState ( {} );
  const [csvData, setCsvData] = useState([]); 

  const handleChange = e => {
    //alert(e.target.value);
    setSearchTerm(e.target.value);
    setPanel(0);
  };

  const ShowStats = (e) => {
    e.preventDefault();
    setPanel(1);
    getHashtagMetrics(searchTerm).then((metrics) => {
      metrics=JSON.parse(metrics);
      setMetrics(metrics);
      console.log("front");
      console.log(metrics);
      console.log("dentro" + metrics);
      //creamos los datos del chart, le pasamos los datos devueltos en la llamada de la API
      setDataChart({
        labels: [searchTerm],
        datasets: [
          {
            label: "Alcance potencial",
            data: [metrics.reach],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'
            ],
            borderWidth: 4
          }
        ]
      });

      const csvData2 = [
        ['Alcance potencial'],
        [metrics.reach]
      ];
  
      console.log('csv:' + csvData2);
      setCsvData(csvData2);



    });

  }

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

if (panel==0){
  return (
    <div>
    <label>Introduzca un hashtag</label>
    <input 
            value ={searchTerm}
            type="text"
            onChange={handleChange}
    >
    </input>
      <Button onClick={(e) => ShowStats(e)}>Métricas</Button>
    </div>
  );
}
else{

  return (

<>
    
    <div>
       <label>Introduzca un hashtag</label>
       <input 
                value ={searchTerm}
                type="text"
                onChange={handleChange}
      >
      </input>
      <Button onClick={(e) => ShowStats(e)}>Métricas</Button>
    </div>
    <CSVLink data={csvData} filename="datos.csv"><Button outline color="success" >Descargar csv</Button></CSVLink> 
    <Table>
    <tbody>
      <Row>
          <Col>
            <Bar data={dataChart} options={options} />
          </Col>
      </Row>
      </tbody>
    </Table>

</>
    );

}
}
