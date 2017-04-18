$(function() {
    var peerReviewCanvas = $('#peer-review')[0];
    // context
    var peerReviewCtx = peerReviewCanvas.getContext('2d'); // treat it as a 2-D canvas (x- and y-axis)

    // Draw peer review chart
    peerReviewCtx.strokeText("Peer Review", 70, 10); // 'Peer Review' at (10, 10)

    for (var i = 0; i <= 10; i++) {
        peerReviewCtx.fillText(10 - i, 10, 30 + 20 * i);
        peerReviewCtx.moveTo(25, 30 + 20 * i);
        peerReviewCtx.lineTo(200, 30 + 20 * i);
    }

    // fill in the path we defined
    peerReviewCtx.stroke();

    // Draw peer review bars
    $.ajax({
        url: '/peerReview.json',
        dataType: 'json',
        success: function(data) {
            // full bar
            // peerReviewCtx.fillRect(30, 30, 5, 200);

            var categories = Object.keys(data);

            categories.forEach(function(category, index) {
                var value = data[category];
                var x = 30 + index * 10;
                var y = 30 + (10 - value) * 20;
                var height = value * 20;

                peerReviewCtx.fillRect(x, y, 5, height);
            });

            // Draw labels
            categories.forEach(function(category, index) {
                peerReviewCtx.fillText(category, 100, 30 + 20 * index);
            });
        }
    });
});
