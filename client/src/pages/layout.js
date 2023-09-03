import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
      <a class="navbar-brand" href="/">
      <img src="https://www.kasandbox.org/programming-images/avatars/leaf-green.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"></img>
      Bootstrap
    </a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="/" class="nav-link active" aria-current="page">Home</Link>
          </li>
         <li class="nav-item">
            <Link to="/addData" class="nav-link">Add Data</Link>
          </li>
           {/*<li>
            <Link to="/contact">Contact</Link>
  </li>*/}
        </ul>
        </div>
        </div>
      </nav>
     

      <Outlet />
    </>
  )
};

export default Layout;