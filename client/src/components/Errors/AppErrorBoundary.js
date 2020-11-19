import React from "react";
import { Error } from"./Error";

export class AppErrorBoundary extends React.Component {
    constructor(props) {
        super()
       this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      // logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
                <Error 
                message={"oops something went wrong and our engineers are working on it"} 
                type="crash"
                />
        )
                
      }
      return this.props.children; 
    }
  }


 