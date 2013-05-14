
Package.describe({
    summary: "Access querystring data through a reactive dictionary",
});

Package.on_use(function (api) {
    api.use('jquery', 'client');
    api.use('reactive-dict', 'client');
    api.use('page-js-ie-support', 'client');

    api.add_files('lib/jquery.ba-bbq.js', 'client');
    api.add_files('lib/querydict.js', 'client');
});
