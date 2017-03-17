class Calendar

	attr_accessor :date

	def initialize(date = nil)
		date == nil ? (@date = Time.now) : (@date = Date.parse(date))
	end

	def calendarStart
		month = @date.strftime("%m").to_i
		year = @date.strftime("%Y").to_i
		firstOfMonth = Date.new(year, month, 1).strftime("%w")
		daysInMonth = Time.days_in_month(month)
		weeks = ((daysInMonth + firstOfMonth.to_f)/7).ceil
		
		days = []

		i = daysInMonth
		daysInMonth.times do
			days << i
			i -= 1
		end

		firstOfMonth.to_i.times do
			days << nil
		end

		calendar = []

		weeks.times do
			week = []
			7.times do
				week << days.pop
			end
			calendar << week
		end
		monthName = @date.strftime("%B") + " " + year.to_s
		[calendar, monthName]

	end

	def roomInfo(day,user_id)
		room = getRoom(day) if day
		user = User.find(user_id) if user_id > 0
		if day && !room.empty?
				info = room.first.datetime.strftime("%B") + " " + room.first.datetime.strftime("%-d") + ", " + room.first.datetime.strftime("%Y") + " at " + room.first.datetime.strftime("%l:%M%p")
				games = Game.where(room_id: room.first.id)
				gameList = []
				gameIDs = []
				games.each do |g|
					gameList << g.name + "!*!"
					gameIDs << g.id
				end
				joinedRoom = (true if user_id>0 && user.rooms.where(id: room.first.id).first) || false
				[room.first.id, info, gameList, gameIDs, joinedRoom]
		end
	end

	def getRoom(day)
		day_start = Date.new(@date.year, @date.month, day).beginning_of_day
		day_end = Date.new(@date.year, @date.month, day).end_of_day
		room = Room.where(datetime: day_start..day_end)
	end


	def nextMonth
		@date.next_month
	end

	def prevMonth
		@date.prev_month 
	end

end