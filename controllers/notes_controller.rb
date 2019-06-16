# frozen_string_literal: true

class NotesController < ApplicationController
  def index
    @varietals = Varietal.all
  end

  def new
    @note = Note.new
    @varietals = Varietal.all
    # @varietal = Varietal.find(params[:id])
  end

  def show
    @note = Note.find(params[:id])
  end

  def create
    @note = Note.create(notes_params)

    if @note.errors.any?
      @varietals = Varietal.all
      render :new
    else
      redirect_to varietals_path
    end
  end

    def edit
      @note = Note.find(params[:id])
      @varietals = Varietal.all
    end

    def update
      @note = Note.find(params[:id])

      @note.update(notes_params)
      redirect_to varietals_path
    end

    def destroy
      @note = Note.find(params[:id])
      @note.destroy
      redirect_to varietals_path
    end


  private

  def notes_params
    params.require(:note).permit(:sweetness, :acidity, :tanin, :alcohol, :body, :varietal_id)
  end
end
