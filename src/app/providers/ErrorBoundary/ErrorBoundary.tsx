import { Component, ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error) => ReactNode)
}

interface ErrorBoundaryState {
  hasError: boolean
  error: null | Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  private handleError = (event: ErrorEvent) => {
    this.setState({
      hasError: true,
      error: event.error instanceof Error ? event.error : new Error(String(event.error))
    })
  }

  private handlePromiseRejection = (event: PromiseRejectionEvent) => {
    this.setState({
      hasError: true,
      error: event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    })
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // log the error to an error reporting service
    // eslint-disable-next-line  no-console
    console.log(error, errorInfo)
  }

  componentDidMount() {
    window.addEventListener('error', this.handleError)
    window.addEventListener('unhandledrejection', this.handlePromiseRejection)
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleError)
    window.removeEventListener('unhandledrejection', this.handlePromiseRejection)
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

export default ErrorBoundary