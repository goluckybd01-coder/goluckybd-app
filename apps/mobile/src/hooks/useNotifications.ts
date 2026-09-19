import { useState, useEffect } from 'react';
import { NotificationService } from '@goluckybd/api-client';
import { useAuth } from '../contexts/AuthContext';

export function useNotifications() {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
    const channel = user ? NotificationService.subscribeToNotifications(user.id, (payload) => {
      setNotifications(prev => [payload.new, ...prev]);
      setUnreadCount(prev => prev + 1);
    }) : null;
    return () => { channel?.unsubscribe(); };
  }, [isAuthenticated]);

  const fetchData = async () => {
    const [{ notifications: n }, { count }] = await Promise.all([
      NotificationService.getNotifications(),
      NotificationService.getUnreadCount()
    ]);
    setNotifications(n || []); setUnreadCount(count); setLoading(false);
  };

  const markRead = async (id: string) => {
    await NotificationService.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllRead = async () => {
    await NotificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  return { notifications, unreadCount, loading, markRead, markAllRead, refetch: fetchData };
}
