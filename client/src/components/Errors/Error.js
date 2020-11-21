import React from 'react'
//import PropTypes from 'prop-types'
import { ReactComponent as NotFound } from "./notfound.svg"
import { ReactComponent as Missing } from "./noproperty.svg"
import { ReactComponent as Network } from "./network.svg"
import { ReactComponent as BugFix } from "../../bugfix.svg"
import { history } from "../../helpers"

export function Error({type,message}) {
    function reload(){
        return history.go(0);
    }
    return (
        <div className="notfound">
           {type === "notfound" && (<h1>40<span className="last">4</span></h1>)}
    {type === "crash" && (<h1>:(<span className="last">{" "}Not your Fault</span></h1>)}
            <div className="image">
              {getImage()}
              <h5 className="message">{message}</h5>
              {/* go back home if 404, reload if network */}
              {(type === "notfound" || type === "missing" || type=== "crash") && <a href="/"><button className="btn-primary-invert">go back home</button></a>}
             {type === "network"  && <button onClick={reload} className="btn-primary-invert">refresh</button>}
            </div>
        </div>
    )

    function getImage(){
       switch(type){
           case "notfound":
               return <NotFound style={{height:"300px"}} />;
           case "missing":
               return  <Missing style={{height:"300px"}}/>;
           case "network":
           case "server":
               return <Network />
            case "crash":
                return <BugFix />
                
            default:
                
       }
    }
}

Error.propTypes = {

}
Error.defaultProps = {
 type:"notfound",
 message:"this page seems to be missing"
}



