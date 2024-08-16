import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header(props) {
  const navigation = useNavigate();
  return (
    <>
      <nav class="navbar navbar-expand-lg style">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img
              className="row1"
              src="https://cdn-icons-png.flaticon.com/512/126/126229.png"
              alt=""
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={`/home/0`}
                >
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={`/add-cate`}>
                  Category
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/list">
                  List
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="/baocao">
                  Báo cáo
                </a>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <i
                class="fa-solid fa-magnifying-glass me-5"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <i
                class="fa-regular fa-envelope me-5"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <div class="dropdown">
                <div
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/448510601_1909189019530161_7770431781770535508_n.jpg?stp=dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFy8Msdp3P6IPNEJn60pf17NtZfO1rJ-UM21l87Wsn5Q-ufiD0LA1WXywpj9avm0oy3leJ5L8FDShayLYsluH94&_nc_ohc=BAl4qD9ojKAQ7kNvgGpAj0O&_nc_ht=scontent.fdad1-3.fna&oh=00_AYDb54zPv3gp0tRLj2hK51LOsHom--PReXTs7U2i-g3QsA&oe=66C4DF8B"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <ul
                  class="dropdown-menu profile"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      Usser
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li onClick={() => navigation("/")}>
                    <a class="dropdown-item" href="#">
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
