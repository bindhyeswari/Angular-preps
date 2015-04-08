angular.module('googleMap.directives', function ($q) {
        return {
            scope: {
                cities: '='
            },
            compile: function () {

                var map; var deferred = $q.defer();
                window.test = function test () {
                    var myLatlng = new google.maps.LatLng(37.3761862,-122.03071970000002);
                    var mapOptions = {
                        zoom: 4,
                        center: myLatlng
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title: 'Sunnyvale!'
                    });
                    console.log('Hi');
                    deferred.resolve();
                };

                return {
                    pre: function (scope, element, attrs) {
                        var script = document.createElement('script');
                        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=test';
                        document.head.appendChild(script);
                    },
                    post: function (scope, element, attrs) {
                        var sc = scope;
                        deferred.promise.then(function () {
                            scope.cities.forEach(function (city) {
                                var marker = new google.maps.Marker({
                                    position: new google.maps.LatLng(city.loc[1], city.loc[0]),
                                    map: map,
                                    title: city.city
                                });
                                console.log(marker);
                            });
                        });
                    }
                }
            }
        };
    })