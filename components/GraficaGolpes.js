import React from 'react';  
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale) 



const GraficaGolpes = ({datos}) => {

 
    const data = {
      labels: datos.arr_grafica_fecha, 
      datasets: [{
        label: 'Golpes por intento',
        data: datos.arr_grafica_golpes,
        backgroundColor: [ 
          'rgba(75, 192, 192, 0.2)' 
        ],
        borderColor: [ 
          'rgba(75, 192, 192, 1)' 
        ],
        borderWidth: 1
      }]
    }
    
  //   and finally lets return a chart component with our api data and
  //   config
  return (
    <div className="chart-container w-full h-full p-2">
      <Bar
              data={data} 
              height={250}
              options={{
                maintainAspectRatio: true
              }}
            />
    </div>
  );
};


 
export default GraficaGolpes;