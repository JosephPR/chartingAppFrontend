class CategoriesController < ApplicationController

  def index
    @categories = Category.all
  end

  def show
    @category = Category.find(params[:id])
    @varietals = Varietal.select{|varietal| varietal.category_id == @category.id}
  end
end
