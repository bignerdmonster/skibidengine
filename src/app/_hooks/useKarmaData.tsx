import useSWR from 'swr';

// Define the type of the data being fetched
type KarmaData = Record<number, boolean> | null;

// Fetcher function with a proper return type
const fetchKarmaData = async (): Promise<KarmaData> => {
  const response = await fetch('/api/karmaThang');
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const data: KarmaData = await response.json() as KarmaData; // Ensure this matches the KarmaData type
  return data
};

// Custom hook to fetch and cache karma data
export const useKarmaData = () => {
  // Use SWR with properly typed fetcher and return type
  const { data, error, mutate } = useSWR<KarmaData, Error>('/api/karma', fetchKarmaData);

  // Return the data, error, and mutate function
  return {
    data,
    error,
    mutate,
  };
};