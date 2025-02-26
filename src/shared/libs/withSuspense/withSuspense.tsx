import { ComponentType, Suspense } from 'react'
export const withSuspense = <P extends object>(WrappedComp: ComponentType<P>) => (props: P) => {
  return (
    <Suspense>
      <WrappedComp {...props} />
    </Suspense>
  )
}