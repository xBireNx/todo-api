var description = document.getElementById('description');
var todo = document.getElementById('todo');
var btn = document.getElementById('btn');
var url = 'https://crudcrud.com/api/f560e628d34b48eba47e1c06c27898dc/AppoinmentData'

//fetching the data from the server 
axios
.get(url)
.then((res)=>{
    let data = res.data;
    for(let i=0; i<data.length;i++){
        let name1 = data[i].name;
        let des = data[i].des;
        let id = data[i]._id;
        createList(name1, des, id); // Pass the id to createList
    }
    console.log(res);
}).catch(err=>console.log(err))

// Delete element from the list
function removeing(button, lisam, li, id){
    button.addEventListener('click',(e)=>{
        lisam.removeChild(li);
        axios
        .delete(url+'/'+id)
        .then((res)=>{
            li.remove();
        })
        .catch(err=>console.log(err))
    });
}

function createList(name, des, id){
    var li = document.createElement('li');
    var check = document.createElement('input');
    var delbtn = document.createElement('button'); 
    var list1 = document.getElementById('odlist1');
    var list2 = document.getElementById('odlist2');
    check.setAttribute('type','checkbox');
    delbtn.innerHTML = 'X';
    li.innerHTML = name + '-' + des;
    list1.appendChild(li);
    li.appendChild(check);
    li.appendChild(delbtn);

    removeing(delbtn, list1, li, id);

    check.addEventListener('click',(e)=>{
        list2.appendChild(li)
        removeing(delbtn,list1,li,id);
        removeing(delbtn,list2,li,id)

    });
}

btn.addEventListener('click',(e)=>{
    var desval = description.value;
    var toname = todo.value;
    var obj = {
        name: toname,
        des: desval
    };    
    //posting the data to the server
    axios
        .post(url, obj)
        .then((res)=>{
            console.log(res);
            let name = res.data.name;
            let des = res.data.des;
            let id = res.data._id; // Get the id from the response
            createList(name, des, id); // Pass the id to createList
        })
        .catch(err=>console.log(err))
});
