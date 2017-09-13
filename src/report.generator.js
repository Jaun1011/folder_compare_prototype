
function toHtml(values , title) {
    var html = '<table><tr><th>Folder</th><th>' + title+ '</th></tr>';
    for (var i = 0; i < values.length; i++) {
        html += '<tr><td>' + values[i].dir + '</td><td>' + values[i].hash + '</td></tr>';
    }
    html += '<table/>';
    return html;
}

module.exports = {
    toHtml: toHtml
};