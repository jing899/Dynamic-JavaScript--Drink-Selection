//Get data from data js file
data.back; 

//Attributes
var choose=[];
var selectList;
var array
var first=true;
var second=true;
var third=true;
var get=null;
var checkEmpty;

function init(){

    // load background image
    document.body.style.background = 'url(assets/css/back.jpg)';
    document.body.style.backgroundSize = 'cover';

    // ask the user to enter their name
    // if the user hit cancel, set user name as friend
    if(GetCookie('user_name')==null){
        var userName = prompt("Hi, please enter your name!");		
        while(userName==''){
            userName=prompt("Please enter your name!");
        }
        if(userName==null){
            userName="Friend";
        }
        SetCookie('user_name',userName);	
    }
    else{
        userName=GetCookie('user_name',userName);		
    }

    var getResult="Welcome ! "+userName;

    checkEmpty=data[Object.keys(data)[0]][1];
    //Get the local storage if it not null, and it work only for brower with support the localstorage.
    if( typeof( window.localStorage) !== "undefined" ){
        if(localStorage.getItem("choose")){
            get = localStorage.getItem("choose");
            if(get!=null){
                array = JSON.parse(get);
            }
        }
    }

    // Create heading using the user name
    var main = document.getElementById("main");
    var head = document.createElement('h1');
    var headtext = document.createTextNode(getResult);
    head.appendChild(headtext);
    main.appendChild(head);

    // Create the first select
    var question = document.createElement('h4');
    var text = document.createTextNode(data[Choices][0]);
    question.appendChild(text);
    main.appendChild(question);
    selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    selectList.setAttribute("onchange", "getSecondStep(mySelect.value)");
    main.appendChild(selectList);
    OptionList(Choices);

    //Store first select from user to local storage
    if(get!=null && array.length>0 && first==true){
        document.getElementById("mySelect").value=array[0];
        getSecondStep(array[0]);
        first=false;
    }
} // end init

//Create a second select list
function getSecondStep(test){	
    RemoveList(1);
    ToStore(mySelect.value)
    console.log(test);
    if(test!=checkEmpty){
        var question=document.createElement('h4');
        var text=document.createTextNode(data[test][0]);
        question.appendChild(text);
        main.appendChild(question);	
        selectList = document.createElement("select");
        selectList.setAttribute("id", "mySelect1");
        selectList.setAttribute("onchange","lastStep(mySelect1.value)");
        main.appendChild(selectList);
        OptionList(test);

        //Store second select from user to local storage
        if(get!=null && array.length>1 && second==true){
            document.getElementById("mySelect1").value=array[1];
            lastStep(array[1]);
            second=false;
        }
    }
} // end getSecondStep

//Create third select list
function lastStep(test){
    RemoveList(2);
    ToStore(mySelect1.value)
    // console.log(test);
    if(test!=checkEmpty){
        var question=document.createElement('h4');
        var text=document.createTextNode(data[test][0]);
        question.appendChild(text);
        main.appendChild(question);	
        selectList = document.createElement("select");
        selectList.setAttribute("id", "mySelect2");
        selectList.setAttribute("onchange","ToStore(mySelect2.value)");
        main.appendChild(selectList);
        OptionList(test);
        //Store third select from user to local storage
        if(get!=null && array.length>2 && third==true){
            document.getElementById("mySelect2").value=array[2];
            ToStore(array[2]);
            third=false;
        }
    }
} // end lastStep

//Create option list.
function OptionList(test){
    for (var i = 1; i < data[test].length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", data[test][i]);
        option.text = data[test][i]	;
        selectList.appendChild(option);
    }	
} // end OptionList

// it will remove select list when user changing select.
function RemoveList(x){
    var RemoveSelects=document.getElementsByTagName('select');
    var RemoveHead=document.getElementsByTagName('h4');
    var len=RemoveSelects.length;	
    if(x<len){
        for(var i=len-1; i>=x; i--){
            main.removeChild(RemoveSelects[i]);	
            main.removeChild(RemoveHead[i]);
        }
    }
} // end RemoveList

//Store user select to array.
function ToStore(x){
    var Selects=document.getElementsByTagName('select');
    var len=Selects.length;
    var arrlen=choose.length;	
    var RemoveChooce=document.getElementById('choose');
    var RemoveImage=document.getElementById('image');
    if(x!=checkEmpty){
        choose.push(x);
    }
    if(len==1 && arrlen>0){
        choose.splice(0,arrlen);
    }
    if(len==2 && arrlen>1){
        choose.splice(1,arrlen-1);
    }
    if(len==3 && arrlen>2){
        choose.splice(2,1);
        if (RemoveChooce!=null){
            main.removeChild(RemoveChooce);
            main.removeChild(RemoveImage);
        }
    }
    if(choose.length ==3)
    {
        output();
    }
    else
    {
        if (RemoveChooce!=null &&len!=3){
            main.removeChild(RemoveChooce);
            main.removeChild(RemoveImage);
        }
    }
    if(window.localStorage){
        localStorage.setItem("choose", JSON.stringify(choose));
    }
} // end ToStore

//Show out the word and image of which user order.
function output(){
    var question=document.createElement('p');
    question.setAttribute('id','choose');
    var text=document.createTextNode("Here is your choice: ");
    question.appendChild(text);
    var text=document.createTextNode(choose[0]+" , "+choose[1]+" , "+choose[2]);
    question.appendChild(text);
    main.appendChild(question);
    var imgEle=document.createElement('img');
    imgEle.setAttribute('id','image');
    imgEle.setAttribute('src','assets/image/'+choose[2]+'.jpg');
    main.appendChild(imgEle);
} // end output

function btnLoad(){
    //Create a button for delete user storage.
    var btn=document.createElement('button');
    btn.setAttribute("id","clearlocal");
    var clear=document.createTextNode("Clear local Storage");
    btn.appendChild(clear);
    btn.setAttribute("onclick","clearIt()");
    var buttons=document.getElementById("buttons");
    buttons.appendChild(btn);

    //Create a button for delete user cookie.
    var btnCook=document.createElement('button');
    btnCook.setAttribute("id","clearcook");
    var clearCook=document.createTextNode("Clear Cookie");
    btnCook.appendChild(clearCook);
    btnCook.setAttribute("onclick","clearCook()");
    buttons.appendChild(btnCook);   
} // end btnLoad
