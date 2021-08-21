import { FunctionComponent, useEffect } from 'react'
import { supabase, useAuth } from 'services'
import { IUser } from 'types'

interface Props {}
interface State {}

const ReAuth: FunctionComponent<Props> = ({ children }) => {
  const { account, setAccount } = useAuth()
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && !!session && !!session.user) {
        const { id, user_metadata, email, app_metadata } = session.user
        const { data, error } = await supabase
          .from('users')
          .select()
          .match({ id })
        if (error) {
          console.log('error', error)
          return
        }
        if (!data?.length) {
          const result = await supabase.from<IUser>('users').insert({
            id: id,
            nickname: user_metadata.user_name,
            email: email,
            avatar_url: user_metadata.avatar_url,
            provider: app_metadata.provider
          })
          if (result.error) {
            console.error(error)
            return
          }
        }
        setAccount(session.user)
      }
    })
    const currentUser = supabase.auth.user()
    if (!account && !!currentUser) setAccount(currentUser)
  }, [])
  return <>{children}</>
}

export default ReAuth
