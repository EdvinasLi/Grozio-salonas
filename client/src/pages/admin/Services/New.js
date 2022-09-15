import { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MainContext from "../../../context/MainContext";

const NewService = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: ""

  });
  const [saloons, setSaloons] = useState([]);
  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();

    axios
      .post("/api/services/new", form)
      .then((resp) => {
        setAlert({
          message: resp.data,
          status: "success",
        });
       
        navigate("/admin");
      })
      .catch(error => {console.log(error)
       
  })
}

useEffect(() => {

    axios.get('/api/saloons')
    .then(resp => setSaloons(resp.data))
    .catch(error => {
        console.log(error)
        setAlert({
            message: error.response.data,
            status: "danger",
          })
        if (error.response.status === 401) navigate('/login')
    })


},[navigate])
  return (
    <>
      <h1>Nauja paslauga</h1>
     
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Paslaugos pavadinimas</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Trukme:</label>
          <input
            type="text"
            name="duration"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Kaina:</label>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">Grozio salonas</label>
         <select name='saloonId' onChange={handleForm} required className="form-control">
            <option value=''> Pasirinkite salona</option>
                {saloons.map(saloon => <option key={saloon.id} value={saloon.id}>{saloon.name}</option>)}
         </select>
        </div>
        <button className="btn btn-primary">Siųsti</button>
      </form>
    </>
  );
};

export default NewService;
