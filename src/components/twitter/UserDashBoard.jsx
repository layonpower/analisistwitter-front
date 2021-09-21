
import React, { useState, useEffect } from 'react';
import { Button,Row, Col, Card, CardTitle, Badge, CardBody, Table, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { FaFeather } from 'react-icons/fa';


import { getTweetMetrics } from "../../utils/apicalls.js";
import { getAccountMetrics } from "../../utils/apicalls.js";


import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import {CSVLink} from 'react-csv';

export default function UserDashboard(props){
  //export default function UserDashboard(){

  //console.log("estamos dentro del dashboard");
  //console.log(props);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [metrics, setMetrics] = useState({});
  const [metrics2, setMetrics2] = useState({});

  const [ dataChart, setDataChart ] = useState ( {} );
  const [ dataChartwonk, setDataChartwonk ] = useState ( {} );
  const [ dataCharttwday, setDataCharttwday ] = useState ( {} );
  const [ dataChartTFF, setDataChartTFF] = useState ( {} );
  const [ dataChartrt_rate, setDataChartrt_rate] = useState ( {} );
  const [ dataChartrt_eng, setDataChartrt_eng] = useState ( {} );
  const [ dataChartrt_parti, setDataChartrt_parti] = useState ( {} );
  const [csvData, setCsvData] = useState([]); 

  const {register, errors, handleSubmit} = useForm();

  const [user1, setUser1] = useState("");
  const [user_name1, setUser_Name1] = useState("");
  const [user2, setUser2] = useState("");
  const [user_name2, setUser_Name2] = useState("");
  const [user3, setUser3] = useState("");
  const [user_name3, setUser_Name3] = useState("");
  const [comparar, setComparar] = useState(0);

  const [startDate, setStartDate] = useState( "");
  const [endDate, setEndDate] = useState( "");



  const handleChange = e => {
    //alert(e.target.value);
    setSearchTerm(e.target.value);
  };



  function addZerotoDM(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

  useEffect(() => {

    console.log('el id a buscar es: '+props.id[0]);
    console.log('el id a buscar es: '+props.id[1]);
    console.log('la fecha a buscar es: '+props.fechaini);
    
    if (props.id.length == 1) {

      setUser1(props.id[0]);
      setUser_Name1(props.name[0]);

    } else if (props.id.length == 2){
        setComparar(1);
        setUser1(props.id[0]);
        setUser_Name1(props.name[0]);
        setUser2(props.id[1]);
        setUser_Name2(props.name[1]);
    
 
    } else if (props.id.length == 3){
      setComparar(2);
      setUser1(props.id[0]);
      setUser_Name1(props.name[0]);
      setUser2(props.id[1]);
      setUser_Name2(props.name[1]);
      setUser3(props.id[2]);
      setUser_Name3(props.name[2]);
  

  }

    let d_ini = props.fechaini.getDate();
    let M_ini =props.fechaini.getMonth()+1;
    let y_ini = props.fechaini.getFullYear();
    d_ini=addZerotoDM(d_ini);
    M_ini=addZerotoDM(M_ini);
    console.log (d_ini+'/'+M_ini+'/'+y_ini);
    setStartDate(d_ini+'/'+M_ini+'/'+y_ini);
    //formato para API debe ser ISO 8601 Ejemplo 2021-07-01T00:00:00Z
    let fini_iso = y_ini+'-'+M_ini+'-'+d_ini+'T00:00:00Z';

    //fecha final
    let d_fin = props.fechafin.getDate();
    let M_fin =props.fechafin.getMonth()+1;
    let y_fin = props.fechafin.getFullYear();
    d_fin=addZerotoDM(d_fin);
    M_fin=addZerotoDM(M_fin);
    console.log (d_fin+'/'+M_fin+'/'+y_fin);
    setEndDate(d_fin+'/'+M_fin+'/'+y_fin);
    //formato para API debe ser ISO 8601 Ejemplo 2021-07-01T00:00:00Z
    let ffin_iso = y_fin+'-'+M_fin+'-'+d_fin+'T00:00:00Z';


    console.log('feha ISO 8601: '+fini_iso);
    console.log('feha ISO 8601: '+ffin_iso);


    //llamamos a la funcion asíncrona  
    //TFG then es para la funcion asincrona
    getAccountMetrics(props.id[0]).then((metrics) => {
      metrics=JSON.parse(metrics);
      setMetrics(metrics);
      console.log("front");
      console.log(metrics);
      console.log("dentro" + metrics);

    
    

//Grafica numero de seguidores
setDataChart({
  labels: [metrics.username],
  datasets: [
    {
      label: "Número de seguidores",
      data: [metrics.seguidores],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'
      ],
      borderWidth: 4
    }
  ]
});

//Grafica numero de follower wokn
setDataChartwonk({
  labels: [metrics.username],
  datasets: [
    {
      label: "Número de seguidores de los seguidores",
      data: [metrics.seguidoreswonk],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'
      ],
      borderWidth: 4
    }
  ]
});

//Tasa de Tweets por día
setDataCharttwday({
  labels: [metrics.username],
  datasets: [
    {
      label: "Tasa de Tweets por día %",
      data: [metrics.tweet_day],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'
      ],
      borderWidth: 4
    }
  ]
});

//TFF
setDataChartTFF({
  labels: [metrics.username],
  datasets: [
    {
      label: "TFF",
      data: [metrics.tff],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'
      ],
      borderWidth: 4
    }
  ]
});

//Ratio de Retweets por tweet
setDataChartrt_rate({
  labels: [metrics.username],
  datasets: [
    {
      label: "Ratio de Retweets por tweet %",
      data: [metrics.rt_rate],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'
      ],
      borderWidth: 4
    }
  ]
});

//Compromiso por tweet
setDataChartrt_eng({
  labels: [metrics.username],
  datasets: [
    {
      label: "Compromiso por tweet",
      data: [metrics.engagement_rate],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'
      ],
      borderWidth: 4
    }
  ]
});

//Tasa de participación
setDataChartrt_parti({
      labels: [metrics.username],
      datasets: [
        {
          label: "Tasa de participación %",
          data: [metrics.participation_rate],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'
          ],
          borderWidth: 4
        }
      ]
 });

  const csvData2 = [
  ['Usuario', 'seguidores', 'seguidoreswonk','Tasa de Tweets por día','TFF','Ratio de Retweets por tweet','Compromiso por tweet','Tasa de participación'],
  [metrics.username,metrics.seguidores,metrics.seguidoreswonk,metrics.tweet_day,metrics.tff,metrics.rt_rate,metrics.engagement_rate,metrics.participation_rate]
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
      text: 'Número de seguidores',
    },
  },
};

const optionswonk = {
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
      text: 'Número de seguidores de los seguidores',
    },
  },
};


const optionstwday = {
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
      text: 'Tasa de Tweets por día %',
    },
  },
};

const optionsTFF = {
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
      text: 'TFF',
    },
  },
};





const optionsrt_rate = {
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
      text: 'Ratio de Retweets por tweet %',
    },
  },
};

const optionsrt_eng = {
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
      text: 'Compromiso por tweet',
    },
  },
};

const optionsrt_parti = {
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
      text: 'Tasa de participación %',
    },
  },
};


console.log('datachart' +dataChart.datasets);


if (comparar == 1) {
  return(
 
  <> 
  <CardTitle tag="left"><Alert color="white"><strong>Comparativa de las cuentas de Twitter @{user_name1} - @{user_name2} para las fechas {startDate} - {endDate} </strong></Alert> </CardTitle>
  <CSVLink data={csvData} filename="datos.csv"><Button outline color="success" >Descargar csv</Button></CSVLink> 

  <Table>
      <tbody>
        <Row>
            <Col>
              <Bar data={dataChart} options={options} />
            </Col>
            <Col>
              <Bar data={dataChartwonk} options={optionswonk} /> 
            </Col>
            
        </Row>
        <Row>
            <Col>
              <Bar data={dataCharttwday} options={optionstwday} />
            </Col>
            <Col>
              <Bar data={dataChartTFF} options={optionsTFF} /> 
            </Col>
        </Row>

        <Row>
            <Col>
              <Bar data={dataChartrt_rate} options={optionsrt_rate} />
            </Col>
            <Col>
              <Bar data={dataChartrt_eng} options={optionsrt_eng} /> 
            </Col>
        </Row>

        <Row>
            <Col>
              <Bar data={dataChartrt_parti} options={optionsrt_parti} />
            </Col>
            <Col>
            </Col>
        </Row>
      </tbody>

  </Table>
</>
  

  );

}

if (comparar == 2) {
  return(
 
  <> 
  <CardTitle tag="left"><Alert color="white"><strong>Comparativa de las cuentas de Twitter @{user_name1} - @{user_name2} - @{user_name3} para las fechas {startDate} - {endDate} </strong></Alert> </CardTitle>
  <CSVLink data={csvData} filename="datos.csv"><Button outline color="success" >Descargar csv</Button></CSVLink> 

  <Table>
      <tbody>
        <Row>
            <Col>
              <Bar data={dataChart} options={options} />
            </Col>
            <Col>
              <Bar data={dataChartwonk} options={optionswonk} /> 
            </Col>
            
        </Row>
        <Row>
            <Col>
              <Bar data={dataCharttwday} options={optionstwday} />
            </Col>
            <Col>
              <Bar data={dataChartTFF} options={optionsTFF} /> 
            </Col>
        </Row>

        <Row>
            <Col>
              <Bar data={dataChartrt_rate} options={optionsrt_rate} />
            </Col>
            <Col>
              <Bar data={dataChartrt_eng} options={optionsrt_eng} /> 
            </Col>
        </Row>

        <Row>
            <Col>
              <Bar data={dataChartrt_parti} options={optionsrt_parti} />
            </Col>
            <Col>
            </Col>
        </Row>
      </tbody>

  </Table>
</>
  

  );

}

else {
  return(
    <> 
    <CardTitle tag="left"><Alert color="white"><strong>Análisis de la cuenta de Twitter @{user_name1} para las fechas {startDate} - {endDate} </strong></Alert> </CardTitle>
    <CSVLink data={csvData} filename="datos.csv"><Button outline color="success" >Descargar csv</Button></CSVLink> 

    <Table>
        <tbody>
          <Row>
              <Col>
                <Bar data={dataChart} options={options} />
              </Col>
              <Col>
                <Bar data={dataChartwonk} options={optionswonk} /> 
              </Col>
              
          </Row>
          <Row>
              <Col>
                <Bar data={dataCharttwday} options={optionstwday} />
              </Col>
              <Col>
                <Bar data={dataChartTFF} options={optionsTFF} /> 
              </Col>
          </Row>
  
          <Row>
              <Col>
                <Bar data={dataChartrt_rate} options={optionsrt_rate} />
              </Col>
              <Col>
                <Bar data={dataChartrt_eng} options={optionsrt_eng} /> 
              </Col>
          </Row>
  
          <Row>
              <Col>
                <Bar data={dataChartrt_parti} options={optionsrt_parti} />
              </Col>
              <Col>
              </Col>
          </Row>
        </tbody>
  
    </Table>
  </> 
  
  
  
  );


}



}