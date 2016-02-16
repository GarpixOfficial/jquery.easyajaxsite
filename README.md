Easy Ajax Site (English)
========================

The easiest way to make a website with support for downloading pages without reloading the entire site.


Easy Ajax Site (Русский)
========================

Описание
--------

Этот плагин позволяет очень просто и быстро организовать ajax-сайт.
Предназначен в первую очередь для новичков в веб, т.к. организация ajax-сайта таким способом использует лишние ресурсы. С другой стороны, если вам необходимо сделать это в кратчайшие сроки и без лишней головной боли, то это будет лучшим решением. Плагин можно использовать на любой CMS или движке, независимо от бекенда.
Для использования плагина требуется jQuery.

Демо
----

Смотри на тестовом сайте. В данном случае, в качестве бекенда используется простой html.

http://demo.garpix.com/jquery.easyajaxsite/index.html

Использование
-------------

Подключите jQuery и jquery.easyajaxsite.js на вашем сайте:

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="jquery.easyajaxsite.js"></script>

Затем, после подключения, вызовите следующую функцию, например, так:

    <script>
        easyAjaxSite({
        	updateHtml: ['.content1', '#content2'],
        	reloadScripts: ['/js/myscript.js'],
        	onBefore: function(url) { return true; },
        	onAfter: function(data) { return true; },
        	onError: function() { alert('Loading page fails.'); return true; },
        	animation: 'fade',
            animationDuration: 500,
    	});
    </script>

Все, теперь ваш сайт работает и по ajax и без него.

Опции
-----

    updateHtml - массив селекторов, по которым будут выбираться блоки, которые необходимо заменять. Например, ".content1" выберет <div class="content1">...</div>. По умолчанию - ["#content"].
    reloadScripts - загружает и выполняет файл со скриптами повторно. По умолчанию отсутствует.
    onBefore - функция, которая выполнится перед переходом на другую страницу. По умолчанию отсутствует. Если здесь вернуть false, то загрузка выполнена не будет.
    onAfter - функция, которая выполнится после перехода на другую страницу. По умолчанию отсутствует.
    onError - функция, которая выполнится при ошибке загрузки контента.
    animation - анимация перехода между страниами. По умолчанию "none". Варианты: "fade", "none".
    animationDuration - время в миллисекундах, за которое будет скрыт прошлый блок и показан новый.

Поддержка
---------

Если вы нашли ошибку или у вас есть предложение по усовершенствованию плагина, пишите на почту info@garpix.com.

Changelog
=========

1.0.1
- Fixed bug with different jQuery version.

1.0.0
- Init.