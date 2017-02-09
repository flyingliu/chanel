$(function () {
  var photoscroll
  var pliLen = $('.photos').find('li').length
  var adtime = 5
  var curpage = 0
  $('.photos ul').width(210 * pliLen * 2)

  $('.maincon').css({ 'background': 'none' })

  var winWidth = $(window).width()
  console.log(winWidth)
  if (winWidth > 1580) {
    $('.myad4').show()
    $('.myad5').show()
  }

  var timer = setInterval(function () {
    adtime--
    if (adtime < 0) {
      $('.myad1').slideUp()
      clearInterval(timer)
    }
  }, 1000)

  $('.adclose').click(function () {
    $(this).parent('div').hide()
  })

  $('.focusnews li').mouseover(function () {
    $(this).addClass('active').siblings().removeClass('active')
  })

  var domdiv = $('.blist')
  var domlist = domdiv.find('ul')
  var domliLen = domdiv.find('li').length
  var liwidth = 90

  domlist.width(domliLen * liwidth)
  domlist.find('li').click(function () {
    var file = $(this).find('img').data('src')
    var image = $(this).find('img').attr('src')
    if (file) {
      var obj = {
        id: 'player',
        image: image,
        file: file

      }

      play(obj)
    }
  })

  domdiv.find('.prev').click(function () {
    if (curpage > 0) {
      curpage--
      domlist.animate({ left: -curpage * liwidth + 24 }, 1000)
    }
  })
  domdiv.find('.next').click(function () {
    if (curpage < domliLen - 3) {
      curpage++
      domlist.animate({ left: -curpage * liwidth + 24 }, 1000)
    }
  })

  $('.blist li').eq(0).trigger('click')

  $('.photos').kxbdMarquee({
    direction: 'left',
    eventA: 'mouseenter',
    eventB: 'mouseleave'
  })
})
