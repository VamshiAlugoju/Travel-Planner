import React ,{ useState , useEffect ,useRef  , useCallback } from "react"
 


   const useHttpClient = ()=>{

    const [isLoading ,setisLoading] = useState(false)
    const activeHttprequests  = useRef([])
    const sendRequest = useCallback( async(url, method = "GET" , body= null ,headers = {})=>{
         
        const httpAbortController = new AbortController()
        activeHttprequests.current.push(httpAbortController)
        setisLoading(true)
        try{
            const response = await fetch(url ,{ 
                method,
                body,
                headers,
                signal:httpAbortController.signal}
                )
                let responseData = await response.json()
              activeHttprequests.current = activeHttprequests.current.filter(abrtctrl=>abrtctrl!=httpAbortController)
                if(!response.ok)
                { 
                   throw new Error(responseData.message)
                }
                setisLoading(false)

                return responseData;
        }
        catch(err){
            setisLoading(false)
              
             throw err;
        }
         
    } , [])
    
useEffect(()=>{
     return ()=>{
        activeHttprequests.current.forEach(abortCtrl=>abortCtrl.abort())
     }
} , [])


 return {isLoading , sendRequest  }

}

export default useHttpClient;