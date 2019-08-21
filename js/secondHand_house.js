//价格范围显示
var showScope=document.querySelectorAll('div.screen div p.scope input');
for(var i=0;i<showScope.length;i++){
  showScope[i].addEventListener('click',function(){
    $(this).siblings('button').addClass('active');
  })
};
$(window).mousedown(function(e){
  var screen=$('div.screen');
  if($(e.target)!=screen&&$(e.target).parents('.screen').length==0){
    screen.find('button').removeClass('active')
  }
});
//展开筛选
$('div.showScreen p.show').click(function(){
  $('div.screen').toggleClass('active');
  $(this).parents('.showScreen').toggleClass('showScreenActive');
})
//右侧sideBar移入移出
$('div.houseList-right div.sideBar ul').on('mouseenter','li',function(){
  $(this).addClass('active').siblings('.active').removeClass('active');
});
$('div.houseList-left div.houseList-main > div').hover(function(){
  $(this).find('p.comparison').addClass('active');
},function(){
  $(this).find('p.comparison').removeClass('active');
});
//分页
var lis=$('div.tab ul.tab-page li');
for(var i=0;i<lis.length;i++){
  $(lis[i]).click(function(e){
    e.preventDefault();
    var nowi=document.querySelector('div.tab ul.tab-page li.active');
    var $nowi=$(nowi);
    var nowV=nowi.firstElementChild.innerHTML;
    var nowNext=nowi.nextElementSibling.firstElementChild.innerHTML;
    var nowPrev=nowi.previousElementSibling.firstElementChild.innerHTML;
    var no=lis.index(this);
    //当前active的对象在lis里面的坐标
    var i=lis.index(nowi);
    if(this==lis[lis.length-1]){
      $nowi.removeClass('active');
          //如果当前active是534的时候直接535激活
          if(i>=lis.length-3){
            //如果下一页的html是有效数字时执行
              $(lis[lis.length-2]).addClass('active');
          }
          else{
            nowV++;
            $(lis[nowV]).addClass('active');
            pageAdd(nowi,lis);
          }
    }
    else if(this==lis[0]){
      $(lis[i]).removeClass('active');
      if(lis.index(nowi)>=lis.length-3){
        //如果下一页的html是有效数字时执行
        $(lis[lis.length-3]).addClass('active');
      }else{
        if(nowV>1){
          nowV--;
        }
        $(lis[nowV]).addClass('active');
        pageRemove(nowi,lis)
      }
    }
    else{
        $nowi.removeClass('active');
        $(this).addClass('active');
    }
  })
}
function pageAdd(nowi,lis){
  var no=lis.index(nowi);
    if(no==4){
      $(nowi).addClass('active').siblings().removeClass('active');
      for(var i=1;i<=4;i++){
        var value=$(lis[i]).children('a:first-child').html();
        value++;
        $(lis[i]).children('a:first-child').html(value);
      }
    }
}
function pageRemove(nowi,lis){
  var no=lis.index(nowi);
  if(no==2){
    $(nowi).addClass('active').siblings().removeClass('active');
    for(var i=1;i<=4;i++){
      var value=$(lis[i]).children('a:first-child').html();
      if(value>2){
      value--
      };
      $(lis[i]).children('a:first-child').html(value);
    }
  }
}
//底部
$('#fixed-top').on('mouseenter','i',function(){
  var b=$(this).children('b');
  b.css('display','block');
  setTimeout(function(){
    b.css({
      'opacity':'1',
      'right':'40px'
    });
  },100)
});
$('#fixed-top').on('mouseleave','i',function(){
  var b=$(this).children('b');
  b.css('display','none');
  setTimeout(function(){
    b.css({
      'opacity':'0',
      'right':'62px'
    });
  },100)
});
$('#fixed-top i:last-child').click(function(){
  $('html,body').animate({
    scrollTop:'0'
  },800)
});
$('.friendLink ul li a').mouseenter(function(e){
  e.preventDefault();
  var div=$($(e.target).attr('href'));
  $(e.target).addClass('active').parent().siblings('li').children('a').removeClass('active');
  div.addClass('active').siblings().removeClass('active');
});
$(function(){
  $(window).scroll(function(){
    var scroll=$(window).scrollTop();
    var main=$('div.houseList-left div.houseList-main > div').offset().top;
    var fixed=$('#fixed-top i');
    if(scroll>main-300){
      var header=$('.header-top');
      fixed.addClass('show');
    }
    else if(scroll<main-300){
      fixed.removeClass('show');
    }
  })
})
