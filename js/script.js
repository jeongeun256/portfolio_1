$(document).ready(function () {
    AOS.init({ duration: 1200, once: false });

    // href="#" 클릭 시 상단 이동 방지 글로벌 제어
    $(document).on('click', 'a[href="#"]', function (e) {
        e.preventDefault();
    });

    // GNB 제어 스크립트
    function toggleMenu() {
        $('#hamburger-btn').toggleClass('is-active');
        $('.mobile-gnb').toggleClass('active');
        $('.gnb-overlay').fadeToggle();
        $('body').toggleClass('overflow-hidden');
    }

    $('#hamburger-btn').on('click', toggleMenu);
    $('.gnb-overlay, .mobile-gnb .nav-link').on('click', toggleMenu);

    // 로고 및 GNB 메뉴 부드러운 스크롤
    $('.nav-link, .navbar-brand a').on('click', function (e) {
        const href = $(this).attr('href');

        // 1. 최상단 이동 (로고 클릭 혹은 '#'인 경우)
        if (href === '#' || href === 'index.html' || href === '') {
            e.preventDefault();
            $('html, body').stop().animate({ scrollTop: 0 }, 800, 'swing');
        }
        // 2. 특정 섹션 이동
        else if (href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                const targetOffset = target.offset().top - 80;
                $('html, body').stop().animate({ scrollTop: targetOffset }, 800, 'swing');
            }
        }
    });


    // 상단 배너 & 스크롤 헤더 제어
    $(window).scroll(function () {
        const scroll = $(window).scrollTop();
        if (scroll > 40) {
            $('#top-banner').css('transform', 'translateY(-100%)');
            $('.navbar').addClass('scrolled').css('top', '0');
        } else {
            $('#top-banner').css('transform', 'translateY(0)');
            $('.navbar').removeClass('scrolled').css('top', '40px');
        }
    });

    gsap.registerPlugin(ScrollTrigger);

    // AOS 초기화: 0.8초 -> 1.0초로 늘려 부드러움 강조
    AOS.init({ duration: 1000, once: false });

    // GSAP: 원형 텍스트 무한 회전 (60초로 더 천천히)
    gsap.to(".circular-decor", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
    });

    // GSAP: 그리드 아이템 양방향 스크롤 애니메이션
    // toggleActions: "play reverse play reverse"
    // 1. play: 트리거 영역에 진입할 때 (스크롤 내릴 때)
    // 2. reverse: 트리거 영역을 완전히 벗어날 때 (스크롤 내릴 때) -> 여기서는 'none' 추천
    // 3. play: 다시 트리거 영역에 진입할 때 (스크롤 올릴 때)
    // 4. reverse: 시작 트리거 지점 위로 올라갈 때 (역스크롤 시) -> 이 기능이 핵심!

    gsap.utils.toArray(".grid-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%", // 요소 상단이 화면 하단 90% 지점에 닿을 때 시작
                end: "top 10%",   // 요소 상단이 화면 상단 10% 지점에 닿을 때 끝
                toggleActions: "play none none reverse", // 내릴 때 재생, 올릴 때 반전
                // markers: true, // 디버깅용 (필요시 주석 해제)
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    $(window).scroll(function () {
        const scroll = $(window).scrollTop();
        if (scroll > 40) {
            $('.navbar').addClass('scrolled').css('top', '0');
        } else {
            $('.navbar').removeClass('scrolled').css('top', '40px');
        }
    });


    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".circular-decor", { rotation: 360, duration: 60, repeat: -1, ease: "none" });



    // Visual 02 스크롤 애니메이션 추가
    // 각 컬럼과 버튼 세트가 시차를 두고 등장
    const v02Targets = [
        ".v02-col-shorts",
        ".shorts-btn-wrap",
        ".v02-col-detail .v02-img-box",
        ".detail-btn-wrap",
        ".banner-btn-wrap",
        ".v02-col-banner .v02-img-box"
    ];

    v02Targets.forEach((target, i) => {
        gsap.from(target, {
            scrollTrigger: {
                trigger: target,
                start: "top 92%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1, // 시차 효과
            ease: "power2.out"
        });
    });

    // profile 아코디언 기능
    $('.p03-acc-header').on('click', function () {
        const item = $(this).parent('.p03-accordion-item');
        if (item.hasClass('active')) { item.removeClass('active'); }
        else { $('.p03-accordion-item').removeClass('active'); item.addClass('active'); }
    });

    //profile 애니메이션 셀렉터 변경
    gsap.utils.toArray(".grid-item, .p03-image-box, .p03-info-text, .p03-accordion-item").forEach((item) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 95%", toggleActions: "play none none reverse" },
            y: 30, opacity: 0, duration: 1, ease: "power3.out"
        });
    });
});