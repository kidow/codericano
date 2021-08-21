import { FunctionComponent } from 'react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import {
  AnnotationIcon,
  ArrowSmUpIcon,
  ShareIcon,
  StarIcon
} from '@heroicons/react/solid'
import { IPostLike, IPostPostLike, TPost } from 'types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/router'
import { supabase, useObject, useAuth } from 'services'
import 'dayjs/locale/ko'
import Showdown from 'showdown'
dayjs.extend(relativeTime)

interface Props extends TPost {}
interface State {
  isCommentsOpen: boolean
  isLiked: boolean
  likeCount: number
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})
converter.setFlavor('github')

const RePost: FunctionComponent<Props> = ({
  user = {},
  created_at,
  id,
  post_likes = [],
  markdown,
  comments = []
}) => {
  const [{ isCommentsOpen, isLiked, likeCount }, setState] = useObject<State>({
    isCommentsOpen: false,
    isLiked: false,
    likeCount: post_likes.length
  })
  const { account } = useAuth()
  const { push } = useRouter()
  const onPostLike = async (postId: string) => {
    if (!account) return

    const isExisted = await supabase
      .from<IPostPostLike>('post_post_like')
      .select()
      .match({ user_id: account.id, post_id: postId })
      .single()

    if (isExisted.data) {
      const remove = await supabase
        .from<IPostLike>('post_likes')
        .delete()
        .match({ id: isExisted.data.post_likes_id })
      if (remove.error) {
        console.error(remove.error)
        return
      }
      setState({ likeCount: likeCount - 1 })
    } else {
      const insert = await supabase
        .from<IPostLike>('post_likes')
        .insert({ user_id: account.id })
        .single()
      if (insert.error) {
        console.error(insert.error)
        return
      }
      await supabase
        .from<IPostPostLike>('post_post_like')
        .insert({ post_id: postId, post_likes_id: insert.data.id })
      setState({ likeCount: likeCount + 1 })
    }
  }
  return (
    <div className="border-gray-750 border-t border-b sm:border sm:rounded-sm text-gray-100">
      <div className="flex bg-dark items-stretch">
        <div className="flex flex-1 items-center p-2">
          <img
            src={user.avatar_url}
            className="h-10 w-10 rounded-full cursor-pointer mr-4"
            alt="author"
            onClick={() => push(`/profile/${user.nickname}`)}
          />

          <div className="flex-1">
            <Link href="/profile/[nickname]" as={`/profile/${user.nickname}`}>
              <a className="cursor-pointer hover:text-blue-400 hover:underline">
                {user.nickname}
              </a>
            </Link>
            <div className="text-gray-400 text-sm">
              {dayjs(created_at).fromNow()}
            </div>
          </div>

          <div className="mr-2">
            <DotsVerticalIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
          </div>
        </div>
        <div className="w-20 border-l border-gray-800">
          <div
            onClick={() => onPostLike(id)}
            className="flex items-center justify-center text-lg hover:bg-blue-600 h-full cursor-pointer"
          >
            <span>{likeCount}</span>
            <button>
              <ArrowSmUpIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div
          className="mb-6 markdown_preview"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(markdown)
          }}
        />
        <div className="flex justify-between items-center">
          <div
            onClick={() => setState({ isCommentsOpen: !isCommentsOpen })}
            className="text-gray-500 flex flex-1 cursor-pointer items-center"
          >
            <AnnotationIcon className="w-5 h-5 mr-1 hover:text-gray-100" />
            <span>{comments.length}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <StarIcon className="w-5 h-5 mr-1 cursor-pointer hover:text-gray-100" />
            <ShareIcon className="w-5 h-5 cursor-pointer hover:text-gray-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RePost
