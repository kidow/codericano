import { FunctionComponent } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { baseURL } from 'services'

export interface Props {
  title?: string
  description?: string
  image?: string
  ldJson?: any
  noSEO?: boolean
  keyword?: string
}

const ReSEO: FunctionComponent<Props> = ({
  title,
  description = 'code tips & questions',
  image = '',
  ldJson,
  noSEO = false
}) => {
  const { asPath } = useRouter()
  const TITLE = title ? `${title} - 코드리카노` : '코드리카노'
  const URL = baseURL + decodeURI(asPath)
  if (ldJson) ldJson['@context'] = 'https://schema.org'
  if (noSEO)
    return (
      <Head>
        <title>{TITLE}</title>
      </Head>
    )
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="codericano" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={image} />
      <meta property="twitter:title" content={TITLE} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:domain" content={URL} />
      {ldJson && (
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      )}
    </Head>
  )
}

export default ReSEO
