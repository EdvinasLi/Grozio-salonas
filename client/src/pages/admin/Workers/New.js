import { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MainContext from "../../../context/MainContext";

const NewWorker = () => {
  const { setAlert } = useContext(MainContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    photo: "",
    saloonId:''
  });
  const [saloons, setSaloons] = useState([]);
  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.name=== 'photo'? e.target.files[0]:e.target.value });
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    
    const forma = new FormData()
    for(const key in form){forma.append(key,form[key])}
    
console.log(forma)
    axios
      .post("/api/workers/new", forma)
      .then((resp) => {
        console.log(form)
        console.log(resp.data)
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
        if (error.response.status === 401) navigate('/admin')
    })


},[navigate])
  return (
    <>
      <h1>Naujas darbuotojas</h1>
     
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-2">
          <label className="mb-1">Vardas</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
        <div className="form-group mb-2">
          <label className="mb-1">last_name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            onChange={handleForm}
          />
        </div>
       
        <div className="form-group mb-2">
          <label className="mb-1">Nuotrauka</label>
          <input
            type="file"
            name="photo"
            className="form-control"
            onChange={handleForm}
          />
        </div>


        <div className="form-group mb-2">
          <label className="mb-1">Grozio salonas</label>
         <select name='saloonId' onChange={handleForm} required className="form-control">
            <option value=''> Pasirinkite salona kuriame dirbate</option>
                {saloons.map(saloon => <option key={saloon.id} value={saloon.id}>{saloon.name}</option>)}
         </select>
        </div>
        <button className="btn btn-primary">Siųsti</button>
      </form>
    </>
  );
};

export default NewWorker;
