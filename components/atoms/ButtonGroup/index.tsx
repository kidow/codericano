import { FunctionComponent } from 'react'

interface Props {
  value: string
  list: string[]
  onChange: (name: string) => void
}
interface State {}

const ReButtonGroup: FunctionComponent<Props> = ({ list, onChange, value }) => {
  return (
    <div className="inline-block rounded-lg" role="group">
      {list.map((item, i) => (
        <button
          key={i}
          onClick={() => onChange(item)}
          className={`${
            value === item
              ? 'bg-blue-800 text-gray-100'
              : 'bg-black text-gray-600 hover:bg-blue-900 hover:text-white'
          } px-3 py-1 outline-none focus:shadow-outline`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default ReButtonGroup
