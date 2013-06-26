class VideosController < ApplicationController

def new
	@vid = Video.new
end

def index
	@vid = Video.new
	@vids = Video.all
end


end
