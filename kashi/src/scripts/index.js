"use strict";
/*
* Regex for Japanese
* Kanji: [\u3005\u4e00-\u9faf]
* Hiragana: [\u3040-\u309f]
* */
var SWITCH = ['▲', '▼'];
var TOGGLE = ['0', '-'];
var HAMBURGER = 'Ξ';
var INDEX = 'src/lyrics.json';
var DIRECTORY = 'src/lyrics/';
var $content = $('#content');
var $toc = $('#toc');
var selected = '';
var kashi;
$.getJSON(INDEX).done(function (data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var line = data_1[_i];
        $toc.prepend(item(line, DIRECTORY + line + '.html'));
    }
});
$('#switch').text(SWITCH[0]).on('click', function () {
    if (!kashi)
        return;
    kashi.switch();
    this.innerText = SWITCH[+kashi.isSwitched];
});
$('#toggle').text(TOGGLE[0]).on('click', function () {
    if (!kashi)
        return;
    kashi.toggle();
    this.innerText = TOGGLE[+kashi.isToggled];
});
$('#hamburger').text(HAMBURGER).on('click', function () { return document.body.classList.toggle(HTMLClass.HideContent); });
//# sourceMappingURL=index.js.map