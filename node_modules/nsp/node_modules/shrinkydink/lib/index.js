exports.shrink = function (shrinkwrap, options) {

    options = options || {};
    options.blacklist = options.blacklist || ['from', 'resolved'];

    if (options.allowGit === false &&
        shrinkwrap.resolved &&
        shrinkwrap.resolved.indexOf('git:') === 0) {

        return undefined;
    }

    for (var i = 0, il = options.blacklist.length; i < il; ++i) {
        delete shrinkwrap[options.blacklist[i]];
    }

    if (!shrinkwrap.dependencies) {
        return shrinkwrap;
    }

    for (var dep in shrinkwrap.dependencies) {
        var shrunk = exports.shrink(shrinkwrap.dependencies[dep]);
        if (shrunk) {
            shrinkwrap.dependencies[dep] = shrunk;
        }
        else {
            delete shrinkwrap.dependencies[dep];
        }
    }

    return shrinkwrap;
};
