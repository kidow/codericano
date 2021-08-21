import { FunctionComponent } from 'react'
import { IModal } from 'types'
import { ReModal } from 'components'
import { supabase } from 'services'
import Link from 'next/link'

interface Props extends IModal {}
interface State {}

const GithubIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 14 14" aria-label="github">
      <path
        d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
        fill="currentColor"
        fillRule="nonzero"
      ></path>
    </svg>
  )
}

const ReLoginModal: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const onLogin = async () => {
    const { data, error } = await supabase.auth.signIn({ provider: 'github' })
    if (error) {
      console.error(error)
      return
    }
    console.log(data)
  }
  return (
    <ReModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="bg-dark">
        <div className="flex flex-col justify-center h-96 text-gray-300 text-center relative">
          <div>Codericano</div>
          <h1 className="text-2xl font-semibold mt-6 mb-4">환영합니다.</h1>
          <p className="text-sm mb-6">
            소셜 로그인으로 빠르게 시작하실 수 있습니다.
          </p>
          <button
            onClick={onLogin}
            className="px-3 bg-black hover:opacity-70 w-80 h-12 font-medium flex items-center justify-center mx-auto rounded-lg"
          >
            <span className="mr-2">
              <GithubIcon />
            </span>
            <span>깃허브로 시작</span>
          </button>
          <Link href="/privacy">
            <a
              className="text-xs absolute bottom-5 w-full text-gray-500 hover:text-blue-500 hover:underline"
              target="_blank"
            >
              개인정보처리방침
            </a>
          </Link>
        </div>
      </div>
    </ReModal>
  )
}

export default ReLoginModal
