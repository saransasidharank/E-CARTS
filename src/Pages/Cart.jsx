import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decQuantity, emptyCart, incQuantity, removeCart } from '../Redux/Slice/cartSlice'
import Header from '../Components/Header'

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Cart = useSelector(state=>state.cartReducer)
  const [CartAmount,setCartAmount] =useState(0)
  useEffect(()=>{
    if(Cart?.length>0){
     setCartAmount(Cart?.map(product=>product?.totalPrice).reduce((p1,p2)=>p1+p2))
    }else{
      setCartAmount(0)
    }

  },[Cart])
  const handleCheckout = ()=>{
    alert("your order has successfully places.. thank you for purchasing with us!!")
    dispatch(emptyCart())
    navigate('/')
  }
  const handleDecrement = (product)=>{
    if(product.quantity==1){
      dispatch(removeCart(product.id))
    }else{
      dispatch(decQuantity(product))
    }
  }
  return (
    <> 
    <Header/>
    <div className='container mt-5'>
      { Cart?.length>0? <div className="row mt-5">
        <div className="col-lg-8 mt-5">
        <Table className='shadow'>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Image </th>
              <th>quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {Cart.map((product,index)=>(
           <tr key={index}>
              <td>{index+1}</td>
              <td>{product.title}</td>
              <td><img style={{height:'60px',width:'60px'}} src={product.thumbnail} alt="product" /></td>
              <td>
                <div className='d-flex'>
                  <button onClick={()=>handleDecrement(product)} className='btn fw-bolder'>-</button>
                </div>
              </td>
              <td> <input style={{width:'50px'}} className='form-control' type="text" value={product.quantity} readOnly/> </td>
              <button onClick={()=>dispatch(incQuantity(product))} className='btn fw-bolder'>+</button>
              <td>$ {product.price}</td>
              <td> <button onClick={()=>dispatch(removeCart(product.id))} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
            </tr>
            ))}
          </tbody>
        </Table>
        <div className='float-end'>
          <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>Empty Cart</button>
          <Link to={'/'} className='btn btn-primary'>shop More</Link>
      
        </div>
        </div>
        <div className="col-lg-4 mt-5">
          <div className="border rounded shadow p-4">
            <h5>Total Product: <span className='fw-bolder'>{Cart?.length}</span></h5>
            <h3>Total Amount: <span className='fw-bolder text-danger'>{CartAmount}</span></h3>
            <hr />
            <div className="d-grid">
              <button onClick={()=>handleCheckout()} className='btn btn-success'>CheckOut</button>
            </div>
          </div>
        </div>
      </div>:
      <div className='text-center mt-5'>
        <img width={'25%'} height={'200px'} src="https://cdn-icons-png.flaticon.com/512/2037/2037457.png" alt="" />
        <h1 className='mt-3'>your cart is empty</h1>
        <Link to={'/'} className='btn btn-success'>Click here to shop more</Link>
     </div>
     }
    </div>
    </>
  )
}

export default Cart
