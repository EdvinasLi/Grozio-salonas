import React from "react";
import { useEffect, useState, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";

export default function Saloons() {
  const { setAlert } = useContext(MainContext);
  const [saloons, setSaloons] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    axios
      .get("/api/saloons")
      .then((resp) => setSaloons(resp.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleDelete = (id) => {
    if(isNaN(id) )
      return
    
    axios.delete('/api/saloons/delete/' + id)
    .then(resp => {
      setAlert({
        message: resp.data,
        status: 'success'
      })
      setRefresh(!refresh)
      
      window.scrollTo(0, 0)
    })
    .catch(error => {
      console.log(error)
      setAlert({
        message: error.response.data,
        status: 'danger'
      })
      window.scrollTo(0, 0)

      if(error.response.status === 401)
        setTimeout(() => navigate('/login'), 2000)
    })
    .finally(() => {
      setTimeout(() => setAlert({
        message: '',
        status: ''
      }), 3000)
    })
    
}
  return (
    <>
    <h1> Visi grozio salonai:</h1>
      {saloons ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Pavadinimas</th>
              <th>Adresas</th>
              <th>Telefono nr.</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {saloons.map((saloon) => (
              <tr>
                <td>{saloon.id}</td>
                <td>{saloon.name}</td>
                <td>{saloon.adress}</td>
                <td>{saloon.phone}</td>
                <td>  
                                <Link 
                                    to={'/admin/saloons/edit/' + saloon.id} 
                                    className="btn btn-light">Redaguoti</Link>
                                <button 
                                    onClick={() => handleDelete(saloon.id)} 
                                    className="btn btn-light">Trinti</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Nėra sukurtų grožio salonų</h3>
      )}
    </>
  );
}
