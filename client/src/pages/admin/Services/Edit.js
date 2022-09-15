import React from 'react'
import Alert from "../../../components/Alert/Alert";
import MainContext from "../../../context/MainContext";
import { useContext, useState ,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

export default function Edit() {
    const { setAlert } = useContext(MainContext);

    const { id } = useParams()
    
    const [post, setPost] = useState({
        name: '',
        duration: '',
        price: ''
    })


    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/services/edit/' + id)
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

        axios.put('/api/services/edit/' + id, post)
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
                    <label>Pavadinimas:</label>
                    <input type="text" name="name" className="form-control" onChange={(e) => handleForm(e)} value={post.name} />
                </div>
                
                <div className="form-group mb-2">
                    <label>Trukme:</label>
                    <input type="text" name="duration" className="form-control" onChange={(e) => handleForm(e)} value={post.phone} />
                </div>
                <div className="form-group mb-2">
                    <label>Kaina:</label>
                    <input type="number" name="price" className="form-control" onChange={(e) => handleForm(e)} value={post.adress} />
                </div>
                
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
  )
}
