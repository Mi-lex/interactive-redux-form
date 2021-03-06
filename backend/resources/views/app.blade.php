<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Эталон</title>
    <meta name="description" content="">
    <meta name"keywords" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="{{ mix('main.css') }}" rel="stylesheet">
    <base href="/">
</head>

<body>
    <div id="root"></div>
    <script type="text/javascript" src="{{ mix('runtime-main.js') }}"></script>
    <script type="text/javascript" src="{{ mix('vendor.js') }}"></script>
    <script type="text/javascript" src="{{ mix('main.js') }}"></script>
</body>
</body>

</html>