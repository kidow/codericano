import { ReHeader, RePost, ReSEO } from 'components'
import { FunctionComponent, useEffect } from 'react'
import { supabase, useObject } from 'services'
import { TPost } from 'types'

interface Props {}
interface State {
  isLoading: boolean
  posts: TPost[]
}

const HomePage: FunctionComponent<Props> = () => {
  const [{ isLoading, posts }, setState] = useObject<State>({
    isLoading: true,
    posts: []
  })
  const getPosts = async () => {
    const { data, error } = await supabase
      .from<TPost>('posts')
      .select(
        `
      id,
      markdown,
      is_private,
      category,
      created_at, 
      updated_at,
      comments(id, content, created_at, updated_at, user:user_id(id, nickname, avatar_url), comment_likes(id)),
      post_likes(id),
      user:user_id(id, nickname, avatar_url)
    `
      )
      .limit(4)
      .order('created_at', { ascending: false })
    if (error) {
      console.log('error', error)
      return
    }
    console.log('data', data)
    setState({ posts: data || [] })
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <>
      <ReSEO />
      <div>
        <ReHeader />
        <div className="min-h-screen">
          <div className="max-w-6xl mx-auto py-6">
            <div className="flex flex-wrap gap-4">
              <div className="hidden sm:block sm:w-52">
                <div className="sticky top-20">left</div>
              </div>
              <main className="flex-1 flex flex-col gap-y-4">
                {posts.map((post) => (
                  <RePost key={post.id} {...post} />
                ))}
              </main>
              <div className="hidden sm:block sm:w-52">
                <div className="sticky top-20">right</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
