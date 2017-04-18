$(function() {
    var peerReviewCanvas = $('#peer-review')[0];
    // Peer review canvas context
    var peerReviewCtx = peerReviewCanvas.getContext('2d'); // treat it as a 2-D canvas (x- and y-axis)
    var colors = [
        'red',
        'orange',
        'green',
        'blue',
        'purple',
        'indigo',
        'MediumBlue',
        'MediumOrchid',
        'MediumPurple',
        'MediumSeaGreen',
        'MediumVioletRed',
        'MidnightBlue',
        'black'
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

    // Draw a bar chart
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
        } // end success
    });

    // Draw the point distribution graph

    var pointDistCanvas = $('#point-distribution')[0];
    var pointDistCtx = pointDistCanvas.getContext('2d');

    $.ajax({
        url: '/pointDistribution.json',
        dataType: 'json',
        success: function(data) {
            var people = Object.keys(data);
            var total = Object.values(data).reduce(function(acc, value) {
                return acc + value;
            }, 0);
            var start = 0;

            people.forEach(function(person, index) {
                var percent = data[person] / total;
                var end = start + percent * 2 * Math.PI;

                pointDistCtx.beginPath();
                pointDistCtx.arc(100, 100, 80, start, end);
                pointDistCtx.fillStyle = colors[index];
                pointDistCtx.fill();

                start = end;
            });
        } // end success
    });
});
