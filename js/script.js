
$(document).ready(function(){
	
	var email_val = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i; 
	var mail = $('.mars-form__input__email');
	
	var monthSelect = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	
	var statM = ['женат', 'в "гражданском браке"', 'разведён', 'холост', 'вдовец'];
	var statW = ['замужем', 'в "гражданском браке"', 'разведена', 'не замужем', 'вдова'];

	var ageBool = false;

	$('.mars-form__footer__button').prop('disabled', true); //кнопка не активна

	$('.mars-form__input__phone').mask('+7 (999) 999-99-99'); //маска для телефона
		
	mail.blur(function() { //валидация e-mail
		if (mail.val() != '') {
			if (mail.val().search(email_val) == 0) {
				mail.removeClass('error');
			}
			else {
				mail.addClass('error');
			}
		}
		else {
			mail.addClass('error');
		}
	});
	
	for (var i = 1; i <= 31; i++) { //дни
		$('.mars-form__day').append('<option>' + i + '</option>');
	}
	
	for (var j = 0; j < 12; j++) { //месяцы
		var v = j+1;
		$('.mars-form__month').append('<option value="'+v+'">' + monthSelect[j] + '</option>');
	}
	
	for (var y = 2016; y > 1900; y--) { //годы
		$('.mars-form__year').append('<option>' + y + '</option>');
	}

	for(var s = 0; s < 5; s++) { //семейный статус
		$('.mars-form__family-status').append('<option>' + statM[s] + '</option>');
	}

	$('.lastname').liTranslit({ //фамилия латиницей
		elAlias: $('.lastnamelat'),
		reg:'"_" = " ", А" = "A", "Б" = "B", "В" = "V", "Г" = "G", "Д" = "D", "Е" = "E", "Ё" = "Jo", "Ж" = "Zh", "З" = "Z", "И" = "I", "Й" = "J", "К" = "K", "Л" = "L", "М" = "M", "Н" = "N", "О" = "O", "П" = "P", "Р" = "R", "С" = "S", "Т" = "T", "У" = "U", "Ф" = "F", "Х" = "H", "Ц" = "C", "Ч" = "Ch", "Ш" = "Sh", "Щ" = "Sch", "Ъ" = "", "Ы" = "Y", "Ь" = "", "Э" = "E", "Ю" = "Ju", "Я" = "Ja"',
		caseType: 'inherit'
	});
	
	$('.firstname').liTranslit({ //имя латиницей
		elAlias: $('.firstnamelat'),
		reg:'" " = " ","А" = "A", "Б" = "B", "В" = "V", "Г" = "G", "Д" = "D", "Е" = "E", "Ё" = "Jo", "Ж" = "Zh", "З" = "Z", "И" = "I", "Й" = "J", "К" = "K", "Л" = "L", "М" = "M", "Н" = "N", "О" = "O", "П" = "P", "Р" = "R", "С" = "S", "Т" = "T", "У" = "U", "Ф" = "F", "Х" = "H", "Ц" = "C", "Ч" = "Ch", "Ш" = "Sh", "Щ" = "Sch", "Ъ" = "", "Ы" = "Y", "Ь" = "", "Э" = "E", "Ю" = "Ju", "Я" = "Ja"',
		caseType: 'inherit'
	});
	
	$('.mars-form__early').click(function() { //прежняя фамилия
		if ($('#check-early-change').is(':checked')) {
		$('.mars-form__hidden').fadeIn(400, 'swing', function(){
				$('.mars-form__hidden').show();
			});
		}
		else {
			$('.mars-form__hidden').fadeOut(400, 'swing', function(){
				$('.mars-form__hidden').hide();
			});
		}
	});

	$('.mars-form__check-sex').click(function() { //вывод значений для селекта "семейный статус"
		if ($('#sex').is(':checked')) {
			$('.mars-form__family-status').html('<option selected="selected"> </option>');
			for(var s = 0; s < 5; s++) {
				$('.mars-form__family-status').append('<option>' + statW[s] + '</option>');
			}
		}
		else {
			$('.mars-form__family-status').html('<option selected="selected"> </option>');
			for(var s = 0; s < 5; s++) {
				$('.mars-form__family-status').append('<option>' + statM[s] + '</option>');
			}
		}
	});

	function ageF() {
		var age = 0;
		var day = $('.mars-form__day option:selected').text();
		var month = $('.mars-form__month option:selected').val();
		var year = $('.mars-form__year option:selected').text();

		var dateBirth = year + '/' + month + '/' + day;
		if (day != " " && month != " " && year != " ") {
			age = ((new Date().getTime() - new Date(dateBirth)) / (24 * 3600 * 365.25 * 1000)) | 0;
		}
		if (age >= 90) {
			$('.mars-form__no-valid-day').addClass('mars-form__valid-day');
			$('.mars-form__no-valid-text').addClass('mars-form__valid-day-text');
		}
		else {
			$('.mars-form__no-valid-day').removeClass('mars-form__valid-day');
			$('.mars-form__no-valid-text').removeClass('mars-form__valid-day-text');
			ageBool = true;
		}
	};

	$('.mars-form__day').on('change', ageF);
	$('.mars-form__month').on('change', ageF);
	$('.mars-form__year').on('change', ageF); 

	$('.middlename').blur(function() {
		if($('.middlename').val() != '') {
			$('.mars-form__middlename-valid').hide();
		}
		else {
			$('.mars-form__middlename-valid').show();
		}
	});

	function buttonEnabled() {
		if ($('.lastname').val() != "" &&  $('.firstname').val() != "" && $('.lastnamelat').val() != "" && $('.firstnamelat').val() != "" && ageBool == true && $('.mars-form__family-status').val() != "" && $('.mars-form__education').val() != "" && $('.mars-form__input__phone').val() != "" && $('.mars-form__input__email').val() != "") {
			$('.mars-form__footer__button').prop('disabled', false);
		}
		else {
			$('.mars-form__footer__button').prop('disabled', true);
		}
	}

	$('.lastname').on('change', buttonEnabled);
	$('.firstname').on('change', buttonEnabled);
	$('.lastnamelat').on('change', buttonEnabled);
	$('.firstnamelat').on('change', buttonEnabled);
	$('.mars-form__education').on('change', buttonEnabled);
	$('.mars-form__family-status').on('change', buttonEnabled);
	$('.mars-form__input__phone').on('change', buttonEnabled);
	$('.mars-form__input__email').on('change', buttonEnabled);
	$('#check-ok').on('click', buttonEnabled);

	
	$('form.mars-form').submit(function(e){ //отправка формы
		e.preventDefault();
		var form = $(this);
		var lastname = $(".lastname").val();
		var prevname = $(".prevname").val();
		var firstname = $(".firstname").val();
		var middlename = $(".middlename").val();
		var lastnamelat = $(".lastnamelat").val();
		var firstnamelat = $(".firstnamelat").val();
		var marsform__day = $(".mars-form__day").val();
		var marsform__month = $(".mars-form__month").val();
		var marsform__year = $(".mars-form__year").val();
		var date = marsform__day + " " + monthSelect[marsform__month-1] + " " + marsform__year;
		if ($('#sex').is(':checked')) {
			var sex = "женский";
		}
		else {
			var sex = "мужской"; 
		};
		var familystatus = $(".mars-form__family-status").val();
		var education = $(".mars-form__education").val();
		var phone = $(".mars-form__input__phone").val();
		var email = $(".mars-form__input__email").val();

		var param = "p1=" + lastname + "&p2=" + prevname + "&p3=" + firstname + "&p4=" + middlename + "&p5=" + lastnamelat + "&p6=" + firstnamelat + "&p7=" +  date + "&p8=" + sex + "&p9=" + familystatus + "&p10=" + education + "&p11=" + phone + "&p12=" + email;

		$.ajax({
  			type:     "GET",
  			url:      "https://script.google.com/macros/s/AKfycbyyS2umukUDGtqy5HEWrn7yJJAPLrx3ZfbFiIVeFL9Uqve7138/exec?"+param,
  			dataType: "jsonp",
  			
		});
		form.html('<h4>Спасибо!</h4><p>Форма отправлена.</p>'); 
	});

});