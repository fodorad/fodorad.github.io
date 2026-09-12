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

    /* Paints the switch to match the active theme. The label names the theme
       currently in use, and the icon shows the one you would switch to. */
    function renderThemeSwitch(isDark) {
        $themeSwitch
            .html(isDark
                ? '<i class="far fa-sun" aria-hidden="true"></i><span class="theme-label">Dark</span>'
                : '<i class="far fa-moon" aria-hidden="true"></i><span class="theme-label">Light</span>')
            .attr('aria-pressed', isDark ? 'true' : 'false')
            .attr('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    function handleThemeSwitch() {
        $body.toggleClass('dark-theme');
        const isDark = $body.hasClass('dark-theme');
        renderThemeSwitch(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    function applyStoredTheme() {
        const storedTheme = localStorage.getItem('theme');

        /* Fall back to the operating system preference on a first visit, but
           never override a choice the visitor has already made here. */
        const isDark = storedTheme
            ? storedTheme === 'dark'
            : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        $body.toggleClass('dark-theme', isDark);
        renderThemeSwitch(isDark);
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

    $themeSwitch
        .attr('role', 'button')
        .attr('tabindex', '0')
        .on('click', function() {
            handleThemeSwitch();
        })
        .on('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleThemeSwitch();
            }
        });
    
    $('#menu-header')
        .on('click', 'a[href="#menu"]', function(event) {
            event.stopPropagation();
            event.preventDefault();
            $menu._toggle();
        });

})(jQuery);
