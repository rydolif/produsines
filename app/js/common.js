$(function() {






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
  });
  $( "#services-tab-2 input" ).on( "click", function() {
    $( "#basetwo" ).val( $( ".answer-two:checked" ).val());
  });
  $( "#services-tab-3 input" ).on( "click", function() {
    $( "#basethree" ).val( $( ".answer-three:checked" ).val());
  });
  $( "#services-tab-4 input" ).on( "click", function() {
    $( "#basefour" ).val( $( ".answer-four:checked" ).val());
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
        content: "Введите Ваш вапрос"
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          content: jQuery('.form-' + index).find("textarea[name=content]").val(),

          baseone: jQuery('.form-' + index).find("input[name=baseone]").val(),
          basetwo: jQuery('.form-' + index).find("input[name=basetwo]").val(),
          basethree: jQuery('.form-' + index).find("input[name=basethree]").val(),
          basefour: jQuery('.form-' + index).find("input[name=basefour]").val(),
         
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
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

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header--active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header--active');
      }
  });

//-------------------------скорость якоря---------------------------------------
  // $(".header__list").on("click","a", function (event) {
  //     event.preventDefault();
  //     var id  = $(this).attr('href'),
  //         top = $(id).offset().top;
  //     $('body,html').animate({scrollTop: top - 60}, 'slow', 'swing');
  // });

  $(".click").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 120}, 1000);

  });
});