$(function() {
    var peerReviewCanvas = $('#peer-review')[0];
    // context
    var peerReviewCtx = peerReviewCanvas.getContext('2d'); // treat it as a 2-D canvas (x- and y-axis)
    var colors = [
        'red',
        'orange',
        'green',
        'blue',
        'purple',
        'indigo',
        'black',
        'maroon',
        'chartreuse',
        'violet'
    ];

    // Draw peer review chart
    peerReviewCtx.strokeText("Peer Review", 70, 10); // 'Peer Review' at (10, 10)

    for (var i = 0; i <= 10; i++) {
        peerReviewCtx.fillText(10 - i, 10, 30 + 20 * i);
        peerReviewCtx.moveTo(25, 30 + 20 * i);
        peerReviewCtx.lineTo(90, 30 + 20 * i);
    }

    // fill in the path we defined
    peerReviewCtx.stroke();

    $.ajax({
        url: '/peerReview.json',
        dataType: 'json',
        success: function(data) {
            var categories = Object.keys(data);

            categories.forEach(function(category, index) {
                var value = data[category];
                var x = 30 + index * 10;
                var y = 30 + (10 - value) * 20;
                var height = value * 20;

                peerReviewCtx.fillStyle = colors[index];
                // Draw bar
                peerReviewCtx.fillRect(x, y, 5, height);

                // Draw label
                peerReviewCtx.fillRect(100, 80 + 20 * index, 10, 10);
                peerReviewCtx.fillText(category, 120, 90 + 20 * index);
            });
        }
    });
});
