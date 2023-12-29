import React from 'react'
import axios from 'axios'
import { useState, useEffect} from 'react'
import {Link} from "react-router-dom"
const Home = () => {


    const [originalurl, setUrl] = useState("");
    console.log("=====>",originalurl)



    const handlesubmit = async  (e) =>{
        e.preventDefault()
        if(originalurl){
        const result = await axios.post("https://url-backend-mgn8.onrender.com/url",{"url":originalurl})
        .then((res)=>{
            console.log("result===>", res) 
            fetchData();
        }  )
        .catch((er)=>{ console.log("error", er)})
        }
        else {
            alert('Please enter a valid URL')
        }
    }


    const [allurl, setallUrl] = useState([])



    const fetchData = async()=>{
        try{
            const resp = await axios.get('https://url-backend-mgn8.onrender.com/url/getlinks',{
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': 'true' // incorrect
                }})
            .then((re)=>{
                console.log("data responsed", re)
                setallUrl(re.data.result);
                console.log("scripted data", allurl)

            })
            .catch((er)=>{console.log("Data couldn't found",er)})

           
        }catch(err){
            console.log("error in fetching details",err)
        }
    }



    useEffect(()=>{
        fetchData();
    },[])

  return (
    <>
    <div>
        <h2>URL Shortner</h2>
    </div>
    <div>
            <form>
                <label ><b>Enter your original URL</b></label>
                <input type="text" placeholder="Enter your url " id="url" className="url" name="url" value={originalurl} onChange={(e)=>setUrl(e.target.value)} />
                <button onClick={handlesubmit}>Shorten URL</button>
            </form>

    </div>

    <div>
        <table style={{width:"70%", border:"1px solid black", margin:"10px", padding:"10px", textAlign:'center'}}>
            <thead>
            <tr>
            <th>S No.</th>
            <th>ShortID</th>
            <th>Redirect</th>
            <th>{allurl.shortId}</th>
            <th>Clicks</th>
            </tr>
            </thead>

            <tbody>
            {allurl.map((item, index)=>{
            // console.log("Items",item)
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td><Link onClick={(e)=>{ e.preventDefault(); const newTab = window.open(`https://url-backend-mgn8.onrender.com/url/${item.shortId}`, '_blank');  setTimeout(()=>{ window.location.reload(true); } ,5000);}}  >{item.shortId}</Link></td>
                    <td> {item.redirectURL}</td>
                    <td> {item.visitHistory.length}</td>
                </tr>
            );

            })
          }
            </tbody>
         

    
        </table>
    </div>
    </>
  )
}

export default Home