import { ReactComponent as LoadLogo } from '../../assets/logos/loader.svg'
import { useRef } from 'react';
import './Loader.css'
function Loader({ children, white }) {
   const ld = useRef();
   if (white) ld.current.children[0].style.fill = "white"
   return (<div className='loader-wrapper glassModel'>
      <div className="loader" ref={ld}>
         <LoadLogo />
      </div>
      <div className="message">{children !== undefined ? children : ""}
      </div>
   </div>
   );
}

export default Loader;