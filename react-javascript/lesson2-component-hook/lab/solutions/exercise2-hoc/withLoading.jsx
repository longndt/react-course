import PropTypes from 'prop-types';
import LoadingSpinner from "./LoadingSpinner";

// HOC function
function withLoading(WrappedComponent) {
  function WithLoadingComponent(props) {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...rest} />;
  }

  WithLoadingComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  return WithLoadingComponent;
}

export default withLoading;
