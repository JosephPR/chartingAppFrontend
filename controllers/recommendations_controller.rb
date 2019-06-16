# frozen_string_literal: true

class RecommendationsController < ApplicationController
  require_relative '../../config/api_keys.rb'
  require 'rest-client'
  require 'pry'

  def api
    @varietal = Varietal.find(params[:recommendation][:varietal_id])
    query = @varietal.name
    headers = {
      accept: 'application/json',
      authorization: ['Token', $gws_api_key].join(" ")
    }

    data = RestClient.get "https://api.globalwinescore.com/globalwinescores/latest/?limit=10&ordering=-score&wine=#{query}", headers
    response = JSON.parse data
    arr = []

    response["results"].each do |wine|
        add = {}
        add[:varietal_id] = @varietal.id
        add[:name] = wine["wine"]
        add[:year] = wine["vintage"]
        add[:region] = [wine["country"], wine["regions"].join(", ")].join(", ")
        add[:score] = wine["score"]
        add[:url] = ["https://www.globalwinescore.com/wine-score/", wine["wine_slug"], "/", wine["vintage"]].join("")
        arr << add
    end
    arr
    arr.each do |params|
      Recommendation.create(params).valid?
    end
    redirect_to recommendations_path
  end

  def index
    if params[:search_term]
      @recommendations = Recommendation.where("name LIKE ?", "%#{params[:search_term]}%")
    else
      @recommendations = Recommendation.all
    end
  end
  def new
    @recommendation = Recommendation.new
    @varietals = Varietal.all
  end

  def edit
  end


  def create
    api
  end


  def update
  end

  def destroy
    @recommendation.destroy
    respond_to do |format|
      format.html { redirect_to recommendations_url, notice: 'Recommendation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  
  def allowed_params
    params.require(:recommendation).permit(:varietal_id, :name, :year, :region, :score, :url)
  end
end
