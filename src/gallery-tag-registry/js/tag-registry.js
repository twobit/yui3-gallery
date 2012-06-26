var REGISTRY = [
    'ybutton',
    'ydial',
    'yautocomplete',
    'ycalendar',
    'ychart',
    'yoverlay'
];

Y.Array.each(REGISTRY, function(tag) {
    Y.Tag.register(tag);
});