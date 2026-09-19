import { useState, useEffect } from 'react';
import { GameService } from '@goluckybd/api-client';

export function useGames(category?: string) {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GameService.getGames(category).then(({ games: g }) => { setGames(g || []); setLoading(false); });
  }, [category]);

  return { games, loading };
}

export function useFeaturedGames() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GameService.getFeaturedGames().then(({ games: g }) => { setGames(g || []); setLoading(false); });
  }, []);

  return { games, loading };
}
