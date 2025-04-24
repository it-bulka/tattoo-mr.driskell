import {
  createContext,
  useRef,
  useState,
  useEffect,
  useMemo,
  PropsWithChildren,
  ComponentType,
  useContext
} from 'react'

type FramerMotionType = typeof import('framer-motion')

interface FramerMotionContextPayload {
  Motion: FramerMotionType | null
  isLoaded: boolean
}


const FramerMotionContext = createContext<FramerMotionContextPayload>({
  Motion: null,
  isLoaded: false,
})

const getAsyncFramerMotionModules = async () => {
  return import('framer-motion')
}

const FramerMotionProvider = ({ children }: PropsWithChildren) => {
  const MotionRef = useRef<FramerMotionType | null>(null)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getAsyncFramerMotionModules().then((FramerMotion) => {
      MotionRef.current = FramerMotion
      setLoaded(true)
    })
  }, [])

  const value = useMemo(() => ({
    Motion: MotionRef.current,
    isLoaded
  }), [isLoaded])

  return (
    <FramerMotionContext.Provider value={value}>
      {children}
    </FramerMotionContext.Provider>
  )
}

export const withMotionProvider = <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
  return (
    <FramerMotionProvider>
      <WrappedComponent {...props} />
    </FramerMotionProvider>
  )
}

export const useMotionLib = () => {
  return useContext(FramerMotionContext) as Required<FramerMotionContextPayload>
}

export function withMotionLoaded<P extends Object>(WrappedComponent: ComponentType<P>) {
  return (props: P) => {
    const { isLoaded } = useMotionLib()

    if (!isLoaded) return null

    return <WrappedComponent {...props} />
  }
}

export const withMotion = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return withMotionProvider(withMotionLoaded(WrappedComponent))
}