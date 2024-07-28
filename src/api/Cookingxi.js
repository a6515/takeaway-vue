import request from '@/utils/request.js'
export  function showxi(){
    return  request.get("http://localhost:8080/searchxi")
}

export  function add(name){
    return  request.get("http://localhost:8080/add?name=" + name)
}

export  function del(abc){
    return  request.get("http://localhost:8080/delxi?cookingxi_id=" + abc)
}

export  function edit(name,id){
    return  request.get("http://localhost:8080/edit?name=" + name+"&id="+id)
}

export  function getclass(){            //获取菜系分类
    return  request.get("http://localhost:8080/getclass")
}