//网站标题控制
let strRouteTitle = "", strSiteTitle = "";

function setTitle(){
    if(!strRouteTitle && !strSiteTitle){
        // console.log('bbddee');
        document.title = "loading";
    }else if(strRouteTitle && !strSiteTitle){
        document.title = strRouteTitle;
    }else if(strSiteTitle && !strRouteTitle){
        document.title = strSiteTitle;
    }else{
        document.title = `${strRouteTitle}-${strSiteTitle}`
    }
}

export default {
    //设置路由标题
    setRouteTitle(title){
        // console.log('设置路由标题',title);
        strRouteTitle = title;
        setTitle();
    },
    //设置网站标题
    setSiteTitle(title){
        // console.log('设置网站标题',title);
        strSiteTitle = title;
        setTitle();
    }
}