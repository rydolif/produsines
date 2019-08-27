$(function() {


$('.tabs_open').click(function() {
  $('#tabs').toggleClass('calculation__wrap--active');
  $('.tabs-list').addClass('tabs-list__opacity');
});
$('.tabs_close').click(function() {
  $('.services-tab__wrap').removeClass('services-tab__wrap--active');
});

//--------------------calculation-tab---------------------------
  $('.services-tabs').tabslet({
    animation: true,
    controls: {
      prev: '.services-tabs__prev',
      next: '.services-tabs__next'
    }
  });


  $('.team-tabs').tabslet({
    animation: true,
  });

  function serviceCount() {

    var count = $('.services-tabs .tabs-list li').length;
    var current = $('.services-tabs .tabs-list li.active').index() + 1;

    $('.count').text(count);
    // $('.current').text(current);

  }
  
  serviceCount();

  $('.services-tabs__prev').click(function(event) {
    serviceCount();
  });

  $('.services-tabs__next').click(function(event) {
    serviceCount();
  });

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------отправка инпутов-------------------------------------------

  $( "#services-tab-1 input" ).on( "click", function() {
    $( "#base" ).val( $( ".answer-one:checked" ).val());
    $( "#services-tab-1 a" ).removeClass('disabled');
  });

  $( "#input1 input" ).on( "click", function() {
    $( "#input-1" ).val( $( ".input1:checked" ).val());
    $( "#services-tab-2 a" ).removeClass('disabled');
  });
  $( "#input2 input" ).on( "click", function() {
    $( "#input-2" ).val( $( ".input2:checked" ).val());
    $( "#services-tab-2 a" ).removeClass('disabled');
  });
  $( "#input3 input" ).on( "click", function() {
    $( "#input-3" ).val( $( ".input3:checked" ).val());
    $( "#services-tab-2 a" ).removeClass('disabled');
  });
  $( "#input4 input" ).on( "click", function() {
    $( "#input-4" ).val( $( ".input4:checked" ).val());
    $( "#services-tab-2 a" ).removeClass('disabled');
  });

  $( "#services-tab-3 input" ).on( "click", function() {
    $( "#basethree" ).val( $( ".answer-three:checked" ).val());
    $( "#services-tab-3 a" ).removeClass('disabled');
  });
  $( "#services-tab-4 input" ).on( "click", function() {
    $( "#basefour" ).val( $( ".answer-four:checked" ).val());
    $( "#services-tab-4 a" ).removeClass('disabled');
  });

//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('+0 (000) 000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
        content: "Введите Ваш вапрос",
        sity: "Введите Ваш город",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          content: jQuery('.form-' + index).find("textarea[name=content]").val(),
          sity: jQuery('.form-' + index).find("textarea[name=sity]").val(),

          baseone: jQuery('.form-' + index).find("input[name=baseone]").val(),
          basethree: jQuery('.form-' + index).find("input[name=basethree]").val(),
          basefour: jQuery('.form-' + index).find("input[name=basefour]").val(),

          inputone: jQuery('.form-' + index).find("input[name=input-one]").val(),
          inputtwo: jQuery('.form-' + index).find("input[name=input-two]").val(),
          inputthree: jQuery('.form-' + index).find("input[name=input-three]").val(),
          inputfour: jQuery('.form-' + index).find("input[name=input-four]").val(),
         
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  $(".form--order").each(function(index, el) {
    $(el).addClass('form--order' + index);

    $('.form--order' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
        content: "Введите Ваш вапрос"
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form--order' + index).find("input[name=name]").val(),
          phone: jQuery('.form--order' + index).find("input[name=phone]").val(),
          content: jQuery('.form--order' + index).find("textarea[name=content]").val(),

          baseone: jQuery('.form--order' + index).find("input[name=baseone]").val(),
          basetwo: jQuery('.form--order' + index).find("input[name=basetwo]").val(),
          basethree: jQuery('.form--order' + index).find("input[name=basethree]").val(),
          basefour: jQuery('.form--order' + index).find("input[name=basefour]").val(),
         
          subject: jQuery('.form--order' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form--order' + index, t);
        Send('.form--order' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

  function Send(formName, data) {
    $.ajax({
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/172905/test.pdf',
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = 'myfile.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    });
  };

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header--active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header--active');
      }
  });

  if($(this).scrollTop()>20){
      $('.header').addClass('header--active');
  }

  $(".click").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 120}, 1000);
  });

  $(".click--tab").on("click","a", function (event) {
      event.preventDefault();
  });
});