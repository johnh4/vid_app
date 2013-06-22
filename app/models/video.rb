class Video < ActiveRecord::Base
  attr_accessible :title, :youtube_id

def initialize
	@youtube_client = YouTubeIt::Client.new 
end

def get_youtube_id(sought)
	vid = youtube_client.videos_by(:query => sought)
	return_vid = video_data.videos.first.video_id.split(':').last
	return_vid
end

end
