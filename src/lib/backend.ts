export const isBackendAvailable = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  return Boolean(url && key);
};

export const getBackendClient = async () => {
  if (!isBackendAvailable()) return null;
  try {
    const mod = await import("@/integrations/supabase/client");
    return mod.supabase;
  } catch (e) {
    // If the backend client can't be loaded (transient env/build issues),
    // allow the UI to render without crashing.
    console.error("Failed to load backend client", e);
    return null;
  }
};
