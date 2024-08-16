import React, { useEffect, useState } from "react";
import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../sevice/FirebaseService";
import { useParams } from "react-router-dom";

function Home(props) {
  const [categories, setCategories] = useState([]);
  const [check, setCheck] = useState("chi");
  const [spend, setSpend] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [update, setUpdate] = useState(null);
  const [editSpend, setEditSpend] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState({});

  //#region GET API CATE
  useEffect(() => {
    fetchAPI_Spen();
  }, [update, id]);

  const fetchAPI_Spen = async () => {
    try {
      //lấy cate
      const resultCate = await fetchDocuments("categories");
      setCategories(resultCate);
      const result = await fetchDocuments("spending");
      setSpend(result);

      //lấy id để show trường
      const speedById = result.find((element) => element.id == id);
      setEditSpend(speedById);
      setCategoryId(speedById.cate);

      //lấy check để hiển thị cate đã click
      const categoryById = resultCate.find(
        (element) => element.id == speedById.cate
      );
      setCheck(categoryById.check);
    } catch (error) {
      console.log(error);
    }
  };

  //#region ADD CHI TIÊU
  const Add_Spend = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newErrors = {};
    //lấy dữ liệu
    const date = formData.get("date");
    const note = formData.get("note");
    const price = formData.get("price");
    if (!date) {
      newErrors.date = "Vui lòng nhập ngày tháng";
    }
    if (!price) {
      newErrors.price = "Vui lòng nhập giá";
    }
    if (!note) {
      newErrors.note = "Vui lòng ghi chú";
    }
    if (!categoryId) {
      newErrors.categoryId = "Vui lòng chọn category";
    }

    //Truyền dữ liệu vào
    const spending = {
      date: date,
      note: note,
      price: price,
      cate: categoryId,
    };
    if (Object.keys(newErrors).length == 0) {
      if (editSpend) {
        await updateDocument("spending", editSpend.id, spending);
      } else {
        await addDocument("spending", spending);
      }
      setUpdate(!update);
    } else {
      setError(newErrors);
    }
  };
  console.log(error);
  return (
    <div>
      <h1 className="text-center">
        <button
          onClick={() => setCheck("chi")}
          type="button"
          class={`btn text-white ${
            check == "chi" ? "btn-warning" : "btn-secondary"
          }`}
        >
          Tiền chi
        </button>
        <button
          onClick={() => setCheck("thu")}
          type="button"
          class={`btn ms-2 text-white ${
            check == "thu" ? "btn-warning" : "btn-secondary"
          }`}
        >
          Tiền thu
        </button>
      </h1>
      <form onSubmit={Add_Spend}>
        <div className="form-text w-50 m-auto">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Date
            </label>
            <input
              type="Date"
              class="form-control"
              name="date"
              defaultValue={editSpend ? editSpend.date : ""}
            />
            {error.date && <div className="invalid-feedback">{error.date}</div>}
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Note
            </label>
            <input
              type="text"
              class="form-control"
              name="note"
              defaultValue={editSpend ? editSpend.note : ""}
            />
            {error.note && <div className="invalid-feedback">{error.note}</div>}
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Price
            </label>
            <input
              type="number"
              class="form-control"
              min={0}
              placeholder="0"
              name="price"
              defaultValue={editSpend ? editSpend.price : ""}
            />
            {error.price && (
              <div className="invalid-feedback">{error.price}</div>
            )}
          </div>
        </div>
        <div className="form-categories container">
          <div className="text-center">
            <label
              className="mb-4"
              for="exampleInputPassword1"
              class="form-label"
            >
              <h1>
                <b>Categories</b>
              </h1>
              {error.categoryId && (
                <div className="invalid-feedback">{error.categoryId}</div>
              )}
            </label>
          </div>
          <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-3">
            {categories
              .filter((element) => element.check == check)
              .map((element) => (
                <div className="col" onClick={() => setCategoryId(element.id)}>
                  <div
                    class={`card p-3 ${
                      categoryId == element.id ? "bg-warning" : ""
                    }`}
                  >
                    <div className="card-img w-50 m-auto ">
                      <img
                        src={element.imgUrl}
                        class="card-img-top"
                        alt="..."
                      />
                    </div>
                    <div class="card-body">
                      <p class="card-text text-center">{element.title}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="text-center mt-5">
          <button type="submit" class="btn btn-primary">
            {editSpend ? "Update Cate" : "Add Cate"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
