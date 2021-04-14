import { Bar } from 'vue-chartjs'
export default {
    extends: Bar,
    props:['data'],
    data: function () {
      return {
          datacollection: {
              labels: ["Recipes Contributed", "Recipes Favourited", "Restaurants Contributed", "Restaurants Favourites"],
              datasets: [{
                  label: "Dishes Ordered",
                  backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(75, 192, 192, 0.2)'],
                  data: this.data,
                }]
          },
          options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Cumulative Recipes and Restaurants Contributed and Favourited'
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
          }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options,this.dishesOrdered);
    }
  }