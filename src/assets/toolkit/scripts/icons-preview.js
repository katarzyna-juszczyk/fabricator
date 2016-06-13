$(function () {
    var displayIconsPreview = window.getComputedStyle(document.body, '::after');
    displayIconsPreview = displayIconsPreview.content;

    if (true) { // put in a proper condition
        var iconsList = window.getComputedStyle(document.body, '::before');
        iconsList = iconsList.content.slice(0, -1).split(",");
        var html = '<div class="icon-preview"><ol>';

        for (var i = 1; i < iconsList.length; i++) {
            html += '<li><h6>icon-'+iconsList[i]+'</h6>'
            + '<svg class="icon-'+iconsList[i].trim()+'">'
            + '<use xlink:href="assets/toolkit/svgIcons/svgIcons.svg#'+iconsList[i].trim().substring(0, iconsList[i].trim().indexOf("--"))+'" />'
            + '</svg>'
            + '</li>'

        }


        html += '</ol></div>';
        $('.icons-preview__container').append(html);
    }
});
