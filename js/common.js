$(function () {
    $('body').on('click', '.page-scroll a', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 70
        }, 600);
        event.preventDefault();
    });
    if ($(window).width() < 768) {
        $(".navbar-light .nav-link").on('click', function () {
            $(".navbar-toggler").click();
        })
    }
    $(".btn_top").on('click', function () {
        $('html, body').animate({
            scrollTop: $('#header').offset().top - 80
        }, 600);
    })
    var swiper = new Swiper('#cloud_flatform', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.cloud_next',
            prevEl: '.cloud_prev',
        },
        // loop: true,
        observer: true,
        observeParents: true,
    });

    var swiper1 = new Swiper('#ip_flatform', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.ip_next',
            prevEl: '.ip_prev',
        },
        // loop: true,
        observer: true,
        observeParents: true,
    });
    $("a[data-toggle='tab']").on('click', function () {
        swiper.update();
        swiper1.update();
    })
    var swiper2 = new Swiper('#reward_slider', {
        init: false,
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false
        // },
        navigation: {
            nextEl: '.reward_next',
            prevEl: '.reward_prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        // loop: true,
        observer: true,
        observeParents: true,
    });
    const arrReward = document.querySelectorAll('.reward');
    swiper2.on('init', function () {
        arrReward[0].classList.add('active')
    })
    swiper2.init();
    swiper2.on('slideChange', function (el) {
        [].forEach.call(arrReward, function (el) {
            el.className = el.className.replace(/\bactive\b/, "");
        });
        arrReward[swiper2.activeIndex].classList.add('active');
    })

    var swiper3 = new Swiper('#video_slider', {
        loop: true,
        navigation: {
            nextEl: '.video_next',
            prevEl: '.video_prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        on: {
            slideChange: function (el) {
                $('#video_slider .swiper-slide').each(function () {
                    var youtubePlayer = $(this).find('iframe').get(0);
                    if (youtubePlayer) {
                        youtubePlayer.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                    }
                });
            },
        }

    });
})

function isValidEmail(emailText) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailText);
};

function checkPhoneNumber() {
    var flag = false;
    var phone = $('#phone').val().trim(); // ID của trường Số điện thoại
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08' || firstNumber == '03' || firstNumber == '05' || firstNumber == '07') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                flag = true;
            }
        }
    }
    return flag;
}


function kiemtra() {
    if ($('#fullname').val() == "") {
        alert("Vui lòng nhập Họ tên!");
        $('#fullname').focus();
    }
    else if (!checkPhoneNumber()) {
        alert("Số điện thoại bạn điền không hợp lệ !");
        $('#phone').focus();
        return false;
    }
    else if (!isValidEmail($('#email'))) {
        alert("Email bạn điền không hợp lệ !");
        $('#email').focus();
        return false;
    }
    else {
        const phone = $('#phone').val();
        const fullname = $('#fullname').val();
        const email = $('#email').val();
        const company = $('#company').val();
        $.ajax({
            type: "POST",
            url: "api/register.php",
            data: { fullname: fullname, email: email, phone: phone, company: company },
            success: function (data) {
                data = JSON.parse(data);
                if (data.result === "0") {
                    alert("Bạn đã đăng ký rồi");
                }
                else {
                    // window.location.href = "thanks.html";
                    $("#exampleModal").modal();
                }
            }
        });
    }

}

