import React from 'react'
import Alert from "../../../components/Alert/Alert";
import MainContext from "../../../context/MainContext";
import { useContext, useState ,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

export default function WorkersEdit() {
    const { setAlert } = useContext(MainContext);

    const { id } = useParams()
    
    const [post, setPost] = useState({
        first_name: '',
        last_name: '',
        photo: ''
    })


    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/workers/edit/' + id)
        .then(resp => {
            console.log(resp)
            if(!resp.data) {
                navigate('/')
                return
            }

            setPost(resp.data)
        })
        .catch(error => {
            console.log(error)
            navigate('/')
        })
    }, [id, navigate])

    const handleForm = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/workers/edit/' + id, post)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            window.scrollTo(0, 0)

            setTimeout(() => navigate('/'), 2000)
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: 'danger'
              })
              window.scrollTo(0, 0)
      
              if(error.response.status === 401)
                setTimeout(() => navigate('/login'), 2000)
        })

    }

  return (
    <div className="container">
            <h2>Paslaugu redagavimas</h2>
          
            
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-2">
                    <label>Vardas:</label>
                    <input type="text" name="first_name" className="form-control" onChange={(e) => handleForm(e)} value={post.first_name} />
                </div>
                
                <div className="form-group mb-2">
                    <label>Pavarde:</label>
                    <input type="text" name="last_name" className="form-control" onChange={(e) => handleForm(e)} value={post.last_name} />
                </div>
                <div className="form-group mb-2">
                    <label>Nuotrauka:</label>
                    <input type="image" name="photo" className="form-control" onChange={(e) => handleForm(e)}  />
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
  )
}
