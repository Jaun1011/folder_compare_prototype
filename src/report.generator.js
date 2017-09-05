
function toHtml(values , title) {
    var html = '<table>';
    html += '<tr>';
    html += '<th>Folder</th><th>' + title+ '</th>';
    html += '</tr>';
    for (var i = 0; i < values.length; i++) {
        html += '<tr>';
        html += '<td>' + values[i].dir + '</td><td>' + values[i].hash + '</td>';
        html += '</tr>';
    }
    html += '<table/>';
    return html
}

module.exports = {
    toHtml: toHtml
};