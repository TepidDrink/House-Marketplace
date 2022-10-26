import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => route === location.pathname
  const pathMatchColor = (route) => pathMatchRoute(route) ?
    '#2c2c2c' : '#8f8f8f'
  const pathMatchClass = (route) => pathMatchRoute(route) ?
    'navbarListItemNameActive' : 'navbarListItemName'

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={ () => navigate('/') }>
            <ExploreIcon fill={ pathMatchColor('/') } with='36px' height='36px'/>
            <p className={ pathMatchClass('/') }>Explore</p>
          </li>
          <li className='navbarListItem' onClick={ () => navigate('/offers') }>
            <OfferIcon fill={ pathMatchColor('/offers') } with='36px' height='36px'/>
            <p className={ pathMatchClass('/offers') }>Offers</p>
          </li>
          <li className='navbarListItem' onClick={ () => navigate('/profile') }>
            <PersonOutlineIcon fill={ pathMatchColor('/profile') } with='36px' height='36px'/>
            <p className={ pathMatchClass('/profile') }>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default NavBar
