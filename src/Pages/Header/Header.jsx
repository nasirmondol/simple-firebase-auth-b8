import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/Login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;