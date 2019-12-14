function bindEvents(){

    // Bind handlers for click events
    $('#login').on('click', loginClick);
    $('#register').on('click', registerClick);

}

function loginClick (e){

    // Prevent the default submit action
    e.preventDefault();

    var userValid = simpleValidation($('#username')),
        passValid = simpleValidation($('#password'));

    if(userValid && passValid){
        parent.window.location.href = "home.html";
    }
}

function simpleValidation($input){
    var valid = true,
        value = $input.val();

        if(value.length == 0){
            valid = false;
            $input.closest('.form-group').find('.help-block').show();
        }else{
            $input.closest('.form-group').find('.help-block').hide();
        }

    return valid;
}


function registerClick(e){

    $('#register-modal').modal('show');

}

function getCurrentTemp (){
    var context = this;
    $.ajax({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=Plovdiv,bg&units=metric&appid=5624e56170c7efdcfa0212d03e1677e4",
        dataType: "json"
    }).done(function(response) {
        context.renderTemperature(response);
    }).fail(function() {
        console.log('Error occurred while trying to get current temperature')
    }).always(function() {
        console.log('ajax finished')
    });

}

function renderTemperature(weatherData){
    $('#current-temperature').text(weatherData.main.temp);

    var weatherCode = weatherData.weather[0].id.toString();
    var currentWeather = getWeatherData(weatherCode);
    $('#current-condition').text(currentWeather.condition);
    $('.img-container').find('img').attr('src','assets/img/icons/' + currentWeather.icon);
    $('.img-container').find('img').show();

}

function getWeatherData(weatherCode){

    var weatherData = {};
    var weatherCondition = '',
        icon = '';

    if(weatherCode.charAt(0) == '2'){
        weatherCondition = 'Гръмотевична буря';
        icon = 'thunderstorm.png'
    }
    if(weatherCode.charAt(0) == '3'){
        weatherCondition = 'Преваляване';
        icon = 'rain.png'
    }
    if(weatherCode.charAt(0) == '5'){
        weatherCondition = 'Дъждовно';
        icon = 'shower_rain.png';
        if(weatherCode == '500' || weatherCode == '501'){
            icon = 'rain.png'
        }
    }
    if(weatherCode.charAt(0) == '6'){
        weatherCondition = 'Снеговалеж';
        icon = 'snow.png';
    }

    if(weatherCode.charAt(0) == '7'){
        weatherCondition = 'Мъгла';
        icon = 'mist.png';
    }
    if(weatherCode.charAt(0) == '8'){
        weatherCondition = 'Лека облачност';
        icon = 'few_clouds.png';
    }

    if(weatherCode == '800'){
        weatherCondition = 'Слънчево';
        icon = 'clear_sky.png';
    }
    if(weatherCode == '802'){
        weatherCondition = 'Разпокъсана облачност';
        icon = 'scattered_clouds.png';
    }

    weatherData.condition = weatherCondition;
    weatherData.icon = icon;

    return weatherData;

}


function initSearch (){
    $('#search-friend').on('keyup', function (e) {
        var query = $(e.currentTarget).val();
        $.ajax({
            url: 'services/friends.json',
            data: {"query": query},
            //type: 'POST',
            type: 'GET',
            success: function (response) {
                $('#search-result').empty();
                $('#search-result').show();


                for (var i = 0; i < response.matches.length; i++) {
                    if(response.matches[i].img == ""){
                        response.matches[i].img = 'assets/img/user.jpg'
                    }
                    var result = $('<div class="found-friend">' +
                        '<img class="pull-left img-thumbnail" src="'+ response.matches[i].img +'">' + '<span>' + response.matches[i].name +'</span>' +
                        '<button type="button" data-id="'+ response.matches[i].id +'" class="add-friend btn btn-primary pull-right"><span class="glyphicon glyphicon-plus"></span> Добави</button>' +
                        '</div>');
                    result.find('a').append('<div class="title">' + response.matches[i].label + '</div>');
                    $('#search-result').append(result);
                }

                $('#search-result').find('.add-friend').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    console.log($(e.currentTarget).attr('data-id'))
                })

            }
        })

    })



}

function hideSearchWhenClickingOutside() {
    $(window).click(function () {
        $('#search-result').empty();
        $('#search-result').hide();
        $('#search-friend').val('');
    });

    $('#search-result').click(function (e) {
        e.stopPropagation();
    });
}