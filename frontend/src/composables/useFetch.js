// src/composables/useFetch.js
import { ref } from "vue";
import api from "@/services/api";

export function useFetch() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const abortController = ref(null);

  const execute = async (url, options = {}) => {
    loading.value = true;
    error.value = null;
    data.value = null;

    // Create abort controller for cancellation
    abortController.value = new AbortController();

    try {
      const response = await api({
        url,
        signal: abortController.value.signal,
        ...options,
      });

      data.value = response.data;
      return response.data;
    } catch (err) {
      if (err.name === "CanceledError") {
        console.log("Request canceled");
        return null;
      }

      error.value =
        err.response?.data?.error || err.message || "An error occurred";

      // Retry logic (1 attempt)
      if (options.retry !== false && !err.response) {
        console.log("Retrying request...");
        try {
          const retryResponse = await api({
            url,
            ...options,
          });
          data.value = retryResponse.data;
          error.value = null;
          return retryResponse.data;
        } catch (retryErr) {
          error.value =
            retryErr.response?.data?.error ||
            retryErr.message ||
            "Retry failed";
          throw retryErr;
        }
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  const cancel = () => {
    if (abortController.value) {
      abortController.value.abort();
    }
  };

  return {
    data,
    loading,
    error,
    execute,
    cancel,
  };
}
