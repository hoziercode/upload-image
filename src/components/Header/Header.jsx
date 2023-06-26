import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useResolvedPath, useMatch } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
        <div>
          <p className='header-text'>Upload Image</p>
        </div>
      <div>
        <CustomLinks to='/'>Upload Image</CustomLinks>
        <CustomLinks to='/display'>Display Image</CustomLinks>
      </div>
    </div>
  )
}

export default Header


function CustomLinks({ to, children, setMenuOpened, ...probs}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <Link
        to={to}
        {...probs}
        className={isActive ? "active a-tag" : "a-tag"}
        onClick={() => {
          window.scrollTo(0, 0);
          setMenuOpened((pre) => !pre);
        }}
      >
        {children}
      </Link>
    );
  }
  
