import React, { Component } from 'react';
import './upperdiv.css';
import Cookies from 'js-cookie';
class UpperDiv extends Component  {


    
     signOut=()=>{
        
        Cookies.remove('loggedUser');
      this.props.onRouteChange('signout');
        
        
    }
    

    render()
    {

    

    return (
        <div className='upperDiv'>
            <div style={{ display: 'flex', justifyContent: 'center', paddingLeft:'5px',paddingRight:'30px'}}>

                <img alt='logo' className='whatsappimg' src='https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png' />
                <p className='title'>Whatsapp group chat</p>
            </div>

            {
                this.props.isSignedIn ?

                //     <div align='right' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                //         <p onClick={() => onRouteChange('signout')} >
                //             Sign Out
                // </p>
                //     </div>
                <button onClick={this.signOut } className='navigationBtns'> Signout</button>

                    :

                    // <div align='right' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    //     <p onClick={() => onRouteChange('signin')} >
                    //         Sign in
                    // </p>
                    //     <p onClick={() => onRouteChange('register')} >
                    //         register
                    // </p>
                    // </div>
                    <div>

                    <button onClick={()=>this.props.onRouteChange('signin')} className='navigationBtns'> SignIn</button>
                    <button onClick={()=>this.props.onRouteChange('register')} className='navigationBtns'> Register</button>
                   </div>

            }


        </div>
    );

        }

}
export default UpperDiv;