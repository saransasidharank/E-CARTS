import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/Slice/wishlistSlice'
import { addtoCart } from '../Redux/Slice/cartSlice'

function View() {
  const{id} =useParams()
  const {loading} = useSelector((state)=>state.productSlice)
  const [product,setProduct] = useState({})
  const dispatch = useDispatch()

  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(product=>product?.id==id))
  },[])
  const handleWishlist = (product)=>{
    const existingProduct = wishlist.find(item=>id.product.id)
    if(existingProduct){
      alert("product already exist!!!")
    }else{
      dispatch(addToWishlist(product))
    }
  }
 
  return (
    <div className='container mt-5'>
      {
      <div className="row mt-5 align-items-center">
        <div className="col-md-4">
          <img style={{height:'400px',width:'100%'}} src={product?.thumbnail} alt="product" />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6">
            <p>PID: {product?.id} </p>
            <h1>{product?.title}</h1>
            <h5 className='fw-bolder'>$ {product?.price}</h5>
            <p style={{textAlign:'justify'}}><span className='fw-bolder'>Description: </span>{product?.description}</p>
            <div className='d-flex justify-content-between mt-5'>
                <Button onClick={()=>dispatch(addToWishlist(product))} variant="outline-dark" className='btn fs-5'><i className="fa-solid fa-heart text-danger"></i>Wish list</Button>
                <Button onClick={()=>dispatch(addtoCart(product))} variant="outline-dark" className='btn fs-5'><i className="fa-solid fa-cart-plus text-success"></i>Cart</Button>

              </div>
        </div>
      </div>
      }
    </div>
      
  )
}

export default View