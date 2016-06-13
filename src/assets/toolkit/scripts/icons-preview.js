$(function () {
    var displayIconsPreview = window.getComputedStyle(document.body, '::after');
    displayIconsPreview = displayIconsPreview.content;

    console.log('ihatethis');
    console.log(displayIconsPreview);
    console.log((displayIconsPreview.toString()) == "true".toString());
    if (true) { // put in a proper condition
      console.log('dupa');
        var iconsList = window.getComputedStyle(document.body, '::before');
        iconsList = iconsList.content.slice(0, -1).split(",");
        var html = '<div class="icon-preview"><ol>';

        for (var i = 1; i < iconsList.length; i++) {
            html += '<li><i class="icon-' + iconsList[i].trim() + '"> icon-' + iconsList[i]
            + '<svg class="icon">'
            + '<use xlink:href="assets/toolkit/svgIcons/svgIcons.svg#'+iconsList[i].trim().substring(0, iconsList[i].trim().indexOf("--"))+'" />'
            + '</svg>'
            + '</i></li>'

        }


        html += '</ol></div>';
        $('.icons-preview__container').append(html);
    }
});
