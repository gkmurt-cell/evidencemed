export const isBackendAvailable = () => {
  return true; // Always available with localStorage-based auth
};

export const getBackendClient = async () => {
  return null; // No Supabase, using localStorage auth
};
