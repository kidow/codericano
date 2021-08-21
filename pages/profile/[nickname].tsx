import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from 'services'
import { IUser } from 'types'

interface State {}

const ProfileNicknamePage = () => {
  const { query } = useRouter()
  const getProfile = async () => {
    const { data, error } = await supabase
      .from<IUser>('users')
      .select(
        `
        id,
        nickname,
        avatar_url,
        email,
        posts (id)
      `
      )
      .match({ nickname: query.nickname })
    if (error) {
      console.error(error)
      return
    }
    console.log('data', data)
  }
  useEffect(() => {
    getProfile()
  }, [])
  return <>ProfileNicknamePage</>
}

export default ProfileNicknamePage
