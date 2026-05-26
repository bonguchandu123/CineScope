import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const useRecentlyViewed = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const getRecentlyViewed = async () => {
    const { data } = await api.get('/recently-viewed');
    return data.views; // Returns array of recently viewed movies
  };

  const logView = async ({ movieId, title, poster }) => {
    const { data } = await api.post('/recently-viewed', { movieId, title, poster });
    return data.views;
  };

  const clearHistory = async () => {
    const { data } = await api.delete('/recently-viewed');
    return data;
  };

  // Query to fetch history
  const historyQuery = useQuery({
    queryKey: ['recentlyViewed'],
    queryFn: getRecentlyViewed,
    enabled: isAuthenticated,
    staleTime: 1 * 60 * 1000,
  });

  // Mutation to log views
  const logViewMutation = useMutation({
    mutationFn: logView,
    onSuccess: (newViews) => {
      queryClient.setQueryData(['recentlyViewed'], newViews);
    },
  });

  // Mutation to clear history
  const clearHistoryMutation = useMutation({
    mutationFn: clearHistory,
    onSuccess: () => {
      queryClient.setQueryData(['recentlyViewed'], []);
    },
  });

  return {
    recentlyViewed: historyQuery.data || [],
    isLoading: historyQuery.isLoading,
    logView: logViewMutation.mutate,
    clearHistory: clearHistoryMutation.mutate,
    isClearing: clearHistoryMutation.isPending,
  };
};
