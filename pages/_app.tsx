import 'styles/globals.css'
import App from 'next/app'
import { ErrorInfo } from 'react'
import { ReAuth } from 'components'
import { RecoilRoot } from 'recoil'
import 'dayjs/locale/ko'

interface Props {}
interface State {
  hasError: boolean
}

class MyApp extends App<Props, {}, State> {
  state = {
    hasError: false
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error) this.setState({ hasError: true })
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    const {} = this.state
    const { Component, pageProps } = this.props
    return (
      <RecoilRoot>
        <ReAuth>
          <Component {...pageProps} />
        </ReAuth>
      </RecoilRoot>
    )
  }
}

export default MyApp
