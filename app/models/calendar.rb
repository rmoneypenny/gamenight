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

	def getRoom(day)
		if day
			day_start = Date.new(@date.year, @date.month, day).beginning_of_day
			day_end = Date.new(@date.year, @date.month, day).end_of_day
			puts day_start.to_s + " " + day_end.to_s
			room = Room.where(datetime: day_start..day_end)
			if !room.empty?
				info = room.first.datetime.strftime("%B") + " " + room.first.datetime.strftime("%-d") + ", " + room.first.datetime.strftime("%Y")
				games = Game.where(room_id: room.first.id)
				gameList = []
				games.each do |g|
					gameList << g.name
				end
				puts "GAME"
				puts gameList
				[room.first.id, info, gameList]
			end
		end
	end

	def nextMonth
		@date.next_month
	end

	def prevMonth
		@date.prev_month 
	end

end