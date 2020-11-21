import React from "react";
import { ReactComponent as Bugfix }  from  "../../bugfix.svg";
const styles = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexFlow:"column"
}
class AuthErrorBoundary extends React.Component {
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
      //logErrorToMyService(error, errorInfo);
    }
  
    render() {
        const { closeModal } = this.props;
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <div className="form-modal"  style={styles}>
                 <div
              className="close-icon"
              onClick={closeModal ? closeModal : void 0}
            >
              <span className="close_icon"></span>
            </div>
                   <div>
                      <Bugfix />
                   </div>
                   <h5 style={{textAlign:"center"}}>oops something went wrong and our engineers are working on it</h5>
                </div>)
      }
      return this.props.children; 
    }
  }


  export default AuthErrorBoundary;