import React, { useEffect, useState } from "react";
import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../sevice/FirebaseService";
import { Link } from "react-router-dom";
import { set } from "firebase/database";

function List(props) {
  const [date, setDate] = useState(new Date());
  const [spend, setSpend] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  const [thu, setThu] = useState(0);
  const [chi, setChi] = useState(0);
  const [tong, setTong] = useState(0);
  //#region GET_API SPEND
  useEffect(() => {
    fetchAPI_Spen();
    fetchCategories();
  }, [update]);

  useEffect(() => {
     getThuChi();
  }, [date,spend]);


  function getThuChi() {
    const price = spend.filter(
      (spend) => getMonthByDate(spend.date) == date.getMonth() + 1
    );
    const chiNew = price.filter((spend) => getCheck(spend.cate) == "chi");
    const totalChi = chiNew.reduce(
      (sum, value) => sum + parseInt(value.price),
      0
    );
    setChi(totalChi);

    //tiền thu
    const thuNew = price.filter((spend) => getCheck(spend.cate) == "thu");
    // console.log(thuNew);
    const totalThu = thuNew.reduce(
      (sum, value) => sum + parseInt(value.price),
      0
    );
    // console.log(totalThu);
    setThu(totalThu);

    //tổng
    const total = totalThu - totalChi;
    setTong(total);
  }
  // console.log(spend);
  const fetchAPI_Spen = async () => {
    try {
      setSpend(await fetchDocuments("spending"));
    } catch (error) {
      console.log(error);
    }
  };
  //#region GET_API CATE
  const fetchCategories = async () => {
    try {
      setCategories(await fetchDocuments("categories"));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //#region DATE NOW
  const handleDateChange = (event) => {
    setDate(new Date(event.target.value));
  };
  // console.log(spend);
  // Format date to YYYY-MM-DD
  const formattedDate = date.toISOString().split("T")[0];

  function getMonthByDate(date) {
    const array = date.split("-");
    return date ? array[1] : "";
  }

  function getCheck(id) {
    const category = categories.find((element) => element.id == id);

    return id ? category.check : "";
  }

  //#region GET_IMG CATE
  const getImg = (id) => {
    const category = categories.find((element) => element.id == id);
    return category ? category.imgUrl : "";
  };

  //#region DELETE
  const handleDelete = async () => {
    // console.log(categoryEdit.id);
    await deleteDocument("spending", categoryEdit.id);
    setUpdate(!update);
    //ẩn modal khi add thành công cate vào firebase
    const modalElement = document.getElementById("exampleModal");
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };

  return (
    <div className="container">
      <div class="input-group w-50 m-auto mt-3">
        <input
          type="date"
          class="form-control "
          aria-label="Dollar amount (with dot and two decimal places)"
          value={formattedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="container mt-3">
        <div className="row row-cols-3">
          <div className="col">
            <div class="card bg-primary text-center">
              <div class="card-header text-white">Thu Nhập</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item text-primary">{thu}</li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div class="card bg-danger text-center">
              <div class="card-header text-white">Chi Tiêu</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item text-danger">{chi}</li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div class="card bg-warning text-center">
              <div class="card-header text-white">Tổng</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item ">{tong}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center mt-3">
        <b>List</b>
      </h1>
      <table class="table table-success mt-3 mb-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">Note</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {spend
            .filter((element) => element.date == formattedDate)
            .map((element, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={getImg(element.cate)}
                    alt=""
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{element.note}</td>
                <td>{element.price}</td>
                <td>
                  <Link to={`/home/${element.id}`}>
                    <button type="button" class="btn btn-danger">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>

                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setCategoryEdit(element)}
                    class="btn btn-warning ms-3"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                DELETE
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Do you want to delete?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                onClick={() => handleDelete()}
                type="button"
                class="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
