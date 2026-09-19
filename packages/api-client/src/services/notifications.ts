import { supabase } from '../supabase';

export const NotificationService = {
  async getNotifications(limit = 30) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { notifications: null, error: 'Not authenticated' };
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(limit);
    return { notifications: data, error };
  },
  async getUnreadCount() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { count: 0 };
    const { count } = await supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('is_read', false);
    return { count: count || 0 };
  },
  async markAsRead(notificationId: string) {
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
    return { error };
  },
  async markAllAsRead() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false);
    return { error };
  },
  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    return supabase.channel(`notifications-${userId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, callback).subscribe();
  },
};
