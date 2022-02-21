import axios from "axios";

class HelloWorldService{
executeHelloWorldService(){
    //console.log("executeHelloWorldService");
  return  axios.get('http://localhost:8080/helloworld')
}
executeHelloWorldBeanService(){
    //console.log("executeHelloWorldService");
  return  axios.get('http://localhost:8080/helloworldbean')
}

executeHelloWorldBeanServicePathVariable(name){
  // let username='jayshankar'
  // let password='jayshankar123'
  // let basicAuthHeader='Basic '+window.btoa(username+':'+password) 
    //console.log("executeHelloWorldService");
  return  axios.get(`http://localhost:8080/helloworldbean/${name}`
  // ,
  // {
  //   headers:{
  //     Authorization: basicAuthHeader
  //   }
  // }
  )
}

}

export default new HelloWorldService();