import React from "react";
import { useEffect, useState, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";

export default function ServicesList() {
  const { setAlert } = useContext(MainContext);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    axios
      .get("/api/services")
      .then((resp) => setServices(resp.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleDelete = (id) => {
    if(isNaN(id) )
      return
    
    axios.delete('/api/services/delete/' + id)
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
    <h1> Visos paslaugos:</h1>
      {services ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Pavadinimas</th>
              <th>Trukme</th>
              <th>Kaina</th>
              <th>Salonas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((services) => (
              <tr key={services.id}>
                <td>{services.id}</td>
                <td>{services.name}</td>
                <td>{services.duration}</td>
                <td>{services.price}</td>
                <td>{services.saloon.name}</td>
                <td>  <td>
                                <Link 
                                    to={'/admin/services/edit/' + services.id} 
                                    className="btn btn-light">Redaguoti</Link>
                                <button 
                                    onClick={() => handleDelete(services.id)} 
                                    className="btn btn-light">Trinti</button>
                            </td></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Nėra sukurtų paslaugu</h3>
      )}
    </>
  );
}
