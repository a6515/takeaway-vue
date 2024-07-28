import request from '@/utils/request.js'

export  function getcookingPin(){
    return  request.get("http://localhost:8080/getcookingPin")
}

