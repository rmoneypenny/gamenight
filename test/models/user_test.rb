require 'test_helper'

class UserTest < ActiveSupport::TestCase
   test "should not save without user info" do
  		user = User.new
  		assert_not user.save, "Saved user w/blank info"
   end
end
