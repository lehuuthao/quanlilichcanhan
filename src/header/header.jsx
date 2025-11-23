import '../style/styleHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
const ClearIcon = () => <FontAwesomeIcon icon={faCircleXmark} />
const LoadingIcon = () => <FontAwesomeIcon icon={faSpinner} />
const SearchIcon = () => <FontAwesomeIcon icon={faMagnifyingGlass} />
const UserIcon = () => <FontAwesomeIcon icon={faUserAlt} />


const headers =()=>{
    return(
        <>
      <header className="wrapper">
         <div className='logo'> 
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg" alt="calendar" />
         </div>
         <div className='search'>
            <input placeholder="Search" spellCheck={false} />
            <button className='clear'>
            <ClearIcon />
            </button>
           
            <button className='search-btn'>
            <SearchIcon />
            </button>
            </div>

            <div className='tacvu'>
            <button type='user-icon'>
                <UserIcon /> 
            </button>
            </div>
     
      </header>           
        
        </>
    )

}
export default headers;