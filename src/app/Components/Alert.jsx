
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiFillCloseCircle }    from "react-icons/ai";
import { AiFillCheckCircle }    from "react-icons/ai";
import { PiWarningFill }        from "react-icons/pi";

const Alert = ({ type = 'info', children, className, rounded, icon }) => {
    
    const alertStyles = 
    {
      info:     'bg-info text-blue-800 border-blue-300',
      success:  'bg-success text-green-800 border-green-300',
      warning:  'bg-warning text-white border-yellow-700',
      error:    'bg-error text-red-800 border-red-300',
    }

    const roundedTypes = 
    {
      1:     'rounded-[5px]',
      2:     'rounded-[10px]',
      3:     'rounded-[20px]',
      4:     'rounded-[50px]',
    }

    const iconType = 
    {
      'info':      <BsFillInfoCircleFill size={20}/>,
      'success':   <AiFillCheckCircle size={20}/>,
      'warning':   <PiWarningFill size={20}/>,
      'error':     <AiFillCloseCircle size={20}/>,
    }
  
    return (
      <div className={`gap-5 w-full shadow-lg select-none animate-slideIn flex items-center p-3 ${alertStyles[type]} ${roundedTypes[rounded]} ${className}`} role="alert" >
          <div>
            {iconType[icon]}
          </div> 
          <div>
            {children} 
          </div>
      </div>
    );
  };
  
  export default Alert;
  