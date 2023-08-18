import React from 'react';
import {useEffect ,useState} from 'react'
import './Viewmail.css'

const Viewmail = (props) => {
    let limk =""
    
    const [viewmessage , setviewmessage] = useState([])
 const mailfetch = (id,dompro,nameemailpro) => {
    fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${nameemailpro}&domain=${dompro}&id=${id}`)
    .then(responce => responce.json())
    .then(datas => setviewmessage([datas]) )
    .catch("No error")
 }
 
 useEffect(() => {mailfetch(props.id,props.dom,props.nameemail)
console.log(viewmessage)})
return (
    <div className="email-view">
      
        {viewmessage.map((ele) => {
            return(
                <>
                 
        <div className="email-header">
        <div className="from">{ele.from}</div>
        <div className="subject">{ele.subject}</div>
        <div className="date">{ele.date}</div>
      </div>
      <div className="email-attachments">
        <h4>Attachments:</h4>
        <ul>
          {ele.attachments.map((attachment, index) => {
            limk = (`https://www.1secmail.com/api/v1/?action=download&login=${props.nameemail}&domain=${props.dom}&id=${props.id}&file=${attachment.filename}`)
            return (
                <>
                <li key={index}><a href={limk}>{attachment.filename}</a></li>
                </>
            )
            })}
        </ul>
      </div>    
      <div
        className="email-body"
        dangerouslySetInnerHTML={{ __html: ele.htmlBody || ele.textBody }}
      />
                </>
            )
        })}
    </div>
  );
};

export default Viewmail;
