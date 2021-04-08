import {Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props:['data'],
  data: function () {
    return {
        datacollection: {
            labels: ["Easy", "Medium", "Hard"],
            datasets: [{
                label: "Difficulty",
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                ],
                data: this.data,
              }]
        },
        options: {
            title: {
              display: true,
              text: 'Difficulty of the recipes you have favourited'
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