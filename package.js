
Package.describe({
    summary: "Query string tools",
});

Package.on_use(function (api) {
    api.use('jquery', 'client');
    api.use(['underscore', 'deps'], ['client', 'server']);

    api.add_files('lib/jquery.ba-bbq.js', 'client');
    api.add_files('lib/querydict.js', ['client', 'server']);
});
