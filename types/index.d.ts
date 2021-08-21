export * from './table'

export interface IModal {
  isOpen: boolean
  onClose: () => void
}

export type TMaxWidth =
  | 'container'
  | 'max-w-screen-2xl'
  | 'max-w-screen-xl'
  | 'max-w-screen-lg'
  | 'max-w-screen-md'
  | 'max-w-screen-sm'
  | 'max-w-full'
  | 'max-w-7xl'
  | 'max-w-6xl'
  | 'max-w-5xl'
  | 'max-w-4xl'
  | 'max-w-3xl'
  | 'max-w-2xl'
  | 'max-w-xl'
  | 'max-w-lg'
  | 'max-w-md'
  | 'max-w-sm'
  | 'max-w-xs'

export type TCategory = 'tip' | 'question'

export interface IDate {
  created_at: string
  updated_at: string
}

export interface IItem {
  name: string
}

export type TPost = IPost & {
  user: IUser
  comments: IComment[]
  post_likes: IPostLike[]
}
