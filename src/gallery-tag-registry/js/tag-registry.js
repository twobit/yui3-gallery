var REGISTRY = [
    'ytemplate',
    'ybutton',
    'ydial',
    'yautocomplete',
    'ycalendar',
    'ychart',
    'yoverlay',
    'yapp'
];

Y.Array.each(REGISTRY, function(tag) {
    Y.Tag.register(tag);
});