class VarietalsController < ApplicationController

  def index
    if params[:search_term]
      @varietals = Varietal.where("name LIKE ?", "%#{params[:search_term]}%")
    else
      @varietals = Varietal.all
    end
  end

  def show
    @varietal = Varietal.find(params[:id])
    @recommendations = Recommendation.all
    @notes = Note.select{|note| note.varietal_id == @varietal.id}
  end

  def new
    @varietal = Varietal.new
    @category = Category.find{@varietal.category_id}
    @categories = Category.all
  end

  def create
    @varietal = Varietal.create(varietal_params)
    if @varietal.errors.any?
      @categories = Category.all
      render :new
    else
    redirect_to varietals_path
    end
  end

  def edit
    @varietal = Varietal.find(params[:id])
    @categories = Category.all
  end

  def update
      @varietal = Varietal.find(params[:id])

      if(@varietal.update(varietal_params))
        redirect_to varietal_path
      else
        render 'edit'
      end
  end

  private

    def varietal_params
      params.require(:varietal).permit(:name, :description, :image_url, :category_id)
    end
end
