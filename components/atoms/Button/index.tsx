import { FunctionComponent } from 'react'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean
}
interface State {}

const SpinIcon = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

const ReButton: FunctionComponent<Props> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`${
        isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
      } inline-flex items-center rounded-md py-2 px-4 hover:opacity-95 bg-blue-600 text-gray-100 text-sm font-medium`}
    >
      {isLoading && <SpinIcon />}
      {children}
    </button>
  )
}

export default ReButton
