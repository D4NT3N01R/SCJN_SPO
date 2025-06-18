// --- API Helper for Health Check (Returns JSON) ---
export const checkServerStatusApi = async () => {
  try {
    const response = await fetch('/api/health'); // Assumes endpoint /api/health
    if (!response.ok) {
      let errorBody = `Server responded with status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorBody = errorData?.error || errorBody;
      } catch (parseError) {
        // Ignore if the error response isn't valid JSON
      }
      throw new Error(errorBody);
    }
    const data = await response.json();
    console.log("Health check data:", data); // Log for debugging

    // Ensure the expected property exists, providing a default if not
    if (typeof data.active_processes_count !== 'number') {
      console.warn("Health check response missing 'active_processes_count'. Assuming 0.");
      data.active_processes_count = 0;
    }
    return data; // Returns { status: 'ok', active_processes_count: number }
  } catch (error) {
    console.error("Health check failed:", error);
    throw error; // Re-throw for React Query to handle
  }
};