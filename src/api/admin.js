import request from '@/utils/request.js'

export  function getorders(){
    return  request.get("http://localhost:8080/getorders")
}

export  function go(user_id){
    return  request.get("http://localhost:8080/go?user_id="+user_id)
}


export  function del_order(order_id){
    return  request.get("http://localhost:8080/del_order?order_id="+order_id)
}

export  function addfood(cookingpin_name,cookingxi_name,picture,price,introduce){
    return  request.get("http://localhost:8080/addfood?cookingpin_name="+cookingpin_name+"&cookingxi_name="+cookingxi_name
        +"&picture="+picture+"&price="+price+"&introduce="+introduce
    )
}

export  function del_foodpin(id){
    return  request.get("http://localhost:8080/del_foodpin?cookingpin_id="+id)
}

