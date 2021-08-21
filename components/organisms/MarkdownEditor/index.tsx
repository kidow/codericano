import { FunctionComponent } from 'react'
import Showdown from 'showdown'
import ReactMde, { ReactMdeProps } from 'react-mde'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

interface Props extends Omit<ReactMdeProps, 'generateMarkdownPreview'> {}
interface State {}

const ReMarkdownEditor: FunctionComponent<Props> = ({ ...props }) => {
  return (
    <ReactMde
      {...props}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
  )
}

export default ReMarkdownEditor
