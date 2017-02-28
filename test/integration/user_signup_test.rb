require 'test_helper'

class UserSignupTest < ActionDispatch::IntegrationTest
   test "can create new user" do
     get '/users/new'
     assert_response :success

     post '/users/new', params: {username: "rmoneypenny", name: "Randy", email: "r@r.com", password: "pass", password_confirmation: "pass"}
     assert_redirected_to games_index_path
   end
end
