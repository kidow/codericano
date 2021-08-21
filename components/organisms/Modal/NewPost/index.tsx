import { FunctionComponent, useEffect } from 'react'
import {
  ReModal,
  ReMarkdownEditor,
  ReSwitch,
  ReButtonGroup,
  ReButton
} from 'components'
import { IModal, TCategory } from 'types'
import { supabase, useObject, useAuth } from 'services'
import { XIcon } from '@heroicons/react/solid'
import { ReactMdeProps } from 'react-mde'
import { IPost } from 'types'

interface Props extends IModal {}
interface State {
  markdown: string
  selectedTab: ReactMdeProps['selectedTab']
  isPrivate: boolean
  category: string
  isLengthMorethan280: boolean
  isLoading: boolean
}

const ReNewPostModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const [
    {
      markdown,
      selectedTab,
      isPrivate,
      category,
      isLengthMorethan280,
      isLoading
    },
    setState
  ] = useObject<State>({
    markdown: '',
    selectedTab: 'write',
    isPrivate: false,
    category: '팁',
    isLengthMorethan280: false,
    isLoading: false
  })
  const { account } = useAuth()
  const handleClose = () => {
    if (!confirm('작성을 중단하겠습니까?')) return
    onClose()
  }
  const onSubmit = async () => {
    if (!account) return
    if (!markdown.length) return
    if (isLengthMorethan280) return
    if (isLoading) return

    let Category: TCategory = 'tip'
    switch (category) {
      case '팁':
        Category = 'tip'
        break
      case '질문':
        Category = 'question'
        break
      default:
        Category = 'tip'
    }
    setState({ isLoading: true })
    const { data, error } = await supabase.from<IPost>('posts').insert({
      markdown,
      category: Category,
      is_private: isPrivate,
      user_id: account.id
    })
    if (error) {
      console.error(error)
      setState({ isLoading: false })
      return
    }
    console.log('data', data)
    onClose()
  }
  useEffect(() => {
    if (markdown.length > 280 && !isLengthMorethan280)
      setState({ isLengthMorethan280: true })
    else if (markdown.length <= 280 && isLengthMorethan280)
      setState({ isLengthMorethan280: false })
  }, [markdown])
  return (
    <ReModal isOpen={isOpen} maxWidth="max-w-2xl" onClose={() => {}}>
      <div className="bg-dark relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 rounded-full hover:bg-gray-300"
        >
          <XIcon className="h-6 w-6 text-gray-100 cursor-pointer hover:text-dark" />
        </button>
        <div className="px-4 py-5">
          <h1 className="text-gray-100 font-semibold text-2xl">새 글</h1>
          {isLengthMorethan280 && (
            <p className="text-sm text-red-600">
              280자 이하만 작성할 수 있습니다.
            </p>
          )}
        </div>
        <div className="ml-4">
          <ReButtonGroup
            list={['팁', '질문']}
            value={category}
            onChange={(category) => setState({ category })}
          />
        </div>
        <ReMarkdownEditor
          onChange={(markdown) => setState({ markdown })}
          selectedTab={selectedTab}
          onTabChange={(selectedTab) => setState({ selectedTab })}
          value={markdown}
        />
        <div className="text-right py-2 px-2 flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-2">
            <ReSwitch
              checked={isPrivate}
              onChange={(isPrivate) => setState({ isPrivate })}
            />
            <span className="text-gray-100 text-sm">비공개</span>
          </div>
          <ReButton isLoading={isLoading} onClick={onSubmit}>
            작성
          </ReButton>
        </div>
      </div>
    </ReModal>
  )
}

export default ReNewPostModal
