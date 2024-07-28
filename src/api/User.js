import request from '@/utils/request.js'
 

export  function find(num){
    return  request.get("http://localhost:8080/find?num=" + num)
}


export  function load(name,password){
    return  request.get("http://localhost:8080/load?name=" + name+"&password="+password)
}



export  function getinfo(){
    return  request.get("http://localhost:8080/getinfo")
}

export  function delToken(){
    return  request.get("http://localhost:8080/delToken")
}

export  function updateAvatar(url){
    return  request.get("http://localhost:8080/updateAvatar?url="+url)
}

export  function uload(id,name,password){
    return  request.get("http://localhost:8080/uload?id="+id+"&name=" + name+"&password="+password)
}

export  function userInfo(){
    return  request.get("http://localhost:8080/userInfo")
}

export  function uupdateAvatar(url){
    return  request.get("http://localhost:8080/user_updateAvatar?url="+url)
}

export  function register(name,password){
    return  request.get("http://localhost:8080/register?name=" + name+"&password="+password)
}

export  function buy(user_id,cookingping_name){
    return  request.get("http://localhost:8080/buy?user_id=" + user_id+"&cookingpin_name="+cookingping_name)
}

export  function getcart(user_id){
    return  request.get("http://localhost:8080/getcart?user_id="+user_id)
}



export  function cart_del(user_id,cookingpin_name){
    return  request.get("http://localhost:8080/cart_del?user_id="+user_id+"&cookingpin_name="+cookingpin_name)
}
export  function cart_add(user_id,cookingpin_name){
    return  request.get("http://localhost:8080/cart_add?user_id="+user_id+"&cookingpin_name="+cookingpin_name)
}
export  function cart_remove(user_id,cookingpin_name){
    return  request.get("http://localhost:8080/cart_remove?user_id="+user_id+"&cookingpin_name="+cookingpin_name)
}

export  function pay(user_id,price,remark,sumarry){
    return  request.get("http://localhost:8080/pay?user_id="+user_id+"&price="+price+"&remark="+remark+"&sumarry="+sumarry)
}


export  function callback(user_id,user_name,password){
    return  request.get("http://localhost:8080/callback?user_id="+user_id+"&user_name="+user_name+"&password="+password)
}


export  function u_getorder(user_id){
    return  request.get("http://localhost:8080/u_getorder?user_id="+user_id)
}


export  function down(user_id){
    return  request.get("http://localhost:8080/downs?user_id="+user_id)
}


