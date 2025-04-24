import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  PropsWithChildren,
  ComponentType
} from 'react'
import { NonNullableFields } from '@/shared/type'

type ShareLibType = typeof import('react-share')

interface ShareMediaPayload {
  ShareLib: ShareLibType | null
  isLoaded: boolean
}

const ShareMediaContext = createContext<ShareMediaPayload>({
  ShareLib: null,
  isLoaded: false
})

const getAsyncShareLib = async () => {
  return import('react-share')
}
const ShareSocialMediaProvider = ({ children }: PropsWithChildren) => {
  const ShareRef = useRef<ShareLibType | null>(null)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getAsyncShareLib()
      .then((shareLib) => {
        ShareRef.current = shareLib
        setLoaded(true)
      })
  }, [])

  const value = useMemo(() => ({
    ShareLib: ShareRef.current,
    isLoaded,
  }), [isLoaded])

  return (
    <ShareMediaContext.Provider value={value}>
      {children}
    </ShareMediaContext.Provider>
  )
}

const withShareProvider = <P extends Object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
  return (
    <ShareSocialMediaProvider>
      <WrappedComponent {...props}/>
    </ShareSocialMediaProvider>
  )
}

export const useShareLib  = () => {
  return useContext(ShareMediaContext) as NonNullableFields<ShareMediaPayload>
}

const withShareLibLoaded = <P extends Object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const { isLoaded } = useShareLib()
    if(!isLoaded) return

    return <WrappedComponent {...props}/>
  }
}

export const withShareLib = <P extends Object>(WrappedComponent: ComponentType<P>) => {
  return withShareProvider(withShareLibLoaded(WrappedComponent))
}