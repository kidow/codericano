import { FunctionComponent } from 'react'
import { Switch } from '@headlessui/react'

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
}
interface State {}

const ReSwitch: FunctionComponent<Props> = ({ checked, onChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${checked ? 'bg-blue-700' : 'bg-black'}
  relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  )
}

export default ReSwitch
