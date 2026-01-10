import { ref } from "vue";
import { DomainResult } from "../types/domain";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export function useDomain() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchMultipleDomain = async (
    domain: string[]
  ): Promise<DomainResult[]> => {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(`${API_URL}/domains/multiple`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domains: domain }),
      });

      if (!res.ok) {
        throw new Error(`Server error:%{res.status} ${res.statusText}`);
      }
      const data: DomainResult[] = await res.json();
      return data;
    } catch (error: any) {
      error.value = error.message || "An unknown error occured";
      return [];
    } finally {
      loading.value = false;
    }
  };

  return { fetchMultipleDomain, loading, error };
}
