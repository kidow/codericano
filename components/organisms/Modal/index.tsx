import { FunctionComponent } from 'react'
import { IModal, TMaxWidth } from 'types'

interface Props extends IModal {
  maxWidth?: TMaxWidth
}
interface State {}

const ReModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-lg'
}) => {
  if (!isOpen) return null
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black opacity-90 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:${maxWidth} sm:w-full`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default ReModal
