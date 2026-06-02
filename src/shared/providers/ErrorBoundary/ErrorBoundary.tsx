import { Component, ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error) => ReactNode)
}

interface ErrorBoundaryState {
  hasError: boolean
  error: null | Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line  no-console
    console.log(error, errorInfo)
  }

  render() {
    const { hasError, error } = this.state
    const { children, fallback } = this.props

    if (hasError && error) {
      if (typeof fallback === 'function') {
        return fallback(error)
      }

      return fallback ?? (
        <div>
          {/* TODO: add Error Page */}
          <p>Seems like an error occured!</p>
          <p>{error?.message}</p>
        </div>
      );
    }
    return children;
  }
}