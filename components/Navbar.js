import Link from 'next/Link';

const Navbar = () => (
  <nav id="navbar">
    <div className="container">
      <div id="nav-content">
        <div id="logo">
          <Link href="/">
            <a>
              <h1>CodeTunes</h1>
            </a>
          </Link>
        </div>

        <div id="search">
          <div id="main-searchbar">
            <label htmlFor="search-input">
              {/* <i class="fa fa-search" aria-hidden="true"></i> */}
              <svg id="search-icon" height="24" viewBox="0 0 24 24" width="24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
            </label>
            <input type="text" name="search-input" placeholder="Search User" />
          </div>
        </div>

        <ul id="nav-menu">
          <Link href="/about">
            <a className="nav-link">About</a>
            </Link>
        </ul>
      </div>
    </div>
    

    <style jsx>{`
    
      #navbar {
        padding: 1.5rem 0;
        border-bottom: 1px solid white;
      }
    
      #nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #logo h1 {
        color: white;
        font-size: 2rem;
        text-transform: uppercase;
      }

      .nav-link {
        color: white;
      }

      #search {
        width: 50%;
      }

      #searchbar{
        width: 100%;
      }

      label {
        position: absolute;
        top: 10px;
        left: 12px;
      }
      
      #main-searchbar {
        margin: auto;
        display: flex;
        position: relative;
      }

      #main-searchbar input {
        width: 100%;
        border-radius: 23px;
        padding: 0.6rem 0.5rem 0.5rem 2.3rem;
        font-size: 1.1rem;
      }

      #main-searchbar input :focus {
        outline: none;
      }

    `}</style>
  </nav>
)

export default Navbar;
