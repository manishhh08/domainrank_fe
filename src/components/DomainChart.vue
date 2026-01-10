<template>
  <div class="mt-6 bg-white rounded-lg shadow p-6">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

const props = defineProps<{ labels: string[]; data: number[] }>();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: "line",
      data: {
        labels: props.labels,
        datasets: [
          {
            label: "Tranco Rank",
            data: props.data,
            borderColor: "#16a34a",
            backgroundColor: "rgba(16, 163, 127, 0.2)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: {
          y: {
            reverse: true,
            title: { display: true, text: "Rank" },
          },
        },
      },
    });
  }
});

watch(
  () => props.data,
  (newData) => {
    if (chartInstance) {
      chartInstance.data.datasets[0].data = newData;
      chartInstance.update();
    }
  }
);
</script>
