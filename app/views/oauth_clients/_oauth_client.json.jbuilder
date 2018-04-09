json.extract! oauth_client, :id, :client_id, :client_secret, :created_at, :updated_at
json.url oauth_client_url(oauth_client, format: :json)
