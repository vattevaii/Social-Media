import { ReactComponent as ErrorLogo } from '../../assets/logos/danger.svg'
import './Loader.css'
function Error({ children }) {
   return (<div className='loader-wrapper error glassModel'>
      <div className="loader">
         <ErrorLogo /></div>
      <div className="message">{children !== undefined ? children : ""}
      </div>
   </div>
   );
}

export default Error;