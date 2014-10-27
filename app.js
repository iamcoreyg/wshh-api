var cheerio = require('cheerio')
var express = require('express')
var request = require('request');
var app = express()

app.use(express.static('public'));

app.get('/', function(req, res){
	res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/video/:videoId', function(req, res) {
	var url = 'http://www.worldstarhiphop.com/videos/video.php?v=' + req.params.videoId

	var err = [];
	request(url, function(err, resp, body){
		var $ = cheerio.load(body);
		var wrapper = $('#wrapper')

		var title = wrapper.find('.content-heading h1').first().text(),
		    	views = wrapper.find('.watch-view-count').first().text()
		    	date = wrapper.find('.date').first().text()

		if(title.length == 0){
			res.status(500).json({
				status: "Error",
				message: "Yo..the video wasn't found. Sorry."
			});
		} else {

			res.status(200).json({
				status: 'ok', 
				title: title,
				video_url: url,
				views: views,
				date: date
			});
		}
	}) 

})

app.listen(process.env.PORT || 3000, function(){
  console.log("Everything's running on %d in %s mode", this.address().port, app.settings.env);
});