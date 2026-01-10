<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">
      Check Domain Ranking
    </h2>

    <!-- search bar -->
    <div class="flex flex-col sm:flex-row gap-4">
      <input
        v-model="domain"
        type="text"
        placeholder="Enter domain (e.g. yourname.com)"
        class="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        @keyup.enter="search"
      />
      <button
        @click="search"
        :disabled="loading"
        class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        {{ loading ? "Searching..." : "Search" }}
      </button>
    </div>
    <!-- loader -->
    <div v-if="loading" class="mt-4 text-gray-600">
      Fetching domain ranking now.......
    </div>

    <!-- result text area -->
    <div v-if="resultDomain" class="mt-4 text-sm text-gray-700">
      Latest rank for
      <span class="font-semibold text-gray-900">{{ resultDomain }}</span
      >:
      <span class="font-bold text-green-600">{{ resultRank ?? "N/A" }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  loading: boolean;
  resultDomain: string | null;
  resultRank: number | null;
}>();

const domain = ref("");
const emit = defineEmits<{ (e: "search", domain: string): void }>();

const search = () => {
  if (!domain.value) {
    return;
  }

  emit("search", domain.value);
};
</script>
