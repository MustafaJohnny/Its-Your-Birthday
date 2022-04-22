import { Component } from "react";

// Simple Error Boundary to handle any errors that may occur in our app.

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Somethig Went Wrong!</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
