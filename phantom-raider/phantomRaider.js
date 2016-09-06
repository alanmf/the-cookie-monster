"use strict";

//Used netsniff.js as a base, heavily modified to get response cookies.
//Also modified to write the browser cookies to a file

var fs = require('fs'), system = require('system');

var content = [];

function createHAR(address, title, startTime, resources)
{
    var entries = [];

    resources.forEach(function (resource) {
        var request = resource.request,
            startReply = resource.startReply,
            endReply = resource.endReply;

        if (!request || !startReply || !endReply) {
            return;
        }

        // Exclude Data URI from HAR file because
        // they aren't included in specification
        if (request.url.match(/(^data:image\/.*)/i)) {
            return;
	}

       var responseCookies = endReply.headers.filter(function(x) { return x.name == "Set-Cookie" });

       if (responseCookies.length > 0) {
        var requestContent ={
            startedDateTime: request.time.toISOString(),
            url: request.url,
            responseCookies: responseCookies[0].value, 
            pageref: address
        };
        content.push(requestContent);
        entries.push(requestContent);
       } else {
         return;
       }

    });

    return {
        log: {
            pages: [{
                startedDateTime: startTime.toISOString(),
                id: address,
                title: title,
                pageTimings: {
                    onLoad: page.endTime - page.startTime
                }
            }],
            entries: entries
        }
    };
}

var page = require('webpage').create(),
    system = require('system');

if (system.args.length === 1) {
    console.log('Usage: phantomraider.js <URL>');
    phantom.exit(1);
} else {

    page.address = system.args[1];
    page.resources = [];

    page.onLoadStarted = function () {
        page.startTime = new Date();
    };

    page.onResourceRequested = function (req) {
        page.resources[req.id] = {
            request: req,
            startReply: null,
            endReply: null
        };
    };

    page.onResourceReceived = function (res) {
        if (res.stage === 'start') {
            page.resources[res.id].startReply = res;
        }
        if (res.stage === 'end') {
            page.resources[res.id].endReply = res;
        }
    };

    page.open(page.address, function (status) {
        var har;
        if (status !== 'success') {
            console.log('FAIL to load the address');
            phantom.exit(1);
        } else {
            page.endTime = new Date();
            page.title = page.evaluate(function () {
                return document.title;
            });
            har = createHAR(page.address, page.title, page.startTime, page.resources);
            //console.log(JSON.stringify(har, undefined, 4));
	    try {
              var jsons = content.map(JSON.stringify);
              fs.write("cookieFiles/browser-" + page.address.replace(/^https?:\/\//,'') + ".txt", jsons, 'w');
	    } catch(e) {
		console.log(e);
	    }

            phantom.exit();
        }
    });
}


