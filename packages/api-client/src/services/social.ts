import { supabase } from '../supabase';

export const SocialService = {
  async getFeed(limit = 20, offset = 0) {
    const { data, error } = await supabase.from('posts').select('*, profiles(username, display_name, avatar_url, vip_tier)').eq('is_hidden', false).order('created_at', { ascending: false }).range(offset, offset + limit - 1);
    return { posts: data, error };
  },
  async createPost(params: { content: string; type?: string; image_url?: string; bet_id?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data, error } = await supabase.from('posts').insert({ user_id: user.id, type: params.type || 'text', ...params }).select('*, profiles(username, display_name, avatar_url)').single();
    return { post: data, error };
  },
  async toggleLike(postId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data: existing } = await supabase.from('post_likes').select('id').eq('post_id', postId).eq('user_id', user.id).single();
    if (existing) { await supabase.from('post_likes').delete().eq('id', existing.id); return { liked: false }; }
    else { await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id }); return { liked: true }; }
  },
  async addComment(postId: string, content: string, parentId?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data, error } = await supabase.from('post_comments').insert({ post_id: postId, user_id: user.id, content, parent_comment_id: parentId }).select('*, profiles(username, display_name, avatar_url)').single();
    return { comment: data, error };
  },
  async toggleFollow(targetUserId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated' };
    const { data: existing } = await supabase.from('follows').select('id').eq('follower_id', user.id).eq('following_id', targetUserId).single();
    if (existing) { await supabase.from('follows').delete().eq('id', existing.id); return { following: false }; }
    else { await supabase.from('follows').insert({ follower_id: user.id, following_id: targetUserId }); return { following: true }; }
  },
  async getUserProfile(userId: string) {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
    const { count: followers } = await supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', userId);
    const { count: following } = await supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', userId);
    return { profile, followers: followers || 0, following: following || 0 };
  },
};
