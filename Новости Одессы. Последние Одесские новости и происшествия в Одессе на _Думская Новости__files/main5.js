var rurl2='';
var rcount2=0;
var ie=0;
var topcount=0;
var nowater=0;

s=navigator.userAgent;
x=s.search(/MSIE/);
if (x!=-1) ie=1;
 
function AJAX(url)
{
 rurl2=url;
    if (window.XMLHttpRequest) {
        req2 = new XMLHttpRequest();
        req2.onreadystatechange = processReqChange2;
        req2.open("GET", url, true);
        req2.send(null);
    } else if (window.ActiveXObject) {
        req2 = new ActiveXObject("Microsoft.XMLHTTP");
        if (req2) {
            req2.onreadystatechange = processReqChange2;
            req2.open("GET", url, true);
            req2.send();
        }
    }
}

 

function processReqChange2()
{
 if (req2.readyState == 4)
 {
  if (req2.status == 200)
   {
    rcount2=0;
    var s=req2.responseText;
    eval(s);
   }
  else
  {
   if (rcount2<10)
    {
     rcount2++;
     AJAX(rurl2);
    } 
  }
 }
}



function g(id)
{
 return document.getElementById(id);
}  

function show(id)
{
 var x=g(id)
 if (x!=null)
  x.style.display='block';
}

function hide(id)
{
 var x=g(id)
 if (x!=null)
  x.style.display='none';
}




function closepopup()
{
// hide("popupback");
 hide("popup");
 hide("close");
 g('popup').style.top="50px";
 g('popup').style.left="200px";
// g('popupback').style.top="50px";
// g('popupback').style.left="200px";
}

function showpopup0(t)
{
 g('popup1').innerHTML=t;
 show('popup');
// show('popupback');
 show('close');
 g('xfirst').focus();
}

function showpopup(t)
{
 window.scroll(0,0);
 showpopup0(t);
}

function showpopup1(t)
{
 showpopup0(t);
}

function submitlogin()
{
 g('loginform').submit();
}



function down()
{
 hide('select');
// show('closeselect');
 show('selectlist');
}

function down1()
{
 hide('selectlist');
// hide('closeselect');
 show('select');
 hide('selectlist2');
 show('select2');

}

function down2()
{
 hide('select2');
// show('closeselect');
 show('selectlist2');
}


function select(value,name)
{
 g('edu').value=value;
 g('value').innerHTML=name;
 down1();
}

function select2(value,name)
{
 g('region').value=value;
 g('value2').innerHTML=name;
 down1();
}


function search()
{
 var t='<div style="padding-left:15px; padding-top:135px;">';
 t+='<form action=/search/// method=gett>';
 t+='<table style="text-align:left;margin:0;">';
 t+='<tr><td style="padding-bottom:0;vertical-align:middle">Я ищу:</td><td style="vertical-align:middle;padding-bottom:0;"><input id=xfirst type=text name=query class=inp17></td>';
 t+='<td style="padding:0;vertical-align:middle"><input type=submit value="Найти!" style="height:27px;width:55px;"></td></tr>';
 t+='</table></form></div>';

 showpopup(t);
}


function rssbox()
{
 var t='<div style="padding-left:150px; padding-top:100px;text-align:left; line-height:2.5;">';
 t+="<a href=/rssnews/><img class=nobo src=/i/rss1-1.gif  alt='RSS-лента новостей'> Новости</a><Br>";
 t+="<a href=/rssarticles/><img class=nobo  src=/i/rss1-1.gif  alt='RSS-лента статей'> Статьи</a><br>";
 t+="<a href=/rsscommunity/><img  class=nobo src=/i/rss1-1.gif  alt='RSS-лента постов'> Посты</a></div>";
 showpopup(t);
}


function addcode(s)
{
 if (ie) tinyMCE.getInstanceById('newpost').focus();
 tinyMCE.activeEditor.selection.setContent(s);
}

function youtube()
{
 var t='<div style="text-align:left;padding-top:65px;padding-left:27px;">';
 t+='Добавление в пост видео с <b>YouTube</b><br><br>Адрес страницы с роликом:<br><Br>';
 t+='<input id=xfirst type=text name=login class=inp17 style="width:300px;">';
 t+='<Br><span style="color:#999;">например,<br> http://www.youtube.com/watch?v=4VaFC6hljfs</span>';
 t+='<br><br><a href=javascript:addyoutube()>Добавить видеоролик</a></form>';
 t+='</div>';

 g('popup').style.top="350px";
// g('popupback').style.top="350px";
 showpopup1(t);
}

function addyoutube()
{ 
 closepopup();
 var x=g('xfirst').value;
 var y=x.indexOf('youtube.com/');
 if (y>0)
 {
  y=x.indexOf('&');
  if (y>5)
   x=x.substring(0,y);
  y=x.indexOf('=');
  x=x.substring(y+1);
  x='<iframe width="640" height="480" src="http://www.youtube.com/embed/'+x+'" frameborder="0" allowfullscreen></iframe>';
 }
 else
 {

 var y=x.indexOf('youtu.be/');
 if (y>0)
 {
  x=x.substring(y+1);
  y=x.indexOf('/');
  x=x.substring(y+1);
  x='<iframe width="640" height="480" src="http://www.youtube.com/embed/'+x+'" frameborder="0" allowfullscreen></iframe>';
}

 }
 x="<div class=youtube>"+x+"</div>";
 addcode(x);
}

function submitpicform()
{
 showloader();
 g('picform').submit();
}


function stoploading()
{
 g('loading').innerHTML='';
 g('xfirst').value='';
}

function picture()
{
 var t='';
 t+='<iframe frameborder=0 style="margin:0;padding:0;width:1px;height:1px;" name=loadpic> </iframe>';
 t+='<div style="text-align:left;padding-left:80px; padding-top:65px;"><b>Добавление картинки</b><br><br><br>';
 t+='<div id=loading>Файл в формате jpeg, gif или png размерами до 500 кб.:</div><br>';
 t+='<form id=picform onsubmit=showloader() target=loadpic action=/useruploadpic/ method=post enctype="multipart/form-data" method=post> <input type=hidden name=MAX_FILE_SIZE value=2000000>'
 t+='<input type=hidden name=nowater value='+nowater+'>';
 t+='<input id=xfirst type=file name=pic class=file300 onchange=submitpicform()><br><br></form>';
 t+='</div>';

//<input type=submit value="Закачать картинку">

// g('popupback').style.top="450px";
 g('popup').style.top="450px";
 showpopup1(t);
}

function showloader()
{
 g('loading').innerHTML='<img src=/i/ajax-loader.gif>';
 return true; 
}


var ie=0;


function kostusev(div) {
}

function getrandom(min,max) 
{
    max++;
    var range = max - min;
    return Math.floor(Math.random()*range) + min;
}

function redir(url)
{
 window.location=url;
}