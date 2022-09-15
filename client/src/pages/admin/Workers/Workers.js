import React from "react";
import { useEffect, useState, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainContext from "../../../context/MainContext";
import { useNavigate } from "react-router-dom";

export default function WorkersList() {
  const { setAlert } = useContext(MainContext);
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    axios
      .get("/api/workers")
      .then((resp) => setWorkers(resp.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleDelete = (id) => {
    if(isNaN(id) )
      return
    
    axios.delete('/api/workers/delete/' + id)
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
    <h1> Visi darbuotojai:</h1>
      {workers ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vardas</th>
              <th>Pavarde</th>
              <th>Nuotrauka</th>
              <th>Salonas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workers.map((workers) => (
              <tr key={workers.id}>
                <td>{workers.id}</td>
                <td>{workers.first_name}</td>
                <td>{workers.last_name}</td>
                <td><img src={workers.photo} alt={workers.first_name + ' '+ workers.last_name}/></td>
                <td>{workers.saloon.name}</td>
                <td>  <td>
                                <Link 
                                    to={'/admin/workers/edit/' + workers.id} 
                                    className="btn btn-light">Redaguoti</Link>
                                <button 
                                    onClick={() => handleDelete(workers.id)} 
                                    className="btn btn-light">Trinti</button>
                            </td></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>Nėra darbininku</h3>
      )}
    </>
  );
}
