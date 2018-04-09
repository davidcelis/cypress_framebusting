require 'uri'
require 'net/http'
require 'net/https'

class OAuthClientsController < ApplicationController
  before_action :set_oauth_client, only: [:authorize, :callback, :show, :edit, :update, :destroy]

  # GET /oauth_clients/1/authorize
  def authorize
    session[:state] = SecureRandom.hex

    oauth_params = {
      client_id: @oauth_client.client_id,
      redirect_uri: callback_oauth_client_url(@oauth_client),
      scope: 'user:email',
      state: session[:state],
      allow_signup: false
    }

    uri = URI.parse('https://github.com/login/oauth/authorize')
    uri.query = URI.encode_www_form(oauth_params)

    redirect_to uri.to_s
  end

  # GET /oauth_clients/1/callback
  def callback
    if params[:state] != session[:state]
      flash.now[:error] = 'State did not match.'
      render :show and return
    end

    uri = URI.parse('https://github.com/login/oauth/access_token')
    uri.query = URI.encode_www_form({
      'client_id' => @oauth_client.client_id,
      'client_secret' => @oauth_client.client_secret,
      'code' => params[:code]
    })
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Post.new(uri.request_uri)
    request['Accept'] = 'application/json'
    response = JSON.parse(http.request(request).body)
    session[:token] = response['access_token']
  end

  # GET /oauth_clients
  # GET /oauth_clients.json
  def index
    @oauth_clients = OAuthClient.all
  end

  # GET /oauth_clients/1
  # GET /oauth_clients/1.json
  def show
  end

  # GET /oauth_clients/new
  def new
    @oauth_client = OAuthClient.new
  end

  # GET /oauth_clients/1/edit
  def edit
  end

  # POST /oauth_clients
  # POST /oauth_clients.json
  def create
    @oauth_client = OAuthClient.new(oauth_client_params)

    respond_to do |format|
      if @oauth_client.save
        format.html { redirect_to @oauth_client, notice: 'OAuth client was successfully created.' }
        format.json { render :show, status: :created, location: @oauth_client }
      else
        format.html { render :new }
        format.json { render json: @oauth_client.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /oauth_clients/1
  # PATCH/PUT /oauth_clients/1.json
  def update
    respond_to do |format|
      if @oauth_client.update(oauth_client_params)
        format.html { redirect_to @oauth_client, notice: 'OAuth client was successfully updated.' }
        format.json { render :show, status: :ok, location: @oauth_client }
      else
        format.html { render :edit }
        format.json { render json: @oauth_client.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /oauth_clients/1
  # DELETE /oauth_clients/1.json
  def destroy
    @oauth_client.destroy
    respond_to do |format|
      format.html { redirect_to oauth_clients_url, notice: 'OAuth client was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_oauth_client
    @oauth_client = OAuthClient.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def oauth_client_params
    params.require(:oauth_client).permit(:client_id, :client_secret)
  end
end
