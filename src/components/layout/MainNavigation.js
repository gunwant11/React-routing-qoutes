import { NavLink } from 'react-router-dom';
import classess from './MainNavigation.module.css'

const MainNavigation = () =>{
    return <header className={classess.header}>
        <div className={classess.logo}>Great Quotes</div>
        <nav className={classess.nav}>
            <ul>
                <li><NavLink to="/quotes" activeClassName={classess.active}>All Quotes</NavLink></li>
                <li><NavLink to="/new-quotes" activeClassName={classess.active}>Add a Quotes</NavLink></li>
            </ul>
        </nav>
    </header>
}
export default MainNavigation;