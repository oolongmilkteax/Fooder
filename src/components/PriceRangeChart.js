import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props:['data'],
  data: function () {
    return {
        datacollection: {
            labels: ["less than $20", "$20 to $50", "$50 to $100", "$100 to $150", "$150 to $200","$200 to $300","above $300"],
            datasets: [{
                label: "Price Range of the Restaurants your favourite and Contribute",
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                data: this.data,
              }]
        },
        options: {
            title: {
              display: true,
              text: 'Price Range of the Restaurants your favourite and Contribute'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}