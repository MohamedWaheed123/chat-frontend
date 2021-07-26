import React, { Component } from 'react';
import './register.css';
import Cookies from 'js-cookie';

class Register extends Component
{

     constructor(props)
     {
         super(props);
         this.state={
             name:'',
             email:'',
             password:''

         }
     }
     onNameChange =(event)=>{
        this.setState({name: event.target.value})
      }
      onEmailChange =(event)=>{
        this.setState({email: event.target.value})
      }
      onPasswordChange =(event)=>{
        this.setState({password: event.target.value})
      }
      setCookies=(user)=>{
        Cookies.set('loggedUser',{
            id:user.id,
            
            name:user.name,
            email:user.email,
            color:user.color
        })
    }

      onSubmitRegister=()=>{
        
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
        fetch('http://localhost:3000/register',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            color:randomColor
          })
        }).then(response=>response.json()).then(user=>{
          if(user.id){
           this.props.loadUser(user);
            this.props.onRouteChange('home');
            this.setCookies(user);
          }
          else if(user==='incorrect form submission')
          {
            alert("please enter your information")
          }
          else{
            alert("this email is already exist")

          }
        })
        
      }
     render()
     {
         return(
             <div className='mainForm' >
                 
                  <div className='registerFormDiv'>
                     

                  {/* <img alt='logo' className='registerimg' src='https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png' /> */}
                  
                    
                 <div className='innerDiv'>
                     <label> Name</label>
                     <input onChange={this.onNameChange} className='registerInput'/>
 
                 </div>
                 <div className='innerDiv'>
                     <label> Email</label>
                     <input onChange={this.onEmailChange} className='registerInput'/>
                     
                 </div>
                 <div className='innerDiv'>
                     <label> Password</label>
                     <input onChange={this.onPasswordChange} className='registerInput'/>
                     
                 </div>
                 <button onClick={this.onSubmitRegister} className='registerBtn'> Register</button>
                  </div>

             </div>
         );

     }
}

export default Register ;