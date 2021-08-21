import { Menu, Transition } from '@headlessui/react'
import { ReLoginModal, ReNewPostModal } from 'components'
import { useCallback, FunctionComponent, Fragment } from 'react'
import { supabase, useObject, useAuth } from 'services'
import Link from 'next/link'
import { PencilIcon } from '@heroicons/react/solid'

interface Props {}
interface State {
  isOpen: boolean
}

const ReHeader: FunctionComponent<Props> = () => {
  const [{ isOpen }, setState] = useObject<State>({ isOpen: false })
  const { account, resetAccount } = useAuth()
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
      return
    }
    resetAccount()
  }
  const onClose = useCallback(() => {
    setState({ isOpen: false })
  }, [])
  return (
    <>
      <div className="sticky top-0 bg-dark">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between h-14 px-4 sm:px-0">
            <div>codericano</div>
            <div className="flex flex-wrap gap-5 items-center">
              <button
                className="text-gray-100 flex items-center justify-center cursor-pointer w-7 h-7 rounded-full hover:bg-gray-100 hover:text-dark"
                onClick={() => setState({ isOpen: true })}
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              {!!account && (
                <Menu as="div" className="relative flex">
                  <Menu.Button className="h-10 w-10 rounded-full shadow-md">
                    <img src={account.user_metadata.avatar_url} alt="user" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 top-10 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        className="text-gray-300 border border-gray-700 rounded py-1"
                        style={{ background: '#1c2128' }}
                      >
                        <div className="py-1 text-sm font-semibold pr-2 pl-4">
                          @{account.user_metadata.user_name}
                        </div>
                        <div className="border-t my-2 border-gray-800" />
                        <Link href="/profile">
                          <a className="py-1 text-sm pr-2 pl-4 hover:bg-blue-600 block">
                            내 프로필
                          </a>
                        </Link>
                        <div className="border-t my-2 border-gray-800" />
                        <div
                          onClick={onLogout}
                          className="cursor-pointer text-sm pr-2 pl-4 py-1 hover:bg-blue-600"
                        >
                          로그아웃
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
        </div>
      </div>
      {!!account ? (
        <ReNewPostModal isOpen={isOpen} onClose={onClose} />
      ) : (
        <ReLoginModal isOpen={isOpen} onClose={onClose} />
      )}
    </>
  )
}

export default ReHeader
