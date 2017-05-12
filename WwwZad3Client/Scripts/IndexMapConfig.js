function mapConfig() {

    const voivodeships = [
        'Dolnośląskie',
        'Kujawsko-pomorskie',
        'Lubelskie',
        'Lubuskie',
        'Łódzkie',
        'Małopolskie',
        'Mazowieckie',
        'Opolskie',
        'Podkarpackie',
        'Podlaskie',
        'Pomorskie',
        'Śląskie',
        'Świętokrzyskie',
        'Warmińsko-mazurskie',
        'Wielkopolskie',
        'Zachodniopomorskie'
    ];

    function drawer() {
        const dataTable = [
            ['Voivodeship', 'Nazwa']
        ].concat(voivodeships.map(function (elem) {
            return [elem, elem];
        }));


        const data = google.visualization.arrayToDataTable(dataTable);

        const chart = new google.visualization.GeoChart(document.getElementById('map'));
        const options = {
            region: 'PL',
            resolution: 'provinces',
            datalessRegionColor: 'transparent',
            backgroundColor: 'transparent'
        };

        chart.draw(data, options);

        function onClickHandler() {
            const selection = chart.getSelection();

            const voivodeshipId = selection[0].row;
            window.location = 'voivodeship/' + voivodeships[voivodeshipId].toUpperCase();
        }

        google.visualization.events.addListener(chart, 'select', onClickHandler);
    }

    google.charts.load('current', {'packages':['geochart']});
    google.charts.setOnLoadCallback(drawer);

}

mapConfig();