import React from 'react';
import './msg.css';

const Message = (props) => {

    
   const  userNameColor=props.msgUserColor;
   const repliedUserColor=props.repliedUserColor;
    let classId = ''
    let sameUser = true
    if (props.msgUserId.toString() === props.userId.toString()) {

        classId = 'signedUser'
    }
    else {

        classId = 'foreignUser'
        sameUser = false
    }

    return (
        <div align={sameUser ? 'right' : 'left'} className='container'>
            {/* {sameUser ? <p>you</p> :<div className='ForeignUserName'> <p >
                    {props.msgUserId}
                </p></div>} */}
            <div className={classId}>


            <div className='leftDiv'>

            <p style={{color:userNameColor, fontWeight:"bold"}} >
                    {props.msgUserName} 
                </p>
                {
                    props.repliedMsgText ? <div style={{borderLeftColor: repliedUserColor}} className='replyDiv'>
                        <p style={{color:repliedUserColor, fontWeight:"bold"}}>
                            {props.repliedMsgUser}

                        </p>
                        <p style={{wordWrap:"break-word", maxWidth:'95%'}}>
                            {props.repliedMsgText}
                        </p>

                    </div> : ''
                }
                 <p style={{wordWrap:"break-word",maxWidth: props.repliedMsgText?'500px':'500px'}} >
                    {props.msg}
                </p>
            </div>

                {
                    sameUser ?
                        <div align='right' className='EditAndDelete'>
                            <button className='editbtn' name='Edit' onClick={props.setIndex}> </button>

                            <button className='deletebtn' name='delete' onClick={props.delEvent}> </button>
                        </div> :
                        <div >
                            <button className='replybtn' name='reply' onClick={props.setRepliedMsgIndex}> </button>
                        </div>
                }
            </div>


            {/* {            
            sameUser?
            <div>
                <button className='btn' name='delete' onClick={props.delEvent}> Delete</button>
                <button className='btn' name='delete' onClick={props.delEvent}> Delete</button>

            </div>
            :
            <div> */}
            {/* TODO: RENDER REPLY BUTTON */}
            {/* </div>
        }
     */}

            {/* <input type="text" onChange={props.eventChange}    /> */}


        </div>
    );

}
export default Message;