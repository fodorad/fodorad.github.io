(function($) {
    $body = $('body');
    $menu = $('#menu');
    $themeSwitch = $('#themeSwitch');

    $menu.wrapInner('<div class="inner"></div>');
    $menu._locked = false;

    $menu._lock = function() {
        if ($menu._locked) return false;
        $menu._locked = true;
        window.setTimeout(function() {
            $menu._locked = false;
        }, 350);
        return true;
    };

    $menu._show = function() {
        if ($menu._lock()) $body.addClass('is-menu-visible');
    };

    $menu._hide = function() {
        if ($menu._lock()) $body.removeClass('is-menu-visible');
    };

    $menu._toggle = function() {
        if ($menu._lock()) $body.toggleClass('is-menu-visible');
    };

    function handleThemeSwitch() {
        $body.toggleClass('dark-theme');

        if ($body.hasClass('dark-theme')) {
            $themeSwitch.html('<i class="far fa-sun"></i>');
        } else {
            $themeSwitch.html('<i class="far fa-moon"></i>');
        }

        const currentTheme = $body.hasClass('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    }

    function applyStoredTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            $body.addClass('dark-theme');
            $themeSwitch.html('<i class="far fa-sun"></i>');
        } else {
            $body.removeClass('dark-theme');
            $themeSwitch.html('<i class="far fa-moon"></i>');
        }
    }

    $(document).ready(function () {
        applyStoredTheme();
    });

    $menu
        .appendTo($body)
        .on('click', function(event) {
            event.stopPropagation();
        })
        .on('click', 'a', function(event) {
            var href = $(this).attr('href');
            event.preventDefault();
            event.stopPropagation();
            $menu._hide();
            if (href == '#menu') return;
            window.setTimeout(function() {
                window.location.href = href;
            }, 350);
        })
        .append('<a class="close" href="#menu">Close</a>');

    $body
        .on('click', 'a[href="#menu"]', function(event) {
            event.stopPropagation();
            event.preventDefault();
            $menu._toggle();
        })
        .on('click', function(event) {
            $menu._hide();
        })
        .on('keydown', function(event) {
            if (event.keyCode == 27) $menu._hide();
        });

    $themeSwitch.on('click', function() {
        handleThemeSwitch();
    });
    
    $('#menu-header')
        .on('click', 'a[href="#menu"]', function(event) {
            event.stopPropagation();
            event.preventDefault();
            $menu._toggle();
        });

})(jQuery);
