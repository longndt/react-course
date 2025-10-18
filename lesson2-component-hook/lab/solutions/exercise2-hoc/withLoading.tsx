import { ComponentType } from "react";
import LoadingSpinner from "./LoadingSpinner";

// HOC props interface
interface WithLoadingProps {
  isLoading: boolean;
}

// Generic HOC function
function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithLoadingProps> {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...(rest as P)} />;
  };
}

export default withLoading;
