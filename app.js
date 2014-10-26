var cheerio = require('cheerio')
var express = require('express')
var scrape = require('scrape');
var app = express()


app.get('/', function (req, res) {
  res.send('Worldstar Hip Hop Api, try out /video/VIDEO_ID_HERE')
})

app.get('/video/:videoId', function(req, res) {
	var url = 'http://www.worldstarhiphop.com/videos/video.php?v=' + req.params.videoId

	scrape.request(url, function (err, $) {
	    if (err) return console.error(err);

	    var wrapper = $('#wrapper')
	    var title = wrapper.find('.content-heading h1').first().text,
	    	views = wrapper.find('.watch-view-count').first().text
	    	date = wrapper.find('.date').first().text

	    res.status(200).json({
				status: 'ok', 
				title: title,
				video_url: url,
				views: views,
				date: date
			});

	})
})

app.listen(3000)

/*
title:
video_url:
views:
date:
*/