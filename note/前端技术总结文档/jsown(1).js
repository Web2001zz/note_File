/*添加预加载函数*/
function addLoadEvent(func) {
    var oldonload=window.onload;
    if(typeof window.onload!=="function"){
        window.onload=func;
    }else {
        window.onload=function () {
            oldonload();
            func();
        }
    }
}
/*在已有元素后面插入元素*/
function insertAfter(newElement,targetElement) {
    var parent=targetElement.parentNode;
    if(parent.lastChild===targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
/*增加class*/
function addClass(cla,value) {
    if(!cla.className){
        cla.className=value;
    }else{
        cla.classList.add(value);
    }
}
/*删除class*/
function removeClass(cla,value) {
    if(!cla.className){

    }else{
        cla.classList.remove(value);
    }
}
/*跨浏览器事件*/
var EventUtil={
    /*增加侦听事件*/
    addHandler:function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false)
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    /*获取事件的引用*/
    getEvent:function (e) {
        return event ? event : window.event;
    },
    /*获取事件目标*/
    getTarget:function (e) {
        return e.target || e.srcElement;
    },
    /*阻止默认事件*/
    preventDefault:function (e) {
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue=false;
        }
    },
    /*移除侦听事件*/
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent(type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    /*阻止冒泡事件*/
    stopPropagation:function (e) {
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
    },
    /*设置IE鼠标按键兼容，不用调用即可生效*/
    setButton:function (e) {
        if(document.implementation.hasFeature("MouseEvents","2.0")){

        }else{
            switch (e.button){
                case 1:
                    e.button=0;
                    break;
                case 4:
                    e.button=1;
                    break;
                case 2:
                    e.button=2;
                    break;
            }
        }
    },
    /*设置浏览滚轮事件兼容兼容，不用调用即可生效*/
    getdetail:function (e) {
        if(e.wheelDelta){
            return e.wheelDelta=e.wheelDelta/120;
        }else{
            return e.detail=-e.detail/3;
        }
    },
    /*设置获取浏览器按键码兼容*/
    getCharCode:function (e) {
        if(typeof e.charCode === "number"){
            return e.charCode;
        }else {
            return e.keyCode;
        }
    }
};



