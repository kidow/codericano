import { FunctionComponent, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { supabase } from 'services'
import { postsState } from 'store'

interface Props {}
interface State {}

const ReSubscription: FunctionComponent<Props> = ({ children }) => {
  const posts = useRecoilValue(postsState)
  const setPosts = useSetRecoilState(postsState)
  useEffect(() => {
    const postSub = supabase
      .from('posts')
      .on('*', (payload) => {
        console.log('payload', payload)
        setPosts([payload.new, ...posts])
      })
      .subscribe()
    return () => {
      supabase.removeSubscription(postSub)
    }
  }, [])
  return <>{children}</>
}

export default ReSubscription
