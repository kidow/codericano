import { User } from '@supabase/supabase-js'
import { atom } from 'recoil'
import { TPost } from 'types'

export const authState = atom<User | null>({
  key: 'authState',
  default: null,
  dangerouslyAllowMutability: true
})

export const postsState = atom<TPost[]>({
  key: 'postsState',
  default: []
})
