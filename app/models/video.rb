class Video < ActiveRecord::Base
  attr_accessible :title, :youtube_id

def initialize
	@youtube_client = YouTubeIt::Client.new 
end

def get_youtube_id(sought)
	vid = @youtube_client.videos_by(:query => sought, :categories => [:music])
	return_vid = vid.videos.first.video_id.split(':').last
	return_vid
end

end
