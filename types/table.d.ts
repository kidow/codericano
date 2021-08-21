import { IDate, TCategory } from 'types'

export interface IPost extends IDate {
  id: string
  markdown: string
  user_id: string
  category: TCategory
  is_private: boolean
}

export interface IComment extends IDate {
  id: number
  user_id: string
  post_id: string
  content: string
}

export interface IFollow {
  id: number
  following_user_id: string
  followed_user_id: string
  created_at: string
}

export interface ITag {
  id: number
  name: string
}

export interface IUser extends IDate {
  id: string
  nickname: string
  email: string
  avatar_url: string
  provider: 'github' | string
  deleted_at: string
}

export interface IPostLike {
  id: number
  user_id: string
  created_at: string
}

export interface ICommentLike {
  id: number
  user_id: string
  created_at: string
}

export interface IUserPost {
  user_id: string
  post_id: string
}

export interface IUserComment {
  user_id: string
  comment_id: string
}

export interface IPostPostLike {
  post_id: string
  post_likes_id: number
}

export interface IPostComment {
  post_id: string
  comment_id: number
}

export interface ICommentCommentLike {
  comment_id: string
  comment_likes_id: number
}
