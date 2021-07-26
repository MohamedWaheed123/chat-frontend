import React, { Component } from 'react';
import './signin.css';
import Cookies from 'js-cookie';
class SignIn extends Component
{

     constructor(props)
     {
         super(props);
         this.state={
            
             signInEmail:'',
             signInPassword:''

         }
     }
    
      onEmailChange =(event)=>{
        this.setState({signInEmail: event.target.value})
      }
      onPasswordChange =(event)=>{
        this.setState({signInPassword: event.target.value})
      }
      setCookies=(user)=>{
        Cookies.set('loggedUser',{
            id:user.id,
            
            name:user.name,
            email:user.email,
            color:user.color
        })
    }


      onSubmitSignin=()=>{
        fetch('http://localhost:3000/signin',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            email:this.state.signInEmail,
            password:this.state.signInPassword
           
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
            alert("incorrect email or password")
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
                     <label> Email</label>
                     <input onChange={this.onEmailChange} className='registerInput'/>
                     
                 </div>
                 <div className='innerDiv'>
                     <label> Password</label>
                     <input onChange={this.onPasswordChange} className='registerInput'/>
                     
                 </div>
                 <button onClick={this.onSubmitSignin} className='registerBtn'> SignIn</button>
                  </div>

             </div>
         );

     }
}

export default SignIn ;