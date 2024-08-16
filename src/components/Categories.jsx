import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../sevice/FirebaseService";


function Categories(props) {
  const [imgUpload, setImgUpload] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(null);
  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const [categoriesPage, setCategoriesPage] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [update]);

  useEffect(() => {
    setCategoriesPage(getCategoriesByCurrentPage());
  }, [currentPage, categories]);

  const getCategoriesByCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categories.slice(startIndex, endIndex);
  };
  //Sử dụng setCategories để truyền dữ liệu lên database
  const fetchCategories = async () => {
    try {
      setCategories(await fetchDocuments("categories"));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle img Change
  const handleImageChange = (e) => {
    const selectedImg = e.target.files[0];

    if (selectedImg) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(selectedImg);
      setImgUpload(selectedImg);
    } else {
      setPreviewImg(null);
      setImgUpload(null);
    }
  };

  //Reset lại form add
  const resetForm = () => {
    setPreviewImg(null);
    setCategoryEdit(null);
  };

  //ADD CATEGORY
  const submitAddCategory = async (event) => {
    event.preventDefault();
    //Lấy dữ liệu dổ vào
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const check = formData.get("spending-item");
    //Dữ liệu cần truyền lên firebase
    const category = {
      title: title,
      check: check,
    };
    //Hàm update lên firebase trong service
    if (categoryEdit) {
      await updateDocument(
        "categories",
        categoryEdit.id,
        category,
        imgUpload,
        categoryEdit.imgUrl
      );
    } else {
      await addDocument("categories", category, imgUpload);
    }
    //Reset lại khi upload
    setUpdate(!update);

    //ẩn modal khi add thành công cate vào firebase
    const modalElement = document.getElementById("addCategory");
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };

  //Xoá category
  const handleDelete = async () => {
    await deleteDocument("categories", categoryEdit.id, categoryEdit.imgUrl);
    setUpdate(!update);

    //ẩn modal khi add thành công cate vào firebase
    const modalElement = document.getElementById("exampleModal");
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };

  return (
    <div className="container">
      <header className="row mt-3">
        <div className="col-3">
          <h3>List Categories</h3>
        </div>
        <div className="col-6">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span class="input-group-text" id="basic-addon2">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
        <div className="col-3 text-end">
          <button
            type="button"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addCategory"
            onClick={resetForm}
          >
            Add Category
          </button>
        </div>
      </header>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Img</th>
            <th scope="col">Price Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categoriesPage.map((Item, index) => (
            <tr>
              <th scope="row">{index + 1 + itemsPerPage*(currentPage -1)}</th>
              <td>{Item.title}</td>
              <td>
                <img src={Item.imgUrl} style={{ width: "50px" }} alt="" />
              </td>
              <td className={Item.check == "chi" ? "text-danger" : "text-info"}>
                Tiền {Item.check}
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-info"
                  onClick={() => {
                    setCategoryEdit(Item);
                    setPreviewImg(Item.imgUrl);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#addCategory"
                >
                  {/* icon edit */}
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  class="btn  btn-outline-danger ms-3"
                  onClick={() => setCategoryEdit(Item)}
                >
                  {/* icon delete */}
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Phân trang */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </a>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </nav>

      {/* <!-- Modal add CATEGORY--> */}
      <div
        class="modal fade"
        id="addCategory"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {categoryEdit ? "EDIT CATEGORY" : "ADD CATEGORY"}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                onSubmit={submitAddCategory}
                className="m-auto"
                id="category"
              >
                <div class="mb-3">
                  <div className="form-img w-50  m-auto">
                    <img
                      src={
                        previewImg
                          ? previewImg
                          : "https://cdn-icons-png.flaticon.com/512/17282/17282300.png"
                      }
                      alt=""
                    />
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    class="form-control mt-3"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    name="title"
                    defaultValue={categoryEdit ? categoryEdit.title : ""}
                  />
                </div>
                <div className="mb-3 d-flex">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="spending-item"
                      value="chi"
                      defaultChecked={
                        categoryEdit && categoryEdit.check === "chi"
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Mục Chi
                    </label>
                  </div>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="spending-item"
                      value="thu"
                      defaultChecked={
                        categoryEdit && categoryEdit.check === "thu"
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Mục Thu
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" class="btn btn-success">
                    {categoryEdit ? "Update Category" : "Add Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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

export default Categories;
