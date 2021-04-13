import { Radar } from "vue-chartjs";
export default {
  props: ["parsedData"],
  extends: Radar,
  data() {
    return {
      chartData: {
        labels: ["Cooking", "Eating out", "Traveling", "Budget"],
        datasets: [
          {
            label: "Your Preferences",
            borderWidth: 1,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            data: this.parsedData,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Your Preferences",
          fontSize: 20,
        },
        responsive: true,
        maintainAspectRatio: false,
        scale: {
          gridLines: {
            display: true,
          },
          ticks: {
            display: false,
            suggestedMin: 0,
            suggestedMax: 40,
          },
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options, this.parsedData);
  },
};
