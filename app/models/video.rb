class Video < ActiveRecord::Base
  attr_accessible :title, :youtube_id

def initialize
	@youtube_client = YouTubeIt::Client.new(:dev_key => "AI39si68mgy10ezDRrd34OBfWDnguo7d09oVPVUcSv7ZWBO-e-AHSX4goAe7qAYMVUzhlyzqFSXtsGkr1gPb5sqgtajoOpZSnA")
end

def get_youtube_id(sought)
	vid = @youtube_client.videos_by(:query => sought, :format => 5, :safe_search => 'strict', :restriction => 'US', :categories => [:news], time: :today)
	return_vid = vid.videos.first.video_id.split(':').last
	return_vid
end

def get_youtube_id_array(sought)
	vid = @youtube_client.videos_by(:query => sought,  :fields => {:published  => ((Date.today - 30)..(Date.today))}, :format => 5, :safe_search => 'strict', :restriction => 'US', :categories => [:news], :time => :today)
	vid_ids = Array.new
	vid.videos.each { |video| vid_ids.push(video.video_id.split(':').last) }
	vid_ids
end

end