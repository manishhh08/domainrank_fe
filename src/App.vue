<template>
  <div class="min-h-screen bg-gray-100">
    <Header />

    <main class="max-w-3xl mx-auto px-4 mt-12">
      <h1 class="text-2xl font-bold text-center mb-5">
        Welcome to the domain ranking checker. We show the latest ranking of
        popular domains in the world.
      </h1>

      <DomainSearch
        :loading="loading"
        :result-domain="resultDomain"
        :result-rank="resultRank"
        @search="handleSearch"
      />

      <DomainChart :labels="chartLabels" :data="chartData" />
      <!-- <DomainChart /> -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/Header.vue";
import DomainSearch from "./components/DomainSearch.vue";
import DomainChart from "./components/DomainChart.vue";
import { useDomain } from "./services/useDomain";
import { DomainResult } from "./types/domain";

const resultDomain = ref<string | null>(null);
const resultRank = ref<number | null>(null);
const loading = ref(false);

const { fetchMultipleDomain, error } = useDomain();

const handleSearch = async (domain: string) => {
  loading.value = true;
  resultDomain.value = null;
  resultRank.value = null;

  try {
    const results: DomainResult[] = await fetchMultipleDomain([domain]);
    if (results.length) {
      resultDomain.value = results[0].domain;
      resultRank.value = results[0].rank;
    } else {
      resultDomain.value = domain;
      resultRank.value = null;
    }
  } catch (error) {
    console.log(error);

    resultDomain.value = domain;
    resultRank.value = null;
  } finally {
    loading.value = false;
  }
};
const chartLabels = ref<string[]>([]);
const chartData = ref<number[]>([]);
</script>
